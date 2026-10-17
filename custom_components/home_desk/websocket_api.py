"""WebSocket API for Home Desk (used by the sidebar panel).

Admins see and change everything. Other household users can raise a ticket (and list their own), and nothing else:
they can't open a ticket or comment on it, so anything more is talked through in person.
"""

from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant

from .const import AUTO_CLOSE_SECONDS, DOMAIN, LABEL_COLORS, PRIORITIES, STATUS_ALIASES, STATUSES
from .agent import async_run_now, async_stop_turn, async_test_agent
from .suggest import async_ask_ai, async_guess
from .storage import (
    async_apply_proposal,
    async_dismiss_proposal,
    TicketError,
    async_add_comment,
    async_close_ticket,
    async_auto_close,
    async_create_category,
    async_create_label,
    async_create_ticket,
    async_delete_category,
    async_delete_label,
    async_get_settings,
    async_mark_read,
    async_get_ticket,
    async_link_tickets,
    async_merge_tickets,
    async_list_categories,
    async_list_labels,
    async_list_tickets,
    async_save_settings,
    async_stats,
    async_update_category,
    async_update_label,
    async_update_ticket,
    view,
)

# What a non-admin may tag their own new ticket with: what kind of report it is.
HOUSEHOLD_LABELS = ("bug", "enhancement", "question")
_LABELS = [vol.All(str, vol.Length(min=1, max=64))]
# Old status names ("open") are still accepted; the storage layer translates them.
_STATUS = vol.In([*STATUSES, *STATUS_ALIASES])


def _actor(connection: websocket_api.ActiveConnection) -> str:
    return connection.user.name if connection.user and connection.user.name else "unknown"


def _is_admin(connection: websocket_api.ActiveConnection) -> bool:
    return bool(connection.user and connection.user.is_admin)


def _can_see(connection: websocket_api.ActiveConnection, ticket: dict[str, Any]) -> bool:
    return _is_admin(connection) or ticket["requester"] == _actor(connection)


def _viewer(connection: websocket_api.ActiveConnection) -> dict[str, Any] | None:
    if not connection.user:
        return None
    return {"id": connection.user.id, "name": _actor(connection), "admin": _is_admin(connection)}


def _fail(connection: websocket_api.ActiveConnection, msg: dict, code: str, text: str) -> None:
    connection.send_error(msg["id"], code, text)


