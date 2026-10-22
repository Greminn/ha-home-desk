# Home Desk — guide for AI agents

You are connected to a Home Assistant instance that has the **Home Desk** integration. It is the household's issue tracker: problems, requests and ideas about the smart home and the systems around it (network, servers, media) are logged as tickets, and the manager and AI agents work them to resolution. Every change is recorded on the ticket's timeline, so history survives.

This guide is returned by `home_desk.get_guide`. You work tickets by calling the `home_desk.*` services (with response data). Through an HA MCP server that is usually a "call service" tool with `return_response: true`; from an automation it is `action:` with `response_variable`.

## Who raises tickets

The manager, household members (via the panel), AI agents (you), and Home Assistant automations. The requester is recorded on each ticket.

## Ticket fields

| Field | Values / meaning |
|---|---|
| `status` | `new` (untouched) → `in_progress` → `resolved` (fixed) → `closed`. If you reopen a resolved or closed ticket (`status: in_progress`) it goes back to `new`, so it lands in the manager's Inbox; the manager's own reopen stays `in_progress`. Status mostly moves by itself (but a ticket labelled **Enhancement** stays `new` while people and agents add notes; set `status: in_progress` when work on the idea really starts): a ticket goes from `new` to `in_progress` the first time anyone (you included) comments on it or changes it, and a resolved ticket closes automatically after the delay the manager set (default 7 days). So you rarely set status; use `close_ticket` to resolve. `open` is no longer a status (it is accepted and means `in_progress`). There is no "waiting" status: add the **Blocked** label instead |
| `priority` | `low`, `normal`, `high`, `urgent` (urgent = safety, security or whole-house outage) |
| `assignee` | In the panel a ticket is only ever assigned to an **AI agent** (stored as `ai:AI`, shown as "Queued for AI Agent"; it names no particular AI, so it is **not** `ai:Claude` or your own actor name), which hands it to you. Older tickets may still carry `ai:Claude`; that means the same. When you comment on a ticket assigned to you the assignee is cleared automatically (the ticket goes back to the manager). Free text still works for other uses; empty = unassigned |
| `category` | What part of the smart home the ticket is about (Home Assistant, Network, Lighting...). One or none. See `list_categories`. Home Assistant is built in; the others are made by the manager and by you |
| `labels` | coloured labels (see `list_labels`), as on GitHub. Built-ins: **Bug** (something is broken), **Enhancement** (an idea or request for the future), **Task** (something to do), **Question**, **History** (a record of past work, hidden from lists by default) and **Blocked** (waiting on a person, a part or a fix). Other labels mark topics. Pass names or ids; a new name is created automatically, so prefer existing labels. `needs-review` means "state not verified yet, e.g. imported from an older tracker: check whether it is really still open" |
| `entities` | HA entity ids the ticket concerns |
| `resolution` | the cause and the fix, written when closing |

A household member's report can carry **photos and a voice message**. `get_ticket` lists them under `attachments` (kind `image` or `audio`, with a `transcript` for a voice message once Home Assistant has written it out). The words are also quoted in the `description`, so you rarely need more. You can't open the files themselves; ask the manager if a photo matters.

## Services

All take an optional `actor`. **Always pass `actor` with your own name** (e.g. `"claude"`). Without it the token owner's name is recorded and your work will look like the human's.

