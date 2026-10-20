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
from homeassistant.exceptions import HomeAssistantError, Unauthorized
from homeassistant.helpers import config_validation as cv

from .changelog import changelog_since
from .const import DOMAIN, LABEL_COLORS, LEGACY_TYPE_LABELS, PRIORITIES, STATUS_ALIASES, STATUSES
from .storage import (
    TicketError,
    async_add_comment,
    async_claim_run,
    async_finish_run,
    async_note_run,
    async_get_settings,
    async_close_ticket,
    async_create_category,
    async_create_label,
    async_create_ticket,
    async_delete_category,
    async_delete_label,
    async_get_ticket,
    async_import_tickets,
    async_list_categories,
    async_list_labels,
    async_link_tickets,
    async_merge_tickets,
    async_list_tickets,
    async_stats,
    async_update_category,
    async_update_label,
    async_update_ticket,
    upgrade_legacy_fields,
)

GUIDE_PATH = Path(__file__).parent / "AGENT_GUIDE.md"
CHANGELOG_PATH = Path(__file__).parent / "CHANGELOG.md"
MANIFEST_PATH = Path(__file__).parent / "manifest.json"

_ACTOR = {vol.Optional("actor"): cv.string}
_ID = {vol.Required("ticket_id"): vol.Coerce(int)}
_LABELS = vol.All(cv.ensure_list, [cv.string])
# Pre-label names still accepted (and translated) so older callers keep working. Not documented.
_LEGACY_STATUS = vol.In([*STATUSES, *STATUS_ALIASES, "waiting"])
_LEGACY = {
    vol.Optional("type"): vol.In(list(LEGACY_TYPE_LABELS)),
    vol.Optional("tags"): _LABELS,
}


async def _is_agent_user(hass: HomeAssistant, call: ServiceCall) -> bool:
    """Is this call from the Home Assistant user set up as the AI Agent's own (a non-administrator with a few services)?"""
    user_id = call.context.user_id
    if not user_id:
        return False
    user = await hass.auth.async_get_user(user_id)
    if user is None or user.is_admin:
        return False
    return user_id == (await async_get_settings(hass)).get("agent_user")


