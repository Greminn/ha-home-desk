---
title: Household Reports
---

# Household Reports

Users who are not administrators see a report form in place of the ticket list. They cannot open other tickets.

## The Form

- **Type:** Problem (the **Bug** label) or Suggestion (the **Enhancement** label).
- **One message box.** Write as much or as little as you like. The first line becomes the ticket's title and the rest its description.
- **Photos:** up to 6, each shrunk to 1600 px in the browser.
- **A voice message:** up to 3 minutes, recorded on the form or picked from the device.

A message, a photo or a voice message is enough on its own. A report with no words is titled "Sam reported a problem" (or "an idea" for a Suggestion), using the sender's name.

The report arrives in the **Inbox**. Only administrators set the priority and other labels.

::: warning Recording needs a secure connection
The browser blocks the microphone unless Home Assistant is opened over a secure (https) address. You can still pick a recording from the device.
:::

## Voice to Text

After the report is sent, the recording is turned into text by Home Assistant's speech-to-text and added to the description as a quote. If that fails, the ticket and the recording are kept. Turn it off in [Settings](/guide/settings).

## Limits

Up to 6 photos and one voice message of up to 3 minutes per report, and ten reports an hour for each person. The technical details are in [Under the Hood](/guide/under-the-hood).
