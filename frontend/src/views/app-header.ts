import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { safeCustomElement } from "../define";
import { sharedStyles } from "../styles";
import { VIEWS } from "../list-model";
import type { TicketSummary } from "../types";

export type Page = "" | "home" | "report" | "labels" | "categories" | "settings";

const CRUMBS: Record<Exclude<Page, "" | "home">, string> = { report: "Report", labels: "Labels", categories: "Categories", settings: "Settings" };

/**
 * The panel's header, laid out like Home Assistant's own: the title (or a back arrow and the page's name), the view
 * tabs with counts, and the settings and more-options buttons. It owns the menu; it tells the panel what was chosen
 * (a page, a view, a refresh) and the panel does the work.
 */
@safeCustomElement("st-app-header")
export class AppHeader extends LitElement {
  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        flex: none;
        background: var(--st-header-bg);
        color: var(--st-header-fg);
        border-bottom: 1px solid var(--st-divider);
      }
      .bar {
        position: relative;
        display: flex;
        align-items: center;
        height: 56px;
        padding: 0 4px;
      }
      .bar > .icon {
        flex: none;
        color: var(--st-header-fg);
      }
      .bar .side {
        flex: 1 1 0;
        min-width: 0;
        display: flex;
        align-items: center;
      }
      .bar .side.end {
        justify-content: flex-end;
        position: relative;
      }
      .bar h1 {
        margin: 0 0 0 12px;
        font-size: var(--st-fs-header);
        font-weight: 400;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      /* The brand mark (a house with a tick) before the title, in the brand's blue. */
      .bar h1:not(.crumb) {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .bar h1 .mark {
        flex: none;
        margin-left: 4.7px; /* puts the roof's peak (44% across the mark) over the centre of the New Ticket button below */
        width: 26px;
        height: 26px;
        color: var(--st-brand, #03a9f4);
      }
      /* The mark and name take you Home. */
      .bar h1 .brand {
        display: flex;
        align-items: center;
        gap: 12px;
        height: auto;
        padding: 0;
        border-radius: var(--st-r-control);
        background: none;
        color: inherit;
        font: inherit;
        font-weight: inherit;
        cursor: pointer;
      }
      .bar h1.crumb {
        font-size: var(--st-fs-title);
        font-weight: 500;
      }
      .tabs {
        flex: 0 1 auto;
        min-width: 0;
        display: flex;
        align-self: stretch;
        overflow-x: auto;
        scrollbar-width: none;
      }
      .tabs::-webkit-scrollbar {
        display: none;
      }
      .tab {
        flex: none;
        align-self: stretch;
        height: auto;
        padding: 0 16px;
        gap: 8px;
        border-radius: 0;
        color: var(--st-fg);
        font-weight: 500;
        border-bottom: 2px solid transparent;
      }
      .tab:first-child {
        margin-left: auto;
      }
      .tab:last-child {
        margin-right: auto;
      }
      .tab ha-icon {
        --mdc-icon-size: 24px;
      }
      .tab .count {
        font-weight: 400;
        font-size: var(--st-fs-caption);
        padding: 1px 7px;
        border-radius: 10px;
        background: color-mix(in srgb, currentColor 18%, transparent);
      }
      /* Something in this tab changed since you looked: the count lights up. */
      .tab .count.unread {
        background: var(--st-accent);
        color: var(--st-on-accent, #fff);
        font-weight: 500;
      }
      .tab.active {
        color: var(--st-accent);
        border-bottom-color: var(--st-accent);
      }
      @media (max-width: 1000px) {
        .tab:not(.active) .tab-text,
        .tab:not(.active) .count {
          display: none;
        }
      }
      @media (max-width: 600px) {
        /* On a phone only the mark shows (the name would crowd the tabs); it still takes you Home. */
        .bar h1:not(.crumb) span {
          display: none;
        }
        .bar h1:not(.crumb) {
          margin-left: 0;
        }
        .bar h1 .mark {
          margin-left: 0;
        }
        .bar .side:not(.wide) {
          flex: none;
          width: auto;
        }
        .tabs {
          flex: 1 1 0;
        }
        .tab {
          padding: 0 8px;
        }
      }
      .menu-backdrop {
        position: fixed;
        inset: 0;
        z-index: 4;
        height: auto;
        border-radius: 0;
        padding: 0;
        background: transparent;
        cursor: default;
      }
      .menu-popover {
        position: absolute;
        z-index: 5;
        top: 48px;
        right: 8px;
        min-width: 180px;
        padding: 8px 0;
        border-radius: 4px;
        background: var(--st-surface);
        box-shadow: var(--st-shadow-m);
      }
      .menu-popover button {
        width: 100%;
        height: 48px;
        padding: 0 16px;
        border-radius: 0;
        justify-content: flex-start;
        color: var(--st-fg);
        font-weight: 400;
        font-size: var(--st-fs-row);
      }
      .menu-popover ha-icon {
        color: var(--st-fg-secondary);
      }
    `,
  ];

  /** The full page open in place of the list, or "" for the list. */
  @property() page: Page = "";
  @property() view = "inbox";
  @property({ attribute: false }) tickets: TicketSummary[] = [];
  @property({ type: Boolean }) narrow = false;
  @property({ type: Boolean }) admin = false;
  @state() private _menuOpen = false;

  private _fire(name: string, detail?: unknown) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  private _choose(page: Page) {
    this._menuOpen = false;
    this._fire("page-change", page);
  }

  override render() {
    return html`
      <div class="bar">
        <div class="side ${this.page ? "wide" : ""}">
          ${this.page
            ? html`<button class="icon" title="Back" aria-label="Back" @click=${() => this._choose("")}><ha-icon icon="mdi:arrow-left"></ha-icon></button>
                <h1 class="crumb">${CRUMBS[this.page as keyof typeof CRUMBS]}</h1>`
            : html`${this.narrow
                ? html`<button class="icon" title="Menu" @click=${() => this._fire("hass-toggle-menu")}><ha-icon icon="mdi:menu"></ha-icon></button>`
                : nothing}
              <h1><button class="brand" title="Home" aria-label="Home Desk home" @click=${() => this._fire("go-home")}><svg class="mark" viewBox="0 0 69.96 69.96" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M68.77 13.75 69.04 13.19 69.22 12.59 69.29 12.29 69.36 11.67 69.34 11.05 69.25 10.44 69.07 9.84 68.82 9.27 68.50 8.74 68.32 8.49 67.90 8.03 67.42 7.63 67.16 7.46 66.62 7.16 66.04 6.93 65.44 6.79 65.13 6.74 64.51 6.71 63.89 6.77 63.28 6.90 62.70 7.11 62.15 7.40 61.64 7.76 61.18 8.18 60.97 8.41 53.63 18.40 60.81 24.68 68.44 14.27ZM35.25 2.58 34.53 2.28 34.15 2.17 33.38 2.02 32.60 1.97 31.82 2.02 31.05 2.17 30.31 2.42 29.60 2.77 28.95 3.20 2.65 26.20 2.09 26.76 1.84 27.06 1.41 27.71 1.22 28.06 0.92 28.78 0.72 29.54 0.61 30.32 0.60 30.72 0.61 62.39 0.72 63.16 0.92 63.92 1.22 64.65 1.61 65.33 2.09 65.95 2.64 66.50 3.27 66.98 3.95 67.37 4.30 67.54 5.05 67.79 5.82 67.94 6.60 67.99 58.99 67.98 59.77 67.88 60.53 67.67 61.25 67.37 61.93 66.98 62.56 66.50 63.11 65.95 63.59 65.33 63.98 64.65 64.28 63.92 64.40 63.55 64.55 62.78 64.60 61.99 64.59 30.32 64.48 29.54 64.28 28.78 63.98 28.06 63.59 27.38 63.11 26.76 62.84 26.47 60.81 24.68 36.43 57.90 36.02 58.38 35.56 58.81 35.04 59.17 34.48 59.45 33.89 59.66 33.27 59.80 32.65 59.84 32.02 59.81 31.40 59.69 30.80 59.49 30.24 59.21 29.71 58.87 29.24 58.45 15.24 44.45 15.03 44.23 14.65 43.73 14.34 43.19 14.10 42.62 13.94 42.02 13.89 41.71 13.85 41.09 13.89 40.47 14.01 39.86 14.21 39.28 14.49 38.72 14.83 38.20 15.03 37.96 15.24 37.73 15.71 37.32 16.23 36.98 16.78 36.70 17.37 36.50 17.98 36.38 18.60 36.34 19.22 36.38 19.83 36.50 20.42 36.70 20.98 36.98 21.49 37.32 21.73 37.52 32.04 47.82 53.63 18.40 36.55 3.45 35.93 2.97ZM25.28 22.90 26.05 22.52 26.81 22.08 27.58 21.56 28.30 20.98 28.96 20.37 29.59 19.69 30.18 18.95 30.67 18.22 31.12 17.46 31.50 16.68 31.81 15.94 32.03 15.29 32.10 15.15 32.21 15.03 32.34 14.95 32.48 14.90 32.64 14.89 32.79 14.92 32.93 14.98 33.02 15.06 33.12 15.18 33.39 15.94 33.70 16.69 34.08 17.46 34.53 18.22 35.04 18.97 35.60 19.67 36.22 20.35 36.92 21 37.64 21.57 38.39 22.08 39.13 22.51 39.90 22.89 40.65 23.20 41.30 23.43 41.44 23.50 41.56 23.60 41.65 23.73 41.70 23.88 41.71 24.03 41.68 24.19 41.63 24.29 41.53 24.42 41.41 24.51 40.65 24.78 39.90 25.10 39.13 25.47 38.37 25.92 37.62 26.43 36.92 26.99 36.24 27.62 35.60 28.31 35.02 29.03 34.51 29.78 34.08 30.53 33.70 31.29 33.39 32.04 33.17 32.70 33.10 32.84 32.99 32.95 32.86 33.04 32.72 33.09 32.56 33.10 32.41 33.07 32.30 33.02 32.18 32.93 32.08 32.80 31.81 32.04 31.50 31.29 31.12 30.53 30.67 29.76 30.16 29.01 29.60 28.31 28.96 27.62 28.28 26.99 27.56 26.42 26.81 25.91 26.07 25.47 25.30 25.10 24.55 24.78 23.82 24.53 23.69 24.44 23.59 24.33 23.50 24.11 23.50 23.92 23.55 23.73 23.69 23.54 23.86 23.44 24.55 23.20Z"/></svg><span>Home Desk</span></button></h1>`}
        </div>
        ${this.page || !this.admin
          ? html`<div class="tabs"></div>`
          : html`<div class="tabs" role="tablist">
              ${VIEWS.map(
                (v) => html`<button class="tab ${v.id === this.view ? "active" : ""}" role="tab" title=${v.label} aria-label=${v.label}
                  aria-selected=${v.id === this.view} @click=${() => this._fire("view-change", v.id)}>
                  <ha-icon .icon=${v.icon}></ha-icon><span class="tab-text">${v.label}</span>${v.count
                    ? html`<span class="count ${this.tickets.some((t) => t.unread && v.match(t)) ? "unread" : ""}" title=${this.tickets.some((t) => t.unread && v.match(t)) ? "Has updates you haven't seen" : ""}>${this.tickets.filter(v.match).length}</span>`
                    : nothing}
                </button>`,
              )}
            </div>`}
        <div class="side end">
          ${this.admin
            ? html`<button class="icon" title="Settings" aria-label="Settings" @click=${() => this._choose("settings")}><ha-icon icon="mdi:cog-outline"></ha-icon></button>`
            : nothing}
          ${this.admin
            ? html`<button class="icon" title="More options" aria-label="More options" aria-haspopup="menu" aria-expanded=${this._menuOpen}
                @click=${() => (this._menuOpen = !this._menuOpen)}><ha-icon icon="mdi:dots-vertical"></ha-icon></button>`
            : nothing}
          ${this.admin && this._menuOpen
            ? html`<button class="menu-backdrop" aria-label="Close menu" @click=${() => (this._menuOpen = false)}></button>
                <div class="menu-popover" role="menu">
                  <button role="menuitem" @click=${() => { this._menuOpen = false; this._fire("refresh"); }}><ha-icon icon="mdi:refresh"></ha-icon>Refresh</button>
                  <button role="menuitem" @click=${() => this._choose("report")}><ha-icon icon="mdi:message-alert-outline"></ha-icon>Report a Problem or Idea</button>
                  <button role="menuitem" @click=${() => { this._menuOpen = false; this._fire("mark-all-read"); }}><ha-icon icon="mdi:email-open-multiple-outline"></ha-icon>Mark All as Read</button>
                  ${this.admin
                    ? html`<button role="menuitem" @click=${() => this._choose("labels")}><ha-icon icon="mdi:label-multiple-outline"></ha-icon>Manage Labels</button>
                        <button role="menuitem" @click=${() => this._choose("categories")}><ha-icon icon="mdi:shape-outline"></ha-icon>Manage Categories</button>`
                    : nothing}
                </div>`
            : nothing}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "st-app-header": AppHeader;
  }
}
