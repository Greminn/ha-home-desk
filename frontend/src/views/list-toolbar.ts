import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { safeCustomElement } from "../define";
import "./dropdown";
import { sharedStyles } from "../styles";
import {
  SCOPES_OPTIONS, categoryOptions, labelOptions, personOptions, priorityOptions, sortOptions, defaultSort, SORTS, VIEWS,
  type ListFilters, type SortDir,
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
        flex-wrap: wrap;
        gap: 8px;
      }
      /* They share the width, each wide enough to read, and wrap onto a second line when the list pane is narrow. */
      .filters st-dropdown {
        flex: 1 1 96px;
        min-width: 96px;
      }
      /* A pill as tall as the buttons beside it, filling the space between them. */
      .find {
        flex: 1;
        min-width: 0;
        display: flex;
        align-items: center;
        gap: 8px;
        /* The same shape as the top search box (Home Assistant's search field): 40px with 8px corners, the bar height and radius on a wide screen. */
        height: 40px;
        padding: 0 8px;
        box-sizing: border-box;
        border: 1px solid var(--st-field-outline);
        border-radius: var(--ha-border-radius-md, 8px);
        background: var(--card-background-color, var(--st-surface));
        color: var(--st-fg-secondary);
        transition: border-color 250ms ease-in-out;
      }
      @media (min-width: 871px) {
        .find {
          height: var(--st-h-bar);
          border-radius: var(--st-r-bar);
        }
      }
      .find:hover {
        border-color: var(--st-field-outline-hover);
      }
      .find:focus-within {
        border-color: var(--st-accent);
      }
      .find ha-icon {
        --mdc-icon-size: 18px;
        flex: none;
        color: var(--ha-color-text-secondary, var(--st-fg-secondary));
      }
      /* Plain, inside the pill: the shared filled-field look (grey box, underline) is switched off, hover included. */
      .find input[type="search"],
      .find input[type="search"]:hover {
        flex: 1;
        border-radius: 0;
        border-bottom: none;
        min-width: 0;
        height: 100%;
        padding: 0;
        border: none;
        outline: none;
        background: transparent;
        appearance: none;
        color: var(--st-fg);
        font: inherit;
        font-size: var(--st-fs-body);
      }
      .find input::placeholder {
        color: var(--ha-color-neutral-60, var(--st-fg-secondary));
        opacity: 1;
      }
      .filter-btn .badge {
        position: absolute;
        top: -4px;
        right: -4px;
        min-width: 16px;
        height: 16px;
        padding: 0 4px;
        box-sizing: border-box;
        border-radius: 8px;
        background: var(--st-accent);
        color: var(--st-on-accent, #fff);
        font-size: 11px;
        line-height: 16px;
        text-align: center;
      }
      .sorts {
        flex: none;
        display: flex;
        gap: 4px;
      }
      .sorts st-dropdown {
        flex: none;
        min-width: 0;
      }

    `,
  ];

  @property({ attribute: false }) filters!: ListFilters;
  /** The filter row; undefined until clicked, when it follows whether any filter is set. */
  @state() private _showFilters: boolean | undefined = undefined;
  /** What is typed in this list's own search box. */
  @property() query = "";
  /** The chosen sort's id and direction; "" means the tab's default. */
  @property() sort = "";
  @property() sortDir: SortDir | "" = "";
  @property({ attribute: false }) tickets: TicketSummary[] = [];
  @property({ attribute: false }) categories: Category[] = [];
  @property({ attribute: false }) labels: Label[] = [];
  /** Admins can tick tickets to act on several at once. */
  @property({ type: Boolean }) selectable = false;
  /** Checkboxes are showing (the Select button is on). */
  @property({ type: Boolean }) selecting = false;
  @property({ type: Number }) checkedCount = 0;

  override willUpdate(changed: Map<string, unknown>) {
    // The filter row follows each tab's own filters: open while that tab has one set, until you open or close it there.
    const prev = changed.get("filters") as ListFilters | undefined;
    if (prev && prev.view !== this.filters.view) this._showFilters = undefined;
  }

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
    const chosen = this.sort && (this.sort !== "closed" || f.view === "completed") ? this.sort : "";
    const field = chosen || defaultSort(f.view);
    const desc = (this.sortDir || SORTS.find((x) => x.id === field)!.first) === "desc";
    const active = [f.scope, f.category, f.person, f.priority, f.label].filter(Boolean).length;
    // Open by default while the list is narrowed, so it is plain why some tickets are missing.
    const open = this._showFilters ?? active > 0;
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
        <label class="find">
          <ha-icon icon="mdi:magnify"></ha-icon>
          <input type="search" placeholder="Search ${VIEWS.find((v) => v.id === f.view)?.label ?? "Tickets"}…" aria-label="Search this list" .value=${this.query}
            @input=${(e: Event) => this._fire("list-query", (e.target as HTMLInputElement).value)} />
        </label>
        <span class="sorts">
          <button class="icon filter-btn ${open || active ? "on" : ""}" title="Filters" aria-label="Filters" aria-pressed=${open}
            @click=${() => (this._showFilters = !this._showFilters)}>
            <ha-icon icon="mdi:filter-variant"></ha-icon>
            ${active ? html`<span class="badge">${active}</span>` : nothing}
          </button>
          <st-dropdown label="Sort By" icon="mdi:sort" .options=${sortOptions(f.view)} .value=${chosen} .direction=${chosen ? (desc ? "desc" : "asc") : ""} .badgeIcon=${chosen ? (desc ? "mdi:arrow-down" : "mdi:arrow-up") : ""}
            @change=${(e: CustomEvent<string>) => this._fire("sort-change", { sort: e.detail, dir: "" })}
            @toggle=${() => this._fire("sort-change", { sort: field, dir: desc ? "asc" : "desc" })}></st-dropdown>
        </span>
      </div>
      ${open ? html`<div class="toolbar filterbar">
  <div class="filters">
          ${f.view === "completed" && f.scope
            ? html`<st-dropdown label="Status" placeholder="Status" .options=${SCOPES_OPTIONS} .value=${f.scope} @change=${this._change("scope")}></st-dropdown>`
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
      </div>` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "st-list-toolbar": ListToolbar;
  }
}
