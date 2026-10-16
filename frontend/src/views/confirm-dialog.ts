import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import { safeCustomElement } from "../define";
import { sharedStyles } from "../styles";

/**
 * A confirmation, as HA draws one: a fixed 320px wide, a title, a sentence that says what will happen,
 * and only buttons (no close icon). Esc and a click outside cancel it. The action is a red button when
 * `danger` is set. Fires `confirm` or `cancel`.
 */
@safeCustomElement("st-confirm-dialog")
export class ConfirmDialog extends LitElement {
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
        width: min(320px, 100%);
        box-sizing: border-box;
        padding: 24px;
        border-radius: var(--ha-border-radius-4xl, 28px);
        background: var(--st-surface);
        box-shadow: var(--st-shadow-l);
      }
      h2 {
        margin: 0 0 16px;
        font-size: var(--ha-font-size-2xl, 24px);
        font-weight: 400;
      }
      p {
        margin: 0 0 24px;
        font-size: var(--st-fs-row);
        line-height: 1.5;
      }
      .actions {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
      }
      button {
        height: 40px;
        padding: 0 var(--ha-space-4, 16px);
        border-radius: var(--st-r-pill);
        font-weight: var(--ha-font-weight-medium, 500);
      }
      button.danger {
        background: color-mix(in srgb, var(--st-danger) 75%, black);
        color: #fff;
      }
    `,
  ];

  @property() heading = "";
  @property() body = "";
  @property() confirmLabel = "Confirm";
  @property({ type: Boolean }) danger = false;

  private _fire(name: string) {
    this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true }));
  }

  override firstUpdated() {
    this.renderRoot.querySelector<HTMLButtonElement>("button.primary")?.focus();
  }

  override render() {
    return html`<div class="scrim" @click=${(e: Event) => e.target === e.currentTarget && this._fire("cancel")}
      @keydown=${(e: KeyboardEvent) => e.key === "Escape" && this._fire("cancel")}>
      <div class="dialog" role="alertdialog" aria-label=${this.heading}>
        <h2>${this.heading}</h2>
        <p>${this.body}</p>
        <div class="actions">
          <button @click=${() => this._fire("cancel")}>Cancel</button>
          <button class="primary ${this.danger ? "danger" : ""}" @click=${() => this._fire("confirm")}>${this.confirmLabel}</button>
        </div>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "st-confirm-dialog": ConfirmDialog;
  }
}
