"""Reports with photos and a voice message: the upload and download endpoints.

`POST /api/home_desk/report` takes one multipart request (a kind, a title, optional details, up to six photos and one voice
message), creates the ticket and its files together, and answers straight away; the voice message is turned into text in
the background. `GET /api/home_desk/attachment/<ticket>/<id>` serves a file to an administrator or to the person who sent
it. Both need a signed-in user, and a file is judged by its first bytes, never by what the browser calls it.
"""

from __future__ import annotations

import logging
import shutil
import time
import uuid
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

from aiohttp import web

from homeassistant.components.http import KEY_HASS, HomeAssistantView
from homeassistant.core import HomeAssistant

from .const import (
    ATTACHMENT_DIR,
    DOMAIN,
    MAX_AUDIO_BYTES,
    MAX_AUDIO_SECONDS,
    MAX_IMAGE_BYTES,
    MAX_IMAGES,
    MAX_REPORTS_PER_HOUR,
    MAX_TEXT,
    MAX_TITLE,
)
from .media import safe_name, sniff, speech_ready, wav_info
from .storage import (
    TicketError,
    async_add_attachments,
    async_create_ticket,
    async_find_attachment,
    async_get_settings,
    async_set_transcript,
)
from .transcribe import async_transcribe

_LOGGER = logging.getLogger(__name__)

# What a household member may call their report: the two built-in kinds open to them.
KINDS = {"bug", "enhancement"}
_ID_LEN = 12


class ReportError(Exception):
    """A report that can't be accepted, with the HTTP status to answer with."""

    def __init__(self, status: int, message: str) -> None:
        super().__init__(message)
        self.status = status
        self.message = message


@dataclass
class Upload:
    name: str
    data: bytes


@dataclass
class Report:
    kind: str = "bug"
    title: str = ""
    details: str = ""
    images: list[Upload] = field(default_factory=list)
    audio: Upload | None = None


def _root(hass: HomeAssistant) -> Path:
    return Path(hass.config.path(ATTACHMENT_DIR))


async def _read_limited(part: Any, limit: int) -> bytes:
    """A form part's bytes, refusing to read past `limit` (so a huge upload is cut off, not held in memory)."""
    buf = bytearray()
    while True:
        chunk = await part.read_chunk(64 * 1024)
        if not chunk:
            return bytes(buf)
        buf.extend(chunk)
        if len(buf) > limit:
            raise ReportError(413, f"That file is too large (the limit is {limit // (1024 * 1024)} MB)")


async def read_report(request: web.Request) -> Report:
    """Read the multipart form into a Report, enforcing size and count limits as it streams."""
    report = Report()
    try:
        reader = await request.multipart()
    except (AssertionError, KeyError, ValueError) as err:
        raise ReportError(400, "Send the report as a form") from err
    async for part in reader:
        name = part.name
        if name in ("kind", "title", "details"):
            text = (await _read_limited(part, MAX_TEXT)).decode("utf-8", "replace")
            setattr(report, name, text)
        elif name == "image":
            if len(report.images) >= MAX_IMAGES:
                raise ReportError(400, f"At most {MAX_IMAGES} photos")
            report.images.append(Upload(part.filename or "", await _read_limited(part, MAX_IMAGE_BYTES)))
        elif name == "audio":
            if report.audio is not None:
                raise ReportError(400, "One voice message per report")
            report.audio = Upload(part.filename or "", await _read_limited(part, MAX_AUDIO_BYTES))
    return report


def _check_rate(hass: HomeAssistant, user_id: str) -> None:
    """A signed-in user can only send so many reports an hour, so one account can't fill the disk."""
    times = hass.data.setdefault(f"{DOMAIN}_report_times", {}).setdefault(user_id, [])
    now = time.monotonic()
    times[:] = [t for t in times if now - t < 3600]
    if len(times) >= MAX_REPORTS_PER_HOUR:
        raise ReportError(429, "That is a lot of reports. Please wait a while before sending another.")
    times.append(now)


def _validate(report: Report) -> list[dict[str, Any]]:
    """Check the form and what each file really is. Returns the attachments' details (without ids and paths)."""
    report.title = report.title.strip()
    if not report.title:
        raise ReportError(400, "Say what it is in a line")
    if len(report.title) > MAX_TITLE:
        raise ReportError(400, f"The title is too long (the limit is {MAX_TITLE} characters)")
    if len(report.details) > MAX_TEXT:
        raise ReportError(400, "The details are too long")
    if report.kind not in KINDS:
        raise ReportError(400, "Choose Problem or Suggestion")
    items = []
    for n, image in enumerate(report.images, 1):
        found = sniff(image.data)
        if not found or found[0] != "image":
            raise ReportError(400, f"Photo {n} isn't a photo this can show (use JPEG, PNG or WebP)")
        items.append({"upload": image, "kind": "image", "mime": found[1], "ext": found[2]})
    if report.audio:
        found = sniff(report.audio.data)
        if not found or found[0] != "audio":
            raise ReportError(400, "The voice message isn't a sound this can play")
        info = wav_info(report.audio.data) if found[2] == "wav" else None
        if info and info["seconds"] > MAX_AUDIO_SECONDS:
            raise ReportError(400, f"The voice message is too long (the limit is {MAX_AUDIO_SECONDS // 60} minutes)")
        items.append({"upload": report.audio, "kind": "audio", "mime": found[1], "ext": found[2],
                      **({"seconds": info["seconds"]} if info else {})})
    return items


