import { LitElement, html, css, nothing } from "lit";
import { state, property } from "lit/decorators.js";
import { safeCustomElement } from "./define";
import { sharedStyles } from "./styles";
import { HaClient } from "./ha-client";
import type { NewTicket } from "./ha-client";
import { ACTIVE, ENHANCEMENT, HISTORY, PRIORITIES } from "./types";
import type { Category, HomeAssistant, Label, Ticket, TicketPatch, TicketSummary } from "./types";
import { actorName, isAgent, PRIORITY_LABEL, type Person } from "./format";
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
  { id: "active", icon: "mdi:inbox-outline", label: "Inbox", count: true, match: (t) => t.status === "new" && !isHistory(t) && !isEnhancement(t) },
  { id: "progress", icon: "mdi:progress-wrench", label: "In Progress", count: true, match: (t) => (t.status === "in_progress" || t.status === "open") && !isHistory(t) },
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

const SCOPES_OPTIONS: DropdownOption[] = SCOPES.map(({ id, label }) => ({ id, label }));

const ADD_NEW = "___add_new___";
const NO_CATEGORY = "___none___";

const SEARCH_DEBOUNCE_MS = 250;
const POLL_MS = 20_000;
const COMPACT_QUERY = "(max-width: 870px)";

@safeCustomElement("home-desk-panel")
export class HomeDeskPanel extends LitElement {
  static override styles = [
    sharedStyles,
    css`
      /*
       * The panel fills the screen and never scrolls as a whole: the header and search bar stay put, and
       * the ticket list and the open ticket each scroll inside their own column. (!important because a
       * host page that styles this element as a plain block would otherwise break that.)
       */
      :host {
        display: flex !important;
        flex-direction: column;
        height: 100vh;
        height: 100dvh;
        overflow: hidden;
        background: var(--st-bg);
        position: relative;
        /*
         * The colour of the selected ticket: its row in the list, and the open ticket beside it. A soft tint of
         * the accent colour in a dark theme, and a light grey in a light one.
         */
        --st-selected: color-mix(in srgb, var(--st-accent) 7%, var(--st-surface));
        /* The open ticket's description and comments: the same tint at about half strength. */
        --st-selected-soft: color-mix(in srgb, var(--st-accent) 3%, var(--st-surface));
      }
      /* Light grey, kept lighter than the divider line so the edge between the list and the ticket stays visible. */
      :host([light]) {
        --st-selected: color-mix(in srgb, var(--st-fg) 5%, var(--st-surface));
        --st-selected-soft: color-mix(in srgb, var(--st-fg) 2%, var(--st-surface));
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
        .bar .side:not(.wide) {
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
        box-shadow: var(--st-shadow-m);
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
        display: grid;
        grid-template-columns: minmax(320px, 420px) minmax(0, 1fr);
        grid-template-rows: minmax(0, 1fr);
        min-height: 0;
        overflow: hidden;
      }
      .list-pane {
        position: relative;
        display: flex;
        flex-direction: column;
        min-height: 0;
        overflow: hidden;
        border-right: 1px solid var(--st-divider);
        background: var(--st-surface);
      }
      /* Narrow: one pane at a time. */
      @media (max-width: 870px) {
        main {
          grid-template-columns: minmax(0, 1fr);
        }
        main.has-selection .list-pane,
        main:not(.has-selection) st-ticket-detail {
          display: none;
        }
      }
      /* HA's data-table toolbar (hass-tabs-subpage-data-table): 56px, on the page background. */
      .toolbar {
        flex: none;
        display: flex;
        align-items: center;
        gap: var(--ha-space-4, 16px);
        height: 56px;
        padding: 0 16px;
        box-sizing: border-box;
        background: var(--st-bg);
        border-bottom: 1px solid var(--st-divider);
      }
      .toolbar.joined {
        border-bottom: none;
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
        left: 8px;
        --mdc-icon-size: 18px;
        color: var(--ha-color-text-secondary, var(--st-fg-secondary));
        pointer-events: none;
      }
      /* ha-input-search, outlined: 40px / 8px corners, and on wide screens 32px / 10px. */
      .search input[type="search"] {
        width: 100%;
        height: 40px;
        padding: 0 8px 0 34px;
        border: 1px solid var(--st-field-outline);
        border-radius: var(--ha-border-radius-md, 8px);
        background: var(--card-background-color, var(--st-surface));
        font-size: var(--st-fs-body);
        transition: border-color 250ms ease-in-out;
      }
      @media (min-width: 871px) {
        .search input[type="search"] {
          height: var(--st-h-bar);
          border-radius: var(--st-r-bar);
        }
      }
      .search input[type="search"]::placeholder {
        color: var(--ha-color-neutral-60, var(--st-fg-secondary));
        opacity: 1;
      }
      .search input[type="search"]:hover {
        border-color: var(--st-field-outline-hover);
      }
      .search input[type="search"]:focus {
        outline: none;
        border-color: var(--st-accent);
      }
      .toolbar .filter-btn {
        position: relative;
        flex: none;
        width: var(--st-h-bar);
        height: var(--st-h-bar);
        padding: 0;
        justify-content: center;
        border: 1px solid var(--st-outline);
        border-radius: var(--st-r-pill);
        background: transparent;
        color: var(--st-fg-secondary);
      }
      .toolbar .filter-btn ha-icon {
        --mdc-icon-size: 20px;
      }
      .toolbar .filter-btn.on {
        color: var(--st-accent);
        border-color: var(--st-accent);
        background: color-mix(in srgb, var(--st-accent) 14%, var(--st-surface));
      }
      .toolbar .filter-btn .dot {
        position: absolute;
        top: 4px;
        right: 4px;
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
        padding: 0 16px 12px;
        background: var(--st-bg);
        border-bottom: 1px solid var(--st-divider);
      }
      .filters st-dropdown {
        flex: 1 1 120px;
      }
      /*
       * New Ticket sits at the left of the toolbar as a round "+". Pointing at it opens it out to the right
       * over the search box, with the words, so the search doesn't move.
       */
      .toolbar .add-slot {
        position: relative;
        flex: none;
        width: var(--st-h-bar);
        height: var(--st-h-bar);
      }
      .toolbar .add-btn {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 3;
        box-sizing: border-box;
        width: max-content;
        min-width: var(--st-h-bar);
        height: var(--st-h-bar);
        padding: 0 5px;
        gap: 0;
        justify-content: flex-start;
        border: 1px solid var(--st-accent);
        border-radius: var(--st-r-pill);
        background: var(--st-accent);
        color: var(--text-primary-color, #fff);
        white-space: nowrap;
        font-size: var(--st-fs-body);
        font-weight: var(--ha-font-weight-medium, 500);
        transition: padding-right 200ms ease-in-out;
      }
      .toolbar .add-btn .words {
        max-width: 0;
        overflow: hidden;
        opacity: 0;
        transition:
          max-width 200ms ease-in-out,
          margin-left 200ms ease-in-out,
          opacity 150ms ease-in-out;
      }
      .toolbar .add-btn:hover,
      .toolbar .add-btn:focus-visible {
        padding-right: 12px;
        box-shadow: var(--st-shadow-m);
      }
      .toolbar .add-btn:hover .words,
      .toolbar .add-btn:focus-visible .words {
        max-width: 100px;
        margin-left: 4px;
        opacity: 1;
      }
      .toolbar .add-btn ha-icon {
        --mdc-icon-size: 20px;
      }
      @media (prefers-reduced-motion: reduce) {
        .toolbar .add-btn,
        .toolbar .add-btn .words {
          transition: none;
        }
      }
      st-ticket-list {
        flex: 1;
        min-height: 0;
      }
      st-ticket-detail {
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
  /** A category id, "none" for tickets with no category yet, or "" for any. */
  @state() private _category = "";
  /** A requester's name (as stored), or "" for anyone. */
  @state() private _person = "";
  @state() private _filtersOpen = false;
  /** True when only one pane fits: the list or the ticket, not both. */
  @state() private _compact = window.matchMedia(COMPACT_QUERY).matches;
  @state() private _scope = "";
  @state() private _menuOpen = false;
  @state() private _labelList: Label[] = [];
  @state() private _categoryList: Category[] = [];
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

  private get _filtered(): TicketSummary[] {
    const view = VIEWS.find((v) => v.id === this._view) ?? VIEWS[0]!;
    return this._tickets.filter(
      (t) =>
        view.match(t) &&
        (view.id !== "all" || !this._scope || SCOPES.find((x) => x.id === this._scope)!.match(t)) &&
        (!this._matchIds || this._matchIds.has(t.id)) &&
        (!this._priority || t.priority === this._priority) &&
        (!this._label || t.labels.includes(this._label)) &&
        (!this._person || t.requester === this._person) &&
        (!this._category || (this._category === "none" ? !t.category : t.category === this._category)),
    );
  }

  private get _priorityOptions(): DropdownOption[] {
    return [{ id: "", label: "Any Priority" }, ...PRIORITIES.map((id) => ({ id, label: PRIORITY_LABEL[id] }))];
  }

  private get _categoryOptions(): DropdownOption[] {
    return [
      { id: "", label: "Any Category" },
      { id: "none", label: "No Category" },
      ...this._categoryList.map((c) => ({ id: c.id, label: c.name })),
    ];
  }

  private get _personOptions(): DropdownOption[] {
    const names = [...new Set(this._tickets.map((t) => t.requester).filter(Boolean))].sort();
    if (this._person && !names.includes(this._person)) names.push(this._person);
    return [{ id: "", label: "Anyone" }, ...names.map((n) => ({ id: n, label: actorName(n) }))];
  }

  private get _labelOptions(): DropdownOption[] {
    return [{ id: "", label: "Any Label" }, ...this._labelList.map((x) => ({ id: x.id, label: x.name }))];
  }

  private get _filterCount(): number {
    return [this._category, this._priority, this._label, this._person, this._view === "all" ? this._scope : ""].filter(Boolean).length;
  }

  /** The AI agent a ticket can be handed to: one already seen on tickets, else Claude. */
  private get _agentName(): string {
    return this._tickets.map((t) => t.assignee ?? "").find((a) => a && isAgent(a)) ?? "claude";
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
              ? html`<button class="icon" title="Back" @click=${() => (this._page = "")}><ha-icon icon="mdi:arrow-left"></ha-icon></button>
                  <h1 class="crumb">${{ labels: "Labels", categories: "Categories", settings: "Settings" }[this._page]}</h1>`
              : html`${this.narrow
                  ? html`<button class="icon" title="Menu" @click=${() =>
                      this.dispatchEvent(new CustomEvent("hass-toggle-menu", { bubbles: true, composed: true }))}><ha-icon icon="mdi:menu"></ha-icon></button>`
                  : nothing}
                <h1>Home Desk</h1>`}
          </div>
          ${this._page ? html`<div class="tabs"></div>` : html`<div class="tabs" role="tablist">
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
          ${this._admin
            ? html`<button class="icon" title="Settings" aria-label="Settings" @click=${() => (this._page = "settings")}><ha-icon icon="mdi:cog-outline"></ha-icon></button>`
            : nothing}
          <button class="icon" title="More options" @click=${() => (this._menuOpen = !this._menuOpen)}><ha-icon icon="mdi:dots-vertical"></ha-icon></button>
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
            ? html`<st-settings .client=${this._client} .hass=${this.hass}></st-settings>`
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
            <button class="icon filter-btn ${this._filterCount ? "on" : ""}" title="Filters" aria-expanded=${this._filtersOpen}
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
                <st-dropdown label="Category" placeholder="Category" .options=${this._categoryOptions} .value=${this._category}
                  @change=${(e: CustomEvent<string>) => (this._category = e.detail)}></st-dropdown>
                <st-dropdown label="Raised By" placeholder="Raised By" .options=${this._personOptions} .value=${this._person}
                  @change=${(e: CustomEvent<string>) => (this._person = e.detail)}></st-dropdown>
                <st-dropdown label="Priority" placeholder="Priority" .options=${this._priorityOptions} .value=${this._priority}
                  @change=${(e: CustomEvent<string>) => (this._priority = e.detail)}></st-dropdown>
                <st-dropdown label="Label" placeholder="Label" .options=${this._labelOptions} .value=${this._label}
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
