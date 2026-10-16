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
  "dark-grey",
  "blue-grey",
  "black",
  "white",
] as const;
export type LabelColor = (typeof LABEL_COLORS)[number];

export interface Label {
  id: string;
  name: string;
  color: LabelColor;
  description: string;
  /** An mdi icon such as "mdi:bug-outline", or "" for none. */
  icon: string;
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
export const ENHANCEMENT = "enhancement";
export const HISTORY = "history";
export const BLOCKED = "blocked";

/** What part of the home a ticket is about (Network, Cameras...). A name and an icon, as in Home Assistant. */
export interface Category {
  id: string;
  name: string;
  icon: string;
  /** The built-in Home Assistant category can't be changed or deleted. */
  builtin: boolean;
  count: number;
}

export interface TicketSummary {
  id: number;
  title: string;
  status: Status;
  priority: Priority;
  requester: string;
  assignee: string | null;
  /** A category id, or null for "No category" (not sorted yet). */
  category: string | null;
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
  category?: string | null;
  labels?: string[];
  resolution?: string | null;
}

/** Home Desk's options. Notifications are each manager's own; the rest are shared. */
export interface HomeDeskSettings {
  /** How long a resolved ticket stays Resolved before it is closed: "immediately", "1h", "6h", "1d", "3d", "7d", "14d", "30d" or "never". */
  auto_close: string;
  /** The entity id of the AI agent tickets can be assigned to (an AI Task or conversation agent). */
  agent: string;
  /** Raise a ticket for each Home Assistant Repair. */
  repairs: boolean;
  notify: {
    /** Notify services to send to, e.g. "mobile_app_simons_iphone" or "persistent_notification". */
    targets: string[];
    new_ticket: boolean;
    comment: boolean;
    resolved: boolean;
  };
}

/** The slice of Home Assistant's frontend `hass` object this panel uses. */
export interface HomeAssistant {
  user?: { id: string; name: string; is_admin: boolean };
  /** Available services by domain; the `notify` ones are the places notifications can go. */
  services?: Record<string, Record<string, unknown>>;
  /** Entity states; the person entities give each household member's name and profile picture. */
  states?: Record<string, { state: string; attributes: Record<string, unknown> }>;
  language?: string;
  connection: {
    sendMessagePromise<T>(msg: Record<string, unknown>): Promise<T>;
    subscribeEvents<T>(
      cb: (event: T) => void,
      eventType: string,
    ): Promise<() => void>;
  };
}
