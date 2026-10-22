import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { safeCustomElement } from "../define";
import { sharedStyles } from "../styles";
import { stateColor, stateIcon } from "../format";
import { whereIs } from "../list-model";
import type { Priority, Status, TicketSummary } from "../types";

/** The room a chip should have for its title before the bar makes way for it, in pixels. */
const CHIP_ROOM = 170;

/** One open ticket, as a chip in the bar. */
export interface TabInfo {
  id: number;
  title: string;
  status: Status;
  priority: Priority;
  unread: boolean;
  /** Queued for an AI agent. */
  queued: boolean;
  /** Labelled Enhancement (an idea for the future). */
  enhancement: boolean;
  /** How many comments it has (a New Enhancement is blue once it has notes). */
  comments: number;
  /** An AI agent is working on it right now. */
  working: boolean;
  /** Only passed through (stepped to, or clicked in the list): the next such ticket takes its place. */
  preview: boolean;
}

/**
 * The bar across the top of the page, over the ticket list and the open ticket: New Ticket at the left, always with
 * its words, the tickets you have open as chips in the middle, and the search box at the right, a quarter of the bar
 * wide (all the room it can have on a narrow screen). It only reports what was asked for (search text, a new ticket, a
 * chip picked or closed); the panel decides what happens.
 */