| Service | Use |
|---|---|
| `list_tickets` | Summaries, no bodies. Filters: `status` (a status, comma list, `active` (default) or `all`), `query` (searches title, description, comments, resolution, labels, category; just a ticket number such as `244` or `#244` returns exactly that ticket), `priority`, `assignee` (`unassigned` allowed; **your queue is `ai:AI`**, and also check the older `ai:Claude`), `requester`, `label`, `category` (`none` for uncategorised), `include_history` (default false; tickets labelled History are left out), `limit`. |
| `get_ticket` | One ticket in full: description, resolution, timeline, related tickets. |
| `create_ticket` | `title` required; `description` (markdown), `priority`, `labels` (label it Bug, Enhancement, Task or Question), `category`, `entities`, `assignee`. |
| `update_ticket` | `ticket_id` plus only the fields to change: `status`, `priority`, `assignee`, `title`, `description`, `labels`, `add_labels`, `remove_labels`, `category` (empty to clear), `entities`. Each change is logged. |
| `add_comment` | `ticket_id`, `body` (markdown), `internal` (true = private note; requesters can't see it), `keep_assigned` (true = leave a ticket assigned to you in your queue; see item 9). |
| `close_ticket` | `ticket_id`, `resolution` (required), `status` (`resolved` default, or `closed`). |
| `link_tickets` | Mark two tickets as related: `ticket_id` and `other_id` (both required). |
| `merge_tickets` | Fold duplicates into one: `ticket_id` is the ticket to keep, `merge_ids` a list of the others (e.g. `[12, 15]`). Can't be undone; see Merging duplicates. |
| `list_labels` | Every label with id, name, colour, description and ticket count. |
| `create_label` | `name` (and optional `color`, `description`, `icon`). Check `list_labels` first so you don't add a near-duplicate. |
| `update_label` | `label` (name or id, required), then any of `name` (new name), `color`, `description`, `icon`; tickets keep the label. The built-in labels can't be changed. |
| `delete_label` | `label` (name or id). Only a label no ticket uses; one in use is refused (ask the manager to delete it in the panel). The built-in labels can't be deleted. |
| `list_categories` | Every category with id, name, icon and ticket count. |
| `create_category` | `name` (and an optional `icon`). Check `list_categories` first. A ticket's `category` must exist, so create it before using it. |
| `update_category` | `category` (name or id, required), then `name` (new name) and/or `icon`. Home Assistant can't be changed. |
| `delete_category` | `category` (name or id). Only a category no ticket uses; one in use is refused (ask the manager to delete it in the panel). |
| `get_stats` | Counts by status, urgent, unassigned and with-AI-agent counts, active tickets with no category, and the labels and categories with their counts. |
| `import_file` | Admin: `path` to a JSON file inside the config directory. Not for routine use. |
| `claim_run` | Runner only. `ticket_id`: take a run a person asked for (**Run**) or approved (**Proceed**). Fails if another runner has it. |
| `finish_run` | Runner only. `ticket_id`, `state` (`proposed`, `done` or `failed`), `body` (the comment). Fails if the run was stopped. A `proposed` result whose last "What I would change" section starts with "Nothing" is recorded as `done`: there is no go-ahead to give. `list_tickets` takes `run_state` (e.g. `requested,approved`) to find runs. |
| `get_guide` | This guide. No parameters. |
| `get_changelog` | The installed version and what changed, with any **Action:** or **Breaking:** notes. `since` (the last version you reviewed) returns only newer releases; check after Home Desk is updated. |

There is no service to delete a ticket, on purpose: a ticket is removed only by a person in the panel. To get rid of a ticket you made by mistake, close it with a resolution that says so and tell the manager.

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
8. **Categorise what you touch.** If a ticket has no category and you are sure what part of the home it is about, set it (`update_ticket` with `category`, creating the category first if it is new). If you are not sure, leave it empty.
9. **When a ticket is assigned to you.** The manager marks a ticket for an AI by assigning it to the AI agent (assignee `ai:AI`, shown as "Queued for AI Agent"); that is the queue for an AI the manager runs themselves, which is you. Find it with `list_tickets` `assignee: "ai:AI"` and again with `assignee: "ai:Claude"` (older marks). The value is the same whoever you are: it is not your name, so don't look for `ai:<your actor>`, and don't treat a ticket as someone else's because it says `ai:AI`. Your own comments are signed `ai:<your actor>`, which is a different thing from the queue. A comment from you hands the ticket back to the manager (clears the assignee), which is right for "I've answered, over to you". For evidence on a ticket you are meant to keep watching, pass `keep_assigned: true` (note or comment, internal or not) and it stays in your queue; otherwise re-assign it with `update_ticket` after commenting. Read their latest comment: it is your instruction. Reply with a comment; replying hands the ticket back to them automatically, so don't unassign it yourself. Propose rather than change the home's configuration unless they asked you to act. Comments signed "AI Review" come from a different, cheaper AI that Home Assistant asks when the manager presses Review with AI: it only saw what Home Desk sent it and checked nothing, so treat its review as leads to verify, not as findings, and don't be surprised that a ticket you are assigned has one. Your own comments are signed with your name (the `actor` set in your bridge, which Home Desk records as `ai:<name>`).
10. **Say what a ticket is about.** When you create or investigate a ticket, attach what it concerns: `entities` (entity ids), `devices` (device ids) and `areas` (area ids). People click through from the ticket to Home Assistant, and the built-in AI agent reads their states. A ticket may already carry them: look at `entities`, `devices` and `areas` before you start.
11. **Raising your own tickets:** when you notice a real problem while doing something else (a failing automation, an unavailable device), create a ticket with a clear title, evidence in the description, the affected `entities`, and a fair `priority`. Don't raise tickets for noise.
12. **Internal notes** (`internal: true`) are for working notes the requester need not see. Findings that the requester would want go in normal comments.

## Merging duplicates

If two tickets are really the same problem, fold one into the other with `merge_tickets` (`ticket_id` is the one to keep, `merge_ids` the others). Their comments, labels, files and any repairs they stand for move to the kept ticket and they close as "Merged into #N". It can't be undone, so be sure, and say in a comment on the kept ticket why you merged. Don't merge tickets that merely look alike: two devices failing for different reasons are two tickets.

## Tickets raised by Home Assistant Repairs

Home Desk can turn Home Assistant's own **Repairs** into tickets (an option on the integration, on by default). They have requester `Home Assistant`, source `Home Assistant Repairs`, the category Home Assistant, the labels Bug and Repair, and a priority from the repair's severity (critical → urgent, error → high, warning → normal). The ticket stays in step with the repair: it **resolves itself** (with the note "Cleared by Home Assistant") when HA stops reporting the repair, **reopens** if the repair comes back, and gets the **Blocked** label while the repair is ignored in HA. Repairs of the same kind (the same integration and issue type) share one ticket that lists what is affected; it resolves only when all of them clear. Like any resolved ticket it then closes by itself after the delay in Settings. So don't close these by hand just to tidy up: if the cause is fixed, the repair clears and the ticket follows. Your job is to investigate (comment findings, set a priority, link related tickets) and, if a repair is a false alarm, say so and leave it for the manager to ignore in HA. Changing a repair ticket's priority or labels is safe: Home Desk won't overwrite your triage.

## Conventions

- Timestamps are UTC ISO-8601; convert to the household's local time when speaking to people.
- Ticket text is markdown. Use backticks for entity ids.
- The panel (sidebar: Home Desk) shows the same data live; your changes appear there as you make them, under your `actor` name.
- A `home_desk_event` is fired on the event bus for every change (`created`, `updated`, `comment`, `note`, `closed`, and `assigned` when a ticket is handed to an AI agent). The data includes `with_agent` and `category`, so the manager can automate notifications.

## After updates

Home Desk changes over time. Call `home_desk.get_changelog` (with `since` set to the last version you reviewed) after it is updated, and act on any **Action:** or **Breaking:** notes. Remember the version it returns for next time.
