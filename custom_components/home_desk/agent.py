"""The built-in AI: "Review with AI" asks the AI integration chosen in Settings to review a ticket.

This is separate from **Assign to AI Agent**, which only tags a ticket for an AI the person runs themselves (their own Claude
CLI, Claude Desktop or anything else) and sends nothing anywhere. A review sends the ticket to the AI Task entity
(for example Claude's) and posts its answer as a comment. It never changes the assignee, so a ticket queued for the person's own
AI stays queued. It has no tools and no memory, so Home Desk gives it what it needs (agent_context.py); it can explain and advise
and propose changes to the ticket, but can't change anything. While it works the ticket shows an "agent_state", and a request
that fails or times out leaves a comment saying so, never a ticket stuck "working".
"""
from __future__ import annotations

import asyncio
import logging
import re
from datetime import datetime, timezone
from typing import Any

from homeassistant.core import HomeAssistant

from .agent_context import async_build_prompt
from .proposals import clean as clean_actions, split_reply
from .const import AGENT_TIMEOUT, DOMAIN
from .storage import (
    TicketError,
    async_add_comment,
    async_get_settings,
    async_list_categories,
    async_list_labels,
    async_get_ticket,
    async_set_agent_state,
)

_LOGGER = logging.getLogger(__name__)
_RUNS = f"{DOMAIN}_agent_runs"
_DAY = f"{DOMAIN}_agent_day"
_SETTLE = 1.0  # a comment posted just before asking should be on the ticket before it is read


# Words that claim the AI itself acted ("I'll close it", "I've updated", a "Closing ticket" heading). It can't, so a review
# that says so gets a plain note after it, whatever the instructions said.
_CLAIMS = re.compile(
    r"(?im)\bI(?:'ll| will|'m going to|'ve| have| am going to)\s+(?:now\s+)?"
    r"(?:close[ds]?|resolv(?:e|ed|ing)|updat(?:e|ed|ing)|chang(?:e|ed|ing)|label(?:l?ed|l?ing)?|mark(?:ed|ing)?|set|add(?:ed|ing)?|remov(?:e|ed|ing))\b"
    r"|^#+\s*closing ticket"
)
NOTE = "\n\n*This review can't change anything. Use **Apply** under it (if there is one), or the buttons on the ticket.*"


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


async def _say(hass: HomeAssistant, ticket_id: int, message: str) -> None:
    """Leave a comment from Home Desk (why there is no answer) and clear the working state. The assignee is never touched."""
    try:
        await async_add_comment(hass, ticket_id, actor="Home Desk", body=message, hand_back=False)
        await async_set_agent_state(hass, ticket_id, None)
    except TicketError:
        _LOGGER.debug("Ticket %s is gone, so there is nobody to tell", ticket_id)


async def _turn(hass: HomeAssistant, ticket_id: int, entity_id: str, name: str, settings: dict[str, Any]) -> None:
    try:
        await async_set_agent_state(hass, ticket_id, {"state": "working", "agent": name, "since": _now(), "note": "Reading the ticket"})
        await asyncio.sleep(_SETTLE)
        async with asyncio.timeout(AGENT_TIMEOUT):
            prompt = await async_build_prompt(hass, ticket_id, settings, name)
            await async_set_agent_state(hass, ticket_id, {"state": "working", "agent": name, "since": _now(), "note": "Thinking it through"})
            reply = await _ask(hass, entity_id, f"Home Desk ticket #{ticket_id}", prompt)
        body, raw = split_reply(reply)
        labels = {x["name"].lower() for x in await async_list_labels(hass)} | {x["id"].lower() for x in await async_list_labels(hass)}
        categories = {x["name"].lower() for x in await async_list_categories(hass)} | {x["id"].lower() for x in await async_list_categories(hass)}
        actions = clean_actions(raw, labels=labels, categories=categories)
        body = body or reply
        if _CLAIMS.search(body):
            body += NOTE
        await async_add_comment(
            hass, ticket_id, actor=f"ai:{name}", body=body, hand_back=False,
            event_data={"review": True, **({"proposal": {"actions": actions, "state": "pending"}} if actions else {})},
        )
        await async_set_agent_state(hass, ticket_id, None)
    except asyncio.CancelledError:
        raise  # Stop: async_stop_turn tidies up
    except TimeoutError:
        await _say(hass, ticket_id, f"{name} didn't answer in time. Ask again to retry.")
    except Exception as err:  # noqa: BLE001 - whatever went wrong, the person is told
        _LOGGER.warning("The AI could not give hints on ticket %s", ticket_id, exc_info=True)
        reason = str(err).strip().splitlines()[0][:200] if str(err).strip() else err.__class__.__name__
        await _say(hass, ticket_id, f"{name} couldn't answer this time ({reason}).")
    finally:
        _runs(hass).pop(ticket_id, None)


async def async_run_now(hass: HomeAssistant, ticket_id: int, actor: str) -> dict[str, Any]:
    """"Review with AI": ask the AI chosen in Settings to review the ticket (this uses the AI plan). The assignee is left alone."""
    settings = await async_get_settings(hass)
    entity_id = settings.get("agent") or ""
    if not entity_id.startswith("ai_task."):
        raise TicketError("Choose an AI Task agent in Settings first")
    ticket = await async_get_ticket(hass, ticket_id)
    if ticket_id in _runs(hass):
        raise TicketError("The AI is already working on this ticket")
    if not _under_cap(hass, int(settings.get("agent_daily_cap", 30))):
        raise TicketError(f"The AI has reached today's limit of {settings['agent_daily_cap']} requests. The limit is in Settings.")
    name = agent_name(hass, entity_id)
    _runs(hass)[ticket_id] = hass.async_create_task(_turn(hass, ticket_id, entity_id, name, settings))
    return ticket


async def async_stop_turn(hass: HomeAssistant, ticket_id: int, actor: str) -> None:
    """Stop the AI: cancel a request in progress and say so. The assignee is left alone."""
    task = _runs(hass).pop(ticket_id, None)
    if task:
        task.cancel()
    await _say(hass, ticket_id, f"Stopped by {actor}.")


async def async_test_agent(hass: HomeAssistant, entity_id: str) -> str:
    """A harmless request, to see that the chosen AI answers. Returns its answer."""
    return await _ask(hass, entity_id, "Home Desk test", "Reply with one short, friendly sentence saying you are ready to help with smart home tickets.")
