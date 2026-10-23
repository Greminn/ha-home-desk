"""Reports with photos and a voice message: the upload and download endpoints, file recognition and transcription.

Runs a real aiohttp server with the real views against a stubbed Home Assistant, so the multipart form is parsed for real.

Run:  uv run --with aiohttp python tests/test_attachments.py      (or: pip install aiohttp; python3 -I tests/test_attachments.py)
"""
import asyncio
import importlib.util
import json
import struct
import sys
import tempfile
import types
from pathlib import Path

import aiohttp
from aiohttp import web
from aiohttp.test_utils import TestClient, TestServer

ROOT = Path(__file__).resolve().parents[1]
PKG = ROOT / "custom_components" / "home_desk"
KEY_HASS = "hass"


class FakeStore:
    saved: dict = {}

    def __init__(self, hass, version, key):
        pass

    async def async_load(self):
        return json.loads(json.dumps(FakeStore.saved)) if FakeStore.saved else None

    async def async_save(self, data):
        FakeStore.saved = json.loads(json.dumps(data))


class FakeBus:
    def async_fire(self, name, data):
        pass


class FakeHass:
    def __init__(self, config_dir):
        self.data = {}
        self.bus = FakeBus()
        self.config = types.SimpleNamespace(language="en-NZ", config_dir=config_dir, path=lambda *p: str(Path(config_dir, *p)))
        self.tasks = []

    def async_create_task(self, coro):
        self.tasks.append(asyncio.ensure_future(coro))

    async def async_add_executor_job(self, fn, *args):
        return await asyncio.to_thread(fn, *args)


class View:
    """Home Assistant's view base class, reduced to the two helpers the views use."""

    requires_auth = True

    @staticmethod
    def json(result, status_code=200):
        return web.json_response(result, status=status_code)

    @staticmethod
    def json_message(message, status_code=200, message_code=None):
        return web.json_response({"message": message}, status=status_code)


def stub(name, **attrs):
    m = types.ModuleType(name)
    m.__dict__.update(attrs)
    sys.modules[name] = m
    return m


# ---- a fake speech-to-text engine, and the Assist pipeline that points at it
class Meta:
    def __init__(self, **kw):
        self.__dict__.update(kw)


class Enum_:
    WAV, PCM, BITRATE_16, SAMPLERATE_16000, CHANNEL_MONO, SUCCESS, ERROR = "wav", "pcm", 16, 16000, 1, "success", "error"


class FakeEngine:
    supported_languages = ["en", "de"]
    heard = "the lounge light flickers every evening"
    result = "success"
    fits = True
    calls = []

    def check_metadata(self, metadata):
        return self.fits

    async def internal_async_process_audio_stream(self, metadata, stream):
        size = 0
        async for chunk in stream:
            size += len(chunk)
        FakeEngine.calls.append((metadata.language, size))
        return types.SimpleNamespace(text=self.heard, result=self.result)


ENGINES = {"stt.faster_whisper": FakeEngine()}
PIPELINE = types.SimpleNamespace(stt_engine="stt.faster_whisper", stt_language="en-NZ")
stub("homeassistant")
stub("homeassistant.core", HomeAssistant=FakeHass, callback=lambda f: f)
stub("homeassistant.helpers.storage", Store=FakeStore)
stub("homeassistant.helpers")
stub("homeassistant.components.http", KEY_HASS=KEY_HASS, HomeAssistantView=View)
stt = stub("homeassistant.components.stt", SpeechMetadata=Meta, AudioFormats=Enum_, AudioCodecs=Enum_, AudioBitRates=Enum_,
           AudioSampleRates=Enum_, AudioChannels=Enum_, SpeechResultState=Enum_,
           async_get_speech_to_text_engine=lambda hass, engine_id: ENGINES.get(engine_id))
assist = stub("homeassistant.components.assist_pipeline", async_get_pipeline=lambda hass, pipeline_id=None: PIPELINE)
stub("homeassistant.components", stt=stt, assist_pipeline=assist)

pkg = types.ModuleType("home_desk")
pkg.__path__ = [str(PKG)]
sys.modules["home_desk"] = pkg
for mod in ("const", "media", "storage", "transcribe", "attachments"):
    spec = importlib.util.spec_from_file_location(f"home_desk.{mod}", PKG / f"{mod}.py")
    m = importlib.util.module_from_spec(spec)
    sys.modules[f"home_desk.{mod}"] = m
    spec.loader.exec_module(m)
media, s, tr, att, const = (sys.modules[f"home_desk.{n}"] for n in ("media", "storage", "transcribe", "attachments", "const"))

