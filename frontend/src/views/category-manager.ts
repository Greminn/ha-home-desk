import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { safeCustomElement } from "../define";
import { sharedStyles } from "../styles";
import type { Category } from "../types";
import type { HaClient } from "../ha-client";

interface Draft {
  id: string | null; // null = a new category
  name: string;
  icon: string;
}

/**
 * The categories page, laid out like the labels page: a searchable list with icon, name and ticket count, a
 * delete button per row, and a "Create Category" button that opens the New Category dialog. The built-in Home
 * Assistant category is locked. A category says what part of the home a ticket is about.
 */
@safeCustomElement("st-category-manager")
export class CategoryManager extends LitElement {
  static override styles = [
    sharedStyles,
    css`
      :host {
        position: relative;
        display: flex;
        flex-direction: column;
        flex: 1;
        min-height: 0;
        background: var(--st-surface);
      }
      .toolbar {
        flex: none;
        display: flex;
        align-items: center;
        height: 56px;
        box-sizing: border-box;
        padding: 0 16px;
        background: var(--st-bg);
        border-bottom: 1px solid var(--st-divider);
      }
      .search {
        flex: 1;
        position: relative;
        display: flex;
        align-items: center;
      }
      .search ha-icon {
        position: absolute;
        left: 8px;
        --mdc-icon-size: 18px;
        color: var(--st-fg-secondary);
        pointer-events: none;
      }
      .search input {
        width: 100%;
        height: var(--st-h-bar);
        padding: 0 8px 0 34px;
        border: 1px solid var(--st-field-outline);
        border-radius: var(--st-r-bar);
        background: var(--card-background-color, var(--st-surface));
        transition: border-color 250ms ease-in-out;
      }
      .search input:hover {
        border-color: var(--st-field-outline-hover);
      }
      .search input:focus {
        outline: none;
        border-color: var(--st-accent);
      }
      .list {
        flex: 1;
        overflow-y: auto;
        padding-bottom: 88px;
      }
      .head,
      .row {
        display: grid;
        grid-template-columns: 56px 40px minmax(0, 1fr) 88px 56px;
        align-items: center;
        padding: 0 8px 0 8px;
      }
      .head {
        height: 56px;
        border-bottom: 1px solid var(--st-divider);
        font-size: var(--st-fs-small);
        font-weight: 500;
        color: var(--st-fg-secondary);
      }
      .head span:nth-child(3) {
        color: var(--st-fg);
      }
      .row {
        position: relative;
        width: 100%;
        min-height: 56px;
        height: auto;
        padding-top: 8px;
        padding-bottom: 8px;
        border-radius: 0;
        border-bottom: 1px solid var(--st-divider);
        text-align: left;
        color: var(--st-fg);
        font-weight: 400;
        font-size: var(--st-fs-body);
        cursor: pointer;
      }
      .row.locked {
        cursor: default;
      }
      .row .ico {
        display: flex;
        justify-content: center;
        color: var(--st-fg-secondary);
      }
      .row .ico ha-icon {
        --mdc-icon-size: 24px;
      }
      .text {
        min-width: 0;
        padding: 0 8px;
      }
      .text .name {
        font-size: var(--st-fs-body);
      }
      .text .desc {
        line-height: 1.4;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: var(--st-fs-small);
        color: var(--st-fg-secondary);
      }
      .count {
        font-size: var(--st-fs-small);
        color: var(--st-fg-secondary);
        text-align: right;
        padding-right: 8px;
      }
      .end {
        display: flex;
        justify-content: center;
        position: relative;
        color: var(--st-fg-secondary);
      }
      .end button.icon {
        width: 40px;
        height: 40px;
      }
      .empty {
        padding: 48px 24px;
        text-align: center;
        color: var(--st-fg-secondary);
      }
      .fab {
        position: absolute;
        right: 16px;
        bottom: 16px;
        z-index: 3;
        height: 48px;
        padding: 0 20px 0 16px;
        gap: 12px;
        border-radius: 24px;
        font-weight: 500;
        background: var(--st-accent);
        color: var(--text-primary-color, #fff);
        box-shadow: var(--st-shadow-m);
      }
      .fab ha-icon {
        --mdc-icon-size: 24px;
      }
      .error {
        margin: 12px 16px 0;
        font-size: var(--st-fs-small);
        color: var(--st-danger);
      }

      /* The New label / Edit label dialog, as HA draws it. */
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
        gap: 16px;
        width: min(560px, 100%);
        padding: 16px 24px 24px;
        border-radius: 28px;
        background: var(--st-surface);
        box-shadow: var(--st-shadow-l);
      }
      .dhead {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-left: -8px;
      }
      .dhead h2 {
        margin: 0;
        font-size: var(--st-fs-dialog);
        font-weight: 400;
      }
      .field {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 56px;
        padding: 6px 16px 0;
        border-radius: 4px 4px 0 0;
        border-bottom: 1px solid var(--ha-color-border-neutral-loud, var(--st-fg-secondary));
        background: var(--ha-color-form-background, color-mix(in srgb, var(--st-fg) 12%, transparent));
        transition: background-color 250ms ease-in-out;
      }
      .field:hover {
        background: var(--ha-color-form-background-hover, color-mix(in srgb, var(--st-fg) 16%, transparent));
      }
      .field:focus-within {
        border-bottom: 2px solid var(--st-accent);
      }
      .field label {
        font-size: var(--ha-font-size-xs, 10px);
        font-weight: 400;
        color: var(--st-fg-secondary);
      }
      .field:focus-within label {
        color: var(--st-accent);
      }
      .field input,
      .field textarea {
        width: 100%;
        height: 28px;
        padding: 0;
        border: none;
        border-radius: 0;
        background: transparent;
        font-size: var(--st-fs-field);
        outline: none;
      }
      .field textarea {
        height: auto;
        min-height: 56px;
        resize: vertical;
      }
      /* Fields with a leading icon or swatch, a clear button and a caret, as HA's pickers. */
      .field.lead {
        flex-direction: row;
        align-items: center;
        gap: 12px;
        padding: 0 8px 0 12px;
      }
      .field.lead:focus-within {
        border-bottom: 2px solid var(--st-accent);
      }
      .field .lead-ico {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        flex: none;
        color: var(--st-fg-secondary);
      }
      .field .lead-ico ha-icon {
        --mdc-icon-size: 24px;
      }
      .field .body {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 6px 0 0;
      }
      .field button.body.pick {
        height: auto;
        min-height: 56px;
        padding: 6px 0 0;
        border-radius: 0;
        align-items: flex-start;
        gap: 0;
        color: var(--st-fg);
        font-weight: 400;
      }
      .field .val {
        font-size: var(--st-fs-field);
        height: 28px;
        line-height: 28px;
      }
      .field .caret {
        --mdc-icon-size: 24px;
        flex: none;
        color: var(--st-fg-secondary);
        pointer-events: none;
      }
      .field button.clear {
        width: 40px;
        height: 40px;
        color: var(--st-fg-secondary);
      }
      .field.plain {
        padding: 0;
        background: transparent;
        border: none;
      }
      .dactions {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 16px;
      }
      .dactions .grow {
        flex: 1;
      }
      /* HA's dialog buttons: text buttons, and fully rounded filled ones. */
      button.textbtn {
        height: 40px;
        padding: 0 var(--ha-space-4, 16px);
        border-radius: var(--st-r-pill);
        font-weight: var(--ha-font-weight-medium, 500);
      }
      button.textbtn.danger {
        color: var(--st-danger);
      }
      button.textbtn.danger:hover {
        background: color-mix(in srgb, var(--st-danger) 18%, transparent);
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
      button.pill.remove {
        background: color-mix(in srgb, var(--st-danger) 75%, black);
        color: #fff;
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
      .scrim.top {
        z-index: 30;
      }
      /* HA: alert and confirmation dialogs are a fixed 320px. */
      .dialog.confirm {
        gap: 0;
        padding: 24px;
        width: min(320px, 100%);
      }
      .dialog.confirm h2 {
        margin: 0 0 16px;
        font-size: var(--ha-font-size-2xl, 24px);
        font-weight: 400;
      }
      .dialog.confirm p {
        margin: 0 0 8px;
        font-size: var(--st-fs-row);
        line-height: 1.5;
      }
      /* Categories have no colour column. */
      .head,
      .row {
        grid-template-columns: 56px minmax(0, 1fr) 88px 56px;
      }
    `,
  ];

