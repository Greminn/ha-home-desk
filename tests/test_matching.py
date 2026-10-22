"""Guessing what a ticket is about, from the words in it (pure Python).

Run:  python3 -I tests/test_matching.py
"""
import importlib.util
from pathlib import Path

spec = importlib.util.spec_from_file_location("matching", Path(__file__).resolve().parents[1] / "custom_components" / "home_desk" / "matching.py")
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)

HOME = [
    {"kind": "entity", "id": "light.front_deck", "name": "Front deck lights", "aliases": ["porch light"], "area": "Deck", "domain": "light", "exposed": True, "device_id": "dev-deck-lights"},
    {"kind": "entity", "id": "binary_sensor.front_door", "name": "Front door", "aliases": [], "area": "Hallway", "domain": "binary_sensor", "exposed": True},
    {"kind": "entity", "id": "light.kitchen", "name": "Kitchen light", "aliases": [], "area": "Kitchen", "domain": "light", "exposed": True},
    {"kind": "entity", "id": "switch.deck_heater", "name": "Heater", "aliases": [], "area": "Deck", "domain": "switch", "exposed": False},
    {"kind": "device", "id": "dev-deck-lights", "name": "Front deck lights", "aliases": [], "area": "Deck", "domain": ""},
    {"kind": "area", "id": "deck", "name": "Deck", "aliases": ["patio"]},
    {"kind": "area", "id": "kitchen", "name": "Kitchen", "aliases": []},
    {"kind": "entity", "id": "sensor.rack_temp", "name": "Server rack temperature", "aliases": [], "area": "", "domain": "sensor"},
]

assert m.tokens("The front deck lights didn't turn on") == {"front", "deck", "light"}, m.tokens("The front deck lights didn't turn on")
assert "turn" not in m.tokens("turn on") and m.tokens("Lights, LIGHT!") == {"light"}

text = "The front deck lights didn't turn on when I opened the door. Why is that?"
found = m.best(text, HOME)
ids = [(c["kind"], c["id"]) for c in found]
assert "deck" in found[0]["name"].lower(), found
assert ("entity", "binary_sensor.front_door") in ids, "the door sensor shares the word front and door"
assert ("entity", "light.kitchen") not in ids and ("area", "kitchen") not in ids, ids
assert ("device", "dev-deck-lights") in ids and ("entity", "light.front_deck") not in ids, "a device stands for its entities when they add nothing"

# Aliases and areas count; a kind of word alone does not.
assert ("entity", "light.front_deck") in [(c["kind"], c["id"]) for c in m.best("the porch light is broken", HOME)]
assert ("area", "deck") in [(c["kind"], c["id"]) for c in m.best("nothing works on the patio", HOME)]
assert m.best("the lights are flickering", HOME) == [], "'light' alone isn't enough, it must share a name or a place"
assert m.best("", HOME) == [] and m.best("   ", HOME) == []
rack = m.best("Server rack is running hot", HOME)
assert rack and rack[0]["id"] == "sensor.rack_temp"

# What the ticket already names is left out.
left = m.best(text, HOME, skip={("device", "dev-deck-lights")})
assert ("device", "dev-deck-lights") not in [(c["kind"], c["id"]) for c in left]
assert ("entity", "light.front_deck") not in [(c["kind"], c["id"]) for c in left], "a named device covers its entities"
assert len(m.best(text, HOME, limit=2)) <= 2
print("matching ok")

# ---- the AI agent's proposed changes (proposals.py is pure too)
spec2 = importlib.util.spec_from_file_location("proposals", Path(__file__).resolve().parents[1] / "custom_components" / "home_desk" / "proposals.py")
p = importlib.util.module_from_spec(spec2)
spec2.loader.exec_module(p)

reply = 'Fine, close it.\n\n```home-desk-actions\n[{"action":"close","status":"closed","resolution":"Upstream, nothing to do."},{"action":"add_label","label":"Blocked"},{"action":"add_label","label":"Nope"},{"action":"set_priority","priority":"low"},{"action":"delete","id":1},{"action":"set_category","category":"home assistant"}]\n```'
body, raw = p.split_reply(reply)
assert body == "Fine, close it." and len(raw) == 6, (body, raw)
ok = p.clean(raw, labels={"blocked", "bug"}, categories={"home assistant"})
assert [a["action"] for a in ok] == ["close", "add_label", "set_priority", "set_category"], ok  # unknown label and unknown action dropped
assert p.split_reply("No block here.") == ("No block here.", [])
assert p.split_reply("x\n```home-desk-actions\nnot json\n```")[1] == [], "broken JSON is ignored, and the block still comes out of the text"
assert "home-desk-actions" not in p.split_reply("x\n```home-desk-actions\nnot json\n```")[0]
assert p.clean([{"action": "close", "status": "weird"}], labels=set(), categories=set()) == []
assert p.clean([{"action": "close"}], labels=set(), categories=set())[0]["status"] == "resolved"
assert len(p.clean([{"action": "set_priority", "priority": "high"}] * 9, labels=set(), categories=set())) == p.MAX_ACTIONS
print("proposals ok")
assert m.tokens(object()) == set() and m.tokens(None) == set(), "a non-text alias must not crash the matcher"
assert m._candidate_tokens({"name": "Hall light", "aliases": [object(), "hall lamp"]})[0] >= {"hall", "light", "lamp"}
print("non-text aliases ok")
