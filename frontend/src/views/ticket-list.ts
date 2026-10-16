import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { safeCustomElement } from "../define";
import { sharedStyles } from "../styles";
import type { Label, TicketSummary } from "../types";
import { PRIORITY_LABEL, STATUS_LABEL, kindIcon, kindName, relativeTime, labelOrUnknown } from "../format";
import { labelChip } from "./label-chip";

const MAX_CHIPS = 3;

type SortKey = "status" | "id" | "title" | "priority" | "updated";
const PRIORITY_RANK = { urgent: 0, high: 1, normal: 2, low: 3 } as const;
const STATUS_RANK = { new: 0, open: 1, in_progress: 2, resolved: 3, closed: 4 } as const;
const COLUMNS: { key: SortKey; label: string; cls: string }[] = [
  { key: "status", label: "Status", cls: "c-status" },
  { key: "id", label: "#", cls: "c-id" },
  { key: "title", label: "Title", cls: "c-title" },
  { key: "priority", label: "Priority", cls: "c-prio" },
  { key: "updated", label: "Updated", cls: "c-upd" },
];

/** A view's tickets: a sortable table on wide screens, one card row per ticket on narrow ones. */
@safeCustomElement("st-ticket-list")
export class TicketList extends LitElement {
  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        overflow: auto;
        /* Clearance so the floating "New ticket" button never covers the last row. */
        padding-bottom: 88px;
      }
      .row {
        display: grid;
        grid-template-columns: 24px minmax(0, 1fr);
        gap: 12px;
        width: 100%;
        height: auto;
        padding: 12px 16px;
        border-radius: 0;
        border-bottom: 1px solid var(--st-divider);
        text-align: left;
        color: var(--st-fg);
        font-weight: 400;
        align-items: start;
        position: relative;
      }
      .row.selected {
        background: color-mix(in srgb, var(--st-accent) 14%, transparent);
      }
      .row.selected::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        background: var(--st-accent);
      }
      .type {
        color: var(--st-fg-secondary);
        margin-top: 1px;
      }
      .priority-urgent .type {
        color: var(--st-danger);
      }
      .priority-high .type {
        color: var(--st-warning);
      }
      .body {
        min-width: 0;
      }
      .title {
        font-size: var(--st-fs-row);
        line-height: 1.35;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        overflow-wrap: anywhere;
      }
      .done .title {
        color: var(--st-fg-secondary);
      }
      .meta {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 4px 10px;
        margin-top: 4px;
        font-size: var(--st-fs-caption);
        color: var(--st-fg-secondary);
      }
      .meta ha-icon {
        --mdc-icon-size: 14px;
        vertical-align: -2px;
      }
      .ref {
        font-variant-numeric: tabular-nums;
      }
      .status {
        padding: 1px 8px;
        border-radius: 8px;
        background: color-mix(in srgb, var(--st-fg) 10%, transparent);
      }
      .status.s-new,
      .status.s-open {
        background: color-mix(in srgb, var(--st-accent) 20%, transparent);
        color: var(--st-accent);
      }
      .status.s-in_progress {
        background: color-mix(in srgb, var(--st-success) 22%, transparent);
        color: var(--st-success);
      }
      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        margin-top: 6px;
      }
      .more-labels {
        font-size: var(--st-fs-caption);
        color: var(--st-fg-secondary);
        line-height: 24px;
      }
      /* Table (wide screens). Same pattern as HA's own data tables: header row, hairline rows, hover. */
      .table {
        min-width: 720px;
      }
      .thead,
      .tr {
        display: grid;
        grid-template-columns: 112px 64px minmax(0, 1fr) minmax(140px, 300px) 100px 120px;
        align-items: center;
        gap: 0 12px;
        padding: 0 16px;
      }
      .thead {
        position: sticky;
        top: 0;
        z-index: 1;
        height: 48px;
        background: var(--st-surface);
        border-bottom: 1px solid var(--st-divider);
        font-size: var(--st-fs-small);
        font-weight: 500;
        color: var(--st-fg-secondary);
      }
      .thead button {
        height: 48px;
        padding: 0;
        gap: 4px;
        border-radius: 0;
        justify-content: flex-start;
        color: inherit;
        font-weight: 500;
        font-size: inherit;
      }
      .thead button.sorted {
        color: var(--st-fg);
      }
      .thead ha-icon {
        --mdc-icon-size: 16px;
      }
      .tr {
        width: 100%;
        min-height: 56px;
        height: auto;
        border-radius: 0;
        border-bottom: 1px solid var(--st-divider);
        text-align: left;
        color: var(--st-fg);
        font-weight: 400;
        font-size: var(--st-fs-body);
      }
      .tr .c-title {
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 0;
        padding: 10px 0;
      }
      .tr .c-title span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .tr.done .c-title span {
        color: var(--st-fg-secondary);
      }
      .tr .c-id {
        color: var(--st-fg-secondary);
        font-variant-numeric: tabular-nums;
      }
      .tr .c-upd {
        color: var(--st-fg-secondary);
      }
      .tr .chips {
        margin: 0;
        flex-wrap: nowrap;
        overflow: hidden;
      }
      .tr .prio-urgent {
        color: var(--st-danger);
      }
      .tr .prio-high {
        color: var(--st-warning);
      }
      .tr .prio-low {
        color: var(--st-fg-secondary);
      }
      .tr .status {
        display: inline-block;
        padding: 3px 10px;
        font-size: var(--st-fs-caption);
        font-weight: 500;
      }
      .empty {
        padding: 48px 24px;
        text-align: center;
        color: var(--st-fg-secondary);
        font-size: var(--st-fs-row);
      }
    `,
  ];

  @property({ attribute: false }) tickets: TicketSummary[] = [];
  @property({ type: Number }) selectedId: number | null = null;
  @property() language: string | undefined = undefined;
  @property({ attribute: false }) labelMap: Map<string, Label> = new Map();
  /** Narrow screens get cards instead of the table. */
  @property({ type: Boolean }) narrow = false;
  @state() private _sort: { key: SortKey; dir: 1 | -1 } | null = null;

  private _toggleSort(key: SortKey) {
    const cur = this._sort;
    // Click once to sort, again to reverse, a third time to go back to the default order.
    this._sort = !cur || cur.key !== key ? { key, dir: 1 } : cur.dir === 1 ? { key, dir: -1 } : null;
  }

  private get _sorted(): TicketSummary[] {
    const sort = this._sort;
    if (!sort) return this.tickets;
    const value = (t: TicketSummary): number | string => {
      switch (sort.key) {
        case "status": return STATUS_RANK[t.status];
        case "id": return t.id;
        case "title": return t.title.toLowerCase();
        case "priority": return PRIORITY_RANK[t.priority];
        case "updated": return -new Date(t.updated_at).getTime(); // ascending = newest first
      }
    };
    return [...this.tickets].sort((a, b) => {
      const x = value(a), y = value(b);
      return (x < y ? -1 : x > y ? 1 : 0) * sort.dir;
    });
  }

  private _select(id: number) {
    this.dispatchEvent(
      new CustomEvent("select-ticket", { detail: id, bubbles: true, composed: true }),
    );
  }

  /** A ticket's labels with the Home Assistant default last: it's on nearly everything, so it shouldn't crowd out the rest. */
  private _chips(t: TicketSummary): Label[] {
    const labels = t.labels.map((id) => labelOrUnknown(this.labelMap, id));
    return [...labels.filter((x) => x.id !== "home-assistant"), ...labels.filter((x) => x.id === "home-assistant")];
  }

  private _table() {
    const sort = this._sort;
    return html`<div class="table" role="table">
      <div class="thead" role="row">
        ${COLUMNS.slice(0, 3).map((c) => this._th(c.key, c.label, sort))}
        <span>Labels</span>
        ${COLUMNS.slice(3).map((c) => this._th(c.key, c.label, sort))}
      </div>
      ${this._sorted.map((t) => {
        const done = t.status === "resolved" || t.status === "closed";
        return html`<button class="tr ${done ? "done" : ""}" role="row" @click=${() => this._select(t.id)}>
          <span class="c-status"><span class="status s-${t.status}">${STATUS_LABEL[t.status]}</span></span>
          <span class="c-id">#${t.id}</span>
          <span class="c-title"><ha-icon class="type" .icon=${kindIcon(t.labels)} title=${kindName(t.labels)}></ha-icon><span>${t.title}</span></span>
          <span class="chips">${this._chips(t).slice(0, MAX_CHIPS).map(labelChip)}${t.labels.length > MAX_CHIPS ? html`<span class="more-labels">+${t.labels.length - MAX_CHIPS}</span>` : nothing}</span>
          <span class="prio-${t.priority}">${PRIORITY_LABEL[t.priority]}</span>
          <span class="c-upd">${relativeTime(t.updated_at, this.language)}</span>
        </button>`;
      })}
    </div>`;
  }

  private _th(key: SortKey, label: string, sort: { key: SortKey; dir: 1 | -1 } | null) {
    const on = sort?.key === key;
    return html`<button class=${on ? "sorted" : ""} @click=${() => this._toggleSort(key)} aria-label="Sort by ${label}">
      ${label}${on ? html`<ha-icon .icon=${sort!.dir === 1 ? "mdi:arrow-up" : "mdi:arrow-down"}></ha-icon>` : nothing}
    </button>`;
  }

  override render() {
    if (!this.tickets.length) {
      return html`<div class="empty">No tickets here.</div>`;
    }
    if (!this.narrow) return this._table();
    return html`${this.tickets.map((t) => {
      const done = t.status === "resolved" || t.status === "closed";
      return html`
        <button
          class="row priority-${t.priority} ${done ? "done" : ""} ${t.id === this.selectedId ? "selected" : ""}"
          @click=${() => this._select(t.id)}
        >
          <ha-icon class="type" .icon=${kindIcon(t.labels)} title=${kindName(t.labels)}></ha-icon>
          <div class="body">
            <div class="title">${t.title}</div>
            <div class="meta">
              <span class="ref">#${t.id}</span>
              <span class="status s-${t.status}">${t.status.replace("_", " ")}</span>
              ${t.priority === "urgent" || t.priority === "high"
                ? html`<span>${t.priority}</span>`
                : nothing}
              ${t.assignee
                ? html`<span><ha-icon icon="mdi:account-outline"></ha-icon> ${t.assignee}</span>`
                : nothing}
              ${t.comment_count
                ? html`<span><ha-icon icon="mdi:comment-outline"></ha-icon> ${t.comment_count}</span>`
                : nothing}
              <span>${relativeTime(t.updated_at, this.language)}</span>
            </div>
            ${t.labels.length
              ? html`<div class="chips">
                  ${this._chips(t).slice(0, MAX_CHIPS).map(labelChip)}
                  ${t.labels.length > MAX_CHIPS ? html`<span class="more-labels">+${t.labels.length - MAX_CHIPS}</span>` : nothing}
                </div>`
              : nothing}
          </div>
        </button>
      `;
    })}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "st-ticket-list": TicketList;
  }
}
