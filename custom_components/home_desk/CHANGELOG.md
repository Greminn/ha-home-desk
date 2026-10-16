# Changelog

All notable changes to Home Desk. Newest first. Each release lists what changed for people using the panel and for AI agents using the services, and flags anything that needs action (**Action:**) or breaks existing use (**Breaking:**).

Agents: call `home_desk.get_changelog` (optionally with `since` set to the last version you reviewed) instead of reading this file.

## [Unreleased]

### Added
- `home_desk.get_changelog` service and `get_changelog` MCP tool: returns this changelog and the installed version, optionally only the releases newer than `since`.

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
