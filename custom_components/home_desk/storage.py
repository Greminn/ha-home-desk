"""Persistent ticket storage for Home Desk.

One Store-backed JSON document at /config/.storage/home_desk.tickets,
wrapped in a lock. Each ticket carries its own timeline (`events`), so a
ticket is a single self-contained record.
"""

from __future__ import annotations

import asyncio
import hashlib
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

import re

from .const import (
    ACTIVE_STATUSES,
    ATTACHMENT_DIR,
    AUTO_CLOSE_SECONDS,
    BLOCKED_LABEL_ID,
    ENHANCEMENT_LABEL_ID,
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
    MAX_PROMPT,
    DEFAULT_REVIEW_PROMPT,
    REVIEW_FORMAT,
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
    "devices",
    "areas",
    "resolution",
)
# What a ticket is about: Home Assistant entity ids, device ids and area ids.
_THINGS = ("entities", "devices", "areas")
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


class _TicketStore(Store):
    """The ticket file. A file written by a newer Home Desk is refused with a clear message, never read and rewritten."""

    async def _async_migrate_func(self, old_major_version: int, old_minor_version: int, old_data: Any) -> Any:
        if old_major_version > _STORE_VERSION:
            raise NotImplementedError(
                f"The ticket file was written by a newer Home Desk (format {old_major_version}); this version understands "
                f"up to {_STORE_VERSION}. Update Home Desk. The file has been left untouched."
            )
        return old_data  # no older formats to convert: shape changes are migrated in _load


def _store(hass: HomeAssistant) -> Store[dict[str, Any]]:
    return _TicketStore(hass, _STORE_VERSION, _STORE_KEY)


def storage_file(hass: HomeAssistant) -> Path:
    """Where the ticket file lives (for the backup made before an upgrade)."""
    return Path(hass.config.path(".storage", _STORE_KEY))


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
    for ticket in data["tickets"].values():
        for key in _THINGS:  # tickets from before devices and areas could be named
            if key not in ticket:
                ticket[key] = []
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
    for key, default in (("settings", dict(DEFAULT_SETTINGS)), ("notify", {}), ("seen", {})):
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


def _updated_by(ticket: dict[str, Any]) -> str | None:
    """Who last changed the ticket: the newest event's actor, preferring a person or agent over Home Desk's own follow-on
    made in the same moment. None for a ticket nothing has happened to since it was raised."""
    events = ticket["events"]
    if len(events) < 2:
        return None
    last = events[-1]
    if last["actor"] != "Home Desk":
        return last["actor"]
    for e in reversed(events[:-1]):
        if e["created_at"] != last["created_at"]:
            break
        if e["actor"] != "Home Desk":
            return e["actor"]
    return last["actor"]


