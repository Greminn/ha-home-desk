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
    BLOCKED_LABEL_ID,
    BUILTIN_LABELS,
    DOMAIN,
    EVENT_TICKET,
    HA_LABEL_ID,
    HISTORY_LABEL_ID,
    LABEL_AUTO_COLORS,
    LABEL_COLORS,
    LEGACY_TYPE_LABELS,
    PRIORITIES,
    STATUSES,
)

_STORE_VERSION = 1  # shape changes are migrated in _load, not by bumping this
_STORE_KEY = f"{DOMAIN}.tickets"
# This integration was first called Support Tickets (domain support_tickets); its data is picked up once.
_LEGACY_STORE_KEY = "support_tickets.tickets"

# Fields a caller may change on an existing ticket (besides add/remove_labels).
_EDITABLE = (
    "title",
    "description",
    "status",
    "priority",
    "assignee",
    "labels",
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
    """The palette colour used by the fewest labels so far (ties go to palette order)."""
    used = [t["color"] for t in registry.values()]
    return min(LABEL_AUTO_COLORS, key=lambda c: used.count(c))


def _add_label(
    registry: dict[str, Any], name: str, color: str | None = None, label_id: str | None = None
) -> dict[str, Any]:
    label = {
        "id": label_id or _slug(name),
        "name": name.strip(),
        "color": color or _auto_color(registry),
        "description": "",
        "builtin": False,
    }
    registry[label["id"]] = label
    return label


def _resolve_label(data: dict[str, Any], raw: str, *, create: bool = True) -> str | None:
    """A label id for what a caller typed: an id, or a name (any case). New names create a label."""
    raw = (raw or "").strip()
    registry = data["label_registry"]
    if not raw:
        return None
    if raw in registry:
        return raw
    slug = _slug(raw)
    if slug in registry:
        return slug
    for label in registry.values():
        if label["name"].lower() == raw.lower():
            return label["id"]
    if not slug:
        raise TicketError(f"Invalid label {raw!r}")
    if not create:
        return None
    # A slug-style name ("wall-tablet", as imports and agents often send) reads better spaced out.
    name = raw.replace("-", " ").capitalize() if raw == slug else raw
    return _add_label(registry, name, label_id=slug)["id"]


def _resolve_labels(data: dict[str, Any], raws: list[str] | None) -> list[str]:
    ids = {i for raw in raws or [] if (i := _resolve_label(data, raw))}
    return sorted(ids)


def upgrade_legacy_fields(fields: dict[str, Any], mode: str) -> dict[str, Any]:
    """Translate pre-label field names so older callers, agents and import files keep working.

    `mode` is "create" or "update" (label additions go to `labels` or `add_labels`)
    or "filter" (a list query; `type` becomes a `label` filter). Not applied to new names.
    """
    f = dict(fields)
    add_key = "labels" if mode == "create" else "add_labels"
    extra: list[str] = []
    if "tags" in f:
        f["labels" if mode != "filter" else "label"] = f.pop("tags")
    for old, new in (("add_tags", "add_labels"), ("remove_tags", "remove_labels"), ("tag", "label")):
        if old in f:
            f.setdefault(new, f.pop(old))
            f.pop(old, None)
    if "type" in f:
        label = LEGACY_TYPE_LABELS.get(f.pop("type"))
        if label and mode == "filter":
            f.setdefault("label", label)
        elif label:
            extra.append(label)
    if f.get("status") == "waiting":  # the old waiting status is now "open" plus the Blocked label
        f["status"] = "open"
        extra.append(BLOCKED_LABEL_ID)
    if extra and mode != "filter":
        f[add_key] = [*(f.get(add_key) or []), *extra]
    return f


def _migrate(data: dict[str, Any]) -> bool:
    """Bring older saved data up to the current shape. Returns True if anything changed."""
    changed = False
    if "label_registry" not in data:
        if "tag_registry" not in data:
            # Oldest shape: tags were plain strings with no definitions.
            registry: dict[str, Any] = {}
            data["tag_registry"] = registry
            for ticket in data["tickets"].values():
                resolved = []
                for raw in ticket["tags"]:
                    slug = _slug(raw)
                    if slug and slug not in registry:
                        registry[slug] = {"id": slug, "name": raw.replace("-", " ").capitalize(),
                                          "color": _auto_color(registry), "builtin": False}
                    resolved.append(slug)
                ticket["tags"] = sorted(set(resolved))
        data["label_registry"] = data.pop("tag_registry")
        for ticket in data["tickets"].values():
            ticket["labels"] = ticket.pop("tags", [])
        changed = True
    registry = data["label_registry"]
    for builtin in BUILTIN_LABELS:
        want = {**builtin, "builtin": True}
        if registry.get(builtin["id"]) != want:
            registry[builtin["id"]] = want
            changed = True
    for ticket in data["tickets"].values():
        # Type became a label; the waiting status became the Blocked label.
        if "type" in ticket:
            label = LEGACY_TYPE_LABELS.get(ticket.pop("type"))
            if label and label not in ticket["labels"]:
                ticket["labels"] = sorted({*ticket["labels"], label})
            changed = True
        if ticket["status"] == "waiting":
            ticket["status"] = "open"
            ticket["labels"] = sorted({*ticket["labels"], BLOCKED_LABEL_ID})
            _event(ticket, "Home Desk", "field",
                   "Status 'waiting' no longer exists: now open with the Blocked label", None)
            changed = True
    return changed


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
    status: str = "new",
    priority: str = "normal",
    requester: str = "unknown",
    assignee: str | None = None,
    labels: list[str] | None = None,
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
    _check(status, STATUSES, "status")
    _check(priority, PRIORITIES, "priority")
    ts = created_at or _now()
    label_ids = _resolve_labels(data, labels) or [HA_LABEL_ID]
    tid = data["next_id"]
    data["next_id"] = tid + 1
    ticket: dict[str, Any] = {
        "id": tid,
        "title": title,
        "description": description or "",
        "status": status,
        "priority": priority,
        "requester": requester,
        "assignee": assignee or None,
        "labels": label_ids,
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
    add_labels, remove_labels = fields.pop("add_labels", None), fields.pop("remove_labels", None)
    if add_labels or remove_labels:
        current = set(fields["labels"] if fields.get("labels") is not None else ticket["labels"])
        current |= set(_resolve_labels(data, add_labels))
        removing = {i for raw in remove_labels or [] if (i := _resolve_label(data, raw, create=False))}
        fields["labels"] = sorted(current - removing)
    elif fields.get("labels") is not None:
        fields["labels"] = _resolve_labels(data, fields["labels"])
    ts = _now()
    changed = False
    for key, new in fields.items():
        if key not in _EDITABLE:
            raise TicketError(f"Cannot update field {key!r}")
        if new is None and key != "assignee":
            continue
        if key == "assignee":
            new = new or None
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
    priority: str | None = None,
    assignee: str | None = None,
    requester: str | None = None,
    label: str | None = None,
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
    label_id = None
    if label:
        label_id = _resolve_label(data, label, create=False) or "\0"
    rows = []
    for t in data["tickets"].values():
        if status == "active":
            if t["status"] not in ACTIVE_STATUSES:
                continue
        elif status and status != "all" and t["status"] not in status.split(","):
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
        if label_id and label_id not in t["labels"]:
            continue
        if not include_history and HISTORY_LABEL_ID in t["labels"]:
            continue
        if needle:
            hay = " ".join(
                [
                    t["title"],
                    t["description"],
                    t.get("resolution") or "",
                    t.get("legacy_ref") or "",
                    " ".join(data["label_registry"][i]["name"] for i in t["labels"] if i in data["label_registry"]),
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
    labels = _label_list(data)
    return {
        "total": len(tickets),
        "active": len(active),
        "by_status": by_status,
        "urgent": sum(1 for t in active if t["priority"] == "urgent"),
        "unassigned": sum(1 for t in active if not t["assignee"]),
        "labels": labels,
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
            item = upgrade_legacy_fields(item, "create")
            related = item.pop("related_keys", None) or []
            key = item.get("source_key")
            if key and key in by_key:
                skipped += 1
                continue
            item["labels"] = [*(item.get("labels") or []), HA_LABEL_ID]
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


# ------------------------------------------------------------------ repairs

REPAIR_SOURCE = "Home Assistant Repairs"
REPAIR_ACTOR = "Home Assistant"
REPAIR_PREFIX = "repair:"


def repair_key(domain: str, issue_id: str) -> str:
    return f"{REPAIR_PREFIX}{domain}:{issue_id}"


async def async_open_repair_keys(hass: HomeAssistant) -> list[tuple[str, str]]:
    """(domain, issue_id) of every repair ticket that is still open."""
    async with _lock(hass):
        data = await _load(hass)
    out = []
    for t in data["tickets"].values():
        key = t.get("source_key") or ""
        if key.startswith(REPAIR_PREFIX) and t["status"] in ACTIVE_STATUSES:
            domain, _, issue_id = key[len(REPAIR_PREFIX):].partition(":")
            out.append((domain, issue_id))
    return out


async def async_sync_repair(
    hass: HomeAssistant,
    *,
    domain: str,
    issue_id: str,
    active: bool,
    ignored: bool = False,
    title: str = "",
    description: str = "",
    priority: str = "normal",
) -> str | None:
    """Make the ticket for one Home Assistant repair match the repair's state.

    One ticket per repair, found by its source key, so this is safe to call as often as
    you like. A new active repair opens a ticket; a repair that comes back after its ticket
    was closed reopens it; a repair that clears resolves it; an ignored repair gets the
    Blocked label while it is ignored. Returns what happened ("created", "reopened",
    "updated", "resolved") or None if nothing changed.
    """
    key = repair_key(domain, issue_id)
    kind: str | None = None
    async with _lock(hass):
        data = await _load(hass)
        ticket = next((t for t in data["tickets"].values() if t.get("source_key") == key), None)
        if ticket is None:
            if not active:
                return None
            ticket = _new_ticket(
                data,
                title=title or f"{domain}: {issue_id}",
                description=description,
                priority=priority,
                requester=REPAIR_ACTOR,
                labels=["Home Assistant", "Bug", "Repair"],
                source=REPAIR_SOURCE,
                source_key=key,
                actor=REPAIR_ACTOR,
            )
            if ignored:
                _apply_update(data, ticket, REPAIR_ACTOR, {"add_labels": [BLOCKED_LABEL_ID]})
                ticket["repair_blocked"] = True
            kind = "created"
        elif active:
            changed = False
            was_closed = ticket["status"] in ("resolved", "closed")
            fields: dict[str, Any] = {}
            if was_closed:
                fields["status"] = "open"
            if description and description != ticket["description"]:
                fields["description"] = description
            if ignored and BLOCKED_LABEL_ID not in ticket["labels"]:
                fields["add_labels"] = [BLOCKED_LABEL_ID]
                ticket["repair_blocked"] = True
            elif not ignored and ticket.get("repair_blocked"):
                fields["remove_labels"] = [BLOCKED_LABEL_ID]
                ticket["repair_blocked"] = False
            if fields:
                changed = _apply_update(data, ticket, REPAIR_ACTOR, fields)
            if was_closed:
                _event(ticket, REPAIR_ACTOR, "comment",
                       "Home Assistant is reporting this repair again, so the ticket was reopened.")
                kind = "reopened"
            elif changed:
                kind = "updated"
        elif ticket["status"] in ACTIVE_STATUSES:
            resolution = "Cleared by Home Assistant: this repair is no longer reported."
            _apply_update(data, ticket, REPAIR_ACTOR, {"status": "resolved", "resolution": resolution})
            _event(ticket, REPAIR_ACTOR, "comment", f"**Resolution:** {resolution}")
            kind = "resolved"
        if kind:
            ticket["updated_at"] = _now()
            await _save(hass, data)
    if kind:
        _fire(hass, ticket, "closed" if kind == "resolved" else kind if kind == "created" else "updated", REPAIR_ACTOR)
    return kind


# ------------------------------------------------------------------ label registry


def _label_list(data: dict[str, Any]) -> list[dict[str, Any]]:
    counts: dict[str, int] = {}
    for t in data["tickets"].values():
        for i in t["labels"]:
            counts[i] = counts.get(i, 0) + 1
    labels = [{**label, "count": counts.get(label["id"], 0)} for label in data["label_registry"].values()]
    # Built-ins first in their defined order, then the rest by name.
    order = {b["id"]: n for n, b in enumerate(BUILTIN_LABELS)}
    return sorted(labels, key=lambda x: (order.get(x["id"], len(order)), x["name"].lower()))


def _check_color(color: str) -> str:
    if color not in LABEL_COLORS:
        raise TicketError(f"Invalid colour {color!r}; must be one of {LABEL_COLORS}")
    return color


async def async_list_labels(hass: HomeAssistant) -> list[dict[str, Any]]:
    async with _lock(hass):
        return _label_list(await _load(hass))


async def async_create_label(
    hass: HomeAssistant, *, name: str, color: str | None = None, description: str = ""
) -> dict[str, Any]:
    name = (name or "").strip()
    if not name or not _slug(name):
        raise TicketError("A label needs a name")
    async with _lock(hass):
        data = await _load(hass)
        if _resolve_label(data, name, create=False):
            raise TicketError(f"A label named {name!r} already exists")
        label = _add_label(data["label_registry"], name, _check_color(color) if color else None)
        label["description"] = description.strip()
        await _save(hass, data)
    return label


async def async_update_label(
    hass: HomeAssistant,
    label_id: str,
    *,
    name: str | None = None,
    color: str | None = None,
    description: str | None = None,
) -> dict[str, Any]:
    async with _lock(hass):
        data = await _load(hass)
        label = data["label_registry"].get(label_id)
        if label is None:
            raise TicketError(f"Label {label_id!r} not found")
        if label["builtin"]:
            raise TicketError(f"{label['name']} is a built-in label and can't be changed")
        if name is not None:
            name = name.strip()
            other = _resolve_label(data, name, create=False)
            if not name or not _slug(name):
                raise TicketError("A label needs a name")
            if other and other != label_id:
                raise TicketError(f"A label named {name!r} already exists")
            label["name"] = name  # the id stays put, so tickets keep their labels
        if color is not None:
            label["color"] = _check_color(color)
        if description is not None:
            label["description"] = description.strip()
        await _save(hass, data)
    return label


async def async_delete_label(hass: HomeAssistant, label_id: str) -> int:
    """Delete a label and remove it from every ticket. Returns how many tickets lost it."""
    async with _lock(hass):
        data = await _load(hass)
        label = data["label_registry"].get(label_id)
        if label is None:
            raise TicketError(f"Label {label_id!r} not found")
        if label["builtin"]:
            raise TicketError(f"{label['name']} is a built-in label and can't be deleted")
        removed = 0
        for t in data["tickets"].values():
            if label_id in t["labels"]:
                t["labels"] = [i for i in t["labels"] if i != label_id]
                removed += 1
        del data["label_registry"][label_id]
        await _save(hass, data)
    return removed
