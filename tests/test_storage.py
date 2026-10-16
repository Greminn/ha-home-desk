"""Exercises storage.py against a stubbed Home Assistant (no HA install needed).

Run:  python3 -I tests/test_storage.py
"""
import asyncio
import importlib.util
import json
import sys
import types
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PKG = ROOT / "custom_components" / "home_desk"


class FakeStore:
    saved: dict = {}

    def __init__(self, hass, version, key):
        pass

    async def async_load(self):
        return json.loads(json.dumps(FakeStore.saved)) if FakeStore.saved else None

    async def async_save(self, data):
        FakeStore.saved = json.loads(json.dumps(data))


class FakeBus:
    def __init__(self):
        self.events = []

    def async_fire(self, name, data):
        self.events.append((name, data))


class FakeHass:
    def __init__(self):
        self.data = {}
        self.bus = FakeBus()


def stub(name, **attrs):
    m = types.ModuleType(name)
    m.__dict__.update(attrs)
    sys.modules[name] = m
    return m


stub("homeassistant")
stub("homeassistant.core", HomeAssistant=FakeHass)
stub("homeassistant.helpers")
stub("homeassistant.helpers.storage", Store=FakeStore)

pkg = types.ModuleType("home_desk")
pkg.__path__ = [str(PKG)]
sys.modules["home_desk"] = pkg
for mod in ("const", "storage"):
    spec = importlib.util.spec_from_file_location(f"home_desk.{mod}", PKG / f"{mod}.py")
    m = importlib.util.module_from_spec(spec)
    sys.modules[f"home_desk.{mod}"] = m
    spec.loader.exec_module(m)
s = sys.modules["home_desk.storage"]


