"""Changes the AI agent proposes to a ticket, for a person to apply with one click (pure Python, no Home Assistant imports).

The agent can't change anything itself. After its reply it may add one fenced block listing changes to the ticket (close it,
set the priority, add or remove a label, set the category). Home Desk takes the block out of the comment, checks every action
against a short list and the labels and categories that exist, and shows what is left as buttons.
"""

from __future__ import annotations

import json
import re
from typing import Any

BLOCK = re.compile(r"```home-desk-actions[ \t]*\n(.*?)```", re.S)
MAX_ACTIONS = 4
PRIORITIES = ("low", "normal", "high", "urgent")


def split_reply(text: str) -> tuple[str, list[Any]]:
    """The reply without its actions block, and the raw actions it held (an empty list if there was none or it isn't JSON)."""
    found = list(BLOCK.finditer(text or ""))
    if not found:
        return (text or "").strip(), []
    body = BLOCK.sub("", text).strip()
    try:
        raw = json.loads(found[-1].group(1))
    except ValueError:
        return body, []
    return body, raw if isinstance(raw, list) else []


def clean(raw: list[Any], *, labels: set[str], categories: set[str]) -> list[dict[str, Any]]:
    """The actions that are allowed: a known kind, sensible values, and labels and categories that exist (names, lower case)."""
    out: list[dict[str, Any]] = []
    for item in raw[:12]:
        if len(out) >= MAX_ACTIONS:
            break
        if not isinstance(item, dict):
            continue
        kind = item.get("action")
        if kind == "close":
            status = item.get("status", "resolved")
            resolution = str(item.get("resolution") or "").strip()
            if status in ("resolved", "closed"):
                out.append({"action": "close", "status": status, "resolution": resolution or "Closed on the AI Agent's proposal."})
        elif kind == "set_priority" and item.get("priority") in PRIORITIES:
            out.append({"action": "set_priority", "priority": item["priority"]})
        elif kind in ("add_label", "remove_label") and str(item.get("label", "")).strip().lower() in labels:
            out.append({"action": kind, "label": str(item["label"]).strip()})
        elif kind == "set_category" and str(item.get("category", "")).strip().lower() in categories:
            out.append({"action": "set_category", "category": str(item["category"]).strip()})
    return out
