"""The copy of the ticket file kept before an upgrade (custom_components/home_desk/backup.py). No Home Assistant needed.

Run:  python3 -I tests/test_backup.py
"""
import importlib.util
import logging
import os
import tempfile
from pathlib import Path

PKG = Path(__file__).resolve().parents[1] / "custom_components" / "home_desk"
spec = importlib.util.spec_from_file_location("backup", PKG / "backup.py")
backup = importlib.util.module_from_spec(spec)
spec.loader.exec_module(backup)


def names(folder):
    return sorted(p.name for p in folder.glob("*.backup-*"))


with tempfile.TemporaryDirectory() as tmp:
    folder = Path(tmp)
    ticket_file = folder / "home_desk.tickets"

    # nothing to copy yet
    assert backup.backup_before_upgrade(ticket_file, "1.0.0") is None and names(folder) == []

    # one copy per version, with the contents as they were then
    ticket_file.write_text("v1 tickets")
    first = backup.backup_before_upgrade(ticket_file, "1.0.0")
    assert first.name == "home_desk.tickets.backup-1.0.0" and first.read_text() == "v1 tickets"
    ticket_file.write_text("changed later")
    assert backup.backup_before_upgrade(ticket_file, "1.0.0") is None, "the same version is not copied again"
    assert first.read_text() == "v1 tickets", "and the first copy is kept as it was"

    # only the newest three are kept (oldest by modification time, then name)
    for n, version in enumerate(["1.1.0", "1.2.0", "1.3.0"], start=1):
        ticket_file.write_text(f"tickets at {version}")
        made = backup.backup_before_upgrade(ticket_file, version)
        os.utime(made, ns=(made.stat().st_atime_ns, made.stat().st_mtime_ns + n * 10**9))
    assert names(folder) == ["home_desk.tickets.backup-1.1.0", "home_desk.tickets.backup-1.2.0", "home_desk.tickets.backup-1.3.0"], names(folder)
    assert not (folder / "home_desk.tickets.backup-1.0.0").exists(), "the oldest was removed"
    print("keeps three ok")

    # a version string can't escape the folder or break the name
    ticket_file.write_text("x")
    odd = backup.backup_before_upgrade(ticket_file, "2.0.0-beta.1/../../evil")
    assert odd.parent == folder and "/" not in odd.name[len("home_desk.tickets.backup-"):], odd

    # a failure is logged, never raised
    records = []

    class Catch(logging.Handler):
        def emit(self, record):
            records.append(record)

    logging.getLogger("backup").addHandler(Catch())
    real = backup.shutil.copyfile
    backup.shutil.copyfile = lambda *a, **k: (_ for _ in ()).throw(OSError("disk full"))
    try:
        backup.safe_backup(ticket_file, "9.9.9")
    finally:
        backup.shutil.copyfile = real
    assert records and "Could not back up" in records[-1].getMessage()
    print("failure logged ok")
print("ALL OK")
