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
  activityVerb,
  actorLabel,
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
      /* Unread: a dot in the left margin, a bolder title, and what changed in the accent colour. */
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
        font-weight: 600;
      }
      /* The AI Agent is working on it: a sparkle that pulses. */
      .meta .working {
        color: var(--st-accent);
        font-weight: 500;
      }
      .meta .working ha-icon {
        animation: working 1.4s ease-in-out infinite;
      }
      @keyframes working {
        50% {
          opacity: 0.3;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .meta .working ha-icon {
          animation: none;
        }
      }
      .meta .activity {
        color: var(--st-accent);
        font-weight: 500;
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
      /* Admins: the state icon turns into a checkbox on hover, and always while ticking tickets. */
      .lead {
        position: relative;
        width: 32px;
        height: 24px;
        margin: -1px 0 0 4px;
        padding: 0;
        border: none;
        background: none;
        cursor: inherit;
        color: inherit;
      }
      .lead .state,
      .lead .box {
        position: absolute;
        left: 0;
        top: 0;
        margin: 0;
      }
      .lead .box {
        --mdc-icon-size: 24px;
        display: none;
        color: var(--st-fg-secondary);
      }
      .lead.on .box {
        color: var(--st-accent);
      }
      .ticking .lead .state,
      .row:hover .lead .state,
      .lead.on .state {
        display: none;
      }
      .ticking .lead .box,
      .row:hover .lead .box,
      .lead.on .box {
        display: block;
      }
      .row.checked {
        background: color-mix(in srgb, var(--st-accent) 12%, transparent);
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
      .meta > span {
        display: inline-flex;
        align-items: center;
        gap: 3px;
      }
      .meta ha-icon {
        --mdc-icon-size: 14px;
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
  /** Ids of the ticked tickets, and whether checkboxes show on every row. */
  @property({ attribute: false }) checked: Set<number> = new Set();
  @property({ type: Boolean }) ticking = false;
  private _pressTimer: number | undefined;
  private _pressed = false;

  private _toggle(id: number, range = false) {
    this.dispatchEvent(new CustomEvent("toggle-check", { detail: { id, range }, bubbles: true, composed: true }));
  }

  /** A long press on a row starts ticking on a touch screen. */
  private _pressStart(id: number) {
    if (!this.isAdmin) return;
    this._pressed = false;
    window.clearTimeout(this._pressTimer);
    this._pressTimer = window.setTimeout(() => {
      this._pressed = true;
      this._toggle(id);
    }, 500);
  }

  private _pressEnd() {
    window.clearTimeout(this._pressTimer);
  }

  private _rowClick(id: number, e: MouseEvent) {
    if (this._pressed) {
      this._pressed = false;
      return;
    }
    if (this.isAdmin && (this.ticking || e.shiftKey || e.ctrlKey || e.metaKey)) this._toggle(id, e.shiftKey);
    else this._select(id);
  }

  /** Keep the open ticket in view when it changes (Previous and Next can move it off screen). */
  override updated(changed: Map<string, unknown>) {
    if (changed.has("selectedId")) this.renderRoot.querySelector(".row.selected")?.scrollIntoView({ block: "nearest" });
  }

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
          class="row s-${t.status} ${done ? "done" : ""} ${t.id === this.selectedId ? "selected" : ""} ${this.checked.has(t.id) ? "checked" : ""} ${this.ticking ? "ticking" : ""} ${t.unread ? "unread" : ""}"
          @click=${(e: MouseEvent) => this._rowClick(t.id, e)}
          @pointerdown=${(e: PointerEvent) => e.pointerType === "touch" && this._pressStart(t.id)}
          @pointerup=${() => this._pressEnd()}
          @pointercancel=${() => this._pressEnd()}
          @pointermove=${() => this._pressEnd()}
        >
          ${this.isAdmin
            ? html`<span class="lead ${this.checked.has(t.id) ? "on" : ""}" role="checkbox" aria-checked=${this.checked.has(t.id)} aria-label="Select #${t.id}"
                @click=${(e: MouseEvent) => {
                  e.stopPropagation();
                  this._toggle(t.id, e.shiftKey);
                }}>
                <ha-icon class="state" .icon=${STATE_ICON[t.status]} aria-label=${STATUS_LABEL[t.status]}></ha-icon>
                <ha-icon class="box" .icon=${this.checked.has(t.id) ? "mdi:checkbox-marked" : "mdi:checkbox-blank-outline"}></ha-icon>
              </span>`
            : html`<ha-icon class="state" .icon=${STATE_ICON[t.status]} role="img" aria-label=${STATUS_LABEL[t.status]}></ha-icon>`}
          <div class="body">
            <div class="title">${t.title}</div>
            <div class="meta">
              <span class="ref">Opened ${relativeTime(t.created_at, this.language)} by <span class="who" role="button" tabindex="0" aria-label="Show tickets from ${actorName(t.requester)}"
                @click=${(e: Event) => this._filterPerson(e, t.requester)}
                @keydown=${(e: KeyboardEvent) => (e.key === "Enter" || e.key === " ") && this._filterPerson(e, t.requester)}><ha-icon icon=${metaIcon(t.requester)}></ha-icon> ${actorName(t.requester)}</span></span>
              ${t.agent_state
                ? html`<span class="working"><ha-icon icon="mdi:star-four-points"></ha-icon> ${actorLabel(`ai:${t.agent_state.agent}`)} working…</span>`
                : nothing}
              ${t.unread && t.activity && t.activity.kind !== "created"
                ? html`<span class="activity"><ha-icon icon=${metaIcon(t.activity.actor)}></ha-icon> ${actorName(t.activity.actor)} ${activityVerb(t.activity.kind)} ${relativeTime(t.activity.at, this.language)}</span>`
                : t.updated_by
                  ? html`<span>Updated ${relativeTime(t.updated_at, this.language)} by <ha-icon icon=${metaIcon(t.updated_by)}></ha-icon> ${actorName(t.updated_by)}</span>`
                  : nothing}
              ${t.assignee && isAgent(t.assignee)
                ? html`<span><ha-icon icon=${metaIcon(t.assignee)}></ha-icon> With AI Agent</span>`
                : nothing}
              ${t.labels.includes(BLOCKED) ? html`<span class="blocked" title="Waiting on a person, a part or a fix"><ha-icon icon="mdi:timer-sand"></ha-icon> Blocked</span>` : nothing}
              ${t.comment_count
                ? html`<span><ha-icon icon="mdi:comment-outline"></ha-icon> ${t.comment_count}</span>`
                : nothing}
              ${t.attachment_count
                ? html`<span title="Photos and voice messages"><ha-icon icon="mdi:paperclip"></ha-icon> ${t.attachment_count}</span>`
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
