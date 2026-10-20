---
title: Known Limits
---

# Known Limits

- Tested without a Home Assistant install (storage logic, the websocket and service layers against stand-ins for Home Assistant, the MCP bridge, and the panel in a mock page) and by use on a live install; there is no automated test of the panel itself or of the real HA wiring.
- Services (other than the guide and changelog) and the Settings need an administrator; admin-only features rely on HA's own admin flag. Non-admins only see the simple report form (a problem or a suggestion, with photos and a voice message); they can't open tickets.
- Label colours are limited to the theme-aware names, not arbitrary hex values.
- The Settings notification options are stored but nothing is sent yet.
- Review with AI only advises and proposes: Home Desk itself never starts an AI agent: assigning only marks a ticket. The optional runner (see [runner/README.md](/runner/setup)) is a separate program you set up on your own machine.