def _summary(ticket: dict[str, Any]) -> dict[str, Any]:
    """The list-row view: everything but the body and timeline."""
    comments = [e for e in ticket["events"] if e["kind"] in ("comment", "note")]
    return {
        **{k: v for k, v in ticket.items() if k not in (
            "description", "events", "resolution", "attachments", "repair_members", "repair_base", "repair_generic", "source_aliases",
        )},
        "updated_by": _updated_by(ticket),
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
    devices: list[str] | None = None,
    areas: list[str] | None = None,
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
    if is_agent(assignee):
        _require_ai(data)
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
        "devices": sorted(set(devices or [])),
        "areas": sorted(set(areas or [])),
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
            if is_agent(new):
                _require_ai(data)
        elif key == "category":
            new = _resolve_category(data, new)
        elif key == "status":
            new = _status(new)
            _check(new, STATUSES, "status")
            if new == "in_progress" and ticket["status"] in ("resolved", "closed") and (actor in SYSTEM_ACTORS or is_agent(actor)):
                new = "new"  # reopened by Home Assistant or an AI agent: back to the Inbox for a person to look at
        elif key == "priority":
            _check(new, PRIORITIES, "priority")
        elif key in _THINGS:
            new = sorted(set(new))
        old = ticket.get(key, [] if key in _THINGS else None)
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
            if new in ACTIVE_STATUSES and old in ("resolved", "closed") and "resolution" not in fields:
                ticket["resolution"] = None  # reopened: the old resolution is on the timeline, but no longer describes the ticket
    if changed:
        ticket["updated_at"] = ts
        if ticket["status"] == "resolved" and status_before != "resolved":
            _close_if_immediate(data, ticket)
    return changed


def _settings(data: dict[str, Any]) -> dict[str, Any]:
    return {**DEFAULT_SETTINGS, **data.get("settings", {})}


AI_OFF = "AI is switched off in Settings"


def _ai_on(data: dict[str, Any]) -> bool:
    return bool(_settings(data)["ai_enabled"])


def _require_ai(data: dict[str, Any]) -> None:
    if not _ai_on(data):
        raise TicketError(AI_OFF)


def _default_prompt_id() -> str:
    """A short fingerprint of today's default review prompt."""
    return hashlib.sha1(DEFAULT_REVIEW_PROMPT.strip().encode()).hexdigest()[:12]


def _for_panel(settings: dict[str, Any]) -> dict[str, Any]:
    """The settings as the panel sees them: no fingerprint, but whether an edited prompt predates the current default."""
    out = {k: v for k, v in settings.items() if k != "agent_prompt_base"}
    out["agent_prompt_outdated"] = bool(settings.get("agent_prompt")) and settings.get("agent_prompt_base") != _default_prompt_id()
    return out


def _close_if_immediate(data: dict[str, Any], ticket: dict[str, Any]) -> None:
    """With the "straight away" setting, a resolved ticket closes at once."""
    if _settings(data)["auto_close"] == "immediately":
        _apply_update(data, ticket, "Home Desk", {"status": "closed"})


def _progress(ticket: dict[str, Any], actor: str, ts: str) -> bool:
    """The first thing done to a New ticket moves it to In Progress. Automatic sources don't count.

    An Enhancement (an idea for the future) is the exception: comments and changes are notes on it, and it stays New until
    someone sets it to In Progress (the panel's Start Working button)."""
    if ticket["status"] != "new" or actor in SYSTEM_ACTORS or ENHANCEMENT_LABEL_ID in ticket["labels"]:
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
    ticket.pop("agent_state", None)
    _event(ticket, actor, "assignee", None, {"field": "assignee", "from": assignee, "to": None}, ts)
    return True


# ---------------------------------------------------------------- public API


async def async_get_ticket(hass: HomeAssistant, ticket_id: int, *, user_id: str | None = None) -> dict[str, Any]:
    """A ticket. With a `user_id`, `seen_at` says when that person last looked, so what is new since can be marked."""
    async with _lock(hass):
        data = await _load(hass)
        ticket = _get(data, ticket_id)
        out = dict(ticket)
        out["updated_by"] = _updated_by(ticket)
        if user_id:
            marks, _ = _seen(data, user_id)
            out["seen_at"] = _since(marks, ticket_id)
        out["related"] = [
            {"id": t["id"], "title": t["title"], "status": t["status"]}
            for i in ticket["links"]
            if (t := data["tickets"].get(str(i)))
        ]
        return out


def _seen(data: dict[str, Any], user_id: str) -> tuple[dict[str, Any], bool]:
    """One person's read marks: everything up to `base` counts as read, plus each ticket opened since.
    A person seen for the first time starts with everything read. Returns the marks and whether they were just made."""
    seen = data.setdefault("seen", {})
    fresh = user_id not in seen
    if fresh:
        seen[user_id] = {"base": _now(), "tickets": {}}
    return seen[user_id], fresh


def _latest_by_others(ticket: dict[str, Any], name: str, admin: bool, since: str) -> dict[str, Any] | None:
    """The newest change after `since` that someone else made (internal notes only for managers).
    A person's or agent's change is preferred over Home Desk's own follow-on (such as moving a ticket to In Progress)."""
    fallback = None
    for e in reversed(ticket["events"]):
        if e["created_at"] <= since:
            continue
        if e["actor"] == name or (not admin and e["kind"] in INTERNAL_KINDS):
            continue
        if e["actor"] != "Home Desk":
            return e
        fallback = fallback or e
    return fallback


def _since(marks: dict[str, Any], ticket_id: int) -> str:
    return max(marks["base"], marks["tickets"].get(str(ticket_id), ""))


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
    run_state: str | None = None,
    limit: int = 500,
    offset: int = 0,
    viewer: dict[str, Any] | None = None,
) -> dict[str, Any]:
    """Filter tickets. `status` is a status, a comma list, 'active' or 'all'.

    With a `viewer` ({id, name, admin}) each ticket also says whether it changed since that person last looked."""
    if status and status not in ("all", "active"):
        status = ",".join(_status(x) for x in status.split(","))
        for s in status.split(","):
            _check(s, STATUSES, "status")
    async with _lock(hass):
        data = await _load(hass)
        marks = None
        if viewer:
            marks, fresh = _seen(data, viewer["id"])
            if fresh:
                await _save(hass, data)
    needle = (q or "").lower()
    # A search for just a ticket's number ("244" or "#244") finds exactly that ticket, when there is one, not every ticket that mentions the digits.
    number = re.fullmatch(r"#?\s*(\d+)", needle.strip())
    exact_id = int(number.group(1)) if number and str(int(number.group(1))) in data["tickets"] else None
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
        if run_state and _run_state(t) not in run_state.split(","):
            continue
        if exact_id is not None:
            if t["id"] != exact_id:
                continue
        elif needle:
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
                    " ".join(t.get("devices", [])),
                    " ".join(t.get("areas", [])),
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
    out = []
    for t in rows[offset : offset + limit]:
        row = _summary(t)
        if viewer and marks:
            latest = _latest_by_others(t, viewer["name"], viewer["admin"], _since(marks, t["id"]))
            row["unread"] = latest is not None
            if latest:
                row["activity"] = {"actor": latest["actor"], "kind": latest["kind"], "at": latest["created_at"]}
        out.append(row)
    return {"total": len(rows), "tickets": out}


async def async_mark_read(hass: HomeAssistant, user_id: str, ticket_ids: list[int] | None = None) -> int:
    """Mark tickets read for one person; with no ids, mark everything read. Returns how many ids were marked."""
    async with _lock(hass):
        data = await _load(hass)
        marks, _ = _seen(data, user_id)
        now = _now()
        if ticket_ids is None:
            marks["base"] = now
            marks["tickets"] = {}
            count = len(data["tickets"])
        else:
            for tid in ticket_ids:
                if str(tid) in data["tickets"]:
                    marks["tickets"][str(tid)] = now
            count = len(ticket_ids)
        await _save(hass, data)
        return count


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
        if not is_agent(ticket["assignee"]) and ticket.pop("agent_state", None):
            changed = True  # the ticket left the agent, so it is no longer working on it
        if changed and "status" not in fields:
            _progress(ticket, actor, ticket["updated_at"])
        if changed:
            await _save(hass, data)
    if changed:
        _fire(hass, ticket, "updated", actor)
        if ticket["assignee"] != assignee_before and is_agent(ticket["assignee"]):
            _fire(hass, ticket, "assigned", actor)  # lets an automation start the AI agent
    return ticket


def _proposal_event(ticket: dict[str, Any], event_id: int) -> dict[str, Any]:
    ev = next((e for e in ticket["events"] if e["id"] == event_id), None)
    if not ev or not (ev.get("data") or {}).get("proposal"):
        raise TicketError("That comment has no proposed changes")
    return ev


