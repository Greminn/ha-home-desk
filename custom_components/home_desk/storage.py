"""Persistent ticket storage for Home Desk.

One Store-backed JSON document at /config/.storage/home_desk.tickets,
wrapped in a lock. Each ticket carries its own timeline (`events`), so a
ticket is a single self-contained record.
"""

from __future__ import annotations

import asyncio
from datetime import datetime, timezone
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

import re

from .const import (
    ACTIVE_STATUSES,
    DOMAIN,
    EVENT_TICKET,
    HA_TAG,
    HA_TAG_ID,
    PRIORITIES,
    STATUSES,
    TAG_AUTO_COLORS,
    TAG_COLORS,
    TYPES,
)

_STORE_VERSION = 1  # shape changes are migrated in _load, not by bumping this
_STORE_KEY = f"{DOMAIN}.tickets"
# This integration was first called Support Tickets (domain support_tickets); its data is picked up once.
_LEGACY_STORE_KEY = "support_tickets.tickets"

# Fields a caller may change on an existing ticket (besides add/remove_tags).
_EDITABLE = (
    "title",
    "description",
    "type",
    "status",
    "priority",
    "assignee",
    "tags",
    "entities",
    "resolution",
)
# Timeline event kinds only an admin may see (internal working notes).
INTERNAL_KINDS = ("note",)


class TicketError(Exception):
    """A request that can't be applied (unknown ticket, bad value)."""


def _now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def _lock(hass: HomeAssistant) -> asyncio.Lock:
    key = f"{DOMAIN}_storage_lock"
    if key not in hass.data:
        hass.data[key] = asyncio.Lock()
    return hass.data[key]


def _store(hass: HomeAssistant) -> Store[dict[str, Any]]:
    return Store(hass, _STORE_VERSION, _STORE_KEY)