def _stage(root: Path, items: list[dict[str, Any]]) -> tuple[Path, list[dict[str, Any]]]:
    """Write the files to a staging folder; the ticket doesn't exist yet, so they move once it does."""
    staging = root / "_incoming" / uuid.uuid4().hex
    staging.mkdir(parents=True, exist_ok=True)
    made = []
    for item in items:
        attachment_id = uuid.uuid4().hex[:_ID_LEN]
        upload: Upload = item["upload"]
        (staging / f"{attachment_id}.{item['ext']}").write_bytes(upload.data)
        made.append({
            "id": attachment_id,
            "kind": item["kind"],
            "mime": item["mime"],
            "ext": item["ext"],
            "name": safe_name(upload.name, "voice message" if item["kind"] == "audio" else "photo"),
            "size": len(upload.data),
            **({"seconds": item["seconds"]} if "seconds" in item else {}),
        })
    return staging, made


def _commit(staging: Path, root: Path, ticket_id: int) -> None:
    final = root / str(ticket_id)
    final.parent.mkdir(parents=True, exist_ok=True)
    shutil.move(str(staging), str(final))


def _discard(staging: Path) -> None:
    shutil.rmtree(staging, ignore_errors=True)


async def async_handle_report(hass: HomeAssistant, user: Any, report: Report) -> dict[str, Any]:
    """Create the ticket and its attachments for a validated report. Returns what the form needs to say 'sent'."""
    items = _validate(report)
    _check_rate(hass, user.id)  # after the checks, so a form that was sent back for fixing doesn't use up a send
    root = _root(hass)
    staging, made = await hass.async_add_executor_job(_stage, root, items) if items else (None, [])
    try:
        ticket = await async_create_ticket(
            hass,
            title=report.title,
            description=report.details,
            priority="normal",
            requester=user.name or "unknown",
            labels=[report.kind],
            actor=user.name or "unknown",
        )
        if staging is not None:
            await hass.async_add_executor_job(_commit, staging, root, ticket["id"])
            staging = None
        await async_add_attachments(hass, ticket["id"], [{**a, "created_at": ticket["created_at"], "by": user.name} for a in made],
                                    actor=user.name or "unknown")
    except TicketError as err:
        raise ReportError(400, str(err)) from err
    finally:
        if staging is not None:
            await hass.async_add_executor_job(_discard, staging)
    voice = next((a for a in made if a["kind"] == "audio"), None)
    if voice and report.audio and speech_ready(report.audio.data):
        hass.async_create_task(_transcribe_later(hass, ticket["id"], voice, report.audio.data))
    return {"id": ticket["id"], "title": ticket["title"], "photos": sum(1 for a in made if a["kind"] == "image"),
            "voice": voice is not None}


async def _transcribe_later(hass: HomeAssistant, ticket_id: int, attachment: dict[str, Any], wav: bytes) -> None:
    """Turn the voice message into text once the report has been sent, so the person isn't kept waiting."""
    try:
        settings = await async_get_settings(hass)
        if not settings.get("transcribe", True):
            return
        text = await async_transcribe(hass, wav, engine_id=settings.get("stt", ""))
        if text:
            await async_set_transcript(hass, ticket_id, attachment["id"], text)
    except Exception:  # noqa: BLE001 - a failed transcript must never lose the ticket or the recording
        _LOGGER.warning("Could not transcribe the voice message on ticket %s", ticket_id, exc_info=True)


class ReportView(HomeAssistantView):
    """A household member's report, with its photos and voice message."""

    url = "/api/home_desk/report"
    name = "api:home_desk:report"
    requires_auth = True

    async def post(self, request: web.Request) -> web.Response:
        hass = request.app[KEY_HASS]
        user = request.get("hass_user")
        if user is None:
            return self.json_message("Sign in first", 401)
        try:
            result = await async_handle_report(hass, user, await read_report(request))
        except ReportError as err:
            return self.json_message(err.message, err.status)
        return self.json(result)


class AttachmentView(HomeAssistantView):
    """A photo or voice message, for an administrator or the person who sent it."""

    url = "/api/home_desk/attachment/{ticket_id}/{attachment_id}"
    name = "api:home_desk:attachment"
    requires_auth = True

    async def get(self, request: web.Request, ticket_id: str, attachment_id: str) -> web.StreamResponse:
        hass = request.app[KEY_HASS]
        user = request.get("hass_user")
        if user is None:
            return self.json_message("Sign in first", 401)
        if not ticket_id.isdigit() or len(attachment_id) != _ID_LEN or not attachment_id.isalnum():
            return self.json_message("Not found", 404)
        try:
            ticket, attachment = await async_find_attachment(hass, int(ticket_id), attachment_id)
        except TicketError:
            return self.json_message("Not found", 404)
        if not (user.is_admin or ticket["requester"] == user.name):
            return self.json_message("Not yours to see", 403)
        path = _root(hass) / str(ticket["id"]) / f"{attachment['id']}.{attachment['ext']}"
        if not await hass.async_add_executor_job(path.is_file):
            return self.json_message("Not found", 404)
        return web.FileResponse(path, headers={
            "Content-Type": attachment["mime"],  # what the first bytes said, not what the browser claimed
            "X-Content-Type-Options": "nosniff",
            "Content-Security-Policy": "sandbox",
            "Cache-Control": "private, max-age=3600",
        })


def async_register_views(hass: HomeAssistant) -> None:
    hass.http.register_view(ReportView())
    hass.http.register_view(AttachmentView())
