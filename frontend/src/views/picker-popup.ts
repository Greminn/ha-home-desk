import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { safeCustomElement } from "../define";
import { sharedStyles } from "../styles";

export interface PickerItem {
  id: string;
  primary: string;
  secondary?: string;
  icon?: string;
}

/**
 * A search-and-pick popup like HA's pickers (ha-category-picker, ha-label-picker): a search field, then rows
 * of icon and name, with an "Add new..." row at the end. It floats under `rect` (the thing you clicked) and
 * flips above it when there isn't room. Fires `pick` with the chosen id and `close`.
 */
@safeCustomElement("st-picker-popup")
export class PickerPopup extends LitElement {
  static override styles = [
    sharedStyles,
    css`
      .backdrop {
        position: fixed;
        inset: 0;
        z-index: 40;
        height: auto;
        padding: 0;
        border-radius: 0;
        background: transparent;
        cursor: default;
      }
      .popup {
        position: fixed;
        z-index: 41;
        width: min(340px, calc(100vw - 16px));
        max-height: 380px;
        display: flex;
        flex-direction: column;
        padding: 12px 0 8px;
        box-sizing: border-box;
        border-radius: var(--ha-border-radius-md, 8px);
        background: var(--st-surface);
        box-shadow: var(--st-shadow-m);
        outline: 1px solid var(--st-divider);
      }
      .search {
        position: relative;
        display: flex;
        align-items: center;
        flex: none;
        margin: 0 12px 8px;
      }
      .search ha-icon {
        position: absolute;
        left: 10px;
        --mdc-icon-size: 20px;
        color: var(--st-fg-secondary);
        pointer-events: none;
      }
      .search input {
        width: 100%;
        height: 40px;
        padding: 0 12px 0 40px;
        border: 1px solid var(--st-accent);
        border-radius: var(--st-r-bar);
        background: transparent;
        font-size: var(--st-fs-field);
      }
      .search input:focus {
        outline: none;
      }
      .list {
        overflow-y: auto;
      }
      .item {
        width: 100%;
        height: auto;
        min-height: 48px;
        padding: 6px 16px;
        gap: 16px;
        border-radius: 0;
        justify-content: flex-start;
        text-align: left;
        color: var(--st-fg);
        font-weight: 400;
        font-size: var(--st-fs-row);
      }
      .item.active {
        background: var(--st-hover);
      }
      .item.current {
        color: var(--st-accent);
      }
      .item ha-icon {
        --mdc-icon-size: 24px;
        color: var(--st-fg-secondary);
        flex: none;
      }
      .item.current ha-icon {
        color: inherit;
      }
      .text {
        min-width: 0;
        display: flex;
        flex-direction: column;
      }
      .text .secondary {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: var(--st-fs-caption);
        color: var(--st-fg-secondary);
      }
      .empty {
        padding: 16px;
        text-align: center;
        color: var(--st-fg-secondary);
      }
    `,
  ];

  /** The element that was clicked: the popup opens under it. */
  @property({ attribute: false }) rect: DOMRect | null = null;
  @property({ attribute: false }) items: PickerItem[] = [];
  /** Rows after the matches, given what was typed ("Add new category..."). */
  @property({ attribute: false }) additional: (search: string) => PickerItem[] = () => [];
  @property() value = "";
  @property() emptyLabel = "Nothing here";

  @state() private _q = "";
  @state() private _active = 0;

  private get _rows(): PickerItem[] {
    const q = this._q.trim().toLowerCase();
    const matches = q ? this.items.filter((i) => `${i.primary} ${i.secondary ?? ""}`.toLowerCase().includes(q)) : this.items;
    return [...matches, ...this.additional(this._q.trim())];
  }

  private _fire(name: string, detail?: unknown) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  private _onKey(e: KeyboardEvent) {
    const rows = this._rows;
    if (e.key === "Escape") this._fire("close");
    else if (e.key === "ArrowDown") { this._active = Math.min(this._active + 1, rows.length - 1); e.preventDefault(); }
    else if (e.key === "ArrowUp") { this._active = Math.max(this._active - 1, 0); e.preventDefault(); }
    else if (e.key === "Enter" && rows[this._active]) this._fire("pick", { id: rows[this._active]!.id, search: this._q.trim() });
  }

  override firstUpdated() {
    this.renderRoot.querySelector<HTMLInputElement>("input")?.focus();
  }

  /** Under the clicked element, or above it when the popup wouldn't fit below. */
  private get _position(): string {
    const r = this.rect;
    if (!r) return "";
    const left = Math.max(8, Math.min(r.left, window.innerWidth - 348));
    const below = window.innerHeight - r.bottom;
    return below >= 300 || below >= r.top
      ? `left:${left}px;top:${r.bottom + 4}px;max-height:${Math.max(160, Math.min(380, below - 12))}px`
      : `left:${left}px;bottom:${window.innerHeight - r.top + 4}px;max-height:${Math.max(160, Math.min(380, r.top - 12))}px`;
  }

  override render() {
    const rows = this._rows;
    return html`
      <button class="backdrop" tabindex="-1" aria-label="Close" @click=${() => this._fire("close")}></button>
      <div class="popup" style=${this._position} role="listbox" @keydown=${this._onKey}>
        <div class="search">
          <ha-icon icon="mdi:magnify"></ha-icon>
          <input type="search" placeholder="Search" aria-label="Search" .value=${this._q}
            @input=${(e: Event) => { this._q = (e.target as HTMLInputElement).value; this._active = 0; }} />
        </div>
        <div class="list">
          ${rows.length ? nothing : html`<div class="empty">${this.emptyLabel}</div>`}
          ${rows.map((r, i) => html`<button class="item ${i === this._active ? "active" : ""} ${r.id === this.value ? "current" : ""}"
            role="option" aria-selected=${r.id === this.value}
            @mouseenter=${() => (this._active = i)}
            @click=${() => this._fire("pick", { id: r.id, search: this._q.trim() })}>
            <ha-icon .icon=${r.icon ?? "mdi:tag-outline"}></ha-icon>
            <span class="text"><span>${r.primary}</span>${r.secondary ? html`<span class="secondary">${r.secondary}</span>` : nothing}</span>
          </button>`)}
        </div>
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "st-picker-popup": PickerPopup;
  }
}
