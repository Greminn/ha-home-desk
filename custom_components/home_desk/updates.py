"""Mirror Home Assistant update entities into Home Desk tickets.

An update entity reports availability, not whether its release is safe to install.
Home Desk therefore links the release notes and highlights explicit breaking-change
language, but never installs updates or claims unreviewed notes are safe.
"""

from __future__ import annotations

import logging
import re
import time
import asyncio
from collections.abc import Callable
from typing import Any
from urllib.parse import urlsplit

from homeassistant.components.update import DATA_COMPONENT, UpdateEntityFeature
from homeassistant.const import EVENT_STATE_CHANGED
from homeassistant.core import Event, HomeAssistant, callback
from homeassistant.helpers import device_registry as dr, entity_registry as er
from homeassistant.helpers.event import async_call_later

from .storage import async_ensure_update_categories, async_open_update_entity_ids, async_sync_update

_LOGGER = logging.getLogger(__name__)
START_GRACE = 15 * 60
CLEAR_GRACE = 2 * 60
_clock = time.monotonic
NOTES_TIMEOUT = 15
EMPTY_NOTES_RETRY = 60 * 60
MAX_NOTES = 50_000


def _category(hass: HomeAssistant, state: Any) -> str:
    """Use the update entity's registered device type, not its mutable name."""
    entity = er.async_get(hass).async_get(state.entity_id)
    device = dr.async_get(hass).async_get(entity.device_id) if entity and entity.device_id else None
    model = str(device.model or "").lower() if device else ""
    if state.entity_id in {
        "update.home_assistant_core_update",
        "update.home_assistant_operating_system_update",
        "update.home_assistant_supervisor_update",
    } or model.startswith(("home assistant core", "home assistant operating system", "home assistant supervisor")):
        return "home-assistant"
    if model == "home assistant app":
        return "apps"
    if model in {"plugin", "theme"}:
        return "dashboards"
    return "integrations"


async def _release_notes(hass: HomeAssistant, state: Any) -> str:
    """Read only the release notes exposed by Home Assistant's update entity."""
    component = hass.data.get(DATA_COMPONENT)
    entity = component.get_entity(state.entity_id) if component else None
    if entity and entity.supported_features & UpdateEntityFeature.RELEASE_NOTES:
        try:
            async with asyncio.timeout(NOTES_TIMEOUT):
                notes = await entity.async_release_notes()
            if isinstance(notes, str) and notes.strip():
                return notes[:MAX_NOTES]
        except Exception:  # noqa: BLE001 - ticket still gets the release link
            _LOGGER.debug("Release notes unavailable for %s", state.entity_id, exc_info=True)
    return ""


def _highlights(notes: str) -> tuple[dict[str, list[str]], bool]:
    """Extract actual release-note text under common headings, without inventing a verdict."""
    result: dict[str, list[str]] = {
        "Breaking changes": [], "Changes to existing behavior": [],
        "New": [], "Fixes": [], "Other changes": [],
    }
    section = "Other changes"
    for raw in notes[:MAX_NOTES].splitlines():
        line = raw.strip()
        if not line or line.startswith(("<", "![")):
            continue
        heading = re.match(r"^#{1,6}\s+(.+)", line)
        if heading:
            label = heading[1].lower()
            if "breaking" in label or "migration required" in label:
                section = "Breaking changes"
            elif "changes to existing" in label or "behavior change" in label or "⚠" in label:
                section = "Changes to existing behavior"
            elif re.search(r"\b(new|feature|added|enhancement)\b", label):
                section = "New"
            elif re.search(r"\b(fix|fixes|fixed|bug|resolved)\b", label):
                section = "Fixes"
            elif len(line) - len(line.lstrip("#")) <= 2:
                section = "Other changes"
            continue
        item = re.sub(r"^[-*]\s+", "", line)
        item = re.sub(r"\s+", " ", item)
        if len(item) > 420:
            item = item[:420].rpartition(" ")[0] + "…"
        if len(item) < 28 or item.startswith(("[!", "---")):
            continue
        target = section
        if section == "Other changes":
            if re.search(r"\b(breaking change|migration required)\b", item, re.I):
                target = "Breaking changes"
            elif re.search(r"\b(fix(?:es|ed)?|prevent|restore)\b", item, re.I):
                target = "Fixes"
            elif re.search(r"\b(add(?:ed)?|new|support|allow)\b", item, re.I):
                target = "New"
        if len(result[target]) < 3:
            result[target].append(item)
    breaking = _breaking_note(notes) or bool(result["Breaking changes"])
    return result, breaking


def _breaking_note(summary: str) -> bool:
    """Treat release text as a hint, not a verified compatibility verdict."""
    lowered = re.sub(r"\bno breaking changes?\b", "", summary.lower())
    return bool(re.search(r"\b(breaking changes?|action required|manual migration)\b", lowered))


def _release_link(raw: Any) -> str:
    """Only add an HTTPS release-notes link; attributes come from other integrations."""
    if not isinstance(raw, str) or len(raw) > 2000 or re.search(r"[\s()<>\[\]]", raw):
        return ""
    try:
        parsed = urlsplit(raw)
    except ValueError:
        return ""
    if parsed.scheme != "https" or not parsed.netloc or parsed.username or parsed.password:
        return ""
    return raw


