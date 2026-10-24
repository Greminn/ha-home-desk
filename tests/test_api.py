"""Exercises websocket_api.py and services.py against a stubbed Home Assistant (no HA install needed).

Checks who may do what: household users can raise a ticket and nothing else, every other service needs an administrator,
and the new commands and services (categories, settings, the AI agent) do what the panel and agents expect.

Run:  uv run --with voluptuous python tests/test_api.py      (or: pip install voluptuous; python3 -I tests/test_api.py)
"""
import asyncio
import enum
import importlib.util
import json
import sys
import types
from pathlib import Path

import voluptuous as vol

ROOT = Path(__file__).resolve().parents[1]
PKG = ROOT / "custom_components" / "home_desk"


# ---------------------------------------------------------------- stand-ins for Home Assistant


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


class FakeServices:
    def __init__(self):
        self.open = {}
        self.admin = {}

    def async_register(self, domain, name, handler, schema=None, supports_response=None):
        self.open[name] = (handler, schema)


class FakeHass:
    def __init__(self):
        self.data = {}
        self.bus = FakeBus()
        self.services = FakeServices()
        self.config = types.SimpleNamespace(language="en", config_dir="/config", path=lambda p: "/config/" + p)
        self.tasks = []
        self.auth = types.SimpleNamespace(async_get_user=self._user)
        self.users = {}

    async def _user(self, user_id):
        return self.users.get(user_id)

    def async_create_task(self, coro):
        self.tasks.append(asyncio.ensure_future(coro))

    async def async_add_executor_job(self, fn, *args):
        return fn(*args)


class SupportsResponse(enum.Enum):
    NONE = "none"
    OPTIONAL = "optional"
    ONLY = "only"


class HomeAssistantError(Exception):
    pass


class Unauthorized(Exception):
    def __init__(self, *args, **kwargs):
        super().__init__("Unauthorized")


class ServiceCall:
    def __init__(self, data, user_id=None):
        self.data = data
        self.context = types.SimpleNamespace(user_id=user_id)


REGISTERED = []  # websocket commands, in the order they were registered


def websocket_command(schema):
    def deco(fn):
        fn._schema = vol.Schema(schema)
        return fn
    return deco


def require_admin(fn):
    async def wrapper(hass, connection, msg):
        if not (connection.user and connection.user.is_admin):
            connection.send_error(msg["id"], "unauthorized", "Unauthorized")
            return
        await fn(hass, connection, msg)
    wrapper._schema = None
    return wrapper


def stub(name, **attrs):
    m = types.ModuleType(name)
    m.__dict__.update(attrs)
    sys.modules[name] = m
    return m


async_response = lambda fn: fn  # noqa: E731 - the real one schedules a task; here handlers are awaited directly

stub("homeassistant")
stub("homeassistant.core", HomeAssistant=FakeHass, ServiceCall=ServiceCall, SupportsResponse=SupportsResponse, Event=object, callback=lambda f: f)
stub("homeassistant.exceptions", HomeAssistantError=HomeAssistantError, Unauthorized=Unauthorized)
stub("homeassistant.helpers.storage", Store=FakeStore)
stub("homeassistant.util")
stub("homeassistant.util.dt", utcnow=lambda: None, DEFAULT_TIME_ZONE=None)
def _string(value):
    if value is None or isinstance(value, (list, dict)):  # like Home Assistant's cv.string
        raise vol.Invalid("string value is None")
    return str(value)


stub("homeassistant.helpers.config_validation", string=_string, boolean=bool,
     ensure_list=lambda v: v if isinstance(v, list) else [v])
ADMIN_SERVICES = {}


def async_register_admin_service(hass, domain, name, handler, schema=None, supports_response=None):
    ADMIN_SERVICES[name] = (handler, schema)


stub("homeassistant.helpers.service", async_register_admin_service=async_register_admin_service)
ws = stub("homeassistant.components.websocket_api", websocket_command=websocket_command, require_admin=require_admin,
          async_response=async_response, async_register_command=lambda hass, cmd: REGISTERED.append(cmd),
          ActiveConnection=object)