def _slug(name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", name.strip().lower()).strip("-")


def _auto_color(registry: dict[str, Any]) -> str:
    """The palette colour used by the fewest tags so far (ties go to palette order)."""
    used = [t["color"] for t in registry.values()]
    return min(TAG_AUTO_COLORS, key=lambda c: used.count(c))


def _add_tag(
    registry: dict[str, Any], name: str, color: str | None = None, tag_id: str | None = None
) -> dict[str, Any]:
    tag = {"id": tag_id or _slug(name), "name": name.strip(), "color": color or _auto_color(registry), "builtin": False}
    registry[tag["id"]] = tag
    return tag


def _resolve_tag(data: dict[str, Any], raw: str, *, create: bool = True) -> str | None:
    """A tag id for what a caller typed: an id, or a name (any case). New names create a tag."""
    raw = (raw or "").strip()
    registry = data["tag_registry"]
    if not raw:
        return None
    if raw in registry:
        return raw
    slug = _slug(raw)
    if slug in registry:
        return slug
    for tag in registry.values():
        if tag["name"].lower() == raw.lower():
            return tag["id"]
    if not slug:
        raise TicketError(f"Invalid tag {raw!r}")
    if not create:
        return None
    # A slug-style name ("wall-tablet", as imports and agents often send) reads better spaced out.
    name = raw.replace("-", " ").capitalize() if raw == slug else raw
    return _add_tag(data["tag_registry"], name, tag_id=slug)["id"]


def _resolve_tags(data: dict[str, Any], raws: list[str] | None) -> list[str]:
    ids = {i for raw in raws or [] if (i := _resolve_tag(data, raw))}
    return sorted(ids)


def _migrate(data: dict[str, Any]) -> bool:
    """Add the tag registry to data saved before tags had definitions."""
    if "tag_registry" in data:
        data["tag_registry"][HA_TAG_ID] = dict(HA_TAG)
        return False
    registry: dict[str, Any] = {HA_TAG_ID: dict(HA_TAG)}
    data["tag_registry"] = registry
    for ticket in data["tickets"].values():
        resolved = []
        for raw in ticket["tags"]:
            slug = _slug(raw)
            if slug and slug not in registry:
                _add_tag(registry, raw.replace("-", " ").capitalize(), tag_id=slug)
            resolved.append(slug)
        ticket["tags"] = sorted(set(resolved) | {HA_TAG_ID})
    return True


async def _load(hass: HomeAssistant) -> dict[str, Any]:
    data = await _store(hass).async_load()
    fresh = not data or "tickets" not in data
    if fresh:
        # First run under this name: adopt tickets saved by the old Support Tickets domain, if any.
        # The old file is left in place as a backup.
        legacy = await Store(hass, _STORE_VERSION, _LEGACY_STORE_KEY).async_load()
        data = legacy if legacy and "tickets" in legacy else {"next_id": 1, "tickets": {}}
        fresh = bool(legacy and "tickets" in legacy)
    if _migrate(data) or fresh:
        await _save(hass, data)
    return data


async def _save(hass: HomeAssistant, data: dict[str, Any]) -> None:
    await _store(hass).async_save(data)


def _check(value: str, allowed: list[str], what: str) -> str:
    if value not in allowed:
        raise TicketError(f"Invalid {what} {value!r}; must be one of {allowed}")
    return value


def _event(
    ticket: dict[str, Any],
    actor: str,
    kind: str,
    body: str | None = None,
    data: dict[str, Any] | None = None,
    at: str | None = None,
) -> dict[str, Any]:
    ev: dict[str, Any] = {
        "id": len(ticket["events"]) + 1,
        "actor": actor,
        "kind": kind,
        "body": body,
        "data": data,
        "created_at": at or _now(),
    }
    ticket["events"].append(ev)
    return ev


def _fire(hass: HomeAssistant, ticket: dict[str, Any], kind: str, actor: str) -> None:
    hass.bus.async_fire(
        EVENT_TICKET,
        {
            "ticket_id": ticket["id"],
            "kind": kind,
            "actor": actor,
            "title": ticket["title"],
            "status": ticket["status"],
            "priority": ticket["priority"],
            "requester": ticket["requester"],
            "assignee": ticket["assignee"],
        },
    )


def _summary(ticket: dict[str, Any]) -> dict[str, Any]:
    """The list-row view: everything but the body and timeline."""
    comments = [e for e in ticket["events"] if e["kind"] in ("comment", "note")]
    return {
        **{k: v for k, v in ticket.items() if k not in ("description", "events", "resolution")},
        "comment_count": len(comments),
        "has_resolution": bool(ticket.get("resolution")),
    }


def view(ticket: dict[str, Any], *, admin: bool = True) -> dict[str, Any]:
    """Full ticket, with internal notes stripped for non-admins."""
    out = dict(ticket)
    if not admin:
        out["events"] = [e for e in ticket["events"] if e["kind"] not in INTERNAL_KINDS]
    return out


def _new_ticket(
    data: dict[str, Any],
    *,
    title: str,
    description: str = "",
    type: str = "issue",
    status: str = "new",
    priority: str = "normal",
    requester: str = "unknown",
    assignee: str | None = None,
    tags: list[str] | None = None,
    entities: list[str] | None = None,
    actor: str | None = None,
    legacy_ref: str | None = None,
    source: str | None = None,
    source_key: str | None = None,
    created_at: str | None = None,
    updated_at: str | None = None,
    closed_at: str | None = None,
    resolution: str | None = None,
) -> dict[str, Any]:
    title = (title or "").strip()
    if not title:
        raise TicketError("A ticket needs a title")
    _check(type, TYPES, "type")
    _check(status, STATUSES, "status")
    _check(priority, PRIORITIES, "priority")
    ts = created_at or _now()
    tag_ids = _resolve_tags(data, tags) or [HA_TAG_ID]
    tid = data["next_id"]
    data["next_id"] = tid + 1
    ticket: dict[str, Any] = {
        "id": tid,
        "title": title,
        "description": description or "",
        "type": type,
        "status": status,
        "priority": priority,
        "requester": requester,
        "assignee": assignee or None,
        "tags": tag_ids,
        "entities": sorted(set(entities or [])),
        "links": [],
        "legacy_ref": legacy_ref,
        "source": source,
        "source_key": source_key,
        "resolution": resolution,
        "created_at": ts,
        "updated_at": updated_at or ts,
        "closed_at": (closed_at or updated_at or ts) if status in ("resolved", "closed") else None,
        "events": [],
    }
    _event(ticket, actor or requester, "created", at=ts)
    data["tickets"][str(tid)] = ticket
    return ticket


def _get(data: dict[str, Any], ticket_id: int) -> dict[str, Any]:
    ticket = data["tickets"].get(str(ticket_id))
    if ticket is None:
        raise TicketError(f"Ticket {ticket_id} not found")
    return ticket


def _apply_update(data: dict[str, Any], ticket: dict[str, Any], actor: str, fields: dict[str, Any]) -> bool:
    """Apply field changes, recording one timeline event per real change."""
    fields = dict(fields)
    add_tags, remove_tags = fields.pop("add_tags", None), fields.pop("remove_tags", None)
    if add_tags or remove_tags:
        current = set(ticket["tags"]) | set(_resolve_tags(data, add_tags))
        removing = {i for raw in remove_tags or [] if (i := _resolve_tag(data, raw, create=False))}
        fields["tags"] = sorted(current - removing)
    elif fields.get("tags") is not None:
        fields["tags"] = _resolve_tags(data, fields["tags"])
    ts = _now()
    changed = False
    for key, new in fields.items():
        if key not in _EDITABLE:
            raise TicketError(f"Cannot update field {key!r}")
        if new is None and key != "assignee":
            continue
        if key == "assignee":
            new = new or None
        elif key == "type":
            _check(new, TYPES, "type")
        elif key == "status":
            _check(new, STATUSES, "status")
        elif key == "priority":
            _check(new, PRIORITIES, "priority")
        elif key == "entities":
            new = sorted(set(new))
        old = ticket[key]
        if new == old:
            continue
        ticket[key] = new
        changed = True
        kind = key if key in ("status", "priority", "assignee") else "field"
        payload: dict[str, Any] = {"field": key}
        if key != "description":
            payload.update({"from": old, "to": new})
        _event(ticket, actor, kind, None, payload, ts)
        if key == "status":
            ticket["closed_at"] = ts if new in ("resolved", "closed") else None
    if changed:
        ticket["updated_at"] = ts
    return changed


# ---------------------------------------------------------------- public API


async def async_get_ticket(hass: HomeAssistant, ticket_id: int) -> dict[str, Any]:
    async with _lock(hass):
        data = await _load(hass)
        ticket = _get(data, ticket_id)
        out = dict(ticket)
        out["related"] = [
            {"id": t["id"], "title": t["title"], "status": t["status"]}
            for i in ticket["links"]
            if (t := data["tickets"].get(str(i)))
        ]
        return out


async def async_list_tickets(
    hass: HomeAssistant,
    *,
    status: str | None = None,
    q: str | None = None,
    type: str | None = None,
    priority: str | None = None,
    assignee: str | None = None,
    requester: str | None = None,
    tag: str | None = None,
    include_history: bool = True,
    limit: int = 500,
    offset: int = 0,
) -> dict[str, Any]:
    """Filter tickets. `status` is a status, a comma list, 'active' or 'all'."""
    if status and status not in ("all", "active"):
        for s in status.split(","):
            _check(s, STATUSES, "status")
    async with _lock(hass):
        data = await _load(hass)
    needle = (q or "").lower()
    tag_id = None
    if tag:
        tag_id = _resolve_tag(data, tag, create=False) or "\0"
    rows = []
    for t in data["tickets"].values():
        if status == "active":
            if t["status"] not in ACTIVE_STATUSES:
                continue
        elif status and status != "all" and t["status"] not in status.split(","):
            continue
        if type and t["type"] != type:
            continue
        if priority and t["priority"] != priority:
            continue
        if assignee == "unassigned":
            if t["assignee"]:
                continue
        elif assignee and t["assignee"] != assignee:
            continue
        if requester and t["requester"] != requester:
            continue
        if tag_id and tag_id not in t["tags"]:
            continue
        if not include_history and t["type"] == "log":
            continue
        if needle:
            hay = " ".join(
                [
                    t["title"],
                    t["description"],
                    t.get("resolution") or "",
                    t.get("legacy_ref") or "",
                    " ".join(data["tag_registry"][i]["name"] for i in t["tags"] if i in data["tag_registry"]),
                    " ".join(t["entities"]),
                    " ".join(e["body"] or "" for e in t["events"]),
                ]
            ).lower()
            if needle not in hay:
                continue
        rows.append(t)
    prio = {"urgent": 0, "high": 1, "normal": 2, "low": 3}
    rows.sort(key=lambda t: t["updated_at"], reverse=True)
    rows.sort(key=lambda t: prio[t["priority"]])
    rows.sort(key=lambda t: t["status"] in ("resolved", "closed"))
    return {
        "total": len(rows),
        "tickets": [_summary(t) for t in rows[offset : offset + limit]],
    }


async def async_create_ticket(hass: HomeAssistant, **kwargs: Any) -> dict[str, Any]:
    async with _lock(hass):
        data = await _load(hass)
        ticket = _new_ticket(data, **kwargs)
        await _save(hass, data)
    _fire(hass, ticket, "created", ticket["events"][0]["actor"])
    return ticket


async def async_update_ticket(
    hass: HomeAssistant, ticket_id: int, *, actor: str, **fields: Any
) -> dict[str, Any]:
    async with _lock(hass):
        data = await _load(hass)
        ticket = _get(data, ticket_id)
        changed = _apply_update(data, ticket, actor, fields)
        if changed:
            await _save(hass, data)
    if changed:
        _fire(hass, ticket, "updated", actor)
    return ticket


async def async_add_comment(
    hass: HomeAssistant,
    ticket_id: int,
    *,
    actor: str,
    body: str,
    internal: bool = False,
) -> dict[str, Any]:
    body = (body or "").strip()
    if not body:
        raise TicketError("A comment needs text")
    async with _lock(hass):
        data = await _load(hass)
        ticket = _get(data, ticket_id)
        ts = _now()
        _event(ticket, actor, "note" if internal else "comment", body, None, ts)
        ticket["updated_at"] = ts
        await _save(hass, data)
    _fire(hass, ticket, "note" if internal else "comment", actor)
    return ticket


async def async_close_ticket(
    hass: HomeAssistant,
    ticket_id: int,
    *,
    actor: str,
    resolution: str,
    status: str = "resolved",
) -> dict[str, Any]:
    if status not in ("resolved", "closed"):
        raise TicketError("status must be 'resolved' or 'closed'")
    resolution = (resolution or "").strip()
    if not resolution:
        raise TicketError("Closing a ticket needs resolution notes")
    async with _lock(hass):
        data = await _load(hass)
        ticket = _get(data, ticket_id)
        _apply_update(data, ticket, actor, {"status": status, "resolution": resolution})
        _event(ticket, actor, "comment", f"**Resolution:** {resolution}")
        await _save(hass, data)
    _fire(hass, ticket, "closed", actor)
    return ticket


async def async_link_tickets(
    hass: HomeAssistant, ticket_id: int, other_id: int, *, actor: str
) -> dict[str, Any]:
    async with _lock(hass):
        data = await _load(hass)
        a, b = _get(data, ticket_id), _get(data, other_id)
        if a is b:
            raise TicketError("Cannot link a ticket to itself")
        for x, y in ((a, b), (b, a)):
            if y["id"] not in x["links"]:
                x["links"].append(y["id"])
        _event(a, actor, "link", None, {"to": other_id})
        _event(b, actor, "link", None, {"to": ticket_id})
        await _save(hass, data)
    return a


async def async_stats(hass: HomeAssistant) -> dict[str, Any]:
    async with _lock(hass):
        data = await _load(hass)
    tickets = list(data["tickets"].values())
    active = [t for t in tickets if t["status"] in ACTIVE_STATUSES]
    by_status: dict[str, int] = {}
    for t in tickets:
        by_status[t["status"]] = by_status.get(t["status"], 0) + 1
    tags = _tag_list(data)
    return {
        "total": len(tickets),
        "active": len(active),
        "by_status": by_status,
        "urgent": sum(1 for t in active if t["priority"] == "urgent"),
        "unassigned": sum(1 for t in active if not t["assignee"]),
        "tags": tags,
    }


async def async_import_tickets(
    hass: HomeAssistant, items: list[dict[str, Any]], *, actor: str
) -> dict[str, int]:
    """Idempotent bulk import: an item whose `source_key` already exists is skipped.

    Each item may carry `related_keys` (source_keys of other imported items) which
    become ticket links once everything is in. Imported timestamps are preserved.
    """
    created = skipped = 0
    async with _lock(hass):
        data = await _load(hass)
        by_key = {t["source_key"]: t for t in data["tickets"].values() if t.get("source_key")}
        pending_links: list[tuple[dict[str, Any], list[str]]] = []
        for item in items:
            item = dict(item)
            related = item.pop("related_keys", None) or []
            key = item.get("source_key")
            if key and key in by_key:
                skipped += 1
                continue
            item["tags"] = [*(item.get("tags") or []), HA_TAG_ID]
            ticket = _new_ticket(data, actor=actor, **item)
            if key:
                by_key[key] = ticket
            pending_links.append((ticket, related))
            created += 1
        linked = 0
        for ticket, related in pending_links:
            for key in related:
                other = by_key.get(key)
                if other is None or other is ticket:
                    continue
                for x, y in ((ticket, other), (other, ticket)):
                    if y["id"] not in x["links"]:
                        x["links"].append(y["id"])
                        linked += 1
        await _save(hass, data)
    return {"created": created, "skipped": skipped, "links": linked}


# ------------------------------------------------------------------ tag registry


def _tag_list(data: dict[str, Any]) -> list[dict[str, Any]]:
    counts: dict[str, int] = {}
    for t in data["tickets"].values():
        for i in t["tags"]:
            counts[i] = counts.get(i, 0) + 1
    tags = [{**tag, "count": counts.get(tag["id"], 0)} for tag in data["tag_registry"].values()]
    return sorted(tags, key=lambda t: (not t["builtin"], t["name"].lower()))


def _check_color(color: str) -> str:
    if color not in TAG_COLORS:
        raise TicketError(f"Invalid colour {color!r}; must be one of {TAG_COLORS}")
    return color


async def async_list_tags(hass: HomeAssistant) -> list[dict[str, Any]]:
    async with _lock(hass):
        return _tag_list(await _load(hass))


async def async_create_tag(hass: HomeAssistant, *, name: str, color: str | None = None) -> dict[str, Any]:
    name = (name or "").strip()
    if not name or not _slug(name):
        raise TicketError("A tag needs a name")
    async with _lock(hass):
        data = await _load(hass)
        if _resolve_tag(data, name, create=False):
            raise TicketError(f"A tag named {name!r} already exists")
        tag = _add_tag(data["tag_registry"], name, _check_color(color) if color else None)
        await _save(hass, data)
    return tag


async def async_update_tag(
    hass: HomeAssistant, tag_id: str, *, name: str | None = None, color: str | None = None
) -> dict[str, Any]:
    async with _lock(hass):
        data = await _load(hass)
        tag = data["tag_registry"].get(tag_id)
        if tag is None:
            raise TicketError(f"Tag {tag_id!r} not found")
        if tag["builtin"]:
            raise TicketError(f"{tag['name']} is a built-in tag and can't be changed")
        if name is not None:
            name = name.strip()
            other = _resolve_tag(data, name, create=False)
            if not name or not _slug(name):
                raise TicketError("A tag needs a name")
            if other and other != tag_id:
                raise TicketError(f"A tag named {name!r} already exists")
            tag["name"] = name  # the id stays put, so tickets keep their tags
        if color is not None:
            tag["color"] = _check_color(color)
        await _save(hass, data)
    return tag


async def async_delete_tag(hass: HomeAssistant, tag_id: str) -> int:
    """Delete a tag and remove it from every ticket. Returns how many tickets lost it."""
    async with _lock(hass):
        data = await _load(hass)
        tag = data["tag_registry"].get(tag_id)
        if tag is None:
            raise TicketError(f"Tag {tag_id!r} not found")
        if tag["builtin"]:
            raise TicketError(f"{tag['name']} is a built-in tag and can't be deleted")
        removed = 0
        for t in data["tickets"].values():
            if tag_id in t["tags"]:
                t["tags"] = [i for i in t["tags"] if i != tag_id]
                removed += 1
        del data["tag_registry"][tag_id]
        await _save(hass, data)
    return removed
