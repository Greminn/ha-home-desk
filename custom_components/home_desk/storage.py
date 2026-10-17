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
    AUTO_CLOSE_SECONDS,
    BLOCKED_LABEL_ID,
    BUILTIN_CATEGORIES,
    BUILTIN_LABELS,
    DEFAULT_NOTIFY,
    DEFAULT_SETTINGS,
    DOMAIN,
    EVENT_TICKET,
    HA_CATEGORY_ID,
    HA_LABEL_ID,
    HISTORY_LABEL_ID,
    LABEL_AUTO_COLORS,
    LABEL_COLORS,
    LEGACY_TYPE_LABELS,
    MAX_NAME,
    MAX_TEXT,
    MAX_TITLE,
    PRIORITIES,
    STATUS_ALIASES,
    STATUSES,
    SYSTEM_ACTORS,
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
    "category",
    "entities",
    "resolution",
)
# Timeline event kinds only an admin may see (internal working notes).
INTERNAL_KINDS = ("note",)


class TicketError(Exception):
    """A request that can't be applied (unknown ticket, bad value)."""


def _limit(value: str | None, longest: int, what: str) -> str | None:
    """Refuse text that is far longer than any real ticket, comment or name."""
    if value is not None and len(value) > longest:
        raise TicketError(f"{what} is too long ({len(value)} characters; the limit is {longest})")
    return value


def _status(value: str) -> str:
    """A status as stored: an old name such as "open" becomes what it was merged into."""
    return STATUS_ALIASES.get(value, value)


def _agent_key(name: str) -> str:
    return (name or "").strip().lower().removeprefix("ai:").strip()


def is_agent(name: str | None) -> bool:
    """An AI agent: named ``ai:<name>`` (what the panel assigns) or a known agent such as Claude."""
    n = (name or "").strip().lower()
    return n.startswith("ai:") or "claude" in n


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
        "icon": "",
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


def _resolve_category(data: dict[str, Any], raw: str | None) -> str | None:
    """A category id for what a caller typed: an id or a name (any case). Unknown names are an error, so
    categories aren't created by accident; create one with `async_create_category`."""
    raw = (raw or "").strip()
    if not raw:
        return None
    registry = data["category_registry"]
    if raw in registry:
        return raw
    if _slug(raw) in registry:
        return _slug(raw)
    for category in registry.values():
        if category["name"].lower() == raw.lower():
            return category["id"]
    names = ", ".join(c["name"] for c in registry.values())
    raise TicketError(f"Unknown category {raw!r}. Existing categories: {names}. Create it first if it is new.")


def _category_name(data: dict[str, Any], category_id: str | None) -> str | None:
    category = data["category_registry"].get(category_id or "")
    return category["name"] if category else category_id


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
    if f.get("status") == "waiting":  # the old waiting status is now in progress plus the Blocked label
        f["status"] = "in_progress"
        extra.append(BLOCKED_LABEL_ID)
    elif f.get("status") in STATUS_ALIASES:
        f["status"] = _status(f["status"])
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
    for label in registry.values():
        if "icon" not in label:  # labels from before icons existed
            label["icon"] = ""
            changed = True
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
            ticket["status"] = "in_progress"
            ticket["labels"] = sorted({*ticket["labels"], BLOCKED_LABEL_ID})
            _event(ticket, "Home Desk", "field",
                   "Status 'waiting' no longer exists: now in progress with the Blocked label", None)
            changed = True
        elif ticket["status"] in STATUS_ALIASES:  # "open" was merged into in progress
            ticket["status"] = _status(ticket["status"])
            changed = True
        # The Home Assistant label became a category: take the label off (tickets are categorised afresh).
        if HA_LABEL_ID in ticket["labels"]:
            ticket["labels"] = [i for i in ticket["labels"] if i != HA_LABEL_ID]
            changed = True
        if "category" not in ticket:
            ticket["category"] = None
            changed = True
        if "attachments" not in ticket:
            ticket["attachments"] = []
            changed = True
        # Tickets raised from Home Assistant Repairs are about Home Assistant.
        if (ticket.get("source_key") or "").startswith("repair:") and not ticket["category"]:
            ticket["category"] = HA_CATEGORY_ID
            changed = True
    if HA_LABEL_ID in registry:
        del registry[HA_LABEL_ID]
        changed = True
    # Categories: the built-in ones are always present and locked.
    categories = data.setdefault("category_registry", {})
    for builtin in BUILTIN_CATEGORIES:
        want = {**builtin, "builtin": True}
        if categories.get(builtin["id"]) != want:
            categories[builtin["id"]] = want
            changed = True
    for key, default in (("settings", dict(DEFAULT_SETTINGS)), ("notify", {})):
        if key not in data:
            data[key] = default
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
            "with_agent": is_agent(ticket["assignee"]),
            "category": ticket.get("category"),
        },
    )


