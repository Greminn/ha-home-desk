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

export const VIEWS: View[] = [
  // New work that hasn't been started. Ideas have their own tab so they don't bury problems.
  { id: "active", icon: "mdi:inbox-outline", label: "Inbox", count: true, match: (t) => t.status === "new" && !isHistory(t) && !isEnhancement(t) },
  { id: "progress", icon: "mdi:progress-wrench", label: "In Progress", count: true, match: (t) => (t.status === "in_progress" || t.status === "open") && !isHistory(t) },
  // What has been queued for an AI agent, whatever stage it is at.
  { id: "agent", icon: "mdi:star-four-points-outline", label: "Queued for AI", count: true, match: (t) => isActive(t) && isAgent(t.assignee ?? "") },
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

export const SCOPES_OPTIONS: DropdownOption[] = SCOPES.map(({ id, label }) => ({ id, label }));

/** What the list is narrowed to. An empty string means "any". */
export interface ListFilters {
  view: string;
  /** The "Show" choice on the All tab. */
  scope: string;
  /** A category id, or "none" for tickets with no category. */
  category: string;
  priority: string;
  label: string;
  /** A requester's name, as stored. */
  person: string;
}

/** The tickets to show: the tab, then each filter, and the search's matching ids if a search is running. */
export function filterTickets(tickets: TicketSummary[], f: ListFilters, matchIds: Set<number> | null): TicketSummary[] {
  const view = VIEWS.find((v) => v.id === f.view) ?? VIEWS[0]!;
  return tickets.filter(
    (t) =>
      view.match(t) &&
      (view.id !== "all" || !f.scope || SCOPES.find((x) => x.id === f.scope)!.match(t)) &&
      (!matchIds || matchIds.has(t.id)) &&
      (!f.priority || t.priority === f.priority) &&
      (!f.label || t.labels.includes(f.label)) &&
      (!f.person || t.requester === f.person) &&
      (!f.category || (f.category === "none" ? !t.category : t.category === f.category)),
  );
}

/** How many filters are on (the dot on the filter button). The scope only counts on the All tab. */
export function filterCount(f: ListFilters): number {
  return [f.category, f.priority, f.label, f.person, f.view === "all" ? f.scope : ""].filter(Boolean).length;
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
