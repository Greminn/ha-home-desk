"""Frontend static path + sidebar panel registration for Home Desk.

Same shape as Spatial Context's: a no-cache view for the panel bundle (so an
updated bundle is always picked up) and a `panel_custom` sidebar entry.
"""

from __future__ import annotations

import logging
from pathlib import Path

from aiohttp import web

from homeassistant.components.frontend import async_register_built_in_panel
from homeassistant.components.http import HomeAssistantView, StaticPathConfig
from homeassistant.core import HomeAssistant

from .const import (
    FRONTEND_URL_PATH,
    PANEL_FILENAME,
    SIDEBAR_ICON,
    SIDEBAR_TITLE,
    URL_BASE,
)

_LOGGER = logging.getLogger(__name__)

WWW_DIR = Path(__file__).parent / "www"

PANEL_URL = f"{URL_BASE}_panel.js"


def _cache_bust_token(filename: str) -> str:
    """Derive a cache-busting token from the served file's own mtime."""
    try:
        return str(int((WWW_DIR / filename).stat().st_mtime))
    except OSError:
        return "0"


class PanelBundleView(HomeAssistantView):
    """Serves the panel bundle with `Cache-Control: no-cache`."""

    url = PANEL_URL
    name = "home_desk:panel_bundle"
    # Loaded by the frontend as a plain module import, which carries no auth header.
    requires_auth = False

    async def get(self, request: web.Request) -> web.FileResponse:
        return web.FileResponse(
            WWW_DIR / PANEL_FILENAME, headers={"Cache-Control": "no-cache"}
        )


async def async_register_static_paths(hass: HomeAssistant) -> None:
    """Register /home_desk/* as a static HTTP path serving www/."""
    try:
        await hass.http.async_register_static_paths(
            [StaticPathConfig(URL_BASE, str(WWW_DIR), False)]
        )
    except RuntimeError:
        _LOGGER.debug("Static path already registered: %s", URL_BASE)
    hass.http.register_view(PanelBundleView())


def async_register_sidebar_panel(hass: HomeAssistant) -> None:
    """Register the Home Desk sidebar panel."""
    panel_url = f"{PANEL_URL}?v={_cache_bust_token(PANEL_FILENAME)}"
    async_register_built_in_panel(
        hass,
        component_name="custom",
        sidebar_title=SIDEBAR_TITLE,
        sidebar_icon=SIDEBAR_ICON,
        frontend_url_path=FRONTEND_URL_PATH,
        require_admin=False,
        config={
            "_panel_custom": {
                "name": "home-desk-panel",
                "js_url": panel_url,
            }
        },
    )
