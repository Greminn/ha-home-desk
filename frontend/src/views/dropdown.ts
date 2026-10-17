import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { safeCustomElement } from "../define";
import { sharedStyles } from "../styles";

export interface DropdownOption {
  id: string;
  label: string;
}

/** An outlined button with a caret that opens a menu, like HA's "Group by" and "Sort by" controls. */
@safeCustomElement("st-dropdown")
export class Dropdown extends LitElement {
  static override styles = [
    sharedStyles,
    css`
      :host {
        position: relative;
        display: inline-block;
        min-width: 0;
      }
      button.dd {
        width: 100%;
        height: var(--st-h-bar);
        padding: 0 8px 0 var(--ha-space-4, 16px);
        gap: 4px;
        border: 1px solid var(--st-outline);
        border-radius: var(--st-r-pill);
        background: transparent;
        color: var(--st-fg);
        font-weight: 400;
        font-size: var(--st-fs-body);
        justify-content: space-between;
      }
      button.dd:hover {
        background-image: linear-gradient(var(--st-hover), var(--st-hover));
      }
      button.dd.active {
        color: var(--st-accent);
        border-color: var(--st-accent);
      }
      button.dd span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      button.dd ha-icon {
        --mdc-icon-size: 24px;
        flex: none;
        color: var(--st-fg-secondary);
      }
      .backdrop {
        position: fixed;
        inset: 0;
        z-index: 10;
        height: auto;
        padding: 0;
        border-radius: 0;
        background: transparent;
        cursor: default;
      }
      /* Fixed, placed from the button's position when it opens, so a card or pane with overflow hidden can't clip it. */
      .menu {
        position: fixed;
        z-index: 11;
        width: max-content;
        max-width: calc(100vw - 32px);
        max-height: 60vh;
        overflow-y: auto;
        padding: 8px 0;
        border-radius: 4px;
        background: var(--st-surface);
        box-shadow: var(--st-shadow-m);
        outline: 1px solid var(--st-divider);
      }
      .menu button {
        display: flex;
        width: auto;
        min-width: 100%;
        box-sizing: border-box;
        height: 44px;
        padding: 0 16px;
        border-radius: 0;
        justify-content: flex-start;
        color: var(--st-fg);
        font-weight: 400;
        font-size: var(--st-fs-body);
        white-space: nowrap;
      }
      .menu button.selected {
        color: var(--st-accent);
        background: color-mix(in srgb, var(--st-accent) 12%, transparent);
      }
    `,
  ];

  @property({ attribute: false }) options: DropdownOption[] = [];
  /** The selected option's id; "" is the "no filter" choice. */
  @property() value = "";
  @property() label = "";
  /** Shown on the button while nothing is chosen (the "any" option), e.g. "Priority". */
  @property() placeholder = "";
  /** A value picker (status, priority), not a filter: no highlight when something is chosen. */
  @property({ type: Boolean }) plain = false;
  /** Open the menu above the button instead of below it. */
  @property({ type: Boolean, reflect: true }) up = false;
  @state() private _open = false;
  /** Where the menu goes (viewport coordinates), worked out when it opens. */
  @state() private _at = "";

  private _toggle(e: Event) {
    if (this._open) {
      this._open = false;
      return;
    }
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const below = window.innerHeight - r.bottom;
    const up = this.up || (below < 260 && r.top > below);
    const room = Math.max(120, (up ? r.top : below) - 12);
    this._at = `left:${r.left}px;min-width:${r.width}px;max-height:${Math.min(room, window.innerHeight * 0.6)}px;${
      up ? `bottom:${window.innerHeight - r.top + 4}px` : `top:${r.bottom + 4}px`
    }`;
    this._open = true;
  }

  private _pick(id: string) {
    this._open = false;
    if (id === this.value) return;
    this.dispatchEvent(new CustomEvent("change", { detail: id, bubbles: true, composed: true }));
  }

  override render() {
    const current = this.options.find((o) => o.id === this.value) ?? this.options[0];
    return html`
      <button class="dd ${this.value && !this.plain ? "active" : ""}" aria-haspopup="listbox" aria-expanded=${this._open}
        aria-label=${this.label} @click=${(e: Event) => this._toggle(e)}
        @keydown=${(e: KeyboardEvent) => e.key === "Escape" && (this._open = false)}>
        <span>${!this.value && this.placeholder ? this.placeholder : current?.label ?? ""}</span><ha-icon icon="mdi:menu-down"></ha-icon>
      </button>
      ${this._open
        ? html`<button class="backdrop" tabindex="-1" aria-label="Close" @click=${() => (this._open = false)}></button>
            <div class="menu" role="listbox" style=${this._at} @keydown=${(e: KeyboardEvent) => e.key === "Escape" && (this._open = false)}>
              ${this.options.map((o) => html`<button role="option" aria-selected=${o.id === this.value}
                class=${o.id === this.value ? "selected" : ""} @click=${() => this._pick(o.id)}>${o.label}</button>`)}
            </div>`
        : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "st-dropdown": Dropdown;
  }
}
