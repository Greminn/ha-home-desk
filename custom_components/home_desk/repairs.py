"""Turn Home Assistant Repairs into Home Desk tickets.

Each repair (an issue in HA's issue registry) gets one ticket, kept in step with the
repair: opened when it appears, resolved when HA clears it, reopened if it comes back.
The mapping lives in storage.async_sync_repair; this module only watches HA.

A repair that is missing is not always a repair that is fixed. Many integrations (Spook, for one) raise their issues again
only after their own delayed checks, so right after Home Assistant starts they are simply not there yet. So an absence is
never acted on at once: after a start the tickets wait out a grace period before a repair still missing counts as cleared, and
a repair that disappears while Home Assistant runs waits a couple of minutes (an integration reload removes and re-raises its
issues). If the repair comes back in that time, nothing happens to the ticket.
"""

from __future__ import annotations

import logging
import re
import time
from collections.abc import Callable
from typing import Any

from homeassistant.core import Event, HomeAssistant, callback
from homeassistant.helpers import issue_registry as ir
from homeassistant.helpers.event import async_call_later
from homeassistant.helpers.translation import async_get_translations

from .const import CONF_REPAIRS_IGNORE, DOMAIN, REPAIR_PRIORITY
from .storage import async_get_settings, async_open_repair_keys, async_sync_repair

_LOGGER = logging.getLogger(__name__)

START_GRACE = 15 * 60  # seconds after Home Assistant starts before a repair that is still missing counts as cleared
REMOVE_GRACE = 2 * 60  # seconds a repair may be gone, while Home Assistant runs, before it counts as cleared
# While Home Assistant is still starting, integrations remove their old issues and raise them again minutes later (Spook's
# checks take up to ten), so a removal in that window waits out the rest of START_GRACE as well.
_clock = time.monotonic


def _fill(text: str, placeholders: dict[str, Any] | None) -> str:
    """Substitute {placeholders}; a template that doesn't fit is better shown raw than lost."""
    try:
        return text.format(**(placeholders or {}))
    except (KeyError, IndexError, ValueError):
        return text


def _fallback_title(issue: ir.IssueEntry) -> str:
    """A title for a repair its integration gave no translation for: tell similar repairs apart."""
    # Many integrations prefix issue ids with a config entry id (a 26-character ULID): noise to a reader.
    short = re.sub(r"^[0-9A-Z]{26}_", "", issue.issue_id)
    key = issue.translation_key
    if key and short != key:
        return f"{issue.domain}: {key} ({short})"
    return f"{issue.domain}: {short}"


def _group(issue: ir.IssueEntry) -> str | None:
    """Repairs of the same kind share one ticket: the same integration and the same translation key.

    An issue without a translation key can't be told apart from a different problem, so it keeps its own ticket.
    """
    return issue.translation_key or None


async def _describe(hass: HomeAssistant, issue: ir.IssueEntry) -> tuple[str, str]:
    """A readable (title, description) for a repair, from the integration's own translations."""
    title = ""
    body = ""
    if issue.translation_key:
        try:
            translations = await async_get_translations(hass, hass.config.language, "issues", [issue.domain])
        except Exception:  # noqa: BLE001 - translations are a nicety, never a reason to miss a repair
            translations = {}
        base = f"component.{issue.domain}.issues.{issue.translation_key}"
        title = _fill(translations.get(f"{base}.title", ""), issue.translation_placeholders)
        body = _fill(translations.get(f"{base}.description", ""), issue.translation_placeholders)
    title = title or _fallback_title(issue)
    lines = [body] if body else []
    lines.append(f"**Integration:** `{issue.domain}` · **Repair:** `{issue.issue_id}`")
    if issue.learn_more_url:
        lines.append(f"[Learn more]({issue.learn_more_url})")
    if issue.is_fixable:
        lines.append("Home Assistant can fix this one for you: Settings → System → Repairs.")
    return title, "\n\n".join(lines)


async def _enabled(hass: HomeAssistant) -> bool:
    return bool((await async_get_settings(hass)).get("repairs", True))


def _is_restart_required(issue_id: str, translation_key: str | None = None) -> bool:
    """"Restart required" notices (HACS raises one per updated integration, ids like restart_required_<name>) say nothing is wrong."""
    return issue_id.startswith("restart_required") or translation_key == "restart_required"


