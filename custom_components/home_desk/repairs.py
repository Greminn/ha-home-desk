"""Turn Home Assistant Repairs into Home Desk tickets.

Each repair (an issue in HA's issue registry) gets one ticket, kept in step with the
repair: opened when it appears, resolved when HA clears it, reopened if it comes back.
The mapping lives in storage.async_sync_repair; this module only watches HA.
"""

from __future__ import annotations

import logging
import re
from collections.abc import Callable
from typing import Any

from homeassistant.core import Event, HomeAssistant, callback
from homeassistant.helpers import issue_registry as ir
from homeassistant.helpers.translation import async_get_translations

from .const import CONF_REPAIRS_IGNORE, DOMAIN, REPAIR_PRIORITY
from .storage import async_get_settings, async_open_repair_keys, async_sync_repair

_LOGGER = logging.getLogger(__name__)


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


async def _sync(hass: HomeAssistant, domain: str, issue_id: str, ignored_domains: set[str]) -> None:
    if domain in ignored_domains or not await _enabled(hass):
        return
    issue = ir.async_get(hass).async_get_issue(domain, issue_id)
    try:
        if issue is None or not issue.active:
            await async_sync_repair(hass, domain=domain, issue_id=issue_id, active=False)
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

    async def catch_up() -> None:
        """Make the tickets match the issue registry now, including repairs that cleared while HA was off."""
        if not await _enabled(hass):
            return
        present = set()
        for (domain, issue_id), issue in list(ir.async_get(hass).issues.items()):
            if issue.active:
                present.add((domain, issue_id))
            await _sync(hass, domain, issue_id, ignored)
        for domain, issue_id in await async_open_repair_keys(hass):
            if (domain, issue_id) not in present:
                await _sync(hass, domain, issue_id, ignored)

    hass.data[f"{DOMAIN}_repairs_catch_up"] = catch_up
    await catch_up()

    @callback
    def _changed(event: Event) -> None:
        domain, issue_id = event.data.get("domain"), event.data.get("issue_id")
        if domain and issue_id:
            hass.async_create_task(_sync(hass, domain, issue_id, ignored))

    stop = hass.bus.async_listen(ir.EVENT_REPAIRS_ISSUE_REGISTRY_UPDATED, _changed)

    def _stop() -> None:
        stop()
        hass.data.pop(f"{DOMAIN}_repairs_catch_up", None)

    return _stop
