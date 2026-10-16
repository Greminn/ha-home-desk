import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { safeCustomElement } from "../define";
import { sharedStyles } from "../styles";
import { TAG_COLORS } from "../types";
import type { Tag, TagColor } from "../types";
import type { HaClient } from "../ha-client";
import { tagColorCss } from "../format";

/** "Manage tags" dialog: rename, recolour, add and delete tags. The built-in Home Assistant tag is locked. */
@safeCustomElement("st-tag-manager")
export class TagManager extends LitElement {
  static override styles = [
    sharedStyles,
    css`
      .scrim {
        position: fixed;
        inset: 0;
        z-index: 20;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
        background: rgba(0, 0, 0, 0.32);
      }
      .dialog {
        display: flex;
        flex-direction: column;
        width: min(560px, 100%);
        max-height: min(720px, 100%);
        padding: 24px 0 16px;
        border-radius: 28px;
        background: var(--st-surface);
        box-shadow: 0 8px 28px rgba(0, 0, 0, 0.35);
      }
      h2 {
        margin: 0;
        padding: 0 24px 4px;
        font-size: 1.375rem;
        font-weight: 400;
      }
      .hint {
        margin: 0;
        padding: 0 24px 12px;
        font-size: var(--st-fs-small);
        color: var(--st-fg-secondary);
      }
      .rows {
        flex: 1;
        overflow-y: auto;
        border-top: 1px solid var(--st-divider);
        border-bottom: 1px solid var(--st-divider);
      }
      .row {
        display: grid;
        grid-template-columns: 32px minmax(0, 1fr) 84px 48px;
        align-items: center;
        gap: 12px;
        padding: 8px 16px 8px 24px;
        min-height: 56px;
      }
      .row + .row {
        border-top: 1px solid var(--st-divider);
      }
      .swatch {
        width: 28px;
        height: 28px;
        padding: 0;
        border-radius: 50%;
        background: var(--c);
        border: 2px solid color-mix(in srgb, var(--c) 50%, var(--st-surface));
      }
      .swatch:disabled {
        opacity: 1;
        cursor: default;
      }
      .name input {
        width: 100%;
      }
      .name .fixed {
        font-size: var(--st-fs-body);
      }
      .count {
        font-size: var(--st-fs-small);
        color: var(--st-fg-secondary);
        white-space: nowrap;
      }
      .lock {
        color: var(--st-fg-secondary);
        width: 48px;
        text-align: center;
      }
      button.icon {
        width: 40px;
        height: 40px;
      }
      .palette {
        grid-column: 1 / -1;
        display: grid;
        grid-template-columns: repeat(auto-fill, 32px);
        gap: 8px;
        padding: 4px 0 8px 44px;
      }
      .palette button {
        width: 28px;
        height: 28px;
        padding: 0;
        border-radius: 50%;
        background: var(--c);
        border: 2px solid transparent;
      }
      .palette button.selected {
        border-color: var(--st-fg);
      }
      .confirm {
        grid-column: 1 / -1;
        display: flex;
        align-items: center;
        gap: 8px;
        padding-left: 44px;
        font-size: var(--st-fs-small);
      }
      .confirm .grow {
        flex: 1;
      }
      .add {
        display: flex;
        gap: 8px;
        padding: 12px 24px 0;
      }
      .add input {
        flex: 1;
        min-width: 0;
      }
      .error {
        margin: 8px 24px 0;
        font-size: var(--st-fs-small);
        color: var(--st-danger);
      }
      .actions {
        display: flex;
        justify-content: flex-end;
        padding: 12px 24px 0;
      }
    `,
  ];

  @property({ attribute: false }) client!: HaClient;
  @property({ attribute: false }) tags: Tag[] = [];

  @state() private _newName = "";
  @state() private _error = "";
  @state() private _palette: string | null = null;
  @state() private _confirm: string | null = null;

