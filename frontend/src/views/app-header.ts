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
              <h1><button class="brand" title="Home" aria-label="Home Desk home" @click=${() => this._fire("go-home")}><svg class="mark" viewBox="0 0 74.05 74.05" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M72.35 14.77 72.79 13.97 72.97 13.55 73.25 12.67 73.41 11.77 73.45 10.86 73.37 9.95 73.17 9.05 72.86 8.19 72.66 7.78 72.19 7 71.61 6.28 71.29 5.95 70.59 5.36 69.82 4.87 68.99 4.49 68.12 4.21 67.21 4.05 66.30 4.01 65.84 4.03 64.94 4.17 64.06 4.43 63.63 4.60 62.82 5.02 62.07 5.55 61.72 5.85 61.09 6.51 51.94 18.96 62.51 28.21ZM35.60 4.81 34.89 4.47 34.15 4.21 33.38 4.06 32.60 4.01 32.21 4.02 31.43 4.13 31.05 4.21 30.31 4.47 29.60 4.81 28.95 5.25 2.65 28.25 2.09 28.80 1.84 29.10 1.41 29.76 1.22 30.10 0.92 30.83 0.72 31.59 0.61 32.37 0.60 32.76 0.61 64.43 0.72 65.21 0.92 65.97 1.22 66.69 1.61 67.37 2.09 67.99 2.64 68.55 3.27 69.03 3.95 69.42 4.67 69.72 5.05 69.83 5.82 69.99 6.60 70.04 58.99 70.03 59.77 69.92 60.53 69.72 61.25 69.42 61.93 69.03 62.56 68.55 63.11 67.99 63.59 67.37 63.98 66.69 64.28 65.97 64.40 65.59 64.55 64.82 64.60 64.04 64.59 32.37 64.48 31.59 64.40 31.21 64.28 30.83 63.98 30.10 63.79 29.76 63.36 29.10 62.84 28.51 62.51 28.21 38.24 61.28 37.96 61.64 37.65 61.99 37.31 62.31 36.96 62.61 36.59 62.89 36.20 63.14 35.79 63.37 35.37 63.57 34.94 63.73 34.50 63.88 34.05 63.99 33.59 64.07 33.13 64.12 32.67 64.14 32.21 64.13 31.74 64.09 31.29 64.01 30.83 63.91 30.39 63.78 29.95 63.62 29.53 63.43 29.12 63.21 28.73 62.97 28.35 62.70 27.99 62.41 27.65 62.09 13.65 48.09 13.05 47.40 12.78 47.03 12.32 46.23 11.97 45.39 11.84 44.95 11.66 44.05 11.60 43.14 11.66 42.22 11.84 41.33 12.13 40.46 12.54 39.64 13.05 38.88 13.65 38.19 14.34 37.58 15.10 37.08 15.92 36.67 16.79 36.38 17.69 36.20 18.60 36.14 19.51 36.20 19.97 36.27 20.85 36.51 21.28 36.67 22.10 37.08 22.86 37.58 23.55 38.19 31.78 46.42 51.94 18.96 36.55 5.50 35.93 5.02ZM24.55 23.25 25.30 22.93 26.05 22.57 26.83 22.11 27.58 21.60 28.28 21.04 28.98 20.40 29.60 19.72 30.18 19 30.69 18.25 31.12 17.51 31.50 16.74 31.81 15.99 32.03 15.33 32.10 15.19 32.21 15.08 32.34 14.99 32.48 14.94 32.64 14.93 32.79 14.96 32.93 15.03 33.02 15.10 33.12 15.23 33.39 15.99 33.70 16.74 34.08 17.51 34.53 18.27 35.04 19.02 35.60 19.72 36.22 20.40 36.92 21.04 37.64 21.61 38.39 22.12 39.13 22.56 39.90 22.93 40.65 23.25 41.30 23.47 41.44 23.54 41.56 23.64 41.65 23.77 41.70 23.92 41.71 24.08 41.68 24.23 41.63 24.34 41.53 24.46 41.41 24.56 40.65 24.83 39.90 25.14 39.13 25.52 38.37 25.96 37.62 26.48 36.92 27.03 36.24 27.66 35.60 28.36 35.02 29.08 34.51 29.83 34.08 30.57 33.70 31.34 33.39 32.09 33.17 32.74 33.10 32.88 32.99 33 32.86 33.09 32.72 33.14 32.56 33.15 32.41 33.12 32.30 33.07 32.18 32.97 32.08 32.85 31.81 32.09 31.50 31.34 31.12 30.57 30.67 29.81 30.16 29.06 29.60 28.36 28.96 27.66 28.28 27.03 27.56 26.46 26.81 25.95 26.07 25.52 25.30 25.14 24.55 24.83 23.86 24.59 23.72 24.51 23.61 24.40 23.52 24.23 23.49 24.04 23.52 23.85 23.61 23.67 23.72 23.56 23.82 23.50Z"/></svg><span>Home Desk</span></button></h1>`}
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
