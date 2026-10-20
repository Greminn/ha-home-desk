---
title: Household Reports
---

# Household Reports

Anyone with a Home Assistant login who isn't an administrator sees a simple **report form** instead of the full ticket list. It's built so your family can say "this is broken" without learning Home Assistant.

## What they see

1. They open **Home Desk** in the sidebar.
2. They choose **Problem** or **Suggestion**.
3. They write a line and some detail.
4. Optionally, they add **photos** (up to 6) and a **voice message** (up to 3 minutes), recorded on the spot or picked from the device.
5. They send it.

It arrives in your **Inbox** like any other ticket.

::: tip Recording needs a secure connection
The microphone only works when Home Assistant is opened over `https` (or on the same machine). If your family use the Companion app or a secure address, it works.
:::

## Voice messages become text

If you use Home Assistant's speech-to-text, a voice message is turned into words and added to the ticket, with the recording kept alongside it. If it can't be turned into text, the ticket and the recording are still saved.

To turn this off, open **Settings** and switch off the voice option.

## What they can't see

Household members only see their own reports, and never your internal notes or other people's tickets. Only administrators and the person who sent a photo or recording can open it.

## Limits

Photos can be up to 10 MB each, and a voice message up to 12 MB. Each person can send ten reports an hour.
