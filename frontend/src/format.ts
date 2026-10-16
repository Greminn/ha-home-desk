import type { Priority, Status, Tag, TagColor, TicketType } from "./types";

export const STATUS_LABEL: Record<Status, string> = {
  new: "New",
  open: "Open",
  in_progress: "In progress",
  waiting: "Waiting",
  resolved: "Resolved",
  closed: "Closed",
};

export const TYPE_LABEL: Record<TicketType, string> = {
  issue: "Issue",
  request: "Request",
  idea: "Idea",
  task: "Task",
  question: "Question",
  log: "History",
};

export const PRIORITY_LABEL: Record<Priority, string> = {
  low: "Low",
  normal: "Normal",
  high: "High",
  urgent: "Urgent",
};

export const TYPE_ICON: Record<TicketType, string> = {
  issue: "mdi:alert-circle-outline",
  request: "mdi:hand-wave-outline",
  idea: "mdi:lightbulb-outline",
  task: "mdi:checkbox-marked-circle-outline",
  question: "mdi:help-circle-outline",
  log: "mdi:history",
};

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 31536000],
  ["month", 2592000],
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
];

/** "3 days ago" style time, in the user's language. */
export function relativeTime(iso: string, lang?: string): string {
  const seconds = (new Date(iso).getTime() - Date.now()) / 1000;
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
  for (const [unit, size] of UNITS) {
    if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit);
  }
  return rtf.format(0, "second");
}

export function fullTime(iso: string, lang?: string): string {
  return new Date(iso).toLocaleString(lang, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

/** Icon for who did something: an AI agent, Home Assistant itself, an import or a person. */
export function actorIcon(actor: string): string {
  const a = actor.toLowerCase();
  if (a.startsWith("ai:") || a.includes("claude")) return "mdi:robot-outline";
  if (a === "ha" || a === "home assistant") return "mdi:home-assistant";
  if (a === "import") return "mdi:database-import-outline";
  return "mdi:account-circle-outline";
}

export function actorName(actor: string): string {
  return actor.replace(/^ai:/i, "");
}

const TAG_FALLBACK: Record<TagColor, string> = {
  primary: "#03a9f4",
  accent: "#ff9800",
  red: "#f44336",
  pink: "#e91e63",
  purple: "#9c27b0",
  "deep-purple": "#673ab7",
  indigo: "#3f51b5",
  blue: "#2196f3",
  "light-blue": "#03a9f4",
  cyan: "#00bcd4",
  teal: "#009688",
  green: "#4caf50",
  "light-green": "#8bc34a",
  lime: "#cddc39",
  yellow: "#ffeb3b",
  amber: "#ffc107",
  orange: "#ff9800",
  "deep-orange": "#ff5722",
  brown: "#795548",
  "light-grey": "#bdbdbd",
  grey: "#9e9e9e",
  "blue-grey": "#607d8b",
};

/** CSS colour for a tag colour name: HA's own theme variable, with a fallback. */
export function tagColorCss(color: TagColor): string {
  if (color === "primary") return "var(--primary-color, #03a9f4)";
  if (color === "accent") return "var(--accent-color, #ff9800)";
  return `var(--${color}-color, ${TAG_FALLBACK[color] ?? "#9e9e9e"})`;
}

/** A tag id the registry doesn't know (deleted, or from an old event) still needs to render. */
export function tagOrUnknown(map: Map<string, Tag>, id: string): Tag {
  return map.get(id) ?? { id, name: id, color: "grey", builtin: false, count: 0 };
}
