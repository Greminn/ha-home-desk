import { LitElement, html, nothing } from "lit";
import { state, property } from "lit/decorators.js";
import { safeCustomElement } from "./define";
import { sharedStyles } from "./styles";
import { panelStyles } from "./panel-styles";
import { HaClient } from "./ha-client";
import type { NewTicket } from "./ha-client";
import type { Category, HomeAssistant, HomeDeskSettings, Label, Ticket, TicketPatch, TicketSummary } from "./types";
import type { Person } from "./format";
import {
  VIEWS, SCOPES_OPTIONS, agentOptions, categoryOptions, filterCount, filterTickets, labelOptions, personOptions,
  priorityOptions, type ListFilters,
} from "./list-model";
import "./views/ticket-list";
import "./views/ticket-detail";
import "./views/new-ticket-dialog";
import "./views/label-manager";
import "./views/category-manager";
import "./views/settings-page";
import "./views/dropdown";
import "./views/confirm-dialog";
import "./views/picker-popup";
import "./views/category-dialog";
import type { PickerItem } from "./views/picker-popup";
import type { DropdownOption } from "./views/dropdown";

const ADD_NEW = "___add_new___";
const NO_CATEGORY = "___none___";

const SEARCH_DEBOUNCE_MS = 250;
const POLL_MS = 20_000;
const COMPACT_QUERY = "(max-width: 870px)";

@safeCustomElement("home-desk-panel")
export class HomeDeskPanel extends LitElement {
  static override styles = [sharedStyles, panelStyles];

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
  /** A category id, "none" for tickets with no category yet, or "" for any. */
  @state() private _category = "";
  /** A requester's name (as stored), or "" for anyone. */
  @state() private _person = "";
  /** "" for any, "with" for tickets assigned to the AI agent, "without" for the rest. */
  @state() private _agentFilter = "";
  @state() private _filtersOpen = false;
  /** True when only one pane fits: the list or the ticket, not both. */
  @state() private _compact = window.matchMedia(COMPACT_QUERY).matches;
  @state() private _scope = "";
  @state() private _menuOpen = false;
  @state() private _labelList: Label[] = [];
  @state() private _categoryList: Category[] = [];
  /** Home Desk's options (admins); the AI agent comes from here. */
  @state() private _settings: HomeDeskSettings | null = null;
  /** A label waiting on "Remove Label?" before it comes off a ticket. */
  /** The category picker, open under the pill that was clicked. */
  /** The "add label" popup, opened from the + in the ticket header. */
  @state() private _pickingLabel: { ticket: TicketSummary; rect: DOMRect } | null = null;
  @state() private _picking: { ticket: TicketSummary; rect: DOMRect } | null = null;
  /** The New category dialog, and the ticket the new category goes on. */
  @state() private _newCategory: { ticket: TicketSummary; name: string; error: string } | null = null;
  @state() private _removing: { ticket: TicketSummary; label: Label } | null = null;
  /** A full-page view in place of the ticket list: the label or category manager, or the settings. */
  @state() private _page: "" | "labels" | "categories" | "settings" = "";
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

