import { ACTIVE, ENHANCEMENT, HISTORY, PRIORITIES } from "./types";
import type { Category, Label, TicketSummary } from "./types";
import { actorName, isAgent, PRIORITY_LABEL } from "./format";
import type { DropdownOption } from "./views/dropdown";

/** The list's tabs and filters as plain functions (no panel state), so what each one means is in one place. */

export interface View {
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
const isQueued = (t: TicketSummary) => isAgent(t.assignee ?? "");

/**
 * Every ticket is in exactly one tab, the first that fits, so the tabs never overlap and their counts add up:
 * Completed, then Queued for AI (the agent has it), then Enhancements (ideas not started yet, so they don't bury problems), then Inbox
 * (status New: raised and not yet looked at, or reopened by Home Assistant or an AI agent, which sends it back to New), then Working
 * (everything else open, including a ticket an AI agent has answered, which its reply hands back to you).
 */
export function bucket(t: TicketSummary): "completed" | "queued" | "enhancements" | "inbox" | "working" {
  if (!isActive(t)) return "completed";
  if (isQueued(t)) return "queued";
  if (isEnhancement(t) && t.status === "new") return "enhancements"; // once started it is Working like any other ticket
  if (t.status === "new") return "inbox";
  return "working";
}

export const VIEWS: View[] = [
  { id: "inbox", icon: "mdi:inbox-outline", label: "Inbox", count: true, match: (t) => bucket(t) === "inbox" },
  // What you or the other admins are working on.
  { id: "working", icon: "mdi:progress-wrench", label: "Working", count: true, match: (t) => bucket(t) === "working" },
  { id: "queued", icon: "mdi:star-four-points-outline", label: "Queued for AI", count: true, match: (t) => bucket(t) === "queued" },
  { id: "enhancements", icon: "mdi:lightbulb-outline", label: "Enhancements", count: true, match: (t) => bucket(t) === "enhancements" },
  // Done and closed tickets; its "Show" filter also reaches History, everything still open, or every ticket.
  { id: "completed", icon: "mdi:check-circle-outline", label: "Completed", match: (t) => bucket(t) === "completed" },
];

/** The "Show" filter on the Completed tab. History is only listed when asked for. */
const SCOPES: { id: string; label: string; match: (t: TicketSummary) => boolean }[] = [
  { id: "", label: "Completed", match: isClosed },
  { id: "open", label: "Open", match: isActive },
  { id: "history", label: "History", match: isHistory },
  { id: "everything", label: "Everything", match: (t) => !isHistory(t) },
];

export const SCOPES_OPTIONS: DropdownOption[] = SCOPES.map(({ id, label }) => ({ id, label }));

/** What the list is narrowed to. An empty string means "any". */
export interface ListFilters {
  view: string;
  /** The "Show" choice on the Completed tab. */
  scope: string;
  /** A category id, or "none" for tickets with no category. */
  category: string;
  priority: string;
  label: string;
  /** A requester's name, as stored. */
  person: string;
}

/** Whether a loaded ticket plainly matches what is typed (its number, title, labels or category), for answering the drop down at once. */
export function matchesQuickly(t: TicketSummary, q: string): boolean {
  const n = ticketNumber(q);
  if (n !== null && t.id === n) return true;
  const hay = `#${t.id} ${t.title} ${t.labels.join(" ")}`.toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .every((w) => hay.includes(w));
}

/** The drop down's order: the ticket with that number, then titles that begin or contain the words, then the rest; open ones before closed. */
export function rankHits(q: string, tickets: TicketSummary[]): TicketSummary[] {
  const n = ticketNumber(q);
  const needle = q.toLowerCase();
  const score = (t: TicketSummary): number => {
    if (n !== null && t.id === n) return 0;
    const title = t.title.toLowerCase();
    if (title.startsWith(needle)) return 1;
    if (title.includes(needle)) return 2;
    return 3;
  };
  const done = (t: TicketSummary) => (t.status === "resolved" || t.status === "closed" ? 1 : 0);
  return [...tickets].sort((a, b) => score(a) - score(b) || done(a) - done(b)).slice(0, 12);
}

/** A search for just a ticket's number ("244" or "#244"): the number, else null. */
export function ticketNumber(q: string): number | null {
  const m = /^#?\s*(\d+)$/.exec(q.trim());
  return m ? Number(m[1]) : null;
}

/**
 * The tickets to show: the tab, then each filter, and the search's matching ids if a search is running. Searching for a
 * ticket's number finds exactly that ticket, whichever tab or filter it would otherwise be under.
 */
export function filterTickets(tickets: TicketSummary[], f: ListFilters, matchIds: Set<number> | null, q = ""): TicketSummary[] {
  const number = ticketNumber(q);
  const exact = number === null ? undefined : tickets.find((t) => t.id === number && !t.merged_into);
  if (exact) return [exact];
  const view = VIEWS.find((v) => v.id === f.view) ?? VIEWS[0]!;
  return tickets.filter(
    (t) =>
      (view.id === "completed" ? SCOPES.find((x) => x.id === f.scope)!.match(t) : view.match(t)) &&
      (!matchIds || matchIds.has(t.id)) &&
      (!f.priority || t.priority === f.priority) &&
      (!f.label || t.labels.includes(f.label)) &&
      (!f.person || t.requester === f.person) &&
      (!f.category || (f.category === "none" ? !t.category : t.category === f.category)),
  );
}

export const priorityOptions = (): DropdownOption[] => [
  { id: "", label: "Any Priority" },
  // Low is no longer offered anywhere (Normal, High and Urgent are the choices), so it isn't a filter either.
  ...PRIORITIES.filter((id) => id !== "low").map((id) => ({ id, label: PRIORITY_LABEL[id] })),
];

export const categoryOptions = (categories: Category[]): DropdownOption[] => [
  { id: "", label: "Any Category" },
  { id: "none", label: "No Category" },
  ...categories.map((c) => ({ id: c.id, label: c.name })),
];

/** Everyone who has raised a ticket, plus the one currently picked even if they have none in view. */
export function personOptions(tickets: TicketSummary[], current: string): DropdownOption[] {
  const names = [...new Set(tickets.map((t) => t.requester).filter(Boolean))].sort();
  if (current && !names.includes(current)) names.push(current);
  return [{ id: "", label: "Anyone" }, ...names.map((n) => ({ id: n, label: actorName(n) }))];
}

export const labelOptions = (labels: Label[]): DropdownOption[] => [
  { id: "", label: "Any Label" },
  ...labels.map((x) => ({ id: x.id, label: x.name })),
];
