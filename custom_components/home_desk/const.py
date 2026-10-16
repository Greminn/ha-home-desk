"""Constants for the Home Desk integration."""

from __future__ import annotations

DOMAIN = "home_desk"

URL_BASE = "/home_desk"
PANEL_FILENAME = "home-desk-panel.js"

SIDEBAR_TITLE = "Home Desk"
# A standard Material Design icon, so the sidebar entry matches HA's own.
SIDEBAR_ICON = "mdi:lifebuoy"
FRONTEND_URL_PATH = "home-desk"

# Fired on the HA event bus whenever a ticket changes, so automations can
# notify the requester / manager. Data: ticket_id, kind, actor, title, status.
EVENT_TICKET = f"{DOMAIN}_event"

STATUSES = ["new", "open", "in_progress", "waiting", "resolved", "closed"]
ACTIVE_STATUSES = ("new", "open", "in_progress", "waiting")
TYPES = ["issue", "request", "idea", "task", "question", "log"]
PRIORITIES = ["low", "normal", "high", "urgent"]

# Tag colours: the same names Home Assistant uses for labels, so they follow the theme.
TAG_COLORS = [
    "primary", "accent", "red", "pink", "purple", "deep-purple", "indigo", "blue",
    "light-blue", "cyan", "teal", "green", "light-green", "lime", "yellow", "amber",
    "orange", "deep-orange", "brown", "light-grey", "grey", "blue-grey",
]
# The built-in default tag: its definition (name, colour) can't be changed or deleted.
HA_TAG_ID = "home-assistant"
HA_TAG = {"id": HA_TAG_ID, "name": "Home Assistant", "color": "primary", "builtin": True}
# Colours handed out automatically to new tags: no red (reads as an alarm) and no greys (low contrast).
TAG_AUTO_COLORS = [
    "indigo", "teal", "orange", "purple", "green", "pink", "cyan", "deep-purple",
    "amber", "light-green", "blue", "deep-orange", "lime", "brown", "blue-grey",
]
