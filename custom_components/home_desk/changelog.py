"""Changelog filtering (pure Python, no Home Assistant imports)."""
from __future__ import annotations

import re


def _vkey(v: str) -> tuple[int, ...]:
    return tuple(int(x) for x in re.findall(r"\d+", v))


def changelog_since(text: str, since: str | None) -> str:
    """Return the changelog with only releases newer than `since` (Unreleased always kept)."""
    if not since:
        return text
    head, *sections = re.split(r"(?m)^(?=## \[)", text)
    floor = _vkey(since)
    keep = []
    for sec in sections:
        m = re.match(r"## \[([^\]]+)\]", sec)
        if m and (m.group(1).lower() == "unreleased" or _vkey(m.group(1)) > floor):
            keep.append(sec)
    return head + "".join(keep)
