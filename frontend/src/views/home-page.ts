import { LitElement, html, css, nothing, svg } from "lit";
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
        margin-bottom: 24px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
        gap: 12px;
      }
      .tile {
        position: relative;
        display: flex;
        flex-direction: column;
        border: 1px solid var(--ha-card-border-color, var(--st-outline));
        border-radius: var(--ha-border-radius-lg, 12px);
        background: var(--ha-card-background, var(--card-background-color, var(--st-surface)));
        overflow: hidden;
      }
      .tile .main {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
        height: auto;
        padding: 14px 16px;
        border-radius: 0;
        text-align: left;
        font-weight: 400;
      }
      .tile .main:hover {
        background: var(--st-hover);
      }
      /* The High and Urgent counts of the tab, each a button into it with that priority picked. */
      /* On the number's line, at the right of the tile. */
      .flags {
        position: absolute;
        right: 12px;
        bottom: 14px;
        display: flex;
        gap: 6px;
      }
      .flag {
        height: 28px;
        padding: 0 10px 0 6px;
        gap: 4px;
        border-radius: var(--st-r-pill);
        background: color-mix(in srgb, var(--st-fg) 7%, transparent);
        font-size: var(--st-fs-body);
        font-weight: 500;
      }
      .flag ha-icon {
        --mdc-icon-size: 18px;
      }
      .flag.urgent {
        color: var(--st-error, var(--error-color, #db4437));
      }
      .flag.high {
        color: var(--st-warning);
      }
      .flag.zero {
        opacity: 0.45;
      }
      .flag:hover {
        background-image: linear-gradient(var(--st-hover), var(--st-hover));
      }
      .chart svg {
        display: block;
        width: 100%;
        max-width: 760px;
        height: auto;
        padding: 0 16px;
        box-sizing: border-box;
      }
      .chart .axis {
        stroke: var(--st-divider);
        stroke-width: 1;
      }
      .chart rect.opened,
      .legend i.opened {
        fill: var(--st-accent);
        background: var(--st-accent);
      }
      .chart rect.completed,
      .legend i.completed {
        fill: var(--purple-color, #926bc7);
        background: var(--purple-color, #926bc7);
      }
      .chart .val,
      .chart .day {
        fill: var(--st-fg-secondary);
        font-size: 12px;
      }
      .chart-sub {
        margin: 0;
        padding: 0 16px 8px;
        color: var(--st-fg-secondary);
        font-size: var(--st-fs-body);
      }
      .legend {
        display: flex;
        gap: 16px;
        padding: 4px 16px 8px;
        color: var(--st-fg-secondary);
        font-size: var(--st-fs-caption);
      }
      .legend span {
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      .legend i {
        width: 10px;
        height: 10px;
        border-radius: 2px;
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
        position: absolute;
        right: 16px;
        bottom: 20px;
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
    const part = h < 5 ? "Good Evening" : h < 12 ? "Good Morning" : h < 18 ? "Good Afternoon" : "Good Evening";
    return this.userName ? `${part}, ${this.userName}` : part;
  }

  /** A tile that opens its tab. Inbox and Working also count their High and Urgent tickets, each opening the tab on that priority. */
  private _tile(icon: string, label: string, n: number, view: string, opts: { cls?: string; sub?: string; flags?: { urgent: number; high: number } } = {}) {
    const flag = (priority: "urgent" | "high", count: number) => html`<button class="flag ${priority} ${count ? "" : "zero"}"
      title=${`${count} ${priority === "urgent" ? "Urgent" : "High"} in ${label}`} aria-label=${`${count} ${priority === "urgent" ? "Urgent" : "High"} tickets in ${label}`}
      @click=${() => this._fire("go-view", { view, priority })}>
      <ha-icon .icon=${priority === "urgent" ? "mdi:alert" : "mdi:alert-outline"}></ha-icon>${count}
    </button>`;
    return html`<div class="tile ${n && opts.cls ? opts.cls : ""}" title=${opts.cls === "hot" ? "Has updates you haven't seen" : nothing}>
      <button class="main" @click=${() => this._fire("go-view", { view, priority: "" })}>
        <span class="top"><ha-icon .icon=${icon}></ha-icon>${label}</span>
        <span class="n">${n}</span>
        ${opts.sub ? html`<span class="sub-n">${opts.sub}</span>` : nothing}
      </button>
      ${opts.flags ? html`<div class="flags">${flag("urgent", opts.flags.urgent)}${flag("high", opts.flags.high)}</div>` : nothing}
    </div>`;
  }

  /** The last seven days (today last): how many tickets were opened and how many completed each day. */
  private _activity(all: TicketSummary[]) {
    const day = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const today = day(new Date());
    const days = Array.from({ length: 7 }, (_, i) => today - (6 - i) * 86400000);
    const real = all.filter((t) => !t.labels.includes(HISTORY));
    const count = (key: "created_at" | "closed_at", d: number) =>
      real.filter((t) => t[key] && (key === "created_at" || t.status === "resolved" || t.status === "closed") && day(new Date(t[key]!)) === d).length;
    return days.map((d) => ({ d, opened: count("created_at", d), completed: count("closed_at", d) }));
  }

  private _chart(all: TicketSummary[]) {
    const data = this._activity(all);
    const max = Math.max(4, ...data.flatMap((x) => [x.opened, x.completed]));
    const W = 560, H = 180, top = 16, base = 150, colW = W / 7, bw = 18;
    const y = (v: number) => base - (v / max) * (base - top);
    const label = (d: number) => new Date(d).toLocaleDateString(this.language, { weekday: "short" });
    const total = data.reduce((a, x) => ({ o: a.o + x.opened, c: a.c + x.completed }), { o: 0, c: 0 });
    return html`<div class="card chart">
      <h2>Ticket Activity</h2>
      <p class="chart-sub">Last 7 days: ${total.o} opened, ${total.c} completed</p>
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label=${`Tickets opened and completed per day: ${data.map((x) => `${label(x.d)} ${x.opened} opened, ${x.completed} completed`).join("; ")}`}>
        ${svg`<line class="axis" x1="0" x2=${W} y1=${base} y2=${base}></line>`}
        ${data.map((x, i) => {
          const cx = colW * i + colW / 2;
          return svg`<g>
            <rect class="opened" x=${cx - bw - 2} y=${y(x.opened)} width=${bw} height=${base - y(x.opened)} rx="3"><title>${x.opened} opened</title></rect>
            <rect class="completed" x=${cx + 2} y=${y(x.completed)} width=${bw} height=${base - y(x.completed)} rx="3"><title>${x.completed} completed</title></rect>
            ${x.opened ? svg`<text class="val" x=${cx - bw / 2 - 2} y=${y(x.opened) - 4} text-anchor="middle">${x.opened}</text>` : nothing}
            ${x.completed ? svg`<text class="val" x=${cx + bw / 2 + 2} y=${y(x.completed) - 4} text-anchor="middle">${x.completed}</text>` : nothing}
            <text class="day" x=${cx} y=${base + 20} text-anchor="middle">${label(x.d)}</text>
          </g>`;
        })}
      </svg>
      <div class="legend"><span><i class="opened"></i>Opened</span><span><i class="completed"></i>Completed</span></div>
    </div>`;
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
    const view = (id: string) => all.filter(VIEWS.find((v) => v.id === id)!.match);
    const now = Date.now();
    const inbox = view("inbox").sort((a, b) => b.created_at.localeCompare(a.created_at));
    // Blue, as in the tab bar, while a tab has tickets with updates you haven't seen.
    const unread = (list: TicketSummary[]) => (list.some((t) => t.unread) ? "hot" : "");
    const flags = (list: TicketSummary[]) => ({
      urgent: list.filter((t) => t.priority === "urgent").length,
      high: list.filter((t) => t.priority === "high").length,
    });
    const completed = all.filter(
      (t) => (t.status === "resolved" || t.status === "closed") && t.closed_at && now - new Date(t.closed_at).getTime() < WEEK_MS && !t.labels.includes(HISTORY),
    ).length;
    return html`<div class="page">
      <h1>${this._greeting()}</h1>
      <p class="lead">${inbox.length ? `${inbox.length} new ${inbox.length === 1 ? "ticket is" : "tickets are"} waiting in your inbox.` : "Your inbox is empty."}</p>

      <div class="tiles">
        ${this._tile("mdi:inbox-outline", "Inbox", inbox.length, "inbox", { cls: unread(inbox), flags: flags(inbox) })}
        ${this._tile("mdi:progress-wrench", "Working", view("working").length, "working", { cls: unread(view("working")), flags: flags(view("working")) })}
        ${this._tile("mdi:star-four-points-outline", "Queued for AI", view("queued").length, "queued", { cls: unread(view("queued")) })}
        ${this._tile("mdi:check-circle-outline", "Completed", completed, "completed", { sub: "in the last 7 days" })}
      </div>

      <div class="cols">
        ${this.compact ? this._card("Inbox", inbox, "Nothing new. All clear.") : nothing}
        ${this._chart(all)}
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "st-home-page": HomePage;
  }
}
