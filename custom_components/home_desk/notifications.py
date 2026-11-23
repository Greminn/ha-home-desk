"""Admin opt-in notifications for newly created Home Desk tickets."""

from __future__ import annotations

import logging
from collections.abc import Callable
from typing import Any

from homeassistant.core import Event, HomeAssistant, callback

from .const import EVENT_TICKET
from .storage import async_get_settings

_LOGGER = logging.getLogger(__name__)
_EXCLUDED_SERVICES = {"notify", "send_message", "persistent_notification"}


def _notification(ticket: dict[str, Any]) -> dict[str, Any]:
    """Use the same title, body and mobile data as the existing HA automation."""
    labels = {str(label).lower() for label in ticket.get("labels") or []}
    kind = next((name for label, name in (("bug", "Problem"), ("enhancement", "Suggestion"), ("question", "Question")) if label in labels), "Task")
    ticket_id = ticket["ticket_id"]
    return {
        "title": f"Home Desk · {kind} #{ticket_id}",
        "message": f"{str(ticket.get('title') or 'New ticket').strip()}\n"
                   f"From: {ticket.get('requester') or 'Unknown requester'}\n"
                   f"Priority: {str(ticket.get('priority') or 'normal').title()}",
        "data": {
            "url": "/home-desk",
            "clickAction": "/home-desk",
            "subtitle": "New Home Desk ticket",
            "subject": "New Home Desk ticket",
            "notification_icon": "mdi:home-alert",
            "notification_icon_color": "#FFFFFF",
            "color": "#1565C0",
            "channel": "Home Desk",
            "group": "HOME_DESK",
            "tag": f"HOME_DESK_{ticket_id}",
            "push": {"sound": "default", "interruption-level": "active"},
        },
    }


async def _send(hass: HomeAssistant, ticket: dict[str, Any]) -> None:
    """Send once per selected notify service, even if two admins choose it."""
    destinations: set[str] = set()
    for user in await hass.auth.async_get_users():
        if not user.is_active or not user.is_admin or user.system_generated:
            continue
        choices = (await async_get_settings(hass, user.id))["notify"]
        if choices["new_ticket"]:
            destinations.update(choices["targets"])

    payload = _notification(ticket)
    for service in destinations:
        if service in _EXCLUDED_SERVICES or not hass.services.has_service("notify", service):
            continue
        try:
            await hass.services.async_call("notify", service, payload, blocking=True)
        except Exception:  # noqa: BLE001 - one broken destination must not block another
            _LOGGER.warning("Could not send Home Desk notification through notify.%s", service, exc_info=True)


def setup_notifications(hass: HomeAssistant) -> Callable[[], None]:
    """Listen for created tickets until the integration is unloaded."""
    @callback
    def on_ticket(event: Event) -> None:
        ticket = event.data
        if ticket.get("kind") == "created" and isinstance(ticket.get("ticket_id"), int):
            hass.async_create_task(_send(hass, dict(ticket)))

    return hass.bus.async_listen(EVENT_TICKET, on_ticket)
