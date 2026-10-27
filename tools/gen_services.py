#!/usr/bin/env python3
"""Generate services.yaml, strings.json and translations/en.json from one source.

HA reads service/field names and descriptions from services.yaml for custom
integrations (and from translations for core UI), so all three must agree.
Edit the SERVICES table here, then run: python3 tools/gen_services.py
"""
import json
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / "custom_components" / "home_desk"
PRIOS = ["low", "normal", "high", "urgent"]
STATUSES = ["new", "in_progress", "resolved", "closed"]

TEXT = {"text": {}}
LONG = {"text": {"multiline": True}}
MULTI = {"text": {"multiple": True}}
BOOL = {"boolean": {}}
ID = {"number": {"min": 1, "mode": "box"}}


def sel(options):
    return {"select": {"options": options}}


ACTOR = ("Actor", "Who is acting, recorded on the timeline. AI agents: pass your own name (e.g. claude), otherwise the token owner's name is recorded.", TEXT, False, None)
TID = ("Ticket ID", "The ticket's number.", ID, True, None)

# service -> (name, description, {field: (name, description, selector, required, example)})
SERVICES = {
    "get_guide": ("Get guide", "START HERE if you are an AI agent. Returns the usage guide for Home Desk: what it is, ticket fields and statuses, how to review, comment on, update and close tickets, and conventions to follow.", {}),
    "get_changelog": ("Get changelog", "Return the installed Home Desk version and its changelog: what changed, and any **Action:** or **Breaking:** notes. Pass `since` (the last version you reviewed) to get only newer releases. Call after Home Desk is updated.", {
        "since": ("Since version", "Only include releases newer than this version. The Unreleased section is always included.", TEXT, False, "0.1.0"),
    }),
    "list_labels": ("List labels", "Return every label with its id, name, colour, description and how many tickets use it. Prefer an existing label over inventing a new one; a label name you use that doesn't exist is created automatically. Built-in labels: Bug, Enhancement, Task, Question, History and Blocked. (What part of the home a ticket is about is a category, see list_categories.)", {}),
    "create_label": ("Create label", "Create a label, for example Zigbee or Needs review. Check list_labels first so you don't add a near-duplicate. Pass `actor` with your own name.", {
        "name": ("Name", "The label's name.", TEXT, True, "Zigbee"),
        "color": ("Colour", "One of Home Assistant's colour names, e.g. teal. Picked automatically if left out.", TEXT, False, "teal"),
        "description": ("Description", "What the label means.", TEXT, False, None),
        "icon": ("Icon", "An optional icon such as mdi:zigbee.", TEXT, False, None),
        "actor": ACTOR}),
    "update_label": ("Update label", "Rename a label or change its colour, icon or description. Tickets keep the label when it is renamed. The built-in labels (Bug, Enhancement, Task, Question, History, Blocked) can't be changed.", {
        "label": ("Label", "The label's name or id.", TEXT, True, "Zigbee"),
        "name": ("New name", "A new name.", TEXT, False, None),
        "color": ("Colour", "A new colour name, e.g. teal.", TEXT, False, None),
        "description": ("Description", "A new description.", TEXT, False, None),
        "icon": ("Icon", "A new icon such as mdi:zigbee.", TEXT, False, None),
        "actor": ACTOR}),
    "delete_label": ("Delete label", "Delete a label that no ticket uses. A label in use is refused: remove it from those tickets first, or ask the manager to delete it in the panel. The built-in labels can't be deleted.", {
        "label": ("Label", "The label's name or id.", TEXT, True, "Zigbee"),
        "actor": ACTOR}),
    "list_categories": ("List categories", "Return every category with its id, name, icon and how many tickets use it. A category says what part of the smart home a ticket is about (Home Assistant, Network, Lighting...). A ticket has at most one. Home Assistant is built in.", {}),
    "create_category": ("Create category", "Create a category, for example Network or Cameras. Check list_categories first. Pass `actor` with your own name.", {
        "name": ("Name", "The category's name.", TEXT, True, "Network"),
        "icon": ("Icon", "An optional icon such as mdi:lan.", TEXT, False, "mdi:lan"),
        "actor": ACTOR}),
    "update_category": ("Update category", "Rename a category or change its icon. The built-in Home Assistant category can't be changed.", {
        "category": ("Category", "The category's name or id.", TEXT, True, "Network"),
        "name": ("New name", "A new name.", TEXT, False, None),
        "icon": ("Icon", "A new icon such as mdi:lan.", TEXT, False, None),
        "actor": ACTOR}),
    "delete_category": ("Delete category", "Delete a category that no ticket uses. A category in use is refused: move its tickets first, or ask the manager to delete it in the panel. The built-in Home Assistant category can't be deleted.", {
        "category": ("Category", "The category's name or id.", TEXT, True, "Network"),
        "actor": ACTOR}),
    "get_stats": ("Get stats", "Return ticket counts by status, urgent, unassigned and with-AI-agent counts, how many active tickets have no category, and every label and category (with counts). A good first call to see what needs attention.", {}),
    "list_tickets": ("List tickets", "List ticket summaries (no bodies); use get_ticket for the full ticket. Defaults to active tickets, excluding those labelled History. Label `needs-review` marks tickets whose state has not been verified yet.", {
        "status": ("Status", "A status, a comma-separated list, `active` (new and in_progress; the default) or `all`.", TEXT, False, "active"),
        "query": ("Query", "Search text across title, description, comments, resolution, labels and entities.", TEXT, False, None),
        "priority": ("Priority", "Only this priority.", sel(PRIOS), False, None),
        "assignee": ("Assignee", "Only this assignee, or `unassigned`.", TEXT, False, None),
        "requester": ("Requester", "Only tickets raised by this person.", TEXT, False, None),
        "label": ("Label", "Only tickets with this label (name or id), e.g. Bug, Enhancement or Blocked.", TEXT, False, None),
        "category": ("Category", "Only tickets in this category (name or id), or `none` for tickets with no category yet.", TEXT, False, None),
        "include_history": ("Include history", "Include tickets labelled History (records of past work). Default false.", BOOL, False, None),
        "run_state": ("Run state", "Only tickets whose AI Agent run is in this state, or a comma-separated list: requested, running, proposed, approved, done, failed, stopped, dismissed. The runner polls for `requested` and `approved`.", TEXT, False, "requested,approved"),
        "limit": ("Limit", "Maximum tickets to return (default 100).", {"number": {"min": 1, "max": 1000, "mode": "box"}}, False, None)}),
    "raise_issue": ("Raise issue", "For automations: open a ticket for a problem, once, however often it is reported. The key says which problem it is. Nothing open for the key: a ticket is created. One already open: nothing happens (or one comment an hour with `on_existing: comment`), and a higher priority is taken over. A resolved ticket for the key is reopened. The ticket says which automation or script raised it. Returns `result` (created, found, reopened or commented) and the ticket. Pair it with clear_issue.", {
        "key": ("Key", "A short name for the problem, the same every time it is reported, e.g. soil-probe-garden-dry. Trimmed and lower-cased, at most 80 characters. It never touches tickets made from Home Assistant Repairs.", TEXT, True, "soil-probe-garden-dry"),
        "title": ("Title", "Short summary of the problem.", TEXT, True, "Garden soil probe is dry"),
        "description": ("Description", "Details in markdown. Used as the comment when an open ticket is raised again with `on_existing: comment`, and when a resolved one reopens.", LONG, False, None),
        "priority": ("Priority", "low, normal, high or urgent. An open ticket only ever goes up.", sel(PRIOS), False, None),
        "on_existing": ("If already open", "ignore (the default) does nothing; comment adds a comment, at most once an hour for each key.", sel(["ignore", "comment"]), False, None),
        "labels": ("Labels", "Label names or ids. Names that don't exist yet are created.", MULTI, False, None),
        "category": ("Category", "What part of the home this is about (see list_categories). It must already exist.", TEXT, False, None),
        "entities": ("Entities", "Home Assistant entity ids this ticket concerns.", MULTI, False, None),
        "devices": ("Devices", "Home Assistant device ids this ticket concerns.", MULTI, False, None),
        "areas": ("Areas", "Home Assistant area ids this ticket concerns.", MULTI, False, None),
        "actor": ACTOR}),
    "clear_issue": ("Clear issue", "For automations: the problem raised with raise_issue is over. Resolves the open ticket for the key with a note. If no ticket is open for the key, nothing happens and it is not an error. Returns `result` (cleared or none).", {
        "key": ("Key", "The key used with raise_issue.", TEXT, True, "soil-probe-garden-dry"),
        "resolution": ("Resolution", "What to record. A default note is used if left out.", LONG, False, None),
        "actor": ACTOR}),
    "get_ticket": ("Get ticket", "Return one ticket in full: description, resolution, labels, entities, timeline of comments and changes, and related tickets.", {"ticket_id": TID}),
    "create_ticket": ("Create ticket", "Create a ticket and return it. Search first (list_tickets with a query) to avoid duplicates. AI agents: call get_guide first and pass `actor` with your own name.", {
        "title": ("Title", "Short summary of the problem, request or idea.", TEXT, True, "Hallway light didn't turn on"),
        "description": ("Description", "Details in markdown: what happened, evidence, what was expected.", LONG, False, None),
        "priority": ("Priority", "low, normal, high or urgent (urgent = safety, security or whole-house outage).", sel(PRIOS), False, None),
        "requester": ("Requester", "Who raised it. Defaults to the actor.", TEXT, False, None),
        "assignee": ("Assignee", "Who is working on it. Leave empty for unassigned. Assigning a ticket to an AI agent (name starting `ai:`) hands it to that agent; a `home_desk_event` of kind `assigned` is fired.", TEXT, False, None),
        "labels": ("Labels", "Label names or ids, e.g. Bug, Enhancement, Task, Question. Names that don't exist yet are created.", MULTI, False, None),
        "category": ("Category", "What part of the home this is about (see list_categories), e.g. Network. It must already exist: create_category first if it is new. Leave empty if unsure.", TEXT, False, None),
        "entities": ("Entities", "Home Assistant entity ids this ticket concerns. People can click through to them.", MULTI, False, None),
        "devices": ("Devices", "Home Assistant device ids (from the device registry) this ticket concerns; the AI agent looks at all of a device's entities.", MULTI, False, None),
        "areas": ("Areas", "Home Assistant area ids this ticket concerns, when it is about a place rather than one thing.", MULTI, False, None),
        "actor": ACTOR}),
    "update_ticket": ("Update ticket", "Change a ticket's fields. Pass only what should change; every change is logged on the timeline. To close a ticket use close_ticket so a resolution is recorded.", {
        "ticket_id": TID,
        "title": ("Title", "New title.", TEXT, False, None),
        "description": ("Description", "New description (markdown).", LONG, False, None),
        "status": ("Status", "new, in_progress, resolved or closed. A ticket moves from new to in_progress by itself the first time anyone acts on it, and a resolved ticket closes by itself after the delay in Settings, so you rarely need this. To mark a ticket as waiting on something, add the Blocked label. (`open` is accepted and means in_progress.)", sel(STATUSES), False, None),
        "priority": ("Priority", "New priority.", sel(PRIOS), False, None),
        "assignee": ("Assignee", "New assignee; empty to unassign. When an AI agent a ticket is assigned to comments on it, the ticket is handed back (the assignee is cleared) automatically.", TEXT, False, None),
        "labels": ("Labels", "Replace all labels with this list.", MULTI, False, None),
        "category": ("Category", "Move the ticket to this category (name or id, from list_categories); empty to clear.", TEXT, False, None),
        "add_labels": ("Add labels", "Label names or ids to add. Unknown names are created.", MULTI, False, None),
        "remove_labels": ("Remove labels", "Label names or ids to remove.", MULTI, False, None),
        "entities": ("Entities", "Replace the linked entity ids.", MULTI, False, None),
        "devices": ("Devices", "Replace the linked device ids.", MULTI, False, None),
        "areas": ("Areas", "Replace the linked area ids.", MULTI, False, None),
        "resolution": ("Resolution", "Resolution notes.", LONG, False, None),
        "actor": ACTOR}),
    "add_comment": ("Add comment", "Add a comment to a ticket's timeline. Use it to record findings: what you checked, what you found, with times and values.", {
        "ticket_id": TID,
        "body": ("Comment", "The comment, in markdown.", LONG, True, None),
        "internal": ("Internal note", "True makes a private note that the requester can't see.", BOOL, False, None),
        "keep_assigned": ("Keep assigned", "True leaves the ticket queued for the AI agent after this comment instead of handing it back to the manager, for evidence on a ticket the agent is meant to keep watching. Default false: an agent's comment hands the ticket back.", BOOL, False, None),
        "actor": ACTOR}),
    "claim_run": ("Claim run", "Experimental, for a runner that is not part of the first release. The runner takes a run that a person asked for (Run AI Agent Now, a read-only review) or approved (Proceed, the change). Only one runner can take it; a second call fails. Pass `actor` with the runner's name.", {
        "ticket_id": TID,
        "actor": ACTOR}),
    "note_run": ("Note run", "Experimental, for a runner that is not part of the first release. The runner says what it is doing right now, shown in the ticket's working indicator (for example \"Using get_ticket\"). Only while it is running the ticket. Pass `actor` with the runner's name.", {
        "ticket_id": TID,
        "note": ("Note", "A few words about the current step, at most 120 characters.", TEXT, True, "Using get_ticket"),
        "actor": ACTOR}),
    "finish_run": ("Finish run", "Experimental, for a runner that is not part of the first release. The runner reports back on a claimed run, as a comment from the agent. `proposed`: what it found and what it would change, which waits for a person to press Proceed. `done`: the approved change was made. `failed`: why it could not. Fails if the run was stopped.", {
        "ticket_id": TID,
        "state": ("State", "proposed, done or failed.", sel(["proposed", "done", "failed"]), True, "proposed"),
        "body": ("Comment", "What it found and would change, what it did, or why it failed, in markdown.", LONG, True, None),
        "actor": ACTOR}),
    "close_ticket": ("Close ticket", "Resolve or close a ticket with resolution notes (the cause and the fix). Only close when you are confident; otherwise comment and leave it open.", {
        "ticket_id": TID,
        "resolution": ("Resolution", "What the cause was and what fixed it.", LONG, True, None),
        "status": ("Status", "`resolved` (fixed; the default) or `closed` (won't fix, superseded or no longer relevant).", sel(["resolved", "closed"]), False, None),
        "actor": ACTOR}),
    "link_tickets": ("Link tickets", "Mark two tickets as related; shown on both.", {
        "ticket_id": ("Ticket ID", "One ticket.", ID, True, None),
        "other_id": ("Other ticket ID", "The related ticket.", ID, True, None),
        "actor": ACTOR}),
    "merge_tickets": ("Merge tickets", "Fold duplicate tickets into one. `ticket_id` is the ticket to keep; the tickets in `merge_ids` have their comments, description, labels, files and linked repairs moved onto it and are closed as merged. Do this for tickets that are really the same problem; it can't be undone.", {
        "ticket_id": ("Ticket to keep", "The ticket the others are merged into.", ID, True, None),
        "merge_ids": ("Tickets to merge", "Numbers of the tickets to fold in, e.g. [12, 15].", {"object": {}}, True, [12, 15]),
        "actor": ACTOR}),
}


