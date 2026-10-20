---
title: Using AI with Home Desk
---

# Using AI with Home Desk

Home Desk has two separate AI actions. Neither one lets an AI change your home on its own.

| | What it does | Where it runs |
|---|---|---|
| **Review with AI** | Asks an AI in Home Assistant to read a ticket and suggest what to do. It can only advise. | Inside Home Assistant. |
| **Queue for AI Agent** | Marks a ticket for an AI agent that *you* run, such as your own Claude. | Wherever you run your agent. |

## Review with AI

1. Open **Settings** and choose which **AI Agent** to use. Any AI Task or conversation entity in Home Assistant will do.
2. Open a ticket, open the **AI Action** control beside the comment box, and select **Review with AI**.
3. Confirm. It uses your AI plan, so you're asked first.
4. A working indicator shows while it thinks. Its reply is added as a comment signed **AI Review**, often with suggested changes you can apply in one click.

You can press **Stop** at any time. It can't change anything, and it doesn't touch who the ticket is assigned to. You can edit the instructions it's given in Settings.

## Queue for AI Agent

1. Write what you want in the comment box.
2. Select **Queue for AI Agent**.

The ticket moves to the **Queued for AI** tab. When your AI agent replies, the ticket comes back to you automatically. Home Desk fires an event when you queue a ticket, so an automation can start your agent. See [Automations and Notifications](/guide/events).

::: tip Want the AI to do the work too?
The optional [AI Agent Runner](/runner/) lets your own Claude work queued tickets: it looks first, and only acts after you press **Proceed**. It's technical to set up, and it has a warning you should read.
:::
