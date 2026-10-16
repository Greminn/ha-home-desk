import { LitElement, html, css, nothing } from "lit";
import { property } from "lit/decorators.js";
import { safeCustomElement } from "../define";
import { sharedStyles } from "../styles";
import type { Tag, TicketSummary } from "../types";
import { TYPE_ICON, TYPE_LABEL, relativeTime, tagOrUnknown } from "../format";
import { tagChip } from "./tag-chip";

const MAX_CHIPS = 3;

/** The inbox list: one row per ticket, selected row highlighted. */
@safeCustomElement("st-ticket-list")
export class TicketList extends LitElement {
  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        overflow-y: auto;
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
      .status.s-waiting {
        background: color-mix(in srgb, var(--st-warning) 24%, transparent);
      }
      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        margin-top: 6px;
      }
      .more-tags {
        font-size: var(--st-fs-caption);
        color: var(--st-fg-secondary);
        line-height: 24px;
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
  @property({ attribute: false }) tagMap: Map<string, Tag> = new Map();

  private _select(id: number) {
    this.dispatchEvent(
      new CustomEvent("select-ticket", { detail: id, bubbles: true, composed: true }),
    );
  }

  /** A ticket's tags with the built-in default last: it's on nearly everything, so it shouldn't crowd out the rest. */
  private _chips(t: TicketSummary): Tag[] {
    const tags = t.tags.map((id) => tagOrUnknown(this.tagMap, id));
    return [...tags.filter((x) => !x.builtin), ...tags.filter((x) => x.builtin)];
  }

  override render() {
    if (!this.tickets.length) {
      return html`<div class="empty">No tickets here.</div>`;
    }
    return html`${this.tickets.map((t) => {
      const done = t.status === "resolved" || t.status === "closed";
      return html`
        <button
          class="row priority-${t.priority} ${done ? "done" : ""} ${t.id === this.selectedId ? "selected" : ""}"
          @click=${() => this._select(t.id)}
        >
          <ha-icon class="type" .icon=${TYPE_ICON[t.type]} title=${TYPE_LABEL[t.type]}></ha-icon>
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
            ${t.tags.length
              ? html`<div class="chips">
                  ${this._chips(t).slice(0, MAX_CHIPS).map(tagChip)}
                  ${t.tags.length > MAX_CHIPS ? html`<span class="more-tags">+${t.tags.length - MAX_CHIPS}</span>` : nothing}
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
