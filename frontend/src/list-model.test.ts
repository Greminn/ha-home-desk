import { describe, expect, it } from "vitest";
import { bucket, defaultSort, filterTickets, matchesQuickly, rankHits, sortOptions, sortTickets, ticketNumber, whereIs } from "./list-model";
import type { ListFilters } from "./list-model";
import type { TicketSummary } from "./types";

let next = 0;
/** A ticket with plain defaults; each test names only what matters to it. */
const ticket = (over: Partial<TicketSummary> = {}): TicketSummary => ({
  id: ++next,
  title: "A ticket",
  status: "new",
  priority: "normal",
  requester: "Simon",
  assignee: null,
  category: null,
  labels: [],
  entities: [],
  links: [],
  legacy_ref: null,
  source: null,
  created_at: "2026-10-01T00:00:00Z",
  updated_at: "2026-10-01T00:00:00Z",
  closed_at: null,
  comment_count: 0,
  has_resolution: false,
  ...over,
});

const NONE: ListFilters = { view: "inbox", category: "", priority: "", label: "", person: "" };

describe("which tab a ticket is in", () => {
  it("puts every ticket in exactly one tab, the first that fits", () => {
    expect(bucket(ticket({ status: "resolved" }))).toBe("completed");
    expect(bucket(ticket({ status: "closed" }))).toBe("completed");
    expect(bucket(ticket({ status: "in_progress", assignee: "ai:AI" }))).toBe("queued");
    expect(bucket(ticket({ labels: ["enhancement"] }))).toBe("enhancements");
    expect(bucket(ticket({ status: "new" }))).toBe("inbox");
    expect(bucket(ticket({ status: "in_progress" }))).toBe("working");
  });

  it("moves an idea to Working once it is started", () => {
    expect(bucket(ticket({ labels: ["enhancement"], status: "in_progress" }))).toBe("working");
  });

  it("keeps History tickets out of every open tab, and names the tab in the tab bar's words", () => {
    expect(bucket(ticket({ labels: ["history"], status: "new" }))).toBe("completed");
    expect(whereIs(ticket({ labels: ["history"] }))).toBe("History");
    expect(whereIs(ticket({ labels: ["enhancement"] }))).toBe("Ideas");
    expect(whereIs(ticket({ status: "in_progress" }))).toBe("Working");
    expect(whereIs(ticket({ status: "resolved" }))).toBe("Completed");
  });
});

describe("the Completed tab", () => {
  const done = ticket({ status: "resolved" });
  const history = ticket({ status: "closed", labels: ["history"] });
  const open = ticket({ status: "new" });

  it("lists resolved and closed tickets, and not History until its label is picked", () => {
    const view = { ...NONE, view: "completed" };
    expect(filterTickets([done, history, open], view, null).map((t) => t.id)).toEqual([done.id]);
    expect(filterTickets([done, history, open], { ...view, label: "history" }, null).map((t) => t.id)).toEqual([history.id]);
  });
});

describe("filters", () => {
  const a = ticket({ priority: "high", category: "net", requester: "Jo", labels: ["bug"] });
  const b = ticket({ priority: "normal", category: null, requester: "Simon", labels: [] });

  it("narrows by priority, label, person and category (including No Category)", () => {
    expect(filterTickets([a, b], { ...NONE, priority: "high" }, null)).toEqual([a]);
    expect(filterTickets([a, b], { ...NONE, label: "bug" }, null)).toEqual([a]);
    expect(filterTickets([a, b], { ...NONE, person: "Simon" }, null)).toEqual([b]);
    expect(filterTickets([a, b], { ...NONE, category: "net" }, null)).toEqual([a]);
    expect(filterTickets([a, b], { ...NONE, category: "none" }, null)).toEqual([b]);
  });

  it("finds a ticket by its number from any tab", () => {
    const solved = ticket({ status: "resolved" });
    expect(filterTickets([a, solved], NONE, null, `#${solved.id}`)).toEqual([solved]);
  });
});

describe("sorting", () => {
  const old = ticket({ title: "b", priority: "low", comment_count: 5, created_at: "2026-10-01T00:00:00Z", updated_at: "2026-10-05T00:00:00Z" });
  const mid = ticket({ title: "A", priority: "urgent", comment_count: 1, created_at: "2026-10-02T00:00:00Z", updated_at: "2026-10-03T00:00:00Z" });
  const recent = ticket({ title: "c", priority: "high", comment_count: 9, created_at: "2026-10-03T00:00:00Z", updated_at: "2026-10-04T00:00:00Z" });
  const ids = (list: TicketSummary[]) => list.map((t) => t.id);

  it("starts the Inbox on newest opened and every other tab on last updated", () => {
    expect(defaultSort("inbox")).toBe("opened");
    expect(defaultSort("working")).toBe("updated");
    expect(ids(sortTickets([old, mid, recent], "inbox", "", ""))).toEqual(ids([recent, mid, old]));
    expect(ids(sortTickets([old, mid, recent], "working", "", ""))).toEqual(ids([old, recent, mid]));
  });

  it("starts each field in its natural direction and flips on request", () => {
    expect(ids(sortTickets([old, mid, recent], "working", "priority", ""))).toEqual(ids([mid, recent, old]));
    expect(ids(sortTickets([old, mid, recent], "working", "priority", "asc"))).toEqual(ids([old, recent, mid]));
    expect(ids(sortTickets([old, mid, recent], "working", "title", ""))).toEqual(ids([mid, old, recent]));
    expect(ids(sortTickets([old, mid, recent], "working", "title", "desc"))).toEqual(ids([recent, old, mid]));
    expect(ids(sortTickets([old, mid, recent], "working", "comments", ""))).toEqual(ids([recent, old, mid]));
  });

  it("does not change the list it is given, and offers Date Closed on the Completed tab only", () => {
    const list = [old, mid, recent];
    sortTickets(list, "working", "priority", "");
    expect(list).toEqual([old, mid, recent]);
    expect(sortOptions("completed").some((o) => o.id === "closed")).toBe(true);
    expect(sortOptions("working").some((o) => o.id === "closed")).toBe(false);
    expect(ids(sortTickets([old, mid, recent], "working", "closed", ""))).toEqual(ids([old, recent, mid])); // falls back to the tab's default
  });
});

describe("search", () => {
  it("reads a bare number as a ticket number", () => {
    expect(ticketNumber("244")).toBe(244);
    expect(ticketNumber(" #244 ")).toBe(244);
    expect(ticketNumber("244 heating")).toBeNull();
  });

  it("matches every word against the number, title and labels", () => {
    const t = ticket({ title: "Upstairs heating overriding", labels: ["bug"] });
    expect(matchesQuickly(t, "heating bug")).toBe(true);
    expect(matchesQuickly(t, "heating garage")).toBe(false);
    expect(matchesQuickly(t, `#${t.id}`)).toBe(true);
  });

  it("ranks titles that start with the words first, and open before closed among equals", () => {
    const starts = ticket({ title: "heat pump" });
    const contains = ticket({ title: "the heat is off" });
    const closed = ticket({ title: "heat map", status: "closed" });
    expect(rankHits("heat", [contains, closed, starts]).map((t) => t.id)).toEqual([starts.id, closed.id, contains.id]);
  });
});
