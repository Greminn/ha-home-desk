"""Taking secrets out of text before it is sent to an AI provider (pure Python, no Home Assistant imports).

Ticket text, entity attributes and automation configuration can hold tokens, passwords and the home's coordinates. This is
a safety net, not a guarantee: it removes what looks like a secret, and what is sent is also limited by Settings.
"""

from __future__ import annotations

import re

REMOVED = "[removed]"

_KEYED = re.compile(
    r"""(?ix)
    (\b[\w.-]*(?:password|passwd|secret|token|api[_-]?key|access[_-]?key|authorization|bearer|credential)[\w.-]*["']?
    \s*[:=]\s*|\bbearer\s+)
    (["']?)[^\s"',}\]]+
    """
)
_JWT = re.compile(r"\beyJ[\w-]{8,}\.[\w-]{8,}\.[\w-]{8,}\b")
_LONG = re.compile(r"\b[A-Za-z0-9_\-]{32,}\b")
_COORD = re.compile(r"(?i)\b(latitude|longitude|lat|lon|lng)(\W{1,4})(-?\d{1,3}\.\d{3,})")
_EMAIL = re.compile(r"\b[\w.+-]+@[\w-]+\.[\w.-]+\b")


def _long(match: re.Match[str]) -> str:
    word = match.group(0)
    # A long run with digits and letters mixed (or capitals) looks like a key; a long entity name made of words doesn't.
    has_digit = any(c.isdigit() for c in word)
    has_upper = any(c.isupper() for c in word)
    return REMOVED if (has_digit and (has_upper or sum(c.isdigit() for c in word) >= 4)) else word


def redact(text: str) -> str:
    """The text with secrets, long keys, coordinates and email addresses replaced."""
    text = _JWT.sub(REMOVED, text)
    text = _KEYED.sub(lambda m: f"{m.group(1)}{m.group(2)}{REMOVED}", text)
    text = _LONG.sub(_long, text)
    text = _COORD.sub(lambda m: f"{m.group(1)}{m.group(2)}{REMOVED}", text)
    return _EMAIL.sub(REMOVED, text)