@safeCustomElement("st-top-bar")
export class TopBar extends LitElement {
  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        flex: none;
      }
      .bar {
        display: flex;
        align-items: center;
        gap: var(--ha-space-4, 16px);
        height: 56px;
        padding: 0 16px;
        box-sizing: border-box;
        background: var(--st-bg);
        border-bottom: 1px solid var(--st-divider);
      }
      .add {
        flex: none;
        height: var(--st-h-bar);
        padding: 0 14px 0 8px;
        gap: 4px;
        border-radius: var(--st-r-pill);
        background: var(--st-accent);
        color: var(--text-primary-color, #fff);
        font-size: var(--st-fs-body);
        font-weight: var(--ha-font-weight-medium, 500);
        white-space: nowrap;
      }
      .add:hover,
      .add:focus-visible {
        box-shadow: var(--st-shadow-m);
      }
      .add ha-icon {
        --mdc-icon-size: 20px;
      }
      /*
       * The open tickets: outlined pills like the status and priority pills, 32px tall. The ticket you are on is tinted with
       * the accent, as the selected row is.
       */
      .tabs {
        flex: 1 1 0;
        min-width: 0;
        display: flex;
        gap: 8px;
        overflow-x: auto;
        scrollbar-width: none;
        padding: 2px 0;
      }
      .tabs::-webkit-scrollbar {
        display: none;
      }
      .tab {
        flex: 0 1 auto;
        min-width: 96px;
        max-width: 340px; /* roomy with one or two open, shrinking (to the minimum) as more are added */
        height: var(--st-h-bar);
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 0 4px 0 10px;
        border: 1px solid var(--st-outline);
        border-radius: var(--st-r-pill);
        color: var(--st-fg-secondary);
        font-size: var(--st-fs-body);
        cursor: pointer;
        user-select: none;
      }
      .tab:hover {
        color: var(--st-fg);
        border-color: var(--st-field-outline-hover);
      }
      .tab.active {
        color: var(--st-accent);
        border-color: var(--st-accent);
        background: color-mix(in srgb, var(--st-accent) 14%, transparent);
      }
      /* A preview chip: lighter and italic, until it is kept. */
      .tab.preview .ttl,
      .tab.preview .num {
        font-style: italic;
      }
      .tab.preview:not(.active) {
        border-style: dashed;
      }
      .tab:focus-visible {
        outline: 2px solid var(--st-accent);
        outline-offset: 1px;
      }
      .tab .st {
        --mdc-icon-size: 16px;
        flex: none;
      }
      .tab .num {
        flex: none;
        font-weight: 500;
      }
      .tab .ttl {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .tab .flag {
        --mdc-icon-size: 14px;
        flex: none;
      }
      .tab .dot {
        flex: none;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--st-accent);
      }
      .tab .x {
        flex: none;
        width: 22px;
        height: 22px;
        padding: 0;
        margin-left: auto;
        justify-content: center;
        border-radius: 50%;
        color: inherit;
      }
      .tab .x ha-icon {
        --mdc-icon-size: 14px;
      }
      .tab .x:hover {
        background: color-mix(in srgb, var(--st-fg) 14%, transparent);
      }
      /* On a phone the ticket fills the screen, so there is nowhere to switch between open tickets. */
      @media (max-width: 870px) {
        .tabs {
          display: none;
        }
      }
      /* The live search drop down: under the search box, over the list and the ticket, so it works from any tab. */
      .results {
        position: absolute;
        top: calc(100% + 6px);
        right: 0;
        z-index: 10;
        width: min(560px, calc(100vw - 32px));
        max-height: 60vh;
        overflow-y: auto;
        padding: 8px 0;
        border-radius: 4px;
        background: var(--st-surface);
        box-shadow: var(--st-shadow-m);
        outline: 1px solid var(--st-divider);
      }
      .results .hit {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        height: 44px;
        padding: 0 16px;
        border-radius: 0;
        color: var(--st-fg);
        font-weight: 400;
        font-size: var(--st-fs-body);
        text-align: left;
      }
      .results .hit.on {
        background: color-mix(in srgb, var(--st-accent) 12%, transparent);
      }
      .results .hit ha-icon {
        position: static; /* not the search box's magnifier, which is placed absolutely */
        --mdc-icon-size: 18px;
        flex: none;
      }
      .results .hit .num {
        flex: none;
        font-weight: 500;
      }
      .results .hit .ttl {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .results .hit .state {
        flex: none;
        color: var(--st-fg-secondary);
        font-size: var(--st-fs-caption);
      }
      .results .none {
        padding: 12px 16px;
        color: var(--st-fg-secondary);
      }
      .search .field {
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
      }
      /*
       * As more tickets are open the bar gives up room to them: first New Ticket becomes a round plus, then the search a
       * magnifier that opens out when you point at it or click into it (and stays out while it holds a search).
       */
      .add-slot {
        flex: none;
        position: relative;
      }
      /* Squeezed, New Ticket is a round plus that opens out to the right, over the chips, when you point at it. */
      .bar.squeeze-1 .add-slot,
      .bar.squeeze-2 .add-slot {
        width: var(--st-h-bar);
        height: var(--st-h-bar);
      }
      .bar.squeeze-1 .add,
      .bar.squeeze-2 .add {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 5;
        min-width: var(--st-h-bar);
        padding: 0 5px;
        gap: 0;
        justify-content: flex-start;
        transition: padding-right 200ms ease-in-out;
      }
      .bar.squeeze-1 .add .words,
      .bar.squeeze-2 .add .words {
        display: inline-block;
        max-width: 0;
        overflow: hidden;
        opacity: 0;
        transition:
          max-width 200ms ease-in-out,
          margin-left 200ms ease-in-out,
          opacity 150ms ease-in-out;
      }
      .bar.squeeze-1 .add:hover,
      .bar.squeeze-1 .add:focus-visible,
      .bar.squeeze-2 .add:hover,
      .bar.squeeze-2 .add:focus-visible {
        padding-right: 14px;
      }
      .bar.squeeze-1 .add:hover .words,
      .bar.squeeze-1 .add:focus-visible .words,
      .bar.squeeze-2 .add:hover .words,
      .bar.squeeze-2 .add:focus-visible .words {
        max-width: 100px;
        margin-left: 4px;
        opacity: 1;
      }
      .bar.squeeze-2 .search {
        flex: 0 0 var(--st-h-bar);
        min-width: var(--st-h-bar);
        height: var(--st-h-bar);
      }
      .bar.squeeze-2 .search .field {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 4;
        width: var(--st-h-bar);
        transition: width 180ms ease;
      }
      .bar.squeeze-2 .search .field ha-icon {
        left: 7px;
      }
      .bar.squeeze-2 .search .field input[type="search"] {
        height: var(--st-h-bar);
        padding: 0;
        border-radius: var(--st-r-pill);
        color: transparent;
        cursor: pointer;
      }
      .bar.squeeze-2 .search .field input[type="search"]::placeholder {
        color: transparent;
      }
      .bar.squeeze-2 .search .field:hover,
      .bar.squeeze-2 .search .field:focus-within {
        width: 280px;
      }
      .bar.squeeze-2 .search .field:hover input[type="search"],
      .bar.squeeze-2 .search .field:focus-within input[type="search"] {
        padding: 0 8px 0 34px;
        border-radius: var(--st-r-bar);
        color: var(--st-fg);
        cursor: text;
      }
      .bar.squeeze-2 .search .field:hover input[type="search"]::placeholder,
      .bar.squeeze-2 .search .field:focus-within input[type="search"]::placeholder {
        color: var(--ha-color-neutral-60, var(--st-fg-secondary));
      }
      @media (prefers-reduced-motion: reduce) {
        .bar.squeeze-2 .search .field {
          transition: none;
        }
      }
      .search {
        flex: 0 0 25%;
        min-width: 200px;
        margin-left: auto;
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
      /* On a narrow screen a quarter is too small to type in: the search takes the room that is left. */
      @media (max-width: 870px) {
        .search {
          flex: 1 1 auto;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .bar .add,
        .bar .add .words {
          transition: none;
        }
      }
      @media (max-width: 560px) {
        .bar {
          gap: 8px;
          padding: 0 12px;
        }
      }
    `,
  ];

  @property() q = "";
  /** The open tickets, left to right. */
  @property({ attribute: false }) tabs: TabInfo[] = [];
  /** The ticket on show, whose chip is tinted. */
  @property({ type: Number }) activeId: number | null = null;
  /** The tickets that match what is typed, for the drop down under the search box. */
  @property({ attribute: false }) results: TicketSummary[] = [];
  /** The search box has the cursor, so its drop down may show. */
  @state() private _focused = false;
  /** The result the arrow keys are on. */
  @state() private _active = 0;

  /** The bar's own width, so it knows how much room the open tickets leave for New Ticket and the search. */
  @state() private _width = 0;
  private _resizer?: ResizeObserver;

  override connectedCallback() {
    super.connectedCallback();
    this._resizer = new ResizeObserver(() => (this._width = this.clientWidth));
    this._resizer.observe(this);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._resizer?.disconnect();
  }

  /**
   * How much the bar gives up so the open tickets keep room for their titles: 0 nothing, 1 New Ticket is only a plus, 2 the
   * search is only a magnifier. The first level where each chip would have enough room, worked out from the bar's width and the
   * number of chips, so it never flickers between two levels.
   */
  private get _squeeze(): 0 | 1 | 2 {
    const width = this._width - 32; // the bar's side padding
    const n = this.tabs.length;
    if (!n || this._width <= 870) return 0; // no chips here on a narrow screen
    const gaps = 2 * 16;
    const add = [123, 32, 32];
    for (const level of [0, 1, 2] as const) {
      const search = level === 2 && !this.q ? 32 : Math.max(200, width * 0.25);
      const room = width - add[level]! - search - gaps - (n - 1) * 8;
      if (room / n >= CHIP_ROOM || level === 2) return level;
    }
    return 2;
  }

  override updated() {
    this.renderRoot.querySelector<HTMLElement>(".tab.active")?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }

  override willUpdate(changed: Map<string, unknown>) {
    if (changed.has("results")) this._active = 0;
  }

  private _searchKey(e: KeyboardEvent) {
    const n = this.results.length;
    if (e.key === "ArrowDown" && n) {
      e.preventDefault();
      this._active = (this._active + 1) % n;
    } else if (e.key === "ArrowUp" && n) {
      e.preventDefault();
      this._active = (this._active - 1 + n) % n;
    } else if (e.key === "Enter" && n) {
      e.preventDefault();
      this._fire("open-result", this.results[this._active]!.id);
    } else if (e.key === "Escape") {
      this._fire("search", "");
      (e.target as HTMLElement).blur();
    }
  }

  private _fire(name: string, detail?: unknown) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  /** Put the cursor in the search box (the header's search button on a phone, once the list is showing). */
  focusSearch() {
    this.renderRoot.querySelector<HTMLInputElement>("input[type=search]")?.focus();
  }

  override render() {
    return html`<div class="bar squeeze-${this._squeeze}">
      <span class="add-slot">
        <button class="add" title="New Ticket" aria-label="New Ticket" @click=${() => this._fire("new-ticket")}>
          <ha-icon icon="mdi:plus"></ha-icon><span class="words">New Ticket</span>
        </button>
      </span>
      <div class="tabs" role="tablist" aria-label="Open tickets">
        ${this.tabs.map(
          (t) => html`<div class="tab ${t.id === this.activeId ? "active" : ""} ${t.preview ? "preview" : ""}" role="tab" tabindex="0"
            aria-selected=${t.id === this.activeId} title=${`#${t.id} ${t.title}${t.preview ? " (preview: the next ticket you open replaces it, until you act on it or click it)" : ""}`}
            @click=${() => this._fire("tab-select", t.id)}
            @auxclick=${(e: MouseEvent) => e.button === 1 && (e.preventDefault(), this._fire("tab-close", t.id))}
            @keydown=${(e: KeyboardEvent) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this._fire("tab-select", t.id))}>
            <ha-icon class="st" .icon=${stateIcon(t.status, t.queued ? "ai:AI" : null, t.enhancement ? ["enhancement"] : [])} style="color: ${stateColor(t.status, t.queued ? "ai:AI" : null, t.enhancement ? ["enhancement"] : [], t.comments)}"></ha-icon>
            <span class="num">#${t.id}</span><span class="ttl">${t.title}</span>
            ${t.working ? html`<ha-icon class="flag" icon="mdi:star-four-points" title="An AI agent is working on it"></ha-icon>` : t.unread ? html`<span class="dot" title="Changed since you looked"></span>` : nothing}
            <button class="x" title=${`Close (${/Mac/i.test(navigator.platform) ? "Option" : "Alt"}-click closes all)`} aria-label=${`Close #${t.id}`}
              @click=${(e: MouseEvent) => { e.stopPropagation(); this._fire(e.altKey ? "tabs-close-all" : "tab-close", t.id); }}><ha-icon icon="mdi:close"></ha-icon></button>
          </div>`,
        )}
      </div>
      <div class="search" @focusin=${() => (this._focused = true)} @focusout=${() => (this._focused = false)}>
        <div class="field">
          <ha-icon icon="mdi:magnify"></ha-icon>
          <input type="search" placeholder="Search all tickets…" aria-label="Search all tickets" role="combobox" aria-expanded=${this._focused && !!this.q.trim()} .value=${this.q}
            @input=${(e: Event) => this._fire("search", (e.target as HTMLInputElement).value)} @keydown=${this._searchKey} />
        </div>
        ${this._focused && this.q.trim()
          ? html`<div class="results" role="listbox" aria-label="Matching tickets" @mousedown=${(e: Event) => e.preventDefault()}>
              ${this.results.length
                ? this.results.map(
                    (t, i) => html`<button class="hit ${i === this._active ? "on" : ""}" role="option" aria-selected=${i === this._active}
                      @mouseenter=${() => (this._active = i)} @click=${() => this._fire("open-result", t.id)}>
                      <ha-icon .icon=${stateIcon(t.status, t.assignee, t.labels)} style="color: ${stateColor(t.status, t.assignee, t.labels, t.comment_count)}"></ha-icon>
                      <span class="num">#${t.id}</span><span class="ttl">${t.title}</span><span class="state">${whereIs(t)}</span>
                    </button>`,
                  )
                : html`<div class="none">No tickets match</div>`}
            </div>`
          : nothing}
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "st-top-bar": TopBar;
  }
}
