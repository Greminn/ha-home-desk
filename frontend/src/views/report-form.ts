import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { safeCustomElement } from "../define";
import { sharedStyles } from "../styles";
import type { HaClient } from "../ha-client";
import { MAX_IMAGES, canRecord, clock, convertAudioFile, shrinkImage, startRecording, type Recorder } from "../media";

interface Photo {
  blob: Blob;
  url: string;
  name: string;
}
interface Voice {
  blob: Blob;
  url: string;
  seconds: number;
}

/** What the person is reporting: a built-in label. Only these two are open to household users. */
const KINDS = [
  { id: "bug", name: "Problem", icon: "mdi:alert-circle-outline", hint: "Something isn't working" },
  { id: "enhancement", name: "Suggestion", icon: "mdi:lightbulb-on-outline", hint: "An idea or a request" },
];

/**
 * What a household member sees instead of the ticket list: one simple form to report a problem or an idea, and a thank-you
 * once it is sent. They don't see tickets or comment on them: anything more is talked through in person.
 */
@safeCustomElement("st-report-form")
export class ReportForm extends LitElement {
  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        background: var(--st-bg);
      }
      /* The form is one Home Assistant card: lighter than the page, with its title inside. */
      .page {
        box-sizing: border-box;
        max-width: 560px;
        margin: 24px auto 48px;
        padding: 16px 16px 24px;
        border: 1px solid var(--ha-card-border-color, var(--st-outline));
        border-radius: var(--ha-card-border-radius, var(--ha-border-radius-xl, 12px));
        background: var(--ha-card-background, var(--card-background-color, var(--st-surface)));
      }
      @media (max-width: 600px) {
        .page {
          margin: 16px;
        }
      }
      h2 {
        margin: 0 0 4px;
        font-size: var(--ha-font-size-2xl, 24px);
        font-weight: 400;
      }
      .lead {
        margin: 0 0 24px;
        font-size: var(--st-fs-body);
        color: var(--st-fg-secondary);
      }
      label.caption {
        display: block;
        margin-bottom: 4px;
        font-size: var(--st-fs-caption);
        color: var(--st-fg-secondary);
      }
      .field {
        margin-bottom: 16px;
      }
      .field input,
      .field textarea {
        width: 100%;
      }
      /* Problem or Suggestion: two big choices, one picked. */
      .kinds {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }
      .kind {
        display: flex;
        align-items: center;
        gap: 12px;
        height: auto;
        padding: 12px 16px;
        border: 1px solid var(--st-outline);
        border-radius: var(--ha-border-radius-xl, 12px);
        background: transparent;
        color: var(--st-fg);
        font-weight: 400;
        text-align: left;
        justify-content: flex-start;
      }
      .kind ha-icon {
        --mdc-icon-size: 24px;
        flex: none;
        color: var(--st-fg-secondary);
      }
      .kind .name {
        font-size: var(--st-fs-body);
        font-weight: 500;
      }
      .kind .hint {
        font-size: var(--st-fs-small);
        color: var(--st-fg-secondary);
      }
      .kind[aria-checked="true"] {
        border-color: var(--st-accent);
        background: color-mix(in srgb, var(--st-accent) 12%, transparent);
      }
      .kind[aria-checked="true"] ha-icon {
        color: var(--st-accent);
      }
      /* Photos and a voice message: two quiet buttons, then what has been added. */
      .attach {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .attach button {
        border: 1px solid var(--st-outline);
        color: var(--st-fg);
        gap: 8px;
      }
      .attach button ha-icon {
        --mdc-icon-size: 20px;
        color: var(--st-fg-secondary);
      }
      .photos {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(88px, 1fr));
        gap: 8px;
        margin-top: 12px;
      }
      .photo {
        position: relative;
        aspect-ratio: 1;
        border-radius: var(--st-r-control);
        overflow: hidden;
        background: var(--st-bg);
      }
      .photo img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .photo .remove {
        position: absolute;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        top: 4px;
        right: 4px;
        width: 28px;
        height: 28px;
        min-width: 0;
        padding: 0;
        border-radius: 50%;
        background: color-mix(in srgb, #000 60%, transparent);
        color: #fff;
      }
      .remove ha-icon {
        --mdc-icon-size: 18px;
        color: #fff;
      }
      .voice {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-top: 12px;
        padding: 8px 8px 8px 16px;
        border: 1px solid var(--st-outline);
        border-radius: var(--st-r-control);
      }
      .voice audio {
        flex: 1;
        min-width: 0;
        height: 36px;
      }
      .voice .rec-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--st-danger);
        animation: pulse 1.2s ease-in-out infinite;
      }
      .voice .time {
        flex: 1;
        font-variant-numeric: tabular-nums;
        font-size: var(--st-fs-body);
      }
      @keyframes pulse {
        50% {
          opacity: 0.25;
        }
      }
      .note {
        margin-top: 8px;
        font-size: var(--st-fs-small);
        color: var(--st-fg-secondary);
      }
      input[type="file"] {
        display: none;
      }
      .actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 24px;
      }
      .error {
        margin-top: 12px;
        font-size: var(--st-fs-body);
        color: var(--st-danger);
      }
      .thanks {
        text-align: center;
        padding-top: 48px;
      }
      .thanks ha-icon {
        --mdc-icon-size: 64px;
        color: var(--st-success);
      }
      .thanks h2 {
        margin-top: 16px;
      }
      .thanks .actions {
        justify-content: center;
      }
    `,
  ];

  @property({ attribute: false }) client!: HaClient;

  @state() private _message = "";
  @state() private _kind = "bug";
  @state() private _sending = false;
  @state() private _sent = false;
  @state() private _error = "";
  @state() private _photos: Photo[] = [];
  @state() private _voice: Voice | null = null;
  /** Seconds recorded so far, while the microphone is on; null otherwise. */
  @state() private _recording: number | null = null;
  @state() private _busy = false;
  @state() private _sentWith = { photos: 0, voice: false };
  private _recorder: Recorder | null = null;

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._recorder?.cancel();
    this._forget();
  }

  private _forget() {
    this._photos.forEach((p) => URL.revokeObjectURL(p.url));
    if (this._voice) URL.revokeObjectURL(this._voice.url);
    this._photos = [];
    this._voice = null;
  }

  private async _addPhotos(e: Event) {
    const input = e.target as HTMLInputElement;
    const files = [...(input.files ?? [])].slice(0, MAX_IMAGES - this._photos.length);
    input.value = "";
    if (!files.length) return;
    this._busy = true;
    try {
      for (const file of files) {
        const blob = await shrinkImage(file);
        this._photos = [...this._photos, { blob, url: URL.createObjectURL(blob), name: file.name }];
      }
    } finally {
      this._busy = false;
    }
  }

  private _removePhoto(photo: Photo) {
    URL.revokeObjectURL(photo.url);
    this._photos = this._photos.filter((p) => p !== photo);
  }

  private _setVoice(blob: Blob, seconds: number) {
    if (this._voice) URL.revokeObjectURL(this._voice.url);
    this._voice = { blob, url: URL.createObjectURL(blob), seconds };
  }

  private async _record() {
    this._error = "";
    try {
      this._recording = 0;
      this._recorder = await startRecording(
        (n) => (this._recording = n),
        () => void this._stopRecording(),
      );
    } catch {
      this._recording = null;
      this._error = "The microphone isn't available. Check it is allowed for this page, or add a recording from your device.";
    }
  }

  private async _stopRecording() {
    const recorder = this._recorder;
    this._recorder = null;
    this._recording = null;
    if (!recorder) return;
    const { blob, seconds } = await recorder.stop();
    if (seconds > 0) this._setVoice(blob, seconds);
  }

  private async _addVoiceFile(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = "";
    if (!file) return;
    this._busy = true;
    this._error = "";
    try {
      const { blob, seconds } = await convertAudioFile(file);
      this._setVoice(blob, seconds);
    } catch {
      this._error = "That recording couldn't be read. Try another, or type the message instead.";
    } finally {
      this._busy = false;
    }
  }

  /** A message, a voice recording or a photo is enough on its own. */
  private get _canSend() {
    const something = this._message.trim() || this._photos.length || this._voice;
    return !!something && !this._sending && !this._busy && this._recording === null;
  }

  private async _send() {
    if (!this._canSend) return;
    this._sending = true;
    this._error = "";
    try {
      const form = new FormData();
      form.append("kind", this._kind);
      form.append("message", this._message.trim());
      this._photos.forEach((p, i) => form.append("image", p.blob, `photo-${i + 1}.${p.blob.type === "image/jpeg" ? "jpg" : "img"}`));
      if (this._voice) form.append("audio", this._voice.blob, "voice-message.wav");
      const sent = await this.client.report(form);
      this._sentWith = { photos: sent.photos, voice: sent.voice };
      this._sent = true;
      this._message = "";
      this._kind = "bug";
      this._forget();
    } catch (err) {
      this._error = err && typeof err === "object" && "message" in err ? String((err as { message: unknown }).message) : String(err);
    } finally {
      this._sending = false;
    }
  }

  override render() {
    if (this._sent) {
      return html`<div class="page thanks">
        <ha-icon icon="mdi:check-circle-outline"></ha-icon>
        <h2>Thanks, that's been sent</h2>
        <p class="lead">Whoever looks after the smart home will see it${this._sentWith.photos || this._sentWith.voice ? ", with what you added" : ""}. They may talk to you about it.</p>
        <div class="actions">
          <button @click=${() => (this._sent = false)}>Report something else</button>
        </div>
      </div>`;
    }
    return html`<div class="page">
      <h2>Report a problem or an idea</h2>
      <p class="lead">Tell us what happened or what you'd like. Write it, record it or add a photo, whichever is easiest.</p>

      <div class="field">
        <label class="caption" id="kind-label">What is it?</label>
        <div class="kinds" role="radiogroup" aria-labelledby="kind-label">
          ${KINDS.map(
            (k) => html`<button class="kind" role="radio" aria-checked=${this._kind === k.id ? "true" : "false"}
              @click=${() => (this._kind = k.id)}>
              <ha-icon .icon=${k.icon}></ha-icon>
              <span><div class="name">${k.name}</div><div class="hint">${k.hint}</div></span>
            </button>`,
          )}
        </div>
      </div>

      <div class="field">
        <label class="caption" for="message">${this._kind === "bug" ? "What went wrong?" : "What would you like?"}</label>
        <textarea id="message" rows="6" autofocus .value=${this._message}
          placeholder=${this._kind === "bug"
            ? "The lounge light didn't turn on. It happens most evenings."
            : "A bedtime scene for the kids' rooms"}
          @input=${(e: Event) => (this._message = (e.target as HTMLTextAreaElement).value)}></textarea>
      </div>

      <div class="field">
        <label class="caption">Or show or tell us</label>
        <div class="attach">
          <button ?disabled=${this._photos.length >= MAX_IMAGES || this._busy}
            @click=${() => this.renderRoot.querySelector<HTMLInputElement>("#photo-input")?.click()}>
            <ha-icon icon="mdi:camera-outline"></ha-icon>Add photos
          </button>
          ${this._recording === null
            ? html`<button ?disabled=${this._busy}
                @click=${() => (canRecord() ? void this._record() : this.renderRoot.querySelector<HTMLInputElement>("#voice-input")?.click())}>
                <ha-icon icon="mdi:microphone-outline"></ha-icon>${this._voice ? "Record again" : "Record a message"}
              </button>`
            : nothing}
        </div>
        <input id="photo-input" type="file" accept="image/*" multiple @change=${this._addPhotos} />
        <input id="voice-input" type="file" accept="audio/*" capture @change=${this._addVoiceFile} />

        ${this._photos.length
          ? html`<div class="photos">
              ${this._photos.map(
                (p) => html`<div class="photo">
                  <img src=${p.url} alt=${p.name} />
                  <button class="remove" title="Remove" aria-label="Remove photo" @click=${() => this._removePhoto(p)}>
                    <ha-icon icon="mdi:close"></ha-icon>
                  </button>
                </div>`,
              )}
            </div>`
          : nothing}
        ${this._recording !== null
          ? html`<div class="voice">
              <span class="rec-dot"></span>
              <span class="time">Recording ${clock(this._recording)}</span>
              <button class="primary" @click=${() => void this._stopRecording()}>Stop</button>
            </div>`
          : this._voice
            ? html`<div class="voice">
                <audio controls src=${this._voice.url}></audio>
                <button class="icon" title="Remove" aria-label="Remove voice message"
                  @click=${() => {
                    URL.revokeObjectURL(this._voice!.url);
                    this._voice = null;
                  }}>
                  <ha-icon icon="mdi:delete-outline"></ha-icon>
                </button>
              </div>`
            : nothing}
        ${this._voice ? html`<div class="note">Your message will be written out as text for whoever reads this.</div>` : nothing}
      </div>

      ${this._error ? html`<div class="error">${this._error}</div>` : nothing}
      <div class="actions">
        <button class="primary" ?disabled=${!this._canSend} @click=${() => void this._send()}>
          ${this._sending ? "Sending…" : "Send"}
        </button>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "st-report-form": ReportForm;
  }
}