async def _actor(hass: HomeAssistant, call: ServiceCall) -> str:
    if call.data.get("actor"):
        # The agent user always acts as an AI, whatever name it passes, so its comments are never taken for a person's.
        if await _is_agent_user(hass, call) and not call.data["actor"].lower().startswith("ai:"):
            return f"ai:{call.data['actor']}"
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
        d = upgrade_legacy_fields(dict(call.data), "create")
        return await async_create_ticket(
            hass,
            title=d["title"],
            description=d.get("description", ""),
            priority=d.get("priority", "normal"),
            requester=d.get("requester", actor),
            assignee=d.get("assignee"),
            labels=d.get("labels"),
            category=d.get("category"),
            entities=d.get("entities"),
            devices=d.get("devices"),
            areas=d.get("areas"),
            actor=actor,
        )

    async def get(call: ServiceCall) -> dict[str, Any]:
        return await async_get_ticket(hass, call.data["ticket_id"])

    async def list_(call: ServiceCall) -> dict[str, Any]:
        d = upgrade_legacy_fields(dict(call.data), "filter")
        return await async_list_tickets(
            hass,
            status=d.get("status", "active"),
            q=d.get("query"),
            priority=d.get("priority"),
            assignee=d.get("assignee"),
            requester=d.get("requester"),
            label=d.get("label"),
            category=d.get("category"),
            include_history=d.get("include_history", False),
            run_state=d.get("run_state"),
            limit=d.get("limit", 100),
        )

    async def update(call: ServiceCall) -> dict[str, Any]:
        d = upgrade_legacy_fields(dict(call.data), "update")
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
            hand_back=not call.data.get("keep_assigned", False),  # an agent's comment normally hands the ticket back; this keeps it queued
        )

    async def claim_run(call: ServiceCall) -> dict[str, Any]:
        actor = await _actor(hass, call)
        return await async_claim_run(hass, call.data["ticket_id"], agent=actor.removeprefix("ai:"))

    async def note_run(call: ServiceCall) -> dict[str, Any]:
        actor = await _actor(hass, call)
        return await async_note_run(hass, call.data["ticket_id"], agent=actor.removeprefix("ai:"), note=call.data["note"])

    async def finish_run(call: ServiceCall) -> dict[str, Any]:
        actor = await _actor(hass, call)
        return await async_finish_run(
            hass, call.data["ticket_id"], agent=actor.removeprefix("ai:"), state=call.data["state"], body=call.data["body"],
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

    async def merge(call: ServiceCall) -> dict[str, Any]:
        return await async_merge_tickets(
            hass, call.data["ticket_id"], call.data["merge_ids"], actor=await _actor(hass, call)
        )

    async def list_labels(call: ServiceCall) -> dict[str, Any]:
        return {"labels": await async_list_labels(hass)}

    async def _find_label(ref: str) -> dict[str, Any]:
        ref = ref.strip().lower()
        found = next((l for l in await async_list_labels(hass) if l["id"] == ref or l["name"].lower() == ref), None)
        if found is None:
            raise TicketError(f"Unknown label {ref!r}")
        return found

    async def create_label(call: ServiceCall) -> dict[str, Any]:
        d = call.data
        return await async_create_label(
            hass, name=d["name"], color=d.get("color"), description=d.get("description", ""), icon=d.get("icon", "")
        )

    async def update_label(call: ServiceCall) -> dict[str, Any]:
        d = call.data
        found = await _find_label(d["label"])
        return await async_update_label(
            hass, found["id"], name=d.get("name"), color=d.get("color"), description=d.get("description"), icon=d.get("icon")
        )

    async def delete_label(call: ServiceCall) -> dict[str, Any]:
        found = await _find_label(call.data["label"])
        # Agents may only remove a label nothing uses; the manager can delete a used one in the panel.
        await async_delete_label(hass, found["id"], only_if_empty=True)
        return {"deleted": found["name"]}

    async def list_categories(call: ServiceCall) -> dict[str, Any]:
        return {"categories": await async_list_categories(hass)}

    async def create_category(call: ServiceCall) -> dict[str, Any]:
        return await async_create_category(hass, name=call.data["name"], icon=call.data.get("icon", ""))

    async def update_category(call: ServiceCall) -> dict[str, Any]:
        cats = await async_list_categories(hass)
        ref = call.data["category"].strip().lower()
        found = next((c for c in cats if c["id"] == ref or c["name"].lower() == ref), None)
        if found is None:
            raise TicketError(f"Unknown category {call.data['category']!r}")
        return await async_update_category(
            hass, found["id"], name=call.data.get("name"), icon=call.data.get("icon")
        )

    async def delete_category(call: ServiceCall) -> dict[str, Any]:
        cats = await async_list_categories(hass)
        ref = call.data["category"].strip().lower()
        found = next((c for c in cats if c["id"] == ref or c["name"].lower() == ref), None)
        if found is None:
            raise TicketError(f"Unknown category {call.data['category']!r}")
        # Agents may only remove a category nothing uses; the manager can delete a used one in the panel.
        await async_delete_category(hass, found["id"], only_if_empty=True)
        return {"deleted": found["name"]}

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

    # Only the guide and the changelog are open to every user. Everything else reads or changes tickets, so it needs an
    # administrator (automations and scripts, which have no user, are fine). Otherwise any household member's account
    # could call these services and see internal notes or other people's tickets, which the panel does not allow.
    open_register = hass.services.async_register

    # The AI Agent's own Home Assistant user (Settings) is not an administrator. It may use only these: read, comment, triage,
    # create, link, close, and the two calls that run it. Merging, labels and categories, and import stay with administrators.
    agent_services = {
        "get_ticket", "list_tickets", "get_stats", "list_labels", "list_categories", "create_ticket", "update_ticket",
        "add_comment", "close_ticket", "link_tickets", "claim_run", "note_run", "finish_run",
    }

    def s(domain, name, handler, schema, supports_response=SupportsResponse.NONE):
        if name in ("get_guide", "get_changelog"):
            open_register(domain, name, handler, schema, supports_response=supports_response)
            return

        async def checked(call: ServiceCall):
            user_id = call.context.user_id
            if user_id is not None:  # an automation or script has no user and is trusted, as before
                user = await hass.auth.async_get_user(user_id)
                if user is None or not user.is_active:
                    raise Unauthorized(context=call.context)
                if not user.is_admin and not (name in agent_services and await _is_agent_user(hass, call)):
                    raise Unauthorized(context=call.context, permission="admin")
            return await handler(call)

        open_register(domain, name, checked, schema, supports_response=supports_response)
    s(DOMAIN, "get_guide", _wrap(get_guide), vol.Schema({}), supports_response=SupportsResponse.ONLY)
    s(DOMAIN, "get_changelog", _wrap(get_changelog), vol.Schema({vol.Optional("since"): cv.string}), supports_response=SupportsResponse.ONLY)
    both = SupportsResponse.OPTIONAL
    s(DOMAIN, "create_ticket", _wrap(create), vol.Schema({
        vol.Required("title"): cv.string,
        vol.Optional("description"): cv.string,
        vol.Optional("priority"): vol.In(PRIORITIES),
        vol.Optional("requester"): cv.string,
        vol.Optional("assignee"): vol.Any(cv.string, None),
        vol.Optional("labels"): _LABELS,
        vol.Optional("category"): vol.Any(cv.string, None),
        vol.Optional("entities"): _LABELS,
        vol.Optional("devices"): _LABELS,
        vol.Optional("areas"): _LABELS,
        **_LEGACY,
        **_ACTOR,
    }), supports_response=both)
    s(DOMAIN, "get_ticket", _wrap(get), vol.Schema(_ID), supports_response=SupportsResponse.ONLY)
    s(DOMAIN, "list_tickets", _wrap(list_), vol.Schema({
        vol.Optional("status"): cv.string,
        vol.Optional("query"): cv.string,
        vol.Optional("priority"): vol.In(PRIORITIES),
        vol.Optional("assignee"): cv.string,
        vol.Optional("requester"): cv.string,
        vol.Optional("label"): cv.string,
        vol.Optional("category"): cv.string,
        vol.Optional("include_history"): cv.boolean,
        vol.Optional("run_state"): cv.string,
        vol.Optional("type"): vol.In(list(LEGACY_TYPE_LABELS)),
        vol.Optional("tag"): cv.string,
        vol.Optional("limit"): vol.All(vol.Coerce(int), vol.Range(min=1, max=1000)),
    }), supports_response=SupportsResponse.ONLY)
    s(DOMAIN, "update_ticket", _wrap(update), vol.Schema({
        **_ID,
        vol.Optional("title"): cv.string,
        vol.Optional("description"): cv.string,
        vol.Optional("status"): _LEGACY_STATUS,
        vol.Optional("priority"): vol.In(PRIORITIES),
        vol.Optional("assignee"): vol.Any(cv.string, None),
        vol.Optional("labels"): _LABELS,
        vol.Optional("add_labels"): _LABELS,
        vol.Optional("remove_labels"): _LABELS,
        vol.Optional("category"): vol.Any(cv.string, None),
        vol.Optional("entities"): _LABELS,
        vol.Optional("devices"): _LABELS,
        vol.Optional("areas"): _LABELS,
        vol.Optional("add_tags"): _LABELS,
        vol.Optional("remove_tags"): _LABELS,
        **_LEGACY,
        vol.Optional("resolution"): vol.Any(cv.string, None),
        **_ACTOR,
    }), supports_response=both)
    s(DOMAIN, "add_comment", _wrap(comment), vol.Schema({
        **_ID,
        vol.Required("body"): cv.string,
        vol.Optional("internal"): cv.boolean,
        vol.Optional("keep_assigned"): cv.boolean,
        **_ACTOR,
    }), supports_response=both)
    s(DOMAIN, "claim_run", _wrap(claim_run), vol.Schema({**_ID, **_ACTOR}), supports_response=both)
    s(DOMAIN, "note_run", _wrap(note_run), vol.Schema({**_ID, vol.Required("note"): cv.string, **_ACTOR}), supports_response=both)
    s(DOMAIN, "finish_run", _wrap(finish_run), vol.Schema({
        **_ID,
        vol.Required("state"): vol.In(["proposed", "done", "failed"]),
        vol.Required("body"): cv.string,
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
    s(DOMAIN, "merge_tickets", _wrap(merge), vol.Schema({
        **_ID,
        vol.Required("merge_ids"): vol.All(cv.ensure_list, [vol.Coerce(int)]),
        **_ACTOR,
    }), supports_response=both)
    s(DOMAIN, "list_labels", _wrap(list_labels), vol.Schema({}), supports_response=SupportsResponse.ONLY)
    s(DOMAIN, "create_label", _wrap(create_label), vol.Schema({
        vol.Required("name"): cv.string,
        vol.Optional("color"): vol.In(LABEL_COLORS),
        vol.Optional("description"): cv.string,
        vol.Optional("icon"): cv.string,
        **_ACTOR,
    }), supports_response=both)
    s(DOMAIN, "update_label", _wrap(update_label), vol.Schema({
        vol.Required("label"): cv.string,
        vol.Optional("name"): cv.string,
        vol.Optional("color"): vol.In(LABEL_COLORS),
        vol.Optional("description"): cv.string,
        vol.Optional("icon"): cv.string,
        **_ACTOR,
    }), supports_response=both)
    s(DOMAIN, "delete_label", _wrap(delete_label), vol.Schema({
        vol.Required("label"): cv.string,
        **_ACTOR,
    }), supports_response=both)
    s(DOMAIN, "list_categories", _wrap(list_categories), vol.Schema({}), supports_response=SupportsResponse.ONLY)
    s(DOMAIN, "create_category", _wrap(create_category), vol.Schema({
        vol.Required("name"): cv.string,
        vol.Optional("icon"): cv.string,
        **_ACTOR,
    }), supports_response=both)
    s(DOMAIN, "update_category", _wrap(update_category), vol.Schema({
        vol.Required("category"): cv.string,
        vol.Optional("name"): cv.string,
        vol.Optional("icon"): cv.string,
        **_ACTOR,
    }), supports_response=both)
    s(DOMAIN, "delete_category", _wrap(delete_category), vol.Schema({
        vol.Required("category"): cv.string,
        **_ACTOR,
    }), supports_response=both)
    s(DOMAIN, "get_stats", _wrap(stats), vol.Schema({}), supports_response=SupportsResponse.ONLY)
    s(DOMAIN, "import_file", _wrap(import_file), vol.Schema({
        vol.Required("path"): cv.string,
        **_ACTOR,
    }), supports_response=SupportsResponse.OPTIONAL)
