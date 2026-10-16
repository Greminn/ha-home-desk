import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";
import { safeCustomElement } from "../define";
import { sharedStyles } from "../styles";
import { PRIORITIES } from "../types";
import type { Category, Priority } from "../types";
import { PRIORITY_LABEL } from "../format";

/** What kind of ticket this is: a built-in label. A household user can pick the first three. */
const KINDS: { id: string; name: string; admin?: boolean }[] = [
  { id: "bug", name: "Bug" },
  { id: "enhancement", name: "Enhancement" },
  { id: "question", name: "Question" },
  { id: "task", name: "Task", admin: true },
];

/** "New Ticket" dialog, styled like HA's own dialogs. */
@safeCustomElement("st-new-ticket-dialog")
export class NewTicketDialog extends LitElement {
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
        width: min(560px, 100%);
        max-height: 100%;
        overflow-y: auto;
        padding: 24px;
        border-radius: 28px;
        background: var(--st-surface);
        box-shadow: var(--st-shadow-l);
      }
      h2 {
        margin: 0 0 16px;
        font-size: var(--st-fs-dialog);
        font-weight: 400;
      }
      label {
        display: block;
        margin-bottom: 4px;
        font-size: var(--st-fs-caption);
        color: var(--st-fg-secondary);
      }
      .field {
        margin-bottom: 16px;
      }
      .field input,
      .field textarea {
        width: 100%;
      }
      .pair {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }
      .pair select {
        width: 100%;
      }
      .actions {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        margin-top: 8px;
      }
    `,
  ];

  @property({ type: Boolean }) isAdmin = false;
  @property({ attribute: false }) categories: Category[] = [];
  @state() private _category = "";
  @state() private _title = "";
  @state() private _description = "";
  @state() private _kind = "bug";
  @state() private _priority: Priority = "normal";

  private _fire(name: string, detail?: unknown) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  private _submit() {
    if (!this._title.trim()) return;
    this._fire("create", {
      title: this._title.trim(),
      description: this._description,
      labels: [this._kind],
      priority: this._priority,
      ...(this.isAdmin && this._category ? { category: this._category } : {}),
    });
  }

  override render() {
    return html`
      <div class="scrim" @click=${(e: Event) => e.target === e.currentTarget && this._fire("close")}
        @keydown=${(e: KeyboardEvent) => e.key === "Escape" && this._fire("close")}>
        <div class="dialog" role="dialog" aria-modal="true" aria-label="New Ticket">
          <h2>New Ticket</h2>
          <div class="field">
            <label for="title">Title</label>
            <input id="title" type="text" autofocus .value=${this._title}
              @input=${(e: Event) => (this._title = (e.target as HTMLInputElement).value)}
              @keydown=${(e: KeyboardEvent) => e.key === "Enter" && this._submit()} />
          </div>
          <div class="field">
            <label for="desc">Description</label>
            <textarea id="desc" rows="6" .value=${this._description}
              @input=${(e: Event) => (this._description = (e.target as HTMLTextAreaElement).value)}></textarea>
          </div>
          <div class="pair field">
            <div>
              <label for="kind">Kind</label>
              <select id="kind" .value=${this._kind}
                @change=${(e: Event) => (this._kind = (e.target as HTMLSelectElement).value)}>
                ${KINDS.filter((k) => !k.admin || this.isAdmin).map((k) => html`<option value=${k.id} ?selected=${k.id === this._kind}>${k.name}</option>`)}
              </select>
            </div>
            ${this.isAdmin
              ? html`<div>
                  <label for="prio">Priority</label>
                  <select id="prio" .value=${this._priority}
                    @change=${(e: Event) => (this._priority = (e.target as HTMLSelectElement).value as Priority)}>
                    ${PRIORITIES.filter((p) => p !== "low").map((p) => html`<option value=${p} ?selected=${p === this._priority}>${PRIORITY_LABEL[p]}</option>`)}
                  </select>
                </div>`
              : ""}
          </div>
          ${this.isAdmin
            ? html`<div class="field">
                <label for="cat">Category</label>
                <select id="cat" .value=${this._category}
                  @change=${(e: Event) => (this._category = (e.target as HTMLSelectElement).value)}>
                  <option value="" ?selected=${!this._category}>No Category</option>
                  ${this.categories.map((c) => html`<option value=${c.id} ?selected=${c.id === this._category}>${c.name}</option>`)}
                </select>
              </div>`
            : ""}
          <div class="actions">
            <button @click=${() => this._fire("close")}>Cancel</button>
            <button class="primary" ?disabled=${!this._title.trim()} @click=${this._submit}>Create</button>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "st-new-ticket-dialog": NewTicketDialog;
  }
}
