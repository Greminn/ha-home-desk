---
title: Automations and Notifications
---

# Automations and Notifications

Home Desk fires `home_desk_event` on the event bus for every ticket change. Built-in push notifications are not available yet. Use an automation.

## Event Data

| Field | Value |
|---|---|
| `kind` | `created`, `updated`, `comment`, `note`, `closed`, or `assigned` (queued for an AI agent). |
| `ticket_id`, `title` | The ticket. |
| `status`, `priority`, `category` | Its current values. |
| `requester`, `actor` | Who raised it, and who made this change. |
| `assignee`, `with_agent` | Whether an AI agent has it. |

## Example: Notify on a New Ticket

```yaml
alias: Home Desk - new ticket
triggers:
  - trigger: event
    event_type: home_desk_event
    event_data:
      kind: created
actions:
  - action: notify.mobile_app_your_phone
    data:
      title: "New ticket: {{ trigger.event.data.title }}"
      message: "Raised by {{ trigger.event.data.requester }}"
```

Replace the `notify` action with your own. The `triggers:` syntax needs Home Assistant 2024.10 or newer.

## Starting an AI Agent

Trigger on `kind: assigned` to start an agent when a ticket is queued. See [AI Agents](/ai/using-ai).
