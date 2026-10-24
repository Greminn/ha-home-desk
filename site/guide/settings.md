---
title: Settings
---

# Settings

The cog in the panel header opens Settings. Administrators only. Changes save immediately.

| Card | Setting | Effect |
|---|---|---|
| **Tickets** | **Close resolved tickets** | The delay before a resolved ticket closes. |
| | **Tickets from Repairs** | Opens a ticket for each Home Assistant Repair. See [Repairs](/guide/repairs). |
| **Voice messages** | **Write out voice messages** and **Speech-to-text** | Transcribes household voice messages, with the speech-to-text engine you choose. See [Household Reports](/guide/household-reports). |
| **AI** | **Use AI** | The master switch, on by default. Off hides every AI control and setting (the AI Action control, the **Queued for AI** tab and tile, and the cards below), and Home Desk refuses Review, Run, Proceed, assigning a ticket to an AI agent and anything an AI agent sends it. Turning it off asks first, because it also takes every ticket off the AI queue and ends any run in progress; turning it back on does not put them back. |
| **AI review** | **AI for review** | The AI Task or conversation entity used by **Review With AI**. See [AI Agents](/ai/using-ai). |
| | **Daily limit** | How many reviews can be asked for in a day. **Test the AI** sends one short question to check it works. |
| **What the AI is sent for a review** | Entity states, automation and script configuration, related tickets | What is added to the ticket and its comments. Secrets are removed first. |
| **Review instructions** | The text the AI is given | Editable. See below. |
| **AI Agent runner** | **Offer Run AI Agent Now**, and the agent's Home Assistant user | Shows **Run** in the reply bar once the optional [runner](/runner/) is set up. |

The four AI cards below **AI** appear only while **Use AI** is on.

**Manage Labels** and **Manage Categories** are in the **⋮** menu.

## Review Instructions

The instructions tell the AI what its job is and how to write. Home Desk adds the ticket, its comments and what you allowed above, along with a fixed part it needs in order to read proposed changes. The fixed part is shown under **Always added after your text** and cannot be edited.

If you edit the instructions, your text is kept even when a new version of Home Desk improves the default. When that happens, a notice says **The default has changed since you edited this**. Choose **Keep Mine** to hide the notice and keep your text, or **Reset to Default** to go back to the current default. Nothing changes until you choose.

## Keyboard Shortcuts and About

**Keyboard Shortcuts** lists every key. **About** shows the version and links to the release notes, this documentation, the issue tracker and the repository, and to the author's page for anyone who wants to say thanks.

::: info Notifications
Each manager's notification options are stored, but nothing sends yet, so they are hidden. Use an [automation](/guide/events) for now.
:::