async def _sync(hass: HomeAssistant, domain: str, issue_id: str, ignored_domains: set[str], *, how: str = "") -> None:
    if domain in ignored_domains or _is_restart_required(issue_id) or not await _enabled(hass):
        return
    issue = ir.async_get(hass).async_get_issue(domain, issue_id)
    if issue is not None and _is_restart_required(issue_id, issue.translation_key):
        return
    try:
        if issue is None or not issue.active:
            await async_sync_repair(hass, domain=domain, issue_id=issue_id, active=False, how=how)
            return
        title, description = await _describe(hass, issue)
        await async_sync_repair(
            hass,
            domain=domain,
            issue_id=issue_id,
            active=True,
            ignored=issue.dismissed_version is not None,
            title=title,
            description=description,
            priority=REPAIR_PRIORITY.get(str(getattr(issue.severity, "value", issue.severity)), "normal"),
            group=_group(issue),
            member=re.sub(r"^[0-9A-Z]{26}_", "", issue.issue_id),
            generic_title=f"{issue.domain}: {issue.translation_key}" if issue.translation_key else "",
        )
    except Exception:  # noqa: BLE001 - one bad repair must not stop the others
        _LOGGER.warning("Could not sync repair %s/%s to a ticket", domain, issue_id, exc_info=True)


async def async_setup_repairs(hass: HomeAssistant, options: dict[str, Any]) -> Callable[[], None]:
    """Start mirroring repairs into tickets. Returns a function that stops it.

    Whether it is switched on is the "Tickets from Repairs" setting, checked on every change, so the switch in
    the panel takes effect without a restart. Turning it on calls the catch-up below.
    """
    ignored = {d.strip() for d in options.get(CONF_REPAIRS_IGNORE) or [] if d.strip()}
    started = _clock()

    # Repairs waiting out a grace period before they count as cleared, by (domain, issue_id).
    pending: dict[tuple[str, str], Callable[[], None]] = {}

    def _cancel(key: tuple[str, str]) -> None:
        stop_timer = pending.pop(key, None)
        if stop_timer:
            stop_timer()

    def _clear_later(key: tuple[str, str], delay: int, how: str) -> None:
        """Count a missing repair as cleared after `delay` seconds, unless it is reported again first."""
        _cancel(key)

        async def _check(_now: Any) -> None:
            pending.pop(key, None)
            await _sync(hass, key[0], key[1], ignored, how=how)  # looks at the registry again: a repair that is back stays open

        pending[key] = async_call_later(hass, delay, _check)

    async def catch_up(*, grace: bool = True) -> None:
        """Make the tickets match the issue registry now. Repairs that are reported are brought up to date at once. Repairs that
        are missing are cleared after a grace period (`grace`), as many are simply not raised again yet right after a start."""
        if not await _enabled(hass):
            return
        present = set()
        for (domain, issue_id), issue in list(ir.async_get(hass).issues.items()):
            if not issue.active:
                continue  # Home Assistant keeps inactive records (a repair that is not raised right now): treated as missing, below
            present.add((domain, issue_id))
            _cancel((domain, issue_id))
            await _sync(hass, domain, issue_id, ignored)
        for domain, issue_id in await async_open_repair_keys(hass):
            if (domain, issue_id) in present:
                continue
            if grace:
                _clear_later((domain, issue_id), START_GRACE, f" (still not reported {START_GRACE // 60} minutes after Home Assistant started)")
            else:
                await _sync(hass, domain, issue_id, ignored)

    async def catch_up_now() -> None:
        """What turning the switch on does: no grace, the person asked for the tickets to match now."""
        await catch_up(grace=False)

    hass.data[f"{DOMAIN}_repairs_catch_up"] = catch_up_now
    await catch_up()

    @callback
    def _changed(event: Event) -> None:
        domain, issue_id = event.data.get("domain"), event.data.get("issue_id")
        if not (domain and issue_id):
            return
        issue = ir.async_get(hass).async_get_issue(domain, issue_id)
        if issue is None or not issue.active:
            if (domain, issue_id) in pending:
                return  # already waiting it out
            settling = START_GRACE - (_clock() - started)
            if settling > REMOVE_GRACE:  # still early after a start: wait until the integrations have had their time
                _clear_later((domain, issue_id), int(settling), f" (still not reported {START_GRACE // 60} minutes after Home Assistant started)")
            else:
                _clear_later((domain, issue_id), REMOVE_GRACE, "")
            return
        _cancel((domain, issue_id))
        hass.async_create_task(_sync(hass, domain, issue_id, ignored))

    stop = hass.bus.async_listen(ir.EVENT_REPAIRS_ISSUE_REGISTRY_UPDATED, _changed)

    def _stop() -> None:
        stop()
        for key in list(pending):
            _cancel(key)
        hass.data.pop(f"{DOMAIN}_repairs_catch_up", None)

    return _stop
