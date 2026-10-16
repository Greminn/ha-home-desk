import type { Priority, Status, Label, LabelColor } from "./types";

export const STATUS_LABEL: Record<Status, string> = {
  new: "New",
  open: "Open",
  in_progress: "In progress",
  resolved: "Resolved",
  closed: "Closed",
};

export const PRIORITY_LABEL: Record<Priority, string> = {
  low: "Low",
  normal: "Normal",
  high: "High",
  urgent: "Urgent",
};

/** What a ticket is, shown as an icon: the first built-in kind label it carries. */
const KIND_ICONS: [string, string][] = [
  ["bug", "mdi:alert-circle-outline"],
  ["enhancement", "mdi:lightbulb-outline"],
  ["task", "mdi:checkbox-marked-circle-outline"],
  ["question", "mdi:help-circle-outline"],
  ["history", "mdi:history"],
];

export function kindIcon(labels: string[]): string {
  return KIND_ICONS.find(([id]) => labels.includes(id))?.[1] ?? "mdi:circle-outline";
}

export function kindName(labels: string[]): string {
  const id = KIND_ICONS.find(([k]) => labels.includes(k))?.[0];
  return id ? id.charAt(0).toUpperCase() + id.slice(1) : "Ticket";
}

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

const LABEL_FALLBACK: Record<LabelColor, string> = {
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

/** CSS colour for a label colour name: HA's own theme variable, with a fallback. */
export function labelColorCss(color: LabelColor): string {
  if (color === "primary") return "var(--primary-color, #03a9f4)";
  if (color === "accent") return "var(--accent-color, #ff9800)";
  return `var(--${color}-color, ${LABEL_FALLBACK[color] ?? "#9e9e9e"})`;
}

/** A label id the registry doesn't know (deleted, or from an old event) still needs to render. */
export function labelOrUnknown(map: Map<string, Label>, id: string): Label {
  return map.get(id) ?? { id, name: id, color: "grey", description: "", builtin: false, count: 0 };
}
