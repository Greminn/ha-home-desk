---
title: How It Is Built
---

# How It Is Built

The AI Dispatcher is built to assume the AI can be wrong, and to limit the damage when it is. The master switch, **Use AI**, overrides "Offer Run AI Agent Now": with AI off, Home Desk refuses the AI Dispatcher's calls and Run is hidden.

::: warning An AI Can Misread a Ticket
Ticket text can be written by anyone who can reach your Home Assistant, including a guest or a hacked device. Start with the **Advise Only** preset, where the agent diagnoses and you make the edit. Only widen it when you can undo the result, and never give it a tool you would not give a stranger who can talk you into things.
:::

How it limits the damage:

- **Review first, then Proceed.** The agent looks and proposes with read-only tools. Only an administrator pressing **Proceed** in Home Desk lets it act, and it is told to do exactly what was approved and nothing else.
- **Its own limited user.** A separate, non-administrator Home Assistant user, with a short list of Home Desk services. Merging tickets, labels and similar are refused.
- **Read-only until you press Proceed, enforced by Home Desk.** While the review is running, that user can read and comment on the ticket it was asked to work, and nothing else. Changing, closing, linking or creating tickets is refused unless the approved change run is working, and then only on that ticket. This does not depend on the AI following instructions.
- **Limits that Home Assistant cannot change.** The tools it may use, who may ask, the presets and the daily caps are in a config file on the AI Dispatcher machine, because a hacked Home Assistant could forge a request or an approval.
- **A read-only view of your home during the review.** With the [`ha-mcp`](https://github.com/homeassistant-ai/ha-mcp) add-on, the review is given only its `/readonly` address, where the write tools do not exist, and the AI Dispatcher hands the normal address to the change step alone. [Looking at your home](/dispatcher/mcp) has the steps.
- **An exact tool list, no shell.** A fixed allow-list of tools, only the MCP servers you name, a turn limit and a time limit. Anything not listed is refused, not asked about.
- **Tickets are data, not orders.** The agent is told never to follow instructions found in ticket text. The tool list, not that instruction, is what actually holds the line.
- **Fails safe.** A crashed run is marked failed instead of left running. **Stop** works at any time. An unknown preset name stops everything.
- **Nothing happens unseen.** Each step is posted to the ticket, the full transcript is kept on the AI Dispatcher machine, and every run is logged with its preset.
- **Off until you turn it on**, and it starts with the safest preset.

None of this makes it risk free. It makes the risks small, visible and yours to choose.