stub("homeassistant.components", websocket_api=ws)
helpers = stub("homeassistant.helpers")
helpers.storage = sys.modules["homeassistant.helpers.storage"]

pkg = types.ModuleType("home_desk")
pkg.__path__ = [str(PKG)]
sys.modules["home_desk"] = pkg
for mod in ("const", "changelog", "redact", "storage", "agent_context", "agent", "websocket_api", "services"):
    spec = importlib.util.spec_from_file_location(f"home_desk.{mod}", PKG / f"{mod}.py")
    m = importlib.util.module_from_spec(spec)
    sys.modules[f"home_desk.{mod}"] = m
    spec.loader.exec_module(m)
s = sys.modules["home_desk.storage"]
wsapi = sys.modules["home_desk.websocket_api"]
services = sys.modules["home_desk.services"]


class Conn:
    """A websocket connection for one user: remembers what the handler answered."""

    def __init__(self, name, admin, user_id=None):
        self.user = types.SimpleNamespace(name=name, is_admin=admin, id=user_id or name.lower())
        self.result = None
        self.error = None

    def send_result(self, _id, result):
        self.result = result

    def send_error(self, _id, code, message):
        self.error = (code, message)


ADMIN = lambda: Conn("Simon", True)  # noqa: E731
HOUSEHOLD = lambda: Conn("Alex", False)  # noqa: E731


HANDLERS = {}


async def call(hass, command, conn, **msg):
    await HANDLERS[command](hass, conn, {"id": 1, "type": f"home_desk/{command}", **msg})
    return conn