  private _fire(name: string) {
    this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true }));
  }

  private async _run(fn: () => Promise<unknown>) {
    try {
      await fn();
      this._error = "";
      this._fire("tags-changed");
    } catch (err) {
      this._error =
        err && typeof err === "object" && "message" in err
          ? String((err as { message: unknown }).message)
          : String(err);
    }
  }

  private async _add() {
    const name = this._newName.trim();
    if (!name) return;
    await this._run(() => this.client.createTag(name));
    if (!this._error) this._newName = "";
  }

  private _rename(tag: Tag, e: Event) {
    const input = e.target as HTMLInputElement;
    const name = input.value.trim();
    if (!name || name === tag.name) {
      input.value = tag.name;
      return;
    }
    void this._run(() => this.client.updateTag(tag.id, { name })).then(() => {
      if (this._error) input.value = tag.name;
    });
  }

  private _recolor(tag: Tag, color: TagColor) {
    this._palette = null;
    void this._run(() => this.client.updateTag(tag.id, { color }));
  }

  private _delete(tag: Tag) {
    this._confirm = null;
    void this._run(() => this.client.deleteTag(tag.id));
  }

  override render() {
    return html`
      <div class="scrim" @click=${(e: Event) => e.target === e.currentTarget && this._fire("close")}
        @keydown=${(e: KeyboardEvent) => e.key === "Escape" && this._fire("close")}>
        <div class="dialog" role="dialog" aria-label="Manage tags">
          <h2>Manage tags</h2>
          <p class="hint">Tags group tickets by system or topic. Home Assistant is built in and can't be changed.</p>
          <div class="rows">
            ${this.tags.map((tag) => html`
              <div class="row">
                <button class="swatch" style="--c: ${tagColorCss(tag.color)}" ?disabled=${tag.builtin}
                  title=${tag.builtin ? "Built-in colour" : "Change colour"} aria-label="Colour of ${tag.name}"
                  @click=${() => (this._palette = this._palette === tag.id ? null : tag.id)}></button>
                <div class="name">
                  ${tag.builtin
                    ? html`<span class="fixed">${tag.name}</span>`
                    : html`<input type="text" .value=${tag.name} aria-label="Name of ${tag.name}"
                        @change=${(e: Event) => this._rename(tag, e)}
                        @keydown=${(e: KeyboardEvent) => e.key === "Enter" && (e.target as HTMLElement).blur()} />`}
                </div>
                <span class="count">${tag.count} ticket${tag.count === 1 ? "" : "s"}</span>
                ${tag.builtin
                  ? html`<span class="lock" title="Built in: can't be changed or deleted"><ha-icon icon="mdi:lock-outline"></ha-icon></span>`
                  : html`<button class="icon" title="Delete tag" @click=${() => (this._confirm = tag.id)}><ha-icon icon="mdi:delete-outline"></ha-icon></button>`}
                ${this._palette === tag.id
                  ? html`<div class="palette">
                      ${TAG_COLORS.map((c) => html`<button style="--c: ${tagColorCss(c)}" class=${c === tag.color ? "selected" : ""}
                        title=${c.replace("-", " ")} aria-label=${c} @click=${() => this._recolor(tag, c)}></button>`)}
                    </div>`
                  : nothing}
                ${this._confirm === tag.id
                  ? html`<div class="confirm">
                      <span class="grow">${tag.count ? `Remove “${tag.name}” from ${tag.count} ticket${tag.count === 1 ? "" : "s"} and delete it?` : `Delete “${tag.name}”?`}</span>
                      <button @click=${() => (this._confirm = null)}>Cancel</button>
                      <button class="danger" @click=${() => this._delete(tag)}>Delete</button>
                    </div>`
                  : nothing}
              </div>`)}
          </div>
          <div class="add">
            <input type="text" placeholder="New tag" .value=${this._newName}
              @input=${(e: Event) => (this._newName = (e.target as HTMLInputElement).value)}
              @keydown=${(e: KeyboardEvent) => e.key === "Enter" && void this._add()} />
            <button class="primary" ?disabled=${!this._newName.trim()} @click=${() => void this._add()}>Add tag</button>
          </div>
          ${this._error ? html`<div class="error">${this._error}</div>` : nothing}
          <div class="actions"><button @click=${() => this._fire("close")}>Done</button></div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "st-tag-manager": TagManager;
  }
}