  /**
   * Is the theme light? Read from the card colour, since a custom theme can be either. Sets the `light`
   * attribute that the selected-ticket colour keys off. Runs when the theme changes, not on every HA update.
   */
  recheckTheme() {
    const probe = document.createElement("span");
    probe.style.color = "var(--card-background-color)";
    this.renderRoot.appendChild(probe);
    const m = /rgba?\((\d+)[ ,]+(\d+)[ ,]+(\d+)/.exec(getComputedStyle(probe).color);
    probe.remove();
    if (m) this.toggleAttribute("light", (0.299 * +m[1]! + 0.587 * +m[2]! + 0.114 * +m[3]!) / 255 > 0.5);
  }

  private _themeKey: unknown;

  override willUpdate(changed: Map<string, unknown>) {
    if (changed.has("hass") && this.hass) {
      const key = (this.hass as { themes?: unknown }).themes;
      if (key !== this._themeKey || !this.hasUpdated) {
        this._themeKey = key;
        void this.updateComplete.then(() => this.recheckTheme());
      }
    }
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
      [this._tickets, this._labelList, this._categoryList] = await Promise.all([
        this._client.list(),
        this._client.labels(),
        this._client.categories(),
      ]);
      if (this._admin) this._settings = await this._client.settings();
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

  // ---- categories: pick one for a ticket, or make a new one on the spot (as HA's category picker does)

  private get _pickerItems(): PickerItem[] {
    const sorted = this._picking?.ticket.category;
    return [
      ...(sorted ? [{ id: NO_CATEGORY, primary: "No Category", icon: "mdi:shape-outline" }] : []),
      ...this._categoryList.map((c) => ({ id: c.id, primary: c.name, icon: c.icon || "mdi:tag-outline" })),
    ];
  }

  private _pickerAdditional = (search: string): PickerItem[] => {
    const taken = this._categoryList.some((c) => c.name.toLowerCase() === search.toLowerCase());
    return search && !taken
      ? [{ id: ADD_NEW + search, primary: `Add New Category '${search}'`, icon: "mdi:plus" }]
      : [{ id: ADD_NEW, primary: "Add New Category…", icon: "mdi:plus" }];
  };

  private get _labelPickerItems(): PickerItem[] {
    const have = new Set(this._pickingLabel?.ticket.labels ?? []);
    return this._labelList
      .filter((l) => !have.has(l.id))
      .map((l) => ({ id: l.id, primary: l.name, icon: l.icon || "mdi:label-outline", ...(l.description ? { secondary: l.description } : {}) }));
  }

  /** A name that matches no label offers to create it (the backend makes the label when a ticket is given the name). */
  private _labelPickerAdditional = (search: string): PickerItem[] => {
    const taken = this._labelList.some((l) => l.name.toLowerCase() === search.toLowerCase());
    return search && !taken ? [{ id: ADD_NEW + search, primary: `Add New Label '${search}'`, icon: "mdi:plus" }] : [];
  };

  private async _labelPicked({ id }: { id: string }) {
    const picking = this._pickingLabel;
    this._pickingLabel = null;
    if (!picking || !this._client) return;
    const label = id.startsWith(ADD_NEW) ? id.slice(ADD_NEW.length) : id;
    try {
      await this._client.update(picking.ticket.id, { labels: [...picking.ticket.labels, label] });
      this._error = "";
      void this._refresh();
    } catch (err) {
      this._error = this._message(err);
    }
  }

  private async _picked({ id }: { id: string; search: string }) {
    const picking = this._picking;
    this._picking = null;
    if (!picking) return;
    if (id.startsWith(ADD_NEW)) this._newCategory = { ticket: picking.ticket, name: id.slice(ADD_NEW.length), error: "" };
    else await this._setCategory(picking.ticket, id === NO_CATEGORY ? null : id);
  }

  private async _setCategory(ticket: TicketSummary, category: string | null) {
    if (!this._client) return;
    try {
      await this._client.update(ticket.id, { category });
      this._error = "";
      void this._refresh();
    } catch (err) {
      this._error = this._message(err);
    }
  }

  private async _createCategory(fields: { name: string; icon: string }) {
    const target = this._newCategory;
    if (!target || !this._client) return;
    try {
      const made = await this._client.createCategory(fields);
      this._newCategory = null;
      await this._setCategory(target.ticket, made.id);
    } catch (err) {
      this._newCategory = { ...target, error: this._message(err) };
    }
  }

  /** Take the confirmed label off its ticket; the rest of the ticket is left alone. */
  private async _removeLabel() {
    const r = this._removing;
    this._removing = null;
    if (!r || !this._client) return;
    try {
      await this._client.update(r.ticket.id, { labels: r.ticket.labels.filter((id) => id !== r.label.id) });
      this._error = "";
      void this._refresh();
    } catch (err) {
      this._error = this._message(err);
    }
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

  private get _filters(): ListFilters {
    return {
      view: this._view, scope: this._scope, category: this._category, priority: this._priority,
      label: this._label, person: this._person, agent: this._agentFilter,
    };
  }

  private get _filtered(): TicketSummary[] {
    return filterTickets(this._tickets, this._filters, this._matchIds);
  }

  private get _filterCount(): number {
    return filterCount(this._filters);
  }

  /**
   * The AI agent a ticket is assigned to, written as "ai:<name>" so it is always recognised as an agent. The name
   * comes from the agent chosen in Settings (an AI Task or conversation entity: "Claude AI Task" becomes Claude).
   */
  private get _agentName(): string {
    const entity = this._settings?.agent;
    const friendly = entity ? String(this.hass.states?.[entity]?.attributes["friendly_name"] ?? "") : "";
    const name = friendly.replace(/\s*(AI Task|conversation|agent)\s*$/i, "").trim();
    return `ai:${name || "Claude"}`;
  }

  /** Household members by lower-case name, with their profile pictures, from HA's person entities. */
  private get _people(): Map<string, Person> {
    const out = new Map<string, Person>();
    for (const [id, st] of Object.entries(this.hass?.states ?? {})) {
      if (!id.startsWith("person.")) continue;
      const name = String(st.attributes["friendly_name"] ?? id.slice(7));
      const picture = st.attributes["entity_picture"];
      out.set(name.toLowerCase(), { name, ...(typeof picture === "string" && picture ? { picture } : {}) });
    }
    return out;
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
          <div class="side ${this._page ? "wide" : ""}">
            ${this._page
              ? html`<button class="icon" title="Back" aria-label="Back" @click=${() => (this._page = "")}><ha-icon icon="mdi:arrow-left"></ha-icon></button>
                  <h1 class="crumb">${{ labels: "Labels", categories: "Categories", settings: "Settings" }[this._page]}</h1>`
              : html`${this.narrow
                  ? html`<button class="icon" title="Menu" @click=${() =>
                      this.dispatchEvent(new CustomEvent("hass-toggle-menu", { bubbles: true, composed: true }))}><ha-icon icon="mdi:menu"></ha-icon></button>`
                  : nothing}
                <h1><svg class="mark" viewBox="0 0 86.2 86.2" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M84.15 19.86 84.66 19.10 85.07 18.28 85.36 17.41 85.47 16.97 85.59 16.06 85.59 15.14 85.47 14.23 85.36 13.79 85.07 12.92 84.66 12.10 84.42 11.71 83.86 10.98 83.22 10.34 82.86 10.05 82.10 9.54 81.28 9.13 80.41 8.84 79.51 8.66 79.06 8.61 78.60 8.60 77.69 8.66 76.79 8.84 75.92 9.13 75.10 9.54 74.34 10.05 73.98 10.34 57.89 26.41 65.19 32.80 65.76 33.34 66.20 33.82 66.84 34.65 67.32 35.43 67.77 36.33 83.55 20.55ZM35.60 12.37 34.89 12.03 34.15 11.78 33.38 11.62 32.60 11.57 32.21 11.59 31.43 11.69 31.05 11.78 30.31 12.03 29.60 12.37 28.95 12.81 2.65 35.81 2.09 36.36 1.84 36.67 1.41 37.32 1.22 37.67 0.92 38.39 0.72 39.15 0.61 39.93 0.60 40.32 0.61 71.99 0.72 72.77 0.92 73.53 1.22 74.25 1.61 74.93 2.09 75.56 2.64 76.11 3.27 76.59 3.95 76.98 4.67 77.28 5.05 77.40 5.82 77.55 6.60 77.60 58.99 77.59 59.77 77.48 60.53 77.28 61.25 76.98 61.93 76.59 62.56 76.11 63.11 75.56 63.59 74.93 63.98 74.25 64.28 73.53 64.40 73.15 64.55 72.38 64.60 71.60 64.60 40.32 64.55 39.55 37.55 66.55 36.86 67.15 36.10 67.66 35.28 68.07 34.41 68.36 33.97 68.47 33.06 68.59 32.14 68.59 31.23 68.47 30.79 68.36 29.92 68.07 29.10 67.66 28.34 67.15 27.98 66.86 11.65 50.55 11.34 50.22 10.78 49.49 10.32 48.70 9.97 47.85 9.73 46.97 9.66 46.51 9.60 45.60 9.66 44.69 9.84 43.79 10.13 42.92 10.54 42.10 11.05 41.34 11.65 40.65 12.34 40.05 13.10 39.54 13.92 39.13 14.79 38.84 15.69 38.66 16.60 38.60 17.51 38.66 18.41 38.84 18.85 38.97 19.70 39.32 20.49 39.78 21.22 40.34 32.60 51.70 55.05 29.25 36.55 13.06 35.93 12.58Z"/></svg><span>Home Desk</span></h1>`}
          </div>
          ${this._page ? html`<div class="tabs"></div>` : html`<div class="tabs" role="tablist">
            ${VIEWS.map(
              (v) => html`<button class="tab ${v.id === this._view ? "active" : ""}" role="tab" title=${v.label} aria-label=${v.label}
                aria-selected=${v.id === this._view} @click=${() => this._setView(v.id)}>
                <ha-icon .icon=${v.icon}></ha-icon><span class="tab-text">${v.label}</span>${v.count
                  ? html`<span class="count">${this._tickets.filter(v.match).length}</span>`
                  : nothing}
              </button>`,
            )}
          </div>`}
          <div class="side end">
          ${this._admin
            ? html`<button class="icon" title="Settings" aria-label="Settings" @click=${() => (this._page = "settings")}><ha-icon icon="mdi:cog-outline"></ha-icon></button>`
            : nothing}
          <button class="icon" title="More options" aria-label="More options" aria-haspopup="menu" aria-expanded=${this._menuOpen} @click=${() => (this._menuOpen = !this._menuOpen)}><ha-icon icon="mdi:dots-vertical"></ha-icon></button>
          ${this._menuOpen
            ? html`<button class="menu-backdrop" aria-label="Close menu" @click=${() => (this._menuOpen = false)}></button>
                <div class="menu-popover" role="menu">
                  <button role="menuitem" @click=${() => { this._menuOpen = false; void this._refresh(); }}><ha-icon icon="mdi:refresh"></ha-icon>Refresh</button>
                  ${this._admin
                    ? html`<button role="menuitem" @click=${() => { this._menuOpen = false; this._page = "labels"; }}><ha-icon icon="mdi:label-multiple-outline"></ha-icon>Manage Labels</button>
                        <button role="menuitem" @click=${() => { this._menuOpen = false; this._page = "categories"; }}><ha-icon icon="mdi:shape-outline"></ha-icon>Manage Categories</button>`
                    : nothing}
                </div>`
            : nothing}
          </div>
        </div>
      </header>
      ${this._error ? html`<div class="banner">${this._error}</div>` : nothing}
      ${this._page === "labels" && this._client
        ? html`<st-label-manager .client=${this._client} .labels=${this._labelList}
            @labels-changed=${() => void this._refresh()}></st-label-manager>`
        : this._page === "categories" && this._client
          ? html`<st-category-manager .client=${this._client} .categories=${this._categoryList}
              @categories-changed=${() => void this._refresh()}></st-category-manager>`
          : this._page === "settings" && this._client
            ? html`<st-settings .client=${this._client} .hass=${this.hass}
                @settings-changed=${(e: CustomEvent<HomeDeskSettings>) => (this._settings = e.detail)}></st-settings>`
            : html`<main class=${selecting ? "has-selection" : ""}>
        <div class="list-pane">
          <div class="toolbar ${this._filtersOpen ? "joined" : ""}">
            <span class="add-slot">
              <button class="icon add-btn" title="New Ticket" aria-label="New Ticket" @click=${() => (this._creating = true)}>
                <ha-icon icon="mdi:plus"></ha-icon><span class="words">New Ticket</span>
              </button>
            </span>
            <div class="search">
              <ha-icon icon="mdi:magnify"></ha-icon>
              <input type="search" placeholder="Search tickets" aria-label="Search tickets" .value=${this._q} @input=${this._onSearch} />
            </div>
            <button class="icon filter-btn ${this._filterCount ? "on" : ""}" title="Filters" aria-label="Filters" aria-expanded=${this._filtersOpen}
              @click=${() => (this._filtersOpen = !this._filtersOpen)}>
              <ha-icon icon="mdi:filter-variant"></ha-icon>${this._filterCount ? html`<span class="dot"></span>` : nothing}
            </button>
          </div>
          ${this._filtersOpen
            ? html`<div class="filters">
                ${this._view === "all"
                  ? html`<st-dropdown label="Show" .options=${SCOPES_OPTIONS} .value=${this._scope}
                      @change=${(e: CustomEvent<string>) => (this._scope = e.detail)}></st-dropdown>`
                  : nothing}
                <st-dropdown label="Category" placeholder="Category" .options=${categoryOptions(this._categoryList)} .value=${this._category}
                  @change=${(e: CustomEvent<string>) => (this._category = e.detail)}></st-dropdown>
                <st-dropdown label="Raised By" placeholder="Raised By" .options=${personOptions(this._tickets, this._person)} .value=${this._person}
                  @change=${(e: CustomEvent<string>) => (this._person = e.detail)}></st-dropdown>
                <st-dropdown label="AI Agent" placeholder="AI Agent" .options=${agentOptions()} .value=${this._agentFilter}
                  @change=${(e: CustomEvent<string>) => (this._agentFilter = e.detail)}></st-dropdown>
                <st-dropdown label="Priority" placeholder="Priority" .options=${priorityOptions()} .value=${this._priority}
                  @change=${(e: CustomEvent<string>) => (this._priority = e.detail)}></st-dropdown>
                <st-dropdown label="Label" placeholder="Label" .options=${labelOptions(this._labelList)} .value=${this._label}
                  @change=${(e: CustomEvent<string>) => (this._label = e.detail)}></st-dropdown>
              </div>`
            : nothing}
          <st-ticket-list
            .tickets=${this._filtered}
            .selectedId=${this._selectedId}
            .language=${lang}
            .isAdmin=${this._admin}
            .labelMap=${this._labelMap}
            .categoryMap=${new Map(this._categoryList.map((c) => [c.id, c]))}
            @select-ticket=${(e: CustomEvent<number>) => void this._open(e.detail)}
            @filter-person=${(e: CustomEvent<string>) => {
              this._person = e.detail;
              this._filtersOpen = true;
            }}
            @pick-category=${(e: CustomEvent<{ ticket: TicketSummary; rect: DOMRect }>) => (this._picking = e.detail)}
            @remove-label=${(e: CustomEvent<{ ticket: TicketSummary; label: Label }>) => (this._removing = e.detail)}
          ></st-ticket-list>
        </div>
        <st-ticket-detail
          .ticket=${this._selected}
          .isAdmin=${this._admin}
          .narrow=${this._compact}
          .language=${lang}
          .agentName=${this._agentName}
          .labelMap=${this._labelMap}
          .people=${this._people}
          .categoryMap=${new Map(this._categoryList.map((c) => [c.id, c]))}
          @pick-category=${(e: CustomEvent<{ ticket: TicketSummary; rect: DOMRect }>) => (this._picking = e.detail)}
          @remove-label=${(e: CustomEvent<{ ticket: TicketSummary; label: Label }>) => (this._removing = e.detail)}
          @pick-label=${(e: CustomEvent<{ ticket: TicketSummary; rect: DOMRect }>) => (this._pickingLabel = e.detail)}
          @back=${() => this._close()}
          @open-ticket=${(e: CustomEvent<number>) => void this._open(e.detail)}
          @patch-ticket=${(e: CustomEvent<TicketPatch>) => this._selected && void this._act((c) => c.update(this._selected!.id, e.detail))}
          @comment=${(e: CustomEvent<{ body: string; internal: boolean }>) => this._selected && void this._act((c) => c.comment(this._selected!.id, e.detail.body, e.detail.internal))}
          @close-ticket=${(e: CustomEvent<{ resolution: string; status: "resolved" | "closed" }>) => this._selected && void this._act((c) => c.close(this._selected!.id, e.detail.resolution, e.detail.status))}
        ></st-ticket-detail>
      </main>`}
      ${this._pickingLabel
        ? html`<st-picker-popup .rect=${this._pickingLabel.rect} .items=${this._labelPickerItems} .additional=${this._labelPickerAdditional}
            emptyLabel="No more labels to add"
            @close=${() => (this._pickingLabel = null)}
            @pick=${(e: CustomEvent<{ id: string; search: string }>) => void this._labelPicked(e.detail)}></st-picker-popup>`
        : nothing}
      ${this._picking
        ? html`<st-picker-popup .rect=${this._picking.rect} .items=${this._pickerItems} .additional=${this._pickerAdditional}
            .value=${this._picking.ticket.category ?? ""} emptyLabel="No categories available"
            @close=${() => (this._picking = null)}
            @pick=${(e: CustomEvent<{ id: string; search: string }>) => void this._picked(e.detail)}></st-picker-popup>`
        : nothing}
      ${this._newCategory
        ? html`<st-category-dialog .name=${this._newCategory.name} .error=${this._newCategory.error}
            @close=${() => (this._newCategory = null)}
            @create=${(e: CustomEvent<{ name: string; icon: string }>) => void this._createCategory(e.detail)}></st-category-dialog>`
        : nothing}
      ${this._removing
        ? html`<st-confirm-dialog heading="Remove Label?" confirmLabel="Remove" danger
            body="Are you sure you want to remove label ${this._removing.label.name} from this ticket?"
            @cancel=${() => (this._removing = null)}
            @confirm=${() => void this._removeLabel()}></st-confirm-dialog>`
        : nothing}
      ${this._creating
        ? html`<st-new-ticket-dialog .isAdmin=${this._admin} .categories=${this._categoryList}
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
