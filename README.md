# Home Desk

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="home_desk_brand/extras/home-desk-icon-white-512.png">
  <img alt="Home Desk" src="home_desk_brand/extras/home-desk-icon-black-512.png" width="96">
</picture>

A helpdesk for the home, living inside Home Assistant. The manager, household members, AI agents and Home Assistant itself raise tickets; the manager and AI agents work them through to resolution, with the full history kept. Home Assistant is the heart of a smart home, so it's where tickets live, but they can be about anything around it too (the network, the servers, the media box). Categories keep those apart. See [IDEA.md](IDEA.md) for the bigger vision.

**Status: v0.1 plus the unreleased changes in the [changelog](custom_components/home_desk/CHANGELOG.md), in daily use on one install.** Built: a Home page (what needs you, what the AI Agent is doing, recent activity), a ticket list and a flat, full-width ticket page in the Home Assistant style, a four-status lifecycle that moves by itself, categories (what part of the home a ticket is about) and GitHub-style labels, assigning tickets to an AI agent, a Settings page, AI access, Home Assistant Repairs as tickets, import of an existing markdown tracker. Also built: a simple report form for household users, with photos and a voice message that Home Assistant's speech-to-text writes out. Not built yet: push notifications (the options are stored, nothing is sent yet), reporting. Also built: two separate AI actions. **Queue for AI Agent** only marks a ticket for an AI agent you run yourself (your own Claude CLI, Gemini Antigravity or any other), sending nothing anywhere. **Review with AI** (after a confirmation, as it uses your AI plan) asks the AI you chose in Settings to review the ticket: Home Desk gives it the ticket, its comments and what Settings allows (entity states, automation and script configuration, related tickets, secrets removed) and posts its reply, signed AI Review, with a working indicator, a Stop button and one-click proposed changes. It only advises; it can't change anything, and it never touches the assignment. The instructions it is given are editable in Settings. See [IDEA.md](IDEA.md).

