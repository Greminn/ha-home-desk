"""Changelog filtering (pure Python, no Home Assistant imports)."""
from __future__ import annotations

import re


_PRE = {"alpha": 0, "a": 0, "beta": 1, "b": 1, "rc": 2}


def _vkey(v: str) -> tuple[int, ...]:
    """Order versions so that 1.0.0-beta.1 comes before 1.0.0 (a release candidate or beta is older than its final release)."""
    m = re.match(r"\s*v?(\d+)\.(\d+)\.(\d+)(?:[-.]?(alpha|beta|rc|a|b)\.?(\d*))?", v, re.I)
    if not m:
        return tuple(int(x) for x in re.findall(r"\d+", v))
    major, minor, patch, pre, num = m.groups()
    if pre is None:
        return (int(major), int(minor), int(patch), 1, 0, 0)
    return (int(major), int(minor), int(patch), 0, _PRE[pre.lower()], int(num or 0))


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
