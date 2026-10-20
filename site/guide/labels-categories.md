---
title: Labels and Categories
---

# Labels and Categories

Labels work as they do on GitHub: they say what a ticket is, and which system or topic it concerns. Each label has a name, a colour (the same colour names HA uses for its own labels, so they follow your theme), an optional icon and an optional description.

- **Built-in labels** (locked: they can't be renamed, recoloured or deleted): **Bug** (something isn't working), **Enhancement** (an idea or request for the future), **Task**, **Question**, **History** (a record of past work, hidden from lists unless you ask) and **Blocked** (waiting on a person, a part or a fix). The Inbox and Enhancements views rely on these. (There used to be a Home Assistant label; it is a category now.)
- Every other label is yours: **Manage labels** (in the panel's ⋮ menu, admins only) opens a page like Home Assistant's own Labels page, where you create, edit (name, icon, colour, description) and delete them. Renaming keeps tickets labelled; deleting removes the label from every ticket after a confirmation that says how many.
- Typing a label name that doesn't exist (in the panel, or an AI agent using it) creates it, with a colour picked automatically. Names match case-insensitively.
- A suggested scheme, used on the imported tracker: a **system** (Home Assistant, Network, Infrastructure, Media), **topics** (Zigbee, Lighting, Automations, Dashboards, Cameras, Presence, Energy, Voice, Security...) and **workflow** labels (Needs review, Monitoring, Recurring, Side project). Nothing enforces it.
- Household users can pick Problem (the Bug label) or Suggestion (Enhancement) when raising their own ticket; only admins set other labels and the priority.

## Categories

A category says what part of the smart home a ticket is about: Home Assistant, Network, Lighting, Cameras... A ticket has one category or none (it then shows an **Add Category** pill). **Home Assistant** is built in and locked; every other category is yours. **Manage Categories** (in the ⋮ menu, admins only) works like Manage Labels: a searchable list, create, rename, change the icon, delete (tickets in it become uncategorised). AI agents can list, create, rename and assign categories, and can delete only a category nothing uses. In the list the category is the outlined pill under each ticket; click it to change it.
