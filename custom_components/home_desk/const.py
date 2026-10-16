"""Constants for the Home Desk integration."""

from __future__ import annotations

DOMAIN = "home_desk"

URL_BASE = "/home_desk"
PANEL_FILENAME = "home-desk-panel.js"

SIDEBAR_TITLE = "Home Desk"
# A standard Material Design icon, so the sidebar entry matches HA's own. The brand pack (home_desk_brand/)
# recommends mdi:home-alert: there is no house-with-a-tick in the MDI set. The integration's own logo and icon are in brand/.
SIDEBAR_ICON = "mdi:home-alert"
FRONTEND_URL_PATH = "home-desk"

# Fired on the HA event bus whenever a ticket changes, so automations can
# notify the requester / manager. Data: ticket_id, kind, actor, title, status.
EVENT_TICKET = f"{DOMAIN}_event"

# Lifecycle: New (untouched) -> In Progress (set automatically on the first action) -> Resolved (someone
# resolves it) -> Closed (automatically, after a delay set in Settings). Closed can also be set directly.
STATUSES = ["new", "in_progress", "resolved", "closed"]
ACTIVE_STATUSES = ("new", "in_progress")
# Old names still accepted from callers, and what they become. "open" was merged into in_progress.
STATUS_ALIASES = {"open": "in_progress"}
# Who may move a ticket out of New by acting on it: not Home Desk's own automatic changes, and not system sources.
SYSTEM_ACTORS = ("Home Assistant", "Home Desk", "import")
PRIORITIES = ["low", "normal", "high", "urgent"]

# Label colours: the same names Home Assistant uses for its own labels, so they follow the theme.
LABEL_COLORS = [
    "primary", "accent", "red", "pink", "purple", "deep-purple", "indigo", "blue",
    "light-blue", "cyan", "teal", "green", "light-green", "lime", "yellow", "amber",
    "orange", "deep-orange", "brown", "light-grey", "grey", "dark-grey", "blue-grey", "black", "white",
]
# Built-in labels: always present, and their name and colour can't be changed or deleted.
# The panel's tabs and the services rely on these ids, so they must stay stable.
# The Home Assistant label was retired: it is now a category (below). The id is kept to clean old data.
HA_LABEL_ID = "home-assistant"
BUG_LABEL_ID = "bug"
ENHANCEMENT_LABEL_ID = "enhancement"
HISTORY_LABEL_ID = "history"
BLOCKED_LABEL_ID = "blocked"
BUILTIN_LABELS = [
    {"id": BUG_LABEL_ID, "name": "Bug", "color": "red", "icon": "mdi:bug-outline", "description": "Something isn't working"},
    {"id": ENHANCEMENT_LABEL_ID, "name": "Enhancement", "color": "teal", "icon": "mdi:lightbulb-on-outline", "description": "An idea or request for the future"},
    {"id": "task", "name": "Task", "color": "indigo", "icon": "mdi:checkbox-marked-circle-outline", "description": "Something that needs doing"},
    {"id": "question", "name": "Question", "color": "purple", "icon": "mdi:help-circle-outline", "description": "Needs an answer"},
    {"id": HISTORY_LABEL_ID, "name": "History", "color": "grey", "icon": "mdi:history", "description": "A record of past work, hidden from lists by default"},
    {"id": BLOCKED_LABEL_ID, "name": "Blocked", "color": "amber", "icon": "mdi:timer-sand", "description": "Waiting on a person, a part or a fix"},
]
# Categories say what part of the home a ticket is about. Home Assistant is built in and locked; the rest
# are managed by the user (and by agents, which may create and assign them).
HA_CATEGORY_ID = "home-assistant"
BUILTIN_CATEGORIES = [
    {"id": HA_CATEGORY_ID, "name": "Home Assistant", "icon": "mdi:home-assistant"},
]

# Size limits on what people and agents can send, so one bad call can't bloat the stored tickets.
MAX_TITLE = 300
MAX_TEXT = 100_000
MAX_NAME = 80

# How long a resolved ticket stays resolved before it closes by itself ("never" and "immediately" are special).
AUTO_CLOSE_SECONDS = {
    "immediately": 0, "1h": 3600, "6h": 6 * 3600, "1d": 86400, "3d": 3 * 86400,
    "7d": 7 * 86400, "14d": 14 * 86400, "30d": 30 * 86400, "never": None,
}
# Shared options, and each manager's own notification options.
DEFAULT_SETTINGS = {"auto_close": "7d", "agent": "", "repairs": True}
DEFAULT_NOTIFY = {"targets": [], "new_ticket": True, "comment": True, "resolved": False}

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

# Options (config entry): skip noisy integrations. Turning Repairs-to-tickets on or off lives in Settings now;
# CONF_REPAIRS is only read once, to carry an older choice over.
CONF_REPAIRS = "repairs_to_tickets"
CONF_REPAIRS_IGNORE = "repairs_ignored_domains"
# How an issue's severity becomes a ticket priority.
REPAIR_PRIORITY = {"critical": "urgent", "error": "high", "warning": "normal"}