# ---- files to send
JPEG = b"\xff\xd8\xff\xe0" + b"\x00" * 200
PNG = b"\x89PNG\r\n\x1a\n" + b"\x00" * 200
WEBP = b"RIFF\x00\x00\x00\x00WEBP" + b"\x00" * 100


def wav(seconds, rate=16000, channels=1, bits=16, fmt=1):
    data = b"\x00" * (seconds * rate * channels * (bits // 8))
    header = b"RIFF" + struct.pack("<I", 36 + len(data)) + b"WAVEfmt " + struct.pack(
        "<IHHIIHH", 16, fmt, channels, rate, rate * channels * bits // 8, channels * bits // 8, bits)
    return header + b"data" + struct.pack("<I", len(data)) + data


class Person:
    def __init__(self, name, admin=False):
        self.name, self.is_admin, self.id = name, admin, name.lower()


def test_pure():
    sn = media.sniff
    assert sn(JPEG) == ("image", "image/jpeg", "jpg") and sn(PNG)[1] == "image/png" and sn(WEBP)[1] == "image/webp"
    assert sn(wav(1))[:2] == ("audio", "audio/wav")
    assert sn(b"OggS" + b"\x00" * 20)[2] == "ogg" and sn(b"\x1a\x45\xdf\xa3" + b"\x00" * 20)[2] == "webm"
    assert sn(b"\x00\x00\x00\x18ftypM4A " + b"\x00" * 20)[2] == "m4a" and sn(b"ID3\x03" + b"\x00" * 20)[2] == "mp3"
    for bad in (b"", b"<script>alert(1)</script>", b"GIF89a....", b"%PDF-1.7", b"MZ\x90\x00", b"<svg xmlns='...'></svg>"):
        assert sn(bad) is None, bad  # not a photo or sound this serves (SVG and PDF can carry script)
    assert media.wav_info(wav(3)) == {"channels": 1, "sample_rate": 16000, "bits": 16, "seconds": 3}
    assert media.wav_info(wav(2, rate=44100, channels=2))["channels"] == 2
    assert media.wav_info(b"RIFF" + b"\x00" * 60) is None and media.wav_info(wav(1, fmt=3)) is None  # float WAV isn't plain PCM
    assert media.speech_ready(wav(2)) and not media.speech_ready(wav(2, rate=44100)) and not media.speech_ready(wav(2, channels=2))
    assert not media.speech_ready(wav(2, bits=8)) and not media.speech_ready(JPEG)
    assert media.safe_name("../../etc/passwd", "x") == "passwd" and media.safe_name("C:\\a\\b.jpg", "x") == "b.jpg"
    assert media.safe_name("holiday <1>.jpg", "x") == "holiday 1.jpg" and media.safe_name("...", "photo") == "photo"
    assert len(media.safe_name("a" * 500, "x")) == 80
    print("file recognition ok")


def form(**fields):
    data = aiohttp.FormData(default_to_multipart=True)  # a browser always sends multipart
    for key, value in fields.items():
        if key in ("images", "audio"):
            continue
        data.add_field(key, value)
    for n, content in enumerate(fields.get("images", [])):
        data.add_field("image", content, filename=f"photo{n}.jpg", content_type="image/jpeg")
    if fields.get("audio") is not None:
        data.add_field("audio", fields["audio"], filename="voice.wav", content_type="audio/wav")
    return data


async def main():
    test_pure()
    tmp = tempfile.mkdtemp()
    hass = FakeHass(tmp)
    FakeStore.saved = {}
    who = {"user": Person("Alex")}

    @web.middleware
    async def auth(request, handler):
        if who["user"]:
            request["hass_user"] = who["user"]
        return await handler(request)

    app = web.Application(middlewares=[auth], client_max_size=64 * 1024 * 1024)
    app[KEY_HASS] = hass
    report_view, file_view = att.ReportView(), att.AttachmentView()
    app.router.add_post("/api/home_desk/report", report_view.post)

    async def get_file(request):  # Home Assistant hands the URL's values to the view as keyword arguments
        return await file_view.get(request, **request.match_info)

    app.router.add_get("/api/home_desk/attachment/{ticket_id}/{attachment_id}", get_file)
    async with TestClient(TestServer(app)) as client:
        post = lambda **kw: client.post("/api/home_desk/report", data=form(**kw))  # noqa: E731

        # ---- a report with two photos and a voice message
        r = await post(kind="bug", title="Lounge light flickers", details="Mostly at night", images=[JPEG, PNG], audio=wav(3))
        body = await r.json()
        assert r.status == 200 and body["photos"] == 2 and body["voice"] is True, (r.status, body)
        await asyncio.gather(*hass.tasks)  # the transcription runs after the answer
        t = await s.async_get_ticket(hass, body["id"])
        assert t["requester"] == "Alex" and t["labels"] == ["bug"] and t["priority"] == "normal" and t["category"] is None
        assert [a["kind"] for a in t["attachments"]] == ["image", "image", "audio"], t["attachments"]
        audio = t["attachments"][2]
        assert audio["mime"] == "audio/wav" and audio["seconds"] == 3 and audio["size"] == len(wav(3)) and audio["by"] == "Alex"
        assert audio["transcript"] == FakeEngine.heard, "the words are kept on the recording"
        assert "Mostly at night" in t["description"] and "> " + FakeEngine.heard in t["description"] and "transcribed by Home Assistant" in t["description"]
        assert FakeEngine.calls[-1][0] == "en", "en-NZ is asked of an engine that offers en"
        assert any(e["kind"] == "attachment" and "2 photos and a voice message" in e["data"]["to"] for e in t["events"]), t["events"]
        assert t["status"] == "new", "a person's own report is not 'work' on it"
        folder = Path(tmp, const.ATTACHMENT_DIR, str(t["id"]))
        assert sorted(p.suffix for p in folder.iterdir()) == [".jpg", ".png", ".wav"], list(folder.iterdir())
        assert not any(Path(tmp, const.ATTACHMENT_DIR, "_incoming").iterdir()), "staging is emptied"
        summary = (await s.async_list_tickets(hass, status="all"))["tickets"][0]
        assert summary["attachment_count"] == 3 and "attachments" not in summary, "the list carries a count, not the files"
        print("report with photos and voice ok")

        # ---- downloads: the sender and admins; nobody else; and only what the bytes say it is
        url = lambda a: f"/api/home_desk/attachment/{t['id']}/{a['id']}"  # noqa: E731
        first = t["attachments"][0]
        r = await client.get(url(first))
        assert r.status == 200 and r.headers["Content-Type"] == "image/jpeg" and await r.read() == JPEG
        assert r.headers["X-Content-Type-Options"] == "nosniff" and r.headers["Content-Security-Policy"] == "sandbox"
        who["user"] = Person("Jo")
        assert (await client.get(url(first))).status == 403, "another household member"
        who["user"] = Person("Simon", admin=True)
        assert (await client.get(url(first))).status == 200, "an administrator"
        who["user"] = None
        assert (await client.get(url(first))).status == 401, "no signed-in user"
        who["user"] = Person("Simon", admin=True)
        for bad in (f"/api/home_desk/attachment/{t['id']}/000000000000", f"/api/home_desk/attachment/999/{first['id']}",
                    f"/api/home_desk/attachment/x/{first['id']}", f"/api/home_desk/attachment/{t['id']}/..%2F..%2Fx",
                    f"/api/home_desk/attachment/{t['id']}/{first['id']}zz"):
            assert (await client.get(bad)).status == 404, bad
        print("downloads ok")

        # ---- refused reports leave nothing behind
        who["user"] = Person("Alex")
        before = (await s.async_stats(hass))["total"]
        refusals = [
            (dict(kind="bug", title="", details="x"), 400, "no title"),
            (dict(kind="bug", title="   "), 400, "blank title"),
            (dict(kind="task", title="x"), 400, "a kind that isn't open to household users"),
            (dict(kind="bug", title="x" * 301), 400, "title too long"),
            (dict(kind="bug", title="x", images=[b"<html><script>alert(1)</script></html>"]), 400, "a page posing as a photo"),
            (dict(kind="bug", title="x", images=[b"GIF89a" + b"\x00" * 50]), 400, "a type that isn't served"),
            (dict(kind="bug", title="x", images=[JPEG] * 7), 400, "seven photos"),
            (dict(kind="bug", title="x", audio=JPEG), 400, "a photo as the voice message"),
            (dict(kind="bug", title="x", audio=wav(200)), 400, "a voice message past the limit"),
            (dict(kind="bug", title="x", images=[JPEG + b"\x00" * const.MAX_IMAGE_BYTES]), 413, "a photo over the size limit"),
        ]
        for fields, status, why in refusals:
            r = await post(**fields)
            assert r.status == status, (why, r.status, await r.text())
        assert (await s.async_stats(hass))["total"] == before, "no ticket from a refused report"
        assert not any(Path(tmp, const.ATTACHMENT_DIR, "_incoming").iterdir()), "no files left behind"
        r = await client.post("/api/home_desk/report", data="not a form")
        assert r.status == 400, r.status
        print("refusals ok")

        # ---- a plain message and nothing else works too, and a long details field is kept whole
        r = await post(kind="enhancement", title="A bedtime scene", details="d" * 5000)
        assert r.status == 200 and (await r.json())["photos"] == 0, (r.status, await r.text())
        plain = await s.async_get_ticket(hass, (await r.json())["id"])
        assert plain["labels"] == ["enhancement"] and plain["attachments"] == [] and len(plain["description"]) == 5000

        # ---- one box: the first line is the title, the rest the description; photos or a voice message alone are enough
        r = await post(kind="bug", message="Lounge light flickers\nMostly at night")
        one = await s.async_get_ticket(hass, (await r.json())["id"])
        assert r.status == 200 and one["title"] == "Lounge light flickers" and one["description"] == "Mostly at night", one
        r = await post(kind="bug", message="Kitchen light off")
        one = await s.async_get_ticket(hass, (await r.json())["id"])
        assert one["title"] == "Kitchen light off" and one["description"] == "", "a one-line message is only a title"
        long = "The lounge light has started to flicker every evening when the heating comes on and it " * 2
        r = await post(kind="bug", message=long)
        one = await s.async_get_ticket(hass, (await r.json())["id"])
        assert one["title"].endswith("…") and len(one["title"]) <= 81 and one["description"] == long.strip(), one["title"]
        r = await post(kind="bug", message="", images=[JPEG, PNG])
        assert r.status == 200 and (await s.async_get_ticket(hass, (await r.json())["id"]))["title"] == "Alex reported a problem"
        r = await post(kind="bug", message="  ", audio=wav(2))
        assert r.status == 200 and (await s.async_get_ticket(hass, (await r.json())["id"]))["title"] == "Alex reported a problem"
        await asyncio.gather(*hass.tasks)
        assert (await post(kind="bug", message="  ")).status == 400, "nothing at all is still refused"

        # ---- a voice message that isn't speech-ready is kept but not transcribed; an off switch is respected
        calls = len(FakeEngine.calls)
        r = await post(kind="bug", title="stereo", audio=wav(2, rate=44100, channels=2))
        await asyncio.gather(*hass.tasks)
        assert r.status == 200 and len(FakeEngine.calls) == calls, (r.status, await r.text(), len(FakeEngine.calls), calls)
        await s.async_save_settings(hass, {"transcribe": False})
        r = await post(kind="bug", title="off", audio=wav(2))
        await asyncio.gather(*hass.tasks)
        assert len(FakeEngine.calls) == calls, "transcription switched off"
        await s.async_save_settings(hass, {"transcribe": True})
        print("transcription rules ok")

        # ---- the hourly limit
        sent = 0
        who["user"] = Person("Chatty")
        for _ in range(const.MAX_REPORTS_PER_HOUR + 2):
            r = await post(kind="bug", title="again")
            sent += r.status == 200
        assert sent == const.MAX_REPORTS_PER_HOUR and r.status == 429, (sent, r.status)
        who["user"] = Person("Alex")
        assert (await post(kind="bug", title="a different person")).status == 200, "the limit is per person"
        print("rate limit ok")

    # ---- transcription itself
    wav_ = wav(2)
    FakeEngine.calls.clear()
    assert await tr.async_transcribe(hass, wav_) == FakeEngine.heard and FakeEngine.calls[-1] == ("en", len(wav_))
    ENGINES["stt.other"] = FakeEngine()
    assert await tr.async_transcribe(hass, wav_, engine_id="stt.other") == FakeEngine.heard, "the engine set in Settings wins"
    assert await tr.async_transcribe(hass, wav_, engine_id="stt.missing") is None, "an engine that isn't there"
    FakeEngine.fits = False
    assert await tr.async_transcribe(hass, wav_) is None, "an engine that can't take this audio"
    FakeEngine.fits = True
    FakeEngine.result = "error"
    assert await tr.async_transcribe(hass, wav_) is None
    FakeEngine.result = "success"
    FakeEngine.heard = "   "
    assert await tr.async_transcribe(hass, wav_) is None, "silence"
    FakeEngine.heard = "the lounge light flickers every evening"
    PIPELINE.stt_engine = None
    assert await tr.async_transcribe(hass, wav_) is None, "no engine set up"
    PIPELINE.stt_engine = "stt.faster_whisper"
    assert tr._language("en-NZ", ["en", "de"], "en") == "en" and tr._language("de-AT", ["de-DE"], "en") == "de-DE"
    assert tr._language("fr", ["en", "de"], "en") == "en" and tr._language(None, ["de", "en"], "en") == "en"
    print("transcription ok")

    # ---- the settings that go with it
    cfg = await s.async_save_settings(hass, {"stt": "stt.faster_whisper", "transcribe": False})
    assert cfg["stt"] == "stt.faster_whisper" and cfg["transcribe"] is False
    try:
        await s.async_save_settings(hass, {"stt": "x" * 201})
        raise SystemExit("an oversized setting was accepted")
    except s.TicketError:
        pass
    print("ALL OK")


asyncio.run(main())
