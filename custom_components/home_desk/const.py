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

# GitHub-style lifecycle: open states, then closed as "resolved" (fixed) or "closed" (won't do).
STATUSES = ["new", "open", "in_progress", "resolved", "closed"]
ACTIVE_STATUSES = ("new", "open", "in_progress")
PRIORITIES = ["low", "normal", "high", "urgent"]

# Label colours: the same names Home Assistant uses for its own labels, so they follow the theme.
LABEL_COLORS = [
    "primary", "accent", "red", "pink", "purple", "deep-purple", "indigo", "blue",
    "light-blue", "cyan", "teal", "green", "light-green", "lime", "yellow", "amber",
    "orange", "deep-orange", "brown", "light-grey", "grey", "dark-grey", "blue-grey", "black", "white",
]
# Built-in labels: always present, and their name and colour can't be changed or deleted.
# The panel's tabs and the services rely on these ids, so they must stay stable.
HA_LABEL_ID = "home-assistant"
BUG_LABEL_ID = "bug"
ENHANCEMENT_LABEL_ID = "enhancement"
HISTORY_LABEL_ID = "history"
BLOCKED_LABEL_ID = "blocked"
BUILTIN_LABELS = [
    {"id": HA_LABEL_ID, "name": "Home Assistant", "color": "primary", "icon": "mdi:home-assistant", "description": "Default for the Home Assistant system"},
    {"id": BUG_LABEL_ID, "name": "Bug", "color": "red", "icon": "mdi:bug-outline", "description": "Something isn't working"},
    {"id": ENHANCEMENT_LABEL_ID, "name": "Enhancement", "color": "teal", "icon": "mdi:lightbulb-on-outline", "description": "An idea or request for the future"},
    {"id": "task", "name": "Task", "color": "indigo", "icon": "mdi:checkbox-marked-circle-outline", "description": "Something that needs doing"},
    {"id": "question", "name": "Question", "color": "purple", "icon": "mdi:help-circle-outline", "description": "Needs an answer"},
    {"id": HISTORY_LABEL_ID, "name": "History", "color": "grey", "icon": "mdi:history", "description": "A record of past work, hidden from lists by default"},
    {"id": BLOCKED_LABEL_ID, "name": "Blocked", "color": "amber", "icon": "mdi:timer-sand", "description": "Waiting on a person, a part or a fix"},
]
# Colours handed out automatically to new labels: no red (reads as an alarm) and no greys (low contrast).
LABEL_AUTO_COLORS = [
    "indigo", "teal", "orange", "purple", "green", "pink", "cyan", "deep-purple",
    "amber", "light-green", "blue", "deep-orange", "lime", "brown", "blue-grey",
]
# Data and callers from before labels existed used a ticket "type" and "tags".
LEGACY_TYPE_LABELS = {
    "issue": BUG_LABEL_ID,
    "task": "task",
    "request": ENHANCEMENT_LABEL_ID,
    "idea": ENHANCEMENT_LABEL_ID,
    "question": "question",
    "log": HISTORY_LABEL_ID,
}

# Options (config entry): turn Repairs-to-tickets on or off, and skip noisy integrations.
CONF_REPAIRS = "repairs_to_tickets"
CONF_REPAIRS_IGNORE = "repairs_ignored_domains"
# How an issue's severity becomes a ticket priority.
REPAIR_PRIORITY = {"critical": "urgent", "error": "high", "warning": "normal"}
