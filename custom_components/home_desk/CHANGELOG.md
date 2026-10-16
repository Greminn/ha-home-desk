# Changelog

All notable changes to Home Desk. Newest first. Each release lists what changed for people using the panel and for AI agents using the services, and flags anything that needs action (**Action:**) or breaks existing use (**Breaking:**).

Agents: call `home_desk.get_changelog` (optionally with `since` set to the last version you reviewed) instead of reading this file.

## [Unreleased]

### Breaking
- **Tags are now labels, and `type` is gone.** Like GitHub, a ticket is categorised by labels. Renames: services `list_tags` → `list_labels`; `tags`/`add_tags`/`remove_tags` → `labels`/`add_labels`/`remove_labels`; the `tag` filter in `list_tickets` → `label`; the `tags` field on tickets and in `get_stats` → `labels`; websocket `tags`/`tag_*` → `labels`/`label_*`; MCP tool `list_tags` → `list_labels`. The old names are still accepted by the services (and by import files) and translated, but responses use the new names, so **Action:** read `labels` where you read `tags`, and stop reading `type`.
- **The `waiting` status is gone.** Use the **Blocked** label. Setting `status: waiting` still works and becomes `open` plus the Blocked label.
- **Statuses are now `new`, `open`, `in_progress`, `resolved`, `closed`.**
- `list_tickets` no longer has a `type` filter; filter by `label` (Bug, Enhancement, ...). Tickets labelled **History** are left out unless `include_history` is true (this replaces the old `log` type).

### Added
- **Home Assistant Repairs become tickets.** Each repair gets one ticket (requester `Home Assistant`, labels Bug / Home Assistant / Repair, priority from the repair's severity). The ticket resolves itself when HA clears the repair, reopens if it comes back, and gets the Blocked label while the repair is ignored in HA. Your own changes to a repair ticket's priority and labels are kept. Settings (Settings → Devices & services → Home Desk → Configure): turn it off, or list integrations to skip. Existing repairs are picked up when Home Assistant starts. **Action:** agents, see "Tickets raised by Home Assistant Repairs" in `get_guide`.
- `home_desk.get_changelog` service and `get_changelog` MCP tool: returns this changelog and the installed version, optionally only the releases newer than `since`.

### Changed
- **Built-in labels** that can't be renamed or deleted: Home Assistant, Bug, Enhancement, Task, Question, History, Blocked. Existing tickets are migrated automatically on first start: `issue` → Bug, `task` → Task, `request`/`idea` → Enhancement, `question` → Question, `log` → History, and `waiting` → open + Blocked (with a note on the ticket's timeline). Labels also have an optional description.
- Panel: removed the "Assignee" filter from the inbox (it was unused). The assignee field is still on each ticket, in the detail view and in the services, so agents and `list_tickets` work as before.
- Panel: the "raised by" line in a ticket now shows an icon for who raised it (person, AI agent, Home Assistant or import).
- Imported tickets now carry requester `import` instead of `simon` (importer default). Requester conventions: a person's name, an agent's own name (via `actor`), `Home Assistant` for system-raised tickets such as repairs, and `import`. Tickets already in HA keep their old requester.
- Panel: tickets now fill the page. A view (Inbox, In Progress, Enhancements, All) is a full-width sortable table (status, #, title, labels, priority, updated); click a ticket to open it as a full page with a back arrow, conversation on the left and properties (status, priority, assignee, labels, entities, related) on the right. On phones the table becomes cards and the properties sit under the title. Each ticket has its own address, `/home-desk/123`, so it can be linked or bookmarked.
- Panel: views are now **Inbox** (new and open tickets, not enhancements), **In Progress**, **Enhancements** and **All** (with a Show filter: Everything, Open, Closed, History). The Waiting and Needs Review tabs are gone: use the Blocked or Needs review label filter. Counts show on Inbox, In Progress and Enhancements.
- Panel: the new-ticket dialog asks for a Kind (Bug, Enhancement, Question, and Task for admins) instead of a Type. Household users can still pick Bug, Enhancement or Question for their own tickets.
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
