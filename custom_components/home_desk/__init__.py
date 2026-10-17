"""Home Desk integration.

A small helpdesk for the smart home: the manager, household members, AI
agents and Home Assistant itself log issues, requests and ideas, and the
manager and AI agents work them with a full history. No entities, no
platforms — a sidebar panel, a WebSocket API, services (with responses, for
AI agents) and a Store-backed ticket list.
"""

from __future__ import annotations

import logging
from datetime import timedelta

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.event import async_track_time_interval
from homeassistant.helpers.start import async_at_started

from .const import CONF_REPAIRS
from .storage import async_auto_close, async_get_settings, async_save_settings
from .agent import async_setup_agent
from .attachments import async_register_views
from .frontend import async_register_sidebar_panel, async_register_static_paths
from .repairs import async_setup_repairs
from .services import async_setup_services
from .websocket_api import async_register_commands

_LOGGER = logging.getLogger(__name__)


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """Set up integration-wide resources: WebSocket commands, services, panel."""
    async_register_commands(hass)
    await async_setup_services(hass)
    try:
        async_register_views(hass)  # photos and voice messages: the report upload and the file download
    except Exception:  # noqa: BLE001 - tickets must keep working even if the upload endpoints can't be added
        _LOGGER.warning("Failed to register Home Desk's report and attachment endpoints", exc_info=True)

    try:
        await async_register_static_paths(hass)
        async_register_sidebar_panel(hass)
    except Exception:  # noqa: BLE001 - never block HA startup over frontend registration
        _LOGGER.warning("Failed to register Home Desk frontend panel", exc_info=True)

    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Mirror Home Assistant Repairs into tickets and close resolved tickets on time, until unloaded."""
    entry.async_on_unload(entry.add_update_listener(_options_updated))

    # "Tickets from Repairs" used to be an option on the entry; it is a setting now. Carry an older "off" across once.
    if entry.options.get(CONF_REPAIRS) is False and (await async_get_settings(hass))["repairs"]:
        await async_save_settings(hass, {"repairs": False})

    async def _close_resolved(_now=None) -> None:
        try:
            await async_auto_close(hass)
        except Exception:  # noqa: BLE001 - a failed check just waits for the next hour
            _LOGGER.warning("Could not auto-close resolved tickets", exc_info=True)

    entry.async_on_unload(async_setup_agent(hass))  # the built-in AI agent takes tickets assigned to it

    await _close_resolved()
    entry.async_on_unload(async_track_time_interval(hass, _close_resolved, timedelta(hours=1)))

    async def _start(_: HomeAssistant) -> None:
        try:
            stop = await async_setup_repairs(hass, dict(entry.options))
        except Exception:  # noqa: BLE001 - never block setup over the repairs feature
            _LOGGER.warning("Could not start Repairs-to-tickets", exc_info=True)
            return
        entry.async_on_unload(stop)

    # Issues are registered as integrations load, so wait until HA has finished starting
    # (this runs straight away if it already has).
    entry.async_on_unload(async_at_started(hass, _start))
    return True


async def _options_updated(hass: HomeAssistant, entry: ConfigEntry) -> None:
    await hass.config_entries.async_reload(entry.entry_id)


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Everything registered through the entry is removed by async_on_unload."""
    return True
