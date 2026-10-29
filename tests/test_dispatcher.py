"""Drives dispatcher/home_desk_dispatcher.py against a fake Home Assistant REST endpoint and a fake `claude`. Run: python3 tests/test_dispatcher.py"""
import importlib.util
import json
import os
import stat
import sys
import tempfile
import threading
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("dispatcher", ROOT / "dispatcher" / "home_desk_dispatcher.py")
dispatcher = importlib.util.module_from_spec(spec)
sys.modules["dispatcher"] = dispatcher
spec.loader.exec_module(dispatcher)

TICKETS = {}
CALLS = []


def ticket(tid, state, **run):
    TICKETS[tid] = {"id": tid, "title": f"Ticket {tid}", "status": "in_progress", "agent_run": {"state": state, "requested_by": "Simon", **run}, "events": []}


class Fake(BaseHTTPRequestHandler):
    def log_message(self, *a):
        pass

    def _reply(self, code, obj):
        raw = json.dumps(obj).encode()
        self.send_response(code)
        self.send_header("Content-Length", str(len(raw)))
        self.end_headers()
        self.wfile.write(raw)

    def do_GET(self):
        self._reply(200, {"state": "42.0"})

    def do_POST(self):
        body = json.loads(self.rfile.read(int(self.headers["Content-Length"])))
        name = self.path.split("/")[4].split("?")[0]
        CALLS.append((name, body, self.headers["Authorization"]))
        if name == "list_tickets":
            want = body["run_state"].split(",")
            rows = [t for t in TICKETS.values() if t["agent_run"]["state"] in want]
            return self._reply(200, {"service_response": {"total": len(rows), "tickets": [{k: v for k, v in t.items() if k != "events"} for t in rows]}})
        t = TICKETS.get(body["ticket_id"])
        if name == "get_ticket":
            return self._reply(200, {"service_response": t})
        if name == "claim_run":
            if t["agent_run"]["state"] not in ("requested", "approved"):
                return self._reply(400, {"message": "already"})
            t["agent_run"]["state"] = "running"
            return self._reply(200, {"service_response": t})
        if name == "note_run":
            if t["agent_run"]["state"] != "running":
                return self._reply(400, {"message": "This run is not running"})
            t.setdefault("notes", []).append(body["note"])
            return self._reply(200, {"service_response": t})
        if name == "finish_run":
            if t["agent_run"]["state"] != "running":
                return self._reply(400, {"message": "This run was stopped"})
            t["agent_run"]["state"] = body["state"]
            t["last_body"] = body["body"]
            return self._reply(200, {"service_response": t})
        self._reply(404, {})


server = HTTPServer(("127.0.0.1", 0), Fake)
threading.Thread(target=server.serve_forever, daemon=True).start()
url = f"http://127.0.0.1:{server.server_port}"

tmp = Path(tempfile.mkdtemp())
fake = tmp / "claude"
fake.write_text("""#!/usr/bin/env python3
import json, os, sys
with open(os.environ["FAKE_CLAUDE_LOG"], "a") as f:
    f.write(json.dumps(sys.argv[1:]) + "\\n")
with open(os.environ["FAKE_CLAUDE_LOG"] + ".env", "w") as f:
    f.write(json.dumps({k: os.environ.get(k) for k in ("HA_TOKEN", "NODE_EXTRA_CA_CERTS", "HA_MCP_URL")}))
mode = os.environ.get("FAKE_CLAUDE", "ok")
if mode == "fail":
    sys.stderr.write("boom"); sys.exit(2)
def out(o): print(json.dumps(o), flush=True)
out({"type": "system", "subtype": "init"})
out({"type": "system", "subtype": "permission_denied", "message": "Permission to use a tool has been denied."})
out({"type": "assistant", "message": {"content": [{"type": "text", "text": "Looking at the ticket."}, {"type": "tool_use", "name": "mcp__home-desk__get_ticket", "input": {"ticket_id": 1}}]}})
out({"type": "user", "message": {"content": [{"type": "tool_result", "content": "a ticket", "is_error": False}]}})
text = "" if mode == "empty" else "Found it.\\n\\n**What I would change:** nothing."
out({"type": "result", "is_error": False, "result": text, "num_turns": 2, "duration_ms": 1500})
""")
fake.chmod(fake.stat().st_mode | stat.S_IEXEC)
os.environ["FAKE_CLAUDE_LOG"] = str(tmp / "claude.log")
(tmp / "mcp.json").write_text("{}")
(tmp / "token").write_text("tok\n")
(tmp / "mcp-url").write_text("https://example.invalid/private-path\n")


def make(**over):
    cfg = {"ha_url": url, "token_file": str(tmp / "token"), "claude_bin": str(fake), "mcp_config": str(tmp / "mcp.json"), "state_dir": str(tmp / "state"),
           "project_dir": str(tmp), "actor": "claude-ha", "progress_seconds": 0, "env_files": {"HA_MCP_URL": str(tmp / "mcp-url")}, "allowed_requesters": ["Simon"], "max_runs_per_day": 3, "max_runs_per_ticket_per_day": 2, **over}
    return dispatcher.Dispatcher(cfg)


