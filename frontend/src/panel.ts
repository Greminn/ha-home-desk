import { LitElement, html, nothing } from "lit";
import { state, property } from "lit/decorators.js";
import { safeCustomElement } from "./define";
import { sharedStyles } from "./styles";
import { panelStyles } from "./panel-styles";
import { HaClient } from "./ha-client";
import type { NewTicket } from "./ha-client";
import type { Category, HomeAssistant, HomeDeskSettings, Label, Ticket, TicketPatch, TicketSummary } from "./types";
import { HISTORY } from "./types";
import { AI_ASSIGNEE, STATUS_LABEL, actorName, isAgent } from "./format";
import type { Person } from "./format";
import { VIEWS, filterTickets, matchesQuickly, rankHits, sortTickets, type ListFilters, type SortDir } from "./list-model";
import "./views/ticket-list";
import "./views/ticket-detail";
import "./views/new-ticket-dialog";
import "./views/label-manager";
import "./views/category-manager";
import "./views/settings-page";
import "./views/app-header";
import "./views/list-toolbar";
import type { TopBar } from "./views/top-bar";
import "./views/top-bar";
import "./views/report-form";
import type { Page } from "./views/app-header";
import "./views/dropdown";
import "./views/confirm-dialog";
import "./views/picker-popup";
import "./views/category-dialog";
import "./views/home-page";
import type { PickerItem } from "./views/picker-popup";
import type { DropdownOption } from "./views/dropdown";
import type { TabInfo } from "./views/top-bar";

const ADD_NEW = "___add_new___";
const NO_CATEGORY = "___none___";

