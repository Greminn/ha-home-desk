import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import { safeCustomElement } from "../define";
import { sharedStyles } from "../styles";

/**
 * The bar across the top of the page, over the ticket list and the open ticket: New Ticket at the left, always
 * with its words, and the search box at the right, a quarter of the bar wide (all the room it can have on a narrow screen). It only reports what
 * was asked for (search text, a new ticket); the panel decides what the list shows.
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

  private _fire(name: string, detail?: unknown) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  override render() {
    return html`<div class="bar">
      <button class="add" title="New Ticket" aria-label="New Ticket" @click=${() => this._fire("new-ticket")}>
        <ha-icon icon="mdi:plus"></ha-icon>New Ticket
      </button>
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
