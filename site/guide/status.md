---
title: Status
---

# Status

A ticket's status changes automatically. There is no status menu.

| Status | Set when |
|---|---|
| **New** | The ticket is raised. |
| **In Progress** | A person or an AI agent first comments, or changes the priority, labels, category or assignment. Changes by Home Assistant or Home Desk itself do not count. |
| **Resolved** | **Resolve** is selected. Text in the comment box is saved as the cause and the fix. |
| **Closed** | A set time after resolving. Configured in [Settings](/guide/settings): immediately, 1 hour to 30 days, or never. The default is 7 days. |

**Reopen** on a resolved or closed ticket returns it to **In Progress**. A ticket reopened by Home Assistant (a Repair that returned) or by an AI agent returns to **New**, so it shows in the **Inbox**.

To mark a ticket as waiting on a person, a part or a fix, use the **Blocked** label.
