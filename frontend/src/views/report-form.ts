import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { safeCustomElement } from "../define";
import { sharedStyles } from "../styles";
import type { HaClient } from "../ha-client";

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
        background: var(--st-surface);
      }
      .page {
        max-width: 560px;
        margin: 0 auto;
        padding: 32px 16px 48px;
      }
      h2 {
        margin: 0 0 4px;
        font-size: var(--st-fs-dialog);
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

  @state() private _title = "";
  @state() private _details = "";
  @state() private _kind = "bug";
  @state() private _sending = false;
  @state() private _sent = false;
  @state() private _error = "";

  private async _send() {
    if (!this._title.trim() || this._sending) return;
    this._sending = true;
    this._error = "";
    try {
      await this.client.create({ title: this._title.trim(), description: this._details, labels: [this._kind], priority: "normal" });
      this._sent = true;
      this._title = "";
      this._details = "";
      this._kind = "bug";
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
        <p class="lead">Whoever looks after the smart home will see it. They may talk to you about it.</p>
        <div class="actions">
          <button @click=${() => (this._sent = false)}>Report something else</button>
        </div>
      </div>`;
    }
    return html`<div class="page">
      <h2>Report a problem or an idea</h2>
      <p class="lead">Tell us what happened or what you'd like. You don't need to know what's wrong.</p>

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
        <label class="caption" for="title">${this._kind === "bug" ? "What went wrong?" : "What would you like?"}</label>
        <input id="title" type="text" autofocus maxlength="300" .value=${this._title}
          placeholder=${this._kind === "bug" ? "The lounge light didn't turn on" : "A bedtime scene for the kids' rooms"}
          @input=${(e: Event) => (this._title = (e.target as HTMLInputElement).value)}
          @keydown=${(e: KeyboardEvent) => e.key === "Enter" && void this._send()} />
      </div>

      <div class="field">
        <label class="caption" for="details">More detail (optional)</label>
        <textarea id="details" rows="6" .value=${this._details}
          placeholder="When did it happen? Does it always happen? Anything else that might help."
          @input=${(e: Event) => (this._details = (e.target as HTMLTextAreaElement).value)}></textarea>
      </div>

      ${this._error ? html`<div class="error">${this._error}</div>` : nothing}
      <div class="actions">
        <button class="primary" ?disabled=${!this._title.trim() || this._sending} @click=${() => void this._send()}>
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
