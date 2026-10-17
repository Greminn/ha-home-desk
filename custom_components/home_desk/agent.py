"""The built-in AI agent: when a ticket is assigned to the agent chosen in Settings, Home Desk asks it for a turn.

The agent is a Home Assistant AI Task entity (for example Claude's). It has no tools and no memory, so Home Desk gives it
what it needs (agent_context.py) and posts its answer on the ticket as a comment, which hands the ticket back. It only
reads and replies: it can't change anything. While it works the ticket shows an "agent_state", and a turn that fails or
times out hands the ticket back with a comment saying so, so a ticket is never left stuck.
"""

from __future__ import annotations

import asyncio
import logging
import re
from datetime import datetime, timezone
from typing import Any

from homeassistant.core import Event, HomeAssistant, callback

from .agent_context import async_build_prompt
from .const import AGENT_TIMEOUT, DOMAIN, EVENT_TICKET
from .storage import (
    TicketError,
    _agent_key,
    async_add_comment,
    async_get_settings,
    async_get_ticket,
    async_set_agent_state,
    async_update_ticket,
    is_agent,
)

_LOGGER = logging.getLogger(__name__)
_RUNS = f"{DOMAIN}_agent_runs"
_DAY = f"{DOMAIN}_agent_day"
_SETTLE = 1.0  # a comment posted just before assigning should be on the ticket before it is read


def _now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def agent_name(hass: HomeAssistant, entity_id: str) -> str:
    """The agent's short name: "Claude AI Task" becomes Claude (the same rule the panel uses for the assignee)."""
    state = hass.states.get(entity_id) if entity_id else None
    friendly = str(state.attributes.get("friendly_name", "")) if state else ""
    name = re.sub(r"\s*(AI Task|conversation|agent)\s*$", "", friendly, flags=re.IGNORECASE).strip()
    return name or "Claude"


def _runs(hass: HomeAssistant) -> dict[int, asyncio.Task]:
    return hass.data.setdefault(_RUNS, {})


def _under_cap(hass: HomeAssistant, cap: int) -> bool:
    """Count this turn against today's limit; False once the limit is used up."""
    today = datetime.now().date().isoformat()
    day = hass.data.get(_DAY)
    if not day or day["date"] != today:
        day = hass.data[_DAY] = {"date": today, "n": 0}
    if day["n"] >= cap:
        return False
    day["n"] += 1
    return True


async def _ask(hass: HomeAssistant, entity_id: str, task_name: str, instructions: str) -> str:
    """One request to the AI Task entity; its answer as text."""
    response = await hass.services.async_call(
        "ai_task",
        "generate_data",
        {"entity_id": entity_id, "task_name": task_name, "instructions": instructions},
        blocking=True,
        return_response=True,
    )
    data = (response or {}).get("data")
    text = data if isinstance(data, str) else (data or {}).get("reply") if isinstance(data, dict) else None
    text = (text or "").strip()
    if not text:
        raise TicketError("The AI agent sent back an empty answer")
    return text


async def _give_back(hass: HomeAssistant, ticket_id: int, message: str) -> None:
    """Tell the person why there was no answer and hand the ticket back, so it isn't left with the agent."""
    try:
        await async_add_comment(hass, ticket_id, actor="Home Desk", body=message)
        await async_update_ticket(hass, ticket_id, actor="Home Desk", assignee=None)
        await async_set_agent_state(hass, ticket_id, None)
    except TicketError:
        _LOGGER.debug("Ticket %s is gone, so there is nothing to hand back", ticket_id)


async def _turn(hass: HomeAssistant, ticket_id: int, entity_id: str, name: str, settings: dict[str, Any]) -> None:
    try:
        await async_set_agent_state(hass, ticket_id, {"state": "working", "agent": name, "since": _now(), "note": "Reading the ticket"})
        await asyncio.sleep(_SETTLE)
        async with asyncio.timeout(AGENT_TIMEOUT):
            prompt = await async_build_prompt(hass, ticket_id, settings, name)
            await async_set_agent_state(hass, ticket_id, {"state": "working", "agent": name, "since": _now(), "note": "Thinking it through"})
            reply = await _ask(hass, entity_id, f"Home Desk ticket #{ticket_id}", prompt)
        ticket = await async_get_ticket(hass, ticket_id)
        if not is_agent(ticket["assignee"]):
            await async_set_agent_state(hass, ticket_id, None)  # handed to someone else while it thought: drop the answer
            return
        await async_add_comment(hass, ticket_id, actor=f"ai:{name}", body=reply)
    except asyncio.CancelledError:
        raise  # Stop: async_stop_turn tidies up
    except TimeoutError:
        await _give_back(hass, ticket_id, f"{name} didn't answer in time, so the ticket is back with you. Assign it again to retry.")
    except Exception as err:  # noqa: BLE001 - whatever went wrong, the person is told and the ticket is handed back
        _LOGGER.warning("The AI agent could not work on ticket %s", ticket_id, exc_info=True)
        reason = str(err).strip().splitlines()[0][:200] if str(err).strip() else err.__class__.__name__
        await _give_back(hass, ticket_id, f"{name} couldn't answer this time ({reason}). The ticket is back with you.")
    finally:
        _runs(hass).pop(ticket_id, None)


async def async_start_turn(hass: HomeAssistant, ticket_id: int, assignee: str) -> bool:
    """Start the agent on a ticket just assigned to it, if the built-in agent is set up for that. True if a turn started."""
    settings = await async_get_settings(hass)
    entity_id = settings.get("agent") or ""
    if not entity_id.startswith("ai_task.") or not settings.get("agent_auto", True):
        return False  # only an AI Task entity can be asked for a turn; a conversation agent can't
    name = agent_name(hass, entity_id)
    if _agent_key(assignee) != name.lower():
        return False  # assigned to some other agent, such as one run outside Home Assistant
    if ticket_id in _runs(hass):
        return False
    if not _under_cap(hass, int(settings.get("agent_daily_cap", 30))):
        await _give_back(hass, ticket_id, f"{name} has reached today's limit of {settings['agent_daily_cap']} turns, so the ticket is back with you. The limit is in Settings.")
        return False
    _runs(hass)[ticket_id] = hass.async_create_task(_turn(hass, ticket_id, entity_id, name, settings))
    return True


async def async_stop_turn(hass: HomeAssistant, ticket_id: int, actor: str) -> None:
    """Stop the agent: cancel a turn in progress, say so, and hand the ticket back."""
    task = _runs(hass).pop(ticket_id, None)
    if task:
        task.cancel()
    await _give_back(hass, ticket_id, f"Stopped by {actor}. The ticket is back with you.")


async def async_test_agent(hass: HomeAssistant, entity_id: str) -> str:
    """A harmless request, to see that the chosen agent answers. Returns its answer."""
    return await _ask(hass, entity_id, "Home Desk test", "Reply with one short, friendly sentence saying you are ready to help with smart home tickets.")


@callback
def async_setup_agent(hass: HomeAssistant):
    """Start the agent when a ticket is assigned to it. Returns the function that stops listening."""

    @callback
    def _assigned(event: Event) -> None:
        data = event.data
        if data.get("kind") != "assigned" or not data.get("with_agent") or is_agent(data.get("actor")):
            return  # an agent handing a ticket to an agent never starts a turn: no loops
        hass.async_create_task(async_start_turn(hass, data["ticket_id"], data.get("assignee") or ""))

    return hass.bus.async_listen(EVENT_TICKET, _assigned)
