import { LitElement, html, css, nothing } from "lit";
import { property } from "lit/decorators.js";
import { safeCustomElement } from "../define";
import { sharedStyles } from "../styles";
import type { TicketSummary } from "../types";
import { VIEWS } from "../list-model";
import { stateIcon, stateColor, reviewLabel, actorName, metaIcon, relativeTime } from "../format";

const WEEK_MS = 7 * 24 * 3600 * 1000;
const HISTORY = "history";

const live = (t: TicketSummary) => (t.status === "new" || t.status === "in_progress") && !t.merged_into && !t.labels.includes(HISTORY);

/** The Home page: what needs you, what the AI Agent is doing, and what has happened lately. Everything links through. */
@safeCustomElement("st-home-page")
export class HomePage extends LitElement {
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
      .page {
        max-width: 1040px;
        margin: 0 auto;
        padding: 24px 16px 48px;
      }
      h1 {
        margin: 0 0 4px;
        font-size: var(--st-fs-heading);
        font-weight: var(--st-fw-heading);
      }
      .lead {
        margin: 0 0 20px;
        color: var(--st-fg-secondary);
        font-size: var(--st-fs-body);
      }
      /* Home Assistant's cards: the title inside, in large light type, on a box lighter than the page. */
      h2 {
        margin: 0;
        padding: 16px 16px 8px;
        font-size: var(--ha-font-size-2xl, 24px);
        font-weight: 400;
        line-height: 1.3;
      }
      .tiles {
        padding: 8px 16px 8px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
        gap: 12px;
      }
      .tile {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
        height: auto;
        padding: 14px 16px;
        border: none;
        border-radius: var(--ha-border-radius-lg, 12px);
        background: color-mix(in srgb, var(--st-fg) 7%, transparent);
        text-align: left;
        font-weight: 400;
      }
      .tile.static {
        cursor: default;
      }
      .tile .top {
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--st-fg-secondary);
        font-size: var(--st-fs-body);
      }
      .tile .top ha-icon {
        --mdc-icon-size: 20px;
      }
      .tile .n {
        font-size: 28px;
        line-height: 1.2;
        font-weight: 500;
        color: var(--st-fg);
      }
      .tile .sub-n {
        display: block;
        font-size: var(--st-fs-caption);
        font-weight: 400;
        color: var(--st-fg-secondary);
      }
      .tile.hot .n,
      .tile.hot .top ha-icon {
        color: var(--st-accent);
      }
      .tile.warn .n,
      .tile.warn .top ha-icon {
        color: var(--st-warning);
      }
      .cols {
        display: grid;
        /* The inbox on the left (the wider side), the overview on the right; one column on a narrow screen. */
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 380px), 1fr));
        gap: 24px;
        align-items: start;
      }
      .card {
        border: 1px solid var(--ha-card-border-color, var(--st-outline));
        border-radius: var(--ha-card-border-radius, var(--ha-border-radius-xl, 12px));
        background: var(--ha-card-background, var(--card-background-color, var(--st-surface)));
        overflow: hidden;
        padding-bottom: 8px;
      }
      .row {
        display: grid;
        grid-template-columns: 28px minmax(0, 1fr);
        gap: 12px;
        width: 100%;
        height: auto;
        padding: 10px 16px;
        border-radius: 0;
        border-bottom: 1px solid var(--st-divider);
        text-align: left;
        font-weight: 400;
        color: var(--st-fg);
        align-items: start;
      }
      .row:last-child {
        border-bottom: none;
      }
      .row:hover {
        background: var(--st-hover);
      }
      .row .ic {
        --mdc-icon-size: 22px;
        margin-top: 1px;
      }
      .row .title {
        font-size: var(--st-fs-row);
        font-weight: 500;
        overflow-wrap: anywhere;
      }
      .row.unread .title {
        font-weight: 700;
      }
      .row .sub {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0 10px;
        margin-top: 2px;
        font-size: var(--st-fs-caption);
        color: var(--st-fg-secondary);
      }
      .row .sub > span {
        display: inline-flex;
        align-items: center;
        gap: 3px;
      }
      .row .sub ha-icon {
        --mdc-icon-size: 14px;
        display: inline-flex;
        flex: none;
        align-self: center;
      }
      .row .sub .work {
        color: var(--st-accent);
        font-weight: 500;
      }
      .row .sub .work ha-icon {
        animation: pulse 1.4s ease-in-out infinite;
      }
      .row .sub .hot {
        color: var(--st-warning);
      }
      @keyframes pulse {
        50% {
          opacity: 0.3;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .row .sub .work ha-icon {
          animation: none;
        }
      }
      .none {
        padding: 16px;
        color: var(--st-fg-secondary);
        font-size: var(--st-fs-body);
      }
    `,
  ];

  @property({ attribute: false }) tickets: TicketSummary[] = [];
  @property() language: string | undefined = undefined;
  @property() userName = "";
  /** On a narrow screen the page stands alone and carries its own Inbox; on a wide one the Inbox list is beside it. */
  @property({ type: Boolean }) compact = false;

  private _fire(name: string, detail: unknown) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  private _greeting(): string {
    const h = new Date().getHours();
    const part = h < 5 ? "Good evening" : h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
    return this.userName ? `${part}, ${this.userName}` : part;
  }

  private _tile(icon: string, label: string, n: number, opts: { view?: string; priority?: string; scope?: string; cls?: string; sub?: string } = {}) {
    const go = opts.view !== undefined;
    return html`<button class="tile ${go ? "" : "static"} ${n && opts.cls ? opts.cls : ""}"
      @click=${() => go && this._fire("go-view", { view: opts.view, priority: opts.priority ?? "", scope: opts.scope ?? "" })}>
      <span class="top"><ha-icon .icon=${icon}></ha-icon>${label}</span>
      <span class="n">${n}${opts.sub ? html`<span class="sub-n">${opts.sub}</span>` : nothing}</span>
    </button>`;
  }

  private _row(t: TicketSummary) {
    const by = t.updated_by ?? t.requester;
    const verb = t.updated_by ? "Updated" : "Opened";
    return html`<button class="row ${t.unread ? "unread" : ""}" @click=${() => this._fire("open-ticket", t.id)}>
      <ha-icon class="ic" .icon=${stateIcon(t.status, t.assignee, t.labels)} style="color: ${stateColor(t.status, t.assignee, t.labels, t.comment_count)}"></ha-icon>
      <div>
        <div class="title">${t.title}</div>
        <div class="sub">
          ${t.agent_state ? html`<span class="work"><ha-icon icon="mdi:star-four-points"></ha-icon> ${reviewLabel(`ai:${t.agent_state.agent}`)} working…</span>` : nothing}
          ${t.priority === "urgent" || t.priority === "high"
            ? html`<span class="hot"><ha-icon .icon=${t.priority === "urgent" ? "mdi:alert" : "mdi:alert-outline"}></ha-icon> ${t.priority === "urgent" ? "Urgent" : "High"}</span>`
            : nothing}
          <span>${verb} ${relativeTime(t.updated_at, this.language)} by <ha-icon icon=${metaIcon(by)}></ha-icon> ${actorName(by)}</span>
        </div>
      </div>
    </button>`;
  }

  private _card(title: string, rows: TicketSummary[], empty: string) {
    return html`<div class="card">
      <h2>${title}</h2>
      ${rows.length ? rows.map((t) => this._row(t)) : html`<div class="none">${empty}</div>`}
    </div>`;
  }

  override render() {
    const all = this.tickets.filter((t) => !t.merged_into);
    const view = (id: string) => all.filter(VIEWS.find((v) => v.id === id)!.match).length;
    const now = Date.now();
    const inbox = all
      .filter(VIEWS.find((v) => v.id === "inbox")!.match)
      .sort((a, b) => b.created_at.localeCompare(a.created_at));
    const urgent = all.filter((t) => live(t) && (t.priority === "urgent" || t.priority === "high"));
    const unread = all.filter((t) => t.unread);
    const opened = all.filter((t) => now - new Date(t.created_at).getTime() < WEEK_MS && !t.labels.includes(HISTORY)).length;
    const resolved = all.filter(
      (t) => (t.status === "resolved" || t.status === "closed") && t.closed_at && now - new Date(t.closed_at).getTime() < WEEK_MS && !t.labels.includes(HISTORY),
    ).length;
    return html`<div class="page">
      <h1>${this._greeting()}</h1>
      <p class="lead">${inbox.length ? `${inbox.length} new ${inbox.length === 1 ? "ticket is" : "tickets are"} waiting in your inbox.` : "Your inbox is empty."}</p>

      <div class="cols">
        ${this.compact ? this._card("Inbox", inbox, "Nothing new. All clear.") : nothing}
        <div class="card">
          <h2>Overview</h2>
          <div class="tiles">
            ${this._tile("mdi:inbox-outline", "Inbox", view("inbox"), { view: "inbox", cls: "hot" })}
            ${this._tile("mdi:progress-wrench", "Working", view("working"), { view: "working" })}
            ${this._tile("mdi:star-four-points-outline", "Queued for AI", view("queued"), { view: "queued" })}
            ${this._tile("mdi:alert-outline", "Urgent / High", urgent.length, { view: "completed", scope: "open", cls: "warn" })}
            ${this._tile("mdi:email-open-outline", "Unread", unread.length, { view: "completed", scope: "everything", cls: "hot" })}
            ${this._tile("mdi:calendar-week", "This week", opened, { sub: `opened · ${resolved} resolved` })}
          </div>
        </div>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "st-home-page": HomePage;
  }
}
