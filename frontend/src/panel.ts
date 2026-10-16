import { LitElement, html, css, nothing } from "lit";
import { state, property } from "lit/decorators.js";
import { safeCustomElement } from "./define";
import { sharedStyles } from "./styles";
import { HaClient } from "./ha-client";
import type { NewTicket } from "./ha-client";
import { ACTIVE, ENHANCEMENT, HISTORY, PRIORITIES } from "./types";
import type { HomeAssistant, Label, Ticket, TicketPatch, TicketSummary } from "./types";
import { PRIORITY_LABEL } from "./format";
import "./views/ticket-list";
import "./views/ticket-detail";
import "./views/new-ticket-dialog";
import "./views/label-manager";

interface View {
  id: string;
  label: string;
  icon: string;
  count?: boolean;
  match: (t: TicketSummary) => boolean;
}

const isHistory = (t: TicketSummary) => t.labels.includes(HISTORY);
const isActive = (t: TicketSummary) => ACTIVE.includes(t.status) && !isHistory(t);
const isClosed = (t: TicketSummary) => (t.status === "resolved" || t.status === "closed") && !isHistory(t);
const isEnhancement = (t: TicketSummary) => t.labels.includes(ENHANCEMENT);

const VIEWS: View[] = [
  // New work that hasn't been started. Ideas have their own tab so they don't bury problems.
  { id: "active", icon: "mdi:inbox-outline", label: "Inbox", count: true, match: (t) => (t.status === "new" || t.status === "open") && !isHistory(t) && !isEnhancement(t) },
  { id: "progress", icon: "mdi:progress-wrench", label: "In Progress", count: true, match: (t) => t.status === "in_progress" && !isHistory(t) },
  { id: "enhancements", icon: "mdi:lightbulb-outline", label: "Enhancements", count: true, match: (t) => isActive(t) && isEnhancement(t) },
  { id: "all", icon: "mdi:format-list-bulleted", label: "All", match: () => true },
];

/** The "Show" filter on the All tab. History is only listed when asked for. */
const SCOPES: { id: string; label: string; match: (t: TicketSummary) => boolean }[] = [
  { id: "", label: "Everything", match: (t) => !isHistory(t) },
  { id: "active", label: "Open", match: isActive },
  { id: "closed", label: "Closed", match: isClosed },
  { id: "history", label: "History", match: isHistory },
];

