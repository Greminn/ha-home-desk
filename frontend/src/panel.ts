import { LitElement, html, css, nothing } from "lit";
import { state, property } from "lit/decorators.js";
import { safeCustomElement } from "./define";
import { sharedStyles } from "./styles";
import { HaClient } from "./ha-client";
import type { NewTicket } from "./ha-client";
import { ACTIVE, PRIORITIES, TYPES } from "./types";
import type { HomeAssistant, Tag, Ticket, TicketPatch, TicketSummary } from "./types";
import { PRIORITY_LABEL, TYPE_LABEL } from "./format";
import "./views/ticket-list";
import "./views/ticket-detail";
import "./views/new-ticket-dialog";
import "./views/tag-manager";

interface View {
  id: string;
  label: string;
  match: (t: TicketSummary) => boolean;
}

const isActive = (t: TicketSummary) => ACTIVE.includes(t.status) && t.type !== "log";
const VIEWS: View[] = [
  { id: "active", label: "Inbox", match: isActive },
  { id: "review", label: "Needs review", match: (t) => isActive(t) && t.tags.includes("needs-review") },
  { id: "waiting", label: "Waiting", match: (t) => t.status === "waiting" },
  { id: "resolved", label: "Resolved", match: (t) => (t.status === "resolved" || t.status === "closed") && t.type !== "log" },
  { id: "history", label: "History", match: (t) => t.type === "log" },
  { id: "all", label: "All", match: () => true },
];

const SEARCH_DEBOUNCE_MS = 250;

