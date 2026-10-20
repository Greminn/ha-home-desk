---
title: Status
---

# Status

A ticket's status mostly moves by itself:

- **New**: nobody has touched it.
- **In Progress**: set automatically the first time a person or an AI agent does anything to it (a comment, a priority, label or category change, an assignment). Changes by Home Assistant, an import or Home Desk itself don't count.
- **Resolved**: someone presses **Resolve**. Anything typed in the comment box is saved as the resolution (the cause and the fix).
- **Closed**: set automatically after a delay chosen in Settings (7 days by default; also straight away, 1 hour to 30 days, or never). **Reopen** on a resolved or closed ticket puts it back to In Progress. A ticket reopened by Home Assistant (a repair that comes back) or by an AI agent goes back to **New** instead, so it shows in the Inbox.

There is no status dropdown. (The old *Open* status was merged into In Progress, and *Waiting* is the **Blocked** label.)
