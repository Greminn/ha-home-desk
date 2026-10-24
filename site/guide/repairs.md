---
title: Home Assistant Repairs
---

# Home Assistant Repairs

Home Desk can open a ticket for each Home Assistant Repair (**Settings → System → Repairs**). It is on by default. Turn it off with **Tickets from Repairs** in [Settings](/guide/settings).

To skip noisy integrations, list them under **Settings → Devices & Services → Home Desk → Configure**.

## Ticket Contents

Requester Home Assistant, category Home Assistant, labels Bug and Repair. The priority follows severity: critical is Urgent, error is High, warning is Normal. The description holds the Repair's text, the integration and its "learn more" link. Your own changes to priority and labels are kept.

## How the Ticket Follows the Repair

| Repair | Ticket |
|---|---|
| Clears | Resolves ("Cleared by Home Assistant"). |
| Returns | Reopens to **New**. |
| Is ignored | Resolves ("Ignored in Home Assistant"). |
| Is no longer ignored | Reopens. |

"Restart required" notices are skipped. Repairs already present at startup are picked up, including ones that cleared while Home Assistant was off.

## Grouping

Repairs of one integration and issue type share one ticket that lists what is affected. A problem on three Proxmox nodes is one ticket, resolved when all three clear. Repairs without an issue type keep their own ticket.

## Duplicates

Fold two tickets together with **Merge**. See [Getting Around](/guide/getting-around).
