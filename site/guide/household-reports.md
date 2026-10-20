---
title: Household Reports
---

# Household Reports

Household users see only a report form. Besides the type, a line and some detail, they can add up to **6 photos** (shrunk to 1600 px in the browser) and a **voice message** of up to 3 minutes, recorded in the panel (the microphone needs https or localhost) or picked from the device. Everything goes in one upload to `POST /api/home_desk/report`.

- **Voice to text:** the recording is converted in the browser to 16 kHz mono WAV and, after the report is sent, passed to Home Assistant's speech-to-text (the engine in Settings, or the one your Assist pipeline uses). The words are added to the ticket's description as a quoted block and stored on the recording. A failure never loses the ticket or the recording. Switch it off in Settings.
- **Where files live:** `<config>/home_desk_attachments/<ticket>/`. They are judged by their first bytes (JPEG, PNG, WebP, WAV, Ogg, WebM, MP4/M4A, MP3 only), served with `nosniff` and a sandboxing content policy, and only to administrators and the person who sent them. The panel loads them through signed links.
- **Limits:** photos 10 MB each, a voice message 12 MB, ten reports an hour per person. Refused reports leave nothing behind.
