"""WebSocket API for Home Desk (used by the sidebar panel).

Admins see and change everything. Other household users can raise tickets and
comment on their own, and see their own tickets without internal notes.
"""

from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant

from .const import LABEL_COLORS, PRIORITIES, STATUSES
from .storage import (
    TicketError,
    async_add_comment,
    async_close_ticket,
    async_create_label,
    async_create_ticket,
    async_delete_label,
    async_get_ticket,
    async_link_tickets,
    async_list_labels,
    async_list_tickets,
    async_stats,
    async_update_label,
    async_update_ticket,
    view,
)

# What a non-admin may tag their own new ticket with: what kind of report it is.
HOUSEHOLD_LABELS = ("bug", "enhancement", "question")
_LABELS = [vol.All(str, vol.Length(min=1, max=64))]


def _actor(connection: websocket_api.ActiveConnection) -> str:
    return connection.user.name if connection.user and connection.user.name else "unknown"


def _is_admin(connection: websocket_api.ActiveConnection) -> bool:
    return bool(connection.user and connection.user.is_admin)


def _can_see(connection: websocket_api.ActiveConnection, ticket: dict[str, Any]) -> bool:
    return _is_admin(connection) or ticket["requester"] == _actor(connection)


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
            requester=None if _is_admin(connection) else _actor(connection),
            include_history=msg.get("include_history", True),
        )
    except TicketError as err:
        _fail(connection, msg, "invalid", str(err))
        return
    connection.send_result(msg["id"], result)


@websocket_api.websocket_command({vol.Required("type"): "home_desk/get", vol.Required("ticket_id"): int})
@websocket_api.async_response
async def ws_get(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    try:
        ticket = await async_get_ticket(hass, msg["ticket_id"])
    except TicketError as err:
        _fail(connection, msg, "not_found", str(err))
        return
    if not _can_see(connection, ticket):
        _fail(connection, msg, "unauthorized", "Not your ticket")
        return
    out = view(ticket, admin=_is_admin(connection))
    out["related"] = ticket["related"]
    connection.send_result(msg["id"], out)


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
        vol.Optional("entities"): [str],
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
            entities=msg.get("entities"),
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
        vol.Optional("status"): vol.In(STATUSES),
        vol.Optional("priority"): vol.In(PRIORITIES),
        vol.Optional("assignee"): vol.Any(str, None),
        vol.Optional("labels"): _LABELS,
        vol.Optional("entities"): [str],
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


def async_register_commands(hass: HomeAssistant) -> None:
    for command in (
        ws_list, ws_get, ws_stats, ws_create, ws_update, ws_comment, ws_close, ws_link,
        ws_labels, ws_label_create, ws_label_update, ws_label_delete,
    ):
        websocket_api.async_register_command(hass, command)
