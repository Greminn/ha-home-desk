---
title: Under the Hood
---

# Under the Hood

The technical details behind the other pages.

## Who Can Do What

- Services other than `get_guide` and `get_changelog`, and the Settings, need an administrator. The one exception is the AI agent's own Home Assistant user, which gets a few services, and only while a run lets it.
- Non-administrators see only the report form.
- Deleting a ticket is in the panel for administrators only. There is deliberately no service for it, so an AI agent cannot delete tickets.
- Every ticket has its own address, `/home-desk/<id>`, so it can be linked and bookmarked. A refresh keeps you on the page you were on, except Settings.

## Reports: Files and Limits

- Files are stored in `<config>/home_desk_attachments/<ticket>/`.
- Only JPEG, PNG, WebP, WAV, Ogg, WebM, MP4/M4A and MP3 are accepted, judged by their first bytes. They are served with `nosniff` and a sandboxing content policy, only to administrators and the sender, through signed links.
- Photos are shrunk to 1600 px in the browser and limited to 10 MB each. A voice message is limited to 12 MB and 3 minutes. Each person can send ten reports an hour. A refused report leaves nothing behind.
- A voice message is converted in the browser to 16 kHz mono WAV, then passed to Home Assistant's speech-to-text using the engine chosen in [Settings](/guide/settings) or the one the Assist pipeline uses. The text is added to the description as a quoted block. A speech-to-text failure never loses the ticket or the recording.
- The report endpoint takes one multipart request: a `kind`, a `message` (or the older `title` and `details`), up to six photos and one voice message.

## Events

Every ticket change fires `home_desk_event` on the event bus. See [Events and Automations](/guide/events).

## How It Is Tested

The integration is tested without a Home Assistant install (storage, the WebSocket and service layers against stand-ins, the MCP bridge, and the panel in a mock page) and by daily use on one install. There is no automated test of the panel or of the real Home Assistant wiring.
