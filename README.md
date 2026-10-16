# Home Desk

A helpdesk for the home, living inside Home Assistant. The manager, household members, AI agents and Home Assistant itself raise tickets; the manager and AI agents work them through to resolution, with the full history kept. Home Assistant is the heart of a smart home, so it's where tickets live, but they can be about anything around it too (the network, the servers, the media box). Tags keep those apart. See [IDEA.md](IDEA.md) for the bigger vision.

**Status: v0.1 ([changelog](custom_components/home_desk/CHANGELOG.md)), a first working slice, in daily use on one install.** Built: views and a ticket page in the Home Assistant style, GitHub-style labels, AI access, Home Assistant Repairs as tickets, import of an existing markdown tracker. Not built yet: daily triage, easy submission for household users (voice, QR, buttons), reporting, notifications beyond the bus event. See [IDEA.md](IDEA.md).

*Formerly "Support Tickets" (domain `support_tickets`); see [Upgrading from Support Tickets](#upgrading-from-support-tickets).*

## What's in it

| Part | Where | What it does |
|---|---|---|
| Integration | `custom_components/home_desk/` | Stores tickets and labels in `.storage/home_desk.tickets`, WebSocket API for the panel, `home_desk.*` services, a `home_desk_event` on the event bus for every change |
| Panel | `frontend/` → `www/home-desk-panel.js` | Sidebar app (Lit, HA theme variables): ticket list and ticket side by side, with timeline, comments, internal notes, resolve/reopen, coloured labels and a label manager |
| AI bridge | `mcp/server.py` | Optional MCP server: list, get, create, update, comment, close, link, labels, stats |

Admins see and change everything. Other HA users can raise tickets and comment on their own, and don't see internal notes or other people's tickets.

## Using the panel

- **Views** (tabs): **Inbox** (new and open tickets, not enhancements), **In Progress**, **Enhancements** (ideas for the future) and **All** (with a Show filter: Everything, Open, Closed, History). Inbox, In Progress and Enhancements show counts. The ticket list is on the left and the open ticket on the right (one at a time on a phone). Every ticket has its own address, `/home-desk/123`. The last view you used is remembered per browser.
- **Find things:** search covers titles, descriptions, comments, resolutions and label names. Filter by priority and label.
- **Work a ticket:** change status, priority, assignee and labels inline; comment; add an internal note (admins only, hidden from requesters); **Resolve** with notes, or **Reopen**. Everything is recorded on the ticket's timeline, including who did it (a person, an AI agent, or Home Assistant).
- **Live:** the panel refreshes when anything changes, including changes made by an AI agent or an automation.

## Labels

Labels work as they do on GitHub: they say what a ticket is, and which system or topic it concerns. Each label has a name, a colour (the same colour names HA uses for its own labels, so they follow your theme), an optional icon and an optional description.

- **Built-in labels** (locked: they can't be renamed, recoloured or deleted): **Bug** (something isn't working), **Enhancement** (an idea or request for the future), **Task**, **Question**, **History** (a record of past work, hidden from lists unless you ask), **Blocked** (waiting on a person, a part or a fix) and **Home Assistant** (the default when no label is given). The Inbox and Enhancements views rely on these.
- Every other label is yours: **Manage labels** (in the panel's ⋮ menu, admins only) opens a page like Home Assistant's own Labels page, where you create, edit (name, icon, colour, description) and delete them. Renaming keeps tickets labelled; deleting removes the label from every ticket after a confirmation that says how many.
- Typing a label name that doesn't exist (in the panel, or an AI agent using it) creates it, with a colour picked automatically. Names match case-insensitively.
- A suggested scheme, used on the imported tracker: a **system** (Home Assistant, Network, Infrastructure, Media), **topics** (Zigbee, Lighting, Automations, Dashboards, Cameras, Presence, Energy, Voice, Security...) and **workflow** labels (Needs review, Monitoring, Recurring, Side project). Nothing enforces it.
- Household users can pick Bug, Enhancement or Question when raising their own ticket; only admins set other labels and the priority.

## Home Assistant Repairs

Home Desk can open a ticket for every Home Assistant **repair** (Settings → System → Repairs), so they get the history and notes that Repairs lacks. It is on by default; change it under Settings → Devices & services → Home Desk → Configure (turn it off, or list integrations to skip, such as noisy ones).

- One ticket per repair: requester `Home Assistant`, labels Bug, Home Assistant and Repair, priority from the repair's severity (critical → urgent, error → high, warning → normal). The description has the repair's text, the integration, and its "learn more" link.
- The ticket follows the repair: it **resolves itself** (with the note "Cleared by Home Assistant") when HA clears the repair, **reopens** if the repair comes back, and gets the **Blocked** label while the repair is ignored in HA. Your own changes to its priority and labels are kept.
- Repairs already present are picked up when Home Assistant starts, including ones that cleared while it was off.

## Install

1. Copy `custom_components/home_desk/` into HA's `/config/custom_components/`.
2. Restart HA, then **Settings → Devices & Services → Add Integration → Home Desk**. **Home Desk** appears in the sidebar.

Changing the integration's Python code (not just the panel bundle) needs another HA restart; reloading the integration isn't enough. Service descriptions are cached until a restart too.

### Upgrading from Support Tickets

The first build was called Support Tickets (domain `support_tickets`). Home Desk adopts its tickets automatically the first time it loads, leaving the old `.storage/support_tickets.tickets` file in place as a backup. To move over: replace `custom_components/support_tickets/` with `custom_components/home_desk/`, restart, add **Home Desk** under Devices & Services, and remove the dead Support Tickets entry. Service names change from `support_tickets.*` to `home_desk.*` (and the event to `home_desk_event`), so update any automations that used them.

## Import the existing tracker

```sh
ssh <ha> 'cat > /config/home_desk_import.json' < import/operations.json   # plain scp may be refused by the HA SSH add-on
```

Then call the service (Developer tools → Actions), `home_desk.import_file` with `path: /config/home_desk_import.json`. Any file inside the HA config directory works. It's idempotent: re-running skips tickets already imported (each ticket's `source_key` is its dated heading plus its position among that date's entries, so inserting a new entry above older ones on the same date could confuse a later re-import).

What comes in:
- **94 numbered to-do items** become tickets (`OPS-n`). Checked items are resolved/closed; unchecked are open and tagged `needs-review`, because OPERATIONS.md often records the resolution *inside* an entry, so an unchecked box isn't proof it's still open.
- **Dated Issue Log entries** become closed `History` tickets, linked to the to-do items they mention.
- Entries under *Low Priority / Monitoring* come in as open monitoring tickets.
- Original markdown is kept verbatim as the description.
- Imported tickets arrive with the Home Assistant label, a Bug, Task or History label (from the old item type) plus a few keyword topic labels; tidy them with Manage labels. The importer no longer adds bookkeeping labels (source, group). Some imported titles are rough where the original heading was terse.

## AI access

The app explains itself to AI agents, so nothing needs adding to a project's own instructions. Any agent connected to your HA (through an HA MCP server, or the REST API) can find the `home_desk.*` services, whose descriptions say what they are for. **`home_desk.get_guide`** returns the full guide ([AGENT_GUIDE.md](custom_components/home_desk/AGENT_GUIDE.md)): fields and statuses, how to review, comment on, update and close tickets, and conventions such as passing `actor` with the agent's own name so its work is attributed to it on the timeline.

Services: `get_guide`, `get_changelog`, `list_tickets`, `get_ticket`, `create_ticket`, `update_ticket`, `add_comment`, `close_ticket`, `link_tickets`, `list_labels`, `get_stats` (and the admin-only `import_file`). Labels can be passed by name or id; managing label definitions (rename, recolour, delete) is for people, in the panel. They return data, so call them with response enabled (for example `ha_call_service` with `return_response: true` in ha-mcp, or `action:` with `response_variable` in an automation). They work from automations too.

**Optional dedicated MCP server** (`mcp/server.py`): typed tools wrapping the same services, for setups without a general HA MCP server. Add to `.mcp.json` (keep the token out of git):

```json
{
  "mcpServers": {
    "home-desk": {
      "command": "uv",
      "args": ["run", "--script", "/path/to/ha-home-desk/mcp/server.py"],
      "env": { "HA_URL": "http://homeassistant.local:8123", "HA_TOKEN": "<long-lived token>", "HOMEDESK_ACTOR": "claude" }
    }
  }
}
```

## Notifications

Every change fires `home_desk_event` with `ticket_id`, `kind` (`created`, `updated`, `comment`, `note`, `closed`), `actor`, `title`, `status`, `priority`, `requester`, `assignee`. Trigger an automation on it to notify the manager or the requester.

## Development

```sh
cd frontend && npm install
npm run build        # writes custom_components/home_desk/www/home-desk-panel.js (committed, like Spatial Context)
npm run typecheck
cp .env.example .env # then `npm run push` rsyncs the panel bundle to HA; a hard browser refresh picks it up, no HA restart
```

**Preview without Home Assistant:** `npm run dev` (in `frontend/`) serves the real panel against a mock Home Assistant at <http://localhost:5173> and rebuilds on every save. The control bar switches dark/light, phone/tablet/desktop width and admin/household user, fires a fake "agent update" to test live updates, and resets the mock data (`frontend/dev/mock-hass.js`). It uses Home Assistant's real theme tokens and the real Material Design Icons. `npm run dev:theme` regenerates `dev/theme.css` from a checkout of `home-assistant/frontend` (default `~/Projects/ha-frontend-reference`; the tokens are Apache-2.0). The preview is development-only and not part of the installed integration.

Service names and descriptions (what AI agents read) are generated into `services.yaml`, `strings.json` and `translations/en.json` from one table: edit `tools/gen_services.py`, then run it. HA reads custom-integration service descriptions from `services.yaml`.

Tests (no HA install needed): `python3 -I tests/test_storage.py` and `uv run --with "mcp<2" python tests/test_mcp.py`.

## Known limits

- Tested without a Home Assistant install (storage logic, the MCP bridge, and the panel in a mock page) and by use on a live install; there is no automated test of the HA wiring itself.
- Admin-only features rely on HA's own admin flag. Non-admins only see tickets they raised.
- Label colours are limited to the 22 theme-aware names, not arbitrary hex values.
