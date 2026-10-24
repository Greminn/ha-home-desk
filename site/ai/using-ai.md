---
title: AI Agents
---

# AI Agents

Home Desk has two separate AI actions. **Review** only advises. **Queue** hands the ticket to an agent that you run, and what that agent can do depends on the access you give it.

| Action | What it does | Runs |
|---|---|---|
| **Review** | An AI reads the ticket and suggests what to do. It can only advise. | In Home Assistant. |
| **Queue** | Marks the ticket for an AI agent that you run. | Wherever you run it. |

::: warning Usage and Cost
AI is not free. **Review** sends the ticket to the AI you chose, and that uses your AI plan and may cost money. Home Desk asks you to confirm each time and has a daily limit in [Settings](/guide/settings) so a busy day cannot run up a bill. An agent you run yourself uses its own plan, which Home Desk cannot see or limit. Check what your AI provider charges, and keep an eye on your usage.
:::

Don't want any of this? Turn off **Use AI** in [Settings](/guide/settings) (it asks first): every AI control disappears, tickets queued for an AI come off the queue, and Home Desk refuses what an AI would do, including calls from an agent you connect.

Both are choices in the **AI Action** pill in the reply bar. You pick one, then press the main button, which names what it will do.

## Review

1. In [Settings](/guide/settings), set **AI for review** to an AI Task or conversation entity.
2. On a ticket, pick **Review** in the **AI Action** pill. Type a question in the comment box if you want to steer it. The main button now reads **Review With AI Now**.
3. Press it and confirm. It uses your AI plan.

Home Desk gives the AI the ticket, its comments and what Settings allows (entity states, automation and script configuration, related tickets), with secrets removed. The reply is posted as a comment signed **AI Review**, with a working indicator while it runs, a **Stop** button and proposed changes you can apply in one step.

It cannot change anything and never touches the assignment. The instructions it is given are editable in Settings.

## Queue

Type the instruction in the comment box, pick **Queue** in the **AI Action** pill and press the main button, which reads **Queue for AI Agent**. The ticket moves to **Queued for AI**, and an [automation](/guide/events) can start your agent. Home Desk never starts an agent itself: **Queue for AI Agent** only marks the ticket. When the agent replies, the ticket returns to the administrator. Queue it again to continue.

An agent's comments are marked **AI Agent** with the spark icon.

## Connecting an Agent

To connect an agent you already run, see [Connect Your AI Agent](/ai/access).
