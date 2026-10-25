---
title: Events and Automations
---

# Events and Automations

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

## Example: Raise a Ticket From an Automation

Any automation or script can raise a ticket with the `home_desk.create_ticket` action. For example, when a sensor has stopped reporting:

```yaml
alias: Home Desk - soil probe has gone quiet
triggers:
  - trigger: state
    entity_id: sensor.garden_soil_moisture
    to: unavailable
    for: "24:00:00"
actions:
  - action: home_desk.create_ticket
    data:
      title: "Soil probe has stopped reporting"
      description: "sensor.garden_soil_moisture has been unavailable for 24 hours."
      priority: normal
      labels:
        - Bug
      entities:
        - sensor.garden_soil_moisture
```

Only `title` is required. The rest are optional:

| Field | What it does |
|---|---|
| `description` | The details, in Markdown. |
| `priority` | `low`, `normal`, `high` or `urgent`. |
| `labels` | Label names, such as `Bug`. A name that does not exist yet is created. |
| `category` | The name of a category that already exists, such as `Network`. |
| `entities`, `devices`, `areas` | What the ticket is about. People can select them on the ticket to open them. |
| `requester` | Who raised it. It defaults to Home Assistant. |

The ticket appears in the **Inbox** like any other, with Home Assistant as the requester. You can find the action in **Developer Tools**, under **Actions**.

::: warning Duplicates
Every run raises a new ticket, and Home Desk does not yet check whether one already exists for the same problem. Trigger on a change, as the example does with `for:`, not on a timer. A way to avoid duplicates is being planned: see [issue 2](https://github.com/Greminn/ha-home-desk/issues/2).
:::

## Starting an AI Agent

Trigger on `kind: assigned` to start an agent when a ticket is queued. See [AI Agents](/ai/using-ai).
