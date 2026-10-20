import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { safeCustomElement } from "../define";
import { sharedStyles } from "../styles";
import { brandMark } from "../brand";
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
      /* On a phone the five tabs are one button that names the one you are on and opens a list of them all. */
      .tabs.picker {
        overflow: visible;
        justify-content: center;
      }
      .view-picker {
        align-self: stretch;
        height: auto;
        padding: 0 8px 0 12px;
        gap: 8px;
        border-radius: 0;
        border-bottom: 2px solid var(--st-accent);
        color: var(--st-accent);
        font-weight: 500;
        font-size: var(--st-fs-row);
        white-space: nowrap;
      }
      .view-picker .count,
      .view-menu .count {
        font-weight: 400;
        font-size: var(--st-fs-caption);
        padding: 1px 7px;
        border-radius: 10px;
        background: color-mix(in srgb, currentColor 18%, transparent);
      }
      .view-picker .count.unread,
      .view-menu .count.unread {
        background: var(--st-accent);
        color: var(--st-on-accent, #fff);
        font-weight: 500;
      }
      .menu-popover.view-menu {
        left: 8px;
        right: auto;
        min-width: 240px;
      }
      .view-menu button.active {
        color: var(--st-accent);
        background: color-mix(in srgb, var(--st-accent) 12%, transparent);
      }
      .view-menu button.active ha-icon {
        color: var(--st-accent);
      }
      .view-menu .count {
        margin-left: auto;
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
        width: max-content;
        max-width: calc(100vw - 16px);
        padding: 8px 0;
        border-radius: 4px;
        background: var(--st-surface);
        box-shadow: var(--st-shadow-m);
      }
      /* Every item is one line: the icon in a fixed 24px column, then the words, all left-aligned. With no wrapping the menu is as wide as its longest item. */
      .menu-popover button {
        display: flex;
        align-items: center;
        gap: 16px;
        width: 100%;
        height: 48px;
        padding: 0 16px;
        border-radius: 0;
        justify-content: flex-start;
        text-align: left;
        white-space: nowrap;
        color: var(--st-fg);
        font-weight: 400;
        font-size: var(--st-fs-row);
      }
      .menu-popover ha-icon {
        flex: none;
        --mdc-icon-size: 24px;
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
  /** On a phone the tabs are one drop down: whether its list is open. */
  @state() private _viewsOpen = false;

  private _fire(name: string, detail?: unknown) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  private _choose(page: Page) {
    this._menuOpen = false;
    this._fire("page-change", page);
  }

  private _count(v: (typeof VIEWS)[number]) {
    if (!v.count) return nothing;
    const unread = this.tickets.some((t) => t.unread && v.match(t));
    return html`<span class="count ${unread ? "unread" : ""}" title=${unread ? "Has updates you haven't seen" : ""}>${this.tickets.filter(v.match).length}</span>`;
  }

  /** The phone's version of the tabs: one button showing the current view, which opens a list of them all. */
  private _viewPicker() {
    const current = VIEWS.find((v) => v.id === this.view);
    return html`<div class="tabs picker">
      <button class="view-picker" aria-haspopup="menu" aria-expanded=${this._viewsOpen} title="Choose a list"
        @click=${() => (this._viewsOpen = !this._viewsOpen)}>
        <ha-icon .icon=${current?.icon ?? "mdi:format-list-bulleted"}></ha-icon><span>${current?.label ?? "Tickets"}</span>${current ? this._count(current) : nothing}<ha-icon icon="mdi:menu-down"></ha-icon>
      </button>
      ${this._viewsOpen
        ? html`<button class="menu-backdrop" aria-label="Close list" @click=${() => (this._viewsOpen = false)}></button>
            <div class="menu-popover view-menu" role="menu">
              ${VIEWS.map(
                (v) => html`<button role="menuitemradio" aria-checked=${v.id === this.view} class=${v.id === this.view ? "active" : ""}
                  @click=${() => { this._viewsOpen = false; this._fire("view-change", v.id); }}>
                  <ha-icon .icon=${v.icon}></ha-icon>${v.label}${this._count(v)}
                </button>`,
              )}
            </div>`
        : nothing}
    </div>`;
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
              <h1><button class="brand" title="Home" aria-label="Home Desk home" @click=${() => this._fire("go-home")}>${brandMark()}<span>Home Desk</span></button></h1>`}
        </div>
        ${this.page || !this.admin
          ? html`<div class="tabs"></div>`
          : this.narrow
            ? this._viewPicker()
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
          ${this.admin && !this.narrow
            ? html`<button class="icon" title="Settings" aria-label="Settings" @click=${() => this._choose("settings")}><ha-icon icon="mdi:cog-outline"></ha-icon></button>`
            : nothing}
          ${this.admin
            ? html`<button class="icon" title="More options" aria-label="More options" aria-haspopup="menu" aria-expanded=${this._menuOpen}
                @click=${() => (this._menuOpen = !this._menuOpen)}><ha-icon icon="mdi:dots-vertical"></ha-icon></button>`
            : nothing}
          ${this.admin && this._menuOpen
            ? html`<button class="menu-backdrop" aria-label="Close menu" @click=${() => (this._menuOpen = false)}></button>
                <div class="menu-popover" role="menu">
                  ${this.narrow
                    ? html`<button role="menuitem" @click=${() => this._choose("settings")}><ha-icon icon="mdi:cog-outline"></ha-icon>Settings</button>`
                    : nothing}
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
