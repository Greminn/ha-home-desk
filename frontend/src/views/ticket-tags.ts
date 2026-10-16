import { LitElement, html, css, nothing } from "lit";
import { property } from "lit/decorators.js";
import { safeCustomElement } from "../define";
import { sharedStyles } from "../styles";
import type { Category, Label, TicketSummary } from "../types";
import { labelColorCss, labelOrUnknown, labelTextColor } from "../format";

/**
 * A ticket's category pill and its labels as small round badges (grey until you point at one, then it
 * expands to show its name, with a small x for admins). Used in the list rows and in the ticket header.
 * Anything placed inside the element (e.g. an "add label" button) is shown after the badges.
 */
@safeCustomElement("st-ticket-tags")
export class TicketTags extends LitElement {
  static override styles = [
    sharedStyles,
    css`
      :host {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 6px;
      }
      .badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        min-width: 24px;
        height: 24px;
        padding: 0 4px; /* 4 + 14 + 4 + the 1px borders: a 24px circle until it expands */
        border-radius: 12px;
        border: 1px solid var(--st-outline);
        white-space: nowrap;
        /* Quiet grey until you point at one, then its own colour, so a long list isn't a wall of colour. */
        background: color-mix(in srgb, var(--st-fg) 12%, transparent);
        color: var(--st-fg-secondary);
        transition:
          background-color 150ms ease-in-out,
          color 150ms ease-in-out,
          border-color 150ms ease-in-out;
      }
      /* In the ticket header the badges are in their own colour all the time. */
      :host([coloured]) .badge {
        background: var(--label-color);
        color: var(--label-fg);
        border-color: transparent;
        /* Muted until you point at one, so they don't compete with the title. */
        opacity: 0.75;
        transition:
          opacity 150ms ease-in-out,
          background-color 150ms ease-in-out,
          color 150ms ease-in-out,
          border-color 150ms ease-in-out;
      }
      :host([coloured]) .badge:hover,
      :host([coloured]) .badge:focus-within {
        opacity: 1;
      }
      /* In the ticket header every badge is open: its name, and the x for admins. */
      :host([expanded]) .badge {
        padding-right: 10px;
      }
      :host([expanded]) .badge .name {
        max-width: 160px;
        margin-left: 6px;
        opacity: 1;
      }
      :host([expanded]) .badge .x {
        max-width: 18px;
        margin-left: 4px;
        margin-right: -6px;
        opacity: 1;
      }
      /* Keyboard focus opens a badge the way pointing at it does. */
      .badge:focus-within {
        padding-right: 10px;
        background: var(--label-color);
        color: var(--label-fg);
      }
      .badge:focus-within .name {
        max-width: 160px;
        margin-left: 6px;
        opacity: 1;
      }
      .badge:focus-within .x {
        max-width: 18px;
        margin-left: 4px;
        margin-right: -6px;
        opacity: 1;
      }
      .badge:hover {
        padding-right: 10px;
        background: var(--label-color);
        color: var(--label-fg);
      }
      .badge ha-icon {
        --mdc-icon-size: 14px;
      }
      /* The label's name grows out to the right of the icon when you point at the badge. */
      .badge .name {
        max-width: 0;
        margin-left: 0;
        overflow: hidden;
        opacity: 0;
        font-size: var(--st-fs-caption);
        font-weight: var(--ha-font-weight-medium, 500);
        transition:
          max-width 200ms ease-in-out,
          margin-left 200ms ease-in-out,
          opacity 150ms ease-in-out;
      }
      .badge:hover .name {
        max-width: 160px;
        margin-left: 6px;
        opacity: 1;
      }
      /* A small x at the right end of an expanded badge removes the label from this ticket (after a confirmation). */
      .badge .x {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        max-width: 0;
        margin-left: 0;
        overflow: hidden;
        opacity: 0;
        border-radius: 50%;
        cursor: pointer;
        transition:
          max-width 200ms ease-in-out,
          margin-left 200ms ease-in-out,
          opacity 150ms ease-in-out;
      }
      .badge:hover .x {
        max-width: 18px;
        margin-left: 4px;
        margin-right: -6px;
        opacity: 1;
      }
      .badge .x:hover,
      .badge .x:focus-visible {
        background: color-mix(in srgb, var(--label-fg) 22%, transparent);
        outline: none;
      }
      .badge .x ha-icon {
        --mdc-icon-size: 14px;
      }
      @media (prefers-reduced-motion: reduce) {
        .badge .name,
        .badge .x {
          transition: none;
        }
      }
      .more-labels {
        font-size: var(--st-fs-caption);
        color: var(--st-fg-secondary);
      }
      .category {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        height: 24px;
        padding: 0 12px 0 8px;
        box-sizing: border-box;
        border: 1px solid var(--st-outline);
        border-radius: var(--st-r-pill);
        font-size: var(--st-fs-caption);
        font-weight: var(--ha-font-weight-medium, 500);
        /* Grey until you point at it, then it comes up to full contrast. */
        color: var(--st-fg-secondary);
        max-width: 100%;
        transition:
          color 150ms ease-in-out,
          border-color 150ms ease-in-out;
      }
      .category:hover {
        color: var(--st-fg);
        border-color: var(--st-field-outline-hover);
      }
      .category ha-icon {
        --mdc-icon-size: 16px;
        color: inherit;
      }
      .category.clickable {
        cursor: pointer;
      }
      /* Not sorted yet: a dashed outline that invites you to add one. */
      .category.none {
        border-style: dashed;
      }
    `,
  ];

