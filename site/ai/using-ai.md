---
title: AI Agents
---

# AI Agents

Home Desk has two separate AI actions. Neither lets an AI change Home Assistant on its own.

| Action | What it does | Runs |
|---|---|---|
| **Review with AI** | An AI reads the ticket and suggests what to do. It can only advise. | In Home Assistant. |
| **Queue for AI Agent** | Marks the ticket for an AI agent that you run. | Wherever you run it. |

## Review with AI

1. In [Settings](/guide/settings), set **AI Agent** to an AI Task or conversation entity.
2. On a ticket, open **AI Action** beside the comment box and select **Review with AI**.
3. Confirm. It uses your AI plan.

Home Desk gives the AI the ticket, its comments and what Settings allows (entity states, automation and script configuration, related tickets), with secrets removed. The reply is posted as a comment signed **AI Review**, with a working indicator while it runs, a **Stop** button and one-click proposed changes.

It cannot change anything and never touches the assignment. The instructions it is given are editable in Settings.

## Queue for AI Agent

Type the instruction in the comment box and select **Queue for AI Agent**. The ticket moves to **Queued for AI** and `home_desk_event` fires with `kind: assigned`, so an [automation](/guide/events) can start the agent. When the agent replies, the ticket returns to the administrator. Queue it again to continue.

An agent's comments are marked **AI Agent** with the spark icon.

## Running the work

To have an agent work queued tickets for you, see the optional [AI Agent Runner](/runner/). Setup is technical, and it carries a warning.

To connect an agent you already run, see [Connect Your Own AI Agent](/ai/access).