def _summary(ticket: dict[str, Any]) -> dict[str, Any]:
    """The list-row view: everything but the body and timeline."""
    comments = [e for e in ticket["events"] if e["kind"] in ("comment", "note")]
    return {
        **{k: v for k, v in ticket.items() if k not in ("description", "events", "resolution", "attachments")},
        "comment_count": len(comments),
        "attachment_count": len(ticket.get("attachments", [])),
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
    category: str | None = None,
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
    _limit(title, MAX_TITLE, "The title")
    _limit(description, MAX_TEXT, "The description")
    _limit(resolution, MAX_TEXT, "The resolution")
    status = _status(status)
    _check(status, STATUSES, "status")
    _check(priority, PRIORITIES, "priority")
    ts = created_at or _now()
    label_ids = _resolve_labels(data, labels)
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
        "category": _resolve_category(data, category) if category else None,
        "attachments": [],
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
    status_before = ticket["status"]
    for key, new in fields.items():
        if key not in _EDITABLE:
            raise TicketError(f"Cannot update field {key!r}")
        if new is None and key not in ("assignee", "category"):
            continue
        if key == "title":
            _limit(new, MAX_TITLE, "The title")
        elif key in ("description", "resolution"):
            _limit(new, MAX_TEXT, f"The {key}")
        if key == "assignee":
            new = new or None
        elif key == "category":
            new = _resolve_category(data, new)
        elif key == "status":
            new = _status(new)
            _check(new, STATUSES, "status")
        elif key == "priority":
            _check(new, PRIORITIES, "priority")
        elif key == "entities":
            new = sorted(set(new))
        old = ticket.get(key)
        if new == old:
            continue
        ticket[key] = new
        changed = True
        kind = key if key in ("status", "priority", "assignee") else "field"
        payload: dict[str, Any] = {"field": key}
        if key == "category":  # the timeline shows names, not ids
            payload.update({"from": _category_name(data, old), "to": _category_name(data, new)})
        elif key != "description":
            payload.update({"from": old, "to": new})
        _event(ticket, actor, kind, None, payload, ts)
        if key == "status":
            ticket["closed_at"] = ts if new in ("resolved", "closed") else None
    if changed:
        ticket["updated_at"] = ts
        if ticket["status"] == "resolved" and status_before != "resolved":
            _close_if_immediate(data, ticket)
    return changed


def _settings(data: dict[str, Any]) -> dict[str, Any]:
    return {**DEFAULT_SETTINGS, **data.get("settings", {})}


def _close_if_immediate(data: dict[str, Any], ticket: dict[str, Any]) -> None:
    """With the "straight away" setting, a resolved ticket closes at once."""
    if _settings(data)["auto_close"] == "immediately":
        _apply_update(data, ticket, "Home Desk", {"status": "closed"})


def _progress(ticket: dict[str, Any], actor: str, ts: str) -> bool:
    """The first thing done to a New ticket moves it to In Progress. Automatic sources don't count."""
    if ticket["status"] != "new" or actor in SYSTEM_ACTORS:
        return False
    ticket["status"] = "in_progress"
    _event(ticket, "Home Desk", "status", None, {"field": "status", "from": "new", "to": "in_progress"}, ts)
    ticket["updated_at"] = ts
    return True


def _hand_back(ticket: dict[str, Any], actor: str, ts: str) -> bool:
    """When the AI agent a ticket is assigned to replies, the ticket goes back to the manager."""
    assignee = ticket.get("assignee")
    if not assignee or not is_agent(assignee):
        return False
    if not (is_agent(actor) or _agent_key(actor) == _agent_key(assignee)):
        return False
    ticket["assignee"] = None
    _event(ticket, actor, "assignee", None, {"field": "assignee", "from": assignee, "to": None}, ts)
    return True


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
    category: str | None = None,
    include_history: bool = True,
    limit: int = 500,
    offset: int = 0,
) -> dict[str, Any]:
    """Filter tickets. `status` is a status, a comma list, 'active' or 'all'."""
    if status and status not in ("all", "active"):
        status = ",".join(_status(x) for x in status.split(","))
        for s in status.split(","):
            _check(s, STATUSES, "status")
    async with _lock(hass):
        data = await _load(hass)
    needle = (q or "").lower()
    label_id = None
    if label:
        label_id = _resolve_label(data, label, create=False) or "\0"
    category_id = None
    if category and category != "none":
        category_id = _resolve_category(data, category)
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
        if category == "none" and t.get("category"):
            continue
        if category_id and t.get("category") != category_id:
            continue
        if not include_history and HISTORY_LABEL_ID in t["labels"]:
            continue
        if needle:
            hay = " ".join(
                [
                    f"#{t['id']}",
                    t["title"],
                    t["description"],
                    t.get("resolution") or "",
                    t.get("legacy_ref") or "",
                    " ".join(data["label_registry"][i]["name"] for i in t["labels"] if i in data["label_registry"]),
                    _category_name(data, t.get("category")) or "",
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
        assignee_before = ticket["assignee"]
        changed = _apply_update(data, ticket, actor, fields)
        if changed and "status" not in fields:
            _progress(ticket, actor, ticket["updated_at"])
        if changed:
            await _save(hass, data)
    if changed:
        _fire(hass, ticket, "updated", actor)
        if ticket["assignee"] != assignee_before and is_agent(ticket["assignee"]):
            _fire(hass, ticket, "assigned", actor)  # lets an automation start the AI agent
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
    _limit(body, MAX_TEXT, "The comment")
    async with _lock(hass):
        data = await _load(hass)
        ticket = _get(data, ticket_id)
        ts = _now()
        _event(ticket, actor, "note" if internal else "comment", body, None, ts)
        ticket["updated_at"] = ts
        _progress(ticket, actor, ts)
        _hand_back(ticket, actor, ts)
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
    _limit(resolution, MAX_TEXT, "The resolution")
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
        "with_agent": sum(1 for t in active if is_agent(t["assignee"])),
        "no_category": sum(1 for t in active if not t.get("category")),
        "labels": labels,
        "categories": _category_list(data),
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
                labels=["Bug", "Repair"],
                category=HA_CATEGORY_ID,
                source=REPAIR_SOURCE,
                source_key=key,
                actor=REPAIR_ACTOR,
            )
            if ignored:
                _apply_update(data, ticket, REPAIR_ACTOR, {"add_labels": [BLOCKED_LABEL_ID]})
                ticket["repair_blocked"] = True
            ticket["repair_title"] = ticket["title"]
            kind = "created"
        elif active:
            changed = False
            was_closed = ticket["status"] in ("resolved", "closed")
            fields: dict[str, Any] = {}
            # Keep the title in step with Home Assistant's text, unless a person has renamed the ticket.
            renamed = any((e.get("data") or {}).get("field") == "title" for e in ticket["events"])
            auto_title = ticket.get("repair_title", None if renamed else ticket["title"])
            if title and title != ticket["title"] and ticket["title"] == auto_title:
                fields["title"] = title
                ticket["repair_title"] = title
            if was_closed:
                fields["status"] = "in_progress"
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


def _check_icon(icon: str) -> str:
    icon = (icon or "").strip()
    if icon and not re.fullmatch(r"[a-z0-9_-]+:[a-z0-9_-]+", icon):
        raise TicketError(f"Invalid icon {icon!r}; use a name like mdi:bug-outline")
    return icon


async def async_create_label(
    hass: HomeAssistant, *, name: str, color: str | None = None, description: str = "", icon: str = ""
) -> dict[str, Any]:
    name = (name or "").strip()
    if not name or not _slug(name):
        raise TicketError("A label needs a name")
    _limit(name, MAX_NAME, "The label name")
    async with _lock(hass):
        data = await _load(hass)
        if _resolve_label(data, name, create=False):
            raise TicketError(f"A label named {name!r} already exists")
        label = _add_label(data["label_registry"], name, _check_color(color) if color else None)
        label["description"] = description.strip()
        label["icon"] = _check_icon(icon)
        await _save(hass, data)
    return label


async def async_update_label(
    hass: HomeAssistant,
    label_id: str,
    *,
    name: str | None = None,
    color: str | None = None,
    description: str | None = None,
    icon: str | None = None,
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
        if icon is not None:
            label["icon"] = _check_icon(icon)
        await _save(hass, data)
    return label


async def async_delete_label(hass: HomeAssistant, label_id: str, *, only_if_empty: bool = False) -> int:
    """Delete a label and remove it from every ticket. Returns how many tickets lost it.

    With `only_if_empty` (what AI agents get) a label that is in use is refused instead.
    """
    async with _lock(hass):
        data = await _load(hass)
        label = data["label_registry"].get(label_id)
        if label is None:
            raise TicketError(f"Label {label_id!r} not found")
        if label["builtin"]:
            raise TicketError(f"{label['name']} is a built-in label and can't be deleted")
        using = [t for t in data["tickets"].values() if label_id in t["labels"]]
        if using and only_if_empty:
            raise TicketError(f"{len(using)} ticket(s) use {label['name']}; remove it from them first, or ask the manager to delete it")
        removed = 0
        for t in data["tickets"].values():
            if label_id in t["labels"]:
                t["labels"] = [i for i in t["labels"] if i != label_id]
                removed += 1
        del data["label_registry"][label_id]
        await _save(hass, data)
    return removed


# ------------------------------------------------------------------ category registry


def _category_list(data: dict[str, Any]) -> list[dict[str, Any]]:
    counts: dict[str, int] = {}
    for t in data["tickets"].values():
        if t.get("category"):
            counts[t["category"]] = counts.get(t["category"], 0) + 1
    cats = [{**c, "count": counts.get(c["id"], 0)} for c in data["category_registry"].values()]
    order = {b["id"]: n for n, b in enumerate(BUILTIN_CATEGORIES)}
    return sorted(cats, key=lambda c: (order.get(c["id"], len(order)), c["name"].lower()))


async def async_list_categories(hass: HomeAssistant) -> list[dict[str, Any]]:
    async with _lock(hass):
        return _category_list(await _load(hass))


def _category_exists(data: dict[str, Any], name: str, except_id: str | None = None) -> bool:
    return any(
        c["id"] != except_id and (c["name"].lower() == name.lower() or c["id"] == _slug(name))
        for c in data["category_registry"].values()
    )


async def async_create_category(hass: HomeAssistant, *, name: str, icon: str = "") -> dict[str, Any]:
    name = (name or "").strip()
    if not name or not _slug(name):
        raise TicketError("A category needs a name")
    _limit(name, MAX_NAME, "The category name")
    async with _lock(hass):
        data = await _load(hass)
        if _category_exists(data, name):
            raise TicketError(f"A category named {name!r} already exists")
        category = {"id": _slug(name), "name": name, "icon": _check_icon(icon), "builtin": False}
        data["category_registry"][category["id"]] = category
        await _save(hass, data)
    return category


async def async_update_category(
    hass: HomeAssistant, category_id: str, *, name: str | None = None, icon: str | None = None
) -> dict[str, Any]:
    async with _lock(hass):
        data = await _load(hass)
        category = data["category_registry"].get(category_id)
        if category is None:
            raise TicketError(f"Category {category_id!r} not found")
        if category["builtin"]:
            raise TicketError(f"{category['name']} is a built-in category and can't be changed")
        if name is not None:
            name = name.strip()
            if not name or not _slug(name):
                raise TicketError("A category needs a name")
            if _category_exists(data, name, except_id=category_id):
                raise TicketError(f"A category named {name!r} already exists")
            category["name"] = name  # the id stays put, so tickets keep their category
        if icon is not None:
            category["icon"] = _check_icon(icon)
        await _save(hass, data)
    return category


async def async_delete_category(hass: HomeAssistant, category_id: str, *, only_if_empty: bool = False) -> int:
    """Delete a category; tickets in it become uncategorised. Returns how many tickets that was.

    With `only_if_empty` (what AI agents get) a category that is in use is refused instead.
    """
    async with _lock(hass):
        data = await _load(hass)
        category = data["category_registry"].get(category_id)
        if category is None:
            raise TicketError(f"Category {category_id!r} not found")
        if category["builtin"]:
            raise TicketError(f"{category['name']} is a built-in category and can't be deleted")
        using = [t for t in data["tickets"].values() if t.get("category") == category_id]
        if using and only_if_empty:
            raise TicketError(f"{len(using)} ticket(s) use {category['name']}; move them first, or ask the manager to delete it")
        for t in using:
            t["category"] = None
        del data["category_registry"][category_id]
        await _save(hass, data)
    return len(using)


# ------------------------------------------------------------------ settings


def _user_notify(data: dict[str, Any], user_id: str | None) -> dict[str, Any]:
    mine = data.get("notify", {}).get(user_id or "", {})
    return {**DEFAULT_NOTIFY, **mine, "targets": list(mine.get("targets", DEFAULT_NOTIFY["targets"]))}


async def async_get_settings(hass: HomeAssistant, user_id: str | None = None) -> dict[str, Any]:
    """Shared options, plus the notification options of one manager."""
    async with _lock(hass):
        data = await _load(hass)
    return {**_settings(data), "notify": _user_notify(data, user_id)}


async def async_save_settings(
    hass: HomeAssistant, patch: dict[str, Any], *, user_id: str | None = None
) -> dict[str, Any]:
    """Change shared options, and this manager's own notification options. Returns the new settings."""
    patch = dict(patch)
    notify = patch.pop("notify", None)
    if "auto_close" in patch and patch["auto_close"] not in AUTO_CLOSE_SECONDS:
        raise TicketError(f"Invalid auto_close {patch['auto_close']!r}; must be one of {list(AUTO_CLOSE_SECONDS)}")
    unknown = set(patch) - set(DEFAULT_SETTINGS)
    if unknown:
        raise TicketError(f"Unknown setting(s) {sorted(unknown)}")
    if "repairs" in patch:
        patch["repairs"] = bool(patch["repairs"])
    if "transcribe" in patch:
        patch["transcribe"] = bool(patch["transcribe"])
    for key in ("agent", "stt"):
        if key in patch:
            patch[key] = _limit(str(patch[key]).strip(), 200, f"The {key} setting")
    async with _lock(hass):
        data = await _load(hass)
        data["settings"] = {**_settings(data), **patch}
        if notify is not None:
            mine = _user_notify(data, user_id)
            for key, value in notify.items():
                if key not in DEFAULT_NOTIFY:
                    raise TicketError(f"Unknown notification setting {key!r}")
                mine[key] = [str(v) for v in value] if key == "targets" else bool(value)
            data.setdefault("notify", {})[user_id or ""] = mine
        await _save(hass, data)
        merged = {**_settings(data), "notify": _user_notify(data, user_id)}
    return merged


# ------------------------------------------------------------------ auto-close


async def async_auto_close(hass: HomeAssistant) -> int:
    """Close resolved tickets that have waited long enough (the delay is a setting). Returns how many."""
    closed: list[dict[str, Any]] = []
    async with _lock(hass):
        data = await _load(hass)
        seconds = AUTO_CLOSE_SECONDS.get(_settings(data)["auto_close"])
        if seconds is None:
            return 0
        now = datetime.now(timezone.utc)
        for ticket in data["tickets"].values():
            if ticket["status"] != "resolved" or not ticket.get("closed_at"):
                continue
            try:
                resolved_at = datetime.fromisoformat(ticket["closed_at"])
            except ValueError:
                continue
            if (now - resolved_at).total_seconds() >= seconds:
                _apply_update(data, ticket, "Home Desk", {"status": "closed"})
                closed.append(ticket)
        if closed:
            await _save(hass, data)
    for ticket in closed:
        _fire(hass, ticket, "updated", "Home Desk")
    return len(closed)


# ------------------------------------------------------------------ attachments (photos and a voice message)


def _attachment_summary(items: list[dict[str, Any]]) -> str:
    images = sum(1 for a in items if a["kind"] == "image")
    audio = sum(1 for a in items if a["kind"] == "audio")
    parts = []
    if images:
        parts.append(f"{images} photo{'s' if images != 1 else ''}")
    if audio:
        parts.append("a voice message" if audio == 1 else f"{audio} voice messages")
    return " and ".join(parts)


async def async_add_attachments(
    hass: HomeAssistant, ticket_id: int, items: list[dict[str, Any]], *, actor: str
) -> dict[str, Any]:
    """Record files that were saved for a ticket (the bytes live on disk, see attachments.py)."""
    if not items:
        return await async_get_ticket(hass, ticket_id)
    async with _lock(hass):
        data = await _load(hass)
        ticket = _get(data, ticket_id)
        ticket.setdefault("attachments", []).extend(items)
        _event(ticket, actor, "attachment", None, {"field": "attachments", "to": _attachment_summary(items)})
        ticket["updated_at"] = _now()
        await _save(hass, data)
    return ticket


async def async_find_attachment(
    hass: HomeAssistant, ticket_id: int, attachment_id: str
) -> tuple[dict[str, Any], dict[str, Any]]:
    """(ticket, attachment) for a download, so the caller can check who may have it."""
    async with _lock(hass):
        data = await _load(hass)
    ticket = _get(data, ticket_id)
    for attachment in ticket.get("attachments", []):
        if attachment["id"] == attachment_id:
            return ticket, attachment
    raise TicketError(f"Attachment {attachment_id!r} not found")


async def async_set_transcript(hass: HomeAssistant, ticket_id: int, attachment_id: str, text: str) -> None:
    """Keep what speech-to-text heard, and add it to the description so it can be read, searched and handed on."""
    text = (text or "").strip()
    if not text:
        return
    text = _limit(text, MAX_TEXT, "The transcript")
    async with _lock(hass):
        data = await _load(hass)
        ticket = _get(data, ticket_id)
        for attachment in ticket.get("attachments", []):
            if attachment["id"] == attachment_id:
                attachment["transcript"] = text
                break
        else:
            raise TicketError(f"Attachment {attachment_id!r} not found")
        quoted = "\n".join(f"> {line}" if line.strip() else ">" for line in text.splitlines())
        block = f"**Voice message** (transcribed by Home Assistant)\n\n{quoted}"
        description = f"{ticket['description']}\n\n{block}" if ticket["description"] else block
        _apply_update(data, ticket, "Home Desk", {"description": description[:MAX_TEXT]})
        await _save(hass, data)
