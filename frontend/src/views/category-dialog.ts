import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { safeCustomElement } from "../define";
import { sharedStyles } from "../styles";

/**
 * "New Category", as HA's category dialog: a name and an icon, nothing else. Fires `create` with
 * {name, icon} and `close`. A dialog with something typed in it won't close on Esc or a click outside
 * (it shakes instead), as in HA.
 */
@safeCustomElement("st-category-dialog")
export class CategoryDialog extends LitElement {
  static override styles = [
    sharedStyles,
    css`
      .scrim {
        position: fixed;
        inset: 0;
        z-index: 30;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
        background: rgba(0, 0, 0, 0.32);
      }
      .dialog {
        display: flex;
        flex-direction: column;
        gap: 16px;
        width: min(560px, 100%);
        box-sizing: border-box;
        padding: 16px 24px 24px;
        border-radius: var(--ha-border-radius-4xl, 28px);
        background: var(--st-surface);
        box-shadow: var(--st-shadow-l);
      }
      .dialog.shake {
        animation: shake 0.4s;
      }
      @keyframes shake {
        20% { transform: translateX(-8px); }
        40% { transform: translateX(8px); }
        60% { transform: translateX(-5px); }
        80% { transform: translateX(5px); }
      }
      @media (prefers-reduced-motion: reduce) {
        .dialog.shake { animation: none; }
      }
      .head {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-left: -8px;
      }
      h2 {
        margin: 0;
        font-size: var(--st-fs-dialog);
        font-weight: 400;
      }
      .field {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 56px;
        padding: 6px 16px 0;
        border-radius: 4px 4px 0 0;
        border-bottom: 1px solid var(--ha-color-border-neutral-loud, var(--st-fg-secondary));
        background: var(--ha-color-form-background, color-mix(in srgb, var(--st-fg) 12%, transparent));
      }
      .field:hover {
        background: var(--ha-color-form-background-hover, color-mix(in srgb, var(--st-fg) 16%, transparent));
      }
      .field:focus-within {
        border-bottom: 2px solid var(--st-accent);
      }
      .field label {
        font-size: var(--ha-font-size-xs, 10px);
        color: var(--st-fg-secondary);
      }
      .field:focus-within label {
        color: var(--st-accent);
      }
      .field input {
        width: 100%;
        height: 28px;
        padding: 0;
        border: none;
        border-radius: 0;
        background: transparent;
        font-size: var(--st-fs-field);
        outline: none;
      }
      .field.icon {
        flex-direction: row;
        align-items: center;
        gap: 12px;
        padding-left: 12px;
      }
      .field.icon .body {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding-top: 6px;
      }
      .field.icon ha-icon {
        --mdc-icon-size: 24px;
        width: 28px;
        color: var(--st-fg-secondary);
      }
      .error {
        font-size: var(--st-fs-small);
        color: var(--st-danger);
      }
      .actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 8px;
      }
      button.pill {
        height: 40px;
        padding: 0 var(--ha-space-4, 16px);
        border-radius: var(--st-r-pill);
        font-weight: var(--ha-font-weight-medium, 500);
      }
      button.pill:disabled {
        opacity: 1;
        cursor: default;
        color: color-mix(in srgb, var(--st-fg) 38%, transparent);
        background: color-mix(in srgb, var(--st-fg) 12%, transparent);
      }
    `,
  ];

  /** A name to start with (what was typed in the picker's search box). */
  @property() name = "";
  /** Set by the panel when saving failed (for example the name is taken). */
  @property() error = "";
  @state() private _name = "";
  @state() private _icon = "";
  @state() private _shake = false;

  override connectedCallback() {
    super.connectedCallback();
    this._name = this.name;
  }

  private _fire(name: string, detail?: unknown) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  /** Esc or a click outside: not while there is something typed in (HA shakes the dialog instead). */
  private _tryClose() {
    if (this._name.trim() || this._icon.trim()) {
      this._shake = true;
      window.setTimeout(() => (this._shake = false), 400);
    } else this._fire("close");
  }

  private _create() {
    if (this._name.trim()) this._fire("create", { name: this._name.trim(), icon: this._icon.trim() });
  }

  override firstUpdated() {
    this.renderRoot.querySelector<HTMLInputElement>("#name")?.focus();
  }

  override render() {
    return html`<div class="scrim" @click=${(e: Event) => e.target === e.currentTarget && this._tryClose()}
      @keydown=${(e: KeyboardEvent) => e.key === "Escape" && this._tryClose()}>
      <div class="dialog ${this._shake ? "shake" : ""}" role="dialog" aria-label="New Category">
        <div class="head">
          <button class="icon" title="Close" @click=${() => this._fire("close")}><ha-icon icon="mdi:close"></ha-icon></button>
          <h2>New Category</h2>
        </div>
        <div class="field">
          <label for="name">Name*</label>
          <input id="name" type="text" .value=${this._name}
            @input=${(e: Event) => (this._name = (e.target as HTMLInputElement).value)}
            @keydown=${(e: KeyboardEvent) => e.key === "Enter" && this._create()} />
        </div>
        <div class="field icon">
          ${this._icon ? html`<ha-icon .icon=${this._icon}></ha-icon>` : html`<ha-icon icon="mdi:tag-outline"></ha-icon>`}
          <div class="body">
            <label for="icon">Icon</label>
            <input id="icon" type="text" placeholder="mdi:lan" .value=${this._icon}
              @input=${(e: Event) => (this._icon = (e.target as HTMLInputElement).value)} />
          </div>
        </div>
        ${this.error ? html`<div class="error">${this.error}</div>` : nothing}
        <div class="actions">
          <button class="pill primary" ?disabled=${!this._name.trim()} @click=${this._create}>Create</button>
        </div>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "st-category-dialog": CategoryDialog;
  }
}