def _details(state: Any, notes: str = "") -> tuple[str, str, str, str]:
    attrs = state.attributes
    name = str(attrs.get("title") or attrs.get("friendly_name") or state.entity_id)[:200]
    installed = str(attrs.get("installed_version") or "unknown")[:100]
    latest = str(attrs.get("latest_version") or "unknown")[:100]
    summary = str(attrs.get("release_summary") or "")[:2000].strip()
    link = _release_link(attrs.get("release_url"))
    highlights, breaking = _highlights(notes or summary)
    lines = [
        f"**Entity:** `{state.entity_id}`",
        f"**Installed:** {installed} · **Available:** {latest}",
    ]
    for section, items in highlights.items():
        if items:
            lines.append(f"### {section}\n" + "\n".join(f"- {item}" for item in items))
    if not any(highlights.values()) and summary:
        lines.append(f"**Release summary:** {summary}")
    if link:
        lines.append(f"[Full release notes]({link})")
    lines.append(
        "Release notes mention a possible breaking change. Review the full notes before updating."
        if breaking else "Review the full release notes before updating; this summary is not a compatibility verdict."
    )
    return (
        f"Update available: {name}"[:300], "\n\n".join(lines), latest,
        "high" if breaking or highlights["Changes to existing behavior"] else "normal",
    )


async def async_setup_updates(hass: HomeAssistant) -> Callable[[], None]:
    """Watch update state changes and reconcile currently pending updates."""
    await async_ensure_update_categories(hass)
    started = _clock()
    pending: dict[str, Callable[[], None]] = {}
    notes_retry: dict[str, Callable[[], None]] = {}
    release_cache: dict[str, tuple[str, str, float]] = {}
    notes_limit = asyncio.Semaphore(4)

    def _cancel(entity_id: str) -> None:
        stop = pending.pop(entity_id, None)
        if stop:
            stop()

    def _cancel_notes_retry(entity_id: str) -> None:
        stop = notes_retry.pop(entity_id, None)
        if stop:
            stop()

    def _retry_notes_later(entity_id: str) -> None:
        if entity_id in notes_retry:
            return

        async def _check(_now: Any) -> None:
            notes_retry.pop(entity_id, None)
            release_cache.pop(entity_id, None)
            await _sync(entity_id)

        notes_retry[entity_id] = async_call_later(hass, EMPTY_NOTES_RETRY, _check)

    async def _sync(entity_id: str) -> None:
        state = hass.states.get(entity_id)
        if state is not None and state.state not in ("on", "off"):
            return  # unavailable and unknown are not evidence that an update cleared
        try:
            if state is not None and state.state == "on":
                version = str(state.attributes.get("latest_version") or "")
                cached = release_cache.get(entity_id)
                if cached and cached[0] == version and _clock() - cached[2] < (86_400 if cached[1] else EMPTY_NOTES_RETRY - 60):
                    notes = cached[1]
                else:
                    async with notes_limit:
                        notes = await _release_notes(hass, state)
                    release_cache[entity_id] = (version, notes, _clock())
                if notes:
                    _cancel_notes_retry(entity_id)
                else:
                    _retry_notes_later(entity_id)
                title, description, version, priority = _details(state, notes)
                await async_sync_update(
                    hass, entity_id=entity_id, available=True, title=title,
                    description=description, version=version, priority=priority,
                    category=_category(hass, state),
                )
            else:
                _cancel_notes_retry(entity_id)
                await async_sync_update(hass, entity_id=entity_id, available=False)
        except Exception:  # noqa: BLE001 - one bad update must not stop the watcher
            _LOGGER.warning("Could not sync update %s to a Home Desk ticket", entity_id, exc_info=True)

    def _clear_later(entity_id: str, delay: float) -> None:
        _cancel(entity_id)

        async def _check(_now: Any) -> None:
            pending.pop(entity_id, None)
            await _sync(entity_id)  # check current state, not the event's old snapshot

        pending[entity_id] = async_call_later(hass, delay, _check)

    await asyncio.gather(*(_sync(state.entity_id) for state in list(hass.states.async_all("update")) if state.state == "on"))
    for entity_id in await async_open_update_entity_ids(hass):
        state = hass.states.get(entity_id)
        if state is None or state.state == "off":
            _clear_later(entity_id, START_GRACE)

    @callback
    def _changed(event: Event) -> None:
        entity_id = event.data.get("entity_id", "")
        if not entity_id.startswith("update."):
            return
        new_state = event.data.get("new_state")
        if new_state is not None and new_state.state not in ("on", "off"):
            return
        if new_state is not None and new_state.state == "on":
            _cancel(entity_id)
            hass.async_create_task(_sync(entity_id))
        else:
            settling = START_GRACE - (_clock() - started)
            _clear_later(entity_id, max(CLEAR_GRACE, settling))

    stop = hass.bus.async_listen(EVENT_STATE_CHANGED, _changed)

    def _stop() -> None:
        stop()
        for entity_id in list(pending):
            _cancel(entity_id)
        for entity_id in list(notes_retry):
            _cancel_notes_retry(entity_id)

    return _stop
