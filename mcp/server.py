#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = ["mcp>=1.2,<2"]
# ///
"""MCP server that lets an AI agent work Home Desk in Home Assistant.

A thin bridge: every tool calls one of the integration's `home_desk.*`
services over HA's REST API and returns the service response.

Environment:
  HA_URL     base URL of Home Assistant, e.g. http://homeassistant.local:8123
  HA_TOKEN   a long-lived access token
  HOMEDESK_ACTOR   name recorded on the timeline for this agent (default "claude")
"""
from __future__ import annotations

import json
import os
import urllib.error
import urllib.request
from typing import Any, Literal

from mcp.server.fastmcp import FastMCP

HA_URL = os.environ.get("HA_URL", "").rstrip("/")
HA_TOKEN = os.environ.get("HA_TOKEN", "")
ACTOR = os.environ.get("HOMEDESK_ACTOR", "claude")

Status = Literal["new", "in_progress", "resolved", "closed"]
Priority = Literal["low", "normal", "high", "urgent"]

mcp = FastMCP(
    "home-desk",
    instructions="Tools for the Home Desk issue tracker in Home Assistant. Call get_guide first: "
    "it explains ticket fields, statuses and how to review, comment on and close tickets.",
)


def _call(service: str, data: dict[str, Any]) -> Any:
    if not HA_URL or not HA_TOKEN:
        raise RuntimeError("Set HA_URL and HA_TOKEN in the MCP server's environment")
    req = urllib.request.Request(
        f"{HA_URL}/api/services/home_desk/{service}?return_response",
        data=json.dumps({k: v for k, v in data.items() if v is not None}).encode(),
        headers={"Authorization": f"Bearer {HA_TOKEN}", "Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            body = json.load(resp)
    except urllib.error.HTTPError as err:
        detail = err.read().decode(errors="replace")[:500]
        raise RuntimeError(f"Home Assistant returned {err.code}: {detail}") from err
    return body.get("service_response", body) if isinstance(body, dict) else body


def _brief(ticket: dict[str, Any]) -> dict[str, Any]:
    """Drop bulky fields from a write response; callers can get_ticket for the lot."""
    keep = ("id", "title", "status", "priority", "assignee", "requester", "labels", "category", "updated_at", "resolution")
    return {k: ticket.get(k) for k in keep}


@mcp.tool()
def get_guide() -> str:
    """Read this first: how Home Desk works and how to work tickets well."""
    return _call("get_guide", {})["guide"]


@mcp.tool()
def get_changelog(since: str | None = None) -> dict[str, Any]:
    """Installed Home Desk version and what changed. Pass `since` (last version you reviewed) for only newer releases; check after updates."""
    return _call("get_changelog", {"since": since} if since else {})


@mcp.tool()
def list_tickets(
    status: str = "active",
    query: str | None = None,
    priority: Priority | None = None,
    assignee: str | None = None,
    label: str | None = None,
    category: str | None = None,
    include_history: bool = False,
    limit: int = 50,
) -> dict[str, Any]:
    """List tickets (summaries, no body). status: a status, comma list, 'active' (default) or 'all'.
    `query` searches titles, descriptions, comments and resolutions. Label `needs-review` marks imported
    open items whose real state still needs checking. Filter by `label` (Bug, Enhancement, Blocked...);
    tickets labelled History are left out unless include_history=True. `category` filters by what part of
    the home it is about (see list_categories); use "none" for tickets not categorised yet."""
    return _call("list_tickets", {
        "status": status, "query": query, "priority": priority, "assignee": assignee,
        "label": label, "category": category, "include_history": include_history, "limit": limit,
    })


@mcp.tool()
def get_ticket(ticket_id: int) -> dict[str, Any]:
    """Get one ticket with its full description, resolution, timeline and related tickets."""
    return _call("get_ticket", {"ticket_id": ticket_id})


@mcp.tool()
def create_ticket(
    title: str,
    description: str = "",
    priority: Priority = "normal",
    labels: list[str] | None = None,
    category: str | None = None,
    entities: list[str] | None = None,
    devices: list[str] | None = None,
    areas: list[str] | None = None,
    assignee: str | None = None,
) -> dict[str, Any]:
    """Create a ticket. Search first (list_tickets with a query) so you don't file a duplicate.
    Description is markdown; list what it is about in `entities` (HA entity ids), `devices` (device ids)
    and `areas` (area ids), so people can click through and the AI agent knows where to look. Label it Bug (something is
    broken), Enhancement (an idea or request), Task or Question; see list_labels. Give it a `category`
    (what part of the home it is about; see list_categories) when you are sure; it must already exist."""
    return _brief(_call("create_ticket", {
        "title": title, "description": description, "priority": priority,
        "labels": labels, "category": category, "entities": entities, "devices": devices, "areas": areas,
        "assignee": assignee, "actor": ACTOR,
    }))


@mcp.tool()
def update_ticket(
    ticket_id: int,
    status: Status | None = None,
    priority: Priority | None = None,
    assignee: str | None = None,
    title: str | None = None,
    description: str | None = None,
    add_labels: list[str] | None = None,
    remove_labels: list[str] | None = None,
    category: str | None = None,
    entities: list[str] | None = None,
    devices: list[str] | None = None,
    areas: list[str] | None = None,
) -> dict[str, Any]:
    """Change a ticket's fields. `entities`, `devices` and `areas` replace what the ticket is about. Only pass what should change; each change is logged on the timeline.
    A ticket moves from new to in_progress by itself when you act on it, so you rarely set status.
    To close a ticket use close_ticket so the resolution is recorded. To mark a ticket as waiting on
    something, add the Blocked label."""
    return _brief(_call("update_ticket", {
        "ticket_id": ticket_id, "status": status, "priority": priority, "assignee": assignee, "title": title,
        "description": description, "add_labels": add_labels, "remove_labels": remove_labels,
        "category": category, "entities": entities, "devices": devices, "areas": areas, "actor": ACTOR,
    }))


@mcp.tool()
def add_comment(ticket_id: int, body: str, internal: bool = False) -> dict[str, Any]:
    """Comment on a ticket (markdown). internal=True makes a private note the requester can't see.
    Use comments for findings, what you checked and what you changed."""
    return _brief(_call("add_comment", {"ticket_id": ticket_id, "body": body, "internal": internal, "actor": ACTOR}))


@mcp.tool()
def close_ticket(ticket_id: int, resolution: str, status: Literal["resolved", "closed"] = "resolved") -> dict[str, Any]:
    """Resolve a ticket with resolution notes: the cause and what fixed it, so the next person can find it.
    Use status='closed' for won't-fix / superseded / no longer relevant."""
    return _brief(_call("close_ticket", {"ticket_id": ticket_id, "resolution": resolution, "status": status, "actor": ACTOR}))


@mcp.tool()
def link_tickets(ticket_id: int, other_id: int) -> dict[str, Any]:
    """Mark two tickets as related (shown on both)."""
    return _brief(_call("link_tickets", {"ticket_id": ticket_id, "other_id": other_id, "actor": ACTOR}))


@mcp.tool()
def list_labels() -> dict[str, Any]:
    """Every label with id, name, colour and ticket count. Prefer an existing label; an unknown name is created."""
    return _call("list_labels", {})


@mcp.tool()
def merge_tickets(ticket_id: int, merge_ids: list[int]) -> dict[str, Any]:
    """Fold duplicate tickets into `ticket_id`: the others' comments, labels and files move over and they are closed as merged. Only for tickets that are really the same problem; it can't be undone."""
    return _brief(_call("merge_tickets", {"ticket_id": ticket_id, "merge_ids": merge_ids, "actor": ACTOR}))


@mcp.tool()
def create_label(name: str, color: str | None = None, description: str | None = None, icon: str | None = None) -> dict[str, Any]:
    """Create a label such as Zigbee or Needs review. Check list_labels first so you don't add a near-duplicate. `color` is a Home Assistant colour name (teal, red...); one is picked if you leave it out."""
    return _call("create_label", {"name": name, "color": color, "description": description, "icon": icon, "actor": ACTOR})


@mcp.tool()
def update_label(label: str, name: str | None = None, color: str | None = None, description: str | None = None, icon: str | None = None) -> dict[str, Any]:
    """Rename a label or change its colour, icon or description; tickets keep it. The built-in labels can't be changed."""
    return _call("update_label", {"label": label, "name": name, "color": color, "description": description, "icon": icon, "actor": ACTOR})


@mcp.tool()
def delete_label(label: str) -> dict[str, Any]:
    """Delete a label nothing uses. A label in use is refused: remove it from those tickets first. The built-in labels can't be deleted."""
    return _call("delete_label", {"label": label, "actor": ACTOR})


@mcp.tool()
def list_categories() -> dict[str, Any]:
    """Every category (what part of the home a ticket is about) with id, name, icon and ticket count."""
    return _call("list_categories", {})


@mcp.tool()
def create_category(name: str, icon: str | None = None) -> dict[str, Any]:
    """Create a category such as Network or Cameras. Check list_categories first so you don't add a near-duplicate."""
    return _call("create_category", {"name": name, "icon": icon, "actor": ACTOR})


@mcp.tool()
def update_category(category: str, name: str | None = None, icon: str | None = None) -> dict[str, Any]:
    """Rename a category or change its icon. The built-in Home Assistant category can't be changed."""
    return _call("update_category", {"category": category, "name": name, "icon": icon, "actor": ACTOR})


@mcp.tool()
def delete_category(category: str) -> dict[str, Any]:
    """Delete a category nothing uses. A category in use is refused: move its tickets first."""
    return _call("delete_category", {"category": category, "actor": ACTOR})


@mcp.tool()
def get_stats() -> dict[str, Any]:
    """Counts by status, urgent, unassigned and with-AI-agent counts, tickets with no category, and every label and category."""
    return _call("get_stats", {})


if __name__ == "__main__":
    mcp.run()
