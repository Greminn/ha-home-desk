---
title: AI Agents
---

# AI Agents

Home Desk has two separate AI actions. Neither lets an AI change Home Assistant on its own.

| Action | What it does | Runs |
|---|---|---|
| **Review** | An AI reads the ticket and suggests what to do. It can only advise. | In Home Assistant. |
| **Queue** | Marks the ticket for an AI agent that you run. | Wherever you run it. |

Both are choices in the **AI Action** pill in the reply bar. You pick one, then press the main button, which names what it will do. **Run** also appears there if you have set up the optional [runner](/runner/).

## Review

1. In [Settings](/guide/settings), set **AI for review** to an AI Task or conversation entity.
2. On a ticket, pick **Review** in the **AI Action** pill. Type a question in the comment box if you want to steer it. The main button now reads **Review With AI Now**.
3. Press it and confirm. It uses your AI plan.

Home Desk gives the AI the ticket, its comments and what Settings allows (entity states, automation and script configuration, related tickets), with secrets removed. The reply is posted as a comment signed **AI Review**, with a working indicator while it runs, a **Stop** button and one-click proposed changes.

It cannot change anything and never touches the assignment. The instructions it is given are editable in Settings.

## Queue

Type the instruction in the comment box, pick **Queue** in the **AI Action** pill and press the main button, which reads **Queue for AI Agent**. The ticket moves to **Queued for AI** and `home_desk_event` fires with `kind: assigned`, so an [automation](/guide/events) can start the agent. When the agent replies, the ticket returns to the administrator. Queue it again to continue.

An agent's comments are marked **AI Agent** with the spark icon.

When a **Run** finds nothing to change (its findings end in "What I would change: Nothing"), the run simply finishes: there is no **Proceed** to press.

## Running the work

To have an agent work queued tickets for you, see the optional [AI Agent Runner](/runner/). Setup is technical, and it carries a warning. Once it is set up and switched on in Settings, **Run** appears in the **AI Action** pill and the main button reads **Run AI Agent Now**.

To connect an agent you already run, see [Connect Your Own AI Agent](/ai/access).
