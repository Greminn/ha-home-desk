# Home Desk — guide for AI agents

You are connected to a Home Assistant instance that has the **Home Desk** integration. It is the household's issue tracker: problems, requests and ideas about the smart home and the systems around it (network, servers, media) are logged as tickets, and the manager and AI agents work them to resolution. Every change is recorded on the ticket's timeline, so history survives.

This guide is returned by `home_desk.get_guide`. You work tickets by calling the `home_desk.*` services (with response data). Through an HA MCP server that is usually a "call service" tool with `return_response: true`; from an automation it is `action:` with `response_variable`.

## Who raises tickets

The manager, household members (via the panel), AI agents (you), and Home Assistant automations. The requester is recorded on each ticket.

## Ticket fields

| Field | Values / meaning |
|---|---|
| `status` | `new` (untriaged) → `open` (accepted) → `in_progress` → `resolved` (fixed) / `closed` (won't fix, superseded, no longer relevant). There is no "waiting" status: add the **Blocked** label instead |
| `priority` | `low`, `normal`, `high`, `urgent` (urgent = safety, security or whole-house outage) |
| `assignee` | free text, e.g. a person's name or an agent's name; empty = unassigned |
| `labels` | coloured labels (see `list_labels`), as on GitHub. Built-ins: **Bug** (something is broken), **Enhancement** (an idea or request for the future), **Task** (something to do), **Question**, **History** (a record of past work, hidden from lists by default), **Blocked** (waiting on a person, a part or a fix) and **Home Assistant** (the default when none is given). Other labels mark systems (network, servers...) or topics. Pass names or ids; a new name is created automatically, so prefer existing labels. `needs-review` means "state not verified yet, e.g. imported from an older tracker: check whether it is really still open" |
| `entities` | HA entity ids the ticket concerns |
| `resolution` | the cause and the fix, written when closing |

## Services

All take an optional `actor`. **Always pass `actor` with your own name** (e.g. `"claude"`). Without it the token owner's name is recorded and your work will look like the human's.

| Service | Use |
|---|---|
| `list_tickets` | Summaries, no bodies. Filters: `status` (a status, comma list, `active` (default) or `all`), `query` (searches title, description, comments, resolution, labels), `priority`, `assignee` (`unassigned` allowed), `requester`, `label`, `include_history` (default false; tickets labelled History are left out), `limit`. |
| `get_ticket` | One ticket in full: description, resolution, timeline, related tickets. |
| `create_ticket` | `title` required; `description` (markdown), `priority`, `labels` (label it Bug, Enhancement, Task or Question), `entities`, `assignee`. |
| `update_ticket` | `ticket_id` plus only the fields to change: `status`, `priority`, `assignee`, `title`, `description`, `labels`, `add_labels`, `remove_labels`, `entities`. Each change is logged. |
| `add_comment` | `ticket_id`, `body` (markdown), `internal` (true = private note; requesters can't see it). |
| `close_ticket` | `ticket_id`, `resolution` (required), `status` (`resolved` default, or `closed`). |
| `link_tickets` | Mark two tickets as related. |
| `list_labels` | Every label with id, name, colour, description and ticket count. |
| `get_stats` | Counts by status, urgent and unassigned counts, and the labels with their counts. |
| `import_file` | Admin: bulk import from a JSON file inside the config directory. Not for routine use. |

## How to work tickets well

1. **Orient.** `get_stats`, then `list_tickets` (default is active tickets). Use `query` for a topic.
2. **Search before you create.** A duplicate wastes the manager's time. If a ticket exists, comment on it instead.
3. **Verify, don't assume.** A ticket's text may be out of date. Check current entity states, history, logs and config before concluding anything. Read-only checks first; do not change the home's configuration unless the manager has asked you to.
4. **Record what you did.** Use `add_comment` for findings: what you checked, what you found, with times and values. A future reader should not have to repeat your work.
5. **Triage a `needs-review` ticket** one of three ways:
   - no longer a problem → `close_ticket` with the cause and what changed (`closed` if it was superseded or is no longer relevant);
   - still a problem → comment with current evidence, then `update_ticket` with `remove_labels: ["needs-review"]` and, if useful, `add_labels: ["reviewed"]`, a priority, or `status: "in_progress"`;
   - blocked on a person or event → `add_labels: ["Blocked"]`, and say in the comment exactly what it is waiting for. Remove the label when it is unblocked.
6. **Be conservative.** If you are not sure it is fixed, comment and leave it open. Never close a ticket to tidy the list.
7. **Closing:** write the resolution so someone searching for the same symptom next year finds the answer: the cause, the fix, and any follow-up.
8. **Raising your own tickets:** when you notice a real problem while doing something else (a failing automation, an unavailable device), create a ticket with a clear title, evidence in the description, the affected `entities`, and a fair `priority`. Don't raise tickets for noise.
9. **Internal notes** (`internal: true`) are for working notes the requester need not see. Findings that the requester would want go in normal comments.

## Tickets raised by Home Assistant Repairs

Home Desk can turn Home Assistant's own **Repairs** into tickets (an option on the integration, on by default). They have requester `Home Assistant`, source `Home Assistant Repairs`, the labels Bug, Home Assistant and Repair, and a priority from the repair's severity (critical → urgent, error → high, warning → normal). The ticket stays in step with the repair: it **resolves itself** (with the note "Cleared by Home Assistant") when HA stops reporting the repair, **reopens** if the repair comes back, and gets the **Blocked** label while the repair is ignored in HA. So don't close these by hand just to tidy up: if the cause is fixed, the repair clears and the ticket follows. Your job is to investigate (comment findings, set a priority, link related tickets) and, if a repair is a false alarm, say so and leave it for the manager to ignore in HA. Changing a repair ticket's priority or labels is safe: Home Desk won't overwrite your triage.

## Conventions

- Timestamps are UTC ISO-8601; convert to the household's local time when speaking to people.
- Ticket text is markdown. Use backticks for entity ids.
- The panel (sidebar: Home Desk) shows the same data live; your changes appear there as you make them, under your `actor` name.
- A `home_desk_event` is fired on the event bus for every change (`created`, `updated`, `comment`, `note`, `closed`), so the manager can automate notifications.

## After updates

Home Desk changes over time. Call `home_desk.get_changelog` (with `since` set to the last version you reviewed) after it is updated, and act on any **Action:** or **Breaking:** notes. Remember the version it returns for next time.
