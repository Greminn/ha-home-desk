import { LitElement, html, css, nothing } from "lit";
import { property } from "lit/decorators.js";
import { safeCustomElement } from "../define";
import "./dropdown";
import { sharedStyles } from "../styles";
import {
  SCOPES_OPTIONS, categoryOptions, labelOptions, personOptions, priorityOptions,
  type ListFilters,
} from "../list-model";
import type { Category, Label, TicketSummary } from "../types";

/**
 * The bar at the top of the ticket list: Select Tickets and the filters, always showing (and the actions for the
 * ticked tickets in their place). It only reports what was asked for; the panel decides what the list shows.
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
        gap: 8px;
        min-height: 48px;
        padding: 8px 16px;
        box-sizing: border-box;
        background: var(--st-bg);
        border-bottom: 1px solid var(--st-divider);
      }
      .toolbar.selbar {
        gap: var(--ha-space-4, 16px);
        height: 48px;
        padding: 0 16px;
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
      /* The X sits where the Select Tickets button was, so both line up with the row checkboxes below. */
      .selbar .clear {
        width: var(--st-h-bar);
        height: var(--st-h-bar);
      }
      .selbar .count {
        flex: 1;
        font-size: var(--st-fs-body);
        font-weight: 500;
      }
      .selbar .merge {
        flex: none;
        height: var(--st-h-bar);
        padding: 0 16px;
        gap: 8px;
        border-radius: var(--st-r-pill);
      }
      .selbar .merge[disabled] {
        opacity: 0.5;
        cursor: default;
      }
      .filters {
        flex: 1;
        min-width: 0;
        display: flex;
        gap: 8px;
      }
      /* One line, however many there are: they share the width and shorten their words (with an ellipsis) when it is tight. */
      .filters st-dropdown {
        flex: 1 1 0;
        min-width: 0;
      }
    `,
  ];

  @property({ attribute: false }) filters!: ListFilters;
  @property({ attribute: false }) tickets: TicketSummary[] = [];
  @property({ attribute: false }) categories: Category[] = [];
  @property({ attribute: false }) labels: Label[] = [];
  /** Admins can tick tickets to act on several at once. */
  @property({ type: Boolean }) selectable = false;
  /** Checkboxes are showing (the Select button is on). */
  @property({ type: Boolean }) selecting = false;
  @property({ type: Number }) checkedCount = 0;

  private _fire(name: string, detail?: unknown) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  private _change(key: keyof ListFilters) {
    return (e: CustomEvent<string>) => this._fire("filters-change", { [key]: e.detail });
  }

  private _merge(e: Event) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    this._fire("merge-selected", { rect });
  }

  override render() {
    const f = this.filters;
    if (this.checkedCount) {
      return html`<div class="toolbar selbar">
        <button class="icon clear" title="Clear selection" aria-label="Clear selection" @click=${() => this._fire("clear-selection")}>
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
        <span class="count">${this.checkedCount} selected</span>
        <button class="icon" title="Mark as read" aria-label="Mark as read" @click=${() => this._fire("mark-read-selected")}>
          <ha-icon icon="mdi:email-open-outline"></ha-icon>
        </button>
        <button class="icon" title="Select all" aria-label="Select all" @click=${() => this._fire("select-all")}>
          <ha-icon icon="mdi:select-all"></ha-icon>
        </button>
        <button class="merge" ?disabled=${this.checkedCount < 2} title=${this.checkedCount < 2 ? "Select at least two tickets" : "Merge selected tickets"}
          @click=${(e: Event) => this.checkedCount >= 2 && this._merge(e)}>
          <ha-icon icon="mdi:call-merge"></ha-icon> Merge
        </button>
      </div>`;
    }
    return html`
      <div class="toolbar">
        ${this.selectable
          ? html`<button class="icon filter-btn ${this.selecting ? "on" : ""}" title="Select Tickets" aria-label="Select Tickets" aria-pressed=${this.selecting}
              @click=${() => this._fire("toggle-select")}>
              <ha-icon icon="mdi:checkbox-multiple-marked-outline"></ha-icon>
            </button>`
          : nothing}
        <div class="filters">
          ${f.view === "completed"
            ? html`<st-dropdown label="Show" .options=${SCOPES_OPTIONS} .value=${f.scope} @change=${this._change("scope")}></st-dropdown>`
            : nothing}
          <st-dropdown label="Category" placeholder="Category" .options=${categoryOptions(this.categories)} .value=${f.category}
            @change=${this._change("category")}></st-dropdown>
          ${f.person
            ? html`<st-dropdown label="Raised By" placeholder="Raised By" .options=${personOptions(this.tickets, f.person)} .value=${f.person}
                @change=${this._change("person")}></st-dropdown>`
            : nothing}
          <st-dropdown label="Priority" placeholder="Priority" .options=${priorityOptions()} .value=${f.priority}
            @change=${this._change("priority")}></st-dropdown>
          <st-dropdown label="Label" placeholder="Label" .options=${labelOptions(this.labels)} .value=${f.label}
            @change=${this._change("label")}></st-dropdown>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "st-list-toolbar": ListToolbar;
  }
}