*Formerly "Support Tickets" (domain `support_tickets`); see [Upgrading from Support Tickets](#upgrading-from-support-tickets).*

## What's in it

| Part | Where | What it does |
|---|---|---|
| Integration | `custom_components/home_desk/` | Stores tickets, labels, categories and settings in `.storage/home_desk.tickets`, WebSocket API for the panel, `home_desk.*` services, a `home_desk_event` on the event bus for every change, and an hourly job that closes resolved tickets |
| Panel | `frontend/` → `www/home-desk-panel.js` | Sidebar app (Lit, HA theme variables): ticket list and ticket side by side, with comments, resolve/reopen, coloured labels, categories, a Settings page and the label and category managers |
| Brand | `custom_components/home_desk/brand/`, `home_desk_brand/` | The logo and icon (light and dark) Home Assistant shows for the integration; the SVG masters and extras |
| AI bridge | `mcp/server.py` | Optional MCP server: list, get, create, update, comment, close, link, labels, categories, stats |

Admins see and change everything. Other HA users can raise tickets and comment on their own, and don't see internal notes or other people's tickets.

## Using the panel

- **Views** (tabs): every open ticket is in exactly one, the first that fits. **Completed** is resolved and closed tickets (its Show filter also reaches Open, History and Everything). **Queued for AI** is what is with an AI agent. **Enhancements** are ideas for the future. **Inbox** is new tickets, including tickets reopened by Home Assistant or an AI agent. **Working** is the rest: what you and the other admins are working on, and tickets an AI agent has answered. The first four show counts, which add up to the open tickets. The ticket list is on the left and the open ticket on the right (one at a time on a phone). Every ticket has its own address, `/home-desk/123`. The last view you used is remembered per browser. The **+** at the left of the toolbar raises a ticket.
- **Find things:** search covers titles, descriptions, comments, resolutions, labels and categories. Filter by category, who raised it, AI Agent (with or not), priority and label. Click a person's name in the list to see just their tickets.
- **Work a ticket:** the title, status, priority, category and labels are pinned at the top and the title edits in place. The description sits under it and collapses to one line as you scroll. Comments are below, and the comment box is docked at the bottom as a slim strip (it opens when you point at it or press **R**, and Escape closes it (so does **R** when the cursor is not in the box)) with the priority icons (High, Urgent), **Queue for AI Agent**, an **AI Action** control (**Review with AI**), **Resolve** and **Comment**. The clock icon shows the ticket's history (each change as a line, with the exact time).
- **Live:** the panel refreshes when anything changes, including changes made by an AI agent or an automation, and scrolls to a new comment.
- **Accessibility:** icon-only controls have names, the dialogs are modal, new comments are announced, label badges open on keyboard focus as well as on hover, and animation stops if your system asks for reduced motion.

## Status

A ticket's status mostly moves by itself:

- **New**: nobody has touched it.
- **In Progress**: set automatically the first time a person or an AI agent does anything to it (a comment, a priority, label or category change, an assignment). Changes by Home Assistant, an import or Home Desk itself don't count.
- **Resolved**: someone presses **Resolve**. Anything typed in the comment box is saved as the resolution (the cause and the fix).
- **Closed**: set automatically after a delay chosen in Settings (7 days by default; also straight away, 1 hour to 30 days, or never). **Reopen** on a resolved or closed ticket puts it back to In Progress. A ticket reopened by Home Assistant (a repair that comes back) or by an AI agent goes back to **New** instead, so it shows in the Inbox.

There is no status dropdown. (The old *Open* status was merged into In Progress, and *Waiting* is the **Blocked** label.)

## Settings

The cog in the panel header (admins only) opens Settings. Changes save as you make them.

- **Close resolved tickets**: how long a resolved ticket waits before it closes.
- **Tickets from Repairs**: on or off (see below).
- **AI Agent**: which of Home Assistant's AI agents (AI Task or conversation entities) tickets are assigned to.
- **Notifications**: each manager's own choices of where notifications go and what they hear about (a new ticket, someone else commenting, a ticket resolved). These are stored; sending them is not built yet. The `home_desk_event` bus event (below) is what you can use today.

## Labels

Labels work as they do on GitHub: they say what a ticket is, and which system or topic it concerns. Each label has a name, a colour (the same colour names HA uses for its own labels, so they follow your theme), an optional icon and an optional description.

- **Built-in labels** (locked: they can't be renamed, recoloured or deleted): **Bug** (something isn't working), **Enhancement** (an idea or request for the future), **Task**, **Question**, **History** (a record of past work, hidden from lists unless you ask) and **Blocked** (waiting on a person, a part or a fix). The Inbox and Enhancements views rely on these. (There used to be a Home Assistant label; it is a category now.)
- Every other label is yours: **Manage labels** (in the panel's ⋮ menu, admins only) opens a page like Home Assistant's own Labels page, where you create, edit (name, icon, colour, description) and delete them. Renaming keeps tickets labelled; deleting removes the label from every ticket after a confirmation that says how many.
- Typing a label name that doesn't exist (in the panel, or an AI agent using it) creates it, with a colour picked automatically. Names match case-insensitively.
- A suggested scheme, used on the imported tracker: a **system** (Home Assistant, Network, Infrastructure, Media), **topics** (Zigbee, Lighting, Automations, Dashboards, Cameras, Presence, Energy, Voice, Security...) and **workflow** labels (Needs review, Monitoring, Recurring, Side project). Nothing enforces it.
- Household users can pick Problem (the Bug label) or Suggestion (Enhancement) when raising their own ticket; only admins set other labels and the priority.

### Household reports, photos and voice messages

Household users see only a report form. Besides the type, a line and some detail, they can add up to **6 photos** (shrunk to 1600 px in the browser) and a **voice message** of up to 3 minutes, recorded in the panel (the microphone needs https or localhost) or picked from the device. Everything goes in one upload to `POST /api/home_desk/report`.

- **Voice to text:** the recording is converted in the browser to 16 kHz mono WAV and, after the report is sent, passed to Home Assistant's speech-to-text (the engine in Settings, or the one your Assist pipeline uses). The words are added to the ticket's description as a quoted block and stored on the recording. A failure never loses the ticket or the recording. Switch it off in Settings.
- **Where files live:** `<config>/home_desk_attachments/<ticket>/`. They are judged by their first bytes (JPEG, PNG, WebP, WAV, Ogg, WebM, MP4/M4A, MP3 only), served with `nosniff` and a sandboxing content policy, and only to administrators and the person who sent them. The panel loads them through signed links.
- **Limits:** photos 10 MB each, a voice message 12 MB, ten reports an hour per person. Refused reports leave nothing behind.

## Categories

A category says what part of the smart home a ticket is about: Home Assistant, Network, Lighting, Cameras... A ticket has one category or none (it then shows an **Add Category** pill). **Home Assistant** is built in and locked; every other category is yours. **Manage Categories** (in the ⋮ menu, admins only) works like Manage Labels: a searchable list, create, rename, change the icon, delete (tickets in it become uncategorised). AI agents can list, create, rename and assign categories, and can delete only a category nothing uses. In the list the category is the outlined pill under each ticket; click it to change it.

## Assigning to an AI Agent

People don't assign tickets to each other (one or two managers who talk in person don't need to). The one assignee is the **AI Agent**. **Queue for AI Agent**, beside the priority icons in the comment box, hands the ticket over: the comment you type is the instruction, and `home_desk_event` fires with kind `assigned` so an automation can start the agent. When the agent replies on the ticket it is handed back automatically, and you can queue it again when you reply. A ticket with the agent shows "Queued for AI Agent" in the list and on the ticket. The agent's comments are marked **AI Agent (Claude)** with the spark icon. Making the agent actually work the ticket from an automation is not built yet.

## Home Assistant Repairs

Home Desk can open a ticket for every Home Assistant **repair** (Settings → System → Repairs), so they get the history and notes that Repairs lacks. It is on by default; turn it off in the panel's **Settings**. To skip noisy integrations, list them under Settings → Devices & services → Home Desk → Configure.

- One ticket per repair (or per kind of repair, below): requester `Home Assistant`, category Home Assistant, labels Bug and Repair, priority from the repair's severity (critical → urgent, error → high, warning → normal). The description has the repair's text, the integration, and its "learn more" link.
- The ticket follows the repair: it **resolves itself** (with the note "Cleared by Home Assistant") when HA clears the repair, **reopens** (to New, so it is in the Inbox) if the repair comes back, and is **resolved** ("Ignored in Home Assistant") while you ignore the repair in HA; it reopens if you stop ignoring it. "Restart required" notices are skipped. Your own changes to its priority and labels are kept.
- Repairs of the same kind (one integration, one issue type) share one ticket that lists what is affected, so a problem on three Proxmox nodes is one ticket. It resolves when all of them clear. Repairs without an issue type keep their own ticket.
- Duplicates you already have (or any two tickets) can be folded together with **Merge** (the button beside History): comments, labels, files and linked repairs move to the ticket you keep, the other closes as "Merged into #N". Agents can do the same with `merge_tickets`.
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
- Imported tickets arrive uncategorised, with a Bug, Task or History label (from the old item type) plus a few keyword topic labels; tidy them with Manage labels. The importer no longer adds bookkeeping labels (source, group). Some imported titles are rough where the original heading was terse.

## AI access

The app explains itself to AI agents, so nothing needs adding to a project's own instructions. Any agent connected to your HA (through an HA MCP server, or the REST API) can find the `home_desk.*` services, whose descriptions say what they are for. **`home_desk.get_guide`** returns the full guide ([AGENT_GUIDE.md](custom_components/home_desk/AGENT_GUIDE.md)): fields and statuses, how to review, comment on, update and close tickets, and conventions such as passing `actor` with the agent's own name so its work is attributed to it on the timeline.

Services: `get_guide`, `get_changelog`, `list_tickets`, `get_ticket`, `create_ticket`, `update_ticket`, `add_comment`, `close_ticket`, `link_tickets`, `list_labels`, `create_label`, `update_label`, `delete_label`, `list_categories`, `create_category`, `update_category`, `delete_category`, `get_stats` (and the admin-only `import_file`). Labels and categories can be passed by name or id; a category must exist before a ticket uses it. Agents can create, change and delete unused labels like categories (a label in use is only deleted by a person, in the panel). They return data, so call them with response enabled (for example `ha_call_service` with `return_response: true` in ha-mcp, or `action:` with `response_variable` in an automation). They work from automations too.

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

Every change fires `home_desk_event` with `ticket_id`, `kind` (`created`, `updated`, `comment`, `note`, `closed`, and `assigned` when a ticket is handed to an AI agent), `actor`, `title`, `status`, `priority`, `requester`, `assignee`, `with_agent` and `category`. Trigger an automation on it to notify the manager. Built-in push notifications (to a phone through the Companion app, or the Home Assistant bell), using each manager's Settings, are planned.

## Development

A handoff for picking the work up again (how to run, test and deploy, where things stand, what is next) is in [docs/development.md](docs/development.md).

```sh
cd frontend && npm install
npm run build        # writes custom_components/home_desk/www/home-desk-panel.js (committed, like Spatial Context)
npm run typecheck
cp .env.example .env # then `npm run push` rsyncs the panel bundle to HA; a hard browser refresh picks it up, no HA restart
```

**Preview without Home Assistant:** `npm run dev` (in `frontend/`) serves the real panel against a mock Home Assistant at <http://localhost:5173> and rebuilds on every save. The control bar switches dark/light, phone/tablet/desktop width and admin/household user, fires a fake "agent update" to test live updates, and resets the mock data (`frontend/dev/mock-hass.js`). It uses Home Assistant's real theme tokens and the real Material Design Icons. `npm run dev:theme` regenerates `dev/theme.css` from a checkout of `home-assistant/frontend` (default `~/Projects/ha-frontend-reference`; the tokens are Apache-2.0). The preview is development-only and not part of the installed integration.

**Brand:** the logo and icon Home Assistant shows for the integration are in `custom_components/home_desk/brand/` (light and dark, with `@2x`). `home_desk_brand/` has the SVG masters, favicon, avatars and social-preview images. The mark is a house with a tick and a small AI spark cut out of it.

Service names and descriptions (what AI agents read) are generated into `services.yaml`, `strings.json` and `translations/en.json` from one table: edit `tools/gen_services.py`, then run it. HA reads custom-integration service descriptions from `services.yaml`.

Tests (no HA install needed, no private data): `python3 -I tests/test_storage.py` (tickets, labels, categories, the status rules, the AI agent, settings, auto-close, repairs), `uv run --with voluptuous python tests/test_api.py` (who may do what over the websocket and the services) `uv run --with aiohttp python tests/test_attachments.py` (reports with photos and a voice message), `uv run --with pyyaml python tests/test_agent.py` (the built-in AI agent) and `uv run --with "mcp<2" python tests/test_mcp.py`. They run in GitHub on every push (`.github/workflows/validate.yml`, with Home Assistant's `hassfest` and HACS validation).

## Known limits

- Tested without a Home Assistant install (storage logic, the websocket and service layers against stand-ins for Home Assistant, the MCP bridge, and the panel in a mock page) and by use on a live install; there is no automated test of the panel itself or of the real HA wiring.
- Services (other than the guide and changelog) and the Settings need an administrator; admin-only features rely on HA's own admin flag. Non-admins only see the simple report form (a problem or a suggestion, with photos and a voice message); they can't open tickets.
- Label colours are limited to the theme-aware names, not arbitrary hex values.
- The Settings notification options are stored but nothing is sent yet.
- Review with AI only advises and proposes: nothing in Home Desk starts an AI agent on its own yet (assigning only marks a ticket; auto-starting your own agent is being designed, see `docs/development.md`).
