"""Config flow for Home Desk: single instance, with options for Repairs-to-tickets."""

from __future__ import annotations

import voluptuous as vol

from homeassistant import config_entries
from homeassistant.core import callback
from homeassistant.helpers import selector

from .const import CONF_REPAIRS, CONF_REPAIRS_IGNORE, DOMAIN


class HomeDeskConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a Home Desk config flow."""

    VERSION = 1

    async def async_step_user(self, user_input: dict | None = None):
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")
        return self.async_create_entry(title="Home Desk", data={})

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: config_entries.ConfigEntry) -> config_entries.OptionsFlow:
        return HomeDeskOptionsFlow(config_entry)


class HomeDeskOptionsFlow(config_entries.OptionsFlow):
    """Options: whether Home Assistant Repairs become tickets, and which integrations to skip."""

    def __init__(self, config_entry: config_entries.ConfigEntry) -> None:
        self._entry = config_entry

    async def async_step_init(self, user_input: dict | None = None):
        if user_input is not None:
            return self.async_create_entry(data=user_input)
        options = self._entry.options
        schema = vol.Schema(
            {
                vol.Required(CONF_REPAIRS, default=options.get(CONF_REPAIRS, True)): selector.BooleanSelector(),
                vol.Optional(
                    CONF_REPAIRS_IGNORE, default=options.get(CONF_REPAIRS_IGNORE, [])
                ): selector.TextSelector(selector.TextSelectorConfig(multiple=True)),
            }
        )
        return self.async_show_form(step_id="init", data_schema=schema)
