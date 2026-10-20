---
title: Using the Panel
---

# Using the Panel

The ticket list is on the left and the open ticket on the right. A phone shows one at a time. Every ticket has its own address, `/home-desk/<id>`.

## Views

Each open ticket is in exactly one view, the first that fits.

| View | Contents |
|---|---|
| **Inbox** | New tickets, and tickets reopened by Home Assistant or an AI agent. |
| **Working** | Tickets in progress, and tickets an AI agent has answered. |
| **Queued for AI** | Tickets handed to an AI agent. |
| **Ideas** | Enhancement tickets not yet started. Notes do not move them. **Start Working** moves one to **Working**. |
| **Completed** | Resolved and closed tickets. The **Show** filter also reaches Open, History and Everything. |

The first four show counts that add up to the open tickets. The last view used is remembered per browser.

## Working a ticket

- **Title:** click to edit.
- **Priority, category, labels:** pinned at the top of the ticket.
- **Comment:** the comment strip at the bottom opens when pointed at. It holds the priority icons (High, Urgent), **Queue for AI Agent**, the **AI Action** control, **Resolve** and **Comment**.
- **Resolve:** text in the comment box is saved as the resolution.
- **Reopen:** on a resolved or closed ticket.
- **History:** the clock icon lists each change with its exact time.
- **Merge:** beside History. Comments, labels, files and linked Repairs move to the kept ticket. The other closes as "Merged into #N".

## Finding tickets

- **Search** covers titles, descriptions, comments, resolutions, labels and categories. A ticket number finds that ticket.
- **Filters** cover category, who raised it, AI Agent (with or without), priority and label.
- Clicking a person's name in the list shows only their tickets.

The panel updates live, including changes made by automations and AI agents.

## Permissions

Administrators see and change everything. Other users see only the [report form](/guide/household-reports).
