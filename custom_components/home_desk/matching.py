"""Working out which devices, entities and areas a ticket is probably about (pure Python, no Home Assistant imports).

A ticket from the report form says "The front deck lights didn't turn on when I opened the door" and names nothing. This
scores the home's things against those words: a thing matches when its own name, alias or area shares a word with the
ticket, with a little help from common words ("lights" means the light domain). The best few are suggested to a person,
and given to the AI agent marked as a guess.
"""

from __future__ import annotations

import re
from typing import Any

STOP = {
    "the", "and", "for", "are", "was", "were", "has", "have", "had", "not", "but", "its", "our", "your", "their", "from", "with",
    "when", "why", "what", "which", "who", "how", "this", "that", "these", "those", "then", "than", "into", "onto", "out",
    "off", "can", "could", "would", "should", "will", "does", "did", "didn", "doesn", "don", "isn", "wasn", "aren", "won",
    "wont", "cant", "didnt", "doesnt", "dont", "isnt", "wasnt", "arent", "couldnt", "wouldnt", "shouldnt", "havent", "hasnt", "just", "still", "again", "also", "very", "some", "any", "all", "one", "two", "get", "got", "see", "say",
    "turn", "turned", "turns", "work", "works", "working", "worked", "stopped", "stop", "wrong", "problem", "issue", "fix",
    "please", "thanks", "thank", "hello", "there", "here", "about", "like", "need", "want", "tell", "keeps", "keep", "every",
    "time", "ticket", "voice", "message", "transcribed", "home", "assistant", "opened", "open", "closed", "close", "came",
    "come", "went", "gone", "been", "being", "after", "before", "while", "because", "something", "nothing", "anything",
}
# Common words that point at a kind of thing: "lights" means the light domain, "door" a door sensor or lock.
HINTS = {
    "light": ("light",), "lamp": ("light",), "bulb": ("light",),
    "switch": ("switch",), "plug": ("switch",), "socket": ("switch",),
    "lock": ("lock",), "door": ("lock", "binary_sensor", "cover"), "window": ("binary_sensor", "cover"),
    "garage": ("cover",), "blind": ("cover",), "curtain": ("cover",), "shutter": ("cover",), "gate": ("cover", "lock"),
    "heating": ("climate",), "thermostat": ("climate",), "temperature": ("sensor", "climate"), "aircon": ("climate",),
    "camera": ("camera",), "motion": ("binary_sensor",), "presence": ("binary_sensor", "person", "device_tracker"),
    "fan": ("fan",), "speaker": ("media_player",), "tv": ("media_player",), "music": ("media_player",),
    "vacuum": ("vacuum",), "robot": ("vacuum",), "alarm": ("alarm_control_panel",), "battery": ("sensor",),
    "power": ("sensor", "switch"), "energy": ("sensor",),
}
NAME_WEIGHT = 3.0
AREA_WEIGHT = 1.5
HINT_WEIGHT = 1.0
GENERIC_WEIGHT = 1.0
EXPOSED_BONUS = 0.5
MIN_SCORE = 3.0


def tokens(text: str) -> set[str]:
    """The meaningful lower-case words of some text, with simple plurals folded in ("lights" is "light")."""
    out: set[str] = set()
    if not isinstance(text, str):
        return out  # not text (for example Home Assistant's COMPUTED_NAME alias marker): nothing to match on
    for word in re.findall(r"[a-z0-9]+", text.lower().replace("'", "").replace("’", "")):
        if len(word) < 3 or word in STOP or word.isdigit():
            continue
        if len(word) > 3 and word.endswith("s") and not word.endswith("ss"):
            word = word[:-1]
        out.add(word)
    return out


def _candidate_tokens(c: dict[str, Any]) -> tuple[set[str], set[str]]:
    name = tokens(c.get("name", "")) | {t for alias in c.get("aliases", []) for t in tokens(alias)}
    area = tokens(c.get("area", ""))
    return name, area


def score(query: set[str], c: dict[str, Any]) -> float:
    """How well one candidate ({kind, id, name, aliases, area, domain, exposed}) fits the ticket's words."""
    name, area = _candidate_tokens(c)
    hits_name = query & name
    hits_area = (query & area) - hits_name
    if c.get("kind") == "area":
        hits_area = set()  # an area's own name is its name
    # A word that only says what kind of thing it is ("light", "door") counts for little: "kitchen" says far more.
    total = sum(GENERIC_WEIGHT if t in HINTS else NAME_WEIGHT for t in hits_name) + len(hits_area) * AREA_WEIGHT
    if not hits_name and not hits_area:
        return 0.0  # a kind of thing alone ("lights") is not enough: it must share a name or a place
    domain = c.get("domain", "")
    if domain and any(domain in HINTS.get(q, ()) for q in query):
        total += HINT_WEIGHT
    if len(hits_name) + len(hits_area) >= 2:
        total += 1.0  # several words agreeing is much stronger than one
    if c.get("exposed"):
        total += EXPOSED_BONUS
    return total


def best(query_text: str, candidates: list[dict[str, Any]], *, skip: set[tuple[str, str]] = frozenset(), limit: int = 6) -> list[dict[str, Any]]:
    """The best matches for a ticket's words, most likely first, leaving out what the ticket already names."""
    query = tokens(query_text)
    if not query:
        return []
    scored = []
    named_devices = {i for kind, i in skip if kind == "device"}
    for c in candidates:
        if (c["kind"], c["id"]) in skip or (c["kind"] == "entity" and c.get("device_id") in named_devices):
            continue  # already on the ticket, or one of the entities of a device that is
        s = score(query, c)
        if s >= MIN_SCORE:
            scored.append({**c, "score": round(s, 2)})
    scored.sort(key=lambda c: (-c["score"], c["kind"] != "device", c["name"].lower()))
    # A device's entities share its words; list the device and keep an entity only when it is a better match than that.
    picked: list[dict[str, Any]] = []
    device_ids = {c["id"] for c in scored if c["kind"] == "device"}
    for c in scored:
        if c["kind"] == "entity" and c.get("device_id") in device_ids and not (query & tokens(c["name"])) - tokens(
            next((d["name"] for d in scored if d["kind"] == "device" and d["id"] == c.get("device_id")), "")
        ):
            continue
        picked.append(c)
        if len(picked) >= limit:
            break
    return picked
