"""Exercise admin-only new-ticket notifications without a Home Assistant install."""

import asyncio
import importlib.util
import sys
import types
from pathlib import Path

PKG = Path(__file__).resolve().parents[1] / "custom_components" / "home_desk"
sys.modules["homeassistant"] = types.ModuleType("homeassistant")
core = types.ModuleType("homeassistant.core")
core.HomeAssistant = object
core.Event = object
core.callback = lambda function: function
sys.modules["homeassistant.core"] = core
package = types.ModuleType("home_desk")
package.__path__ = [str(PKG)]
sys.modules["home_desk"] = package
const = types.ModuleType("home_desk.const")
const.EVENT_TICKET = "home_desk_event"
sys.modules["home_desk.const"] = const
storage = types.ModuleType("home_desk.storage")
PREFS = {}


async def get_settings(_hass, user_id):
    return {"notify": PREFS[user_id]}


storage.async_get_settings = get_settings
sys.modules["home_desk.storage"] = storage
spec = importlib.util.spec_from_file_location("home_desk.notifications", PKG / "notifications.py")
notifications = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = notifications
spec.loader.exec_module(notifications)


class Bus:
    def __init__(self):
        self.handler = None

    def async_listen(self, _event_type, handler):
        self.handler = handler
        return lambda: setattr(self, "handler", None)


class Services:
    def __init__(self):
        self.calls = []

    def has_service(self, domain, service):
        return domain == "notify" and service in {"alienx", "short_stack"}

    async def async_call(self, domain, service, data, blocking):
        self.calls.append((domain, service, data, blocking))


class Hass:
    def __init__(self):
        self.bus = Bus()
        self.services = Services()
        self.users = [
            types.SimpleNamespace(id="admin-1", is_active=True, is_admin=True, system_generated=False),
            types.SimpleNamespace(id="admin-2", is_active=True, is_admin=True, system_generated=False),
            types.SimpleNamespace(id="child", is_active=True, is_admin=False, system_generated=False),
        ]
        self.auth = types.SimpleNamespace(async_get_users=self._users)
        self.tasks = []

    async def _users(self):
        return self.users

    def async_create_task(self, coroutine):
        self.tasks.append(asyncio.create_task(coroutine))


async def main():
    hass = Hass()
    PREFS.update({
        # Older experimental preferences may still contain filters; they no longer restrict delivery.
        "admin-1": {"new_ticket": True, "targets": ["alienx"], "labels": ["bug"], "categories": ["cameras"]},
        "admin-2": {"new_ticket": True, "targets": ["alienx"]},
        "child": {"new_ticket": True, "targets": ["short_stack"]},
    })
    stop = notifications.setup_notifications(hass)
    ticket = {"kind": "created", "ticket_id": 17, "title": "Camera offline", "requester": "Theo", "priority": "high", "labels": ["bug"], "category": "cameras"}
    hass.bus.handler(types.SimpleNamespace(data=ticket))
    await asyncio.gather(*hass.tasks)
    assert len(hass.services.calls) == 1, "two admins selecting one service must send once; a non-admin must not subscribe"
    domain, service, payload, blocking = hass.services.calls[0]
    assert (domain, service, blocking) == ("notify", "alienx", True)
    assert payload["title"] == "Home Desk · Problem #17"
    assert payload["message"] == "Camera offline\nFrom: Theo\nPriority: High"
    assert payload["data"]["tag"] == "HOME_DESK_17" and payload["data"]["clickAction"] == "/home-desk"

    hass.services.calls.clear()
    PREFS["admin-2"]["new_ticket"] = False
    for altered in ({**ticket, "labels": ["enhancement"]}, {**ticket, "category": "network"}):
        hass.bus.handler(types.SimpleNamespace(data=altered))
    await asyncio.gather(*hass.tasks[1:])
    assert len(hass.services.calls) == 2, "all new tickets must notify, regardless of label or category"
    hass.services.calls.clear()
    PREFS["admin-1"]["new_ticket"] = False
    hass.bus.handler(types.SimpleNamespace(data=ticket))
    await asyncio.gather(*hass.tasks[3:])
    assert hass.services.calls == [], "switching off notifications must stop delivery"
    stop()
    assert hass.bus.handler is None
    print("notifications ok")


asyncio.run(main())
