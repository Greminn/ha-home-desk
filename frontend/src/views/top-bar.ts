import { LitElement, html, css, nothing } from "lit";
import { property } from "lit/decorators.js";
import { safeCustomElement } from "../define";
import { sharedStyles } from "../styles";
import { STATE_COLOR, STATE_ICON } from "../format";
import type { Priority, Status } from "../types";

/** One open ticket, as a chip in the bar. */
export interface TabInfo {
  id: number;
  title: string;
  status: Status;
  priority: Priority;
  unread: boolean;
  /** An AI agent is working on it right now. */
  working: boolean;
  /** Kept open. Otherwise it is the preview chip, which the next ticket you look at replaces. */
  pinned: boolean;
}

/**
 * The bar across the top of the page, over the ticket list and the open ticket: New Ticket at the left, always with
 * its words, the tickets you have open as chips in the middle, and the search box at the right, a quarter of the bar
 * wide (all the room it can have on a narrow screen). It only reports what was asked for (search text, a new ticket, a
 * chip picked, closed or kept); the panel decides what happens.
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
       * the accent, as the selected row is. A chip in italics is the preview one: the next ticket you look at replaces it,
       * until you comment, change something or double-click it to keep it.
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
        max-width: 220px;
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
      .tab.preview .ttl {
        font-style: italic;
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

  override updated() {
    this.renderRoot.querySelector<HTMLElement>(".tab.active")?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }

  private _fire(name: string, detail?: unknown) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  override render() {
    return html`<div class="bar">
      <button class="add" title="New Ticket" aria-label="New Ticket" @click=${() => this._fire("new-ticket")}>
        <ha-icon icon="mdi:plus"></ha-icon>New Ticket
      </button>
      <div class="tabs" role="tablist" aria-label="Open tickets">
        ${this.tabs.map(
          (t) => html`<div class="tab ${t.id === this.activeId ? "active" : ""} ${t.pinned ? "" : "preview"}" role="tab" tabindex="0"
            aria-selected=${t.id === this.activeId} title=${`#${t.id} ${t.title}${t.pinned ? "" : " (preview: the next ticket you look at replaces this. Double-click to keep it.)"}`}
            @click=${() => this._fire("tab-select", t.id)} @dblclick=${() => this._fire("tab-pin", t.id)}
            @auxclick=${(e: MouseEvent) => e.button === 1 && (e.preventDefault(), this._fire("tab-close", t.id))}
            @keydown=${(e: KeyboardEvent) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this._fire("tab-select", t.id))}>
            <ha-icon class="st" .icon=${STATE_ICON[t.status]} style="color: ${STATE_COLOR[t.status]}"></ha-icon>
            <span class="num">#${t.id}</span><span class="ttl">${t.title}</span>
            ${t.working ? html`<ha-icon class="flag" icon="mdi:star-four-points" title="An AI agent is working on it"></ha-icon>` : t.unread ? html`<span class="dot" title="Changed since you looked"></span>` : nothing}
            <button class="x" title="Close" aria-label=${`Close #${t.id}`} @click=${(e: Event) => { e.stopPropagation(); this._fire("tab-close", t.id); }}><ha-icon icon="mdi:close"></ha-icon></button>
          </div>`,
        )}
      </div>
      <div class="search">
        <ha-icon icon="mdi:magnify"></ha-icon>
        <input type="search" placeholder="Search tickets" aria-label="Search tickets" .value=${this.q}
          @input=${(e: Event) => this._fire("search", (e.target as HTMLInputElement).value)} />
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "st-top-bar": TopBar;
  }
}