async def main():
    hass = FakeHass()
    items = json.loads((ROOT / "import" / "operations.json").read_text())
    r = await s.async_import_tickets(hass, items, actor="import")
    assert r["created"] == len(items) and r["skipped"] == 0, r
    r2 = await s.async_import_tickets(hass, items, actor="import")
    assert r2["created"] == 0 and r2["skipped"] == len(items), r2  # idempotent
    print("import", r, "reimport", r2)

    st = await s.async_stats(hass)
    print("stats", {k: v for k, v in st.items() if k != "tags"})

    active = await s.async_list_tickets(hass, status="active", include_history=False)
    review = await s.async_list_tickets(hass, status="active", tag="needs-review")
    hits = await s.async_list_tickets(hass, status="all", q="Z2M")
    print("active", active["total"], "needs-review", review["total"], "search Z2M", hits["total"])
    assert active["total"] > 0 and hits["total"] > 0

    t = await s.async_create_ticket(hass, title="Hall light didn't come on", description="at 7am", requester="Qionne")
    assert t["status"] == "new" and t["events"][0]["kind"] == "created"
    t = await s.async_update_ticket(hass, t["id"], actor="claude", status="in_progress", assignee="claude", add_tags=["lighting"])
    kinds = [e["kind"] for e in t["events"]]
    assert kinds == ["created", "status", "assignee", "field"], kinds
    t = await s.async_add_comment(hass, t["id"], actor="claude", body="Looks like Z2M timeout.")
    t = await s.async_add_comment(hass, t["id"], actor="simon", body="private", internal=True)
    assert [e["kind"] for e in s.view(t, admin=False)["events"]].count("note") == 0
    t = await s.async_close_ticket(hass, t["id"], actor="claude", resolution="Restarted Z2M")
    assert t["status"] == "resolved" and t["closed_at"] and t["resolution"] == "Restarted Z2M"
    t = await s.async_update_ticket(hass, t["id"], actor="simon", status="open")
    assert t["closed_at"] is None
    same = await s.async_update_ticket(hass, t["id"], actor="simon", status="open")
    assert len(same["events"]) == len(t["events"])  # no-op change records nothing
    for bad in ({"status": "bogus"}, {"nope": 1}):
        try:
            await s.async_update_ticket(hass, t["id"], actor="x", **bad)
            raise SystemExit(f"accepted {bad}")
        except s.TicketError:
            pass
    other = (await s.async_list_tickets(hass, status="all", limit=1))["tickets"][0]["id"]
    await s.async_link_tickets(hass, t["id"], other, actor="claude")
    got = await s.async_get_ticket(hass, t["id"])
    assert got["related"] and got["related"][0]["id"] == other
    assert hass.bus.events and hass.bus.events[-1][0] == "home_desk_event"
    mine = await s.async_list_tickets(hass, requester="Qionne", status="all")
    assert mine["total"] == 1
    print("lifecycle ok;", len(hass.bus.events), "events fired")

    # ---- tags
    tags = {x["id"]: x for x in await s.async_list_tags(hass)}
    assert tags["home-assistant"]["builtin"] and tags["home-assistant"]["color"] == "primary", tags["home-assistant"]
    assert tags["home-assistant"]["count"] == (await s.async_stats(hass))["total"]  # imported tickets all get it
    assert tags["needs-review"]["name"] == "Needs review" and not tags["needs-review"]["builtin"]
    assert (await s.async_list_tags(hass))[0]["id"] == "home-assistant"  # built-in sorts first
    d = await s.async_create_ticket(hass, title="no tags given")
    assert d["tags"] == ["home-assistant"], d["tags"]  # default
    e = await s.async_create_ticket(hass, title="garden", tags=["Garden"])
    assert e["tags"] == ["garden"]  # a new name creates the tag, and HA is not forced on
    net = next(x for x in await s.async_list_tags(hass) if x["id"] == "garden")
    assert net["name"] == "Garden" and net["color"] in sys.modules["home_desk.const"].TAG_AUTO_COLORS
    e = await s.async_update_ticket(hass, e["id"], actor="x", add_tags=["GARDEN", "Home Assistant"], remove_tags=["nope"])
    assert e["tags"] == ["garden", "home-assistant"], e["tags"]  # name matching is case-insensitive, unknown removal ignored
    assert (await s.async_list_tickets(hass, status="all", tag="Garden"))["total"] == 1
    r = await s.async_update_tag(hass, "garden", name="Gardening", color="teal")
    assert r["name"] == "Gardening" and r["color"] == "teal" and r["id"] == "garden"
    assert (await s.async_get_ticket(hass, e["id"]))["tags"] == ["garden", "home-assistant"]  # rename keeps tickets tagged
    assert (await s.async_list_tickets(hass, status="all", tag="Gardening"))["total"] == 1
    for bad, kw in (("home-assistant", {"name": "X"}), ("home-assistant", {"color": "red"}), ("garden", {"color": "mauve"}), ("garden", {"name": "needs review"}), ("ghost", {"name": "Y"})):
        try:
            await s.async_update_tag(hass, bad, **kw)
            raise SystemExit(f"accepted {bad} {kw}")
        except s.TicketError:
            pass
    for bad in ("home-assistant", "ghost"):
        try:
            await s.async_delete_tag(hass, bad)
            raise SystemExit(f"deleted {bad}")
        except s.TicketError:
            pass
    try:
        await s.async_create_tag(hass, name="gardening")
        raise SystemExit("duplicate tag accepted")
    except s.TicketError:
        pass
    assert await s.async_delete_tag(hass, "garden") == 1
    assert "garden" not in (await s.async_get_ticket(hass, e["id"]))["tags"]
    assert "garden" not in {x["id"] for x in await s.async_list_tags(hass)}
    print("tags ok")

    # ---- migration of data saved before tags had definitions
    base = await s.async_get_ticket(hass, d["id"])
    old = {"next_id": 3, "tickets": {
        "1": {**base, "id": 1, "tags": ["ops-todo", "wall-tablet"]},
        "2": {**base, "id": 2, "tags": []}}}
    FakeStore.saved = old
    migrated = await s.async_list_tickets(hass, status="all")
    got = {t["id"]: t["tags"] for t in migrated["tickets"]}
    assert got == {1: ["home-assistant", "ops-todo", "wall-tablet"], 2: ["home-assistant"]}, got
    assert {x["id"]: x["name"] for x in await s.async_list_tags(hass)}["wall-tablet"] == "Wall tablet"
    assert "tag_registry" in FakeStore.saved  # persisted, so it only migrates once
    print("migration ok")

    # ---- adopting data saved under the old domain name
    class Both(FakeStore):
        legacy = {"next_id": 2, "tickets": {"1": {**base, "id": 1, "tags": ["zigbee"]}}}
        async def async_load(self):
            return None if self.key == "home_desk.tickets" and not FakeStore.saved else (
                json.loads(json.dumps(Both.legacy)) if self.key == "support_tickets.tickets" else await FakeStore.async_load(self))
        def __init__(self, hass, version, key):
            self.key = key
    s.Store = Both
    FakeStore.saved = {}
    got = await s.async_list_tickets(hass, status="all")
    assert [t["id"] for t in got["tickets"]] == [1] and got["tickets"][0]["tags"] == ["home-assistant", "zigbee"], got
    assert FakeStore.saved["tickets"]["1"]["tags"] == ["home-assistant", "zigbee"]  # written under the new key
    print("legacy adoption ok")


asyncio.run(main())

spec = importlib.util.spec_from_file_location("changelog", PKG / "changelog.py")
cl = importlib.util.module_from_spec(spec); spec.loader.exec_module(cl)
text = (PKG / "CHANGELOG.md").read_text()
assert "[0.1.0]" in cl.changelog_since(text, None)
newer = cl.changelog_since(text, "0.1.0")
assert "[Unreleased]" in newer and "[0.1.0]" not in newer
print("changelog ok")
print("ALL OK")
