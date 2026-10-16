"""Home Desk integration.

A small helpdesk for the smart home: the manager, household members, AI
agents and Home Assistant itself log issues, requests and ideas, and the
manager and AI agents work them with a full history. No entities, no
platforms — a sidebar panel, a WebSocket API, services (with responses, for
AI agents) and a Store-backed ticket list.
"""

from __future__ import annotations

import logging

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .frontend import async_register_sidebar_panel, async_register_static_paths
from .services import async_setup_services
from .websocket_api import async_register_commands

_LOGGER = logging.getLogger(__name__)


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """Set up integration-wide resources: WebSocket commands, services, panel."""
    async_register_commands(hass)
    await async_setup_services(hass)

    try:
        await async_register_static_paths(hass)
        async_register_sidebar_panel(hass)
    except Exception:  # noqa: BLE001 - never block HA startup over frontend registration
        _LOGGER.warning("Failed to register Home Desk frontend panel", exc_info=True)

    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Nothing per-entry to do — everything lives in async_setup."""
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Nothing per-entry to tear down."""
    return True
