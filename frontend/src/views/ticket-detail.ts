import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { safeCustomElement } from "../define";
import { sharedStyles } from "../styles";
import { PRIORITIES, STATUSES } from "../types";
import type { Priority, Status, Label, Ticket, TicketEvent, TicketPatch } from "../types";
import {
  PRIORITY_LABEL,
  STATUS_LABEL,
  actorIcon,
  actorName,
  fullTime,
  relativeTime,
  labelColorCss,
  labelOrUnknown,
} from "../format";
import { renderMarkdown } from "../markdown";

const LONG_DESCRIPTION = 1800;

/** Right-hand pane: one ticket with its controls, description and timeline. */
@safeCustomElement("st-ticket-detail")
export class TicketDetail extends LitElement {
  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        overflow-y: auto;
        overflow-x: hidden;
        /* Clearance so the page's floating "New ticket" button never covers the end of a ticket. */
        padding-bottom: 88px;
      }
      .wrap {
        min-width: 0;
        max-width: 1200px;
        margin: 0 auto;
        padding: 16px 24px 48px;
      }
      /* Conversation on the left, properties on the right (stacked on narrow screens). */
      .page {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 320px;
        gap: 24px;
        align-items: start;
      }
      .main {
        min-width: 0;
      }
      .side {
        position: sticky;
        top: 16px;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      @media (max-width: 900px) {
        .page {
          grid-template-columns: minmax(0, 1fr);
        }
        .side {
          position: static;
          order: -1;
        }
        .wrap {
          padding: 8px 16px 40px;
        }
      }
      .head {
        display: flex;
        align-items: flex-start;
        gap: 8px;
      }
      h1 {
        flex: 1;
        margin: 0;
        font-size: 1.375rem;
        font-weight: 400;
        line-height: 1.3;
        overflow-wrap: anywhere;
      }
      .title-input {
        flex: 1;
        height: 40px;
        font-size: var(--st-fs-title);
      }
      .sub {
        margin: 6px 0 16px;
        font-size: var(--st-fs-small);
        color: var(--st-fg-secondary);
      }
      .sub .who {
        --mdc-icon-size: 16px;
        vertical-align: text-bottom;
        margin: 0 2px;
      }
      .props {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 16px;
        border: 1px solid var(--st-divider);
        border-radius: var(--ha-card-border-radius, 12px);
        background: var(--st-surface);
      }
      .props label {
        display: block;
        margin-bottom: 4px;
        font-size: var(--st-fs-caption);
        color: var(--st-fg-secondary);
      }
      .props select,
      .props input {
        width: 100%;
      }
      .ro {
        font-size: var(--st-fs-body);
        line-height: var(--st-h-field);
      }
      .chips {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 6px;
        margin-bottom: 16px;
      }
      .chip {
        display: inline-flex;
        align-items: center;
        gap: 2px;
        height: 28px;
        padding: 0 10px;
        border-radius: 8px;
        font-size: var(--st-fs-small);
        font-weight: 400;
        color: var(--st-fg);
        background: color-mix(in srgb, var(--st-fg) 10%, transparent);
      }
      .label button {
        all: unset;
        display: inline-flex;
        cursor: pointer;
        margin-right: -6px;
        padding: 0 4px;
        color: var(--st-fg-secondary);
      }
      .label button ha-icon {
        --mdc-icon-size: 14px;
      }
      .chip.link {
        cursor: pointer;
        height: 28px;
      }
      .chips input {
        width: 120px;
        height: 28px;
        padding: 0 10px;
        border-radius: 8px;
        font-size: var(--st-fs-small);
      }
      .card {
        padding: 16px;
        margin-bottom: 16px;
        border: 1px solid var(--st-divider);
        border-radius: var(--ha-card-border-radius, 12px);
        background: var(--st-surface);
      }
      .card h3 {
        margin: 0 0 8px;
        font-size: var(--st-fs-caption);
        font-weight: 500;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--st-fg-secondary);
      }
      .card.resolution {
        border-left: 4px solid var(--st-success);
      }
      .clamp {
        max-height: 22em;
        overflow: hidden;
        -webkit-mask-image: linear-gradient(#000 70%, transparent);
        mask-image: linear-gradient(#000 70%, transparent);
      }
      .more {
        margin: 4px 0 0 -12px;
        height: 32px;
      }
      .entities {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 12px;
      }
      .entities code {
        font-family: var(--code-font-family, monospace);
        font-size: var(--st-fs-caption);
        padding: 2px 6px;
        border-radius: 4px;
        background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
      }
      .timeline {
        margin: 24px 0 16px;
        padding-left: 4px;
      }
      .timeline h2 {
        margin: 0 0 12px;
        font-size: var(--st-fs-title);
        font-weight: 500;
      }
      .ev {
        display: grid;
        grid-template-columns: 28px minmax(0, 1fr);
        gap: 12px;
        margin-bottom: 12px;
      }
      .ev > ha-icon {
        --mdc-icon-size: 24px;
        color: var(--st-fg-secondary);
        margin-top: 2px;
      }
      .ev.system > ha-icon {
        --mdc-icon-size: 16px;
        margin: 4px 4px 0;
      }
      .ev .who {
        font-size: var(--st-fs-small);
        color: var(--st-fg-secondary);
      }
      .ev .who b {
        font-weight: 500;
        color: var(--st-fg);
      }
      .ev .bubble {
        margin-top: 4px;
        padding: 10px 14px;
        border-radius: 12px;
        background: var(--st-surface);
        border: 1px solid var(--st-divider);
      }
      .ev .bubble.note {
        background: color-mix(in srgb, var(--st-warning) 14%, var(--st-surface));
        border-color: color-mix(in srgb, var(--st-warning) 45%, transparent);
      }
      .ev .label {
        margin-left: 6px;
        padding: 0 6px;
        border-radius: 6px;
        font-size: var(--st-fs-caption);
        background: color-mix(in srgb, var(--st-warning) 30%, transparent);
        color: var(--st-fg);
      }
      .composer textarea {
        width: 100%;
      }
      .composer .bar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
        margin-top: 8px;
      }
      .composer .bar .grow {
        flex: 1;
      }
      .composer label.inline {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: var(--st-fs-small);
        color: var(--st-fg-secondary);
      }
      .resolve-form {
        margin-top: 12px;
        padding-top: 12px;
        border-top: 1px solid var(--st-divider);
      }
      .empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        gap: 8px;
        color: var(--st-fg-secondary);
      }
      .empty ha-icon {
        --mdc-icon-size: 48px;
        opacity: 0.5;
      }
    `,
  ];

  @property({ attribute: false }) ticket: Ticket | null = null;
  @property({ type: Boolean }) isAdmin = false;
  @property({ type: Boolean }) narrow = false;
  @property() language: string | undefined = undefined;
  @property({ attribute: false }) assignees: string[] = [];
  @property({ attribute: false }) labelMap: Map<string, Label> = new Map();

  @state() private _editingTitle = false;
  @state() private _titleDraft = "";
  @state() private _expanded = false;
  @state() private _comment = "";
  @state() private _internal = false;
  @state() private _resolving = false;
  @state() private _resolution = "";
  @state() private _labelDraft = "";

  override willUpdate(changed: Map<string, unknown>) {
    if (changed.has("ticket")) {
      const prev = changed.get("ticket") as Ticket | null | undefined;
      if (prev?.id !== this.ticket?.id) {
        this._editingTitle = false;
        this._expanded = false;
        this._comment = "";
        this._internal = false;
        this._resolving = false;
        this._resolution = "";
        this._labelDraft = "";
      }
    }
  }

  private _fire(name: string, detail?: unknown) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  private _patch(patch: TicketPatch) {
    this._fire("patch-ticket", patch);
  }

  private _addLabel() {
    const typed = this._labelDraft.trim();
    this._labelDraft = "";
    if (!typed || !this.ticket) return;
    // The backend matches a typed name (any case) to an existing label, or creates a new one.
    const known = [...this.labelMap.values()].find((x) => x.name.toLowerCase() === typed.toLowerCase() || x.id === typed);
    if (known && this.ticket.labels.includes(known.id)) return;
    this._patch({ labels: [...this.ticket.labels, known ? known.id : typed] });
  }

  private _submitComment() {
    const body = this._comment.trim();
    if (!body) return;
    this._fire("comment", { body, internal: this._internal });
    this._comment = "";
  }

  private _submitResolve(status: "resolved" | "closed") {
    const resolution = this._resolution.trim();
    if (!resolution) return;
    this._fire("close-ticket", { resolution, status });
    this._resolving = false;
    this._resolution = "";
  }

  private _change(e: TicketEvent): string {
    const d = (e.data ?? {}) as { field?: string; from?: unknown; to?: unknown };
    const show = (v: unknown) =>
      Array.isArray(v) ? v.map((x) => (d.field === "labels" ? labelOrUnknown(this.labelMap, String(x)).name : String(x))).join(", ") || "none" : v === null || v === undefined || v === "" ? "none" : String(v);
    switch (e.kind) {
      case "created":
        return "created this ticket";
      case "status":
        return `changed status from ${STATUS_LABEL[d.from as Status] ?? show(d.from)} to ${STATUS_LABEL[d.to as Status] ?? show(d.to)}`;
      case "priority":
        return `changed priority from ${show(d.from)} to ${show(d.to)}`;
      case "assignee":
        return d.to ? `assigned this to ${show(d.to)}` : "unassigned this";
      case "link":
        return `linked ticket #${String(d.to)}`;
      case "field":
        return d.field === "description"
          ? "edited the description"
          : `changed ${String(d.field)}${d.field === "labels" || d.field === "entities" ? ` to ${show(d.to)}` : ""}`;
      default:
        return e.kind;
    }
  }

  private _eventTemplate(e: TicketEvent) {
    const when = html`<span title=${fullTime(e.created_at, this.language)}>${relativeTime(e.created_at, this.language)}</span>`;
    if (e.kind === "comment" || e.kind === "note") {
      return html`
        <div class="ev">
          <ha-icon .icon=${actorIcon(e.actor)}></ha-icon>
          <div>
            <div class="who"><b>${actorName(e.actor)}</b> · ${when}${e.kind === "note" ? html`<span class="label">internal note</span>` : nothing}</div>
            <div class="bubble md ${e.kind === "note" ? "note" : ""}">${unsafeHTML(renderMarkdown(e.body ?? ""))}</div>
          </div>
        </div>`;
    }
    return html`
      <div class="ev system">
        <ha-icon icon="mdi:circle-small"></ha-icon>
        <div class="who"><b>${actorName(e.actor)}</b> ${this._change(e)} · ${when}</div>
      </div>`;
  }

  override render() {
    const t = this.ticket;
    if (!t) {
      return html`<div class="empty"><ha-icon icon="mdi:ticket-outline"></ha-icon><span>Select a ticket</span></div>`;
    }
    const long = t.description.length > LONG_DESCRIPTION;
    const done = t.status === "resolved" || t.status === "closed";
    return html`
      <div class="wrap">
        <div class="head">
          ${this._editingTitle
            ? html`<input class="title-input" type="text" .value=${this._titleDraft}
                @input=${(e: Event) => (this._titleDraft = (e.target as HTMLInputElement).value)}
                @keydown=${(e: KeyboardEvent) => {
                  if (e.key === "Enter" && this._titleDraft.trim()) {
                    this._patch({ title: this._titleDraft.trim() });
                    this._editingTitle = false;
                  } else if (e.key === "Escape") this._editingTitle = false;
                }} />`
            : html`<h1>${t.title}</h1>`}
          ${this.isAdmin && !this._editingTitle
            ? html`<button class="icon" title="Edit title" @click=${() => { this._titleDraft = t.title; this._editingTitle = true; }}><ha-icon icon="mdi:pencil-outline"></ha-icon></button>`
            : nothing}
        </div>
        <div class="sub">
          #${t.id}${t.legacy_ref ? html` · ${t.legacy_ref}` : nothing} · raised by <ha-icon class="who" .icon=${actorIcon(t.requester)}></ha-icon>${actorName(t.requester)}
          ${relativeTime(t.created_at, this.language)}${t.source ? html` · ${t.source === "Home Assistant Repairs" ? "from" : "imported from"} ${t.source}` : nothing}
        </div>

        <div class="page"><div class="main">
        ${t.description
          ? html`<div class="card">
              <h3>Description</h3>
              <div class="md ${long && !this._expanded ? "clamp" : ""}">${unsafeHTML(renderMarkdown(t.description))}</div>
              ${long ? html`<button class="more" @click=${() => (this._expanded = !this._expanded)}>${this._expanded ? "Show less" : "Show all"}</button>` : nothing}
            </div>`
          : nothing}

        ${t.resolution
          ? html`<div class="card resolution"><h3>Resolution</h3><div class="md">${unsafeHTML(renderMarkdown(t.resolution))}</div></div>`
          : nothing}

        <div class="timeline">
          <h2>Activity</h2>
          ${t.events.map((e) => this._eventTemplate(e))}
        </div>

        <div class="card composer">
          <textarea rows="3" placeholder="Add a comment" .value=${this._comment}
            @input=${(e: Event) => (this._comment = (e.target as HTMLTextAreaElement).value)}></textarea>
          <div class="bar">
            ${this.isAdmin
              ? html`<label class="inline"><input type="checkbox" .checked=${this._internal}
                  @change=${(e: Event) => (this._internal = (e.target as HTMLInputElement).checked)} /> Internal note</label>`
              : nothing}
            <span class="grow"></span>
            ${this.isAdmin && !done
              ? html`<button @click=${() => (this._resolving = !this._resolving)}><ha-icon icon="mdi:check-circle-outline"></ha-icon>Resolve</button>`
              : nothing}
            ${this.isAdmin && done
              ? html`<button @click=${() => this._patch({ status: "open" })}><ha-icon icon="mdi:restore"></ha-icon>Reopen</button>`
              : nothing}
            <button class="primary" ?disabled=${!this._comment.trim()} @click=${this._submitComment}>Comment</button>
          </div>
          ${this._resolving
            ? html`<div class="resolve-form">
                <textarea rows="3" placeholder="What was the cause and what fixed it?" .value=${this._resolution}
                  @input=${(e: Event) => (this._resolution = (e.target as HTMLTextAreaElement).value)}></textarea>
                <div class="bar">
                  <span class="grow"></span>
                  <button @click=${() => (this._resolving = false)}>Cancel</button>
                  <button ?disabled=${!this._resolution.trim()} @click=${() => this._submitResolve("closed")}>Close without fix</button>
                  <button class="primary" ?disabled=${!this._resolution.trim()} @click=${() => this._submitResolve("resolved")}>Resolve</button>
                </div>
              </div>`
            : nothing}
        </div>
      </div>
      <aside class="side">
        <div class="props">
          <div>
            <label>Status</label>
            ${this.isAdmin
              ? html`<select @change=${(e: Event) => this._patch({ status: (e.target as HTMLSelectElement).value as Status })}>
                  ${STATUSES.map((s) => html`<option value=${s} ?selected=${s === t.status}>${STATUS_LABEL[s]}</option>`)}
                </select>`
              : html`<div class="ro">${STATUS_LABEL[t.status]}</div>`}
          </div>
          <div>
            <label>Priority</label>
            ${this.isAdmin
              ? html`<select @change=${(e: Event) => this._patch({ priority: (e.target as HTMLSelectElement).value as Priority })}>
                  ${PRIORITIES.map((p) => html`<option value=${p} ?selected=${p === t.priority}>${PRIORITY_LABEL[p]}</option>`)}
                </select>`
              : html`<div class="ro">${PRIORITY_LABEL[t.priority]}</div>`}
          </div>
          <div>
            <label>Assignee</label>
            ${this.isAdmin
              ? html`<input type="text" list="assignees" .value=${t.assignee ?? ""} placeholder="Unassigned"
                  @change=${(e: Event) => this._patch({ assignee: (e.target as HTMLInputElement).value.trim() || null })} />
                <datalist id="assignees">${this.assignees.map((a) => html`<option value=${a}></option>`)}</datalist>`
              : html`<div class="ro">${t.assignee ?? "Unassigned"}</div>`}
          </div>
          ${t.labels.length || this.isAdmin
            ? html`<div>
                <label>Labels</label>
                <div class="chips">
                  ${t.labels.map((id) => {
                    const label = labelOrUnknown(this.labelMap, id);
                    return html`<span class="label" style="--label-color: ${labelColorCss(label.color)}">${label.name}${this.isAdmin
                      ? html`<button title="Remove label" @click=${() => this._patch({ labels: t.labels.filter((x) => x !== id) })}><ha-icon icon="mdi:close"></ha-icon></button>`
                      : nothing}</span>`;
                  })}
                  ${this.isAdmin
                    ? html`<input type="text" placeholder="Add label" list="label-options" .value=${this._labelDraft}
                        @input=${(e: Event) => (this._labelDraft = (e.target as HTMLInputElement).value)}
                        @keydown=${(e: KeyboardEvent) => e.key === "Enter" && this._addLabel()}
                        @change=${() => this._addLabel()} />
                      <datalist id="label-options">${[...this.labelMap.values()].filter((x) => !t.labels.includes(x.id)).map((x) => html`<option value=${x.name}></option>`)}</datalist>`
                    : nothing}
                </div>
              </div>`
            : nothing}
          ${t.entities.length
            ? html`<div><label>Entities</label><div class="entities">${t.entities.map((x) => html`<code>${x}</code>`)}</div></div>`
            : nothing}
          ${t.related?.length
            ? html`<div><label>Related</label><div class="chips">${t.related.map((r) => html`<span class="chip link" title=${r.title} @click=${() => this._fire("open-ticket", r.id)}>#${r.id} ${r.title.length > 32 ? r.title.slice(0, 32) + "…" : r.title}</span>`)}</div></div>`
            : nothing}
        </div>
      </aside>
      </div></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "st-ticket-detail": TicketDetail;
  }
}
