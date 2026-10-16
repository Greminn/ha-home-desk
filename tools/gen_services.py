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
STATUSES = ["new", "open", "in_progress", "resolved", "closed"]

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
    "list_labels": ("List labels", "Return every label with its id, name, colour, description and how many tickets use it. Prefer an existing label over inventing a new one; a label name you use that doesn't exist is created automatically. Built-in labels: Bug, Enhancement, Task, Question, History, Blocked and Home Assistant.", {}),
    "get_stats": ("Get stats", "Return ticket counts by status, urgent and unassigned counts, and every label (with colour and count). A good first call to see what needs attention.", {}),
    "list_tickets": ("List tickets", "List ticket summaries (no bodies); use get_ticket for the full ticket. Defaults to active tickets, excluding those labelled History. Label `needs-review` marks tickets whose state has not been verified yet.", {
        "status": ("Status", "A status, a comma-separated list, `active` (new, open, in_progress; the default) or `all`.", TEXT, False, "active"),
        "query": ("Query", "Search text across title, description, comments, resolution, labels and entities.", TEXT, False, None),
        "priority": ("Priority", "Only this priority.", sel(PRIOS), False, None),
        "assignee": ("Assignee", "Only this assignee, or `unassigned`.", TEXT, False, None),
        "requester": ("Requester", "Only tickets raised by this person.", TEXT, False, None),
        "label": ("Label", "Only tickets with this label (name or id), e.g. Bug, Enhancement or Blocked.", TEXT, False, None),
        "include_history": ("Include history", "Include tickets labelled History (records of past work). Default false.", BOOL, False, None),
        "limit": ("Limit", "Maximum tickets to return (default 100).", {"number": {"min": 1, "max": 1000, "mode": "box"}}, False, None)}),
    "get_ticket": ("Get ticket", "Return one ticket in full: description, resolution, labels, entities, timeline of comments and changes, and related tickets.", {"ticket_id": TID}),
    "create_ticket": ("Create ticket", "Create a ticket and return it. Search first (list_tickets with a query) to avoid duplicates. AI agents: call get_guide first and pass `actor` with your own name.", {
        "title": ("Title", "Short summary of the problem, request or idea.", TEXT, True, "Hallway light didn't turn on"),
        "description": ("Description", "Details in markdown: what happened, evidence, what was expected.", LONG, False, None),
        "priority": ("Priority", "low, normal, high or urgent (urgent = safety, security or whole-house outage).", sel(PRIOS), False, None),
        "requester": ("Requester", "Who raised it. Defaults to the actor.", TEXT, False, None),
        "assignee": ("Assignee", "Who should work on it. Leave empty for unassigned.", TEXT, False, None),
        "labels": ("Labels", "Label names or ids, e.g. Bug, Enhancement, Task, Question. Names that don't exist yet are created. Defaults to Home Assistant when omitted.", MULTI, False, None),
        "entities": ("Entities", "Home Assistant entity ids this ticket concerns.", MULTI, False, None),
        "actor": ACTOR}),
    "update_ticket": ("Update ticket", "Change a ticket's fields. Pass only what should change; every change is logged on the timeline. To close a ticket use close_ticket so a resolution is recorded.", {
        "ticket_id": TID,
        "title": ("Title", "New title.", TEXT, False, None),
        "description": ("Description", "New description (markdown).", LONG, False, None),
        "status": ("Status", "new, open, in_progress, resolved or closed. To mark a ticket as waiting on something, add the Blocked label.", sel(STATUSES), False, None),
        "priority": ("Priority", "New priority.", sel(PRIOS), False, None),
        "assignee": ("Assignee", "New assignee; empty to unassign.", TEXT, False, None),
        "labels": ("Labels", "Replace all labels with this list.", MULTI, False, None),
        "add_labels": ("Add labels", "Label names or ids to add. Unknown names are created.", MULTI, False, None),
        "remove_labels": ("Remove labels", "Label names or ids to remove.", MULTI, False, None),
        "entities": ("Entities", "Replace the linked entity ids.", MULTI, False, None),
        "resolution": ("Resolution", "Resolution notes.", LONG, False, None),
        "actor": ACTOR}),
    "add_comment": ("Add comment", "Add a comment to a ticket's timeline. Use it to record findings: what you checked, what you found, with times and values.", {
        "ticket_id": TID,
        "body": ("Comment", "The comment, in markdown.", LONG, True, None),
        "internal": ("Internal note", "True makes a private note that the requester can't see.", BOOL, False, None),
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
    "import_file": ("Import file", "Admin: bulk-import tickets from a JSON file inside the config directory. Idempotent: tickets whose source_key already exists are skipped.", {
        "path": ("Path", "Path to the JSON file, inside the Home Assistant config directory.", TEXT, True, "/config/home_desk_import.json"),
        "actor": ("Actor", "Who is importing.", TEXT, False, None)}),
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
                    "description": "Home Desk can open a ticket for each Home Assistant repair, resolve it when Home Assistant clears the repair, and reopen it if the repair comes back.",
                    "data": {
                        "repairs_to_tickets": "Create tickets from Home Assistant repairs",
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