async def async_apply_proposal(hass: HomeAssistant, ticket_id: int, event_id: int, *, actor: str) -> dict[str, Any]:
    """Apply the changes the AI agent proposed in a comment, as `actor` (the person who pressed Apply). Only the newest
    proposal on a ticket, and only while it is waiting, can be applied."""
    async with _lock(hass):
        data = await _load(hass)
        ticket = _get(data, ticket_id)
        ev = _proposal_event(ticket, event_id)
        newest = [e for e in ticket["events"] if (e.get("data") or {}).get("proposal")][-1]
        proposal = ev["data"]["proposal"]
        if proposal.get("state") != "pending":
            raise TicketError(f"That proposal was already {proposal.get('state')}")
        if newest["id"] != event_id:
            raise TicketError("A newer proposal replaces this one")
        actions = [dict(a) for a in proposal["actions"]]
    for a in actions:
        kind = a["action"]
        if kind == "close":
            await async_close_ticket(hass, ticket_id, actor=actor, resolution=a["resolution"], status=a["status"])
        elif kind == "set_priority":
            await async_update_ticket(hass, ticket_id, actor=actor, priority=a["priority"])
        elif kind == "add_label":
            await async_update_ticket(hass, ticket_id, actor=actor, add_labels=[a["label"]])
        elif kind == "remove_label":
            await async_update_ticket(hass, ticket_id, actor=actor, remove_labels=[a["label"]])
        elif kind == "set_category":
            await async_update_ticket(hass, ticket_id, actor=actor, category=a["category"])
    return await _set_proposal_state(hass, ticket_id, event_id, "applied", actor)


async def async_dismiss_proposal(hass: HomeAssistant, ticket_id: int, event_id: int, *, actor: str) -> dict[str, Any]:
    async with _lock(hass):
        data = await _load(hass)
        proposal = _proposal_event(_get(data, ticket_id), event_id)["data"]["proposal"]
        if proposal.get("state") != "pending":
            raise TicketError(f"That proposal was already {proposal.get('state')}")
    return await _set_proposal_state(hass, ticket_id, event_id, "dismissed", actor)


async def _set_proposal_state(hass: HomeAssistant, ticket_id: int, event_id: int, state: str, actor: str) -> dict[str, Any]:
    async with _lock(hass):
        data = await _load(hass)
        ticket = _get(data, ticket_id)
        proposal = _proposal_event(ticket, event_id)["data"]["proposal"]
        proposal.update({"state": state, "by": actor, "at": _now()})
        await _save(hass, data)
    _fire(hass, ticket, "proposal", actor)
    return ticket


async def async_set_agent_state(hass: HomeAssistant, ticket_id: int, state: dict[str, Any] | None) -> dict[str, Any]:
    """Say that the AI agent is working on a ticket (`state` like {"state": "working", "agent", "since", "note"}), or clear it."""
    async with _lock(hass):
        data = await _load(hass)
        ticket = _get(data, ticket_id)
        if state:
            ticket["agent_state"] = state
        else:
            ticket.pop("agent_state", None)
        await _save(hass, data)
    _fire(hass, ticket, "agent", "Home Desk")
    return ticket


# ---------------------------------------------------------------- AI Agent runs (Run AI Agent Now)
#
# A person presses Run AI Agent Now: the ticket gets an "agent_run" in state "requested". The runner on the Network LXC claims it
# ("running", a read-only review), then says what it found and what it would change ("proposed", the findings are a comment with a
# go-ahead waiting on it). A person presses Proceed ("approved"), the runner claims it again ("running", the change) and
# finishes ("done"). "failed", "stopped" and "dismissed" end a run too. While a run is wanted or going the ticket shows an
# "agent_state" (the working indicator, with Stop).

RUN_OPEN = ("requested", "running", "approved")  # a run is wanted or in progress
_RUN_WAITING = {
    "requested": "Waiting for the AI Agent to pick it up",
    "approved": "Waiting for the AI Agent to carry out the approved change",
}


def _proposes_nothing(body: str) -> bool:
    """True when the last "What I would change" section starts with "Nothing": there is no go-ahead to ask for."""
    found = list(re.finditer(r"what i would change:?\**\s*:?\s*\**\s*(\w+)", body, re.IGNORECASE))
    return bool(found) and found[-1].group(1).lower() in ("nothing", "none")


def _run_state(ticket: dict[str, Any]) -> str:
    return (ticket.get("agent_run") or {}).get("state") or ""


async def async_request_run(hass: HomeAssistant, ticket_id: int, *, actor: str) -> dict[str, Any]:
    """Ask the AI Agent on the runner to work a ticket (read-only first). One run at a time per ticket."""
    async with _lock(hass):
        data = await _load(hass)
        _require_ai(data)
        ticket = _get(data, ticket_id)
        if ticket["status"] in ("resolved", "closed"):
            raise TicketError("Reopen the ticket before asking the AI Agent to run")
        if _run_state(ticket) in RUN_OPEN:
            raise TicketError("The AI Agent already has a run on this ticket")
        ts = _now()
        ticket["agent_run"] = {"state": "requested", "requested_by": actor, "requested_at": ts}
        ticket["agent_state"] = {"state": "working", "agent": "AI Agent", "since": ts, "note": _RUN_WAITING["requested"], "kind": "run"}
        _event(ticket, actor, "comment", "Asked the AI Agent to run.", {"run_request": True}, ts)
        ticket["updated_at"] = ts
        await _save(hass, data)
    _fire(hass, ticket, "agent", actor)
    return ticket


async def async_claim_run(hass: HomeAssistant, ticket_id: int, *, agent: str) -> dict[str, Any]:
    """The runner takes a requested run (a read-only review) or an approved one (the change). Only one runner can have it."""
    async with _lock(hass):
        data = await _load(hass)
        _require_ai(data)
        ticket = _get(data, ticket_id)
        run = ticket.get("agent_run") or {}
        if run.get("state") == "running":
            raise TicketError(f"#{ticket_id} is already being worked")
        if run.get("state") not in ("requested", "approved"):
            raise TicketError(f"No run is waiting on #{ticket_id}")
        ts = _now()
        mode = "change" if run["state"] == "approved" else "review"
        run.update(state="running", mode=mode, claimed_by=agent, claimed_at=ts)
        ticket["agent_state"] = {
            "state": "working", "agent": agent, "since": ts, "kind": "run",
            "note": "Reading the ticket (read-only)" if mode == "review" else "Carrying out the approved change",
        }
        ticket["updated_at"] = ts
        await _save(hass, data)
    _fire(hass, ticket, "agent", f"ai:{agent}")
    return ticket