  @property({ attribute: false }) ticket!: TicketSummary;
  @property({ attribute: false }) categoryMap: Map<string, Category> = new Map();
  @property({ attribute: false }) labelMap: Map<string, Label> = new Map();
  @property({ type: Boolean }) isAdmin = false;
  /** Labels shown as badges; past this many, the rest are counted. */
  @property({ type: Number }) maxBadges = 4;
  /** Badges keep their label colour at rest (the list keeps them grey until hover). */
  @property({ type: Boolean, reflect: true }) coloured = false;
  /** Badges stay open, showing their names (the ticket header), instead of only on hover. */
  @property({ type: Boolean, reflect: true }) expanded = false;
  /** Show only the category pill or only the labels (the ticket header places them separately); both by default. */
  @property() show: "all" | "category" | "labels" = "all";

  /** Clicking the pill (admins) asks the panel to open the category picker under it, not to open the ticket. */
  private _pickCategory(e: Event, t: TicketSummary) {
    e.stopPropagation();
    e.preventDefault();
    this.dispatchEvent(new CustomEvent("pick-category", {
      detail: { ticket: t, rect: (e.currentTarget as HTMLElement).getBoundingClientRect() },
      bubbles: true,
      composed: true,
    }));
  }

  /** The row's category pill: its icon and name, or "Add Category" while it hasn't been sorted. */
  private _category(t: TicketSummary) {
    const c = t.category ? this.categoryMap.get(t.category) : undefined;
    const press = {
      click: (e: Event) => this._pickCategory(e, t),
      key: (e: KeyboardEvent) => (e.key === "Enter" || e.key === " ") && this._pickCategory(e, t),
    };
    if (!c && !this.isAdmin) return nothing; // only someone who can sort tickets is invited to
    const inner = c
      ? html`<ha-icon .icon=${c.icon || "mdi:tag-outline"}></ha-icon>${c.name}`
      : html`<ha-icon icon="mdi:plus"></ha-icon>Add Category`;
    return this.isAdmin
      ? html`<span class="category clickable ${c ? "" : "none"}" role="button" tabindex="0" aria-haspopup="listbox"
          aria-label=${c ? `Category: ${c.name}. Change` : "Add Category"} @click=${press.click} @keydown=${press.key}>${inner}</span>`
      : html`<span class="category">${inner}</span>`;
  }

  /**
   * A ticket's labels as round badges: the label's icon (or a plain label icon) on its colour, with its name
   * on hover. The Home Assistant label is left out: it is on nearly every ticket, so it says nothing here.
   */
  /** The x on a badge: ask the panel to confirm removing this label from this ticket (not to open the ticket). */
  private _askRemove(e: Event, t: TicketSummary, label: Label) {
    e.stopPropagation();
    e.preventDefault();
    this.dispatchEvent(new CustomEvent("remove-label", { detail: { ticket: t, label }, bubbles: true, composed: true }));
  }

  private _badges(t: TicketSummary) {
    const labels = t.labels.filter((id) => id !== "home-assistant").map((id) => labelOrUnknown(this.labelMap, id));
    return html`${labels.slice(0, this.maxBadges).map(
      (l) => html`<span class="badge" role=${this.isAdmin ? "group" : "img"} aria-label=${l.name}
        style="--label-color: ${labelColorCss(l.color)}; --label-fg: ${labelTextColor(l.color)}"><ha-icon .icon=${l.icon || "mdi:label-outline"}></ha-icon><span class="name">${l.name}</span>${this.isAdmin
          ? html`<span class="x" role="button" tabindex="0" aria-label="Remove ${l.name} from this ticket"
              @click=${(e: Event) => this._askRemove(e, t, l)}
              @keydown=${(e: KeyboardEvent) => (e.key === "Enter" || e.key === " ") && this._askRemove(e, t, l)}><ha-icon icon="mdi:close"></ha-icon></span>`
          : nothing}</span>`,
    )}${labels.length > this.maxBadges ? html`<span class="more-labels">+${labels.length - this.maxBadges}</span>` : nothing}`;
  }


  override render() {
    const t = this.ticket;
    return html`${this.show !== "labels" ? this._category(t) : nothing}${this.show !== "category" ? html`${this._badges(t)}<slot></slot>` : nothing}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "st-ticket-tags": TicketTags;
  }
}
