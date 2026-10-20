"""A copy of the ticket file, made once for each version of Home Desk before that version first runs.

The tickets are the one thing that can't be rebuilt, so before an upgrade touches them a copy is kept next to the file
(`home_desk.tickets.backup-<version>`), and only the newest three are kept. Nothing here needs Home Assistant.
"""

from __future__ import annotations

import logging
import re
import shutil
from pathlib import Path

_LOGGER = logging.getLogger(__name__)


def backup_before_upgrade(storage_file: Path, version: str, keep: int = 3) -> Path | None:
    """Copy `storage_file` for `version` unless that version already has a copy. Returns the new copy, or None."""
    safe = re.sub(r"[^0-9A-Za-z.+-]", "_", version)
    target = storage_file.with_name(f"{storage_file.name}.backup-{safe}")
    if not storage_file.is_file() or target.exists():
        return None
    shutil.copyfile(storage_file, target)
    copies = sorted(
        storage_file.parent.glob(f"{storage_file.name}.backup-*"),
        key=lambda p: (p.stat().st_mtime_ns, p.name),
        reverse=True,
    )
    for old in copies[keep:]:
        old.unlink(missing_ok=True)
    return target


def safe_backup(storage_file: Path, version: str) -> None:
    """Back up, and log a failure instead of raising it: a missing backup must never stop Home Desk starting."""
    try:
        made = backup_before_upgrade(storage_file, version)
        if made:
            _LOGGER.info("Copied the ticket file to %s before running version %s", made.name, version)
    except OSError:
        _LOGGER.warning("Could not back up the ticket file before running version %s", version, exc_info=True)
