---
title: Events and Notifications
---

# Events and Notifications

Every change fires `home_desk_event` with `ticket_id`, `kind` (`created`, `updated`, `comment`, `note`, `closed`, and `assigned` when a ticket is handed to an AI agent), `actor`, `title`, `status`, `priority`, `requester`, `assignee`, `with_agent` and `category`. Trigger an automation on it to notify the manager. Built-in push notifications (to a phone through the Companion app, or the Home Assistant bell), using each manager's Settings, are planned.
