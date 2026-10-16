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

Status = Literal["new", "open", "in_progress", "waiting", "resolved", "closed"]
Type = Literal["issue", "request", "idea", "task", "question", "log"]
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
    keep = ("id", "title", "type", "status", "priority", "assignee", "requester", "tags", "updated_at", "resolution")
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
    type: Type | None = None,
    priority: Priority | None = None,
    assignee: str | None = None,
    tag: str | None = None,
    include_history: bool = False,
    limit: int = 50,
) -> dict[str, Any]:
    """List tickets (summaries, no body). status: a status, comma list, 'active' (default) or 'all'.
    `query` searches titles, descriptions, comments and resolutions. Tag `needs-review` marks imported
    open items whose real state still needs checking."""
    return _call("list_tickets", {
        "status": status, "query": query, "type": type, "priority": priority, "assignee": assignee,
        "tag": tag, "include_history": include_history, "limit": limit,
    })


@mcp.tool()
def get_ticket(ticket_id: int) -> dict[str, Any]:
    """Get one ticket with its full description, resolution, timeline and related tickets."""
    return _call("get_ticket", {"ticket_id": ticket_id})


@mcp.tool()
def create_ticket(
    title: str,
    description: str = "",
    type: Type = "issue",
    priority: Priority = "normal",
    tags: list[str] | None = None,
    entities: list[str] | None = None,
    assignee: str | None = None,
) -> dict[str, Any]:
    """Create a ticket. Search first (list_tickets with a query) so you don't file a duplicate.
    Description is markdown; list affected HA entity ids in `entities`."""
    return _brief(_call("create_ticket", {
        "title": title, "description": description, "type": type, "priority": priority,
        "tags": tags, "entities": entities, "assignee": assignee, "actor": ACTOR,
    }))


@mcp.tool()
def update_ticket(
    ticket_id: int,
    status: Status | None = None,
    priority: Priority | None = None,
    assignee: str | None = None,
    title: str | None = None,
    description: str | None = None,
    type: Type | None = None,
    add_tags: list[str] | None = None,
    remove_tags: list[str] | None = None,
    entities: list[str] | None = None,
) -> dict[str, Any]:
    """Change a ticket's fields. Only pass what should change; each change is logged on the timeline.
    To close a ticket use close_ticket so the resolution is recorded."""
    return _brief(_call("update_ticket", {
        "ticket_id": ticket_id, "status": status, "priority": priority, "assignee": assignee, "title": title,
        "description": description, "type": type, "add_tags": add_tags, "remove_tags": remove_tags,
        "entities": entities, "actor": ACTOR,
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
def list_tags() -> dict[str, Any]:
    """Every tag with id, name, colour and ticket count. Prefer an existing tag; an unknown name is created."""
    return _call("list_tags", {})


@mcp.tool()
def get_stats() -> dict[str, Any]:
    """Counts by status, urgent and unassigned counts, and every tag in use."""
    return _call("get_stats", {})


if __name__ == "__main__":
    mcp.run()
