---
title: Using the Panel
---

# Using the Panel

The ticket list is on the left and the open ticket on the right. A phone shows one at a time. Every ticket has its own address, `/home-desk/<id>`, and a refresh keeps you on the page you were on, except Settings: coming back to Home Desk always opens Home.

## The Home Page

The **Home Desk** title in the header opens the Home page. It shows:

- **Four tiles:** Inbox, Working, Queued for AI, and how many tickets were completed in the last 7 days. Select a tile to open that tab.
- **Urgent and High counts** on the Inbox and Working tiles. Select one to open that tab with the priority filter already set, so the number always matches the list you land on.
- **Blue numbers.** A tile's number turns blue when that tab has tickets with updates you have not seen, the same as the counts in the tab bar.
- **Ticket Activity:** a graph of tickets opened and completed on each of the last 7 days.

## Tabs

Each open ticket is in exactly one tab, the first that fits.

| Tab | Contents |
|---|---|
| **Inbox** | New tickets, and tickets reopened by Home Assistant or an AI agent. |
| **Working** | Tickets in progress, and tickets an AI agent has answered. |
| **Queued for AI** | Tickets handed to an AI agent. |
| **Ideas** | Enhancement tickets not yet started. Notes do not move them. **Start Working** moves one to **Working**. |
| **Completed** | Resolved and closed tickets. Tickets with the **History** label are listed here only when you filter by that label. |

The first four show counts that add up to the open tickets. The last tab used is remembered per browser.

## The List

Above the list:

- **Search** (named after the tab, for example **Search Inbox…**) narrows the current tab by ticket number, title or label. The box in the header, **Search all tickets…**, searches every ticket.
- **Sort** (the sort icon) opens a menu: **Default Sort**, **Last Updated**, **Date Opened**, **Priority**, **Comments** and **Title**, plus **Date Closed** on the Completed tab. Select the chosen sort again to flip its direction, shown by an arrow. The default is newest opened in the Inbox and most recently updated everywhere else. Each tab remembers its own sort in this browser, and the icon shows a badge while a custom sort is on.
- **Filters** (the filter icon) open a row for **Category**, **Priority** and **Label**. A badge counts the filters that are set, and each tab has its own filters. They are not kept when you reload. Selecting a person's name in the list also filters to their tickets.
- **Select Tickets** (the checkbox icon) shows a checkbox on every row. With tickets ticked you can mark them as read or merge them.

An empty list says why. If a search or filter is hiding tickets, **Clear Filters** brings them back.

## Open Tickets

Each ticket you open gets a chip under the header.

- A ticket you only pass through (Previous and Next, a selection in the list, a search result) shows as an *italic* chip with a dashed outline, a **preview**. The next ticket you pass through takes its place.
- A preview chip becomes a normal chip when you do something with the ticket, such as comment or change the priority, or when you select the chip.
- Up to eight chips stay open. The **X** closes a chip, a middle click does too, and **Option-click** (**Alt-click** on Windows and Linux) on an **X** closes every chip, after a confirmation.

## Working a Ticket

- **Title:** select it to edit.
- **Priority, category, labels:** pinned at the top of the ticket.
- **Comment:** the strip at the bottom opens when pointed at. See below.
- **Resolve:** text in the comment box is saved as the resolution. It is outlined, and fills blue when you point at it.
- **Start Working:** on an idea, a solid blue button that moves it to **Working**. **Reopen:** on a resolved or closed ticket.
- **History:** the clock icon lists each change with its exact time.
- **Merge:** beside History. Comments, labels, files and linked Repairs move to the kept ticket. The other closes as "Merged into #N".
- **Delete:** the trash can at the far right of the buttons removes the ticket for good, after a confirmation. It is not resolved: it leaves the history, with its comments and files, and cannot be undone. It is refused while an AI agent is working on the ticket. A repair's ticket stays deleted: Home Desk does not open another for that repair while it is still there. Only administrators can delete, and only here: there is no service, so an AI agent cannot.

### The Reply Bar

Choices in the reply bar are picked first, then applied with the main button, which says what it will do:

- **Priority icons** (High, Urgent): the button reads **Set Priority** when that is all you chose.
- **AI Action:** pick one of **Run**, **Review** or **Queue**, and select it again to switch it off. The main button then reads **Run AI Agent Now**, **Review With AI Now** or **Queue for AI Agent**. Run and Review ask you to confirm first, because they use your AI plan. See [AI Agents](/ai/using-ai).
- Text in the comment box is posted first, as your comment or as the instruction to the AI.

**Resolve**, **Start Working** and **Reopen** act straight away.

The keyboard shortcuts are listed in Settings.

## On a Phone

A phone shows one pane at a time, laid out for a thumb:

- **Tabs** are one drop-down in the header, showing the list you are on and its count. Choosing a tab shows that list, even if a ticket was open. **Settings** is in the three-dot menu.
- **Search** is a magnifying glass beside the three dots while a ticket is open. It goes to the list and puts the cursor in the search box.
- **The ticket header** is the title across the full width, then one row of buttons: back, then previous, next, merge, history and delete.
- **The reply bar** is pinned to the bottom of the screen, above the keyboard when it is open. Tap it to open it: **Start Working** (on an idea) is a full-width line at the top, then **AI Action** across the width, then the priority icons and **Resolve** on one row, then **Comment**.
- Open chips and the full width view are not offered.

## Permissions

Administrators see and change everything. Other users see only the [report form](/guide/household-reports).

The panel updates live, including changes made by automations and AI agents.
