---
title: Home Assistant Repairs
---

# Home Assistant Repairs

Home Assistant shows problems it notices under **Settings → System → Repairs**. Home Desk can turn each one into a ticket, so you get a place to keep notes and history that Repairs doesn't have.

## Turn it on or off

It's on by default. Open **Settings** in Home Desk and use **Tickets from Repairs**.

To skip integrations that are noisy, go to **Settings → Devices & Services → Home Desk → Configure** and list them there.

## What you get

- A ticket for each Repair, with the Repair's text, the integration it's about, and its "learn more" link. Its priority follows how serious Home Assistant says it is.
- When the Repair clears, **the ticket resolves itself** with the note "Cleared by Home Assistant".
- If the Repair comes back, the ticket **reopens in your Inbox**.
- If you **ignore** a Repair in Home Assistant, the ticket resolves. If you stop ignoring it, it reopens.
- Several Repairs of the same kind share one ticket. Three Proxmox nodes with the same problem is one ticket listing all three.
- Any priority or labels you set on the ticket are kept.

"Restart required" notices are skipped.

## Merging duplicates

If you already have two tickets about the same thing, open one and select **Merge** (beside History). Its comments and labels move to the ticket you keep, and the other closes as "Merged into #N".