const SEARCH_DEBOUNCE_MS = 250;
/** The most tickets kept open as chips in the top bar. */
type TabFilters = Pick<ListFilters, "category" | "priority" | "label" | "person">;
const NO_FILTERS: TabFilters = { category: "", priority: "", label: "", person: "" };
const MAX_TABS = 8;
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
  /** What the search box's drop down lists: tickets from every tab that match what is typed. */
  @state() private _hits: TicketSummary[] = [];
  @state() private _selected: Ticket | null = null;
  @state() private _selectedId: number | null = null;
  /** The tickets open as chips in the top bar, each remembering whether you had it in the full width view. */
  @state() private _tabs: { id: number; wide: boolean; preview?: boolean }[] = [];
  /** The ticket fills the page (the list is hidden): the full width view. */
  @state() private _wide = false;
  @state() private _view = "inbox";
  @state() private _q = "";
  /** A category id, "none" for tickets with no category yet, or "" for any. */
  /** A requester's name (as stored), or "" for anyone. */
  /** True when only one pane fits: the list or the ticket, not both. */
  @state() private _compact = window.matchMedia(COMPACT_QUERY).matches;
  /** Each tab has its own filters (kept for this visit only, not saved). */
  @state() private _tabFilters: Record<string, TabFilters> = {};
  @state() private _closingTabs = false;
  /** What is typed in the list's own search box (the top bar searches every ticket). */
  @state() private _listQuery = "";
  /** Each tab remembers its own sort (a taste, so it is kept in this browser; the filters are not). */
  @state() private _sorts: Record<string, { sort: string; dir: SortDir | "" }> = (() => {
    try {
      return JSON.parse(localStorage.getItem("home-desk-sorts") ?? "{}") as Record<string, { sort: string; dir: SortDir | "" }>;
    } catch {
      return {};
    }
  })();
  @state() private _labelList: Label[] = [];
  @state() private _categoryList: Category[] = [];
  /** Home Desk's options (admins); the AI agent comes from here. */
  @state() private _settings: HomeDeskSettings | null = null;
  /** A label waiting on "Remove Label?" before it comes off a ticket. */
  /** The category picker, open under the pill that was clicked. */
  /** The "add label" popup, opened from the + in the ticket header. */
  /** Merging the open ticket into another: first the picker (anchored at the button), then a confirmation. */
  @state() private _merging: { rect: DOMRect; ids?: number[] } | null = null;
  @state() private _deleting: Ticket | null = null;
  @state() private _mergeConfirm: { from: TicketSummary[]; into: TicketSummary } | null = null;
  /** Tickets ticked in the list (admins), and whether checkboxes show on every row. */
  /** Something that uses the AI plan, waiting for "yes" before it runs: asking now, or an assignment that starts the agent. */
  @state() private _confirmCost: { heading: string; text: string; run: () => Promise<void> } | null = null;
  @state() private _checked = new Set<number>();
  @state() private _ticking = false;
  private _lastChecked: number | null = null;
  /** When the open ticket was last looked at, from before it was opened (so what is new stays marked while it is open). */
  @state() private _seenAt = "";
  @state() private _pickingLabel: { ticket: TicketSummary; rect: DOMRect } | null = null;
  @state() private _picking: { ticket: TicketSummary; rect: DOMRect } | null = null;
  /** The New category dialog, and the ticket the new category goes on. */
  @state() private _newCategory: { ticket: TicketSummary; name: string; error: string } | null = null;
  @state() private _removing: { ticket: TicketSummary; label: Label } | null = null;
  /** A full-page view in place of the ticket list: the label or category manager, or the settings. */
  @state() private _page: Page = "home";
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
    if (changed.has("_page") && this._client) this._savePage(); // a refresh comes back to the same page, not always Home
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

  /**
   * The panel is as tall as the visible screen below wherever it starts. In the phone app the page begins under the status bar,
   * so a plain 100dvh is taller than what can be seen and the comment bar hangs off the bottom. Where it starts can change while
   * the page settles (and when the keyboard opens), so it is measured again on every change rather than once.
   */
  private _fitFrame = 0;
  private _fit = () => {
    window.cancelAnimationFrame(this._fitFrame);
    this._fitFrame = window.requestAnimationFrame(() => {
      const vv = window.visualViewport;
      const view = vv?.height ?? window.innerHeight;
      // The bottom edge of what can be seen. With the keyboard open iOS slides the visible area up inside the page (offsetTop),
      // so the panel has to end where that area ends, not just be as tall as it.
      const bottom = (vv?.offsetTop ?? 0) + view;
      this.style.height = `${Math.max(240, Math.floor(bottom - this.getBoundingClientRect().top))}px`;
      this.style.setProperty("--hd-view", `${Math.floor(view)}px`);
    });
  };
  private _fitTimers: number[] = [];

  override connectedCallback() {
    super.connectedCallback();
    this._fit();
    this._fitTimers = [300, 1000, 2500].map((ms) => window.setTimeout(this._fit, ms));
    window.addEventListener("resize", this._fit);
    window.addEventListener("orientationchange", this._fit);
    window.visualViewport?.addEventListener("resize", this._fit);
    window.visualViewport?.addEventListener("scroll", this._fit);
    this._mq.addEventListener("change", this._onCompact);
    document.addEventListener("visibilitychange", this._onVisible);
    window.addEventListener("click", this._onSidebarClick, true);
    if (this._client && !this._unsub) this._subscribe(); // reattached after being removed
  }

  override updated() {
    this._fit(); // where the panel starts can shift as the page above it settles
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    window.cancelAnimationFrame(this._fitFrame);
    this._fitTimers.forEach((id) => window.clearTimeout(id));
    window.removeEventListener("resize", this._fit);
    window.removeEventListener("orientationchange", this._fit);
    window.visualViewport?.removeEventListener("resize", this._fit);
    window.visualViewport?.removeEventListener("scroll", this._fit);
    this._mq.removeEventListener("change", this._onCompact);
    document.removeEventListener("visibilitychange", this._onVisible);
    window.removeEventListener("click", this._onSidebarClick, true);
    window.clearInterval(this._pollTimer);
    this._unsub?.();
    this._unsub = undefined;
    window.clearTimeout(this._searchTimer);
    window.clearTimeout(this._refreshTimer);
  }

  // ---- state persistence (per browser; storage can throw, so always guarded)

  private _restoreState() {
    try {
      const saved = JSON.parse(localStorage.getItem("home-desk-tabs") ?? "[]") as { id: number; wide?: boolean; preview?: boolean }[];
      if (Array.isArray(saved)) this._tabs = saved.filter((t) => Number.isInteger(t?.id)).map((t) => ({ id: t.id, wide: !!t.wide, preview: !!t.preview }));
    } catch {
      // No saved chips.
    }
    try {
      const page = localStorage.getItem("home-desk-page");
      if (page !== null && ["", "home", "report", "labels", "categories"].includes(page)) this._page = page as Page; // a ticket's own address still wins; Settings is never restored, so the sidebar icon opens Home
    } catch {
      // Fall through to Home.
    }
    try {
      const raw = localStorage.getItem("home-desk-view");
      const id = ({ active: "inbox", progress: "working", agent: "queued", all: "completed" } as Record<string, string>)[raw ?? ""] ?? raw; // tabs saved under their old names
      if (id && VIEWS.some((v) => v.id === id)) this._view = id;
    } catch {
      // Fall through to the default view.
    }
  }

  private _savePage() {
    try {
      localStorage.setItem("home-desk-page", this._page);
    } catch {
      // Not persisted; a refresh opens Home.
    }
  }

  private _saveTabs() {
    try {
      localStorage.setItem("home-desk-tabs", JSON.stringify(this._tabs));
    } catch {
      // Not persisted; the chips still work.
    }
  }

  /** A ticket you open gets a chip and keeps it until you close it. With more than MAX_TABS the oldest chip you are not on goes. */
  private _touchTab(id: number, preview: boolean) {
    if (this._tabs.some((t) => t.id === id)) return;
    // A ticket you only passed through (stepping, a list click, a search) takes the place of the previous preview chip.
    const at = preview ? this._tabs.findIndex((t) => t.preview) : -1;
    let tabs = at >= 0 ? this._tabs.map((t, i) => (i === at ? { id, wide: false, preview: true } : t)) : [...this._tabs, { id, wide: false, preview }];
    while (tabs.length > MAX_TABS) {
      const drop = tabs.findIndex((t) => t.id !== id);
      tabs = tabs.filter((_, i) => i !== drop);
    }
    this._tabs = tabs;
    this._saveTabs();
  }

  /** A preview chip becomes a real one once you do something with its ticket or click the chip. */
  private _keepTab(id: number | null) {
    if (id === null || !this._tabs.some((t) => t.id === id && t.preview)) return;
    this._tabs = this._tabs.map((t) => (t.id === id ? { ...t, preview: false } : t));
    this._saveTabs();
  }

  /** Go into or out of the full width view; the open ticket's chip remembers which. */
  private _setWide(on: boolean) {
    this._wide = on;
    const id = this._selectedId;
    if (id !== null && this._tabs.some((t) => t.id === id && t.wide !== on)) {
      this._tabs = this._tabs.map((t) => (t.id === id ? { ...t, wide: on } : t));
      this._saveTabs();
    }
  }

  private _closeTab(id: number) {
    const at = this._tabs.findIndex((t) => t.id === id);
    if (at < 0) return;
    this._tabs = this._tabs.filter((t) => t.id !== id);
    this._saveTabs();
    if (id !== this._selectedId) return;
    const next = this._tabs[Math.min(at, this._tabs.length - 1)];
    if (next) void this._open(next.id);
    else this._close();
  }

  /** The open tickets for the top bar, leaving out any that are gone (merged away or deleted). */
  private get _tabInfos(): TabInfo[] {
    const byId = new Map(this._tickets.map((t) => [t.id, t]));
    return this._tabs.flatMap((tab) => {
      const t = byId.get(tab.id);
      if (!t || t.merged_into) return [];
      return [{ id: t.id, title: t.title, status: t.status, priority: t.priority, unread: !!t.unread, queued: !!t.assignee && isAgent(t.assignee), enhancement: t.labels.includes("enhancement"), comments: t.comment_count, working: !!t.agent_state, preview: !!tab.preview }];
    });
  }

  private get _sortChoice(): { sort: string; dir: SortDir | "" } {
    return this._sorts[this._filters.view] ?? { sort: "", dir: "" };
  }

  private _setSort(sort: string, dir: SortDir | "") {
    this._sorts = { ...this._sorts, [this._filters.view]: { sort, dir } };
    try {
      localStorage.setItem("home-desk-sorts", JSON.stringify(this._sorts));
    } catch {
      /* private window: it just isn't remembered */
    }
  }

  private _setView(id: string) {
    this._view = id;
    this._listQuery = "";
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
    // A household user only has the report form: there is nothing to load for them.
    if (!this._client || !this._admin) return;
    try {
      [this._tickets, this._labelList, this._categoryList] = await Promise.all([
        this._client.list(),
        this._client.labels(),
        this._client.categories(),
      ]);
      if (this._admin) this._setSettings(await this._client.settings());
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
      const ticket = await this._client.get(id);
      if (this._selected?.id !== id || !this._seenAt) this._seenAt = ticket.seen_at ?? "";
      this._selected = ticket;
      if (this._tickets.find((t) => t.id === id)?.unread) void this._markRead([id]);
    } catch (err) {
      this._selected = null;
      this._selectedId = null;
      this._navigate(this._prefix);
      this._error = this._message(err);
    }
  }

  /** The master AI switch. Off hides every AI control (and the Queued for AI tab, so a saved or open view of it moves to the Inbox). */
  private get _aiOn(): boolean {
    return this._settings?.ai_enabled !== false;
  }

  private _setSettings(settings: HomeDeskSettings) {
    this._settings = settings;
    if (settings.ai_enabled === false && this._view === "queued") this._view = "inbox";
  }

  /** Whether the built-in AI agent can be asked to work (an AI Task agent is chosen in Settings), and its short name. */
  private get _canAsk(): boolean {
    return this._aiOn && !!this._settings?.agent?.startsWith("ai_task.");
  }

  /** The AI Home Assistant is asked to review a ticket, by its integration's name, for dialogs: "the AI (Claude)". */
  private get _agentLabel(): string {
    const entity = this._settings?.agent;
    const friendly = entity ? String(this.hass.states?.[entity]?.attributes["friendly_name"] ?? "") : "";
    const name = friendly.replace(/\s*(AI Task|conversation|agent)\s*$/i, "").trim() || "Claude";
    return `the AI (${name})`;
  }

  /** Ask before anything that costs: the person sees what will happen, and "Cancel" does nothing. */
  private _askCost(heading: string, text: string, run: () => Promise<void>) {
    this._confirmCost = { heading, text, run };
  }

  /** Run AI Agent Now: post the comment (the instruction), then ask the runner; see docs/agent-runs.md. */
  private _runNow(detail: { body: string; done: () => void }) {
    const ticket = this._selected;
    if (!ticket) return;
    this._askCost(
      "Run AI Agent?",
      `Run the AI Agent on ticket #${ticket.id}? It reads the ticket${detail.body ? " and your comment" : ""} and looks at it read-only, then says what it found and what it would change. Nothing changes until you press Proceed. It uses your AI plan.`,
      async () => {
        if (detail.body) await this._client?.comment(ticket.id, detail.body, false);
        detail.done();
        await this._act((c) => c.runAgentNow(ticket.id));
      },
    );
  }

  private _askNow(detail: { body: string; done: () => void }) {
    const ticket = this._selected;
    if (!ticket || !this._client) return;
    const name = this._agentLabel;
    this._askCost(
      "Review With AI?",
      `Review ticket #${ticket.id} with ${name}? It uses your AI plan and may cost money. It can only suggest changes for you to apply, and Queue for AI Agent stays as it is.`,
      async () => {
        const client = this._client!;
        if (detail.body) await client.comment(ticket.id, detail.body, false);
        detail.done();
        await this._act((c) => c.runAgent(ticket.id));
      },
    );
  }

  /** Mark tickets (or all, with no ids) as read: the list updates at once, the server in the background. */
  private async _markRead(ids?: number[]) {
    if (!this._client) return;
    this._tickets = this._tickets.map((t) => (!ids || ids.includes(t.id) ? { ...t, unread: false } : t));
    try {
      await this._client.markRead(ids);
    } catch {
      // The next refresh shows the truth.
    }
  }

  private async _runSearch() {
    if (!this._client) return;
    const q = this._q.trim();
    if (!q) {
      this._hits = [];
      return;
    }
    const found = (await this._client.list(q)).filter((t) => !t.merged_into);
    if (q === this._q.trim()) this._hits = rankHits(q, found); // not if you have typed on since

  }

  private _message(err: unknown): string {
    // Home Assistant rejects with {code, message}; a message can itself be an object, so never print one raw.
    const text = (v: unknown): string => {
      if (typeof v === "string") return v;
      if (v && typeof v === "object") {
        const o = v as { message?: unknown; code?: unknown };
        if (o.message !== undefined) return text(o.message);
        if (o.code !== undefined) return text(o.code);
        try {
          return JSON.stringify(v);
        } catch {
          return "Something went wrong";
        }
      }
      return String(v);
    };
    return text(err);
  }

  private async _act(fn: (client: HaClient) => Promise<Ticket>) {
    if (!this._client) return;
    try {
      this._keepTab(this._selectedId); // acting on a ticket makes its chip a real one
      this._selected = await fn(this._client);
      this._error = "";
      void this._refresh();
    } catch (err) {
      this._error = this._message(err);
    }
  }

  // ---- handlers

  private _search(q: string) {
    this._q = q;
    // The drop down answers at once from the tickets already loaded; the server's fuller search (descriptions, comments) follows.
    this._hits = q.trim() ? rankHits(q.trim(), this._tickets.filter((t) => !t.merged_into && matchesQuickly(t, q.trim()))) : [];
    window.clearTimeout(this._searchTimer);
    this._searchTimer = window.setTimeout(() => void this._runSearch(), SEARCH_DEBOUNCE_MS);
  }

  private async _open(id: number, navigate = true, preview = false) {
    if (this._selectedId !== id) this._seenAt = "";
    if (this._page === "home") this._setView("inbox"); // the list beside Home is the Inbox: keep it as you open a ticket
    this._page = "";
    this._selectedId = id;
    this._touchTab(id, preview);
    this._wide = this._tabs.find((t) => t.id === id)?.wide ?? false; // back to the view this ticket was last in
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

  /** Tickets the open one can be merged into: not itself, not ones already merged away; open ones first. */
  private get _mergeItems(): PickerItem[] {
    const ids = this._merging?.ids;
    if (ids) {
      // Merging ticked tickets: keep one of them. The oldest is the usual choice.
      return this._tickets
        .filter((t) => ids.includes(t.id))
        .sort((a, b) => a.id - b.id)
        .map((t, n) => ({ id: String(t.id), primary: `#${t.id} ${t.title}`, secondary: `${n === 0 ? "Oldest · " : ""}${STATUS_LABEL[t.status]} · ${actorName(t.requester)}`, icon: "mdi:ticket-outline" }));
    }
    const open = this._selectedId;
    const live = (t: TicketSummary) => t.status !== "resolved" && t.status !== "closed";
    return this._tickets
      .filter((t) => t.id !== open && !t.merged_into)
      .sort((a, b) => Number(live(b)) - Number(live(a)) || b.updated_at.localeCompare(a.updated_at))
      .map((t) => ({ id: String(t.id), primary: `#${t.id} ${t.title}`, secondary: `${STATUS_LABEL[t.status]} · ${actorName(t.requester)}`, icon: "mdi:ticket-outline" }));
  }

  private _mergePicked(id: string) {
    const ids = this._merging?.ids;
    this._merging = null;
    const into = this._tickets.find((t) => t.id === Number(id));
    const from = ids
      ? this._tickets.filter((t) => ids.includes(t.id) && t.id !== Number(id))
      : this._tickets.filter((t) => t.id === this._selectedId);
    if (from.length && into) this._mergeConfirm = { from, into };
  }

  private _toggleCheck({ id, range }: { id: number; range: boolean }) {
    const next = new Set(this._checked);
    const list = this._filtered.map((t) => t.id);
    if (range && this._lastChecked !== null && list.includes(this._lastChecked)) {
      const [a, b] = [list.indexOf(this._lastChecked), list.indexOf(id)].sort((x, y) => x - y);
      for (const n of list.slice(a, b! + 1)) next.add(n);
    } else if (next.has(id)) next.delete(id);
    else next.add(id);
    this._lastChecked = id;
    this._checked = next;
    if (next.size) this._ticking = true;
  }

  private _clearChecked() {
    this._checked = new Set();
    this._ticking = false;
    this._lastChecked = null;
  }

  private async _doMerge() {
    const m = this._mergeConfirm;
    this._mergeConfirm = null;
    if (!m || !this._client) return;
    try {
      await this._client.merge(m.into.id, m.from.map((t) => t.id));
      this._clearChecked();
      this._error = "";
      await this._refresh();
      await this._open(m.into.id);
    } catch (err) {
      this._error = this._message(err);
    }
  }

  /** Delete the open ticket for good, after the confirmation: it leaves the history, with its comments and files. */
  private async _doDelete() {
    const t = this._deleting;
    this._deleting = null;
    if (!t || !this._client) return;
    try {
      await this._client.deleteTicket(t.id);
      this._error = "";
      this._tabs = this._tabs.filter((x) => x.id !== t.id);
      this._saveTabs();
      if (this._selectedId === t.id) this._close();
      await this._refresh();
    } catch (err) {
      this._error = this._message(err);
    }
  }

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

  /** Home: the Home page, with no ticket open. */
  private _goHome() {
    this._page = "home";
    this._close();
  }

  /**
   * Choosing Home Desk in Home Assistant's sidebar always comes back to Home, even from a ticket, a list or Settings. Home Assistant
   * does not change the address when it is already this panel's, so the panel would not hear about it from the router: it watches
   * for the click on the sidebar's own link instead.
   */
  private _onSidebarClick = (e: MouseEvent) => {
    const path = e.composedPath();
    if (path.includes(this)) return; // a click inside the panel is the panel's own business
    const link = path.find((n): n is HTMLAnchorElement => n instanceof HTMLAnchorElement);
    if (!link) return;
    try {
      if (new URL(link.href, location.href).pathname === this._prefix) this._goHome();
    } catch {
      // A link without a usable address is not the sidebar's.
    }
  };

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
      this._setView("inbox");
      this._selected = ticket;
      void this._open(ticket.id);
      void this._refresh();
    } catch (err) {
      this._error = this._message(err);
    }
  }

  // ---- derived

  /** A change from the filter dropdowns. */
  private _applyFilters(c: Partial<ListFilters>) {
    this._setTabFilters(c);
  }

  /** The tab the list is showing (Home shows the Inbox beside it). */
  private get _viewId(): string {
    return this._page === "home" ? "inbox" : this._view;
  }

  private _setTabFilters(patch: Partial<TabFilters>, view = this._viewId) {
    this._tabFilters = { ...this._tabFilters, [view]: { ...(this._tabFilters[view] ?? NO_FILTERS), ...patch } };
  }

  private get _filters(): ListFilters {
    return { view: this._viewId, ...(this._tabFilters[this._viewId] ?? NO_FILTERS) };
  }

  /** The tickets Previous and Next move through: the list as filtered, or every ticket if the open one isn't in it. */
  private get _walk(): TicketSummary[] {
    const shown = this._filtered;
    if (this._selectedId === null || shown.some((t) => t.id === this._selectedId)) return shown;
    return this._tickets.filter((t) => !t.labels.includes(HISTORY)); // not in the list (a filter or search hides it): every ticket
  }

  private get _navPos(): { index: number; total: number } | null {
    const list = this._walk;
    const index = list.findIndex((t) => t.id === this._selectedId);
    return index < 0 ? null : { index, total: list.length };
  }

  /** Open the previous (-1) or next (+1) ticket in the list. */
  private _step(dir: number) {
    const pos = this._navPos;
    const target = pos ? this._walk[pos.index + dir] : undefined;
    if (target) void this._open(target.id, true, true);
  }

  private get _filtered(): TicketSummary[] {
    return sortTickets(filterTickets(this._tickets, this._filters, null).filter((t) => !this._listQuery.trim() || matchesQuickly(t, this._listQuery.trim())), this._filters.view, this._sortChoice.sort, this._sortChoice.dir);
  }

  /** What "Queue for AI Agent" stores: any AI the person runs themselves, so no particular name. */
  private get _agentName(): string {
    return AI_ASSIGNEE;
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

  /** The Home page: on a wide screen it fills the right pane beside the Inbox list; on a narrow one it stands alone with its own Inbox. */
  private _homeTemplate(compact: boolean) {
    return html`<st-home-page .tickets=${this._tickets} .language=${this.hass.language} .userName=${this.hass.user?.name ?? ""} .compact=${compact} .aiOn=${this._aiOn}
      @open-ticket=${(e: CustomEvent<number>) => void this._open(e.detail)}
      @go-view=${(e: CustomEvent<{ view: string; priority: string }>) => {
        this._page = "";
        this._close();
        this._setView(e.detail.view);
        this._setTabFilters({ ...NO_FILTERS, priority: e.detail.priority }, e.detail.view);
      }}></st-home-page>`;
  }

  override render() {
    if (!this.hass) return nothing;
    const lang = this.hass.language;
    const selecting = this._selectedId !== null;
    return html`
      <st-app-header .page=${this._page === "home" ? "" : this._page} .view=${this._page === "home" ? "" : this._view} .tickets=${this._tickets} .narrow=${this.narrow} .admin=${this._admin} .aiOn=${this._aiOn} .ticketOpen=${this._selectedId !== null}
        @page-change=${(e: CustomEvent<Page>) => (this._page = e.detail)}
        @view-change=${(e: CustomEvent<string>) => {
          this._page = "";
          this._setWide(false); // a tab means the list: back out of the full width view
          this._setView(e.detail);
          if (this._compact) this._close(); // one pane at a time: a tab shows its list, not the ticket that was open
        }}
        @search-open=${async () => {
          this._page = "";
          this._close(); // the search box is above the list
          await this.updateComplete;
          this.renderRoot.querySelector<TopBar>("st-top-bar")?.focusSearch();
        }}
        @go-home=${() => this._goHome()}
        @refresh=${() => void this._refresh()}
        @mark-all-read=${() => void this._markRead()}></st-app-header>
      ${this._error ? html`<div class="banner">${this._error}</div>` : nothing}
      ${!this._admin && this._client
        ? html`<st-report-form .client=${this._client}></st-report-form>`
        : this._page === "home" && this._client && this._compact
          ? this._homeTemplate(true)
        : this._page === "report" && this._client
        ? html`<st-report-form .client=${this._client}></st-report-form>`
        : this._page === "labels" && this._client
        ? html`<st-label-manager .client=${this._client} .labels=${this._labelList}
            @labels-changed=${() => void this._refresh()}></st-label-manager>`
        : this._page === "categories" && this._client
          ? html`<st-category-manager .client=${this._client} .categories=${this._categoryList}
              @categories-changed=${() => void this._refresh()}></st-category-manager>`
          : this._page === "settings" && this._client
            ? html`<st-settings .client=${this._client} .hass=${this.hass}
                @settings-changed=${(e: CustomEvent<HomeDeskSettings>) => this._setSettings(e.detail)}></st-settings>`
            : html`<main class=${`${selecting ? "has-selection" : ""} ${this._wide && selecting && !this._compact ? "wide" : ""}`}>
        <st-top-bar .q=${this._q} .tabs=${this._tabInfos} .activeId=${this._selectedId} .results=${this._hits}
          @open-result=${(e: CustomEvent<number>) => {
            this._q = "";
            this._hits = [];
            void this._open(e.detail, true, true);
          }}
          @tab-select=${(e: CustomEvent<number>) => { this._keepTab(e.detail); void this._open(e.detail); }}
          @tab-close=${(e: CustomEvent<number>) => this._closeTab(e.detail)}
          @tabs-close-all=${() => (this._closingTabs = true)}
          @search=${(e: CustomEvent<string>) => this._search(e.detail)}
          @new-ticket=${() => (this._creating = true)}></st-top-bar>
        <div class="list-pane">
          <st-list-toolbar .filters=${this._filters} .query=${this._listQuery} @list-query=${(e: CustomEvent<string>) => (this._listQuery = e.detail)} .sort=${this._sortChoice.sort} .sortDir=${this._sortChoice.dir} .tickets=${this._tickets}
            .categories=${this._categoryList} .labels=${this._labelList}
            .selectable=${this._admin} .selecting=${this._ticking} .checkedCount=${this._checked.size}
            @toggle-select=${() => (this._ticking ? this._clearChecked() : (this._ticking = true))}
            @clear-selection=${() => this._clearChecked()}
            @mark-read-selected=${() => void this._markRead([...this._checked]).then(() => this._clearChecked())}
            @select-all=${() => (this._checked = new Set(this._filtered.map((t) => t.id)))}
            @merge-selected=${(e: CustomEvent<{ rect: DOMRect }>) => (this._merging = { rect: e.detail.rect, ids: this._tickets.filter((t) => this._checked.has(t.id) && !t.merged_into).map((t) => t.id) })}
            @sort-change=${(e: CustomEvent<{ sort: string; dir: SortDir | "" }>) => this._setSort(e.detail.sort, e.detail.dir)}
            @filters-change=${(e: CustomEvent<Partial<ListFilters>>) => this._applyFilters(e.detail)}></st-list-toolbar>
          <st-ticket-list
            .tickets=${this._filtered}
            .view=${this._filters.view}
            .narrowed=${Object.values(this._tabFilters[this._viewId] ?? NO_FILTERS).some(Boolean) || !!this._listQuery.trim()}
            @clear-filters=${() => { this._setTabFilters(NO_FILTERS); this._listQuery = ""; }}
            .selectedId=${this._selectedId}
            .language=${lang}
            .isAdmin=${this._admin}
            .labelMap=${this._labelMap}
            .checked=${this._checked}
            .ticking=${this._ticking}
            .categoryMap=${new Map(this._categoryList.map((c) => [c.id, c]))}
            @toggle-check=${(e: CustomEvent<{ id: number; range: boolean }>) => this._toggleCheck(e.detail)}
            @select-ticket=${(e: CustomEvent<number>) => void this._open(e.detail, true, true)}
            @filter-person=${(e: CustomEvent<string>) => this._setTabFilters({ person: e.detail })}
            @pick-category=${(e: CustomEvent<{ ticket: TicketSummary; rect: DOMRect }>) => (this._picking = e.detail)}
            @remove-label=${(e: CustomEvent<{ ticket: TicketSummary; label: Label }>) => (this._removing = e.detail)}
          ></st-ticket-list>
        </div>
        ${this._page === "home" ? this._homeTemplate(false) : html`
        <st-ticket-detail
          .ticket=${this._selected}
          .client=${this._client}
          .isAdmin=${this._admin}
          .narrow=${this._compact}
          .wide=${this._wide}
          @toggle-wide=${() => this._setWide(!this._wide)}
          @close-active=${() => this._selectedId !== null && this._closeTab(this._selectedId)}
          .language=${lang}
          .navPos=${this._navPos}
          @nav-ticket=${(e: CustomEvent<number>) => this._step(e.detail)}
          .seenAt=${this._seenAt}
          .me=${this.hass.user?.name ?? ""}
          .agentName=${this._agentName}
          .labelMap=${this._labelMap}
          .people=${this._people}
          .categoryMap=${new Map(this._categoryList.map((c) => [c.id, c]))}
          @pick-category=${(e: CustomEvent<{ ticket: TicketSummary; rect: DOMRect }>) => (this._picking = e.detail)}
          @remove-label=${(e: CustomEvent<{ ticket: TicketSummary; label: Label }>) => (this._removing = e.detail)}
          @pick-label=${(e: CustomEvent<{ ticket: TicketSummary; rect: DOMRect }>) => (this._pickingLabel = e.detail)}
          @pick-merge=${(e: CustomEvent<{ rect: DOMRect }>) => (this._merging = e.detail)}
          @delete-ticket=${() => (this._deleting = this._selected)}
          @back=${() => this._close()}
          @open-ticket=${(e: CustomEvent<number>) => void this._open(e.detail)}
          .hass=${this.hass}
          .canAsk=${this._canAsk}
          .aiOn=${this._aiOn}
          .canRun=${this._aiOn && !!this._settings?.agent_runner}
          @run-agent=${(e: CustomEvent<{ body: string; done: () => void }>) => this._runNow(e.detail)}
          @proceed=${(e: CustomEvent<{ eventId: number; action: "approve" | "dismiss" }>) => this._selected && void this._act((c) => c.proceed(this._selected!.id, e.detail.eventId, e.detail.action))}
          @proposal=${(e: CustomEvent<{ eventId: number; action: "apply" | "dismiss" }>) => this._selected && void this._act((c) => c.proposal(this._selected!.id, e.detail.eventId, e.detail.action))}
          @ask-ai=${(e: CustomEvent<{ body: string; done: () => void }>) => this._askNow(e.detail)}
          @patch-ticket=${(e: CustomEvent<TicketPatch>) => this._selected && void this._act((c) => c.update(this._selected!.id, e.detail))}
          @comment=${(e: CustomEvent<{ body: string; internal: boolean }>) => this._selected && void this._act((c) => c.comment(this._selected!.id, e.detail.body, e.detail.internal))}
          @close-ticket=${(e: CustomEvent<{ resolution: string; status: "resolved" | "closed" }>) => this._selected && void this._act((c) => c.close(this._selected!.id, e.detail.resolution, e.detail.status))}
        ></st-ticket-detail>`}
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
      ${this._merging
        ? html`<st-picker-popup .rect=${this._merging.rect} .items=${this._mergeItems} emptyLabel="No other tickets"
            @close=${() => (this._merging = null)}
            @pick=${(e: CustomEvent<{ id: string }>) => this._mergePicked(e.detail.id)}></st-picker-popup>`
        : nothing}
      ${this._mergeConfirm
        ? html`<st-confirm-dialog heading="Merge Tickets?" confirmLabel="Merge" danger
            body="Merge ${this._mergeConfirm.from.map((t) => "#" + t.id).join(", ")} into #${this._mergeConfirm.into.id} (${this._mergeConfirm.into.title})? The comments, labels and files of ${this._mergeConfirm.from.length > 1 ? "the others" : "#" + this._mergeConfirm.from[0]!.id} move to #${this._mergeConfirm.into.id}, and ${this._mergeConfirm.from.length > 1 ? "they are" : "it is"} closed. This can't be undone."
            @cancel=${() => (this._mergeConfirm = null)}
            @confirm=${() => void this._doMerge()}></st-confirm-dialog>`
        : nothing}
      ${this._deleting
        ? html`<st-confirm-dialog heading="Delete Ticket?" confirmLabel="Delete" danger
            body="Delete #${this._deleting.id} for good, with its comments and files? This can't be undone."
            @cancel=${() => (this._deleting = null)}
            @confirm=${() => void this._doDelete()}></st-confirm-dialog>`
        : nothing}
      ${this._closingTabs
        ? html`<st-confirm-dialog heading="Close All Tickets?" confirmLabel="Close All"
            body="Close all ${this._tabs.length} open ticket${this._tabs.length === 1 ? "" : "s"} in the bar? The tickets themselves aren't changed."
            @cancel=${() => (this._closingTabs = false)}
            @confirm=${() => {
              this._closingTabs = false;
              this._tabs = [];
              this._saveTabs();
              this._close();
            }}></st-confirm-dialog>`
        : nothing}
      ${this._confirmCost
        ? html`<st-confirm-dialog heading=${this._confirmCost.heading} confirmLabel="Yes, Go Ahead" body=${this._confirmCost.text}
            @cancel=${() => (this._confirmCost = null)}
            @confirm=${() => {
              const run = this._confirmCost!.run;
              this._confirmCost = null;
              void run();
            }}></st-confirm-dialog>`
        : nothing}
      ${this._removing
        ? html`<st-confirm-dialog heading="Remove Label?" confirmLabel="Remove" danger
            body="Are you sure you want to remove label ${this._removing.label.name} from this ticket?"
            @cancel=${() => (this._removing = null)}
            @confirm=${() => void this._removeLabel()}></st-confirm-dialog>`
        : nothing}
      ${this._creating
        ? html`<st-new-ticket-dialog .isAdmin=${this._admin} .hass=${this.hass} .categories=${this._categoryList}
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