@safeCustomElement("home-desk-panel")
export class HomeDeskPanel extends LitElement {
  static override styles = [
    sharedStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        height: 100vh;
        height: 100dvh;
        background: var(--st-bg);
      }
      header {
        flex: none;
        background: var(--st-header-bg);
        color: var(--st-header-fg);
        border-bottom: 1px solid var(--st-divider);
      }
      .bar {
        display: flex;
        align-items: center;
        height: 56px;
        padding: 0 8px 0 4px;
        gap: 4px;
      }
      .bar h1 {
        flex: 1;
        margin: 0 0 0 8px;
        font-size: var(--st-fs-header);
        font-weight: 400;
      }
      .bar .menu {
        margin-right: -4px;
      }
      .tabs {
        display: flex;
        overflow-x: auto;
        scrollbar-width: none;
        padding: 0 8px;
      }
      .tabs::-webkit-scrollbar {
        display: none;
      }
      .tab {
        flex: none;
        height: 48px;
        padding: 0 16px;
        border-radius: 0;
        color: color-mix(in srgb, var(--st-header-fg) 70%, transparent);
        font-weight: 500;
        border-bottom: 2px solid transparent;
        text-transform: none;
      }
      .tab.active {
        color: var(--st-header-fg);
        border-bottom-color: var(--st-header-fg);
      }
      .tab .count {
        font-weight: 400;
        font-size: var(--st-fs-caption);
        padding: 1px 7px;
        border-radius: 10px;
        background: color-mix(in srgb, var(--st-header-fg) 18%, transparent);
      }
      main {
        flex: 1;
        display: grid;
        grid-template-columns: minmax(320px, 420px) minmax(0, 1fr);
        min-height: 0;
      }
      .list-pane {
        display: flex;
        flex-direction: column;
        min-height: 0;
        border-right: 1px solid var(--st-divider);
        background: var(--st-surface);
      }
      .filters {
        flex: none;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        padding: 12px 16px;
        border-bottom: 1px solid var(--st-divider);
      }
      .filters input[type="search"] {
        flex: 1 1 100%;
      }
      .filters select {
        flex: 1 1 0;
        min-width: 0;
        max-width: 100%;
      }
      st-ticket-list {
        flex: 1;
        min-height: 0;
      }
      st-ticket-detail {
        min-height: 0;
      }
      @media (max-width: 870px) {
        main {
          grid-template-columns: minmax(0, 1fr);
        }
        main.has-selection .list-pane,
        main:not(.has-selection) st-ticket-detail {
          display: none;
        }
      }
      .banner {
        padding: 12px 16px;
        font-size: var(--st-fs-body);
        border-left: 4px solid var(--st-danger);
        background: color-mix(in srgb, var(--st-danger) 12%, var(--st-surface));
      }
      .new {
        color: var(--st-header-fg);
        background: color-mix(in srgb, var(--st-header-fg) 16%, transparent);
        margin-right: 4px;
      }
      @media (max-width: 600px) {
        .new .label {
          display: none;
        }
        .new {
          padding: 0 12px;
        }
      }
      .list-pane,
      st-ticket-list,
      st-ticket-detail {
        min-width: 0;
      }
    `,
  ];

  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ type: Boolean }) narrow = false;

  @state() private _tickets: TicketSummary[] = [];
  @state() private _matchIds: Set<number> | null = null;
  @state() private _selected: Ticket | null = null;
  @state() private _selectedId: number | null = null;
  @state() private _view = "active";
  @state() private _q = "";
  @state() private _type = "";
  @state() private _priority = "";
  @state() private _assignee = "";
  @state() private _tag = "";
  @state() private _tagList: Tag[] = [];
  @state() private _managingTags = false;
  @state() private _creating = false;
  @state() private _error = "";

  private _client?: HaClient;
  private _unsub?: () => void;
  private _searchTimer?: number;
  private _refreshTimer?: number;

  private get _admin(): boolean {
    return this.hass?.user?.is_admin ?? false;
  }

  override willUpdate(changed: Map<string, unknown>) {
    if (changed.has("hass") && this.hass && !this._client) {
      this._client = new HaClient(this.hass);
      this._restoreState();
      void this._refresh();
      void this._client.subscribe(() => this._scheduleRefresh()).then((u) => (this._unsub = u));
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._unsub?.();
    window.clearTimeout(this._searchTimer);
    window.clearTimeout(this._refreshTimer);
  }

  // ---- state persistence (per browser; storage can throw, so always guarded)

  private _restoreState() {
    try {
      const raw = localStorage.getItem("home-desk-view");
      if (raw && VIEWS.some((v) => v.id === raw)) this._view = raw;
    } catch {
      // Fall through to the default view.
    }
  }

  private _setView(id: string) {
    this._view = id;
    try {
      localStorage.setItem("home-desk-view", id);
    } catch {
      // Not persisted; the view still works.
    }
  }

  // ---- data

  private _scheduleRefresh() {
    // Several events can land together (an AI agent updating a ticket); coalesce.
    window.clearTimeout(this._refreshTimer);
    this._refreshTimer = window.setTimeout(() => void this._refresh(), 300);
  }

  private async _refresh() {
    if (!this._client) return;
    try {
      [this._tickets, this._tagList] = await Promise.all([this._client.list(), this._client.tags()]);
      if (this._q.trim()) await this._runSearch();
      if (this._selectedId !== null) await this._loadSelected(this._selectedId);
      this._error = "";
    } catch (err) {
      this._error = `Could not load tickets: ${this._message(err)}`;
    }
  }

  private async _loadSelected(id: number) {
    if (!this._client) return;
    try {
      this._selected = await this._client.get(id);
    } catch (err) {
      this._selected = null;
      this._selectedId = null;
      this._error = this._message(err);
    }
  }

  private async _runSearch() {
    if (!this._client) return;
    const q = this._q.trim();
    this._matchIds = q ? new Set((await this._client.list(q)).map((t) => t.id)) : null;
  }

  private _message(err: unknown): string {
    if (err && typeof err === "object" && "message" in err) return String((err as { message: unknown }).message);
    return String(err);
  }

  private async _act(fn: (client: HaClient) => Promise<Ticket>) {
    if (!this._client) return;
    try {
      this._selected = await fn(this._client);
      this._error = "";
      void this._refresh();
    } catch (err) {
      this._error = this._message(err);
    }
  }

  // ---- handlers

  private _onSearch(e: Event) {
    this._q = (e.target as HTMLInputElement).value;
    window.clearTimeout(this._searchTimer);
    this._searchTimer = window.setTimeout(() => void this._runSearch(), SEARCH_DEBOUNCE_MS);
  }

  private async _open(id: number) {
    this._selectedId = id;
    await this._loadSelected(id);
  }

  private async _create(detail: NewTicket) {
    if (!this._client) return;
    try {
      const ticket = await this._client.create(detail);
      this._creating = false;
      this._setView("active");
      this._selectedId = ticket.id;
      this._selected = ticket;
      void this._refresh();
    } catch (err) {
      this._error = this._message(err);
    }
  }

  // ---- derived

  private get _filtered(): TicketSummary[] {
    const view = VIEWS.find((v) => v.id === this._view) ?? VIEWS[0]!;
    return this._tickets.filter(
      (t) =>
        view.match(t) &&
        (!this._matchIds || this._matchIds.has(t.id)) &&
        (!this._type || t.type === this._type) &&
        (!this._priority || t.priority === this._priority) &&
        (!this._tag || t.tags.includes(this._tag)) &&
        (!this._assignee ||
          (this._assignee === "unassigned" ? !t.assignee : t.assignee === this._assignee)),
    );
  }

  private get _assignees(): string[] {
    return [...new Set(["simon", "claude", ...this._tickets.map((t) => t.assignee).filter((a): a is string => !!a)])].sort();
  }

  private get _tagMap(): Map<string, Tag> {
    return new Map(this._tagList.map((t) => [t.id, t]));
  }

  override render() {
    if (!this.hass) return nothing;
    const lang = this.hass.language;
    const selecting = this._selectedId !== null;
    return html`
      <header>
        <div class="bar">
          ${this.narrow
            ? html`<button class="icon menu" title="Menu" @click=${() =>
                this.dispatchEvent(new CustomEvent("hass-toggle-menu", { bubbles: true, composed: true }))}><ha-icon icon="mdi:menu"></ha-icon></button>`
            : nothing}
          <h1>Home Desk</h1>
          <button class="new" title="New ticket" @click=${() => (this._creating = true)}><ha-icon icon="mdi:plus"></ha-icon><span class="label">New ticket</span></button>
          ${this._admin
            ? html`<button class="icon" title="Manage tags" @click=${() => (this._managingTags = true)}><ha-icon icon="mdi:tag-multiple-outline"></ha-icon></button>`
            : nothing}
          <button class="icon" title="Refresh" @click=${() => void this._refresh()}><ha-icon icon="mdi:refresh"></ha-icon></button>
        </div>
        <div class="tabs">
          ${VIEWS.map(
            (v) => html`<button class="tab ${v.id === this._view ? "active" : ""}" @click=${() => this._setView(v.id)}>
              ${v.label} <span class="count">${this._tickets.filter(v.match).length}</span>
            </button>`,
          )}
        </div>
      </header>
      ${this._error ? html`<div class="banner">${this._error}</div>` : nothing}
      <main class=${selecting ? "has-selection" : ""}>
        <div class="list-pane">
          <div class="filters">
            <input type="search" placeholder="Search tickets" .value=${this._q} @input=${this._onSearch} />
            <select aria-label="Type" @change=${(e: Event) => (this._type = (e.target as HTMLSelectElement).value)}>
              <option value="">Any type</option>
              ${TYPES.map((x) => html`<option value=${x} ?selected=${x === this._type}>${TYPE_LABEL[x]}</option>`)}
            </select>
            <select aria-label="Priority" @change=${(e: Event) => (this._priority = (e.target as HTMLSelectElement).value)}>
              <option value="">Any priority</option>
              ${PRIORITIES.map((x) => html`<option value=${x} ?selected=${x === this._priority}>${PRIORITY_LABEL[x]}</option>`)}
            </select>
            <select aria-label="Assignee" @change=${(e: Event) => (this._assignee = (e.target as HTMLSelectElement).value)}>
              <option value="">Anyone</option>
              <option value="unassigned" ?selected=${this._assignee === "unassigned"}>Unassigned</option>
              ${this._assignees.map((x) => html`<option value=${x} ?selected=${x === this._assignee}>${x}</option>`)}
            </select>
            <select aria-label="Tag" @change=${(e: Event) => (this._tag = (e.target as HTMLSelectElement).value)}>
              <option value="">Any tag</option>
              ${this._tagList.map((x) => html`<option value=${x.id} ?selected=${x.id === this._tag}>${x.name}</option>`)}
            </select>
          </div>
          <st-ticket-list
            .tickets=${this._filtered}
            .selectedId=${this._selectedId}
            .language=${lang}
            .tagMap=${this._tagMap}
            @select-ticket=${(e: CustomEvent<number>) => void this._open(e.detail)}
          ></st-ticket-list>
        </div>
        <st-ticket-detail
          .ticket=${this._selected}
          .isAdmin=${this._admin}
          .narrow=${this.narrow || window.matchMedia("(max-width: 870px)").matches}
          .language=${lang}
          .assignees=${this._assignees}
          .tagMap=${this._tagMap}
          @back=${() => { this._selectedId = null; this._selected = null; }}
          @open-ticket=${(e: CustomEvent<number>) => void this._open(e.detail)}
          @patch-ticket=${(e: CustomEvent<TicketPatch>) => this._selected && void this._act((c) => c.update(this._selected!.id, e.detail))}
          @comment=${(e: CustomEvent<{ body: string; internal: boolean }>) => this._selected && void this._act((c) => c.comment(this._selected!.id, e.detail.body, e.detail.internal))}
          @close-ticket=${(e: CustomEvent<{ resolution: string; status: "resolved" | "closed" }>) => this._selected && void this._act((c) => c.close(this._selected!.id, e.detail.resolution, e.detail.status))}
        ></st-ticket-detail>
      </main>
      ${this._managingTags && this._client
        ? html`<st-tag-manager .client=${this._client} .tags=${this._tagList}
            @close=${() => (this._managingTags = false)}
            @tags-changed=${() => void this._refresh()}></st-tag-manager>`
        : nothing}
      ${this._creating
        ? html`<st-new-ticket-dialog .isAdmin=${this._admin}
            @close=${() => (this._creating = false)}
            @create=${(e: CustomEvent<NewTicket>) => void this._create(e.detail)}></st-new-ticket-dialog>`
        : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "home-desk-panel": HomeDeskPanel;
  }
}
