---
title: Good to Know
---

# Good to Know

- Services other than `get_guide` and `get_changelog`, and the Settings, need an administrator.
- Non-administrators see only the report form.
- Notifications are not built yet, so their settings are hidden. Use an [automation](/guide/events).
- Label colours are limited to Home Assistant's theme colour names, not arbitrary hex values.
- Home Desk never starts an AI agent itself. **Queue for AI Agent** only marks the ticket. The [runner](/runner/) is a separate, optional program.
- The integration is tested without a Home Assistant install (storage, the WebSocket and service layers against stand-ins, the MCP bridge, and the panel in a mock page) and by daily use on one install. There is no automated test of the panel or of the real Home Assistant wiring.