async def async_note_run(hass: HomeAssistant, ticket_id: int, *, agent: str, note: str) -> dict[str, Any]:
    """The runner says what it is doing right now (shown in the working indicator, e.g. "Using get_ticket"). Only while it runs it."""
    async with _lock(hass):
        data = await _load(hass)
        _require_ai(data)
        ticket = _get(data, ticket_id)
        if _run_state(ticket) != "running" or not ticket.get("agent_state"):
            raise TicketError("This run is not running")
        ticket["agent_state"]["note"] = _limit(note.strip(), 120, "The note") or ticket["agent_state"].get("note", "")
        await _save(hass, data)
    _fire(hass, ticket, "agent", f"ai:{agent}")
    return ticket


async def async_finish_run(hass: HomeAssistant, ticket_id: int, *, agent: str, state: str, body: str) -> dict[str, Any]:
    """The runner reports back: its findings and what it would change ("proposed", waiting for Proceed), the change done
    ("done"), or why it could not ("failed"). Its words are a comment from the agent, which hands the ticket back."""
    if state not in ("proposed", "done", "failed"):
        raise TicketError("A run finishes as proposed, done or failed")
    body = (body or "").strip()
    if not body:
        raise TicketError("Say what you found or did")
    _limit(body, MAX_TEXT, "The comment")
    actor = agent if agent.lower().startswith("ai:") else f"ai:{agent}"
    async with _lock(hass):
        data = await _load(hass)
        _require_ai(data)
        ticket = _get(data, ticket_id)
        run = ticket.get("agent_run") or {}
        if run.get("state") != "running":
            raise TicketError("This run was stopped or is not running, so there is nothing to finish")
        ts = _now()
        event_data: dict[str, Any] = {"run": True}
        if state == "proposed" and _proposes_nothing(body):
            state = "done"  # nothing to approve: the findings are the whole result
        elif state == "proposed":
            event_data["proceed"] = {"state": "pending"}
        ev = _event(ticket, actor, "comment", body, event_data, ts)
        run.update(state=state, finished_at=ts, event=ev["id"])
        ticket.pop("agent_state", None)
        ticket["updated_at"] = ts
        _progress(ticket, actor, ts)
        _hand_back(ticket, actor, ts)
        await _save(hass, data)
    _fire(hass, ticket, "comment", actor)
    return ticket


async def async_decide_run(hass: HomeAssistant, ticket_id: int, event_id: int, *, actor: str, do: str) -> dict[str, Any]:
    """A person presses Proceed (the runner may now carry out what it described) or Dismiss on the agent's findings."""
    async with _lock(hass):
        data = await _load(hass)
        _require_ai(data)
        ticket = _get(data, ticket_id)
        ev = next((e for e in ticket["events"] if e["id"] == event_id), None)
        proceed = ((ev or {}).get("data") or {}).get("proceed")
        if not proceed:
            raise TicketError("That comment has nothing waiting for a go-ahead")
        if proceed["state"] != "pending":
            raise TicketError(f"That was already {proceed['state']}")
        newest = [e for e in ticket["events"] if ((e.get("data") or {}).get("proceed"))][-1]
        if newest is not ev:
            raise TicketError("A newer reply replaces this one")
        ts = _now()
        approve = do == "approve"
        proceed.update(state="approved" if approve else "dismissed", by=actor, at=ts)
        run = ticket.setdefault("agent_run", {})
        if approve:
            run.update(state="approved", approved_by=actor, approved_at=ts)
            ticket["agent_state"] = {"state": "working", "agent": "AI Agent", "since": ts, "note": _RUN_WAITING["approved"], "kind": "run"}
        else:
            run.update(state="dismissed")
        ticket["updated_at"] = ts
        await _save(hass, data)
    _fire(hass, ticket, "proposal", actor)
    return ticket


async def async_agent_run_allows(hass: HomeAssistant, ticket_id: int | None, *, writing: bool) -> bool:
    """May the AI Agent's own user act on this ticket right now? Only while a run is working it: any run for a comment, and for
    changing the ticket only the change run, which exists only after a person pressed Proceed. With no ticket (creating one),
    only while some change run is working."""
    data = await _load(hass)

    def working(ticket: dict[str, Any]) -> bool:
        run = ticket.get("agent_run") or {}
        return run.get("state") == "running" and (not writing or run.get("mode") == "change")

    if ticket_id is None:
        return writing and any(working(t) for t in data["tickets"].values())
    ticket = data["tickets"].get(str(ticket_id))
    return bool(ticket) and working(ticket)


async def async_stop_run(hass: HomeAssistant, ticket_id: int, *, actor: str) -> bool:
    """Stop a run that is wanted or going: the runner finds out when it tries to finish. Returns whether there was one."""
    async with _lock(hass):
        data = await _load(hass)
        ticket = _get(data, ticket_id)
        if _run_state(ticket) not in RUN_OPEN:
            return False
        ts = _now()
        ticket["agent_run"].update(state="stopped", finished_at=ts)
        ticket.pop("agent_state", None)
        _event(ticket, "Home Desk", "comment", f"Stopped by {actor}.", None, ts)
        ticket["updated_at"] = ts
        await _save(hass, data)
    _fire(hass, ticket, "agent", actor)
    return True


async def async_add_comment(
    hass: HomeAssistant,
    ticket_id: int,
    *,
    actor: str,
    body: str,
    internal: bool = False,
    event_data: dict[str, Any] | None = None,
    hand_back: bool = True,
) -> dict[str, Any]:
    body = (body or "").strip()
    if not body:
        raise TicketError("A comment needs text")
    _limit(body, MAX_TEXT, "The comment")
    async with _lock(hass):
        data = await _load(hass)
        ticket = _get(data, ticket_id)
        ts = _now()
        _event(ticket, actor, "note" if internal else "comment", body, event_data, ts)
        ticket["updated_at"] = ts
        _progress(ticket, actor, ts)
        if hand_back:
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


