"""Services for Home Desk.

Every service returns the affected ticket as its response, so an AI agent
(or an automation) can create, review, comment on, update and close tickets
without going through the panel. Pass `actor` to say who is acting, e.g.
`claude` — otherwise the calling HA user's name is used (or `Home Assistant`
for automations).
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

import voluptuous as vol

from homeassistant.core import HomeAssistant, ServiceCall, SupportsResponse
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers import config_validation as cv

from .changelog import changelog_since
from .const import DOMAIN, PRIORITIES, STATUSES, TYPES
from .storage import (
    TicketError,
    async_add_comment,
    async_close_ticket,
    async_create_ticket,
    async_get_ticket,
    async_import_tickets,
    async_list_tags,
    async_link_tickets,
    async_list_tickets,
    async_stats,
    async_update_ticket,
)

GUIDE_PATH = Path(__file__).parent / "AGENT_GUIDE.md"
CHANGELOG_PATH = Path(__file__).parent / "CHANGELOG.md"
MANIFEST_PATH = Path(__file__).parent / "manifest.json"

_ACTOR = {vol.Optional("actor"): cv.string}
_ID = {vol.Required("ticket_id"): vol.Coerce(int)}
_TAGS = vol.All(cv.ensure_list, [cv.string])


async def _actor(hass: HomeAssistant, call: ServiceCall) -> str:
    if call.data.get("actor"):
        return call.data["actor"]
    if call.context.user_id and (user := await hass.auth.async_get_user(call.context.user_id)):
        return user.name or "Home Assistant"
    return "Home Assistant"


def _wrap(handler):
    async def wrapped(call: ServiceCall) -> dict[str, Any]:
        try:
            return await handler(call)
        except TicketError as err:
            raise HomeAssistantError(str(err)) from err

    return wrapped


async def async_setup_services(hass: HomeAssistant) -> None:
    """Register services for the Home Desk integration."""

    async def create(call: ServiceCall) -> dict[str, Any]:
        actor = await _actor(hass, call)
        d = call.data
        return await async_create_ticket(
            hass,
            title=d["title"],
            description=d.get("description", ""),
            type=d.get("type", "issue"),
            priority=d.get("priority", "normal"),
            requester=d.get("requester", actor),
            assignee=d.get("assignee"),
            tags=d.get("tags"),
            entities=d.get("entities"),
            actor=actor,
        )

    async def get(call: ServiceCall) -> dict[str, Any]:
        return await async_get_ticket(hass, call.data["ticket_id"])

    async def list_(call: ServiceCall) -> dict[str, Any]:
        d = call.data
        return await async_list_tickets(
            hass,
            status=d.get("status", "active"),
            q=d.get("query"),
            type=d.get("type"),
            priority=d.get("priority"),
            assignee=d.get("assignee"),
            requester=d.get("requester"),
            tag=d.get("tag"),
            include_history=d.get("include_history", False),
            limit=d.get("limit", 100),
        )

    async def update(call: ServiceCall) -> dict[str, Any]:
        d = dict(call.data)
        actor = await _actor(hass, call)
        ticket_id = d.pop("ticket_id")
        d.pop("actor", None)
        return await async_update_ticket(hass, ticket_id, actor=actor, **d)

    async def comment(call: ServiceCall) -> dict[str, Any]:
        return await async_add_comment(
            hass,
            call.data["ticket_id"],
            actor=await _actor(hass, call),
            body=call.data["body"],
            internal=call.data.get("internal", False),
        )

    async def close(call: ServiceCall) -> dict[str, Any]:
        return await async_close_ticket(
            hass,
            call.data["ticket_id"],
            actor=await _actor(hass, call),
            resolution=call.data["resolution"],
            status=call.data.get("status", "resolved"),
        )

    async def link(call: ServiceCall) -> dict[str, Any]:
        return await async_link_tickets(
            hass, call.data["ticket_id"], call.data["other_id"], actor=await _actor(hass, call)
        )

    async def list_tags(call: ServiceCall) -> dict[str, Any]:
        return {"tags": await async_list_tags(hass)}

    async def stats(call: ServiceCall) -> dict[str, Any]:
        return await async_stats(hass)

    async def import_file(call: ServiceCall) -> dict[str, Any]:
        path = Path(call.data["path"])
        if not path.is_absolute():
            path = Path(hass.config.path(str(path)))
        # Only files inside the config directory. Compare resolved paths: on HA OS
        # /config is a symlink, which HA's own is_allowed_path() doesn't account for.
        config_dir = Path(hass.config.config_dir).resolve()
        if not path.resolve().is_relative_to(config_dir):
            raise HomeAssistantError(f"{path} must be inside the config directory ({config_dir})")
        try:
            text = await hass.async_add_executor_job(path.read_text, "utf-8")
            items = json.loads(text)
        except (OSError, ValueError) as err:
            raise HomeAssistantError(f"Could not read {path}: {err}") from err
        if not isinstance(items, list):
            raise HomeAssistantError("Import file must contain a JSON list of tickets")
        try:
            return await async_import_tickets(hass, items, actor=await _actor(hass, call))
        except (TicketError, TypeError) as err:
            raise HomeAssistantError(f"Import failed: {err}") from err

    async def get_guide(call: ServiceCall) -> dict[str, Any]:
        text = await hass.async_add_executor_job(GUIDE_PATH.read_text, "utf-8")
        return {"guide": text}

    async def get_changelog(call: ServiceCall) -> dict[str, Any]:
        text, manifest = await hass.async_add_executor_job(
            lambda: (CHANGELOG_PATH.read_text("utf-8"), json.loads(MANIFEST_PATH.read_text("utf-8")))
        )
        return {"version": manifest["version"], "changelog": changelog_since(text, call.data.get("since"))}

    s = hass.services.async_register
    s(DOMAIN, "get_guide", _wrap(get_guide), vol.Schema({}), supports_response=SupportsResponse.ONLY)
    s(DOMAIN, "get_changelog", _wrap(get_changelog), vol.Schema({vol.Optional("since"): cv.string}), supports_response=SupportsResponse.ONLY)
    both = SupportsResponse.OPTIONAL
    s(DOMAIN, "create_ticket", _wrap(create), vol.Schema({
        vol.Required("title"): cv.string,
        vol.Optional("description"): cv.string,
        vol.Optional("type"): vol.In(TYPES),
        vol.Optional("priority"): vol.In(PRIORITIES),
        vol.Optional("requester"): cv.string,
        vol.Optional("assignee"): vol.Any(cv.string, None),
        vol.Optional("tags"): _TAGS,
        vol.Optional("entities"): _TAGS,
        **_ACTOR,
    }), supports_response=both)
    s(DOMAIN, "get_ticket", _wrap(get), vol.Schema(_ID), supports_response=SupportsResponse.ONLY)
    s(DOMAIN, "list_tickets", _wrap(list_), vol.Schema({
        vol.Optional("status"): cv.string,
        vol.Optional("query"): cv.string,
        vol.Optional("type"): vol.In(TYPES),
        vol.Optional("priority"): vol.In(PRIORITIES),
        vol.Optional("assignee"): cv.string,
        vol.Optional("requester"): cv.string,
        vol.Optional("tag"): cv.string,
        vol.Optional("include_history"): cv.boolean,
        vol.Optional("limit"): vol.All(vol.Coerce(int), vol.Range(min=1, max=1000)),
    }), supports_response=SupportsResponse.ONLY)
    s(DOMAIN, "update_ticket", _wrap(update), vol.Schema({
        **_ID,
        vol.Optional("title"): cv.string,
        vol.Optional("description"): cv.string,
        vol.Optional("type"): vol.In(TYPES),
        vol.Optional("status"): vol.In(STATUSES),
        vol.Optional("priority"): vol.In(PRIORITIES),
        vol.Optional("assignee"): vol.Any(cv.string, None),
        vol.Optional("tags"): _TAGS,
        vol.Optional("add_tags"): _TAGS,
        vol.Optional("remove_tags"): _TAGS,
        vol.Optional("entities"): _TAGS,
        vol.Optional("resolution"): vol.Any(cv.string, None),
        **_ACTOR,
    }), supports_response=both)
    s(DOMAIN, "add_comment", _wrap(comment), vol.Schema({
        **_ID,
        vol.Required("body"): cv.string,
        vol.Optional("internal"): cv.boolean,
        **_ACTOR,
    }), supports_response=both)
    s(DOMAIN, "close_ticket", _wrap(close), vol.Schema({
        **_ID,
        vol.Required("resolution"): cv.string,
        vol.Optional("status"): vol.In(["resolved", "closed"]),
        **_ACTOR,
    }), supports_response=both)
    s(DOMAIN, "link_tickets", _wrap(link), vol.Schema({
        **_ID,
        vol.Required("other_id"): vol.Coerce(int),
        **_ACTOR,
    }), supports_response=both)
    s(DOMAIN, "list_tags", _wrap(list_tags), vol.Schema({}), supports_response=SupportsResponse.ONLY)
    s(DOMAIN, "get_stats", _wrap(stats), vol.Schema({}), supports_response=SupportsResponse.ONLY)
    s(DOMAIN, "import_file", _wrap(import_file), vol.Schema({
        vol.Required("path"): cv.string,
        **_ACTOR,
    }), supports_response=SupportsResponse.OPTIONAL)