def claude_calls():
    p = tmp / "claude.log"
    return [json.loads(l) for l in p.read_text().splitlines()] if p.exists() else []


# nothing asked for: no AI call at all
r = make()
assert r.once() == "idle" and claude_calls() == [], "no run requested, so no AI is started"
assert [c[0] for c in CALLS] == ["list_tickets"] and CALLS[0][2] == "Bearer tok"

# a requested run: claim, read-only review, findings posted as proposed
ticket(1, "requested")
assert r.once() == "proposed", TICKETS[1]
assert TICKETS[1]["agent_run"]["state"] == "proposed" and "Found it." in TICKETS[1]["last_body"]
args = claude_calls()[-1]
assert args[0] == "-p" and "ticket #1" in args[1] and "READ-ONLY" in args[1]
tools = args[args.index("--allowedTools") + 1].split(",")
assert "mcp__home-desk__get_ticket" in tools and not any(x in tools for x in ("mcp__home-desk__update_ticket", "mcp__home-desk__add_comment", "mcp__home-desk__close_ticket")), "a review is read-only"
assert args[args.index("--output-format") + 1] == "stream-json" and "--verbose" in args, "the stream is kept so it can be watched"
assert "--strict-mcp-config" in args and args[args.index("--permission-mode") + 1] == "dontAsk" and "--max-turns" in args
assert [c[0] for c in CALLS if c[0] == "claim_run"] == ["claim_run"] and CALLS[-1][1]["actor"] == "claude-ha"

assert "Using get_ticket" in TICKETS[1].get("notes", []) and "Writing its answer" in TICKETS[1]["notes"], TICKETS[1].get("notes")

env = json.loads((tmp / "claude.log.env").read_text())
assert env["HA_TOKEN"] == "tok" and env["NODE_EXTRA_CA_CERTS"] is None, "the AI process gets the token for its MCP servers"
assert env["HA_MCP_URL"] == "https://example.invalid/private-path", "other MCP secrets come from their own files"

# an approved run: the change is told exactly what was approved, with the change tools
TICKETS[2] = {"id": 2, "title": "t2", "status": "in_progress", "agent_run": {"state": "approved", "requested_by": "Simon", "approved_by": "Simon", "approved_at": "2026-10-20T01:00:00+00:00", "event": 7},
              "events": [{"id": 7, "body": "Replace the bulb driver.", "data": {"proceed": {"state": "approved"}}}]}
assert r.once() == "done" and TICKETS[2]["agent_run"]["state"] == "done"
args = claude_calls()[-1]
assert "Replace the bulb driver." in args[1] and "EXACTLY what you proposed" in args[1]
tools = args[args.index("--allowedTools") + 1].split(",")
assert "mcp__home-desk__update_ticket" in tools and "mcp__home-desk__close_ticket" in tools, "a change may close the ticket"
assert not any("merge" in x or "label" in x and "list" not in x for x in tools)
# an approval with no matching approved comment is not carried out
TICKETS[3] = {"id": 3, "title": "t3", "status": "in_progress", "agent_run": {"state": "approved", "requested_by": "Simon", "approved_by": "Simon", "event": 9}, "events": [{"id": 9, "body": "x", "data": {"proceed": {"state": "pending"}}}]}
n = len(claude_calls())
assert r.once() == "failed" and len(claude_calls()) == n, "no AI call without a real approval"
assert "approved proposal is missing" in TICKETS[3]["last_body"]

# a requester that is not on the AI Dispatcher's own list: refused, no AI
ticket(4, "requested", requested_by="Mallory")
n = len(claude_calls())
assert r.once() == "refused" and len(claude_calls()) == n and TICKETS[4]["agent_run"]["state"] == "failed" and "not set up to work for Mallory" in TICKETS[4]["last_body"]

# the AI failing, or answering nothing, is reported, not hidden
r2 = make(max_runs_per_day=50, max_runs_per_ticket_per_day=50, state_dir=str(tmp / "state2"))
for mode, text in (("fail", "stopped without an answer"), ("empty", "stopped without an answer")):
    os.environ["FAKE_CLAUDE"] = mode
    ticket(5, "requested")
    assert r2.once() == "failed" and text in TICKETS[5]["last_body"], TICKETS[5]
os.environ["FAKE_CLAUDE"] = "ok"

# caps: runs per ticket and per day, kept on this machine
r3 = make(max_runs_per_day=2, max_runs_per_ticket_per_day=1, state_dir=str(tmp / "state3"), allowed_requesters=[])
ticket(6, "requested"); assert r3.once() == "proposed"
ticket(6, "requested"); assert r3.once() == "refused" and "most times it is allowed" in TICKETS[6]["last_body"]
ticket(7, "requested"); assert r3.once() == "proposed"
ticket(8, "requested"); assert r3.once() == "refused" and "limit of runs for today" in TICKETS[8]["last_body"]
state = json.loads((tmp / "state3" / "state.json").read_text())
assert state["runs"] == 2 and state["tickets"]["6"] == 1

