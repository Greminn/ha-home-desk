"""Turning a voice message into text with Home Assistant's own speech-to-text (the same engines Assist uses).

The panel records 16 kHz, mono, 16-bit WAV, which every speech-to-text engine takes, so there is nothing to convert here.
Which engine is a setting; left empty it is whatever Assist's preferred pipeline uses. Nothing is sent anywhere Home
Assistant isn't already sending Assist's speech.
"""

from __future__ import annotations

import asyncio
import logging
from collections.abc import AsyncIterator
from typing import Any

from homeassistant.core import HomeAssistant

from .const import TRANSCRIBE_TIMEOUT

_LOGGER = logging.getLogger(__name__)
_CHUNK = 4096


async def _chunks(data: bytes) -> AsyncIterator[bytes]:
    for i in range(0, len(data), _CHUNK):
        yield data[i : i + _CHUNK]


def _language(wanted: str | None, supported: list[str], fallback: str) -> str:
    """The engine's closest language to the one wanted: an exact match, then the same base language, then its first."""
    wanted = wanted or fallback
    if wanted in supported:
        return wanted
    base = wanted.split("-")[0].lower()
    for tag in supported:
        if tag.split("-")[0].lower() == base:
            return tag
    return supported[0] if supported else wanted


def _preferred_pipeline_engine(hass: HomeAssistant) -> tuple[str | None, str | None]:
    """The speech-to-text engine and language of Assist's preferred pipeline, if there is one."""
    try:
        from homeassistant.components.assist_pipeline import async_get_pipeline

        pipeline = async_get_pipeline(hass)
        return pipeline.stt_engine, pipeline.stt_language
    except Exception:  # noqa: BLE001 - Assist not set up: simply nothing to transcribe with
        return None, None


async def async_transcribe(hass: HomeAssistant, wav: bytes, *, engine_id: str = "") -> str | None:
    """The words in a 16 kHz mono WAV, or None if there is no engine or it couldn't make them out."""
    from homeassistant.components import stt

    language = None
    if not engine_id:
        engine_id, language = _preferred_pipeline_engine(hass)
    if not engine_id:
        _LOGGER.debug("No speech-to-text engine is set up, so the voice message is not transcribed")
        return None
    engine: Any = stt.async_get_speech_to_text_engine(hass, engine_id)
    if engine is None:
        _LOGGER.warning("Speech-to-text engine %s was not found", engine_id)
        return None
    metadata = stt.SpeechMetadata(
        language=_language(language, list(engine.supported_languages), hass.config.language),
        format=stt.AudioFormats.WAV,
        codec=stt.AudioCodecs.PCM,
        bit_rate=stt.AudioBitRates.BITRATE_16,
        sample_rate=stt.AudioSampleRates.SAMPLERATE_16000,
        channel=stt.AudioChannels.CHANNEL_MONO,
    )
    if hasattr(engine, "check_metadata") and not engine.check_metadata(metadata):
        _LOGGER.warning("Speech-to-text engine %s can't take 16 kHz mono WAV in %s", engine_id, metadata.language)
        return None
    process = getattr(engine, "internal_async_process_audio_stream", None) or engine.async_process_audio_stream
    try:
        async with asyncio.timeout(TRANSCRIBE_TIMEOUT):
            result = await process(metadata, _chunks(wav))
    except TimeoutError:
        _LOGGER.warning("Speech-to-text took longer than %s seconds", TRANSCRIBE_TIMEOUT)
        return None
    if result.result != stt.SpeechResultState.SUCCESS or not (result.text or "").strip():
        return None
    return result.text.strip()
