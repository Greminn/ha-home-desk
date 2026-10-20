# Home Desk

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="home_desk_brand/extras/home-desk-icon-white-512.png">
  <img alt="Home Desk" src="home_desk_brand/extras/home-desk-icon-black-512.png" width="96">
</picture>

A helpdesk for the home, living inside Home Assistant. You, your household, AI agents and Home Assistant itself raise tickets; you and your AI agents work them through to resolution, with the full history kept. Home Assistant is the heart of a smart home, so it's where tickets live, but they can be about anything around it too (the network, the servers, the media box). Categories keep those apart.

**Status: v0.1 plus the unreleased changes in the [changelog](custom_components/home_desk/CHANGELOG.md), in daily use on one install.** Not published to HACS yet, and expect rough edges.

**Features**

- A Home page (what needs you, what the AI Agent is doing, recent activity), a ticket list and a full-width ticket page in Home Assistant's own style.
- A four-status lifecycle that moves by itself, GitHub-style labels, and categories for what part of the home a ticket is about.
- Home Assistant Repairs (and anything else that fires an event) become tickets, and close themselves when fixed.
- A simple report form for household users, with photos and a voice message that Home Assistant's speech-to-text writes out.
- Two separate AI actions. **Review with AI** asks the AI you chose in Settings to review a ticket from what Home Desk shows it (the ticket, its comments, and what Settings allows, with secrets removed). It only advises and cannot change anything. **Queue for AI Agent** hands a ticket to an AI agent you run yourself.
- Not built yet: push notifications (the options are stored, nothing is sent) and reporting.

See [IDEA.md](IDEA.md) for the bigger vision.

*Formerly "Support Tickets" (domain `support_tickets`); see [Upgrading from Support Tickets](#upgrading-from-support-tickets).*

## Documentation

The full documentation is at **<https://greminn.github.io/ha-home-desk/>** (source in [`site/`](site/)):

- [Install](https://greminn.github.io/ha-home-desk/guide/install) and [upgrading from Support Tickets](https://greminn.github.io/ha-home-desk/guide/install#upgrading-from-support-tickets)
- [Using the panel](https://greminn.github.io/ha-home-desk/guide/using-the-panel), [status](https://greminn.github.io/ha-home-desk/guide/status), [labels and categories](https://greminn.github.io/ha-home-desk/guide/labels-categories), [household reports](https://greminn.github.io/ha-home-desk/guide/household-reports), [Home Assistant Repairs](https://greminn.github.io/ha-home-desk/guide/repairs) and [Settings](https://greminn.github.io/ha-home-desk/guide/settings)
- [AI access](https://greminn.github.io/ha-home-desk/ai/access) and [assigning to an AI agent](https://greminn.github.io/ha-home-desk/ai/assigning)
- [Events and notifications](https://greminn.github.io/ha-home-desk/guide/events) and [known limits](https://greminn.github.io/ha-home-desk/guide/known-limits)

## Install

1. Copy `custom_components/home_desk/` into Home Assistant's `/config/custom_components/`.
2. Restart Home Assistant, then **Settings → Devices & Services → Add Integration → Home Desk**. **Home Desk** appears in the sidebar.



> **Warning.** An AI agent can misread a ticket, and ticket text can be written by anyone who can reach your Home Assistant. Start with the **Advise Only** preset, and never give it a tool you would not give a stranger who can talk you into things.


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