@websocket_api.websocket_command(
    {
        vol.Required("type"): "home_desk/list",
        vol.Optional("status"): str,
        vol.Optional("q"): str,
        vol.Optional("priority"): vol.In(PRIORITIES),
        vol.Optional("assignee"): str,
        vol.Optional("label"): str,
        vol.Optional("category"): str,
        vol.Optional("include_history"): bool,
    }
)
@websocket_api.async_response
async def ws_list(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    try:
        result = await async_list_tickets(
            hass,
            status=msg.get("status"),
            q=msg.get("q"),
            priority=msg.get("priority"),
            assignee=msg.get("assignee"),
            label=msg.get("label"),
            category=msg.get("category"),
            requester=None if _is_admin(connection) else _actor(connection),
            include_history=msg.get("include_history", True),
            viewer=_viewer(connection),
        )
    except TicketError as err:
        _fail(connection, msg, "invalid", str(err))
        return
    connection.send_result(msg["id"], result)


@websocket_api.websocket_command({vol.Required("type"): "home_desk/get", vol.Required("ticket_id"): int})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_get(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    try:
        ticket = await async_get_ticket(hass, msg["ticket_id"], user_id=connection.user.id if connection.user else None)
    except TicketError as err:
        _fail(connection, msg, "not_found", str(err))
        return
    if not _can_see(connection, ticket):
        _fail(connection, msg, "unauthorized", "Not your ticket")
        return
    out = view(ticket, admin=_is_admin(connection))
    out["related"] = ticket["related"]
    connection.send_result(msg["id"], out)


@websocket_api.websocket_command(
    {vol.Required("type"): "home_desk/mark_read", vol.Optional("ticket_ids"): [int]}
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_mark_read(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    """Mark some tickets (or, with no ids, all of them) as read for the signed-in person."""
    if not connection.user:
        _fail(connection, msg, "unauthorized", "Sign in first")
        return
    count = await async_mark_read(hass, connection.user.id, msg.get("ticket_ids"))
    connection.send_result(msg["id"], {"marked": count})


@websocket_api.websocket_command({vol.Required("type"): "home_desk/stats"})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_stats(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    connection.send_result(msg["id"], await async_stats(hass))


@websocket_api.websocket_command(
    {
        vol.Required("type"): "home_desk/create",
        vol.Required("title"): str,
        vol.Optional("description"): str,
        vol.Optional("priority"): vol.In(PRIORITIES),
        vol.Optional("labels"): _LABELS,
        vol.Optional("category"): str,
        vol.Optional("entities"): [str],
        vol.Optional("devices"): [str],
        vol.Optional("areas"): [str],
    }
)
@websocket_api.async_response
async def ws_create(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    actor = _actor(connection)
    admin = _is_admin(connection)
    try:
        ticket = await async_create_ticket(
            hass,
            title=msg["title"],
            description=msg.get("description", ""),
            # Non-admins can't set priority or most labels; the manager triages those.
            priority=msg.get("priority", "normal") if admin else "normal",
            requester=actor,
            labels=msg.get("labels") if admin else [x for x in msg.get("labels", []) if x in HOUSEHOLD_LABELS] or None,
            category=msg.get("category") if admin else None,
            entities=msg.get("entities"),
            devices=msg.get("devices"),
            areas=msg.get("areas"),
            actor=actor,
        )
    except TicketError as err:
        _fail(connection, msg, "invalid", str(err))
        return
    connection.send_result(msg["id"], ticket)


@websocket_api.websocket_command(
    {
        vol.Required("type"): "home_desk/update",
        vol.Required("ticket_id"): int,
        vol.Optional("title"): str,
        vol.Optional("description"): str,
        vol.Optional("status"): _STATUS,
        vol.Optional("priority"): vol.In(PRIORITIES),
        vol.Optional("assignee"): vol.Any(str, None),
        vol.Optional("labels"): _LABELS,
        vol.Optional("category"): vol.Any(str, None),
        vol.Optional("entities"): [str],
        vol.Optional("devices"): [str],
        vol.Optional("areas"): [str],
        vol.Optional("resolution"): vol.Any(str, None),
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_update(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    fields = {k: v for k, v in msg.items() if k not in ("id", "type", "ticket_id")}
    try:
        ticket = await async_update_ticket(hass, msg["ticket_id"], actor=_actor(connection), **fields)
    except TicketError as err:
        _fail(connection, msg, "invalid", str(err))
        return
    connection.send_result(msg["id"], ticket)


@websocket_api.websocket_command(
    {
        vol.Required("type"): "home_desk/comment",
        vol.Required("ticket_id"): int,
        vol.Required("body"): str,
        vol.Optional("internal"): bool,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_comment(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    try:
        ticket = await async_get_ticket(hass, msg["ticket_id"])
        if not _can_see(connection, ticket):
            _fail(connection, msg, "unauthorized", "Not your ticket")
            return
        ticket = await async_add_comment(
            hass,
            msg["ticket_id"],
            actor=_actor(connection),
            body=msg["body"],
            internal=bool(msg.get("internal")) and _is_admin(connection),
        )
    except TicketError as err:
        _fail(connection, msg, "invalid", str(err))
        return
    connection.send_result(msg["id"], view(ticket, admin=_is_admin(connection)))


@websocket_api.websocket_command(
    {
        vol.Required("type"): "home_desk/close",
        vol.Required("ticket_id"): int,
        vol.Required("resolution"): str,
        vol.Optional("status"): vol.In(["resolved", "closed"]),
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_close(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    try:
        ticket = await async_close_ticket(
            hass,
            msg["ticket_id"],
            actor=_actor(connection),
            resolution=msg["resolution"],
            status=msg.get("status", "resolved"),
        )
    except TicketError as err:
        _fail(connection, msg, "invalid", str(err))
        return
    connection.send_result(msg["id"], ticket)


@websocket_api.websocket_command(
    {
        vol.Required("type"): "home_desk/link",
        vol.Required("ticket_id"): int,
        vol.Required("other_id"): int,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_link(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    try:
        ticket = await async_link_tickets(hass, msg["ticket_id"], msg["other_id"], actor=_actor(connection))
    except TicketError as err:
        _fail(connection, msg, "invalid", str(err))
        return
    connection.send_result(msg["id"], ticket)


@websocket_api.websocket_command(
    {
        vol.Required("type"): "home_desk/merge",
        vol.Required("ticket_id"): int,
        vol.Required("merge_ids"): [int],
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_merge(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    """Fold other tickets into `ticket_id`: their conversation moves over and they are closed as merged."""
    try:
        ticket = await async_merge_tickets(hass, msg["ticket_id"], msg["merge_ids"], actor=_actor(connection))
    except TicketError as err:
        _fail(connection, msg, "invalid", str(err))
        return
    connection.send_result(msg["id"], ticket)


@websocket_api.websocket_command({vol.Required("type"): "home_desk/labels"})
@websocket_api.async_response
async def ws_labels(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    """Every label with its colour and ticket count (everyone needs these to draw chips)."""
    connection.send_result(msg["id"], {"labels": await async_list_labels(hass)})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "home_desk/label_create",
        vol.Required("name"): str,
        vol.Optional("color"): vol.In(LABEL_COLORS),
        vol.Optional("description"): str,
        vol.Optional("icon"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_label_create(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    try:
        label = await async_create_label(
            hass, name=msg["name"], color=msg.get("color"), description=msg.get("description", ""), icon=msg.get("icon", "")
        )
    except TicketError as err:
        _fail(connection, msg, "invalid", str(err))
        return
    connection.send_result(msg["id"], label)


@websocket_api.websocket_command(
    {
        vol.Required("type"): "home_desk/label_update",
        vol.Required("label_id"): str,
        vol.Optional("name"): str,
        vol.Optional("color"): vol.In(LABEL_COLORS),
        vol.Optional("description"): str,
        vol.Optional("icon"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_label_update(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    try:
        label = await async_update_label(
            hass, msg["label_id"], name=msg.get("name"), color=msg.get("color"), description=msg.get("description"), icon=msg.get("icon")
        )
    except TicketError as err:
        _fail(connection, msg, "invalid", str(err))
        return
    connection.send_result(msg["id"], label)


@websocket_api.websocket_command(
    {vol.Required("type"): "home_desk/label_delete", vol.Required("label_id"): str}
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_label_delete(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    try:
        removed = await async_delete_label(hass, msg["label_id"])
    except TicketError as err:
        _fail(connection, msg, "invalid", str(err))
        return
    connection.send_result(msg["id"], {"removed_from": removed})


@websocket_api.websocket_command({vol.Required("type"): "home_desk/categories"})
@websocket_api.async_response
async def ws_categories(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    """Every category with its icon and ticket count (everyone needs these to draw a ticket's category)."""
    connection.send_result(msg["id"], {"categories": await async_list_categories(hass)})


@websocket_api.websocket_command(
    {vol.Required("type"): "home_desk/category_create", vol.Required("name"): str, vol.Optional("icon"): str}
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_category_create(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    try:
        category = await async_create_category(hass, name=msg["name"], icon=msg.get("icon", ""))
    except TicketError as err:
        _fail(connection, msg, "invalid", str(err))
        return
    connection.send_result(msg["id"], category)


@websocket_api.websocket_command(
    {
        vol.Required("type"): "home_desk/category_update",
        vol.Required("category_id"): str,
        vol.Optional("name"): str,
        vol.Optional("icon"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_category_update(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    try:
        category = await async_update_category(hass, msg["category_id"], name=msg.get("name"), icon=msg.get("icon"))
    except TicketError as err:
        _fail(connection, msg, "invalid", str(err))
        return
    connection.send_result(msg["id"], category)


@websocket_api.websocket_command({vol.Required("type"): "home_desk/category_delete", vol.Required("category_id"): str})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_category_delete(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    try:
        removed = await async_delete_category(hass, msg["category_id"])
    except TicketError as err:
        _fail(connection, msg, "invalid", str(err))
        return
    connection.send_result(msg["id"], {"removed_from": removed})


@websocket_api.websocket_command({vol.Required("type"): "home_desk/settings"})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_settings(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    """Shared options and this manager's own notification options."""
    connection.send_result(msg["id"], await async_get_settings(hass, connection.user.id if connection.user else None))


@websocket_api.websocket_command(
    {
        vol.Required("type"): "home_desk/settings_save",
        vol.Optional("auto_close"): vol.In(list(AUTO_CLOSE_SECONDS)),
        vol.Optional("agent"): str,
        vol.Optional("repairs"): bool,
        vol.Optional("stt"): str,
        vol.Optional("transcribe"): bool,
        vol.Optional("agent_states"): bool,
        vol.Optional("agent_config"): bool,
        vol.Optional("agent_related"): bool,
        vol.Optional("agent_daily_cap"): vol.All(int, vol.Range(min=1, max=500)),
        vol.Optional("notify"): {
            vol.Optional("targets"): [str],
            vol.Optional("new_ticket"): bool,
            vol.Optional("comment"): bool,
            vol.Optional("resolved"): bool,
        },
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_settings_save(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    patch = {k: v for k, v in msg.items() if k not in ("id", "type")}
    before = await async_get_settings(hass)
    try:
        result = await async_save_settings(hass, patch, user_id=connection.user.id if connection.user else None)
    except TicketError as err:
        _fail(connection, msg, "invalid", str(err))
        return
    # Turning Repairs-to-tickets on picks up the repairs that exist right now.
    catch_up = hass.data.get(f"{DOMAIN}_repairs_catch_up")
    if catch_up and result["repairs"] and not before["repairs"]:
        hass.async_create_task(catch_up())
    # Changing the auto-close delay applies straight away rather than at the next hourly check.
    if "auto_close" in patch:
        hass.async_create_task(async_auto_close(hass))
    connection.send_result(msg["id"], result)


@websocket_api.websocket_command(
    {vol.Required("type"): "home_desk/suggest", vol.Required("ticket_id"): int, vol.Optional("ai"): bool}
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_suggest(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    """Devices, entities and areas a ticket is probably about: guessed from its words, or (with `ai`) chosen by the AI agent."""
    try:
        ticket = await async_get_ticket(hass, msg["ticket_id"])
        if msg.get("ai"):
            found = await async_ask_ai(hass, ticket, await async_get_settings(hass))
        else:
            found = async_guess(hass, ticket)
    except TicketError as err:
        _fail(connection, msg, "invalid", str(err))
        return
    except Exception as err:  # noqa: BLE001 - shown to the person who asked
        _fail(connection, msg, "failed", str(err).strip().splitlines()[0][:300] if str(err).strip() else err.__class__.__name__)
        return
    connection.send_result(msg["id"], {"suggestions": found})


@websocket_api.websocket_command(
    {vol.Required("type"): "home_desk/proposal", vol.Required("ticket_id"): int, vol.Required("event_id"): int, vol.Required("do"): vol.In(["apply", "dismiss"])}
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_proposal(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    """Apply or dismiss the changes the AI agent proposed in a comment."""
    try:
        act = async_apply_proposal if msg["do"] == "apply" else async_dismiss_proposal
        ticket = await act(hass, msg["ticket_id"], msg["event_id"], actor=_actor(connection))
    except TicketError as err:
        _fail(connection, msg, "invalid", str(err))
        return
    connection.send_result(msg["id"], ticket)


@websocket_api.websocket_command({vol.Required("type"): "home_desk/agent_run", vol.Required("ticket_id"): int})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_agent_run(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    """Hand a ticket to the built-in AI agent and have it work on it now (this uses the AI plan)."""
    try:
        ticket = await async_run_now(hass, msg["ticket_id"], _actor(connection))
    except TicketError as err:
        _fail(connection, msg, "invalid", str(err))
        return
    connection.send_result(msg["id"], ticket)


@websocket_api.websocket_command({vol.Required("type"): "home_desk/agent_stop", vol.Required("ticket_id"): int})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_agent_stop(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    """Stop the AI agent working on a ticket and hand the ticket back."""
    try:
        await async_get_ticket(hass, msg["ticket_id"])
    except TicketError as err:
        _fail(connection, msg, "not_found", str(err))
        return
    await async_stop_turn(hass, msg["ticket_id"], _actor(connection))
    connection.send_result(msg["id"], {"stopped": msg["ticket_id"]})


@websocket_api.websocket_command({vol.Required("type"): "home_desk/agent_test"})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_agent_test(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    """Ask the chosen AI agent a harmless question, to show it works (or why it doesn't)."""
    entity = (await async_get_settings(hass)).get("agent") or ""
    if not entity:
        _fail(connection, msg, "invalid", "Choose an AI agent first")
        return
    try:
        reply = await async_test_agent(hass, entity)
    except Exception as err:  # noqa: BLE001 - shown to the person trying it
        _fail(connection, msg, "failed", str(err).strip().splitlines()[0][:300] if str(err).strip() else err.__class__.__name__)
        return
    connection.send_result(msg["id"], {"reply": reply})


def async_register_commands(hass: HomeAssistant) -> None:
    for command in (
        ws_list, ws_get, ws_mark_read, ws_stats, ws_create, ws_update, ws_comment, ws_close, ws_link, ws_merge,
        ws_labels, ws_label_create, ws_label_update, ws_label_delete,
        ws_categories, ws_category_create, ws_category_update, ws_category_delete,
        ws_settings, ws_settings_save, ws_proposal, ws_agent_run, ws_agent_stop, ws_agent_test, ws_suggest,
    ):
        websocket_api.async_register_command(hass, command)
