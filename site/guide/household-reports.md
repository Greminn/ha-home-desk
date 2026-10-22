---
title: Household Reports
---

# Household Reports

Users who are not administrators see a report form in place of the ticket list. They cannot open other tickets.

## The Form

- **Type:** Problem (the **Bug** label) or Suggestion (the **Enhancement** label).
- **A line and some detail.**
- **Photos:** up to 6, each shrunk to 1600 px in the browser.
- **A voice message:** up to 3 minutes, recorded in the panel or picked from the device.

The report arrives in the **Inbox**. Only administrators set the priority and other labels.

::: warning Recording needs https
The browser blocks the microphone unless Home Assistant is opened over `https` or `localhost`.
:::

## Voice to Text

The recording is converted in the browser to 16 kHz mono WAV. After the report is sent it is passed to Home Assistant's speech-to-text, using the engine chosen in [Settings](/guide/settings) or the one the Assist pipeline uses. The text is added to the description as a quoted block. A speech-to-text failure never loses the ticket or the recording.

Turn it off in [Settings](/guide/settings).

## Files and Limits

- Files are stored in `<config>/home_desk_attachments/<ticket>/`.
- Only JPEG, PNG, WebP, WAV, Ogg, WebM, MP4/M4A and MP3 are accepted, judged by their first bytes. They are served with `nosniff` and a sandboxing content policy, only to administrators and the sender, through signed links.
- Photos are limited to 10 MB each and a voice message to 12 MB. Each person can send ten reports an hour. A refused report leaves nothing behind.
