/**
 * Getting photos and voice messages ready to send, in the browser.
 *
 * Photos are shrunk (a phone photo is several MB; 1600 px is plenty for a bug report). Sound is turned into 16 kHz mono
 * 16-bit WAV, the one format Home Assistant's speech-to-text takes without converting, and it plays in every browser.
 */

export const MAX_IMAGES = 6;
export const MAX_AUDIO_SECONDS = 180;
const IMAGE_EDGE = 1600;
const SPEECH_RATE = 16000;

/** A photo, scaled so its longest side is at most 1600 px, as a JPEG. Falls back to the original if it can't be read. */
export async function shrinkImage(file: File): Promise<Blob> {
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    const scale = Math.min(1, IMAGE_EDGE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.85));
    return blob && blob.size < file.size ? blob : scale < 1 && blob ? blob : file;
  } catch {
    return file; // a format the browser can't draw (HEIC, say): send it as it is and let the server decide
  }
}

/** Mono, 16 kHz, 16-bit PCM in a WAV file, from samples at any rate. */
export function encodeWav(samples: Float32Array, rate: number): Blob {
  const mono = rate === SPEECH_RATE ? samples : resample(samples, rate, SPEECH_RATE);
  const buffer = new ArrayBuffer(44 + mono.length * 2);
  const view = new DataView(buffer);
  const text = (at: number, s: string) => [...s].forEach((c, i) => view.setUint8(at + i, c.charCodeAt(0)));
  text(0, "RIFF");
  view.setUint32(4, 36 + mono.length * 2, true);
  text(8, "WAVE");
  text(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, 1, true); // mono
  view.setUint32(24, SPEECH_RATE, true);
  view.setUint32(28, SPEECH_RATE * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  text(36, "data");
  view.setUint32(40, mono.length * 2, true);
  mono.forEach((v, i) => view.setInt16(44 + i * 2, Math.max(-1, Math.min(1, v)) * 0x7fff, true));
  return new Blob([buffer], { type: "audio/wav" });
}

/** Linear resampling with a simple average over each output sample's span, which is enough for speech. */
function resample(input: Float32Array, from: number, to: number): Float32Array {
  const ratio = from / to;
  const out = new Float32Array(Math.floor(input.length / ratio));
  for (let i = 0; i < out.length; i++) {
    const start = Math.floor(i * ratio);
    const end = Math.min(input.length, Math.max(start + 1, Math.floor((i + 1) * ratio)));
    let sum = 0;
    for (let j = start; j < end; j++) sum += input[j]!;
    out[i] = sum / (end - start);
  }
  return out;
}

/** A recording in progress: stop() gives the WAV; cancel() throws it away. */
export interface Recorder {
  stop(): Promise<{ blob: Blob; seconds: number }>;
  cancel(): void;
}

/** True where the browser can record (it needs a secure page, https or localhost). */
export const canRecord = (): boolean => !!navigator.mediaDevices?.getUserMedia && typeof AudioContext !== "undefined";

/** Starts the microphone. `onTick` gets the seconds so far; recording stops itself at the limit (`onLimit`). */
export async function startRecording(onTick: (seconds: number) => void, onLimit: () => void): Promise<Recorder> {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true } });
  const ctx = new AudioContext();
  const source = ctx.createMediaStreamSource(stream);
  const node = ctx.createScriptProcessor(4096, 1, 1);
  const chunks: Float32Array[] = [];
  let length = 0;
  let done = false;
  node.onaudioprocess = (e) => {
    if (done) return;
    const data = new Float32Array(e.inputBuffer.getChannelData(0));
    chunks.push(data);
    length += data.length;
    const seconds = length / ctx.sampleRate;
    onTick(Math.floor(seconds));
    if (seconds >= MAX_AUDIO_SECONDS) onLimit();
  };
  source.connect(node);
  node.connect(ctx.destination); // a script processor only runs when connected; it outputs silence
  const release = () => {
    done = true;
    node.disconnect();
    source.disconnect();
    stream.getTracks().forEach((t) => t.stop());
    void ctx.close();
  };
  return {
    cancel: release,
    stop: async () => {
      const rate = ctx.sampleRate;
      release();
      const all = new Float32Array(length);
      let at = 0;
      for (const c of chunks) {
        all.set(c, at);
        at += c.length;
      }
      return { blob: encodeWav(all, rate), seconds: Math.round(length / rate) };
    },
  };
}

/** A sound file picked from the device (a phone's recorder, say), converted to the same 16 kHz mono WAV. */
export async function convertAudioFile(file: File): Promise<{ blob: Blob; seconds: number }> {
  const ctx = new AudioContext();
  try {
    const decoded = await ctx.decodeAudioData(await file.arrayBuffer());
    const frames = Math.ceil(decoded.duration * SPEECH_RATE);
    const offline = new OfflineAudioContext(1, frames, SPEECH_RATE); // mixing to mono and resampling are done for us
    const src = offline.createBufferSource();
    src.buffer = decoded;
    src.connect(offline.destination);
    src.start();
    const rendered = await offline.startRendering();
    return { blob: encodeWav(rendered.getChannelData(0), SPEECH_RATE), seconds: Math.round(decoded.duration) };
  } finally {
    void ctx.close();
  }
}

export const clock = (seconds: number): string => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
