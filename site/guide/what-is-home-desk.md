---
title: What Is Home Desk?
---

# What Is Home Desk?

Home Desk is a helpdesk integration for Home Assistant. It stores tickets, labels and categories, and adds a **Home Desk** panel to the sidebar in Home Assistant's own style.

Tickets are raised by:

- **Administrators**, for anything in or around the home.
- **Household users**, through a report form that accepts photos and a voice message.
- **Home Assistant**, from [Repairs](/guide/repairs). The ticket resolves when the Repair clears.
- **AI agents**, through the `home_desk.*` actions. See [AI Agents](/ai/using-ai).

Every change is kept in the ticket's history and fires a `home_desk_event`, so [automations](/guide/events) can react to it.

## Ticket lifecycle

1. A new ticket is **New** and shows in the **Inbox**.
2. The first comment, priority, label or category change makes it **In Progress**.
3. **Resolve** records the cause and the fix.
4. A resolved ticket **Closes** automatically after a delay set in [Settings](/guide/settings). **Reopen** brings it back.

See [Status](/guide/status).

## Requirements

- Home Assistant 2024.10 or newer.
- Access to the `config` folder, to copy the integration in. See [Install](/guide/install).

::: warning Beta
Home Desk is in beta. It runs daily on the author's own home, but the interface may still change between releases. Back up before installing. Home Desk also copies its ticket file before each new version first runs.
:::

::: tip Need help?
[Open an issue on GitHub](https://github.com/Greminn/ha-home-desk/issues).
:::
