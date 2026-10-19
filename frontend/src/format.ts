import type { Priority, Status, Label, LabelColor } from "./types";

export const STATUS_LABEL: Record<Status, string> = {
  new: "New",
  // "Open" is retired: the panel treats it as In Progress until old tickets are migrated.
  open: "In Progress",
  in_progress: "In Progress",
  resolved: "Resolved",
  closed: "Closed",
};

/** Like GitHub's issue list: the icon is the state, not the kind (Bug, Enhancement... are labels). */
export const STATE_ICON: Record<Status, string> = {
  new: "mdi:circle-outline",
  open: "mdi:circle-slice-4",
  in_progress: "mdi:circle-slice-4",
  resolved: "mdi:check-circle-outline",
  closed: "mdi:close-circle-outline",
};

/** The Enhancement label's own id (an idea for the future) and its icon. */
const ENHANCEMENT_LABEL = "enhancement";
const ENHANCEMENT_ICON = "mdi:lightbulb-on-outline";

/**
 * The icon for a ticket's state. A ticket queued for an AI agent shows the agent's spark; an Enhancement that has not been
 * started (still New) shows the Enhancement lightbulb. Every other ticket shows its status circle.
 */
export function stateIcon(status: Status, assignee?: string | null, labels?: readonly string[]): string {
  const open = status !== "resolved" && status !== "closed";
  if (open && assignee && isAgent(assignee)) return "mdi:star-four-points";
  if (status === "new" && labels?.includes(ENHANCEMENT_LABEL)) return ENHANCEMENT_ICON;
  return STATE_ICON[status];
}

/**
 * The colour that goes with stateIcon. A New Enhancement is green while nobody has added a note, and blue once it has comments;
 * when it is started it is an ordinary In Progress ticket.
 */
export function stateColor(status: Status, assignee?: string | null, labels?: readonly string[], comments = 0): string {
  const open = status !== "resolved" && status !== "closed";
  if (open && assignee && isAgent(assignee)) return "var(--st-accent, var(--primary-color))";
  if (status === "new" && labels?.includes(ENHANCEMENT_LABEL)) return comments > 0 ? "var(--st-accent, var(--primary-color))" : STATE_COLOR.new;
  return STATE_COLOR[status];
}

/** State colours: new is green, in progress blue, resolved purple, closed grey. */
export const STATE_COLOR: Record<Status, string> = {
  new: "var(--success-color, #43a047)",
  open: "var(--primary-color)",
  in_progress: "var(--primary-color)",
  resolved: "var(--purple-color, #926bc7)",
  closed: "var(--secondary-text-color)",
};

export const PRIORITY_LABEL: Record<Priority, string> = {
  low: "Low",
  normal: "Normal",
  high: "High",
  urgent: "Urgent",
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
/** An AI agent: named "ai:<name>" by the integration, or a known agent such as Claude. */
export function isAgent(actor: string): boolean {
  const a = actor.toLowerCase();
  return a.startsWith("ai:") || a.includes("claude");
}

/** Home Assistant's own icon for AI features is the four-point spark, so agents get it too. */
const AGENT_ICON = "mdi:star-four-points";
/** The large avatar beside a comment uses the cluster of sparks, which reads better at that size. */
const AGENT_AVATAR_ICON = "mdi:creation";

export function actorIcon(actor: string): string {
  const a = actor.toLowerCase();
  if (isAgent(actor)) return AGENT_AVATAR_ICON;
  if (a === "ha" || a === "home assistant") return "mdi:home-assistant";
  if (a === "import") return "mdi:database-import-outline";
  return "mdi:account-circle-outline";
}

/** The small outline icon beside a name in the meta line: Home Assistant, an AI agent, or a person. */
export function metaIcon(actor: string): string {
  if (isAgent(actor)) return `${AGENT_ICON}-outline`;
  const a = actor.toLowerCase();
  return a === "ha" || a === "home assistant" ? "mdi:home-assistant" : "mdi:account-outline";
}

export function actorName(actor: string): string {
  const name = actor.replace(/^ai:/i, "");
  return name === name.toLowerCase() ? name.charAt(0).toUpperCase() + name.slice(1) : name;
}

/** HA's default values for its theme colours, used only when the page doesn't define the variable. */
const LABEL_FALLBACK: Record<LabelColor, string> = {
  primary: "#03a9f4",
  accent: "#ff9800",
  red: "#f44336",
  pink: "#e91e63",
  purple: "#926bc7",
  "deep-purple": "#6e41ab",
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
  "deep-orange": "#ff6f22",
  brown: "#795548",
  "light-grey": "#bdbdbd",
  grey: "#9e9e9e",
  "dark-grey": "#606060",
  "blue-grey": "#607d8b",
  black: "#000000",
  white: "#ffffff",
};

/** CSS colour for a label colour name: HA's own theme variable, with a fallback. */
export function labelColorCss(color: LabelColor): string {
  if (color === "primary") return "var(--primary-color, #03a9f4)";
  if (color === "accent") return "var(--accent-color, #ff9800)";
  return `var(--${color}-color, ${LABEL_FALLBACK[color] ?? "#9e9e9e"})`;
}

/** A colour as [r, g, b] 0-255, from "#rgb", "#rrggbb" or "rgb(...)"; null if it isn't one of those. */
function parseColor(css: string): [number, number, number] | null {
  const c = css.trim();
  let m = /^#([0-9a-f]{3})$/i.exec(c);
  if (m) return [...m[1]!].map((d) => parseInt(d + d, 16)) as [number, number, number];
  m = /^#([0-9a-f]{6})/i.exec(c);
  if (m) return [0, 2, 4].map((i) => parseInt(m![1]!.slice(i, i + 2), 16)) as [number, number, number];
  m = /^rgba?\(\s*(\d+)[ ,]+(\d+)[ ,]+(\d+)/i.exec(c);
  return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
}

const luminance = ([r, g, b]: [number, number, number]): number => {
  const [lr, lg, lb] = [r, g, b].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  }) as [number, number, number];
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
};

