---
title: Install
---

# Install

1. Copy `custom_components/home_desk/` into HA's `/config/custom_components/`.
2. Restart HA, then **Settings → Devices & Services → Add Integration → Home Desk**. **Home Desk** appears in the sidebar.

Changing the integration's Python code (not just the panel bundle) needs another HA restart; reloading the integration isn't enough. Service descriptions are cached until a restart too.

## Upgrading from Support Tickets

The first build was called Support Tickets (domain `support_tickets`). Home Desk adopts its tickets automatically the first time it loads, leaving the old `.storage/support_tickets.tickets` file in place as a backup. To move over: replace `custom_components/support_tickets/` with `custom_components/home_desk/`, restart, add **Home Desk** under Devices & Services, and remove the dead Support Tickets entry. Service names change from `support_tickets.*` to `home_desk.*` (and the event to `home_desk_event`), so update any automations that used them.
