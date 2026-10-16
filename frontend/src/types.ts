export const STATUSES = [
  "new",
  "open",
  "in_progress",
  "waiting",
  "resolved",
  "closed",
] as const;
export const TYPES = [
  "issue",
  "request",
  "idea",
  "task",
  "question",
  "log",
] as const;
export const PRIORITIES = ["low", "normal", "high", "urgent"] as const;

export type Status = (typeof STATUSES)[number];
export type TicketType = (typeof TYPES)[number];
export type Priority = (typeof PRIORITIES)[number];

export const TAG_COLORS = [
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
export type TagColor = (typeof TAG_COLORS)[number];

export interface Tag {
  id: string;
  name: string;
  color: TagColor;
  /** The built-in Home Assistant tag: its name and colour can't change and it can't be deleted. */
  builtin: boolean;
  count: number;
}

export const ACTIVE: readonly Status[] = [
  "new",
  "open",
  "in_progress",
  "waiting",
];

export interface TicketSummary {
  id: number;
  title: string;
  type: TicketType;
  status: Status;
  priority: Priority;
  requester: string;
  assignee: string | null;
  tags: string[];
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
  ticket_type?: TicketType;
  status?: Status;
  priority?: Priority;
  assignee?: string | null;
  tags?: string[];
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