# stopped by a person while it worked: finishing is refused and the AI Dispatcher shrugs
class StopsFirst(dispatcher.Home):
    def service(self, name, **data):
        if name == "finish_run":
            TICKETS[data["ticket_id"]]["agent_run"]["state"] = "stopped"
        return super().service(name, **data)
r4 = make(state_dir=str(tmp / "state4"), allowed_requesters=[])
r4.home = StopsFirst(url, "tok")
ticket(9, "requested")
assert r4.once() == "proposed" and TICKETS[9]["agent_run"]["state"] == "stopped"
assert "finish_failed" in (tmp / "state4" / "dispatcher.log").read_text()

# you can watch it: every step in words in live.log, and the whole stream kept
live = (tmp / "state" / "live.log").read_text()
assert "#1 review started" in live and "uses mcp__home-desk__get_ticket" in live and "says: Looking at the ticket." in live and "got: a ticket" in live and "result: ok, 2 turns" in live, live
assert list((tmp / "state" / "runs").glob("*ticket1-review.jsonl")), "the stream is kept"
# the log says what happened
assert '"event": "ran"' in (tmp / "state" / "dispatcher.log").read_text()
# a run someone else has already taken is left alone
TICKETS[10] = {"id": 10, "title": "t", "status": "in_progress", "agent_run": {"state": "running"}, "events": []}
assert make(state_dir=str(tmp / "state5")).once() == "idle"
# presets: the chosen one decides the extra tools, the others are ignored; a preset that does not exist fails closed
presets = {"advise-only": {"review": ["mcp__home-assistant__ha_get_x"], "change": []},
           "fix-config": {"review": ["mcp__home-assistant__ha_get_x"], "change": ["mcp__home-assistant__ha_config_set_automation"]}}
ticket(5, "requested", requested_by="Simon")
assert make(presets=presets, preset="advise-only", extra_tools_review=["mcp__old__tool"], max_runs_per_day=9, max_runs_per_ticket_per_day=9, state_dir=str(tmp / "state6")).once() == "proposed"
tools = claude_calls()[-1][claude_calls()[-1].index("--allowedTools") + 1].split(",")
assert "mcp__home-assistant__ha_get_x" in tools and "mcp__old__tool" not in tools, "a preset replaces extra_tools_*"
assert '"preset": "advise-only"' in (tmp / "state6" / "dispatcher.log").read_text()
TICKETS[6] = {"id": 6, "title": "t", "status": "in_progress", "agent_run": {"state": "approved", "requested_by": "Simon", "approved_by": "Simon", "event": 7}, "events": [{"id": 7, "body": "Edit it.", "data": {"proceed": {"state": "approved"}}}]}
assert make(presets=presets, preset="advise-only", max_runs_per_day=9, max_runs_per_ticket_per_day=9, state_dir=str(tmp / "state7")).once() == "done"
assert "ha_config_set_automation" not in " ".join(claude_calls()[-1]), "Advise Only has no write tool"
TICKETS[7] = {"id": 7, "title": "t", "status": "in_progress", "agent_run": {"state": "approved", "requested_by": "Simon", "approved_by": "Simon", "event": 7}, "events": [{"id": 7, "body": "Edit it.", "data": {"proceed": {"state": "approved"}}}]}
res = make(presets=presets, preset="fix-config", max_runs_per_day=9, max_runs_per_ticket_per_day=9, state_dir=str(tmp / "state8")).once()
assert res == "done", (res, {k: v["agent_run"] for k, v in TICKETS.items() if v["agent_run"]["state"] in ("requested", "approved", "running")})
assert "mcp__home-assistant__ha_config_set_automation" in claude_calls()[-1][claude_calls()[-1].index("--allowedTools") + 1].split(",")
n = len(claude_calls())
try:
    make(presets=presets, preset="fix-confg"); raise SystemExit("expected an error for an unknown preset")
except dispatcher.DispatcherError as e:
    assert "not defined" in str(e) and len(claude_calls()) == n
# a read-only address for the review and a writing one for the change: each phase gets only its own
(tmp / "mcp-url-readonly").write_text("https://example.invalid/private-path/readonly\n")
(tmp / "mcp-url-write").write_text("https://example.invalid/private-path\n")
rp = make(env_files={}, env_files_review={"HA_MCP_URL": str(tmp / "mcp-url-readonly")}, env_files_change={"HA_MCP_URL": str(tmp / "mcp-url-write")})
assert rp._env("review")["HA_MCP_URL"].endswith("/readonly"), "the review step is given the read-only address"
assert rp._env("change")["HA_MCP_URL"] == "https://example.invalid/private-path", "only the change step is given the writing one"
rq = make(env_files={"HA_MCP_URL": str(tmp / "mcp-url-write")}, env_files_review={"HA_MCP_URL": str(tmp / "mcp-url-readonly")})
assert rq._env("review")["HA_MCP_URL"].endswith("/readonly") and not rq._env("change")["HA_MCP_URL"].endswith("/readonly"), "a phase file wins over the shared one"
print("dispatcher ok")
