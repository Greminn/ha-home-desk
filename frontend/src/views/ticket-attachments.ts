import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { safeCustomElement } from "../define";
import { sharedStyles } from "../styles";
import type { HaClient } from "../ha-client";
import type { Attachment } from "../types";
import { clock } from "../media";

/** The photos and voice message sent with a report: thumbnails that open full size, and a player. */
@safeCustomElement("st-ticket-attachments")
export class TicketAttachments extends LitElement {
  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
      }
      .photos {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
        gap: 8px;
      }
      .photos button {
        display: block;
        padding: 0;
        height: auto;
        aspect-ratio: 1;
        overflow: hidden;
        border-radius: var(--st-r-control);
        background: var(--st-bg);
      }
      .photos img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .voice {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-top: 8px;
      }
      .photos + .voice {
        margin-top: 12px;
      }
      .voice ha-icon {
        --mdc-icon-size: 20px;
        flex: none;
        color: var(--st-fg-secondary);
      }
      .voice audio {
        flex: 1;
        min-width: 0;
        height: 36px;
      }
      .voice .length {
        flex: none;
        font-size: var(--st-fs-small);
        color: var(--st-fg-secondary);
      }
      .lightbox {
        position: fixed;
        inset: 0;
        z-index: 20;
        display: flex;
        align-items: center;
        justify-content: center;
        background: color-mix(in srgb, #000 80%, transparent);
      }
      .lightbox img {
        max-width: 96vw;
        max-height: 92vh;
        object-fit: contain;
      }
      .lightbox button {
        position: absolute;
        top: 12px;
        right: 12px;
        color: #fff;
      }
    `,
  ];

  @property({ attribute: false }) client!: HaClient;
  @property({ type: Number }) ticketId = 0;
  @property({ attribute: false }) items: Attachment[] = [];

  /** Signed links by attachment id; each is good for an hour, so they are fetched again when the ticket changes. */
  @state() private _urls: Record<string, string> = {};
  @state() private _open = "";
  private _signedFor = "";

  override willUpdate() {
    const key = `${this.ticketId}:${this.items.map((a) => a.id).join(",")}`;
    if (key === this._signedFor || !this.client) return;
    this._signedFor = key;
    this._urls = {};
    const ticket = this.ticketId;
    for (const a of this.items) {
      this.client
        .attachmentUrl(ticket, a.id)
        .then((url) => {
          if (ticket === this.ticketId) this._urls = { ...this._urls, [a.id]: url };
        })
        .catch(() => undefined); // an attachment that can't be signed simply doesn't show
    }
  }

  override render() {
    const photos = this.items.filter((a) => a.kind === "image");
    const voices = this.items.filter((a) => a.kind === "audio");
    if (!photos.length && !voices.length) return nothing;
    return html`
      ${photos.length
        ? html`<div class="photos">
            ${photos.map((a) =>
              this._urls[a.id]
                ? html`<button title=${a.name} aria-label=${`Open ${a.name}`} @click=${() => (this._open = a.id)}>
                    <img src=${this._urls[a.id]!} alt=${a.name} loading="lazy" />
                  </button>`
                : nothing,
            )}
          </div>`
        : nothing}
      ${voices.map(
        (a) => html`<div class="voice">
          <ha-icon icon="mdi:microphone-outline"></ha-icon>
          ${this._urls[a.id] ? html`<audio controls preload="none" src=${this._urls[a.id]!}></audio>` : nothing}
          ${a.seconds ? html`<span class="length">${clock(a.seconds)}</span>` : nothing}
        </div>`,
      )}
      ${this._open && this._urls[this._open]
        ? html`<div class="lightbox" @click=${() => (this._open = "")}>
            <img src=${this._urls[this._open]!} alt="" />
            <button class="icon" aria-label="Close" @click=${() => (this._open = "")}><ha-icon icon="mdi:close"></ha-icon></button>
          </div>`
        : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "st-ticket-attachments": TicketAttachments;
  }
}