def _merge_into(data: dict[str, Any], target: dict[str, Any], source: dict[str, Any], actor: str) -> None:
    """Fold `source` into `target`: its conversation, labels, entities, files and the repairs it stands for.

    The source is closed with a note saying where it went and linked to the target; its comments are copied
    (with their original author and time) so nothing is lost. A repair ticket's source keys move to the target
    so the repair doesn't open a new ticket when it next changes.
    """
    sid, tid = source["id"], target["id"]
    rank = {p: n for n, p in enumerate(PRIORITIES)}
    # What the source said, in the order it was said.
    intro = source["description"].strip()
    if intro:
        _event(target, source["requester"], "comment", f"**From #{sid}: {source['title']}**\n\n{intro}", {"merged_from": sid},
               at=source["created_at"])
    for e in source["events"]:
        if e["kind"] in ("comment", "note") and e["body"]:
            copy = dict(e, data={**(e.get("data") or {}), "merged_from": sid})
            target["events"].append(copy)
    if source.get("resolution"):
        _event(target, source["requester"], "comment", f"**Resolution on #{sid}:** {source['resolution']}", {"merged_from": sid})
    target["events"].sort(key=lambda e: e["created_at"])
    for n, e in enumerate(target["events"], 1):
        e["id"] = n
    target["labels"] = sorted({*target["labels"], *source["labels"]})
    for key in _THINGS:
        target[key] = sorted({*target.get(key, []), *source.get(key, [])})
    if rank.get(source["priority"], 0) > rank.get(target["priority"], 0):
        target["priority"] = source["priority"]
    if not target.get("category") and source.get("category"):
        target["category"] = source["category"]
    # Files stay where they were saved; each attachment remembers which ticket's folder it is in.
    target.setdefault("attachments", [])
    for a in source.get("attachments", []):
        target["attachments"].append({**a, "ticket": a.get("ticket", sid)})
    # Repairs: the target takes over the source's repair keys and members.
    keys = [k for k in (source.get("source_key"), *source.get("source_aliases", ())) if k and k.startswith(REPAIR_PREFIX)]
    if keys or source.get("repair_members"):
        _members_of(target)
        for member_key, member in _members_of(source).items():
            target["repair_members"].setdefault(member_key, member)
        aliases = set(target.get("source_aliases", ())) | set(keys)
        aliases.discard(target.get("source_key"))
        target["source_aliases"] = sorted(aliases)
        if target.get("repair_base") is None and source.get("repair_base") is not None:
            target["repair_base"] = target["description"] if target["description"] else source["repair_base"]
    # Anything that linked to the source now links to the target as well.
    for other in data["tickets"].values():
        if other is source or other is target or sid not in other["links"]:
            continue
        other["links"] = sorted({tid if i == sid else i for i in other["links"]})
        if other["id"] not in target["links"]:
            target["links"].append(other["id"])
    for x, y in ((target, source), (source, target)):
        if y["id"] not in x["links"]:
            x["links"].append(y["id"])
    now = _now()
    _event(target, actor, "merge", None, {"from": sid, "title": source["title"]})
    _event(source, actor, "merge", None, {"into": tid, "title": target["title"]})
    source.update(
        status="closed", resolution=f"Merged into #{tid}", closed_at=now, updated_at=now, assignee=None,
        merged_into=tid, source_key=None, source_aliases=[],
    )
    source.pop("repair_members", None)
    target["updated_at"] = now


async def async_merge_tickets(hass: HomeAssistant, target_id: int, source_ids: list[int], *, actor: str) -> dict[str, Any]:
    """Merge one or more tickets into `target_id`. The others are closed as merged; returns the target."""
    ids = list(dict.fromkeys(int(i) for i in source_ids))
    if not ids:
        raise TicketError("Say which tickets to merge")
    if target_id in ids:
        raise TicketError("A ticket can't be merged into itself")
    if len(ids) > 50:
        raise TicketError("Merge at most 50 tickets at a time")
    async with _lock(hass):
        data = await _load(hass)
        target = _get(data, target_id)
        if target.get("merged_into"):
            raise TicketError(f"#{target_id} was merged into #{target['merged_into']}; merge into that one")
        sources = [_get(data, i) for i in ids]
        for src in sources:
            if src.get("merged_into"):
                raise TicketError(f"#{src['id']} was already merged into #{src['merged_into']}")
        reopen = False
        for src in sources:
            if src["status"] in ACTIVE_STATUSES and target["status"] in ("resolved", "closed"):
                reopen = True
            _merge_into(data, target, src, actor)
        if reopen:
            _apply_update(data, target, actor, {"status": "in_progress"})
        await _save(hass, data)
    for src in sources:
        _fire(hass, src, "closed", actor)
    _fire(hass, target, "updated", actor)
    return target


def _remove_files(root: Path, ticket_id: int, files: list[tuple[int, str]]) -> None:
    """Delete a ticket's attachment files (each is in the folder of the ticket it was first added to), then its folder if empty."""
    for folder, name in files:
        try:
            (root / str(folder) / name).unlink(missing_ok=True)
        except OSError:
            pass
    for folder in {f for f, _ in files} | {ticket_id}:
        try:
            (root / str(folder)).rmdir()  # only succeeds when nothing is left in it
        except OSError:
            pass