  @property({ attribute: false }) client!: HaClient;
  @property({ attribute: false }) categories: Category[] = [];

  @state() private _q = "";
  @state() private _draft: Draft | null = null;
  /** What the open dialog started as, so Update is only enabled once something changed. */
  @state() private _orig: Draft | null = null;
  @state() private _shake = false;
  /** The category waiting on a "Remove Category?" confirmation. */
  @state() private _toRemove: Category | null = null;
  @state() private _error = "";

  private _fire(name: string) {
    this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true }));
  }

  private _message(err: unknown): string {
    return err && typeof err === "object" && "message" in err ? String((err as { message: unknown }).message) : String(err);
  }

  private get _shown(): Category[] {
    const q = this._q.trim().toLowerCase();
    return q ? this.categories.filter((c) => c.name.toLowerCase().includes(q)) : this.categories;
  }

  private get _dirty(): boolean {
    const d = this._draft;
    const o = this._orig;
    return !!d && !!o && (d.name !== o.name || d.icon !== o.icon);
  }

  private _open(category: Category | null) {
    this._error = "";
    this._draft = category ? { id: category.id, name: category.name, icon: category.icon } : { id: null, name: "", icon: "" };
    this._orig = this._draft;
  }

  private async _save() {
    const d = this._draft;
    if (!d || !d.name.trim()) return;
    try {
      const fields = { name: d.name.trim(), icon: d.icon.trim() };
      if (d.id) await this.client.updateCategory(d.id, fields);
      else await this.client.createCategory(fields);
      this._draft = null;
      this._fire("categories-changed");
    } catch (err) {
      this._error = this._message(err);
    }
  }

  /** Esc or a click outside: HA won't discard a form with changes (it shakes instead). */
  private _tryClose() {
    if (this._toRemove) return;
    if (this._dirty || (this._draft && !this._draft.id && (this._draft.name || this._draft.icon))) {
      this._shake = true;
      window.setTimeout(() => (this._shake = false), 400);
      return;
    }
    this._draft = null;
  }

  private async _remove() {
    const category = this._toRemove;
    if (!category) return;
    try {
      await this.client.deleteCategory(category.id);
      this._toRemove = null;
      this._draft = null;
      this._fire("categories-changed");
    } catch (err) {
      this._toRemove = null;
      this._error = this._message(err);
    }
  }

  private _row(c: Category) {
    return html`<div class="row ${c.builtin ? "locked" : ""}" role="row" @click=${() => !c.builtin && this._open(c)}>
      <span class="ico"><ha-icon .icon=${c.icon || "mdi:shape-outline"}></ha-icon></span>
      <div class="text"><div class="name">${c.name}</div></div>
      <span class="count">${c.count} ticket${c.count === 1 ? "" : "s"}</span>
      <span class="end" @click=${(e: Event) => e.stopPropagation()}>
        ${c.builtin
          ? html`<ha-icon icon="mdi:lock-outline" title="Built in: can't be changed or deleted"></ha-icon>`
          : html`<button class="icon" title="Delete Category" aria-label="Delete ${c.name}" @click=${() => (this._toRemove = c)}><ha-icon icon="mdi:delete-outline"></ha-icon></button>`}
      </span>
    </div>`;
  }

  private _dialog(d: Draft) {
    const iconPicker = customElements.get("ha-icon-picker");
    const title = d.id ? this._orig?.name ?? d.name : "New Category";
    return html`<div class="scrim" @click=${(e: Event) => e.target === e.currentTarget && this._tryClose()}
      @keydown=${(e: KeyboardEvent) => e.key === "Escape" && this._tryClose()}>
      <div class="dialog ${this._shake ? "shake" : ""}" role="dialog" aria-modal="true" aria-label=${title}>
        <div class="dhead">
          <button class="icon" title="Close" @click=${() => (this._draft = null)}><ha-icon icon="mdi:close"></ha-icon></button>
          <h2>${title}</h2>
        </div>
        <div class="field">
          <label for="cn">Name*</label>
          <input id="cn" type="text" autofocus .value=${d.name}
            @input=${(e: Event) => (this._draft = { ...d, name: (e.target as HTMLInputElement).value })}
            @keydown=${(e: KeyboardEvent) => e.key === "Enter" && void this._save()} />
        </div>
        ${iconPicker
          ? html`<div class="field plain"><ha-icon-picker .label=${"Icon"} .value=${d.icon}
              @value-changed=${(e: CustomEvent<{ value: string }>) => (this._draft = { ...d, icon: e.detail.value ?? "" })}></ha-icon-picker></div>`
          : html`<div class="field lead">
              ${d.icon ? html`<ha-icon class="lead-ico" .icon=${d.icon}></ha-icon>` : html`<span class="lead-ico"></span>`}
              <div class="body">
                <label for="ci">Icon</label>
                <input id="ci" type="text" placeholder="mdi:lan" .value=${d.icon}
                  @input=${(e: Event) => (this._draft = { ...d, icon: (e.target as HTMLInputElement).value })} />
              </div>
              ${d.icon ? html`<button class="icon clear" title="Clear" @click=${() => (this._draft = { ...d, icon: "" })}><ha-icon icon="mdi:close"></ha-icon></button>` : nothing}
              <ha-icon class="caret" icon="mdi:menu-down"></ha-icon>
            </div>`}
        ${this._error ? html`<div class="error">${this._error}</div>` : nothing}
        <div class="dactions">
          ${d.id ? html`<button class="textbtn danger" @click=${() => (this._toRemove = this.categories.find((x) => x.id === d.id) ?? null)}>Delete</button>` : nothing}
          <span class="grow"></span>
          <button class="pill primary" ?disabled=${!d.name.trim() || (d.id !== null && !this._dirty)} @click=${() => void this._save()}>${d.id ? "Update" : "Create"}</button>
        </div>
      </div>
    </div>`;
  }

  private _confirm(c: Category) {
    return html`<div class="scrim top" @click=${(e: Event) => e.target === e.currentTarget && (this._toRemove = null)}
      @keydown=${(e: KeyboardEvent) => e.key === "Escape" && (this._toRemove = null)}>
      <div class="dialog confirm" role="alertdialog" aria-modal="true" aria-label="Remove Category?">
        <h2>Remove Category?</h2>
        <p>Are you sure you want to remove category ${c.name}? ${c.count
          ? `${c.count} ticket${c.count === 1 ? "" : "s"} will have no category.`
          : "No tickets use it."}</p>
        <div class="dactions">
          <span class="grow"></span>
          <button class="textbtn" @click=${() => (this._toRemove = null)}>Cancel</button>
          <button class="pill remove" @click=${() => void this._remove()}>Remove</button>
        </div>
      </div>
    </div>`;
  }

  override render() {
    const shown = this._shown;
    return html`
      <div class="toolbar">
        <div class="search">
          <ha-icon icon="mdi:magnify"></ha-icon>
          <input type="search" placeholder="Search" aria-label="Search categories" .value=${this._q}
            @input=${(e: Event) => (this._q = (e.target as HTMLInputElement).value)} />
        </div>
      </div>
      <div class="list">
        <div class="head"><span></span><span>Name</span><span></span><span></span></div>
        ${shown.length ? shown.map((c) => this._row(c)) : html`<div class="empty">No categories match.</div>`}
        ${this._error && !this._draft ? html`<div class="error">${this._error}</div>` : nothing}
      </div>
      <button class="fab" @click=${() => this._open(null)}><ha-icon icon="mdi:plus"></ha-icon>Create Category</button>
      ${this._draft ? this._dialog(this._draft) : nothing}
      ${this._toRemove ? this._confirm(this._toRemove) : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "st-category-manager": CategoryManager;
  }
}