def yaml_scalar(v):
    return json.dumps(v, ensure_ascii=False)  # JSON strings/numbers/bools are valid YAML


def yaml_flow(v):
    return json.dumps(v, ensure_ascii=False)  # JSON flow style is valid YAML


def write_yaml():
    lines = []
    for svc, (name, desc, fields) in SERVICES.items():
        lines += [f"{svc}:", f"  name: {yaml_scalar(name)}", f"  description: {yaml_scalar(desc)}"]
        if fields:
            lines.append("  fields:")
            for f, (fname, fdesc, selector, required, example) in fields.items():
                lines += [f"    {f}:", f"      name: {yaml_scalar(fname)}", f"      description: {yaml_scalar(fdesc)}"]
                if required:
                    lines.append("      required: true")
                if example is not None:
                    lines.append(f"      example: {yaml_scalar(example)}")
                lines.append(f"      selector: {yaml_flow(selector)}")
    (OUT / "services.yaml").write_text("\n".join(lines) + "\n", encoding="utf-8")


def write_json():
    doc = {
        "config": {
            "step": {"user": {"title": "Home Desk", "description": "An issue tracker for your smart home, for the manager, the household and AI agents."}},
            "abort": {"single_instance_allowed": "Home Desk is already set up."},
        },
        "options": {
            "step": {
                "init": {
                    "title": "Repairs",
                    "description": "Home Desk opens a ticket for each Home Assistant repair, resolves it when Home Assistant clears the repair, and reopens it if the repair comes back. Turn this on or off in Home Desk's Settings page. Here you can skip noisy integrations.",
                    "data": {
                        "repairs_ignored_domains": "Integrations to skip",
                    },
                    "data_description": {
                        "repairs_ignored_domains": "Integration domains (for example `hacs`) whose repairs should not become tickets. Useful for noisy ones.",
                    },
                }
            }
        },
        "services": {
            svc: {"name": n, "description": d, **({"fields": {f: {"name": v[0], "description": v[1]} for f, v in fl.items()}} if fl else {})}
            for svc, (n, d, fl) in SERVICES.items()
        },
    }
    for p in ("strings.json", "translations/en.json"):
        (OUT / p).write_text(json.dumps(doc, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


if __name__ == "__main__":
    write_yaml()
    write_json()
    print("wrote services.yaml, strings.json, translations/en.json")