async def async_delete_ticket(hass: HomeAssistant, ticket_id: int, *, actor: str) -> dict[str, Any]:
    """Remove a ticket and its attachments for good (it is not resolved: it leaves the history). Returns the removed ticket.

    The ticket's links to others, other tickets' read marks for it, and the "merged into" mark on tickets merged into it are
    cleaned up. A repair's ticket also puts its repairs on a list Home Assistant's sync skips, so deleting it isn't undone at
    the next start while the repair is still there. It can't be deleted while the AI Agent is working on it."""
    async with _lock(hass):
        data = await _load(hass)
        ticket = _get(data, ticket_id)
        if _run_state(ticket) in RUN_OPEN or ticket.get("agent_state"):
            raise TicketError("Stop the AI Agent first: it is working on this ticket")
        skip = data.setdefault("deleted_repairs", [])
        for key in _members_of(ticket):
            if key not in skip:
                skip.append(key)
        del skip[:-500]
        del data["tickets"][str(ticket_id)]
        for other in data["tickets"].values():
            if ticket_id in other.get("links", ()):
                other["links"] = [i for i in other["links"] if i != ticket_id]
            if other.get("merged_into") == ticket_id:
                other["merged_into"] = None
        for marks in data.get("seen", {}).values():
            marks.get("tickets", {}).pop(str(ticket_id), None)
        files = [(int(a.get("ticket", ticket_id)), f"{a['id']}.{a['ext']}") for a in ticket.get("attachments", []) if a.get("id") and a.get("ext")]
        await _save(hass, data)
    if files:
        await hass.async_add_executor_job(_remove_files, Path(hass.config.path(ATTACHMENT_DIR)), ticket_id, files)
    _fire(hass, ticket, "deleted", actor)
    return ticket


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


# ------------------------------------------------------------------ repairs

REPAIR_SOURCE = "Home Assistant Repairs"
REPAIR_ACTOR = "Home Assistant"
REPAIR_PREFIX = "repair:"


def repair_key(domain: str, issue_id: str) -> str:
    return f"{REPAIR_PREFIX}{domain}:{issue_id}"


def _member_key(domain: str, issue_id: str) -> str:
    return f"{domain}:{issue_id}"


def _find_by_source_key(data: dict[str, Any], key: str) -> dict[str, Any] | None:
    """The ticket for a source key, including keys it took over when tickets were merged into it."""
    return next(
        (t for t in data["tickets"].values() if t.get("source_key") == key or key in t.get("source_aliases", ())),
        None,
    )


def _find_by_member(data: dict[str, Any], domain: str, issue_id: str) -> dict[str, Any] | None:
    """The ticket that stands for this repair as one of several of its kind. A repair that has cleared is no longer in Home
    Assistant's registry, so nothing there says which kind it was: the ticket's own list of members does."""
    mk = _member_key(domain, issue_id)
    return next((t for t in data["tickets"].values() if mk in (t.get("repair_members") or {})), None)


def _members_of(ticket: dict[str, Any]) -> dict[str, dict[str, Any]]:
    """The repairs a ticket stands for, by "domain:issue_id". A ticket made for a single repair is converted on demand."""
    members = ticket.get("repair_members")
    if members is None:
        members = ticket["repair_members"] = {}
        key = ticket.get("source_key") or ""
        if key.startswith(REPAIR_PREFIX):
            domain, _, issue_id = key[len(REPAIR_PREFIX):].partition(":")
            members[_member_key(domain, issue_id)] = _member(
                domain, issue_id, ticket["title"], ticket["status"] in ACTIVE_STATUSES
            )
    return members


def _member(domain: str, issue_id: str, title: str, active: bool, *, name: str = "", ignored: bool = False) -> dict[str, Any]:
    short = re.sub(r"^[0-9A-Z]{26}_", "", issue_id)
    return {"domain": domain, "issue_id": issue_id, "name": name or short, "title": title, "active": active, "ignored": ignored}


async def async_open_repair_keys(hass: HomeAssistant) -> list[tuple[str, str]]:
    """(domain, issue_id) of every repair that still has an open ticket."""
    async with _lock(hass):
        data = await _load(hass)
    out = []
    for t in data["tickets"].values():
        if t["status"] not in ACTIVE_STATUSES:
            continue
        if t.get("repair_members"):
            out.extend((m["domain"], m["issue_id"]) for m in t["repair_members"].values() if m["active"])
            continue
        key = t.get("source_key") or ""
        if key.startswith(REPAIR_PREFIX):
            domain, _, issue_id = key[len(REPAIR_PREFIX):].partition(":")
            out.append((domain, issue_id))
    return out


def _affected_text(members: list[dict[str, Any]]) -> str:
    return f"**Affected ({len(members)}):**\n" + "\n".join(f"- {m['name']}" for m in members)


def _resolve_ignored(data: dict[str, Any], ticket: dict[str, Any]) -> str | None:
    """Resolve a repair ticket because the repair is ignored in Home Assistant. Done once per ignoring: if a person reopens the
    ticket while the repair is still ignored, it is left open. Returns "resolved" if it resolved the ticket."""
    if ticket.get("repair_ignored"):
        return None
    ticket["repair_ignored"] = True
    if ticket["status"] not in ACTIVE_STATUSES:
        return None
    resolution = "Ignored in Home Assistant: this repair was dismissed there, so nothing is waiting on it."
    fields: dict[str, Any] = {"status": "resolved", "resolution": resolution}
    if ticket.get("repair_blocked"):
        fields["remove_labels"] = [BLOCKED_LABEL_ID]
        ticket["repair_blocked"] = False
    _apply_update(data, ticket, REPAIR_ACTOR, fields)
    _event(ticket, REPAIR_ACTOR, "comment", f"**Resolution:** {resolution}")
    return "resolved"


def _group_fields(ticket: dict[str, Any]) -> dict[str, Any]:
    """The title and description a ticket for several repairs should have right now. Ignored repairs aren't listed."""
    active = [m for m in ticket["repair_members"].values() if m["active"] and not m["ignored"]]
    fields: dict[str, Any] = {}
    if not active:
        return fields
    titles = {m["title"] for m in active if m["title"]}
    title = next(iter(titles)) if len(titles) == 1 else ticket.get("repair_generic") or ticket["title"]
    renamed = any((e.get("data") or {}).get("field") == "title" for e in ticket["events"])
    if not renamed and title and title != ticket["title"]:
        fields["title"] = title
        ticket["repair_title"] = title
    base = ticket.get("repair_base")
    if base is not None:
        text = f"{base}\n\n{_affected_text(active)}" if len(active) > 1 else base
        if text != ticket["description"]:
            fields["description"] = text
    if ticket.get("repair_blocked"):  # older tickets: ignoring used to add Blocked
        fields["remove_labels"] = [BLOCKED_LABEL_ID]
        ticket["repair_blocked"] = False
    return fields


