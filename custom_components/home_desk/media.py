"""Working out what an uploaded file really is (pure Python, no Home Assistant imports).

A report can carry photos and a voice message. The browser says what a file is, but a browser is not to be trusted: it
could be anything. So the first bytes of each file decide what it is and what it is served as; the name is only a label.
"""

from __future__ import annotations

import re
import struct

# kind, mime, file extension
_JPEG = ("image", "image/jpeg", "jpg")
_PNG = ("image", "image/png", "png")
_WEBP = ("image", "image/webp", "webp")
_WAV = ("audio", "audio/wav", "wav")
_OGG = ("audio", "audio/ogg", "ogg")
_WEBM = ("audio", "audio/webm", "webm")
_MP4 = ("audio", "audio/mp4", "m4a")
_MP3 = ("audio", "audio/mpeg", "mp3")


def sniff(data: bytes) -> tuple[str, str, str] | None:
    """(kind, mime, extension) for a photo or sound recognised by its first bytes, or None for anything else."""
    head = data[:16]
    if head[:3] == b"\xff\xd8\xff":
        return _JPEG
    if head[:8] == b"\x89PNG\r\n\x1a\n":
        return _PNG
    if head[:4] == b"RIFF" and head[8:12] == b"WEBP":
        return _WEBP
    if head[:4] == b"RIFF" and head[8:12] == b"WAVE":
        return _WAV
    if head[:4] == b"OggS":
        return _OGG
    if head[:4] == b"\x1a\x45\xdf\xa3":
        return _WEBM
    if head[4:8] == b"ftyp":
        return _MP4
    if head[:3] == b"ID3" or head[:2] in (b"\xff\xfb", b"\xff\xf3", b"\xff\xf2"):
        return _MP3
    return None


def wav_info(data: bytes) -> dict[str, int] | None:
    """The format of a PCM WAV file: channels, sample rate, bits per sample and length in seconds. None if it isn't one."""
    if len(data) < 44 or data[:4] != b"RIFF" or data[8:12] != b"WAVE":
        return None
    pos = 12
    fmt = None
    while pos + 8 <= len(data):
        chunk_id = data[pos : pos + 4]
        size = struct.unpack("<I", data[pos + 4 : pos + 8])[0]
        body = pos + 8
        if chunk_id == b"fmt " and size >= 16 and body + 16 <= len(data):
            audio_format, channels, rate, _byte_rate, _align, bits = struct.unpack("<HHIIHH", data[body : body + 16])
            fmt = (audio_format, channels, rate, bits)
        elif chunk_id == b"data":
            if fmt is None:
                return None
            audio_format, channels, rate, bits = fmt
            if audio_format != 1 or not channels or not rate or not bits:
                return None  # not plain PCM
            # A streamed WAV may declare an unknown length; use what is actually there.
            length = min(size, len(data) - body) if size != 0xFFFFFFFF else len(data) - body
            seconds = length // (channels * rate * (bits // 8))
            return {"channels": channels, "sample_rate": rate, "bits": bits, "seconds": int(seconds)}
        pos = body + size + (size & 1)
    return None


def speech_ready(data: bytes) -> bool:
    """True for a 16 kHz, mono, 16-bit PCM WAV: the one format sent to speech-to-text without converting."""
    info = wav_info(data)
    return bool(info and info["channels"] == 1 and info["sample_rate"] == 16000 and info["bits"] == 16)


def safe_name(name: str | None, fallback: str) -> str:
    """A file name safe to show and store: no folders, no odd characters, not too long."""
    base = re.split(r"[\\/]", name or "")[-1]
    base = re.sub(r"[^A-Za-z0-9._ -]", "", base).strip(" .")
    return base[:80] or fallback