async def main():
    hass = FakeHass()
    wsapi.async_register_commands(hass)
    # The decorators wrap each handler, so they are matched to names by registration order (see async_register_commands).
    names = ["list", "get", "mark_read", "stats", "create", "update", "comment", "close", "link", "merge", "delete", "labels", "label_create", "label_update",
             "label_delete", "categories", "category_create", "category_update", "category_delete", "settings", "settings_save", "proposal", "agent_run", "agent_stop", "agent_test", "suggest", "agent_run_now", "proceed", "users"]
    assert len(REGISTERED) == len(names), (len(REGISTERED), "commands registered")
    HANDLERS.update(dict(zip(names, REGISTERED)))

    # ---- who may call which websocket command
    FakeStore.saved = {}
    t = await s.async_create_ticket(hass, title="Alex's ticket", requester="Alex")
    mine, theirs = t["id"], (await s.async_create_ticket(hass, title="Someone else's", requester="Jo"))["id"]
    # What a household user may do: raise a ticket, and list their own. Everything else is for admins (they can't open a
    # ticket or comment on it, even their own: anything more is talked through in person).
    open_to_household = {"list", "create", "labels", "categories"}
    for name in names:
        if name in open_to_household:
            continue
        conn = await call(hass, name, HOUSEHOLD(), ticket_id=mine, merge_ids=[theirs], label_id="bug", category_id="home-assistant")
        assert conn.error and conn.error[0] == "unauthorized", f"{name} must be admin only, got {conn.error} {conn.result}"
    print("admin-only commands ok:", sorted(set(names) - open_to_household))

    # marking read: admins only (checked above); it answers with how many, and the list carries the person's own unread marks
    marked = (await call(hass, "mark_read", ADMIN(), ticket_ids=[mine])).result
    assert marked == {"marked": 1}
    listed = (await call(hass, "list", ADMIN(), status="all")).result["tickets"]
    assert all("unread" in row for row in listed), "the list says what is unread"

    # a household user sees only their own tickets in the list
    await s.async_add_comment(hass, mine, actor="Simon", body="private working note", internal=True)
    assert (await call(hass, "get", ADMIN(), ticket_id=mine)).result["events"][-1]["kind"] in ("note", "status")
    # ...and can raise a ticket, but can't set what a manager sets
    conn = await call(hass, "list", HOUSEHOLD(), status="all")
    assert [x["title"] for x in conn.result["tickets"]] == ["Alex's ticket"], conn.result
    assert (await call(hass, "list", ADMIN(), status="all")).result["total"] == 2, "a manager sees everyone's tickets"
    conn = await call(hass, "create", HOUSEHOLD(), title="Door code", priority="urgent", labels=["bug", "task", "garden"], category="home-assistant")
    made = conn.result
    assert made["priority"] == "normal", "a household user can't set the priority"
    assert made["labels"] == ["bug"], made["labels"]  # only Bug, Enhancement and Question are open to them
    assert made["category"] is None, "...or the category"
    assert made["requester"] == "Alex"
    conn = await call(hass, "create", ADMIN(), title="Planned work", priority="urgent", labels=["task"], category="home-assistant")
    assert conn.result["priority"] == "urgent" and conn.result["category"] == "home-assistant" and conn.result["labels"] == ["task"]
    print("household create ok")

    print("websocket permissions ok")

    # ---- admin: categories and settings over the websocket
    conn = await call(hass, "category_create", ADMIN(), name="Network", icon="mdi:lan")
    assert conn.result["id"] == "network"
    conn = await call(hass, "category_create", ADMIN(), name="network")
    assert conn.error and conn.error[0] == "invalid", conn.error
    conn = await call(hass, "categories", HOUSEHOLD())
    assert [c["id"] for c in conn.result["categories"]] == ["home-assistant", "network"], "everyone can read the categories"
    conn = await call(hass, "update", ADMIN(), ticket_id=made["id"], category="network", status="open")
    assert conn.result["category"] == "network" and conn.result["status"] == "in_progress", conn.result  # "open" is accepted
    conn = await call(hass, "list", ADMIN(), category="network", status="all")
    assert conn.result["total"] == 1
    conn = await call(hass, "update", ADMIN(), ticket_id=made["id"], category="Nowhere")
    assert conn.error and "Unknown category" in conn.error[1]
    conn = await call(hass, "category_update", ADMIN(), category_id="home-assistant", name="x")
    assert conn.error and "built-in" in conn.error[1]
    conn = await call(hass, "category_delete", ADMIN(), category_id="network")
    assert conn.result == {"removed_from": 1}
    conn = await call(hass, "settings", ADMIN())
    assert conn.result["auto_close"] == "7d" and conn.result["notify"]["new_ticket"] is True
    conn = await call(hass, "settings_save", ADMIN(), auto_close="1d", notify={"targets": ["mobile_app_x"]})
    assert conn.result["auto_close"] == "1d" and conn.result["notify"]["targets"] == ["mobile_app_x"]
    conn = await call(hass, "settings_save", ADMIN(), auto_close="1d", **{"agent": "ai_task.claude"})
    assert conn.result["agent"] == "ai_task.claude"
    conn = await call(hass, "settings", Conn("Jo", True))
    assert conn.result["notify"]["targets"] == [] and conn.result["auto_close"] == "1d", "notifications are per manager, the rest shared"
    # turning "Tickets from Repairs" on triggers a catch-up; changing the delay triggers an auto-close check
    caught = []
    async def catch_up():
        caught.append(True)
    hass.data["home_desk_repairs_catch_up"] = catch_up
    await call(hass, "settings_save", ADMIN(), repairs=False)
    await call(hass, "settings_save", ADMIN(), repairs=True)
    await asyncio.gather(*hass.tasks)
    assert caught == [True], "only switching it on catches up"
    print("websocket admin commands ok")

    # the schemas, as Home Assistant would apply them before calling a handler
    create_schema = HANDLERS["create"]._schema
    create_schema({"type": "home_desk/create", "title": "ok", "category": "network"})
    update_schema = HANDLERS["update"]._schema
    for ok in ({"status": "open"}, {"status": "in_progress"}, {"category": None}, {"assignee": None}):
        update_schema({"type": "home_desk/update", "ticket_id": 1, **ok})
    for bad in ({"status": "bogus"}, {"status": "waiting"}, {"priority": "huge"}):
        try:
            update_schema({"type": "home_desk/update", "ticket_id": 1, **bad})
            raise SystemExit(f"schema accepted {bad}")
        except vol.Invalid:
            pass
    save_schema = HANDLERS["settings_save"]._schema
    for bad in ({"auto_close": "soon"}, {"notify": {"colour": True}}, {"repairs": "yes please"}, {"agent_daily_cap": 0}, {"agent_states": "sure"}):
        try:
            save_schema({"type": "home_desk/settings_save", **bad})
            raise SystemExit(f"settings schema accepted {bad}")
        except vol.Invalid:
            pass
    for good in ({"stt": "stt.whisper"}, {"transcribe": False}, {"agent_states": True, "agent_config": True,
                                                                 "agent_related": True, "agent_daily_cap": 20, "agent_prompt": "Be brief."}):
        save_schema({"type": "home_desk/settings_save", **good})  # every setting the panel saves must be accepted
    print("websocket schemas ok")

    # ---- services: only the guide and the changelog are open to everyone
    FakeStore.saved = {}
    hass = FakeHass()
    ADMIN_SERVICES.clear()
    await services.async_setup_services(hass)
    ADMIN_SERVICES.update({k: v for k, v in hass.services.open.items() if k not in ("get_guide", "get_changelog")})
    assert {"get_guide", "get_changelog"} <= set(hass.services.open)
    for name in ("create_ticket", "get_ticket", "list_tickets", "update_ticket", "add_comment", "close_ticket", "link_tickets",
                 "merge_tickets", "list_labels", "create_label", "update_label", "delete_label", "list_categories", "create_category", "update_category", "delete_category", "get_stats"):
        assert name in ADMIN_SERVICES, f"{name} must need an administrator"
    # everything but the guide and the changelog refuses an ordinary (non-administrator) user, whoever asks
    ns = types.SimpleNamespace
    hass.users = {
        "u-admin": ns(id="u-admin", is_admin=True, is_active=True, name="Simon"),
        "u-house": ns(id="u-house", is_admin=False, is_active=True, name="Alex"),
        "u-agent": ns(id="u-agent", is_admin=False, is_active=True, name="Claude Agent"),
    }
    for name, (handler, _schema) in ADMIN_SERVICES.items():
        try:
            await handler(ServiceCall({"ticket_id": 1}, user_id="u-house"))
            raise SystemExit(f"{name} let a household user in")
        except Unauthorized:
            pass
        try:
            await handler(ServiceCall({"ticket_id": 1}, user_id="u-agent"))
            raise SystemExit(f"{name} let a user in who is not set up as the AI Agent")
        except Unauthorized:
            pass
    print("service permissions ok")

    def svc(_service, **data):
        handler, schema = ADMIN_SERVICES[_service]
        return handler(ServiceCall(schema(data) if schema else data))

    # the services take the new fields, and the old names
    a = await svc("create_ticket", title="Wi-Fi drops", actor="claude")
    await svc("create_category", name="Network", icon="mdi:lan", actor="claude")
    a = await svc("update_ticket", ticket_id=a["id"], category="network", actor="claude")
    assert a["category"] == "network" and a["status"] == "in_progress"
    assert (await svc("update_ticket", ticket_id=a["id"], status="open", actor="claude"))["status"] == "in_progress"
    assert (await svc("update_ticket", ticket_id=a["id"], status="waiting", actor="claude"))["labels"] == ["blocked"]
    assert (await svc("list_tickets", category="Network"))["total"] == 1
    assert (await svc("list_tickets", category="none"))["total"] == 0
    assert (await svc("list_categories"))["categories"][1]["count"] == 1
    assert (await svc("update_category", category="Network", name="Networking"))["name"] == "Networking"
    try:
        await svc("delete_category", category="networking")
        raise SystemExit("an agent deleted a category in use")
    except HomeAssistantError as err:
        assert "use Networking" in str(err)
    await svc("update_ticket", ticket_id=a["id"], category=None, actor="claude")
    assert (await svc("delete_category", category="Networking")) == {"deleted": "Networking"}
    try:
        await svc("delete_category", category="Home Assistant")
        raise SystemExit("deleted the built-in category")
    except HomeAssistantError:
        pass
    # merging: an agent folds a duplicate into another ticket
    dup = await svc("create_ticket", title="Wi-Fi keeps dropping", actor="Jo")
    merged = await svc("merge_tickets", ticket_id=a["id"], merge_ids=[dup["id"]], actor="claude")
    assert merged["id"] == a["id"] and any(e["kind"] == "merge" for e in merged["events"])
    try:
        await svc("merge_tickets", ticket_id=a["id"], merge_ids=[dup["id"]], actor="claude")
        raise SystemExit("merged the same ticket twice")
    except HomeAssistantError:
        pass
    # labels: agents can create, change and delete unused ones, never a built-in or one in use
    lab = await svc("create_label", name="Zigbee", color="teal", description="Zigbee devices", actor="claude")
    assert lab["id"] == "zigbee" and lab["color"] == "teal" and not lab["builtin"]
    try:
        await svc("create_label", name="zigbee", actor="claude")
        raise SystemExit("a duplicate label was created")
    except HomeAssistantError:
        pass
    assert (await svc("update_label", label="Zigbee", name="Zigbee mesh", color="purple"))["name"] == "Zigbee mesh"
    await svc("update_ticket", ticket_id=a["id"], add_labels=["zigbee"], actor="claude")
    try:
        await svc("delete_label", label="zigbee")
        raise SystemExit("an agent deleted a label in use")
    except HomeAssistantError as err:
        assert "use Zigbee mesh" in str(err)
    await svc("update_ticket", ticket_id=a["id"], remove_labels=["zigbee"], actor="claude")
    assert (await svc("delete_label", label="Zigbee mesh")) == {"deleted": "Zigbee mesh"}
    for bad in (dict(label="Bug", name="Defect"), ):
        try:
            await svc("update_label", **bad)
            raise SystemExit("changed a built-in label")
        except HomeAssistantError:
            pass
    try:
        await svc("delete_label", label="Bug")
        raise SystemExit("deleted a built-in label")
    except HomeAssistantError:
        pass
    try:
        await svc("create_label", name="Odd", color="chartreuse")
        raise SystemExit("an unknown colour was accepted")
    except Exception as err:
        assert not isinstance(err, SystemExit)
    stats = await svc("get_stats")
    assert stats["no_category"] == 1 and "with_agent" in stats and [c["id"] for c in stats["categories"]] == ["home-assistant"]
    # the AI agent flow through the services: assign, then the agent replies
    await svc("update_ticket", ticket_id=a["id"], assignee="ai:Claude", actor="Simon")
    assert hass.bus.events[-1][1]["kind"] == "assigned"
    reply = await svc("add_comment", ticket_id=a["id"], body="Checked: it is the router.", actor="claude")
    assert reply["assignee"] is None
    # keep_assigned: an agent adds evidence (a note, or a comment) to a ticket it is watching without it leaving its queue
    await svc("update_ticket", ticket_id=a["id"], assignee="ai:AI", actor="Simon")
    kept = await svc("add_comment", ticket_id=a["id"], body="Still fine at 08:00.", internal=True, keep_assigned=True, actor="claude")
    assert kept["assignee"] == "ai:AI", "keep_assigned leaves the ticket queued"
    kept = await svc("add_comment", ticket_id=a["id"], body="A public update too.", keep_assigned=True, actor="claude")
    assert kept["assignee"] == "ai:AI"
    handed = await svc("add_comment", ticket_id=a["id"], body="Done, over to you.", actor="claude")
    assert handed["assignee"] is None, "without it the comment hands the ticket back, as before"
    # an agent must name its actor, otherwise it is attributed to Home Assistant (no user on an automation call)
    assert (await svc("add_comment", ticket_id=a["id"], body="from an automation"))["events"][-1]["actor"] == "Home Assistant"
    # the old tag names still work
    old = await svc("create_ticket", title="old style", type="issue", tags=["zigbee"])
    assert old["labels"] == ["bug", "zigbee"], old["labels"]
    for bad in ({"title": "x", "priority": "huge"}, {"ticket_id": 1, "status": "bogus"}):
        try:
            name = "create_ticket" if "title" in bad else "update_ticket"
            ADMIN_SERVICES[name][1](bad)
            raise SystemExit(f"service schema accepted {bad}")
        except vol.Invalid:
            pass
    # ---- Run AI Agent Now, end to end: request, claim, findings, Proceed, the change
    await s.async_save_settings(hass, {"agent_runner": False})
    rt = await svc("create_ticket", title="Hall light flickers", actor="Simon")
    off = await call(hass, "agent_run_now", ADMIN(), ticket_id=rt["id"])
    assert off.error and "not switched on" in off.error[1], "Run AI Agent Now needs switching on in Settings"
    await s.async_save_settings(hass, {"agent_runner": True, "agent_user": "u-agent"})
    house = await call(hass, "agent_run_now", HOUSEHOLD(), ticket_id=rt["id"])
    assert house.error and house.error[0] == "unauthorized"
    req = (await call(hass, "agent_run_now", ADMIN(), ticket_id=rt["id"])).result
    assert req["agent_run"]["state"] == "requested" and req["agent_state"]["kind"] == "run", req.get("agent_run")
    again = await call(hass, "agent_run_now", ADMIN(), ticket_id=rt["id"])
    assert again.error and "already" in again.error[1], "one run at a time"
    # the runner finds it, as the agent user (not an administrator), and takes it
    waiting = await ADMIN_SERVICES["list_tickets"][0](ServiceCall({"run_state": "requested"}, user_id="u-agent"))
    assert [x["id"] for x in waiting["tickets"]] == [rt["id"]], waiting
    claimed = await ADMIN_SERVICES["claim_run"][0](ServiceCall({"ticket_id": rt["id"], "actor": "claude-ha"}, user_id="u-agent"))
    noted = await ADMIN_SERVICES["note_run"][0](ServiceCall({"ticket_id": rt["id"], "note": "Using get_ticket", "actor": "claude-ha"}, user_id="u-agent"))
    assert noted["agent_state"]["note"] == "Using get_ticket", "the working indicator says what the runner is doing"
    assert claimed["agent_run"]["state"] == "running" and claimed["agent_run"]["mode"] == "review" and claimed["agent_run"]["claimed_by"] == "claude-ha"
    try:
        await ADMIN_SERVICES["claim_run"][0](ServiceCall({"ticket_id": rt["id"], "actor": "other-runner"}, user_id="u-agent"))
        raise SystemExit("two runners took one ticket")
    except HomeAssistantError as err:
        assert "already" in str(err)
    # read-only until a person presses Proceed: during the review the agent user can comment, but not change, close, link or create
    other = await svc("create_ticket", title="An unrelated ticket", actor="Simon")
    async def as_agent(name, **data):
        return await ADMIN_SERVICES[name][0](ServiceCall({"actor": "claude-ha", **data}, user_id="u-agent"))
    async def refused(name, **data):
        try:
            await as_agent(name, **data)
        except HomeAssistantError as err:
            return str(err)
        raise SystemExit(f"the agent user could {name} when it should not")
    await as_agent("add_comment", ticket_id=rt["id"], body="looking at it")
    for name, data in (("update_ticket", {"ticket_id": rt["id"], "priority": "high"}), ("close_ticket", {"ticket_id": rt["id"], "resolution": "x"}),
                       ("link_tickets", {"ticket_id": rt["id"], "other_id": other["id"]}), ("create_ticket", {"title": "x"})):
        assert "Proceed" in await refused(name, **data), name
    assert "ask" in (await refused("add_comment", ticket_id=other["id"], body="x")), "it may comment only on the ticket it was asked to work"
    # what the agent user may not do
    for name, data in (("merge_tickets", {"ticket_id": rt["id"], "merge_ids": [1]}), ("create_label", {"name": "x"}), ("delete_category", {"category": "x"})):
        try:
            await ADMIN_SERVICES[name][0](ServiceCall(data, user_id="u-agent"))
            raise SystemExit(f"the agent user could {name}")
        except Unauthorized:
            pass
    # it names itself as an AI whatever it passes
    note = await ADMIN_SERVICES["add_comment"][0](ServiceCall({"ticket_id": rt["id"], "body": "looking", "internal": True, "actor": "Simon"}, user_id="u-agent"))
    assert [e for e in note["events"] if e["kind"] == "note"][-1]["actor"] == "ai:Simon", "the agent user can't pass for a person"
    found = await ADMIN_SERVICES["finish_run"][0](ServiceCall({"ticket_id": rt["id"], "state": "proposed", "body": "The bulb driver is failing. I would replace it.", "actor": "claude-ha"}, user_id="u-agent"))
    ev = [e for e in found["events"] if e["kind"] == "comment"][-1]
    assert found["agent_run"]["state"] == "proposed" and "agent_state" not in found and ev["actor"] == "ai:claude-ha" and ev["data"]["proceed"] == {"state": "pending"}, ev
    # only a person pressing Proceed (an administrator, in the panel) lets it change anything
    deny = await call(hass, "proceed", HOUSEHOLD(), ticket_id=rt["id"], event_id=ev["id"], do="approve")
    assert deny.error and deny.error[0] == "unauthorized"
    ok = (await call(hass, "proceed", ADMIN(), ticket_id=rt["id"], event_id=ev["id"], do="approve")).result
    assert ok["agent_run"]["state"] == "approved" and ok["agent_state"]["note"].startswith("Waiting for the AI Agent to carry out")
    twice = await call(hass, "proceed", ADMIN(), ticket_id=rt["id"], event_id=ev["id"], do="approve")
    assert twice.error and "already" in twice.error[1]
    do = await ADMIN_SERVICES["claim_run"][0](ServiceCall({"ticket_id": rt["id"], "actor": "claude-ha"}, user_id="u-agent"))
    assert do["agent_run"]["mode"] == "change" and do["agent_state"]["note"] == "Carrying out the approved change"
    # the approved change run can change this ticket, and only this one
    await as_agent("update_ticket", ticket_id=rt["id"], priority="high")
    assert "Proceed" in await refused("update_ticket", ticket_id=other["id"], priority="high")
    await as_agent("create_ticket", title="Raised by the approved change")
    # Stop while it works: the runner then can't finish
    stopped = (await call(hass, "agent_stop", ADMIN(), ticket_id=rt["id"])).result
    assert stopped == {"stopped": rt["id"]} and (await s.async_get_ticket(hass, rt["id"]))["agent_run"]["state"] == "stopped"
    try:
        await ADMIN_SERVICES["finish_run"][0](ServiceCall({"ticket_id": rt["id"], "state": "done", "body": "Replaced it.", "actor": "claude-ha"}, user_id="u-agent"))
        raise SystemExit("a stopped run was finished")
    except HomeAssistantError as err:
        assert "stopped" in str(err)
    # a second run can be asked for, dismissed, and then asked for again
    await call(hass, "agent_run_now", ADMIN(), ticket_id=rt["id"])
    await ADMIN_SERVICES["claim_run"][0](ServiceCall({"ticket_id": rt["id"], "actor": "claude-ha"}, user_id="u-agent"))
    f2 = await ADMIN_SERVICES["finish_run"][0](ServiceCall({"ticket_id": rt["id"], "state": "proposed", "body": "Nothing to do.", "actor": "claude-ha"}, user_id="u-agent"))
    dis = (await call(hass, "proceed", ADMIN(), ticket_id=rt["id"], event_id=[e for e in f2["events"] if e["kind"] == "comment"][-1]["id"], do="dismiss")).result
    assert dis["agent_run"]["state"] == "dismissed" and "agent_state" not in dis
    await call(hass, "agent_run_now", ADMIN(), ticket_id=rt["id"])
    await ADMIN_SERVICES["claim_run"][0](ServiceCall({"ticket_id": rt["id"], "actor": "claude-ha"}, user_id="u-agent"))
    f3 = await ADMIN_SERVICES["finish_run"][0](ServiceCall({"ticket_id": rt["id"], "state": "done", "body": "Done.", "actor": "claude-ha"}, user_id="u-agent"))
    assert f3["agent_run"]["state"] == "done"
    # once the run is over the agent user is read-only again
    assert "Proceed" in await refused("update_ticket", ticket_id=rt["id"], priority="low")
    assert "ask" in await refused("add_comment", ticket_id=rt["id"], body="more")
    # "What I would change: Nothing" has no go-ahead to give
    await call(hass, "agent_run_now", ADMIN(), ticket_id=rt["id"])
    await ADMIN_SERVICES["claim_run"][0](ServiceCall({"ticket_id": rt["id"], "actor": "claude-ha"}, user_id="u-agent"))
    f4 = await ADMIN_SERVICES["finish_run"][0](ServiceCall({"ticket_id": rt["id"], "state": "proposed", "body": "What I found\n\nAll fine.\n\n**What I would change:**\n\nNothing. Dismiss this.", "actor": "claude-ha"}, user_id="u-agent"))
    assert f4["agent_run"]["state"] == "done" and not [e for e in f4["events"] if (e.get("data") or {}).get("proceed") and e["id"] == f4["agent_run"]["event"]]
    # the master switch: off takes every ticket off the AI's queue, and nothing an AI does is accepted until it is on again
    queued = await svc("create_ticket", title="Queued for the agent", actor="Simon", assignee="ai:AI")
    running = await svc("create_ticket", title="Being run", actor="Simon")
    await call(hass, "agent_run_now", ADMIN(), ticket_id=running["id"])
    await s.async_save_settings(hass, {"ai_enabled": False})
    after = await s.async_get_ticket(hass, queued["id"])
    assert after["assignee"] is None and after["events"][-1]["data"] == {"field": "assignee", "from": "ai:AI", "to": None}, "the queue is cleared"
    stopped = await s.async_get_ticket(hass, running["id"])
    assert stopped["agent_run"]["state"] == "stopped" and "agent_state" not in stopped, "a run in progress is ended"
    async def off_refused(coro):
        try:
            await coro
        except (HomeAssistantError, s.TicketError) as err:
            assert "switched off" in str(err), err
            return
        raise SystemExit("something AI worked with the master switch off")
    await off_refused(svc("update_ticket", ticket_id=queued["id"], assignee="ai:AI"))
    await off_refused(svc("create_ticket", title="For the agent", assignee="ai:AI"))
    await off_refused(as_agent("add_comment", ticket_id=running["id"], body="still here"))
    await off_refused(ADMIN_SERVICES["claim_run"][0](ServiceCall({"ticket_id": running["id"], "actor": "claude-ha"})))
    await off_refused(svc("add_comment", ticket_id=running["id"], body="from an agent", actor="ai:claude"))
    for command in ("agent_run_now", "agent_run"):
        r = await call(hass, command, ADMIN(), ticket_id=running["id"])
        assert r.error and "switched off" in r.error[1], command
    r = await call(hass, "agent_test", ADMIN())
    assert r.error and "switched off" in r.error[1], "the test of the AI"
    await svc("update_ticket", ticket_id=queued["id"], priority="high", actor="Simon")  # people still work tickets as before
    await s.async_save_settings(hass, {"ai_enabled": True})
    again = await svc("update_ticket", ticket_id=queued["id"], assignee="ai:AI", actor="Simon")
    assert again["assignee"] == "ai:AI", "back on, nothing restores the old queue but assigning works again"
    print("ai switch ok")
    # deleting a ticket is for administrators in the panel only (there is no service), and takes it out of the history
    doomed = await svc("create_ticket", title="Created by mistake", actor="Simon")
    deny = await call(hass, "delete", HOUSEHOLD(), ticket_id=doomed["id"])
    assert deny.error and deny.error[0] == "unauthorized", "a household user deleted a ticket"
    assert "delete_ticket" not in ADMIN_SERVICES, "there must be no delete service: an agent could use it"
    gone = (await call(hass, "delete", ADMIN(), ticket_id=doomed["id"])).result
    assert gone == {"deleted": doomed["id"]}
    again = await call(hass, "delete", ADMIN(), ticket_id=doomed["id"])
    assert again.error and again.error[0] == "invalid"
    print("delete ok")
    print("agent run ok")

    print("services ok")
    print("ALL OK")


asyncio.run(main())
