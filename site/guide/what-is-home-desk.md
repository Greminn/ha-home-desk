---
title: What Is Home Desk?
---

# What Is Home Desk?

Home Desk is a helpdesk integration for Home Assistant. It stores tickets that you can label, sort into categories, and optionally assign to an AI agent. It adds **Home Desk** to the sidebar in Home Assistant's own style.

Tickets are raised by:

- **Administrators**, for anything in or around the home.
- **Household users**, through a report form that accepts photos and a voice message.
- **Home Assistant**, from [Repairs](/guide/repairs). The ticket resolves when the Repair clears.
- **AI agents** you connect. See [AI Agents](/ai/using-ai).

Every change is kept in the ticket's history, and [automations](/guide/events) can react to it.

## Why Not Just Ask an AI?

An AI with access to Home Assistant is good at one job at a time: you ask, and it looks. Home Desk is the other half, a place where problems live.

- **It remembers.** A ticket keeps what was wrong, what was tried and what was decided, so it is still there next month.
- **It has more than one source.** Household members report problems, Repairs become tickets, and automations can raise them. An AI only sees what you ask it about.
- **You stay in charge.** Review With AI gives an opinion and proposes changes. Nothing happens until you apply them.
- **You can see everything at a glance.** What is open, what is urgent and what is waiting.
- **It works without AI.** One switch in Settings turns every AI control off, and Home Desk is still a helpdesk.

For a quick one-off question, asking an AI directly is simpler, and you do not need Home Desk for that.

## Ticket Lifecycle

1. A new ticket is **New** and shows in the **Inbox**.
2. The first comment, priority, label or category change makes it **In Progress**.
3. **Resolve** records the cause and the fix.
4. A resolved ticket **Closes** automatically after a delay set in [Settings](/guide/settings). **Reopen** brings it back.

See [Status](/guide/status).

## Requirements

- Home Assistant 2024.10 or newer.
- Access to the `config` folder, to copy the integration in. See [Install](/guide/install).

::: warning Pre-Release
Home Desk is a pre-release. It runs daily on the author's own home, but the interface may still change between releases. Back up before installing. Home Desk also copies its ticket file before each new version first runs.
:::

::: tip Need help?
[Open an issue on GitHub](https://github.com/Greminn/ha-home-desk/issues).
:::
