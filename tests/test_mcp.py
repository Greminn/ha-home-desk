"""Drives mcp/server.py's tools against a fake HA REST endpoint. Run: uv run --with "mcp<2" python tests/test_mcp.py"""
import importlib.util, json, os, threading
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path

calls = []

class H(BaseHTTPRequestHandler):
    def do_POST(self):
        body = json.loads(self.rfile.read(int(self.headers["Content-Length"])))
        calls.append((self.path, self.headers["Authorization"], body))
        if body.get("ticket_id") == 404:
            self.send_response(400); self.end_headers(); self.wfile.write(b"Ticket 404 not found"); return
        out = {"changed_states": [], "service_response": {"id": body.get("ticket_id", 1), "title": "t", "status": body.get("status", "new"), "big": "x" * 10}}
        self.send_response(200); self.send_header("Content-Type", "application/json"); self.end_headers()
        self.wfile.write(json.dumps(out).encode())
    def log_message(self, *a): pass

srv = HTTPServer(("127.0.0.1", 0), H)
threading.Thread(target=srv.serve_forever, daemon=True).start()
os.environ.update(HA_URL=f"http://127.0.0.1:{srv.server_port}", HA_TOKEN="tok", HOMEDESK_ACTOR="claude")
spec = importlib.util.spec_from_file_location("srv", Path(__file__).resolve().parents[1] / "mcp" / "server.py")
m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)

r = m.close_ticket(7, "Restarted Z2M")
assert r["status"] == "resolved" and "big" not in r, r
path, auth, body = calls[-1]
assert path == "/api/services/home_desk/close_ticket?return_response" and auth == "Bearer tok", path
assert body == {"ticket_id": 7, "resolution": "Restarted Z2M", "status": "resolved", "actor": "ai:claude"}, body
import json as _j
assert m.mcp._tool_manager.get_tool("get_guide") is not None
m.list_tickets(query="zigbee"); assert calls[-1][2]["query"] == "zigbee" and "label" not in calls[-1][2]
m.add_comment(5, "evidence", internal=True, keep_assigned=True)
assert calls[-1][2] == {"ticket_id": 5, "body": "evidence", "internal": True, "keep_assigned": True, "actor": "ai:claude"}, calls[-1][2]
m.add_comment(5, "answer"); assert calls[-1][2]["keep_assigned"] is False
m.update_ticket(3, add_labels=["x"]); assert calls[-1][2] == {"ticket_id": 3, "add_labels": ["x"], "actor": "ai:claude"}
assert m.get_ticket(1)["big"]  # reads return everything
try:
    m.get_ticket(404); raise SystemExit("expected error")
except RuntimeError as e:
    assert "not found" in str(e)
m.get_changelog(since="0.1.0"); assert calls[-1][0].endswith("/get_changelog?return_response") and calls[-1][2] == {"since": "0.1.0"}
# categories: the tools reach the right services with the right fields, and tickets can carry one
m.list_categories(); assert calls[-1][0].endswith("/list_categories?return_response") and calls[-1][2] == {}
m.create_category("Network", icon="mdi:lan"); assert calls[-1][2] == {"name": "Network", "icon": "mdi:lan", "actor": "ai:claude"}
m.update_category("Network", name="Networking"); assert calls[-1][2] == {"category": "Network", "name": "Networking", "actor": "ai:claude"}
m.delete_category("Networking"); assert calls[-1][0].endswith("/delete_category?return_response") and calls[-1][2] == {"category": "Networking", "actor": "ai:claude"}
m.merge_tickets(3, [4, 5]); assert calls[-1][0].endswith("/merge_tickets?return_response") and calls[-1][2] == {"ticket_id": 3, "merge_ids": [4, 5], "actor": "ai:claude"}
m.create_label("Zigbee", color="teal"); assert calls[-1][0].endswith("/create_label?return_response") and calls[-1][2] == {"name": "Zigbee", "color": "teal", "actor": "ai:claude"}
m.update_label("Zigbee", name="Zigbee mesh"); assert calls[-1][2]["label"] == "Zigbee" and calls[-1][2]["name"] == "Zigbee mesh"
m.delete_label("Zigbee mesh"); assert calls[-1][0].endswith("/delete_label?return_response") and calls[-1][2] == {"label": "Zigbee mesh", "actor": "ai:claude"}
m.create_ticket("Wi-Fi drops", category="Network"); assert calls[-1][2]["category"] == "Network"
m.update_ticket(3, category="Network"); assert calls[-1][2] == {"ticket_id": 3, "category": "Network", "actor": "ai:claude"}
m.list_tickets(category="none"); assert calls[-1][2]["category"] == "none"
assert "category" in m.update_ticket(3, category="x"), "write responses keep the category"
names = sorted(t.name for t in m.mcp._tool_manager.list_tools())
assert {"merge_tickets", "create_label", "update_label", "delete_label", "list_categories", "create_category", "update_category", "delete_category"} <= set(names), names
print("tools:", names)
print("MCP OK")
