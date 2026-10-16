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
        self.listeners = {}

    def async_fire(self, name, data):
        self.events.append((name, data))

    def async_listen(self, name, cb):
        self.listeners.setdefault(name, []).append(cb)
        return lambda: self.listeners[name].remove(cb)


class FakeHass:
    def __init__(self):
        self.data = {}
        self.bus = FakeBus()
        self.config = types.SimpleNamespace(language="en")
        self.tasks = []

    def async_create_task(self, coro):
        self.tasks.append(asyncio.ensure_future(coro))


class FakeIssue:
    def __init__(self, domain, issue_id, **kw):
        self.domain, self.issue_id = domain, issue_id
        self.active = kw.get("active", True)
        self.severity = kw.get("severity", "warning")
        self.translation_key = kw.get("translation_key")
        self.translation_placeholders = kw.get("translation_placeholders")
        self.learn_more_url = kw.get("learn_more_url")
        self.is_fixable = kw.get("is_fixable", False)
        self.dismissed_version = kw.get("dismissed_version")


class FakeRegistry:
    issues: dict = {}

    def async_get_issue(self, domain, issue_id):
        return self.issues.get((domain, issue_id))


TRANSLATIONS: dict = {}


async def fake_translations(hass, language, category, integrations):
    return TRANSLATIONS


def stub(name, **attrs):
    m = types.ModuleType(name)
    m.__dict__.update(attrs)
    sys.modules[name] = m
    return m


stub("homeassistant")
stub("homeassistant.core", HomeAssistant=FakeHass, Event=object, callback=lambda f: f)
stub("homeassistant.helpers.issue_registry", IssueEntry=FakeIssue, async_get=lambda hass: FakeRegistry(),
     EVENT_REPAIRS_ISSUE_REGISTRY_UPDATED="repairs_issue_registry_updated")
stub("homeassistant.helpers.translation", async_get_translations=fake_translations)
helpers = stub("homeassistant.helpers")
stub("homeassistant.helpers.storage", Store=FakeStore)

helpers.issue_registry = sys.modules["homeassistant.helpers.issue_registry"]
helpers.translation = sys.modules["homeassistant.helpers.translation"]

pkg = types.ModuleType("home_desk")
pkg.__path__ = [str(PKG)]
sys.modules["home_desk"] = pkg
for mod in ("const", "storage", "repairs"):
    spec = importlib.util.spec_from_file_location(f"home_desk.{mod}", PKG / f"{mod}.py")
    m = importlib.util.module_from_spec(spec)
    sys.modules[f"home_desk.{mod}"] = m
    spec.loader.exec_module(m)
s = sys.modules["home_desk.storage"]
repairs = sys.modules["home_desk.repairs"]