def _sync_member(
    data: dict[str, Any], ticket: dict[str, Any], *, domain: str, issue_id: str, active: bool, ignored: bool,
    title: str, member: str, priority: str, how: str = "",
) -> str | None:
    """Update a ticket that stands for several repairs of one kind. Returns what happened, or None."""
    members = _members_of(ticket)
    mk = _member_key(domain, issue_id)
    cur = members.get(mk)
    name = member or (cur or {}).get("name") or issue_id
    if not active:
        if cur is None or not cur["active"]:
            return None
        cur["active"] = False
        still = [m for m in members.values() if m["active"]]
        if not still:
            if ticket["status"] not in ACTIVE_STATUSES:
                return None
            resolution = f"Cleared by Home Assistant: this repair is no longer reported{how}."
            if len(members) > 1:
                resolution = f"Cleared by Home Assistant: none of these repairs is reported any more{how}."
            _apply_update(data, ticket, REPAIR_ACTOR, {"status": "resolved", "resolution": resolution})
            _event(ticket, REPAIR_ACTOR, "comment", f"**Resolution:** {resolution}")
            return "resolved"
        _event(ticket, REPAIR_ACTOR, "comment", f"{cur['name']} has cleared. Still affected: {', '.join(m['name'] for m in still)}.")
        if all(m["ignored"] for m in still):
            return _resolve_ignored(data, ticket) or "updated"
        fields = _group_fields(ticket)
        if fields:
            _apply_update(data, ticket, REPAIR_ACTOR, fields)
        return "updated"
    appeared = (cur is None or not cur["active"] or cur["ignored"]) and not ignored
    members[mk] = _member(domain, issue_id, title, True, name=name, ignored=ignored)
    if all(m["ignored"] for m in members.values() if m["active"]):
        return _resolve_ignored(data, ticket)
    unignored = ticket.pop("repair_ignored", None)
    was_closed = ticket["status"] in ("resolved", "closed")
    others = [m for k, m in members.items() if k != mk and m["active"]]
    fields = _group_fields(ticket)
    if was_closed:
        fields["status"] = "in_progress"
    rank = {p: n for n, p in enumerate(PRIORITIES)}
    if rank.get(priority, 0) > rank.get(ticket["priority"], 0):
        fields["priority"] = priority
    changed = _apply_update(data, ticket, REPAIR_ACTOR, fields) if fields else False
    if was_closed:
        why = f"{name} is no longer ignored in Home Assistant" if unignored else f"Home Assistant is reporting this repair again ({name})"
        _event(ticket, REPAIR_ACTOR, "comment", f"{why}, so the ticket was reopened.")
        return "reopened"
    if appeared and others:
        _event(ticket, REPAIR_ACTOR, "comment", f"Also affected: {name}.")
        return "updated"
    return "updated" if changed or appeared else None


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
    group: str | None = None,
    member: str = "",
    generic_title: str = "",
    how: str = "",
) -> str | None:
    """Make the ticket for one Home Assistant repair match the repair's state.

    Repairs of the same kind (the same integration and `group`, usually the issue's translation key)
    share one ticket that lists what is affected: it resolves when all of them clear and reopens when
    one returns. Without a `group` each repair has its own ticket.

    One ticket per repair, found by its source key, so this is safe to call as often as
    you like. A new active repair opens a ticket; a repair that comes back after its ticket
    was closed reopens it; a repair that clears resolves it. Returns what happened ("created", "reopened",
    "updated", "resolved") or None if nothing changed.

    A repair that is ignored in Home Assistant counts as resolved: an open ticket for it is resolved
    ("Ignored in Home Assistant"), one is never opened for it, and it reopens if the repair is no longer ignored.
    """
    key = repair_key(domain, group or issue_id)
    kind: str | None = None
    async with _lock(hass):
        data = await _load(hass)
        if _member_key(domain, issue_id) in data.get("deleted_repairs", ()):
            return None  # its ticket was deleted on purpose: don't make another
        ticket = _find_by_source_key(data, key)
        if ticket is None and not group:
            ticket = _find_by_member(data, domain, issue_id)  # a clear: found through the group it joined
        ignored_before = ticket.get("repair_ignored") if ticket else None
        if group:
            # Tickets made before grouping, one per repair: the first becomes the group's ticket and any
            # other open one for the same kind is merged into it.
            single = _find_by_source_key(data, repair_key(domain, issue_id)) if group != issue_id else None
            if single is not None and ticket is None:
                _members_of(single)  # note which repair it was made for before its key changes
                single["source_key"] = key
                ticket = single
            elif single is not None and single is not ticket and single["status"] in ACTIVE_STATUSES:
                _merge_into(data, ticket, single, REPAIR_ACTOR)
                kind = "updated"
        if ticket is not None and (group or ticket.get("repair_members") is not None):
            _members_of(ticket)
            if group and ticket.get("repair_base") is None:
                ticket["repair_base"] = ticket["description"]
            if generic_title:
                ticket["repair_generic"] = generic_title
            result = _sync_member(
                data, ticket, domain=domain, issue_id=issue_id, active=active, ignored=ignored,
                title=title or ticket["title"], member=member, priority=priority, how=how,
            )
            kind = result or kind
            if kind:
                ticket["updated_at"] = _now()
                await _save(hass, data)
                _fire(hass, ticket, "closed" if kind == "resolved" else "updated", REPAIR_ACTOR)
            elif ignored or ticket.get("repair_ignored") != ignored_before:
                await _save(hass, data)  # the member list (or the ignored mark) changed even though nothing needs saying
            return kind
        if ticket is None:
            if not active or ignored:
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
            ticket["repair_title"] = ticket["title"]
            if group:
                ticket["repair_members"] = {
                    _member_key(domain, issue_id): _member(domain, issue_id, ticket["title"], True, name=member, ignored=ignored)
                }
                ticket["repair_base"] = description
                ticket["repair_generic"] = generic_title or ticket["title"]
            kind = "created"
        elif active and ignored:
            kind = _resolve_ignored(data, ticket)
            if not kind and ticket.get("repair_ignored") != ignored_before:
                await _save(hass, data)
        elif active:
            changed = False
            unignored = ticket.pop("repair_ignored", None)
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
            if ticket.get("repair_blocked"):  # older tickets: ignoring used to add Blocked
                fields["remove_labels"] = [BLOCKED_LABEL_ID]
                ticket["repair_blocked"] = False
            if fields:
                changed = _apply_update(data, ticket, REPAIR_ACTOR, fields)
            if was_closed:
                why = "The repair is no longer ignored in Home Assistant" if unignored else "Home Assistant is reporting this repair again"
                _event(ticket, REPAIR_ACTOR, "comment", f"{why}, so the ticket was reopened.")
                kind = "reopened"
            elif changed:
                kind = "updated"
            elif unignored:
                await _save(hass, data)
        elif ticket["status"] in ACTIVE_STATUSES:
            resolution = f"Cleared by Home Assistant: this repair is no longer reported{how}."
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


