---
title: Home Assistant Repairs
---

# Home Assistant Repairs

Home Desk can open a ticket for every Home Assistant **repair** (Settings → System → Repairs), so they get the history and notes that Repairs lacks. It is on by default; turn it off in the panel's **Settings**. To skip noisy integrations, list them under Settings → Devices & services → Home Desk → Configure.

- One ticket per repair (or per kind of repair, below): requester `Home Assistant`, category Home Assistant, labels Bug and Repair, priority from the repair's severity (critical → urgent, error → high, warning → normal). The description has the repair's text, the integration, and its "learn more" link.
- The ticket follows the repair: it **resolves itself** (with the note "Cleared by Home Assistant") when HA clears the repair, **reopens** (to New, so it is in the Inbox) if the repair comes back, and is **resolved** ("Ignored in Home Assistant") while you ignore the repair in HA; it reopens if you stop ignoring it. "Restart required" notices are skipped. Your own changes to its priority and labels are kept.
- Repairs of the same kind (one integration, one issue type) share one ticket that lists what is affected, so a problem on three Proxmox nodes is one ticket. It resolves when all of them clear. Repairs without an issue type keep their own ticket.
- Duplicates you already have (or any two tickets) can be folded together with **Merge** (the button beside History): comments, labels, files and linked repairs move to the ticket you keep, the other closes as "Merged into #N". Agents can do the same with `merge_tickets`.
- Repairs already present are picked up when Home Assistant starts, including ones that cleared while it was off.