async def main():
    hass = FakeHass()
    items = json.loads((ROOT / "import" / "operations.json").read_text())
    r = await s.async_import_tickets(hass, items, actor="import")
    assert r["created"] == len(items) and r["skipped"] == 0, r
    r2 = await s.async_import_tickets(hass, items, actor="import")
    assert r2["created"] == 0 and r2["skipped"] == len(items), r2  # idempotent
    print("import", r, "reimport", r2)

    st = await s.async_stats(hass)
    print("stats", {k: v for k, v in st.items() if k != "labels"})

    active = await s.async_list_tickets(hass, status="active", include_history=False)
    review = await s.async_list_tickets(hass, status="active", label="needs-review")
    hits = await s.async_list_tickets(hass, status="all", q="Z2M")
    print("active", active["total"], "needs-review", review["total"], "search Z2M", hits["total"])
    assert active["total"] > 0 and hits["total"] > 0

    t = await s.async_create_ticket(hass, title="Hall light didn't come on", description="at 7am", requester="Qionne")
    assert t["status"] == "new" and t["events"][0]["kind"] == "created"
    t = await s.async_update_ticket(hass, t["id"], actor="claude", status="in_progress", assignee="claude", add_labels=["lighting"])
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

    # ---- labels
    labels = {x["id"]: x for x in await s.async_list_labels(hass)}
    assert labels["home-assistant"]["builtin"] and labels["home-assistant"]["color"] == "primary", labels["home-assistant"]
    assert labels["home-assistant"]["count"] == (await s.async_stats(hass))["total"]  # imported tickets all get it
    for builtin in ("bug", "enhancement", "task", "question", "history", "blocked"):
        assert labels[builtin]["builtin"], builtin
    assert labels["needs-review"]["name"] == "Needs review" and not labels["needs-review"]["builtin"]
    assert [x["id"] for x in await s.async_list_labels(hass)][:2] == ["home-assistant", "bug"]  # built-ins first
    d = await s.async_create_ticket(hass, title="no labels given")
    assert d["labels"] == ["home-assistant"], d["labels"]  # default
    assert "type" not in d and "tags" not in d
    e = await s.async_create_ticket(hass, title="garden", labels=["Garden"])
    assert e["labels"] == ["garden"]  # a new name creates the label, and HA is not forced on
    net = next(x for x in await s.async_list_labels(hass) if x["id"] == "garden")
    assert net["color"] and not net["builtin"]
    e = await s.async_update_ticket(hass, e["id"], actor="x", add_labels=["GARDEN", "Home Assistant"], remove_labels=["nope"])
    assert e["labels"] == ["garden", "home-assistant"], e["labels"]  # name matching is case-insensitive, unknown removal ignored
    assert (await s.async_list_tickets(hass, status="all", label="Garden"))["total"] == 1
    r = await s.async_update_label(hass, "garden", name="Gardening", color="teal", description="Outdoors")
    assert r["name"] == "Gardening" and r["color"] == "teal" and r["description"] == "Outdoors"
    assert (await s.async_get_ticket(hass, e["id"]))["labels"] == ["garden", "home-assistant"]  # rename keeps tickets labelled
    assert (await s.async_list_tickets(hass, status="all", label="Gardening"))["total"] == 1
    for bad, kw in (("home-assistant", {"name": "x"}), ("bug", {"color": "red"}), ("nope", {"name": "x"}), ("garden", {"color": "bogus"})):
        try:
            await s.async_update_label(hass, bad, **kw)
            raise SystemExit(f"accepted update of {bad}")
        except s.TicketError:
            pass
    for bad in ("home-assistant", "history", "nope"):
        try:
            await s.async_delete_label(hass, bad)
            raise SystemExit(f"accepted delete of {bad}")
        except s.TicketError:
            pass
    try:
        await s.async_create_label(hass, name="gardening")
        raise SystemExit("duplicate label accepted")
    except s.TicketError:
        pass
    assert await s.async_delete_label(hass, "garden") == 1
    assert "garden" not in (await s.async_get_ticket(hass, e["id"]))["labels"]
    assert "garden" not in {x["id"] for x in await s.async_list_labels(hass)}
    print("labels ok")

    # ---- history is hidden by default, blocked is just a label
    h = await s.async_create_ticket(hass, title="old work", labels=["History"], status="closed")
    assert h["id"] not in {t["id"] for t in (await s.async_list_tickets(hass, status="all", include_history=False))["tickets"]}
    assert h["id"] in {t["id"] for t in (await s.async_list_tickets(hass, status="all"))["tickets"]}
    for bad in ("waiting", "bogus"):
        try:
            await s.async_update_ticket(hass, d["id"], actor="x", status=bad)
            raise SystemExit(f"accepted status {bad}")
        except s.TicketError:
            pass
    print("history ok")

    # ---- callers from before labels: type/tags/waiting keep working
    up = s.upgrade_legacy_fields
    assert up({"title": "x", "type": "idea", "tags": ["a"]}, "create") == {"title": "x", "labels": ["a", "enhancement"]}
    assert up({"type": "issue", "add_tags": ["a"], "status": "waiting"}, "update") == {
        "add_labels": ["a", "bug", "blocked"], "status": "open"}
    assert up({"type": "log", "tag": "x"}, "filter") == {"label": "x"}
    assert up({"type": "log"}, "filter") == {"label": "history"}
    old_item = await s.async_create_ticket(hass, **up({"title": "legacy call", "type": "question", "tags": ["z"]}, "create"))
    assert old_item["labels"] == ["question", "z"], old_item["labels"]
    print("legacy callers ok")

    # ---- migration of data saved with tags, types and the waiting status
    base = {k: v for k, v in (await s.async_get_ticket(hass, d["id"])).items() if k not in ("labels", "related")}
    old = {"next_id": 5, "tag_registry": {"ops-todo": {"id": "ops-todo", "name": "Ops todo", "color": "teal", "builtin": False}},
           "tickets": {
        "1": {**base, "id": 1, "type": "issue", "status": "waiting", "tags": ["ops-todo", "wall-tablet"], "events": []},
        "2": {**base, "id": 2, "type": "log", "status": "closed", "tags": [], "events": []},
        "3": {**base, "id": 3, "type": "idea", "status": "new", "tags": ["home-assistant"], "events": []},
        "4": {**base, "id": 4, "type": "request", "status": "open", "tags": [], "events": []}}}
    FakeStore.saved = old
    migrated = await s.async_list_tickets(hass, status="all")
    got = {t["id"]: t for t in migrated["tickets"]}
    assert got[1]["labels"] == ["blocked", "bug", "ops-todo", "wall-tablet"], got[1]["labels"]
    assert got[1]["status"] == "open" and "type" not in got[1] and "tags" not in got[1]
    assert got[2]["labels"] == ["history"] and got[3]["labels"] == ["enhancement", "home-assistant"] and got[4]["labels"] == ["enhancement"]
    assert "label_registry" in FakeStore.saved and "tag_registry" not in FakeStore.saved  # persisted, so it only migrates once
    assert FakeStore.saved["tickets"]["1"]["events"][-1]["kind"] == "field"  # the waiting conversion is on the timeline
    assert {x["id"]: x["name"] for x in await s.async_list_labels(hass)}["ops-todo"] == "Ops todo"
    print("migration ok")

    # ---- adopting data saved under the old domain name
    class Both(FakeStore):
        legacy = {"next_id": 2, "tag_registry": {}, "tickets": {"1": {**base, "id": 1, "type": "issue", "tags": ["zigbee"], "events": []}}}
        async def async_load(self):
            return None if self.key == "home_desk.tickets" and not FakeStore.saved else (
                json.loads(json.dumps(Both.legacy)) if self.key == "support_tickets.tickets" else await FakeStore.async_load(self))
        def __init__(self, hass, version, key):
            self.key = key
    s.Store = Both
    FakeStore.saved = {}
    got = await s.async_list_tickets(hass, status="all")
    assert [t["id"] for t in got["tickets"]] == [1] and got["tickets"][0]["labels"] == ["bug", "zigbee"], got
    assert FakeStore.saved["tickets"]["1"]["labels"] == ["bug", "zigbee"]  # written under the new key
    print("legacy adoption ok")


    # ---- repairs become tickets
    s.Store = FakeStore  # undo the legacy-adoption patch above
    hass2 = FakeHass()
    FakeStore.saved = {}
    sync = lambda **kw: s.async_sync_repair(hass2, domain="hue", issue_id="old_fw", **kw)
    assert await sync(active=False) is None  # a repair that is already gone makes no ticket
    assert await sync(active=True, title="Hue bridge firmware is out of date", description="Update it.", priority="high") == "created"
    assert await sync(active=True, title="Hue bridge firmware is out of date", description="Update it.", priority="high") is None  # idempotent
    tix = (await s.async_list_tickets(hass2, status="all"))["tickets"]
    assert len(tix) == 1, tix
    t = await s.async_get_ticket(hass2, tix[0]["id"])
    assert t["requester"] == "Home Assistant" and t["priority"] == "high" and t["source"] == s.REPAIR_SOURCE, t
    assert t["source_key"] == "repair:hue:old_fw" and t["status"] == "new"
    assert {"home-assistant", "bug", "repair"} <= set(t["labels"]), t["labels"]
    assert t["events"][0]["actor"] == "Home Assistant"
    # the manager changes the priority; a later sync must not overwrite their triage
    await s.async_update_ticket(hass2, t["id"], actor="simon", priority="low", status="in_progress")
    assert await sync(active=True, title="x", description="Update it.", priority="urgent") is None
    assert (await s.async_get_ticket(hass2, t["id"]))["priority"] == "low"
    # ignored in HA -> Blocked while ignored
    assert await sync(active=True, ignored=True, description="Update it.") == "updated"
    assert "blocked" in (await s.async_get_ticket(hass2, t["id"]))["labels"]
    assert await sync(active=True, ignored=False, description="Update it.") == "updated"
    assert "blocked" not in (await s.async_get_ticket(hass2, t["id"]))["labels"]
    # a manually-added Blocked label is left alone when un-ignored
    await s.async_update_ticket(hass2, t["id"], actor="simon", add_labels=["blocked"])
    assert await sync(active=True, ignored=False, description="Update it.") is None
    assert "blocked" in (await s.async_get_ticket(hass2, t["id"]))["labels"]
    # HA clears the repair -> resolved with a note; clearing again does nothing
    assert await s.async_open_repair_keys(hass2) == [("hue", "old_fw")]
    assert await sync(active=False) == "resolved"
    t = await s.async_get_ticket(hass2, t["id"])
    assert t["status"] == "resolved" and "Cleared by Home Assistant" in t["resolution"] and t["closed_at"]
    assert await sync(active=False) is None and await s.async_open_repair_keys(hass2) == []
    # it comes back -> the same ticket reopens
    assert await sync(active=True, description="Update it.") == "reopened"
    t = await s.async_get_ticket(hass2, t["id"])
    assert t["status"] == "open" and t["closed_at"] is None and "reporting this repair again" in t["events"][-1]["body"]
    assert (await s.async_list_tickets(hass2, status="all"))["total"] == 1  # still one ticket
    # an ignored repair that is new starts out Blocked
    assert await s.async_sync_repair(hass2, domain="x", issue_id="y", active=True, ignored=True, title="t") == "created"
    y = next(t for t in (await s.async_list_tickets(hass2, status="all"))["tickets"] if t["source_key"] == "repair:x:y")
    assert "blocked" in y["labels"]
    print("repair sync ok")

    # ---- the glue that watches HA's issue registry
    hass3 = FakeHass()
    FakeStore.saved = {}
    TRANSLATIONS.update({
        "component.hue.issues.old_fw.title": "Bridge {name} needs an update",
        "component.hue.issues.old_fw.description": "Update {name} in the Hue app.",
    })
    FakeRegistry.issues = {
        ("hue", "old_fw"): FakeIssue("hue", "old_fw", severity="error", translation_key="old_fw",
                                    translation_placeholders={"name": "Lounge"}, learn_more_url="https://example.com/hue", is_fixable=True),
        ("hacs", "noisy"): FakeIssue("hacs", "noisy"),
        ("zha", "gone"): FakeIssue("zha", "gone", active=False),  # persistent but not currently reported
    }
    # an old repair ticket whose repair vanished while HA was off must be resolved on start
    await s.async_sync_repair(hass3, domain="mqtt", issue_id="stale", active=True, title="stale repair")
    stop = await repairs.async_setup_repairs(hass3, {"repairs_to_tickets": True, "repairs_ignored_domains": ["hacs"]})
    tix = {t["source_key"]: t for t in (await s.async_list_tickets(hass3, status="all"))["tickets"]}
    assert set(tix) == {"repair:hue:old_fw", "repair:mqtt:stale"}, set(tix)  # hacs skipped, inactive zha ignored
    hue = await s.async_get_ticket(hass3, tix["repair:hue:old_fw"]["id"])
    assert hue["title"] == "Bridge Lounge needs an update" and hue["priority"] == "high", hue["title"]
    assert "Update Lounge in the Hue app." in hue["description"] and "[Learn more](https://example.com/hue)" in hue["description"]
    assert "Settings" in hue["description"]  # fixable hint
    assert tix["repair:mqtt:stale"]["status"] == "resolved"
    # live: HA clears the hue repair, the registry fires an event, the ticket resolves
    FakeRegistry.issues = {}
    (listener,) = hass3.bus.listeners["repairs_issue_registry_updated"]
    class Ev:  # noqa: D401
        data = {"action": "remove", "domain": "hue", "issue_id": "old_fw"}
    listener(Ev)
    await asyncio.gather(*hass3.tasks)
    assert (await s.async_get_ticket(hass3, hue["id"]))["status"] == "resolved"
    # translations missing -> still a usable title
    TRANSLATIONS.clear()
    FakeRegistry.issues = {("ring", "login"): FakeIssue("ring", "login", translation_key="login_needed")}
    listener(type("Ev", (), {"data": {"domain": "ring", "issue_id": "login"}}))
    await asyncio.gather(*hass3.tasks)
    ring = next(t for t in (await s.async_list_tickets(hass3, status="all"))["tickets"] if t["source_key"] == "repair:ring:login")
    assert ring["title"] == "ring: login_needed", ring["title"]
    stop()
    assert not hass3.bus.listeners["repairs_issue_registry_updated"]
    # switched off: nothing is watched
    hass4 = FakeHass()
    off = await repairs.async_setup_repairs(hass4, {"repairs_to_tickets": False})
    assert not hass4.bus.listeners; off()
    print("repairs glue ok")


asyncio.run(main())

spec = importlib.util.spec_from_file_location("changelog", PKG / "changelog.py")
cl = importlib.util.module_from_spec(spec); spec.loader.exec_module(cl)
text = (PKG / "CHANGELOG.md").read_text()
assert "[0.1.0]" in cl.changelog_since(text, None)
newer = cl.changelog_since(text, "0.1.0")
assert "[Unreleased]" in newer and "[0.1.0]" not in newer
print("changelog ok")
print("ALL OK")
