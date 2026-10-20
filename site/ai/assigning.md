---
title: Assigning to an AI Agent
---

# Assigning to an AI Agent

People don't assign tickets to each other (one or two managers who talk in person don't need to). The one assignee is the **AI Agent**. **Queue for AI Agent**, beside the priority icons in the comment box, hands the ticket over: the comment you type is the instruction, and `home_desk_event` fires with kind `assigned` so an automation can start the agent. When the agent replies on the ticket it is handed back automatically, and you can queue it again when you reply. A ticket with the agent shows "Queued for AI Agent" in the list and on the ticket. The agent's comments are marked **AI Agent (Claude)** with the spark icon. Optionally, a small **runner** on an always-on machine can work queued tickets with the Claude CLI: it reviews read-only first and only acts after a person presses Proceed. I built it for my own home; the steps for anyone who wants the same are in [the runner docs](/runner/), with a warning.