/**
 * The text colour on a label's solid colour, chosen as HA's getContrastedColorHex does: black or white,
 * whichever has the higher WCAG contrast. It reads the colour from the page's theme, so a custom
 * theme gets the right answer; HA's default values are the fallback.
 */
export function labelTextColor(color: LabelColor): string {
  let rgb: [number, number, number] | null = null;
  try {
    const name = color === "primary" ? "--primary-color" : color === "accent" ? "--accent-color" : `--${color}-color`;
    rgb = parseColor(getComputedStyle(document.documentElement).getPropertyValue(name));
  } catch {
    // No document styles to read (tests, SSR): use the defaults.
  }
  rgb ??= parseColor(LABEL_FALLBACK[color] ?? "#9e9e9e") ?? [158, 158, 158];
  const l = luminance(rgb);
  // contrast with black = (l + 0.05) / 0.05; with white = 1.05 / (l + 0.05)
  return (l + 0.05) / 0.05 >= 1.05 / (l + 0.05) ? "#000000" : "#ffffff";
}

/** "deep-purple" -> "Deep purple": a colour's name as HA's colour picker shows it. */
export function colorName(color: string): string {
  const name = color.replace(/-/g, " ");
  return name.charAt(0).toUpperCase() + name.slice(1);
}

/** A label id the registry doesn't know (deleted, or from an old event) still needs to render. */
export function labelOrUnknown(map: Map<string, Label>, id: string): Label {
  return map.get(id) ?? { id, name: id, color: "grey", description: "", icon: "", builtin: false, count: 0 };
}

/** How a name reads where it signs something (a comment, a change): an AI by the name it signs with ("Claude", "Gemini"). */
export function actorLabel(actor: string): string {
  return actorName(actor);
}

/** A household member as Home Assistant knows them: the person entity's name and profile picture. */
export interface Person {
  name: string;
  picture?: string;
}

const ACTIVITY_VERB: Record<string, string> = {
  created: "opened this",
  comment: "commented",
  note: "added a note",
  status: "changed the status",
  priority: "changed the priority",
  assignee: "changed the assignee",
  field: "edited it",
  link: "linked a ticket",
  merge: "merged a ticket",
  attachment: "added a file",
};

/** What someone did, in words: "commented", "changed the status". */
export const activityVerb = (kind: string): string => ACTIVITY_VERB[kind] ?? "updated it";

/** What "Queue for AI Agent" stores: any AI the person runs themselves (their own CLI, a desktop app), so it names none. */
export const AI_ASSIGNEE = "ai:AI";

/** How an assignee reads: a person by name, any AI as just "AI". */
export const assigneeName = (assignee: string): string => (isAgent(assignee) ? "AI" : actorName(assignee));

/** The agent that works a ticket after Run AI Agent Now, as its comments are signed: "AI Agent (Claude)". */
export const runLabel = (actor: string): string => (/^ai agent/i.test(actorName(actor)) ? actorName(actor) : `AI Agent (${actorName(actor)})`);

/** The AI that Home Assistant asks to review a ticket (Review with AI), as its comments are signed: "AI Review (Claude)". */
export const reviewLabel = (actor: string): string => `AI Review (${actorName(actor)})`;
