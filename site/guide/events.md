---
title: Automations and Notifications
---

# Automations and Notifications

::: info Built-in notifications are coming
Home Desk can't send push notifications by itself yet. You can set them up today with a Home Assistant automation, as shown below.
:::

Every time a ticket changes, Home Desk sends a Home Assistant event called `home_desk_event`. You can use it as the trigger for any automation.

## Example: a phone alert for new tickets

1. Go to **Settings → Automations & Scenes → Create Automation → Create new automation**.
2. Open the **⋮** menu and select **Edit in YAML**.
3. Paste this in, and change the notify service to your own phone:

```yaml
alias: Home Desk - new ticket alert
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

## What you can match on

`kind` says what happened: `created`, `updated`, `comment`, `note`, `closed`, or `assigned` (a ticket was queued for an AI agent).

The event also carries `ticket_id`, `title`, `status`, `priority`, `requester`, `actor` (who did it), `assignee`, `category` and `with_agent`. Use them in conditions or in your message.
