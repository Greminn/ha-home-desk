"""What a ticket is about, in Home Assistant's terms: reading the entity, device and area registries and guessing what an
unlabelled ticket concerns (matching.py does the scoring). Nothing here asks an AI: Review with AI is where that happens."""

from __future__ import annotations

import logging
from typing import Any

from homeassistant.core import HomeAssistant

from .matching import best

_LOGGER = logging.getLogger(__name__)
SKIP_DOMAINS = {"update", "event", "button", "number", "select", "text", "scene", "script", "automation", "tts", "stt", "ai_task",
                "conversation", "persistent_notification", "todo", "calendar", "sun", "weather", "zone", "person", "device_tracker"}


def _registries(hass: HomeAssistant):
    from homeassistant.helpers import area_registry as ar, device_registry as dr, entity_registry as er

    return er.async_get(hass), dr.async_get(hass), ar.async_get(hass)


def _device_entries(dev_reg: Any) -> list[Any]:
    """Every device in the registry. Home Assistant is retiring the registry's `devices` as a mapping (`.values()`, `[id]`) in
    favour of iterating it for the entries; an older Home Assistant gives the device ids when iterated, so those are looked up."""
    return [dev_reg.devices[item] if isinstance(item, str) else item for item in dev_reg.devices]


def _exposed(hass: HomeAssistant, entity_id: str) -> bool:
    """Whether the entity is exposed to Assist: someone has already chosen it as one that matters."""
    try:
        from homeassistant.components.homeassistant.exposed_entities import async_should_expose

        return bool(async_should_expose(hass, "conversation", entity_id))
    except Exception:  # noqa: BLE001 - no Assist, no bonus
        return False


def _aliases(values: Any) -> list[str]:
    """The text aliases of an entity or area. Home Assistant also puts a COMPUTED_NAME marker in an entity's aliases (it stands
    for the entity's own computed name, which is matched through its friendly name already); it is not a string, so it is left out."""
    return sorted(a for a in (values or []) if isinstance(a, str))


def async_candidates(hass: HomeAssistant) -> list[dict[str, Any]]:
    """Everything a ticket could be about: entities, devices and areas, each with its names and where it is."""
    ent_reg, dev_reg, area_reg = _registries(hass)
    area_names = {a.id: a.name for a in area_reg.async_list_areas()}
    out: list[dict[str, Any]] = []
    for area in area_reg.async_list_areas():
        out.append({"kind": "area", "id": area.id, "name": area.name, "aliases": _aliases(area.aliases)})
    for device in _device_entries(dev_reg):
        if device.disabled_by:
            continue
        out.append({
            "kind": "device", "id": device.id, "name": device.name_by_user or device.name or "", "aliases": [],
            "area": area_names.get(device.area_id, ""), "detail": " ".join(x for x in (device.manufacturer, device.model) if x),
        })
    for state in hass.states.async_all():
        domain = state.entity_id.split(".", 1)[0]
        if domain in SKIP_DOMAINS:
            continue
        entry = ent_reg.async_get(state.entity_id)
        if entry and (entry.disabled_by or entry.hidden_by or entry.entity_category):
            continue
        device = dev_reg.async_get(entry.device_id) if entry and entry.device_id else None
        area_id = (entry.area_id if entry else None) or (device.area_id if device else None)
        out.append({
            "kind": "entity", "id": state.entity_id, "name": str(state.attributes.get("friendly_name") or state.entity_id),
            "aliases": _aliases(entry.aliases) if entry else [], "area": area_names.get(area_id, ""), "domain": domain,
            "device_id": entry.device_id if entry else None, "exposed": _exposed(hass, state.entity_id),
        })
    return out


def _described(hass: HomeAssistant, c: dict[str, Any]) -> dict[str, Any]:
    """A candidate as the panel needs it: what it is, its name, where it is, and an entity's state."""
    out = {"kind": c["kind"], "id": c["id"], "name": c["name"], "area": c.get("area", ""), "score": c.get("score", 0)}
    if c["kind"] == "entity":
        state = hass.states.get(c["id"])
        out["state"] = state.state if state else ""
    return out


def _skip(ticket: dict[str, Any]) -> set[tuple[str, str]]:
    return {("entity", i) for i in ticket.get("entities", [])} | {("device", i) for i in ticket.get("devices", [])} | {
        ("area", i) for i in ticket.get("areas", [])}


def ticket_text(ticket: dict[str, Any]) -> str:
    return f"{ticket['title']}\n{ticket.get('description', '')}"


def async_guess(hass: HomeAssistant, ticket: dict[str, Any], limit: int = 6) -> list[dict[str, Any]]:
    """The things a ticket is probably about, from the words in it, leaving out what it already names."""
    found = best(ticket_text(ticket), async_candidates(hass), skip=_skip(ticket), limit=limit)
    return [_described(hass, c) for c in found]


def device_entities(hass: HomeAssistant, device_id: str, limit: int = 10) -> list[str]:
    ent_reg, _, _ = _registries(hass)
    from homeassistant.helpers import entity_registry as er

    return [e.entity_id for e in er.async_entries_for_device(ent_reg, device_id)
            if not (e.disabled_by or e.hidden_by or e.entity_category)][:limit]


def area_entities(hass: HomeAssistant, area_id: str, limit: int = 10) -> list[str]:
    ent_reg, dev_reg, _ = _registries(hass)
    from homeassistant.helpers import entity_registry as er

    found = [e.entity_id for e in er.async_entries_for_area(ent_reg, area_id)
             if not (e.disabled_by or e.hidden_by or e.entity_category) and e.entity_id.split(".", 1)[0] not in SKIP_DOMAINS]
    return found[:limit]


def name_of(hass: HomeAssistant, kind: str, thing_id: str) -> tuple[str, str]:
    """(name, area name) of an entity, device or area, or ("", "") if it is gone."""
    ent_reg, dev_reg, area_reg = _registries(hass)
    if kind == "area":
        area = area_reg.async_get_area(thing_id)
        return (area.name, "") if area else ("", "")
    if kind == "device":
        device = dev_reg.async_get(thing_id)
        if not device:
            return "", ""
        area = area_reg.async_get_area(device.area_id) if device.area_id else None
        return device.name_by_user or device.name or "", area.name if area else ""
    state = hass.states.get(thing_id)
    return (str(state.attributes.get("friendly_name") or thing_id) if state else ""), ""
