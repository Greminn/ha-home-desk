import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { safeCustomElement } from "../define";
import { sharedStyles } from "../styles";
import { relativeTime, stateColor, stateIcon } from "../format";
import type { Status } from "../types";
import type { HaClient } from "../ha-client";
import type { MyReport } from "../types";
import "./ticket-attachments";

/** A report's state, in the words a household member would use. */
const STATUS = {
  received: "Received",
  looking: "Being Looked At",
  resolved: "Resolved",
} as const;

/** The ticket status each plain word stands for, so the icons and colours match the administrators' list. */
const STATE_OF: Record<MyReport["status"], Status> = { received: "new", looking: "in_progress", resolved: "resolved" };

/**
 * What a household member sees of the reports they sent: what it was (a problem or a suggestion), where it is up to,
 * what they wrote and added, the replies, and a box to answer. No ticket numbers, labels, priorities or AI.
 */
@safeCustomElement("st-my-reports")
export class MyReports extends LitElement {
  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
      }
      /* The same rows as the administrators' list: a state icon, the title, small grey lines, a hairline between. No card. */
      .page {
        box-sizing: border-box;
        max-width: 560px;
        margin: 0 auto 48px;
      }
      h3 {
        margin: 0;
        padding: 16px 16px 8px;
        font-size: var(--st-fs-caption);
        font-weight: 500;
        color: var(--st-fg-secondary);
        border-bottom: 1px solid var(--st-divider);
      }
      .report {
        border-bottom: 1px solid var(--st-divider);
      }
      .row {
        display: grid;
        grid-template-columns: 32px minmax(0, 1fr);
        gap: 14px;
        width: 100%;
        height: auto;
        padding: 12px 20px 12px 16px;
        border-radius: 0;
        color: var(--st-fg);
        font-weight: 400;
        text-align: left;
        align-items: start;
        position: relative;
      }
      .row:hover {
        background: var(--st-hover);
      }
      .row.unread::after {
        content: "";
        position: absolute;
        left: 5px;
        top: 20px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--st-accent);
      }
      .row.unread .title {
        font-weight: 700;
      }
      .state {
        --mdc-icon-size: 24px;
        margin: -1px 0 0 4px;
      }
      .body {
        min-width: 0;
      }
      .title {
        font-size: var(--st-fs-row);
        font-weight: 500;
        line-height: 22px;
        overflow-wrap: anywhere;
      }
      .done .title {
        color: var(--st-fg-secondary);
      }
      .meta {
        display: flex;
        flex-wrap: wrap;
        gap: 2px 12px;
        font-size: var(--st-fs-small);
        color: var(--st-fg-secondary);
      }
      .meta .status {
        font-weight: 500;
      }
      .detail {
        padding: 0 20px 16px 62px;
      }
      @media (max-width: 600px) {
        .detail {
          padding-left: 16px;
        }
      }
      .message {
        margin: 0 0 12px;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        font-size: var(--st-fs-body);
      }
      .resolution,
      .line {
        margin: 12px 0;
        font-size: var(--st-fs-body);
        white-space: pre-wrap;
        overflow-wrap: anywhere;
      }
      .caption {
        display: block;
        margin-bottom: 2px;
        font-size: var(--st-fs-small);
        color: var(--st-fg-secondary);
      }
      .line.mine .caption {
        color: var(--st-accent);
      }
      .reply {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 8px;
        margin-top: 12px;
      }
      .reply textarea {
        width: 100%;
      }
      .error {
        color: var(--st-danger);
        font-size: var(--st-fs-small);
      }
    `,
  ];

  @property({ attribute: false }) client!: HaClient;
  @property({ attribute: false }) language = "en";
  /** Changes when the person sends a new report, so the list loads again. */
  @property({ type: Number }) version = 0;

  @state() private _reports: MyReport[] = [];
  @state() private _open: MyReport | null = null;
  @state() private _reply = "";
  @state() private _busy = false;
  @state() private _error = "";
  private _timer: number | undefined;
  private readonly _onVisible = () => {
    if (document.visibilityState === "visible") void this._load();
  };

  override connectedCallback() {
    super.connectedCallback();
    void this._load();
    // Home Assistant lets only administrators listen for ticket events, so a household member's list is asked for again
    // now and then, and whenever they come back to the page.
    this._timer = window.setInterval(() => void this._load(), 60_000);
    document.addEventListener("visibilitychange", this._onVisible);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this._timer);
    document.removeEventListener("visibilitychange", this._onVisible);
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has("version") && changed.get("version") !== undefined) void this._load();
  }

  private async _load() {
    try {
      this._reports = await this.client.myReports();
      if (this._open) await this._show(this._open.id);
    } catch {
      this._reports = []; // nothing to show is better than an error on a page that is for sending reports
    }
  }

  private async _show(id: number) {
    try {
      this._open = await this.client.myReport(id);
      this._reports = await this.client.myReports(); // opening it reads the replies
    } catch {
      this._open = null; // it was closed in the meantime
    }
  }

  private async _toggle(r: MyReport) {
    this._error = "";
    this._reply = "";
    if (this._open?.id === r.id) {
      this._open = null;
      return;
    }
    await this._show(r.id);
  }

  private async _send() {
    if (!this._open || !this._reply.trim() || this._busy) return;
    this._busy = true;
    this._error = "";
    try {
      this._open = await this.client.myReply(this._open.id, this._reply.trim());
      this._reply = "";
      this._reports = await this.client.myReports();
    } catch (err) {
      this._error = err && typeof err === "object" && "message" in err ? String((err as { message: unknown }).message) : "That couldn't be sent";
    } finally {
      this._busy = false;
    }
  }

  private _detail(r: MyReport) {
    return html`<div class="detail">
      ${r.message ? html`<p class="message">${r.message}</p>` : nothing}
      <st-ticket-attachments .client=${this.client} .ticketId=${r.id} .items=${r.attachments ?? []}></st-ticket-attachments>
      ${r.status === "resolved" && r.resolution
        ? html`<div class="resolution"><span class="caption">How it was sorted</span>${r.resolution}</div>`
        : nothing}
      ${(r.messages ?? []).map(
        (m) => html`<div class="line ${m.mine ? "mine" : ""}">
          <span class="caption">${m.who} · ${relativeTime(m.at, this.language)}</span>${m.body}
        </div>`,
      )}
      <div class="reply">
        <textarea rows="3" aria-label="Your reply" .value=${this._reply}
          placeholder=${r.status === "resolved" ? "Still not right? Tell us" : "Add a reply"}
          @input=${(e: Event) => (this._reply = (e.target as HTMLTextAreaElement).value)}></textarea>
        ${this._error ? html`<div class="error">${this._error}</div>` : nothing}
        <button class="primary" ?disabled=${!this._reply.trim() || this._busy} @click=${() => void this._send()}>
          ${this._busy ? "Sending…" : "Send"}
        </button>
      </div>
    </div>`;
  }

  override render() {
    if (!this._reports.length) return nothing;
    return html`<div class="page">
      <h3>My Reports</h3>
      ${this._reports.map((r) => {
        const open = this._open?.id === r.id;
        const status = STATE_OF[r.status];
        const labels = r.kind === "suggestion" ? ["enhancement"] : [];
        return html`<div class="report ${r.status === "resolved" ? "done" : ""}">
          <button class="row ${r.unread ? "unread" : ""}" aria-expanded=${open ? "true" : "false"} @click=${() => void this._toggle(r)}>
            <ha-icon class="state" .icon=${stateIcon(status, null, labels)} style="color:${stateColor(status, null, labels)}" role="img"
              aria-label=${STATUS[r.status]}></ha-icon>
            <div class="body">
              <div class="title">${r.title}</div>
              <div class="meta">
                <span>Opened ${relativeTime(r.created_at, this.language)}</span>
                <span class="status" style="color:${stateColor(status, null, labels)}">${STATUS[r.status]}</span>
                ${r.unread ? html`<span class="status" style="color:var(--st-accent)">New reply</span>` : nothing}
              </div>
            </div>
          </button>
          ${open && this._open ? this._detail(this._open) : nothing}
        </div>`;
      })}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "st-my-reports": MyReports;
  }
}