const SEARCH_DEBOUNCE_MS = 250;
const POLL_MS = 20_000;
const COMPACT_QUERY = "(max-width: 800px)";

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
        position: relative;
      }
      header {
        flex: none;
        background: var(--st-header-bg);
        color: var(--st-header-fg);
        border-bottom: 1px solid var(--st-divider);
      }
      .bar {
        position: relative;
        display: flex;
        align-items: center;
        height: 56px;
        padding: 0 4px;
      }
      .bar > .icon {
        flex: none;
        color: var(--st-header-fg);
      }
      .bar .side {
        flex: 1 1 0;
        min-width: 0;
        display: flex;
        align-items: center;
      }
      .bar .side.end {
        justify-content: flex-end;
        position: relative;
      }
      .bar h1 {
        margin: 0 0 0 12px;
        font-size: var(--st-fs-header);
        font-weight: 400;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .bar h1.crumb {
        font-size: var(--st-fs-title);
        font-weight: 500;
      }
      .tabs {
        flex: 0 1 auto;
        min-width: 0;
        display: flex;
        align-self: stretch;
        overflow-x: auto;
        scrollbar-width: none;
      }
      .tabs::-webkit-scrollbar {
        display: none;
      }
      .tab {
        flex: none;
        align-self: stretch;
        height: auto;
        padding: 0 16px;
        gap: 8px;
        border-radius: 0;
        color: var(--st-fg);
        font-weight: 500;
        border-bottom: 2px solid transparent;
      }
      .tab:first-child {
        margin-left: auto;
      }
      .tab:last-child {
        margin-right: auto;
      }
      .tab ha-icon {
        --mdc-icon-size: 24px;
      }
      .tab .count {
        font-weight: 400;
        font-size: var(--st-fs-caption);
        padding: 1px 7px;
        border-radius: 10px;
        background: color-mix(in srgb, currentColor 18%, transparent);
      }
      .tab.active {
        color: var(--st-accent);
        border-bottom-color: var(--st-accent);
      }
      @media (max-width: 1000px) {
        .tab:not(.active) .tab-text,
        .tab:not(.active) .count {
          display: none;
        }
      }
      @media (max-width: 600px) {
        .bar h1:not(.crumb) {
          display: none;
        }
        .bar .side:not(.in-ticket) {
          flex: none;
          width: 48px;
        }
        .tabs {
          flex: 1 1 0;
        }
        .tab {
          padding: 0 12px;
        }
      }
      .menu-backdrop {
        position: fixed;
        inset: 0;
        z-index: 4;
        height: auto;
        border-radius: 0;
        padding: 0;
        background: transparent;
        cursor: default;
      }
      .menu-popover {
        position: absolute;
        z-index: 5;
        top: 48px;
        right: 8px;
        min-width: 180px;
        padding: 8px 0;
        border-radius: 4px;
        background: var(--st-surface);
        box-shadow: var(--ha-card-box-shadow, 0 2px 8px rgba(0, 0, 0, 0.3));
      }
      .menu-popover button {
        width: 100%;
        height: 48px;
        padding: 0 16px;
        border-radius: 0;
        justify-content: flex-start;
        color: var(--st-fg);
        font-weight: 400;
        font-size: var(--st-fs-row);
      }
      .menu-popover ha-icon {
        color: var(--st-fg-secondary);
      }
      main {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-height: 0;
      }
      .list-pane {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-height: 0;
        background: var(--st-surface);
      }
      .toolbar {
        flex: none;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 8px 8px 16px;
        border-bottom: 1px solid var(--st-divider);
      }
      .search {
        flex: 1;
        min-width: 0;
        position: relative;
        display: flex;
        align-items: center;
      }
      .search ha-icon {
        position: absolute;
        left: 12px;
        color: var(--st-fg-secondary);
        pointer-events: none;
      }
      .search input[type="search"] {
        width: 100%;
        height: 40px;
        padding: 0 12px 0 40px;
      }
      .toolbar .filter-btn {
        position: relative;
        flex: none;
        color: var(--st-fg-secondary);
      }
      .toolbar .filter-btn.on {
        color: var(--st-accent);
      }
      .toolbar .filter-btn .dot {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--st-accent);
      }
      .filters {
        flex: none;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        padding: 8px 16px;
        border-bottom: 1px solid var(--st-divider);
      }
      .filters select {
        flex: 1 1 120px;
        min-width: 0;
        max-width: 100%;
      }
      .fab {
        position: absolute;
        right: 16px;
        bottom: 16px;
        z-index: 3;
        height: 56px;
        padding: 0 20px 0 16px;
        gap: 12px;
        border-radius: 28px;
        font-size: var(--st-fs-row);
        background: var(--st-accent);
        color: var(--text-primary-color, #fff);
        box-shadow: var(--ha-card-box-shadow, 0 3px 8px rgba(0, 0, 0, 0.3));
      }
      .fab:hover:not(:disabled) {
        filter: brightness(1.08);
      }
      .fab ha-icon {
        --mdc-icon-size: 24px;
      }
      st-ticket-list {
        flex: 1;
        min-height: 0;
      }
      st-ticket-detail {
        flex: 1;
        min-height: 0;
      }
      .banner {
        padding: 12px 16px;
        font-size: var(--st-fs-body);
        border-left: 4px solid var(--st-danger);
        background: color-mix(in srgb, var(--st-danger) 12%, var(--st-surface));
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
  /** HA's router state for this panel: prefix "/home-desk", path "" or "/123" (a ticket). */
  @property({ attribute: false }) route: { prefix: string; path: string } | undefined = undefined;

  @state() private _tickets: TicketSummary[] = [];
  @state() private _matchIds: Set<number> | null = null;
  @state() private _selected: Ticket | null = null;
  @state() private _selectedId: number | null = null;
  @state() private _view = "active";
  @state() private _q = "";
  @state() private _priority = "";
  @state() private _label = "";
  @state() private _filtersOpen = false;
  /** True when the window is too narrow for the table (cards are used instead). */
  @state() private _compact = window.matchMedia(COMPACT_QUERY).matches;
  @state() private _scope = "";
  @state() private _menuOpen = false;
  @state() private _labelList: Label[] = [];
  @state() private _managingLabels = false;
  @state() private _creating = false;
  @state() private _error = "";

  private _client?: HaClient;
  private _unsub: (() => void) | undefined;
  private _searchTimer?: number;
  private _refreshTimer?: number;
  private _pollTimer?: number;

  private get _admin(): boolean {
    return this.hass?.user?.is_admin ?? false;
  }

  override willUpdate(changed: Map<string, unknown>) {
    if (changed.has("hass") && this.hass && !this._client) {
      this._client = new HaClient(this.hass);
      this._restoreState();
      void this._refresh();
      void this._syncFromRoute();
      this._subscribe();
    }
    if (changed.has("route") && this._client) void this._syncFromRoute();
  }

  // ---- routing: a ticket has its own address (/home-desk/123), so it can be linked and bookmarked

  private get _prefix(): string {
    return this.route?.prefix ?? "/home-desk";
  }

  /** Move the browser to `path` and tell HA's router, which then updates `route`. */
  private _navigate(path: string) {
    if (location.pathname === path) return;
    try {
      history.pushState(null, "", path);
      window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } }));
    } catch {
      // No router available (embedded or sandboxed): the panel still works, just without a URL per ticket.
    }
  }

  private async _syncFromRoute() {
    const id = Number((this.route?.path ?? "").replace(/^\//, ""));
    const want = Number.isInteger(id) && id > 0 ? id : null;
    if (want === this._selectedId) return;
    if (want === null) {
      this._selectedId = null;
      this._selected = null;
    } else {
      await this._open(want, false);
    }
  }

  /** Live updates: HA tells us when any ticket changes. If that fails, fall back to polling. */
  private _subscribe() {
    if (!this._client) return;
    this._client
      .subscribe(() => this._scheduleRefresh())
      .then((u) => {
        this._unsub = u;
      })
      .catch((err) => {
        console.warn("[home-desk] live updates unavailable, polling instead:", err);
        this._unsub = undefined;
      });
    // Cheap safety net even when subscribed: a missed event is repaired within a poll interval.
    window.clearInterval(this._pollTimer);
    this._pollTimer = window.setInterval(() => {
      if (!document.hidden) void this._refresh();
    }, POLL_MS);
  }

  private _onVisible = () => {
    if (!document.hidden) void this._refresh();
  };

  private _mq = window.matchMedia(COMPACT_QUERY);
  private _onCompact = () => {
    this._compact = this._mq.matches;
  };

  override connectedCallback() {
    super.connectedCallback();
    this._mq.addEventListener("change", this._onCompact);
    document.addEventListener("visibilitychange", this._onVisible);
    if (this._client && !this._unsub) this._subscribe(); // reattached after being removed
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._mq.removeEventListener("change", this._onCompact);
    document.removeEventListener("visibilitychange", this._onVisible);
    window.clearInterval(this._pollTimer);
    this._unsub?.();
    this._unsub = undefined;
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
    if (id === "all") this._filtersOpen = true; // the Show filter lives there; make it visible
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
      [this._tickets, this._labelList] = await Promise.all([this._client.list(), this._client.labels()]);
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
      this._navigate(this._prefix);
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

  private async _open(id: number, navigate = true) {
    this._selectedId = id;
    if (navigate) this._navigate(`${this._prefix}/${id}`);
    await this._loadSelected(id);
  }

  private _close() {
    this._selectedId = null;
    this._selected = null;
    this._navigate(this._prefix);
  }

  private async _create(detail: NewTicket) {
    if (!this._client) return;
    try {
      const ticket = await this._client.create(detail);
      this._creating = false;
      this._setView("active");
      this._selected = ticket;
      void this._open(ticket.id);
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
        (view.id !== "all" || !this._scope || SCOPES.find((x) => x.id === this._scope)!.match(t)) &&
        (!this._matchIds || this._matchIds.has(t.id)) &&
        (!this._priority || t.priority === this._priority) &&
        (!this._label || t.labels.includes(this._label)),
    );
  }

  private get _filterCount(): number {
    return [this._priority, this._label, this._view === "all" ? this._scope : ""].filter(Boolean).length;
  }

  private get _assignees(): string[] {
    return [...new Set(["simon", "claude", ...this._tickets.map((t) => t.assignee).filter((a): a is string => !!a)])].sort();
  }

  private get _labelMap(): Map<string, Label> {
    return new Map(this._labelList.map((t) => [t.id, t]));
  }

  override render() {
    if (!this.hass) return nothing;
    const lang = this.hass.language;
    const selecting = this._selectedId !== null;
    return html`
      <header>
        <div class="bar">
          <div class="side ${selecting ? "in-ticket" : ""}">
            ${selecting
              ? html`<button class="icon" title="Back" @click=${() => this._close()}><ha-icon icon="mdi:arrow-left"></ha-icon></button>
                  <h1 class="crumb">${this._selected ? `#${this._selected.id} ${this._selected.title}` : "Ticket"}</h1>`
              : html`${this.narrow
                  ? html`<button class="icon" title="Menu" @click=${() =>
                      this.dispatchEvent(new CustomEvent("hass-toggle-menu", { bubbles: true, composed: true }))}><ha-icon icon="mdi:menu"></ha-icon></button>`
                  : nothing}
                <h1>Home Desk</h1>`}
          </div>
          ${selecting
            ? nothing
            : html`<div class="tabs" role="tablist">
            ${VIEWS.map(
              (v) => html`<button class="tab ${v.id === this._view ? "active" : ""}" role="tab" title=${v.label}
                aria-selected=${v.id === this._view} @click=${() => this._setView(v.id)}>
                <ha-icon .icon=${v.icon}></ha-icon><span class="tab-text">${v.label}</span>${v.count
                  ? html`<span class="count">${this._tickets.filter(v.match).length}</span>`
                  : nothing}
              </button>`,
            )}
          </div>`}
          <div class="side end">
          <button class="icon" title="More options" @click=${() => (this._menuOpen = !this._menuOpen)}><ha-icon icon="mdi:dots-vertical"></ha-icon></button>
          ${this._menuOpen
            ? html`<button class="menu-backdrop" aria-label="Close menu" @click=${() => (this._menuOpen = false)}></button>
                <div class="menu-popover" role="menu">
                  <button role="menuitem" @click=${() => { this._menuOpen = false; void this._refresh(); }}><ha-icon icon="mdi:refresh"></ha-icon>Refresh</button>
                  ${this._admin
                    ? html`<button role="menuitem" @click=${() => { this._menuOpen = false; this._managingLabels = true; }}><ha-icon icon="mdi:label-multiple-outline"></ha-icon>Manage labels</button>`
                    : nothing}
                </div>`
            : nothing}
          </div>
        </div>
      </header>
      ${this._error ? html`<div class="banner">${this._error}</div>` : nothing}
      <main>
        ${selecting ? nothing : html`<div class="list-pane">
          <div class="toolbar">
            <div class="search">
              <ha-icon icon="mdi:magnify"></ha-icon>
              <input type="search" placeholder="Search tickets" aria-label="Search tickets" .value=${this._q} @input=${this._onSearch} />
            </div>
            <button class="icon filter-btn ${this._filterCount ? "on" : ""}" title="Filters" aria-expanded=${this._filtersOpen}
              @click=${() => (this._filtersOpen = !this._filtersOpen)}>
              <ha-icon icon="mdi:filter-variant"></ha-icon>${this._filterCount ? html`<span class="dot"></span>` : nothing}
            </button>
          </div>
          ${this._filtersOpen
            ? html`<div class="filters">
                ${this._view === "all"
                  ? html`<select aria-label="Show" @change=${(e: Event) => (this._scope = (e.target as HTMLSelectElement).value)}>
                      ${SCOPES.map((x) => html`<option value=${x.id} ?selected=${x.id === this._scope}>${x.label}</option>`)}
                    </select>`
                  : nothing}
                <select aria-label="Priority" @change=${(e: Event) => (this._priority = (e.target as HTMLSelectElement).value)}>
                  <option value="">Any priority</option>
                  ${PRIORITIES.map((x) => html`<option value=${x} ?selected=${x === this._priority}>${PRIORITY_LABEL[x]}</option>`)}
                </select>
                <select aria-label="Label" @change=${(e: Event) => (this._label = (e.target as HTMLSelectElement).value)}>
                  <option value="">Any label</option>
                  ${this._labelList.map((x) => html`<option value=${x.id} ?selected=${x.id === this._label}>${x.name}</option>`)}
                </select>
              </div>`
            : nothing}
          <st-ticket-list
            .tickets=${this._filtered}
            .narrow=${this._compact}
            .language=${lang}
            .labelMap=${this._labelMap}
            @select-ticket=${(e: CustomEvent<number>) => void this._open(e.detail)}
          ></st-ticket-list>
        </div>`}
        ${selecting ? html`<st-ticket-detail
          .ticket=${this._selected}
          .isAdmin=${this._admin}
          .language=${lang}
          .assignees=${this._assignees}
          .labelMap=${this._labelMap}
          @open-ticket=${(e: CustomEvent<number>) => void this._open(e.detail)}
          @patch-ticket=${(e: CustomEvent<TicketPatch>) => this._selected && void this._act((c) => c.update(this._selected!.id, e.detail))}
          @comment=${(e: CustomEvent<{ body: string; internal: boolean }>) => this._selected && void this._act((c) => c.comment(this._selected!.id, e.detail.body, e.detail.internal))}
          @close-ticket=${(e: CustomEvent<{ resolution: string; status: "resolved" | "closed" }>) => this._selected && void this._act((c) => c.close(this._selected!.id, e.detail.resolution, e.detail.status))}
        ></st-ticket-detail>` : nothing}
      </main>
      ${selecting
        ? nothing
        : html`<button class="fab" title="New ticket" @click=${() => (this._creating = true)}><ha-icon icon="mdi:plus"></ha-icon>New ticket</button>`}
      ${this._managingLabels && this._client
        ? html`<st-label-manager .client=${this._client} .labels=${this._labelList}
            @close=${() => (this._managingLabels = false)}
            @labels-changed=${() => void this._refresh()}></st-label-manager>`
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
