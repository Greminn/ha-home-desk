---
title: Household Reports
---

# Household Reports

Users who are not administrators see a report form in place of the ticket list, and below it the reports they have sent. They never see anyone else's, or the Inbox.

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

## My Reports

Under the form, **My Reports** lists what the person has sent, newest activity first. Each one shows whether it is a problem or a suggestion, and where it is up to:

- **Received:** it is in the Inbox and no one has started on it.
- **Being Looked At:** someone has started on it.
- **Resolved:** it is sorted, and the note you wrote when resolving it is shown to them.

Opening a report shows what they wrote and added, and any replies from you. They can reply from there. A reply on a Resolved report reopens it, so it comes back to your Inbox. A dot marks a reply they have not read yet.

Closed reports drop off their list. They never see ticket numbers, labels, priority, categories, internal notes or anything from the AI agent. Reports are matched to the person by their Home Assistant user, so a rename does not lose them. Reports from before this was added are matched by name, and only when the name belongs to one user; others stay with administrators.

Your replies to them are the ordinary comments on the ticket. Internal notes are never shown.

## Voice to Text

After the report is sent, the recording is turned into text by Home Assistant's speech-to-text and added to the description as a quote. If that fails, the ticket and the recording are kept. Turn it off in [Settings](/guide/settings).

## Limits

Up to 6 photos and one voice message of up to 3 minutes per report, and ten reports an hour for each person. The technical details are in [Under the Hood](/guide/under-the-hood).
