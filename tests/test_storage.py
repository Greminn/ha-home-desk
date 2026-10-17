"""Exercises storage.py against a stubbed Home Assistant (no HA install needed).

Run:  python3 -I tests/test_storage.py

No private data is needed: every ticket here is made up inside the test.
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


async def expect_error(coro_fn, fragment=None, what="call"):
    try:
        await coro_fn()
    except s.TicketError as err:
        if fragment:
            assert fragment in str(err), (fragment, str(err))
        return
    raise SystemExit(f"{what} should have been refused")


# A small made-up tracker, in the shape the importer produces.
IMPORT = [
    {"title": "Z2M devices time out overnight", "description": "Seen twice this week.", "type": "issue", "tags": ["zigbee", "needs-review"],
     "status": "open", "source_key": "ops-1", "related_keys": ["ops-2"]},
    {"title": "Replace hallway sensor battery", "type": "task", "status": "closed", "source_key": "ops-2", "related_keys": ["ops-1"]},
    {"title": "Add a bedtime scene", "type": "idea", "source_key": "ops-3"},
    {"title": "2026-10-01 Router firmware", "type": "log", "status": "closed", "source_key": "log-1"},
]


async def main():
    hass = FakeHass()

    # ---- import is idempotent, and links come in both ways
    r = await s.async_import_tickets(hass, IMPORT, actor="import")
    assert r == {"created": 4, "skipped": 0, "links": 2}, r
    assert (await s.async_import_tickets(hass, IMPORT, actor="import"))["created"] == 0
    st = await s.async_stats(hass)
    assert st["total"] == 4 and st["by_status"] == {"in_progress": 1, "closed": 2, "new": 1}, st  # "open" became in_progress
    assert (await s.async_list_tickets(hass, status="active", label="needs-review"))["total"] == 1
    assert (await s.async_list_tickets(hass, status="all", q="z2m"))["total"] == 1
    assert (await s.async_list_tickets(hass, status="active", include_history=False))["total"] == 2
    imported = (await s.async_list_tickets(hass, status="all"))["tickets"]
    assert all(t["category"] is None and "home-assistant" not in t["labels"] for t in imported), "imports are uncategorised"
    print("import ok")

    # ---- a ticket's life
    t = await s.async_create_ticket(hass, title="Hall light didn't come on", description="at 7am", requester="Qionne")
    assert t["status"] == "new" and t["events"][0]["kind"] == "created" and t["labels"] == [] and t["category"] is None
    t = await s.async_update_ticket(hass, t["id"], actor="Simon", priority="high", add_labels=["lighting"])
    assert t["status"] == "in_progress", "the first action moves it out of New"
    assert [e["kind"] for e in t["events"]] == ["created", "priority", "field", "status"], [e["kind"] for e in t["events"]]
    assert t["events"][-1]["actor"] == "Home Desk"
    t = await s.async_add_comment(hass, t["id"], actor="claude", body="Looks like a Z2M timeout.")
    t = await s.async_add_comment(hass, t["id"], actor="simon", body="private", internal=True)
    assert [e["kind"] for e in s.view(t, admin=False)["events"]].count("note") == 0
    t = await s.async_close_ticket(hass, t["id"], actor="claude", resolution="Restarted Z2M")
    assert t["status"] == "resolved" and t["closed_at"] and t["resolution"] == "Restarted Z2M"
    t = await s.async_update_ticket(hass, t["id"], actor="simon", status="in_progress")  # reopen
    assert t["status"] == "in_progress" and t["closed_at"] is None
    n = len(t["events"])
    assert len((await s.async_update_ticket(hass, t["id"], actor="simon", status="in_progress"))["events"]) == n  # a no-op records nothing
    for bad in ({"status": "bogus"}, {"status": "waiting"}, {"nope": 1}):
        await expect_error(lambda bad=bad: s.async_update_ticket(hass, t["id"], actor="x", **bad), what=f"update {bad}")
    other = imported[0]["id"]
    await s.async_link_tickets(hass, t["id"], other, actor="claude")
    got = await s.async_get_ticket(hass, t["id"])
    assert got["related"] and got["related"][0]["id"] == other
    assert hass.bus.events and hass.bus.events[-1][0] == "home_desk_event"
    assert (await s.async_list_tickets(hass, requester="Qionne", status="all"))["total"] == 1
    n = str(t["id"])
    for q in (n, "#" + n):  # a ticket can be found by its number
        assert t["id"] in {x["id"] for x in (await s.async_list_tickets(hass, status="all", q=q))["tickets"]}
    print("lifecycle ok;", len(hass.bus.events), "events fired")

    # ---- status moves by itself
    a = await s.async_create_ticket(hass, title="Door code")
    a = await s.async_update_ticket(hass, a["id"], actor="Home Assistant", priority="high")
    assert a["status"] == "new", "Home Assistant's own changes don't start work"
    for who in ("import", "Home Desk"):
        a = await s.async_update_ticket(hass, a["id"], actor=who, priority="normal")
        assert a["status"] == "new", who
    a = await s.async_add_comment(hass, a["id"], actor="Simon", body="looking")
    assert a["status"] == "in_progress" and [e["kind"] for e in a["events"]].count("status") == 1
    a = await s.async_add_comment(hass, a["id"], actor="Simon", body="again")
    assert [e["kind"] for e in a["events"]].count("status") == 1, "only the first action moves it"
    alias = await s.async_create_ticket(hass, title="alias", status="open")
    assert alias["status"] == "in_progress"
    assert (await s.async_update_ticket(hass, alias["id"], actor="Simon", status="open"))["status"] == "in_progress"
    assert s.upgrade_legacy_fields({"status": "open"}, "update") == {"status": "in_progress"}
    print("status automation ok")

    # ---- labels
    labels = {x["id"]: x for x in await s.async_list_labels(hass)}
    assert "home-assistant" not in labels, "the Home Assistant label is a category now"
    for builtin in ("bug", "enhancement", "task", "question", "history", "blocked"):
        assert labels[builtin]["builtin"], builtin
    assert labels["needs-review"]["name"] == "Needs review" and not labels["needs-review"]["builtin"]
    assert [x["id"] for x in await s.async_list_labels(hass)][:2] == ["bug", "enhancement"]  # built-ins first
    e = await s.async_create_ticket(hass, title="garden", labels=["Garden"])
    assert e["labels"] == ["garden"]  # a new name creates the label
    net = next(x for x in await s.async_list_labels(hass) if x["id"] == "garden")
    assert net["color"] and not net["builtin"]
    e = await s.async_update_ticket(hass, e["id"], actor="x", add_labels=["GARDEN", "Bug"], remove_labels=["nope"])
    assert e["labels"] == ["bug", "garden"], e["labels"]  # case-insensitive; unknown removal ignored
    assert (await s.async_list_tickets(hass, status="all", label="Garden"))["total"] == 1
    assert labels["bug"]["icon"] == "mdi:bug-outline" and net["icon"] == ""
    r = await s.async_update_label(hass, "garden", name="Gardening", color="teal", description="Outdoors", icon="mdi:flower")
    assert r["icon"] == "mdi:flower" and r["name"] == "Gardening" and r["color"] == "teal" and r["description"] == "Outdoors"
    for bad_icon in ("flower", "mdi:", "MDI:Flower x"):
        await expect_error(lambda i=bad_icon: s.async_update_label(hass, "garden", icon=i), what=f"icon {bad_icon}")
    assert (await s.async_update_label(hass, "garden", icon=""))["icon"] == ""
    for colour in ("dark-grey", "black", "white"):
        assert (await s.async_update_label(hass, "garden", color=colour))["color"] == colour
    assert (await s.async_get_ticket(hass, e["id"]))["labels"] == ["bug", "garden"]  # a rename keeps tickets labelled
    assert (await s.async_list_tickets(hass, status="all", label="Gardening"))["total"] == 1
    for bad, kw in (("bug", {"name": "x"}), ("history", {"color": "red"}), ("nope", {"name": "x"}), ("garden", {"color": "bogus"})):
        await expect_error(lambda b=bad, k=kw: s.async_update_label(hass, b, **k), what=f"update {bad}")
    for bad in ("bug", "history", "nope"):
        await expect_error(lambda b=bad: s.async_delete_label(hass, b), what=f"delete {bad}")
    await expect_error(lambda: s.async_create_label(hass, name="gardening"), what="duplicate label")
    assert await s.async_delete_label(hass, "garden") == 1
    assert "garden" not in (await s.async_get_ticket(hass, e["id"]))["labels"]
    print("labels ok")

    # ---- history is hidden by default
    h = await s.async_create_ticket(hass, title="old work", labels=["History"], status="closed")
    assert h["id"] not in {x["id"] for x in (await s.async_list_tickets(hass, status="all", include_history=False))["tickets"]}
    assert h["id"] in {x["id"] for x in (await s.async_list_tickets(hass, status="all"))["tickets"]}
    print("history ok")

    # ---- callers from before labels and statuses: type, tags, waiting and open keep working
    up = s.upgrade_legacy_fields
    assert up({"title": "x", "type": "idea", "tags": ["a"]}, "create") == {"title": "x", "labels": ["a", "enhancement"]}
    assert up({"type": "issue", "add_tags": ["a"], "status": "waiting"}, "update") == {
        "add_labels": ["a", "bug", "blocked"], "status": "in_progress"}
    assert up({"type": "log", "tag": "x"}, "filter") == {"label": "x"}
    assert up({"type": "log"}, "filter") == {"label": "history"}
    old_item = await s.async_create_ticket(hass, **up({"title": "legacy call", "type": "question", "tags": ["z"]}, "create"))
    assert old_item["labels"] == ["question", "z"], old_item["labels"]
    print("legacy callers ok")

    # ---- categories
    cats = await s.async_list_categories(hass)
    assert [c["id"] for c in cats] == ["home-assistant"] and cats[0]["builtin"], cats
    c = await s.async_create_ticket(hass, title="Wi-Fi drops")
    await expect_error(lambda: s.async_update_ticket(hass, c["id"], actor="Simon", category="Network"), "Unknown category", "unknown category")
    net = await s.async_create_category(hass, name="Network", icon="mdi:lan")
    assert net["id"] == "network" and not net["builtin"]
    await expect_error(lambda: s.async_create_category(hass, name="network"), "already exists", "duplicate category")
    await expect_error(lambda: s.async_create_category(hass, name="  "), "needs a name", "blank category")
    await expect_error(lambda: s.async_create_category(hass, name="x", icon="lan"), "Invalid icon", "bad icon")
    c = await s.async_update_ticket(hass, c["id"], actor="Simon", category="network")
    assert c["category"] == "network"
    ev = next(e for e in c["events"] if (e["data"] or {}).get("field") == "category")
    assert ev["data"] == {"field": "category", "from": None, "to": "Network"}, ev  # the timeline shows names, not ids
    assert (await s.async_create_ticket(hass, title="with category", category="Network"))["category"] == "network"
    assert (await s.async_list_tickets(hass, category="Network", status="all"))["total"] == 2
    assert (await s.async_list_tickets(hass, category="none", status="all"))["total"] == (await s.async_stats(hass))["total"] - 2
    assert "network" in (await s.async_list_tickets(hass, status="all", q="network"))["tickets"][0]["category"]
    st = await s.async_stats(hass)
    assert [x["count"] for x in st["categories"] if x["id"] == "network"] == [2]
    assert st["no_category"] == len([1 for x in (await s.async_list_tickets(hass, status="active"))["tickets"] if not x["category"]])
    for fn in (lambda: s.async_update_category(hass, "home-assistant", name="x"), lambda: s.async_delete_category(hass, "home-assistant")):
        await expect_error(fn, "built-in", "built-in category")
    await expect_error(lambda: s.async_delete_category(hass, "network", only_if_empty=True), "use Network", "agent delete of a used category")
    assert (await s.async_update_category(hass, "network", name="Networking", icon="mdi:router-network"))["name"] == "Networking"
    assert (await s.async_get_ticket(hass, c["id"]))["category"] == "network"  # a rename keeps tickets in it
    c = await s.async_update_ticket(hass, c["id"], actor="Simon", category=None)
    assert c["category"] is None  # clearing is allowed
    assert await s.async_delete_category(hass, "network") == 1  # the panel may delete a used one
    assert (await s.async_list_tickets(hass, category="none", status="all"))["total"] == (await s.async_stats(hass))["total"]
    emp = await s.async_create_category(hass, name="Empty")
    assert await s.async_delete_category(hass, emp["id"], only_if_empty=True) == 0
    print("categories ok")

    # ---- the AI agent: assigning fires an event, and its reply hands the ticket back
    g = await s.async_create_ticket(hass, title="Camera offline")
    hass.bus.events.clear()
    g = await s.async_update_ticket(hass, g["id"], actor="Simon", assignee="ai:Claude")
    kinds = [ev[1]["kind"] for ev in hass.bus.events]
    assert kinds == ["updated", "assigned"] and hass.bus.events[-1][1]["with_agent"], kinds
    assert (await s.async_stats(hass))["with_agent"] == 1
    g = await s.async_add_comment(hass, g["id"], actor="Simon", body="check the logs")
    assert g["assignee"] == "ai:Claude", "a manager's comment leaves it with the agent"
    g = await s.async_add_comment(hass, g["id"], actor="claude", body="found it")
    assert g["assignee"] is None and g["events"][-1]["kind"] == "assignee" and g["events"][-1]["actor"] == "claude", "the agent's reply hands it back"
    g = await s.async_update_ticket(hass, g["id"], actor="Simon", assignee="Jo")
    assert (await s.async_add_comment(hass, g["id"], actor="Jo", body="on it"))["assignee"] == "Jo", "only an AI agent hands back"
    h2 = await s.async_create_ticket(hass, title="assigned to someone else")
    hass.bus.events.clear()
    await s.async_update_ticket(hass, h2["id"], actor="Simon", assignee="Jo")
    assert [ev[1]["kind"] for ev in hass.bus.events] == ["updated"], "no assigned event for a person"
    print("agent ok")

    # ---- settings
    cfg = await s.async_get_settings(hass, "u1")
    assert cfg["auto_close"] == "7d" and cfg["repairs"] is True and cfg["agent"] == ""
    assert cfg["notify"] == {"targets": [], "new_ticket": True, "comment": True, "resolved": False}
    cfg = await s.async_save_settings(hass, {"auto_close": "1d", "agent": "ai_task.claude", "notify": {"targets": ["mobile_app_x"], "resolved": True}}, user_id="u1")
    assert cfg["auto_close"] == "1d" and cfg["agent"] == "ai_task.claude" and cfg["notify"]["targets"] == ["mobile_app_x"] and cfg["notify"]["resolved"]
    assert (await s.async_get_settings(hass, "u2"))["notify"]["targets"] == [], "notifications are per manager"
    assert (await s.async_get_settings(hass, "u2"))["auto_close"] == "1d", "the rest is shared"
    for bad in ({"auto_close": "soon"}, {"nope": 1}, {"notify": {"nope": 1}}):
        await expect_error(lambda b=bad: s.async_save_settings(hass, b), what=f"settings {bad}")
    print("settings ok")

    # ---- resolved tickets close after the delay
    r1 = await s.async_close_ticket(hass, (await s.async_create_ticket(hass, title="to resolve"))["id"], actor="Simon", resolution="fixed")
    assert r1["status"] == "resolved"
    assert await s.async_auto_close(hass) == 0, "not yet"
    def backdate(ticket_id, stamp):
        data = FakeStore.saved
        data["tickets"][str(ticket_id)]["closed_at"] = stamp
    backdate(r1["id"], "2026-01-01T00:00:00+00:00")
    await s.async_save_settings(hass, {"auto_close": "7d"})
    assert await s.async_auto_close(hass) == 1
    r1 = await s.async_get_ticket(hass, r1["id"])
    assert r1["status"] == "closed" and r1["events"][-1]["actor"] == "Home Desk" and r1["events"][-1]["kind"] == "status"
    await s.async_save_settings(hass, {"auto_close": "immediately"})
    q = await s.async_close_ticket(hass, (await s.async_create_ticket(hass, title="instant"))["id"], actor="Simon", resolution="done")
    assert q["status"] == "closed", q["status"]
    await s.async_save_settings(hass, {"auto_close": "never"})
    q2 = await s.async_close_ticket(hass, (await s.async_create_ticket(hass, title="never"))["id"], actor="Simon", resolution="done")
    backdate(q2["id"], "2020-01-01T00:00:00+00:00")
    assert await s.async_auto_close(hass) == 0 and (await s.async_get_ticket(hass, q2["id"]))["status"] == "resolved"
    await s.async_save_settings(hass, {"auto_close": "7d"})
    print("auto-close ok")

    # ---- size limits
    for fn in (lambda: s.async_create_ticket(hass, title="x" * 301), lambda: s.async_create_ticket(hass, title="ok", description="y" * 100_001),
               lambda: s.async_add_comment(hass, c["id"], actor="Simon", body="z" * 100_001),
               lambda: s.async_update_ticket(hass, c["id"], actor="Simon", title="t" * 301),
               lambda: s.async_close_ticket(hass, c["id"], actor="Simon", resolution="r" * 100_001),
               lambda: s.async_create_category(hass, name="n" * 81), lambda: s.async_create_label(hass, name="n" * 81)):
        await expect_error(fn, "too long", "oversized input")
    assert len((await s.async_create_ticket(hass, title="x" * 300, description="y" * 100_000))["title"]) == 300
    print("limits ok")

    # ---- migration of data saved with tags, types, waiting/open statuses, the HA label and no categories
    base = {k: v for k, v in (await s.async_get_ticket(hass, a["id"])).items() if k not in ("labels", "related", "category")}
    old = {"next_id": 6, "tag_registry": {"ops-todo": {"id": "ops-todo", "name": "Ops todo", "color": "teal", "builtin": False}},
           "tickets": {
        "1": {**base, "id": 1, "type": "issue", "status": "waiting", "tags": ["ops-todo", "wall-tablet"], "events": []},
        "2": {**base, "id": 2, "type": "log", "status": "closed", "tags": [], "events": []},
        "3": {**base, "id": 3, "type": "idea", "status": "new", "tags": ["home-assistant"], "events": []},
        "4": {**base, "id": 4, "type": "request", "status": "open", "tags": [], "events": []},
        "5": {**base, "id": 5, "type": "issue", "status": "new", "tags": ["home-assistant"], "events": [],
              "source": s.REPAIR_SOURCE, "source_key": "repair:hue:x"}}}
    FakeStore.saved = old
    got = {x["id"]: x for x in (await s.async_list_tickets(hass, status="all"))["tickets"]}
    assert got[1]["labels"] == ["blocked", "bug", "ops-todo", "wall-tablet"], got[1]["labels"]
    assert got[1]["status"] == "in_progress" and "type" not in got[1] and "tags" not in got[1], "waiting became in progress + Blocked"
    assert got[4]["status"] == "in_progress", "open became in progress"
    assert got[2]["labels"] == ["history"] and got[3]["labels"] == ["enhancement"] and got[4]["labels"] == ["enhancement"], "the Home Assistant label is stripped"
    assert all("category" in x for x in got.values()) and got[3]["category"] is None
    assert got[5]["category"] == "home-assistant", "existing repair tickets are about Home Assistant"
    assert "home-assistant" not in {x["id"] for x in await s.async_list_labels(hass)}
    assert [c["id"] for c in await s.async_list_categories(hass)] == ["home-assistant"]
    assert FakeStore.saved["settings"]["auto_close"] == "7d" and FakeStore.saved["notify"] == {}
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
    assert [x["id"] for x in got["tickets"]] == [1] and got["tickets"][0]["labels"] == ["bug", "zigbee"], got
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
    assert t["category"] == "home-assistant" and sorted(t["labels"]) == ["bug", "repair"], (t["category"], t["labels"])
    assert t["events"][0]["actor"] == "Home Assistant"
    # the manager changes the priority; a later sync must not overwrite their triage
    await s.async_update_ticket(hass2, t["id"], actor="simon", priority="low", status="in_progress")
    assert await sync(active=True, title="Hue bridge firmware is out of date", description="Update it.", priority="urgent") is None
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
    # it comes back -> the same ticket reopens, as in progress
    assert await sync(active=True, description="Update it.") == "reopened"
    t = await s.async_get_ticket(hass2, t["id"])
    assert t["status"] == "in_progress" and t["closed_at"] is None and "reporting this repair again" in t["events"][-1]["body"]
    assert (await s.async_list_tickets(hass2, status="all"))["total"] == 1  # still one ticket
    # a better title from Home Assistant replaces an automatic one, but never a person's rename
    assert await sync(active=True, title="Hue bridge firmware needs updating", description="Update it.") == "updated"
    assert (await s.async_get_ticket(hass2, t["id"]))["title"] == "Hue bridge firmware needs updating"
    await s.async_update_ticket(hass2, t["id"], actor="simon", title="My own name")
    assert await sync(active=True, title="Something else from HA", description="Update it.") is None
    assert (await s.async_get_ticket(hass2, t["id"]))["title"] == "My own name"
    # a ticket from before titles were tracked counts as automatic until someone renames it
    await s.async_sync_repair(hass2, domain="old", issue_id="x", active=True, title="old: x")
    [tk.pop("repair_title", None) for tk in FakeStore.saved["tickets"].values()]
    assert await s.async_sync_repair(hass2, domain="old", issue_id="x", active=True, title="Nicer title") == "updated"
    # an ignored repair that is new starts out Blocked
    assert await s.async_sync_repair(hass2, domain="x", issue_id="y", active=True, ignored=True, title="t") == "created"
    y = next(x for x in (await s.async_list_tickets(hass2, status="all"))["tickets"] if x["source_key"] == "repair:x:y")
    assert "blocked" in y["labels"]
    # with "close straight away", a repair that clears is closed as well as resolved
    await s.async_save_settings(hass2, {"auto_close": "immediately"})
    assert await s.async_sync_repair(hass2, domain="x", issue_id="y", active=False) == "resolved"
    assert (await s.async_get_ticket(hass2, y["id"]))["status"] == "closed"
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
    stop = await repairs.async_setup_repairs(hass3, {"repairs_ignored_domains": ["hacs"]})
    tix = {x["source_key"]: x for x in (await s.async_list_tickets(hass3, status="all"))["tickets"]}
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
    ring = next(x for x in (await s.async_list_tickets(hass3, status="all"))["tickets"] if x["source_key"] == "repair:ring:login_needed")
    assert ring["title"] == "ring: login_needed (login)", ring["title"]
    # ids that start with a config entry id are shortened, and similar repairs stay distinguishable
    FakeRegistry.issues = {("proxmoxve", "01KZ9TR683GRTTEATQYX7757JZ_Update pve2_forbiden"): FakeIssue(
        "proxmoxve", "01KZ9TR683GRTTEATQYX7757JZ_Update pve2_forbiden", translation_key="resource_exception_forbiden")}
    listener(type("Ev", (), {"data": {"domain": "proxmoxve", "issue_id": "01KZ9TR683GRTTEATQYX7757JZ_Update pve2_forbiden"}}))
    await asyncio.gather(*hass3.tasks)
    px = next(x for x in (await s.async_list_tickets(hass3, status="all"))["tickets"] if x["source_key"].startswith("repair:proxmoxve"))
    assert px["title"] == "proxmoxve: resource_exception_forbiden (Update pve2_forbiden)", px["title"]
    stop()
    assert not hass3.bus.listeners["repairs_issue_registry_updated"] and "home_desk_repairs_catch_up" not in hass3.data

    # the "Tickets from Repairs" setting: off means nothing is turned into tickets, and turning it on catches up
    hass4 = FakeHass()
    FakeStore.saved = {}
    FakeRegistry.issues = {("hue", "x"): FakeIssue("hue", "x", translation_key="x")}
    await s.async_save_settings(hass4, {"repairs": False})
    off = await repairs.async_setup_repairs(hass4, {})
    assert (await s.async_list_tickets(hass4, status="all"))["total"] == 0, "off: no ticket"
    (listener4,) = hass4.bus.listeners["repairs_issue_registry_updated"]
    listener4(type("Ev", (), {"data": {"domain": "hue", "issue_id": "x"}}))
    await asyncio.gather(*hass4.tasks)
    assert (await s.async_list_tickets(hass4, status="all"))["total"] == 0, "off: events are ignored too"
    await s.async_save_settings(hass4, {"repairs": True})
    await hass4.data["home_desk_repairs_catch_up"]()  # what turning the switch on does
    assert (await s.async_list_tickets(hass4, status="all"))["total"] == 1, "on: the existing repair is picked up"
    off()
    print("repairs glue ok")

    # ---- repairs of one kind share a ticket
    hass5 = FakeHass()
    FakeStore.saved = {}
    K = "resource_exception_forbiden"
    px = lambda iid, **kw: s.async_sync_repair(  # noqa: E731
        hass5, domain="proxmoxve", issue_id=iid, group=K, member=iid, generic_title=f"proxmoxve: {K}",
        title=kw.pop("title", f"proxmoxve: {K} ({iid})"), description="Proxmox refused the request.", **kw)
    assert await px("pve", active=True) == "created"
    assert await px("pve2", active=True) == "updated", "the second repair joins the first ticket"
    rows = (await s.async_list_tickets(hass5, status="all"))["tickets"]
    assert len(rows) == 1 and rows[0]["source_key"] == f"repair:proxmoxve:{K}" and "repair_members" not in rows[0], rows
    t = await s.async_get_ticket(hass5, rows[0]["id"])
    assert "**Affected (2):**" in t["description"] and "- pve\n- pve2" in t["description"], t["description"]
    assert t["title"] == f"proxmoxve: {K}", "two different titles: the generic one"
    assert any("Also affected: pve2" in (e["body"] or "") for e in t["events"])
    assert sorted(await s.async_open_repair_keys(hass5)) == [("proxmoxve", "pve"), ("proxmoxve", "pve2")]
    assert await px("pve", active=False) == "updated", "one clears, the ticket stays open"
    t = await s.async_get_ticket(hass5, t["id"])
    assert t["status"] != "resolved" and "Affected" not in t["description"] and any("Still affected: pve2" in (e["body"] or "") for e in t["events"])
    assert await s.async_open_repair_keys(hass5) == [("proxmoxve", "pve2")]
    assert await px("pve2", active=False) == "resolved", "the last one clears, the ticket resolves"
    assert await px("pve", active=True) == "reopened" and (await s.async_get_ticket(hass5, t["id"]))["status"] == "in_progress"
    assert await px("pve", active=True, priority="urgent") == "updated" and (await s.async_get_ticket(hass5, t["id"]))["priority"] == "urgent"
    await s.async_sync_repair(hass5, domain="proxmoxve", issue_id="x", group="other_kind", active=True, title="Other")
    assert (await s.async_list_tickets(hass5, status="all"))["total"] == 2, "a different kind is a different ticket"
    # a repair with no kind to group by keeps its own ticket
    await s.async_sync_repair(hass5, domain="zha", issue_id="a", active=True, title="A")
    await s.async_sync_repair(hass5, domain="zha", issue_id="b", active=True, title="B")
    assert (await s.async_list_tickets(hass5, status="all"))["total"] == 4

    # tickets made before grouping: the first becomes the group's, the others merge into it
    hass6 = FakeHass()
    FakeStore.saved = {}
    for iid in ("pve", "pve2"):
        await s.async_sync_repair(hass6, domain="proxmoxve", issue_id=iid, active=True, title=f"old title {iid}", description=f"body {iid}")
    await s.async_sync_repair(hass6, domain="proxmoxve", issue_id="pve", group=K, member="pve", generic_title=f"proxmoxve: {K}",
                              active=True, title="new title pve")
    await s.async_sync_repair(hass6, domain="proxmoxve", issue_id="pve2", group=K, member="pve2", generic_title=f"proxmoxve: {K}",
                              active=True, title="new title pve2")
    rows = (await s.async_list_tickets(hass6, status="all"))["tickets"]
    live = [x for x in rows if x["status"] != "closed"]
    assert len(rows) == 2 and len(live) == 1 and live[0]["source_key"] == f"repair:proxmoxve:{K}", rows
    gone = next(x for x in rows if x["status"] == "closed")
    assert gone["merged_into"] == live[0]["id"] and gone["source_key"] is None
    _t = await s.async_get_ticket(hass6, live[0]["id"])
    assert "Affected (2)" in _t["description"], (_t["description"], _t.get("repair_members"), _t.get("repair_base"))
    print("grouped repairs ok")

    # ---- merging tickets by hand
    hass7 = FakeHass()
    FakeStore.saved = {}
    a = await s.async_create_ticket(hass7, title="Kitchen light flickers", description="Flickers at night", actor="Qionne", requester="Qionne", labels=["bug"])
    b = await s.async_create_ticket(hass7, title="Light in the kitchen blinks", description="Since Tuesday", actor="Jo", requester="Jo",
                                    labels=["bug", "blocked"], priority="high", entities=["light.kitchen"])
    c = await s.async_create_ticket(hass7, title="Unrelated", actor="Simon")
    await s.async_add_comment(hass7, b["id"], body="Looks like the driver", actor="Simon")
    await s.async_add_attachments(hass7, b["id"], [{"id": "f" * 12, "kind": "image", "mime": "image/jpeg", "ext": "jpg", "name": "p.jpg", "size": 3,
                                                    "created_at": b["created_at"], "by": "Jo"}], actor="Jo")
    await s.async_link_tickets(hass7, c["id"], b["id"], actor="Simon")
    m = await s.async_merge_tickets(hass7, a["id"], [b["id"]], actor="Simon")
    assert m["priority"] == "high" and sorted(m["labels"]) == ["blocked", "bug"] and m["entities"] == ["light.kitchen"]
    bodies = [e["body"] for e in m["events"] if e["kind"] == "comment"]
    assert any("From #%d: Light in the kitchen blinks" % b["id"] in x and "Since Tuesday" in x for x in bodies), bodies
    assert "Looks like the driver" in bodies and [e["id"] for e in m["events"]] == list(range(1, len(m["events"]) + 1))
    assert any(e["kind"] == "merge" and e["data"]["from"] == b["id"] for e in m["events"])
    assert m["attachments"][0]["ticket"] == b["id"], "the file stays in the old ticket's folder"
    src = await s.async_get_ticket(hass7, b["id"])
    assert src["status"] == "closed" and src["merged_into"] == a["id"] and src["resolution"] == f"Merged into #{a['id']}"
    assert a["id"] in src["links"] and b["id"] in m["links"]
    assert (await s.async_get_ticket(hass7, c["id"]))["links"] == [a["id"]], "links to the merged ticket move to the kept one"
    assert (await s.async_find_attachment(hass7, a["id"], "f" * 12))[1]["ticket"] == b["id"]
    for bad, why in (((a["id"], [a["id"]]), "itself"), ((a["id"], [b["id"]]), "already merged"), ((b["id"], [c["id"]]), "into a merged ticket"),
                     ((a["id"], []), "nothing"), ((a["id"], [999]), "unknown")):
        try:
            await s.async_merge_tickets(hass7, bad[0], list(bad[1]), actor="Simon")
            raise SystemExit(f"merge allowed: {why}")
        except s.TicketError:
            pass
    # merging a ticket into a closed one that is still active reopens it
    d = await s.async_create_ticket(hass7, title="D", actor="Simon")
    e_ = await s.async_create_ticket(hass7, title="E", actor="Simon")
    await s.async_close_ticket(hass7, d["id"], actor="Simon", resolution="done")
    assert (await s.async_merge_tickets(hass7, d["id"], [e_["id"]], actor="Simon"))["status"] == "in_progress"

    # merged repair tickets: the repair doesn't open a new ticket when it changes again
    hass8 = FakeHass()
    FakeStore.saved = {}
    for iid in ("one", "two"):
        await s.async_sync_repair(hass8, domain="hue", issue_id=iid, active=True, title=f"Hue {iid}")
    ids = {x["source_key"]: x["id"] for x in (await s.async_list_tickets(hass8, status="all"))["tickets"]}
    await s.async_merge_tickets(hass8, ids["repair:hue:one"], [ids["repair:hue:two"]], actor="Simon")
    assert await s.async_sync_repair(hass8, domain="hue", issue_id="two", active=True, title="Hue two") in (None, "updated")
    assert (await s.async_list_tickets(hass8, status="all"))["total"] == 2, "no new ticket for a merged repair"
    await s.async_sync_repair(hass8, domain="hue", issue_id="one", active=False)
    kept = await s.async_get_ticket(hass8, ids["repair:hue:one"])
    assert kept["status"] != "resolved", "one of the two repairs is still reported"
    assert await s.async_sync_repair(hass8, domain="hue", issue_id="two", active=False) == "resolved"
    assert sorted(await s.async_open_repair_keys(hass8)) == []
    print("merge ok")

    # Unread marks: per person, nothing unread at first, other people's changes count, one's own don't.
    FakeStore.saved = {}
    hass9 = FakeHass()
    tick = [0]
    real_now = s._now

    def fake_now():
        tick[0] += 1
        return f"2026-01-01T00:{tick[0] // 60:02d}:{tick[0] % 60:02d}+00:00"

    s._now = fake_now
    try:
        old = await s.async_create_ticket(hass9, title="Old one", requester="Qione", actor="Qione")
        me = {"id": "u1", "name": "Simon", "admin": True}
        first = (await s.async_list_tickets(hass9, status="all", viewer=me))["tickets"]
        assert [t["unread"] for t in first] == [False], "a first look starts with everything read"
        new = await s.async_create_ticket(hass9, title="Fresh", requester="Qione", actor="Qione")
        await s.async_add_comment(hass9, old["id"], body="Checked it", actor="ai:Claude")
        await s.async_add_comment(hass9, new["id"], body="Mine", actor="Simon")
        rows = {t["id"]: t for t in (await s.async_list_tickets(hass9, status="all", viewer=me))["tickets"]}
        assert rows[old["id"]]["unread"] and rows[old["id"]]["activity"]["actor"] == "ai:Claude"
        assert rows[new["id"]]["unread"] and rows[new["id"]]["activity"]["kind"] == "created", "a new request is unread"
        assert rows[old["id"]]["updated_by"] == "ai:Claude", "the row says who last changed it, not Home Desk's follow-on"
        assert rows[new["id"]]["updated_by"] == "Simon"
        await s.async_add_comment(hass9, new["id"], body="Note", actor="Simon", internal=True)
        other = {"id": "u2", "name": "Qione", "admin": False}
        theirs = {t["id"]: t for t in (await s.async_list_tickets(hass9, status="all", viewer=other))["tickets"]}
        assert not any(t["unread"] for t in theirs.values()), "another person's marks are their own"
        await s.async_add_comment(hass9, new["id"], body="Hidden", actor="Simon", internal=True)
        theirs = {t["id"]: t for t in (await s.async_list_tickets(hass9, status="all", viewer=other))["tickets"]}
        assert not theirs[new["id"]]["unread"], "internal notes don't show as updates to a household member"
        assert (await s.async_get_ticket(hass9, old["id"], user_id="u1"))["seen_at"]
        await s.async_mark_read(hass9, "u1", [old["id"]])
        rows = {t["id"]: t for t in (await s.async_list_tickets(hass9, status="all", viewer=me))["tickets"]}
        assert not rows[old["id"]]["unread"] and rows[new["id"]]["unread"]
        await s.async_add_comment(hass9, old["id"], body="Again", actor="ai:Claude")
        rows = {t["id"]: t for t in (await s.async_list_tickets(hass9, status="all", viewer=me))["tickets"]}
        assert rows[old["id"]]["unread"], "a change after reading is unread again"
        await s.async_mark_read(hass9, "u1")
        assert not any(t["unread"] for t in (await s.async_list_tickets(hass9, status="all", viewer=me))["tickets"])
    finally:
        s._now = real_now
    print("unread ok")


asyncio.run(main())

spec = importlib.util.spec_from_file_location("changelog", PKG / "changelog.py")
cl = importlib.util.module_from_spec(spec); spec.loader.exec_module(cl)
text = (PKG / "CHANGELOG.md").read_text()
assert "[0.1.0]" in cl.changelog_since(text, None)
newer = cl.changelog_since(text, "0.1.0")
assert "[Unreleased]" in newer and "[0.1.0]" not in newer
print("changelog ok")
print("ALL OK")