def _panel_settings(data: dict[str, Any], user_id: str | None) -> dict[str, Any]:
    """Everything the Settings page shows, the same whether it was just read or just saved (so a save never drops the prompt texts)."""
    return {**_for_panel(_settings(data)), "notify": _user_notify(data, user_id),
            "agent_prompt_default": DEFAULT_REVIEW_PROMPT, "agent_prompt_fixed": REVIEW_FORMAT}


async def async_get_settings(hass: HomeAssistant, user_id: str | None = None) -> dict[str, Any]:
    """Shared options, plus the notification options of one manager."""
    async with _lock(hass):
        data = await _load(hass)
    return _panel_settings(data, user_id)


def _switch_ai_off(data: dict[str, Any]) -> list[dict[str, Any]]:
    """Turning the AI off takes every ticket off the AI agent's queue and ends any run, so nothing is left waiting for an agent
    that can no longer answer. Turning it back on does not put them back. Returns the tickets that changed."""
    changed = []
    ts = _now()
    for ticket in data["tickets"].values():
        touched = False
        if is_agent(ticket.get("assignee")):
            before = ticket["assignee"]
            ticket["assignee"] = None
            _event(ticket, "Home Desk", "assignee", None, {"field": "assignee", "from": before, "to": None}, ts)
            touched = True
        if _run_state(ticket) in RUN_OPEN:
            ticket["agent_run"].update(state="stopped", finished_at=ts)
            touched = True
        if ticket.pop("agent_state", None):
            touched = True
        if touched:
            ticket["updated_at"] = ts
            changed.append(ticket)
    return changed


async def async_save_settings(
    hass: HomeAssistant, patch: dict[str, Any], *, user_id: str | None = None
) -> dict[str, Any]:
    """Change shared options, and this manager's own notification options. Returns the new settings."""
    patch = dict(patch)
    notify = patch.pop("notify", None)
    keep_prompt = patch.pop("agent_prompt_outdated", None) is False  # "Keep Mine": the edited prompt stays, and counts as up to date
    if "auto_close" in patch and patch["auto_close"] not in AUTO_CLOSE_SECONDS:
        raise TicketError(f"Invalid auto_close {patch['auto_close']!r}; must be one of {list(AUTO_CLOSE_SECONDS)}")
    unknown = set(patch) - set(DEFAULT_SETTINGS)
    if unknown:
        raise TicketError(f"Unknown setting(s) {sorted(unknown)}")
    if "repairs" in patch:
        patch["repairs"] = bool(patch["repairs"])
    if "transcribe" in patch:
        patch["transcribe"] = bool(patch["transcribe"])
    if "agent_runner" in patch:
        patch["agent_runner"] = bool(patch["agent_runner"])
    if "agent_user" in patch:
        patch["agent_user"] = _limit(str(patch["agent_user"]).strip(), 64, "The agent user")
    for key in ("agent_states", "agent_config", "agent_related"):
        if key in patch:
            patch[key] = bool(patch[key])
    if "agent_daily_cap" in patch:
        try:
            cap = int(patch["agent_daily_cap"])
        except (TypeError, ValueError):
            raise TicketError("The daily limit must be a whole number") from None
        if not 1 <= cap <= 500:
            raise TicketError("The daily limit must be between 1 and 500")
        patch["agent_daily_cap"] = cap
    if "agent_prompt" in patch:
        text = str(patch["agent_prompt"]).strip()
        _limit(text, MAX_PROMPT, "The review instructions")
        patch["agent_prompt"] = "" if text == DEFAULT_REVIEW_PROMPT.strip() else text  # nothing stored while it is the default
        patch["agent_prompt_base"] = _default_prompt_id() if patch["agent_prompt"] else ""  # written (or checked) against today's default
    elif keep_prompt:
        patch["agent_prompt_base"] = _default_prompt_id()
    for key in ("agent", "stt"):
        if key in patch:
            patch[key] = _limit(str(patch[key]).strip(), 200, f"The {key} setting")
    if "ai_enabled" in patch:
        patch["ai_enabled"] = bool(patch["ai_enabled"])
    cleared: list[dict[str, Any]] = []
    async with _lock(hass):
        data = await _load(hass)
        if patch.get("ai_enabled") is False and _ai_on(data):
            cleared = _switch_ai_off(data)
        data["settings"] = {**_settings(data), **patch}
        if notify is not None:
            mine = _user_notify(data, user_id)
            for key, value in notify.items():
                if key not in DEFAULT_NOTIFY:
                    raise TicketError(f"Unknown notification setting {key!r}")
                mine[key] = [str(v) for v in value] if key == "targets" else bool(value)
            data.setdefault("notify", {})[user_id or ""] = mine
        await _save(hass, data)
        merged = _panel_settings(data, user_id)
    for ticket in cleared:
        _fire(hass, ticket, "updated", "Home Desk")
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
