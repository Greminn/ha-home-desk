export const STATUSES = [
  "new",
  "open",
  "in_progress",
  "resolved",
  "closed",
] as const;
export const PRIORITIES = ["low", "normal", "high", "urgent"] as const;

export type Status = (typeof STATUSES)[number];
export type Priority = (typeof PRIORITIES)[number];

export const LABEL_COLORS = [
  "primary",
  "accent",
  "red",
  "pink",
  "purple",
  "deep-purple",
  "indigo",
  "blue",
  "light-blue",
  "cyan",
  "teal",
  "green",
  "light-green",
  "lime",
  "yellow",
  "amber",
  "orange",
  "deep-orange",
  "brown",
  "light-grey",
  "grey",
  "blue-grey",
] as const;
export type LabelColor = (typeof LABEL_COLORS)[number];

export interface Label {
  id: string;
  name: string;
  color: LabelColor;
  description: string;
  /** Built-in labels (Bug, Enhancement, Blocked, ...): can't be renamed, recoloured or deleted. */
  builtin: boolean;
  count: number;
}

export const ACTIVE: readonly Status[] = [
  "new",
  "open",
  "in_progress",
];

/** Built-in label ids the panel's views rely on. */
export const BUG = "bug";
export const ENHANCEMENT = "enhancement";
export const HISTORY = "history";
export const BLOCKED = "blocked";

export interface TicketSummary {
  id: number;
  title: string;
  status: Status;
  priority: Priority;
  requester: string;
  assignee: string | null;
  labels: string[];
  entities: string[];
  links: number[];
  legacy_ref: string | null;
  source: string | null;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  comment_count: number;
  has_resolution: boolean;
}

export interface TicketEvent {
  id: number;
  actor: string;
  kind:
    | "created"
    | "comment"
    | "note"
    | "status"
    | "priority"
    | "assignee"
    | "field"
    | "link";
  body: string | null;
  data: Record<string, unknown> | null;
  created_at: string;
}

export interface Ticket extends TicketSummary {
  description: string;
  resolution: string | null;
  events: TicketEvent[];
  related?: { id: number; title: string; status: Status }[];
}

export interface TicketPatch {
  title?: string;
  description?: string;
  status?: Status;
  priority?: Priority;
  assignee?: string | null;
  labels?: string[];
  resolution?: string | null;
}

/** The slice of Home Assistant's frontend `hass` object this panel uses. */
export interface HomeAssistant {
  user?: { id: string; name: string; is_admin: boolean };
  language?: string;
  connection: {
    sendMessagePromise<T>(msg: Record<string, unknown>): Promise<T>;
    subscribeEvents<T>(
      cb: (event: T) => void,
      eventType: string,
    ): Promise<() => void>;
  };
}
