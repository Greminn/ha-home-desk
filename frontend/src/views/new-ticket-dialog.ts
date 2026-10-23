import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { safeCustomElement } from "../define";
import "./ticket-things";
import "./picker-popup";
import { sharedStyles } from "../styles";
import type { Category, HomeAssistant, Priority } from "../types";
import { PRIORITY_LABEL } from "../format";
import type { PickerItem } from "./picker-popup";

/** What kind of ticket this is: a built-in label, with the icon the label has everywhere else. A household user can pick the first three. */
const KINDS: { id: string; name: string; icon: string; admin?: boolean }[] = [
  { id: "bug", name: "Bug", icon: "mdi:bug-outline" },
  { id: "enhancement", name: "Enhancement", icon: "mdi:lightbulb-on-outline" },
  { id: "question", name: "Question", icon: "mdi:help-circle-outline" },
  { id: "task", name: "Task", icon: "mdi:checkbox-marked-circle-outline", admin: true },
];

/** Home Assistant is the built-in category, and where most tickets belong, so a new ticket starts in it. */
const DEFAULT_CATEGORY = "home-assistant";

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
      /* Kind is a row of full-size pills, one picked; priority is two round icons beside Create, as in the comment box. */
      .kinds {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .kind {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        height: var(--st-h-bar);
        padding: 0 14px 0 10px;
        border: 1px solid var(--st-outline);
        border-radius: 999px;
        background: transparent;
        color: var(--st-fg);
        font-weight: 400;
        transition:
          background-color 150ms ease-in-out,
          color 150ms ease-in-out,
          border-color 150ms ease-in-out;
      }
      .kind ha-icon {
        --mdc-icon-size: 18px;
        color: var(--st-fg-secondary);
      }
      .kind:hover {
        background: color-mix(in srgb, var(--st-fg) 8%, transparent);
      }
      .kind[aria-checked="true"] {
        border-color: var(--st-accent);
        background: color-mix(in srgb, var(--st-accent) 16%, transparent);
        color: var(--st-accent);
      }
      .kind[aria-checked="true"] ha-icon {
        color: var(--st-accent);
      }
      .dots {
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      .dot {
        --c: var(--st-accent);
        --fg: #fff;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: var(--st-h-bar);
        height: var(--st-h-bar);
        padding: 0;
        border: 1px solid var(--st-outline);
        border-radius: 50%;
        background: color-mix(in srgb, var(--st-fg) 12%, transparent);
        color: var(--st-fg-secondary);
        transition:
          background-color 150ms ease-in-out,
          color 150ms ease-in-out,
          border-color 150ms ease-in-out;
      }
      .dot.high {
        --c: var(--st-warning);
        --fg: #000;
        color: var(--c);
      }
      .dot.urgent {
        --c: var(--st-danger);
        color: var(--c);
      }
      .dot:hover,
      .dot.on {
        background: var(--c);
        border-color: transparent;
        color: var(--fg);
      }
      .dot ha-icon {
        --mdc-icon-size: 18px;
      }
      /* The category looks like a field and opens the same search-and-pick popup the ticket's category pill uses. */
      .pick {
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
        height: 48px;
        padding: 0 12px;
        border: 1px solid var(--st-outline);
        background: transparent;
        color: var(--st-fg);
        font-weight: 400;
        text-align: left;
        justify-content: flex-start;
      }
      .pick ha-icon {
        --mdc-icon-size: 20px;
        color: var(--st-fg-secondary);
      }
      .pick .name {
        flex: 1;
      }
      .actions {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 8px;
        margin-top: 8px;
      }
      .actions .dots {
        margin-right: auto;
      }
    `,
  ];

  @property({ type: Boolean }) isAdmin = false;
  @property({ attribute: false }) categories: Category[] = [];
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _category = "";
  @state() private _categoryRect: DOMRect | null = null;
  @state() private _entities: string[] = [];
  @state() private _devices: string[] = [];
  @state() private _areas: string[] = [];
  @state() private _title = "";
  @state() private _description = "";
  @state() private _kind = "bug";
  @state() private _priority: Priority = "normal";

  override willUpdate(changed: Map<string, unknown>) {
    // Categories arrive after the dialog can open; start in Home Assistant unless someone has picked another.
    if (changed.has("categories") && !this._categoryTouched && this.categories.some((c) => c.id === DEFAULT_CATEGORY)) {
      this._category = DEFAULT_CATEGORY;
    }
  }
  private _categoryTouched = false;

  private get _categoryItems(): PickerItem[] {
    return [
      { id: "", primary: "No Category", icon: "mdi:shape-outline" },
      ...this.categories.map((c) => ({ id: c.id, primary: c.name, icon: c.icon || "mdi:shape-outline" })),
    ];
  }

  private _kinds() {
    return html`<div class="field">
      <label id="kind-label">Kind</label>
      <div class="kinds" role="radiogroup" aria-labelledby="kind-label">
        ${KINDS.filter((k) => !k.admin || this.isAdmin).map((k) => html`<button class="kind" role="radio"
          aria-checked=${k.id === this._kind ? "true" : "false"} @click=${() => (this._kind = k.id)}>
          <ha-icon .icon=${k.icon}></ha-icon>${k.name}
        </button>`)}
      </div>
    </div>`;
  }

  private _priorityDots() {
    const icon = { high: "mdi:alert-outline", urgent: "mdi:alert" } as const;
    return html`<span class="dots" role="group" aria-label="Priority">
      ${(["high", "urgent"] as const).map((p) => {
        const on = this._priority === p;
        return html`<button class="dot ${p} ${on ? "on" : ""}" aria-pressed=${on ? "true" : "false"} aria-label=${PRIORITY_LABEL[p]}
          title=${on ? `Priority is ${PRIORITY_LABEL[p]}. Click to clear.` : `Set priority to ${PRIORITY_LABEL[p]}`}
          @click=${() => (this._priority = on ? "normal" : p)}><ha-icon .icon=${icon[p]}></ha-icon></button>`;
      })}
    </span>`;
  }

  private _categoryField() {
    const current = this.categories.find((c) => c.id === this._category);
    return html`<div class="field">
      <label id="cat-label">Category</label>
      <button class="pick" aria-labelledby="cat-label" aria-haspopup="listbox"
        @click=${(e: Event) => (this._categoryRect = (e.currentTarget as HTMLElement).getBoundingClientRect())}>
        <ha-icon .icon=${current?.icon || "mdi:shape-outline"}></ha-icon>
        <span class="name">${current?.name ?? "No Category"}</span>
        <ha-icon icon="mdi:menu-down"></ha-icon>
      </button>
      ${this._categoryRect
        ? html`<st-picker-popup .rect=${this._categoryRect} .items=${this._categoryItems} .value=${this._category} emptyLabel="Nothing matches"
            @close=${() => (this._categoryRect = null)}
            @pick=${(e: CustomEvent<{ id: string }>) => {
              this._category = e.detail.id;
              this._categoryTouched = true;
              this._categoryRect = null;
            }}></st-picker-popup>`
        : nothing}
    </div>`;
  }

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
      ...(this.isAdmin && this._entities.length ? { entities: this._entities } : {}),
      ...(this.isAdmin && this._devices.length ? { devices: this._devices } : {}),
      ...(this.isAdmin && this._areas.length ? { areas: this._areas } : {}),
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
          ${this._kinds()}
          ${this.isAdmin ? this._categoryField() : nothing}
          ${this.isAdmin
            ? html`<div class="field">
                <label>What is it about?</label>
                <st-ticket-things .hass=${this.hass} editable .entities=${this._entities} .devices=${this._devices} .areas=${this._areas}
                  @change=${(e: CustomEvent<{ entities: string[]; devices: string[]; areas: string[] }>) => {
                    this._entities = e.detail.entities;
                    this._devices = e.detail.devices;
                    this._areas = e.detail.areas;
                  }}></st-ticket-things>
              </div>`
            : ""}
          <div class="actions">
            ${this.isAdmin ? this._priorityDots() : nothing}
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
