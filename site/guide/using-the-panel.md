---
title: Using the Panel
---

# Using the Panel

- **Views** (tabs): every open ticket is in exactly one, the first that fits. **Completed** is resolved and closed tickets (its Show filter also reaches Open, History and Everything). **Queued for AI** is what is with an AI agent. **Enhancements** are ideas for the future that haven't been started: you can add notes without them moving, and **Start Working** moves one to Working. **Inbox** is new tickets, including tickets reopened by Home Assistant or an AI agent. **Working** is the rest: what you and the other admins are working on, and tickets an AI agent has answered. The first four show counts, which add up to the open tickets. The ticket list is on the left and the open ticket on the right (one at a time on a phone). Every ticket has its own address, `/home-desk/123`. The last view you used is remembered per browser. The **+** at the left of the toolbar raises a ticket.
- **Find things:** search covers titles, descriptions, comments, resolutions, labels and categories. Filter by category, who raised it, AI Agent (with or not), priority and label. Click a person's name in the list to see just their tickets.
- **Work a ticket:** the title, status, priority, category and labels are pinned at the top and the title edits in place. The description sits under it and scrolls with the page. Comments are below, and the comment box is docked at the bottom as a slim strip (it opens when you point at it or press **R**, and Escape closes it (so does **R** when the cursor is not in the box)) with the priority icons (High, Urgent), **Queue for AI Agent**, an **AI Action** control (**Review with AI**), **Resolve** and **Comment**. The clock icon shows the ticket's history (each change as a line, with the exact time).
- **Live:** the panel refreshes when anything changes, including changes made by an AI agent or an automation, and scrolls to a new comment.
- **Accessibility:** icon-only controls have names, the dialogs are modal, new comments are announced, label badges open on keyboard focus as well as on hover, and animation stops if your system asks for reduced motion.

## Who sees what

Admins see and change everything. Other Home Assistant users can raise tickets and comment on their own, and don't see internal notes or other people's tickets.
