# Changelog

All notable changes to Home Desk. Newest first. Each release lists what changed for people using the panel and for AI agents using the services, and flags anything that needs action (**Action:**) or breaks existing use (**Breaking:**).

Agents: call `home_desk.get_changelog` (optionally with `since` set to the last version you reviewed) instead of reading this file.

## [Unreleased]

### Breaking
- **Statuses are now `new`, `in_progress`, `resolved` and `closed`: `open` is gone.** Existing `open` tickets become `in_progress` on first start. Setting `status: open` (or `waiting`) still works and means `in_progress`, but responses never contain `open`. **Action:** stop reading or writing `open`.
- **Status now moves by itself.** The first comment or change on a `new` ticket moves it to `in_progress` (changes by Home Assistant, import and Home Desk itself don't count). A `resolved` ticket becomes `closed` automatically after a delay the manager sets in Settings (default 7 days; "straight away" and "never" are options). **Action:** you rarely need to set `status`; use `close_ticket` to resolve.
- **The Home Assistant label is gone: it is a category now.** It is removed from tickets and from `list_labels`. Repair tickets get the category Home Assistant, plus the labels Bug and Repair. Tickets that were only labelled Home Assistant are now uncategorised.

### Added
- **Categories: what part of the smart home a ticket is about.** One optional category per ticket (Home Assistant, Network, Lighting...). Home Assistant is built in and locked; the rest are made by the manager (Manage Categories in the panel) and by agents. New services `list_categories`, `create_category`, `update_category` and `delete_category` (agents may delete only a category nothing uses), and a `category` field on `create_ticket`, `update_ticket` and `list_tickets` (`none` finds uncategorised tickets). A ticket's category must already exist: create it first. `get_stats` adds `no_category` and `categories`. MCP: `list_categories`, `create_category`, `update_category`, `delete_category`, and `category` on create, update and list. **Action:** agents, see "Categorise what you touch" in `get_guide`.
- **Assign a ticket to an AI agent.** In the panel the only assignee is the AI agent (named `ai:<name>`). Assigning fires a `home_desk_event` of kind `assigned` so an automation can start the agent, and when the agent comments on a ticket assigned to it, the ticket is handed back (the assignee is cleared). Events carry `with_agent` and `category`. `get_stats` adds `with_agent`.
- **Settings page** (the cog in the panel, admins only): the close-resolved-tickets delay, which AI agent to use, a switch for tickets from Repairs, and each manager's own notification options (stored now; sending notifications comes later).
- **Panel redesign:** a flat full-width ticket with the title, status, priority, category and labels pinned at the top; a long description collapses to one line as you scroll; comments with avatars and your Home Assistant profile picture; the comment box docked at the bottom with a priority control and "Assign to AI Agent" (switched on by default after the agent has replied); a history view with each change as a line; a new-ticket button at the left of the toolbar; priority as a warning icon in the list; HA-style Manage Categories page.

### Changed
- "Tickets from Repairs" moved from the integration's options to the Settings page (an older "off" is carried over once). The ignored-integrations list stays in the integration's options.

### Breaking (labels and views)
- **Tags are now labels, and `type` is gone.** Like GitHub, a ticket is categorised by labels. Renames: services `list_tags` → `list_labels`; `tags`/`add_tags`/`remove_tags` → `labels`/`add_labels`/`remove_labels`; the `tag` filter in `list_tickets` → `label`; the `tags` field on tickets and in `get_stats` → `labels`; websocket `tags`/`tag_*` → `labels`/`label_*`; MCP tool `list_tags` → `list_labels`. The old names are still accepted by the services (and by import files) and translated, but responses use the new names, so **Action:** read `labels` where you read `tags`, and stop reading `type`.
- **The `waiting` status is gone.** Use the **Blocked** label. Setting `status: waiting` still works and becomes `open` plus the Blocked label.
- **Statuses are now `new`, `open`, `in_progress`, `resolved`, `closed`.**
- `list_tickets` no longer has a `type` filter; filter by `label` (Bug, Enhancement, ...). Tickets labelled **History** are left out unless `include_history` is true (this replaces the old `log` type).

### Added (repairs, labels)
- **Home Assistant Repairs become tickets.** (Titles come from the integration's translations; when it has none, the title is the domain, the repair key and a shortened repair id, so similar repairs can be told apart, and an automatic title is refreshed when Home Assistant's text improves.) Each repair gets one ticket (requester `Home Assistant`, labels Bug / Home Assistant / Repair, priority from the repair's severity). The ticket resolves itself when HA clears the repair, reopens if it comes back, and gets the Blocked label while the repair is ignored in HA. Your own changes to a repair ticket's priority and labels are kept. Settings (Settings → Devices & services → Home Desk → Configure): turn it off, or list integrations to skip. Existing repairs are picked up when Home Assistant starts. **Action:** agents, see "Tickets raised by Home Assistant Repairs" in `get_guide`.
- `home_desk.get_changelog` service and `get_changelog` MCP tool: returns this changelog and the installed version, optionally only the releases newer than `since`.

### Changed (panel)
- **Built-in labels** that can't be renamed or deleted: Home Assistant, Bug, Enhancement, Task, Question, History, Blocked. Existing tickets are migrated automatically on first start: `issue` → Bug, `task` → Task, `request`/`idea` → Enhancement, `question` → Question, `log` → History, and `waiting` → open + Blocked (with a note on the ticket's timeline). Labels also have an optional description.
- Panel: removed the "Assignee" filter from the inbox (it was unused). The assignee field is still on each ticket, in the detail view and in the services, so agents and `list_tickets` work as before.
- Panel: the "raised by" line in a ticket now shows an icon for who raised it (person, AI agent, Home Assistant or import).
- Imported tickets now carry requester `import` instead of `simon` (importer default). Requester conventions: a person's name, an agent's own name (via `actor`), `Home Assistant` for system-raised tickets such as repairs, and `import`. Tickets already in HA keep their old requester.
- Panel: the ticket list is on the left and the open ticket on the right (on phones, one at a time with a back arrow). Each ticket has its own address, `/home-desk/123`, so it can be linked or bookmarked.
- Panel: views are now **Inbox** (new and open tickets, not enhancements), **In Progress**, **Enhancements** and **All** (with a Show filter: Everything, Open, Closed, History). The Waiting and Needs Review tabs are gone: use the Blocked or Needs review label filter. Counts show on Inbox, In Progress and Enhancements.
- Panel: the new-ticket dialog asks for a Kind (Bug, Enhancement, Question, and Task for admins) instead of a Type. Household users can still pick Bug, Enhancement or Question for their own tickets.
- **Labels have an icon**, shown in the pill, and the full Home Assistant colour list is available (adds Dark grey, Black and White). The built-in labels get icons (Bug, Enhancement, Task, Question, History, Blocked). `label_create` and `label_update` (websocket) take an `icon` such as `mdi:bug-outline`.
- Panel: **Manage labels** is now a page laid out like Home Assistant's own Labels page: a searchable list with icon, colour, name, description and ticket count. Click a row to edit it (the dialog shows the label's name as its title; Update is enabled once something changes), use the bin icon to delete (a "Remove label?" confirmation, as in HA), and "Create label" opens a "New label" dialog (Name, Icon, Colour from a searchable list, Description). Built-in labels show a lock.
- Panel: labels are drawn exactly as HA's own `ha-label`: a solid pill in the label's colour with a 1px outline and 12px medium text, 20px tall with 8px corners in lists and 32px with 16px corners where you edit them, black or white text chosen by contrast against the theme colour (as HA does). Colours use HA's theme variables (`--purple-color` and so on) with HA's default values as fallback. Text, corner radius and shadow sizes now use HA's `--ha-font-size-*`, `--ha-border-radius-*` and `--ha-box-shadow-*` variables, in px. Body text is 14px (list titles were 15px), and icons in list rows and dropdown carets are 24px.
- Panel: the search and filter bar and the labels page use the values from Home Assistant's own frontend code (version 20260930.3): a 56px toolbar on the page background with 16px gaps; the search field is 32px tall with 10px corners on wide screens (40px and 8px on narrow ones) with a 1px outline that darkens on hover and turns primary on focus; the filter and dropdown buttons are 32px pills; the "New ticket" and "Create label" buttons are `ha-button` size l (48px, 16px text, pill); a label's colour badge is 20px with 8px corners and a 1px outline; a label without an icon shows the label-outline icon; fields in the label dialog are the Material 56px fields.
- Panel: the ticket list no longer shows each ticket's number (it is still in the ticket page, its address `/home-desk/123` and a tooltip on the row). Search now finds a ticket by its number, with or without the `#`.
- Panel: agent and system names are shown with a capital ("Claude", "Import") wherever the panel shows a name (list, ticket byline, timeline, assignee). Stored names are unchanged, and a name that already has capitals ("Simon", "Home Assistant") is left as it is.
- Panel: dialogs follow HA's dialog guidelines: the "Remove label?" confirmation is a fixed 320px wide, and the label dialog won't close on Esc or a click outside while it has unsaved changes (it shakes instead).
- Panel: sizes and shapes tuned against Home Assistant's own data-table screens: 32px controls with 12px corners, a 56px toolbar, a 48px pill button, Material's 38% outline on the search field, and Status and Priority in the ticket are the same dropdown buttons.
- Panel: the search and filter bar now follows Home Assistant's data-table toolbar: it sits on the page background with compact, outlined controls (search field, filter button), and the Priority, Label and Show filters are outlined dropdown buttons that open a menu, instead of native selects.
- Panel: header redesigned to match Home Assistant's own pages. The "Home Desk" title sits top left (hidden on phones). Centred view tabs with icons and an underline on the active one (inactive tabs show only the icon below 1000px), a "more options" menu (Refresh, Manage tags), a search field with a filter button above the list, and an extended pill-shaped "New ticket" button at the bottom-right of the page, like HA's "Add" buttons.
- Panel: live updates are more robust. A failed event subscription is reported in the browser console instead of silently ignored, the panel also refreshes every 20 seconds while visible, and refreshes when you return to the tab. A ticket you have open updates when an agent changes it.

## [0.1.0] - 2026-10-16

First working slice, in daily use on one install.

### Added
- Inbox panel in the HA sidebar: filter, search, inline status/priority/type/assignee/tag changes, comments, internal notes, resolve and reopen. Every change is on the ticket timeline with who did it.
- Managed, coloured tags, with a locked built-in `Home Assistant` default tag.
- Services for AI agents: `get_guide`, `list_tickets`, `get_ticket`, `create_ticket`, `update_ticket`, `add_comment`, `close_ticket`, `link_tickets`, `list_tags`, `get_stats`, and admin-only `import_file`. MCP bridge in `mcp/server.py`.
- `home_desk_event` bus event on every ticket change.
- Importer for the markdown `OPERATIONS.md` tracker. Unchecked items are tagged `needs-review` because resolutions were hidden inside log entries.

### Changed
- Renamed from "Support Tickets" to Home Desk (domain `home_desk`). Existing `support_tickets.tickets` storage is adopted once on first start.
