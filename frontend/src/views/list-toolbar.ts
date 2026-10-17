import { LitElement, html, css, nothing } from "lit";
import { property } from "lit/decorators.js";
import { safeCustomElement } from "../define";
import "./dropdown";
import { sharedStyles } from "../styles";
import {
  SCOPES_OPTIONS, agentOptions, categoryOptions, filterCount, labelOptions, personOptions, priorityOptions,
  type ListFilters,
} from "../list-model";
import type { Category, Label, TicketSummary } from "../types";

/**
 * The bar above the ticket list, laid out like Home Assistant's data-table toolbar: the New Ticket button, the search
 * box and the filter button, with the filter dropdowns below when open. It only reports what was asked for
 * (search text, a changed filter, a new ticket); the panel decides what the list shows.
 */
@safeCustomElement("st-list-toolbar")
export class ListToolbar extends LitElement {
  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        flex: none;
      }
      .toolbar {
        flex: none;
        display: flex;
        align-items: center;
        gap: var(--ha-space-4, 16px);
        height: 56px;
        padding: 0 16px;
        box-sizing: border-box;
        background: var(--st-bg);
        border-bottom: 1px solid var(--st-divider);
      }
      .toolbar.joined {
        border-bottom: none;
      }
      .search {
        flex: 1;
        min-width: 0;
        position: relative;
        display: flex;
        align-items: center;
      }
      .search ha-icon {
        position: absolute;
        left: 8px;
        --mdc-icon-size: 18px;
        color: var(--ha-color-text-secondary, var(--st-fg-secondary));
        pointer-events: none;
      }
      /* ha-input-search, outlined: 40px / 8px corners, and on wide screens 32px / 10px. */
      .search input[type="search"] {
        width: 100%;
        height: 40px;
        padding: 0 8px 0 34px;
        border: 1px solid var(--st-field-outline);
        border-radius: var(--ha-border-radius-md, 8px);
        background: var(--card-background-color, var(--st-surface));
        font-size: var(--st-fs-body);
        transition: border-color 250ms ease-in-out;
      }
      @media (min-width: 871px) {
        .search input[type="search"] {
          height: var(--st-h-bar);
          border-radius: var(--st-r-bar);
        }
      }
      .search input[type="search"]::placeholder {
        color: var(--ha-color-neutral-60, var(--st-fg-secondary));
        opacity: 1;
      }
      .search input[type="search"]:hover {
        border-color: var(--st-field-outline-hover);
      }
      .search input[type="search"]:focus {
        outline: none;
        border-color: var(--st-accent);
      }
      .toolbar .filter-btn {
        position: relative;
        flex: none;
        width: var(--st-h-bar);
        height: var(--st-h-bar);
        padding: 0;
        justify-content: center;
        border: 1px solid var(--st-outline);
        border-radius: var(--st-r-pill);
        background: transparent;
        color: var(--st-fg-secondary);
      }
      .toolbar .filter-btn ha-icon {
        --mdc-icon-size: 20px;
      }
      .toolbar .filter-btn.on {
        color: var(--st-accent);
        border-color: var(--st-accent);
        background: color-mix(in srgb, var(--st-accent) 14%, var(--st-surface));
      }
      .toolbar .filter-btn .dot {
        position: absolute;
        top: 4px;
        right: 4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--st-accent);
      }
      .filters {
        flex: none;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        padding: 0 16px 12px;
        background: var(--st-bg);
        border-bottom: 1px solid var(--st-divider);
      }
      .filters st-dropdown {
        flex: 1 1 120px;
      }
      /*
       * New Ticket sits at the left of the toolbar as a round "+". Pointing at it opens it out to the right
       * over the search box, with the words, so the search doesn't move.
       */
      .toolbar .add-slot {
        position: relative;
        flex: none;
        width: var(--st-h-bar);
        height: var(--st-h-bar);
      }
      .toolbar .add-btn {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 3;
        box-sizing: border-box;
        width: max-content;
        min-width: var(--st-h-bar);
        height: var(--st-h-bar);
        padding: 0 5px;
        gap: 0;
        justify-content: flex-start;
        border: 1px solid var(--st-accent);
        border-radius: var(--st-r-pill);
        background: var(--st-accent);
        color: var(--text-primary-color, #fff);
        white-space: nowrap;
        font-size: var(--st-fs-body);
        font-weight: var(--ha-font-weight-medium, 500);
        transition: padding-right 200ms ease-in-out;
      }
      .toolbar .add-btn .words {
        max-width: 0;
        overflow: hidden;
        opacity: 0;
        transition:
          max-width 200ms ease-in-out,
          margin-left 200ms ease-in-out,
          opacity 150ms ease-in-out;
      }
      .toolbar .add-btn:hover,
      .toolbar .add-btn:focus-visible {
        padding-right: 12px;
        box-shadow: var(--st-shadow-m);
      }
      .toolbar .add-btn:hover .words,
      .toolbar .add-btn:focus-visible .words {
        max-width: 100px;
        margin-left: 4px;
        opacity: 1;
      }
      .toolbar .add-btn ha-icon {
        --mdc-icon-size: 20px;
      }
      @media (prefers-reduced-motion: reduce) {
        .toolbar .add-btn,
        .toolbar .add-btn .words {
          transition: none;
        }
      }
    `,
  ];

  @property() q = "";
  @property({ attribute: false }) filters!: ListFilters;
  @property({ type: Boolean }) open = false;
  @property({ attribute: false }) tickets: TicketSummary[] = [];
  @property({ attribute: false }) categories: Category[] = [];
  @property({ attribute: false }) labels: Label[] = [];

  private _fire(name: string, detail?: unknown) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  private _change(key: keyof ListFilters) {
    return (e: CustomEvent<string>) => this._fire("filters-change", { [key]: e.detail });
  }

  override render() {
    const f = this.filters;
    const count = filterCount(f);
    return html`
      <div class="toolbar ${this.open ? "joined" : ""}">
        <span class="add-slot">
          <button class="icon add-btn" title="New Ticket" aria-label="New Ticket" @click=${() => this._fire("new-ticket")}>
            <ha-icon icon="mdi:plus"></ha-icon><span class="words">New Ticket</span>
          </button>
        </span>
        <div class="search">
          <ha-icon icon="mdi:magnify"></ha-icon>
          <input type="search" placeholder="Search tickets" aria-label="Search tickets" .value=${this.q}
            @input=${(e: Event) => this._fire("search", (e.target as HTMLInputElement).value)} />
        </div>
        <button class="icon filter-btn ${count ? "on" : ""}" title="Filters" aria-label="Filters" aria-expanded=${this.open}
          @click=${() => this._fire("toggle-filters")}>
          <ha-icon icon="mdi:filter-variant"></ha-icon>${count ? html`<span class="dot"></span>` : nothing}
        </button>
      </div>
      ${this.open
        ? html`<div class="filters">
            ${f.view === "all"
              ? html`<st-dropdown label="Show" .options=${SCOPES_OPTIONS} .value=${f.scope} @change=${this._change("scope")}></st-dropdown>`
              : nothing}
            <st-dropdown label="Category" placeholder="Category" .options=${categoryOptions(this.categories)} .value=${f.category}
              @change=${this._change("category")}></st-dropdown>
            <st-dropdown label="Raised By" placeholder="Raised By" .options=${personOptions(this.tickets, f.person)} .value=${f.person}
              @change=${this._change("person")}></st-dropdown>
            <st-dropdown label="AI Agent" placeholder="AI Agent" .options=${agentOptions()} .value=${f.agent}
              @change=${this._change("agent")}></st-dropdown>
            <st-dropdown label="Priority" placeholder="Priority" .options=${priorityOptions()} .value=${f.priority}
              @change=${this._change("priority")}></st-dropdown>
            <st-dropdown label="Label" placeholder="Label" .options=${labelOptions(this.labels)} .value=${f.label}
              @change=${this._change("label")}></st-dropdown>
          </div>`
        : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "st-list-toolbar": ListToolbar;
  }
}
