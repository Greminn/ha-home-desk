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
`create_ticket` raises a new ticket every time it runs. To raise a problem once however often it is reported, use `raise_issue` instead, as in the next example.
:::

## Example: Raise a Problem Once, and Clear It When It Is Over

`home_desk.raise_issue` opens a ticket for a problem, once. You give the problem a short `key`, the same every time, and Home Desk finds the ticket by it. `home_desk.clear_issue` resolves that ticket when the problem is over. For example, a soil probe that goes dry:

```yaml
alias: Home Desk - soil is dry
triggers:
  - trigger: numeric_state
    entity_id: sensor.garden_soil_moisture
    below: 15
    for: "01:00:00"
actions:
  - action: home_desk.raise_issue
    data:
      key: soil-probe-garden-dry
      title: "Garden soil probe is dry"
      description: "sensor.garden_soil_moisture has been below 15% for an hour."
      priority: normal
      entities:
        - sensor.garden_soil_moisture
```

```yaml
alias: Home Desk - soil is wet again
triggers:
  - trigger: numeric_state
    entity_id: sensor.garden_soil_moisture
    above: 25
actions:
  - action: home_desk.clear_issue
    data:
      key: soil-probe-garden-dry
      resolution: "The soil moisture is back above 25%."
```

What happens to the ticket for a key:

| When | What happens |
|---|---|
| `raise_issue`, nothing is open | A ticket is created. |
| `raise_issue`, one is open | Nothing, unless `on_existing: comment` adds a comment (at most one an hour for each key). A higher `priority` is taken over; a lower one never is. |
| `raise_issue`, it was resolved or closed | The same ticket reopens to **New**. |
| `raise_issue`, the ticket was deleted | A new ticket is created. |
| `clear_issue` | The open ticket is resolved with your note. If nothing is open, nothing happens and it is not an error. |

The key is trimmed and lower-cased, and can be up to 80 characters. Keys are separate from Repairs, so they never touch a ticket made from a Home Assistant Repair. If you merge two tickets, the one you keep takes over the key.

The ticket shows **Raised by the automation** with a link to it (or **Raised by Home Assistant** when the caller can't be found). Both actions return what happened, `created`, `found`, `reopened`, `commented`, `cleared` or `none`, which an automation can use with `response_variable`.

## Starting an AI Agent

Trigger on `kind: assigned` to start an agent when a ticket is queued. See [AI Agents](/ai/using-ai).
