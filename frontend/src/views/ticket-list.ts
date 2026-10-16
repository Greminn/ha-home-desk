import { LitElement, html, css, nothing } from "lit";
import { property } from "lit/decorators.js";
import { safeCustomElement } from "../define";
import "./ticket-tags";
import { sharedStyles } from "../styles";
import { BLOCKED } from "../types";
import type { Category, Label, Status, TicketSummary } from "../types";
import {
  PRIORITY_LABEL,
  STATE_ICON,
  STATUS_LABEL,
  actorName,
  isAgent,
  metaIcon,
  labelColorCss,
  labelOrUnknown,
  labelTextColor,
  relativeTime,
} from "../format";

/** The ticket list: a row per ticket (state icon, title, who and when, then its category). */
@safeCustomElement("st-ticket-list")
export class TicketList extends LitElement {
  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        overflow-y: auto;
        overflow-x: hidden;
      }
      .row {
        display: grid;
        /* State icon (4px in), the text, then the priority icon: 18px from the state icon to the text, 14px from the text to the priority icon, and 20px from both edges. */
        grid-template-columns: 32px minmax(0, 1fr) 16px;
        gap: 14px;
        width: 100%;
        height: auto;
        padding: 12px 20px 12px 16px;
        border-radius: 0;
        border-bottom: 1px solid var(--st-divider);
        text-align: left;
        color: var(--st-fg);
        font-weight: 400;
        align-items: start;
        position: relative;
      }
      .row:hover:not(.selected) {
        background: var(--st-hover);
      }
      .row.selected {
        background: var(--st-selected, var(--st-hover));
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
      /* State colours: open is green, in progress blue, resolved purple, closed grey. */
      .state {
        --mdc-icon-size: 24px;
        /* Its centre lines up with the centre of the New Ticket button above (32px in). */
        margin: -1px 0 0 4px;
        color: var(--st-fg-secondary);
      }
      .s-new .state {
        color: var(--success-color, var(--st-success));
      }
      .s-in_progress .state,
      .s-open .state {
        color: var(--st-accent);
      }
      .s-resolved .state {
        color: var(--purple-color, #926bc7);
      }
      .body {
        min-width: 0;
      }
      .title {
        font-size: var(--st-fs-row);
        line-height: 22px;
        overflow-wrap: anywhere;
      }
      .done .title {
        color: var(--st-fg-secondary);
      }
      /*
       * The category sits where the labels used to: what part of the home this ticket is about.
       * An outlined pill, so it reads as a different kind of thing from the filled label pills.
       */
      /* The category pill and, to its right, the ticket's labels as small round icon badges. */
      .meta2 {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 8px;
      }
      .meta {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 2px 10px;
        margin-top: 4px;
        font-size: var(--st-fs-caption);
        color: var(--st-fg-secondary);
      }
      .meta ha-icon {
        --mdc-icon-size: 14px;
        vertical-align: -2px;
      }
      .who {
        cursor: pointer;
        border-radius: 4px;
      }
      .who:hover,
      .who:focus-visible {
        color: var(--st-fg);
        text-decoration: underline;
        outline: none;
      }
      /* Blocked is the one label that says nothing can happen until something outside changes, so it is spelled out. */
      .meta .blocked {
        color: var(--st-warning);
        font-weight: 500;
      }
      .ref {
        font-variant-numeric: tabular-nums;
      }
      /*
       * Priority is a small warning icon in a fixed column at the right of every row, so it always lines up.
       * Only urgent (a red filled triangle) and high (an amber outlined one) show one: normal and low are the
       * quiet default.
       */
      .prio {
        --mdc-icon-size: 16px;
        margin-top: 2px;
      }
      .prio.urgent {
        color: var(--st-danger);
      }
      .prio.high {
        color: var(--st-warning);
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
  /** Admins sort tickets into categories; others just see the category if there is one. */
  @property({ type: Boolean }) isAdmin = false;
  @property({ attribute: false }) categoryMap: Map<string, Category> = new Map();
  @property({ attribute: false }) labelMap: Map<string, Label> = new Map();

  private _select(id: number) {
    this.dispatchEvent(
      new CustomEvent("select-ticket", { detail: id, bubbles: true, composed: true }),
    );
  }

  /** Clicking a requester's name narrows the list to their tickets, not opens the ticket. */
  private _filterPerson(e: Event, name: string) {
    e.stopPropagation();
    e.preventDefault();
    this.dispatchEvent(new CustomEvent("filter-person", { detail: name, bubbles: true, composed: true }));
  }

  override render() {
    if (!this.tickets.length) {
      return html`<div class="empty">No tickets here.</div>`;
    }
    return html`${this.tickets.map((t) => {
      const done = t.status === "resolved" || t.status === "closed";
      return html`
        <button
          class="row s-${t.status} ${done ? "done" : ""} ${t.id === this.selectedId ? "selected" : ""}"
          @click=${() => this._select(t.id)}
        >
          <ha-icon class="state" .icon=${STATE_ICON[t.status]} role="img" aria-label=${STATUS_LABEL[t.status]}></ha-icon>
          <div class="body">
            <div class="title">${t.title}</div>
            <div class="meta">
              <span class="ref">Opened ${relativeTime(t.created_at, this.language)} by <span class="who" role="button" tabindex="0" aria-label="Show tickets from ${actorName(t.requester)}"
                @click=${(e: Event) => this._filterPerson(e, t.requester)}
                @keydown=${(e: KeyboardEvent) => (e.key === "Enter" || e.key === " ") && this._filterPerson(e, t.requester)}><ha-icon icon=${metaIcon(t.requester)}></ha-icon> ${actorName(t.requester)}</span></span>
              ${t.assignee && isAgent(t.assignee)
                ? html`<span><ha-icon icon=${metaIcon(t.assignee)}></ha-icon> With AI Agent</span>`
                : nothing}
              ${t.labels.includes(BLOCKED) ? html`<span class="blocked" title="Waiting on a person, a part or a fix"><ha-icon icon="mdi:timer-sand"></ha-icon> Blocked</span>` : nothing}
              ${t.comment_count
                ? html`<span><ha-icon icon="mdi:comment-outline"></ha-icon> ${t.comment_count}</span>`
                : nothing}
            </div>
            <div class="meta2"><st-ticket-tags .ticket=${t} .categoryMap=${this.categoryMap} .labelMap=${this.labelMap} .isAdmin=${this.isAdmin}></st-ticket-tags></div>
          </div>
          ${t.priority === "urgent" || t.priority === "high"
            ? html`<ha-icon class="prio ${t.priority}" .icon=${t.priority === "urgent" ? "mdi:alert" : "mdi:alert-outline"}
                role="img" aria-label="${PRIORITY_LABEL[t.priority]} priority"></ha-icon>`
            : html`<span></span>`}
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
