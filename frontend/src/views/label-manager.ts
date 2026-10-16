import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { safeCustomElement } from "../define";
import { sharedStyles } from "../styles";
import { LABEL_COLORS } from "../types";
import type { Label, LabelColor } from "../types";
import type { HaClient } from "../ha-client";
import { colorName, labelColorCss } from "../format";

interface Draft {
  id: string | null; // null = a new label
  name: string;
  icon: string;
  color: LabelColor | "";
  description: string;
}

/**
 * The labels page, laid out like Home Assistant's own (Settings > Areas, labels & zones > Labels):
 * a searchable list with icon, colour, name and description, a menu per row, and a
 * "Create Label" button that opens the New label dialog. Built-in labels are locked.
 */
@safeCustomElement("st-label-manager")
export class LabelManager extends LitElement {
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
      /* HA's renderLabelColorBadge: 20px, 8px corners, 1px outline. */
      .swatch {
        box-sizing: border-box;
        width: var(--ha-space-5, 20px);
        height: var(--ha-space-5, 20px);
        border-radius: var(--ha-border-radius-md, 8px);
        border: 1px solid var(--st-outline);
        background: var(--c);
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
      .dot {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: var(--c);
        flex: none;
      }
      .dot.big {
        width: 28px;
        height: 28px;
      }
      .colors {
        position: absolute;
        z-index: 25;
        left: 0;
        right: 0;
        top: 100%;
        max-height: 320px;
        overflow-y: auto;
        padding: 12px 8px 8px;
        border-radius: 4px;
        background: var(--st-surface);
        box-shadow: var(--st-shadow-m);
        outline: 1px solid var(--st-divider);
      }
      .colors .csearch {
        position: relative;
        display: flex;
        align-items: center;
        margin: 0 8px 8px;
      }
      .colors .csearch ha-icon {
        position: absolute;
        left: 10px;
        color: var(--st-fg-secondary);
      }
      .colors .csearch input {
        width: 100%;
        height: 40px;
        padding: 0 12px 0 40px;
        border: 1px solid var(--st-accent);
        border-radius: var(--st-r-bar);
        background: transparent;
      }
      .colors button.opt {
        width: 100%;
        height: 48px;
        padding: 0 16px;
        gap: 16px;
        border-radius: 0;
        justify-content: flex-start;
        color: var(--st-fg);
        font-size: var(--st-fs-field);
        font-weight: 400;
      }
      .colors button.opt.selected {
        color: var(--st-accent);
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
    `,
  ];

  @property({ attribute: false }) client!: HaClient;
  @property({ attribute: false }) labels: Label[] = [];

  @state() private _q = "";
  @state() private _draft: Draft | null = null;
  /** What the open dialog started as, so Update is only enabled once something changed. */
  @state() private _orig: Draft | null = null;
  @state() private _shake = false;
  /** The label waiting on a "Remove Label?" confirmation. */
  @state() private _toRemove: Label | null = null;
  @state() private _colorsOpen = false;
  @state() private _colorQ = "";
  @state() private _error = "";

  private _fire(name: string) {
    this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true }));
  }

  private _message(err: unknown): string {
    return err && typeof err === "object" && "message" in err ? String((err as { message: unknown }).message) : String(err);
  }

  private get _shown(): Label[] {
    const q = this._q.trim().toLowerCase();
    return q
      ? this.labels.filter((l) => l.name.toLowerCase().includes(q) || l.description.toLowerCase().includes(q))
      : this.labels;
  }

  private _open(label: Label | null) {
    this._error = "";
    this._colorsOpen = false;
    this._draft = label
      ? { id: label.id, name: label.name, icon: label.icon, color: label.color, description: label.description }
      : { id: null, name: "", icon: "", color: "", description: "" };
    this._orig = this._draft;
  }

  private async _save() {
    const d = this._draft;
    if (!d || !d.name.trim()) return;
    try {
      if (d.id) {
        await this.client.updateLabel(d.id, {
          name: d.name.trim(),
          icon: d.icon.trim(),
          description: d.description,
          ...(d.color ? { color: d.color } : {}),
        });
      } else {
        await this.client.createLabel({
          name: d.name.trim(),
          icon: d.icon.trim(),
          description: d.description,
          ...(d.color ? { color: d.color } : {}),
        });
      }
      this._draft = null;
      this._fire("labels-changed");
    } catch (err) {
      this._error = this._message(err);
    }
  }

  /** Esc or a click outside: HA won't discard a form with changes (it shakes instead). */
  private _tryClose() {
    if (this._toRemove) return;
    if (this._dirty) {
      this._shake = true;
      window.setTimeout(() => (this._shake = false), 400);
      return;
    }
    this._draft = null;
  }

  private get _dirty(): boolean {
    const d = this._draft;
    const o = this._orig;
    if (!d || !o) return false;
    return d.name !== o.name || d.icon !== o.icon || d.color !== o.color || d.description !== o.description;
  }

  private async _remove() {
    const label = this._toRemove;
    if (!label) return;
    try {
      await this.client.deleteLabel(label.id);
      this._toRemove = null;
      this._draft = null;
      this._fire("labels-changed");
    } catch (err) {
      this._toRemove = null;
      this._error = this._message(err);
    }
  }

  private _row(l: Label) {
    return html`<div class="row ${l.builtin ? "locked" : ""}" role="row"
      @click=${() => !l.builtin && this._open(l)}>
      <span class="ico"><ha-icon .icon=${l.icon || "mdi:label-outline"}></ha-icon></span>
      <span class="swatch" style="--c: ${labelColorCss(l.color)}"></span>
      <div class="text">
        <div class="name">${l.name}</div>
        ${l.description ? html`<div class="desc" title=${l.description}>${l.description}</div>` : nothing}
      </div>
      <span class="count">${l.count} ticket${l.count === 1 ? "" : "s"}</span>
      <span class="end" @click=${(e: Event) => e.stopPropagation()}>
        ${l.builtin
          ? html`<ha-icon icon="mdi:lock-outline" title="Built in: can't be changed or deleted"></ha-icon>`
          : html`<button class="icon" title="Delete Label" aria-label="Delete ${l.name}" @click=${() => (this._toRemove = l)}><ha-icon icon="mdi:delete-outline"></ha-icon></button>`}
      </span>
    </div>`;
  }

  private _dialog(d: Draft) {
    const colorLabel = d.color ? colorName(d.color) : "";
    const iconPicker = customElements.get("ha-icon-picker");
    const q = this._colorQ.trim().toLowerCase();
    const title = d.id ? this._orig?.name ?? d.name : "New Label";
    return html`<div class="scrim" @click=${(e: Event) => e.target === e.currentTarget && this._tryClose()}
      @keydown=${(e: KeyboardEvent) => e.key === "Escape" && this._tryClose()}>
      <div class="dialog ${this._shake ? "shake" : ""}" role="dialog" aria-modal="true" aria-label=${title}>
        <div class="dhead">
          <button class="icon" title="Close" @click=${() => (this._draft = null)}><ha-icon icon="mdi:close"></ha-icon></button>
          <h2>${title}</h2>
        </div>
        <div class="field">
          <label for="ln">Name*</label>
          <input id="ln" type="text" autofocus .value=${d.name}
            @input=${(e: Event) => (this._draft = { ...d, name: (e.target as HTMLInputElement).value })}
            @keydown=${(e: KeyboardEvent) => e.key === "Enter" && void this._save()} />
        </div>
        ${iconPicker
          ? html`<div class="field plain"><ha-icon-picker .label=${"Icon"} .value=${d.icon}
              @value-changed=${(e: CustomEvent<{ value: string }>) => (this._draft = { ...d, icon: e.detail.value ?? "" })}></ha-icon-picker></div>`
          : html`<div class="field lead">
              ${d.icon ? html`<ha-icon class="lead-ico" .icon=${d.icon}></ha-icon>` : html`<span class="lead-ico"></span>`}
              <div class="body">
                <label for="li">Icon</label>
                <input id="li" type="text" .value=${d.icon}
                  @input=${(e: Event) => (this._draft = { ...d, icon: (e.target as HTMLInputElement).value })} />
              </div>
              ${d.icon ? html`<button class="icon clear" title="Clear" @click=${() => (this._draft = { ...d, icon: "" })}><ha-icon icon="mdi:close"></ha-icon></button>` : nothing}
              <ha-icon class="caret" icon="mdi:menu-down"></ha-icon>
            </div>`}
        <div class="field lead">
          ${d.color ? html`<span class="lead-ico"><span class="dot" style="--c: ${labelColorCss(d.color)}"></span></span>` : html`<span class="lead-ico"></span>`}
          <button class="body pick" aria-haspopup="listbox" @click=${() => { this._colorsOpen = !this._colorsOpen; this._colorQ = ""; }}>
            <label>Colour</label>
            <span class="val">${colorLabel}</span>
          </button>
          ${d.color && !d.id ? html`<button class="icon clear" title="Clear" @click=${() => (this._draft = { ...d, color: "" })}><ha-icon icon="mdi:close"></ha-icon></button>` : nothing}
          <ha-icon class="caret" icon="mdi:menu-down"></ha-icon>
          ${this._colorsOpen
            ? html`<div class="colors" role="listbox">
                <div class="csearch"><ha-icon icon="mdi:magnify"></ha-icon>
                  <input type="search" placeholder="Search" autofocus .value=${this._colorQ}
                    @input=${(e: Event) => (this._colorQ = (e.target as HTMLInputElement).value)} /></div>
                ${LABEL_COLORS.filter((c) => !q || colorName(c).toLowerCase().includes(q)).map(
                  (c) => html`<button class="opt ${c === d.color ? "selected" : ""}" role="option"
                    @click=${() => { this._draft = { ...d, color: c }; this._colorsOpen = false; }}>
                    <span class="dot big" style="--c: ${labelColorCss(c)}"></span>${colorName(c)}
                  </button>`,
                )}
              </div>`
            : nothing}
        </div>
        <div class="field">
          <label for="ld">Description</label>
          <textarea id="ld" rows="3" .value=${d.description}
            @input=${(e: Event) => (this._draft = { ...d, description: (e.target as HTMLTextAreaElement).value })}></textarea>
        </div>
        ${this._error ? html`<div class="error">${this._error}</div>` : nothing}
        <div class="dactions">
          ${d.id ? html`<button class="textbtn danger" @click=${() => (this._toRemove = this.labels.find((x) => x.id === d.id) ?? null)}>Delete</button>` : nothing}
          <span class="grow"></span>
          <button class="pill primary" ?disabled=${!d.name.trim() || (d.id !== null && !this._dirty)} @click=${() => void this._save()}>${d.id ? "Update" : "Create"}</button>
        </div>
      </div>
    </div>`;
  }

  private _confirm(label: Label) {
    return html`<div class="scrim top" @click=${(e: Event) => e.target === e.currentTarget && (this._toRemove = null)}
      @keydown=${(e: KeyboardEvent) => e.key === "Escape" && (this._toRemove = null)}>
      <div class="dialog confirm" role="alertdialog" aria-modal="true" aria-label="Remove Label?">
        <h2>Remove Label?</h2>
        <p>Are you sure you want to remove label ${label.name}? ${label.count
          ? `It will be removed from ${label.count} ticket${label.count === 1 ? "" : "s"}.`
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
          <input type="search" placeholder="Search" aria-label="Search labels" .value=${this._q}
            @input=${(e: Event) => (this._q = (e.target as HTMLInputElement).value)} />
        </div>
      </div>
      <div class="list">
        <div class="head"><span></span><span></span><span>Name</span><span></span><span></span></div>
        ${shown.length ? shown.map((l) => this._row(l)) : html`<div class="empty">No labels match.</div>`}
        ${this._error && !this._draft ? html`<div class="error">${this._error}</div>` : nothing}
      </div>
      <button class="fab" @click=${() => this._open(null)}><ha-icon icon="mdi:plus"></ha-icon>Create Label</button>
      ${this._draft ? this._dialog(this._draft) : nothing}
      ${this._toRemove ? this._confirm(this._toRemove) : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "st-label-manager": LabelManager;
  }
}
