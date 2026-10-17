import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { safeCustomElement } from "../define";
import "./dropdown";
import "./ticket-tags";
import "./ticket-attachments";
import type { HaClient } from "../ha-client";
import { sharedStyles } from "../styles";
import { BLOCKED, PRIORITIES } from "../types";
import type { Category, Priority, Status, Label, Ticket, TicketEvent, TicketPatch } from "../types";
import {
  PRIORITY_LABEL,
  STATE_COLOR,
  STATE_ICON,
  STATUS_LABEL,
  actorIcon,
  actorLabel,
  isAgent,
  actorName,
  metaIcon,
  fullTime,
  relativeTime,
  labelColorCss,
  labelTextColor,
  labelOrUnknown,
} from "../format";
import type { Person } from "../format";
import { renderMarkdown } from "../markdown";

const LONG_DESCRIPTION = 1800;

/** Right-hand pane: one ticket with its controls, description and timeline. */
@safeCustomElement("st-ticket-detail")
export class TicketDetail extends LitElement {
  static override styles = [
    sharedStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      /* The ticket scrolls; the comment box stays docked at the bottom of the pane. */
      .top {
        flex: none;
        min-width: 0;
        /* The title's middle lines up with the search row's (56px tall) in the list beside it. */
        padding: 13px 18px 12px;
        border-bottom: 1px solid var(--st-divider);
      }
      .scroll {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        overflow-x: hidden;
        /* The pinned description changes height as you scroll; the browser must not "correct" the scroll position for that. */
        overflow-anchor: none;
        /* The description and comments carry a lighter version of the ticket's tint (header and comment box keep the full one). */
        background: var(--st-selected-soft, var(--st-surface));
      }
      .dock {
        flex: none;
        padding: 12px 18px 16px;
        border-top: 1px solid var(--st-divider);
      }
      .dock .card.composer {
        margin: 0;
        padding: 0;
      }
      /* An open ticket sits on the same colour as its row in the list, so the two read as one thing. */
      :host([open]) {
        background: var(--st-selected, var(--st-hover));
      }
      /* The ticket uses the whole pane and is laid out flat: sections divided by lines, not boxed in cards. */
      .wrap {
        --wrap-top: 16px;
        min-width: 0;
        padding: var(--wrap-top) 18px 12px;
      }
      /*
       * A description of more than a couple of lines is pinned at the top as you scroll, and shrinks as you go
       * until it is one line ending in an ellipsis (the panel sets its height from the scroll position).
       */
      .desc-sticky {
        position: sticky;
        top: 0;
        z-index: 3;
        /* The pane's top padding belongs to this block, so the text has the same space above it whether or not it is pinned. */
        margin-top: calc(var(--wrap-top) * -1);
        padding-top: var(--wrap-top);
        overflow: hidden;
        background: var(--st-selected-soft, var(--st-surface));
      }
      .desc-sticky.one {
        cursor: pointer;
      }
      .desc-sticky.one .card {
        margin: 0 0 16px;
        padding: 0 28px 16px 0;
      }
      .desc-sticky.one .md {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        max-height: none;
        -webkit-mask-image: none;
        mask-image: none;
        color: var(--st-fg-secondary);
      }
      .desc-sticky.one .md > * {
        margin: 0;
      }
      .desc-sticky.one .more,
      .desc-sticky.one .entities,
      .desc-sticky.one .attached {
        display: none;
      }
      .attached {
        margin-top: 12px;
      }
      .md + .attached {
        margin-top: 16px;
      }
      .desc-sticky .pin-hint {
        --mdc-icon-size: 20px;
        position: absolute;
        right: 0;
        top: calc(var(--wrap-top) + 1px);
        display: none;
        color: var(--st-fg-secondary);
      }
      .desc-sticky.one .pin-hint {
        display: inline-flex;
      }
      .back {
        display: none;
      }
      @media (max-width: 870px) {
        .top {
          padding: 13px 16px 12px;
        }
        .wrap {
          --wrap-top: 12px;
          padding: var(--wrap-top) 16px 12px;
        }
      }
      /* The history button floats at the right so it never changes the header's height: the gap under the title is the same for one line or three. */
      .head {
        position: relative;
        display: flex;
        align-items: flex-start;
        padding-right: 44px;
      }
      .head.admin {
        padding-right: 176px;
      }
      h1 {
        flex: 1;
        margin: 0;
        font-size: var(--st-fs-heading);
        font-weight: var(--st-fw-heading);
        line-height: 1.25;
        overflow-wrap: anywhere;
      }
      /*
       * The title edits in place: for someone who can edit it, it is a text box that looks like the heading until
       * you point at it (an outline appears) or click into it (an accent outline). It grows with the text.
       */
      textarea.title-edit {
        display: block;
        flex: 1;
        min-width: 0;
        box-sizing: border-box;
        margin: -3px -9px;
        padding: 2px 8px;
        width: calc(100% + 18px);
        border: 1px solid transparent;
        border-radius: var(--st-r-bar);
        background: transparent;
        color: inherit;
        font: inherit;
        font-size: var(--st-fs-heading);
        font-weight: var(--st-fw-heading);
        line-height: 1.25;
        resize: none;
        overflow: hidden;
        cursor: text;
        transition: border-color 150ms ease-in-out;
      }
      textarea.title-edit:hover {
        border-color: var(--st-outline);
      }
      textarea.title-edit:focus {
        outline: none;
        border-color: var(--st-accent);
      }
      .add-label {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 24px;
        height: 24px;
        border-radius: 12px;
        border: 1px dashed var(--st-outline);
        color: var(--st-fg-secondary);
        cursor: pointer;
      }
      .add-label:hover,
      .add-label:focus-visible {
        color: var(--st-fg);
        border-color: var(--st-field-outline-hover);
      }
      .add-label ha-icon {
        --mdc-icon-size: 14px;
      }
      .hist {
        position: absolute;
        /* Centred on the title's first line (30px tall), however many lines the title wraps to. */
        top: -9px;
        right: 0;
        width: var(--st-h-bar);
        height: var(--st-h-bar);
        color: var(--st-fg-secondary);
      }
      .hist ha-icon {
        --mdc-icon-size: 20px;
      }
      /* The merge button sits just left of the history button. */
      .hist.merge {
        right: 44px;
      }
      /* Previous and next ticket, in the order of the list, to the left of those. */
      .hist.next {
        right: 88px;
      }
      .hist.prev {
        right: 132px;
      }
      .hist[disabled] {
        opacity: 0.35;
        cursor: default;
      }
      .hist[aria-pressed="true"] {
        color: var(--st-accent);
        background: color-mix(in srgb, var(--st-accent) 14%, transparent);
      }
      /* On a phone the back arrow sits on the title's first line, like the history button on the right. */
      @media (max-width: 870px) {
        .head {
          padding-left: 36px;
        }
        .back {
          position: absolute;
          top: -9px;
          left: -8px;
          display: inline-flex;
          width: var(--st-h-bar);
          height: var(--st-h-bar);
          margin: 0;
          color: var(--st-fg);
        }
        .back ha-icon {
          --mdc-icon-size: 24px;
        }
      }
      .sub {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin: 16px 0 0;
        font-size: var(--st-fs-body);
        color: var(--st-fg-secondary);
      }
      .meta-line,
      .tag-line {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px 10px;
      }
      /* The ticket number: an outlined pill like the category's; click to copy it. */
      .num {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        height: 24px;
        padding: 0 10px;
        box-sizing: border-box;
        border: 1px solid var(--st-outline);
        border-radius: var(--st-r-pill);
        background: transparent;
        color: var(--st-fg-secondary);
        font-size: var(--st-fs-caption);
        font-weight: var(--ha-font-weight-medium, 500);
        font-variant-numeric: tabular-nums;
        cursor: pointer;
      }
      .num:hover,
      .num:focus-visible {
        color: var(--st-fg);
        border-color: var(--st-field-outline-hover);
      }
      .num ha-icon {
        --mdc-icon-size: 14px;
      }
      .num.copied {
        color: var(--st-success);
        border-color: var(--st-success);
      }
      /* Each item (icon and words) is a centred row, so icons line up with the text whatever the font. */
      .meta-line > span {
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
      .sub .status {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-weight: 500;
        color: var(--state);
      }
      .sub .blocked {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        color: var(--st-warning);
        font-weight: 500;
      }
      .sub .prio {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-weight: 500;
      }
      .sub .prio.urgent {
        color: var(--st-danger);
      }
      .sub .prio.high {
        color: var(--st-warning);
      }
      .sub ha-icon {
        --mdc-icon-size: 16px;
      }
      .chips {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 6px;
        margin-bottom: 16px;
      }
      .chip {
        display: inline-flex;
        align-items: center;
        gap: 2px;
        height: 28px;
        padding: 0 10px;
        border-radius: 8px;
        font-size: var(--st-fs-small);
        font-weight: 400;
        color: var(--st-fg);
        background: color-mix(in srgb, var(--st-fg) 10%, transparent);
      }
      .chip.link {
        cursor: pointer;
        height: 28px;
      }
      .card {
        padding: 0 0 16px;
        margin-bottom: 16px;
        border-bottom: 1px solid var(--st-divider);
      }
      .card.composer {
        border-bottom: 0;
      }
      .card h3 {
        margin: 0 0 8px;
        font-size: var(--st-fs-title);
        font-weight: 500;
        color: var(--st-fg-secondary);
      }
      .card.resolution {
        padding-left: 12px;
        border-left: 4px solid var(--st-success);
      }
      .clamp {
        max-height: 22em;
        overflow: hidden;
        -webkit-mask-image: linear-gradient(#000 70%, transparent);
        mask-image: linear-gradient(#000 70%, transparent);
      }
      .more {
        margin: 4px 0 0 -12px;
        height: 32px;
      }
      .entities {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 12px;
      }
      .entities code {
        font-family: var(--code-font-family, monospace);
        font-size: var(--st-fs-caption);
        padding: 2px 6px;
        border-radius: 4px;
        background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
      }
      .timeline {
        margin: 0;
      }
      .timeline > .ev:last-child {
        margin-bottom: 0;
      }
      .timeline h2 {
        margin: 0 0 12px;
        font-size: var(--st-fs-title);
        font-weight: 500;
        color: var(--st-fg-secondary);
      }
      .sect {
        margin-right: 4px;
        font-size: var(--st-fs-title);
        font-weight: 500;
        color: var(--st-fg-secondary);
      }
      .none {
        font-size: var(--st-fs-body);
        color: var(--st-fg-secondary);
      }
      /*
       * Comments are the main part of a ticket: a round avatar, the author and time, and the message in a soft
       * bubble. A change record (shown by the history button) is only a faint line under them, with the old
       * value struck through.
       */
      .ev {
        display: grid;
        grid-template-columns: 32px minmax(0, 1fr);
        gap: 12px;
        margin-bottom: 16px;
      }
      .ev .avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        color: var(--st-accent);
        background: color-mix(in srgb, var(--st-accent) 16%, var(--st-surface));
      }
      .ev .avatar.photo {
        overflow: hidden;
        background: none;
      }
      .ev .avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .ev .avatar ha-icon {
        --mdc-icon-size: 20px;
      }
      .ev .who {
        display: flex;
        align-items: center;
        gap: 6px;
        min-height: 32px;
        color: var(--st-fg-secondary);
      }
      .ev .who b {
        font-size: var(--st-fs-title);
        font-weight: 500;
        color: var(--st-fg);
      }
      .ev .who .when {
        font-size: var(--st-fs-caption);
      }
      .ev .bubble {
        margin-top: 2px;
        padding: 10px 14px;
        border-radius: 8px;
        background: color-mix(in srgb, var(--st-fg) 7%, transparent);
      }
      .ev .bubble > :first-child {
        margin-top: 0;
      }
      .ev .bubble > :last-child {
        margin-bottom: 0;
      }
      .ev .bubble.note {
        background: color-mix(in srgb, var(--st-warning) 14%, transparent);
      }
      /* The AI Agent is working: a flat strip under the header with what it is doing and a Stop button. */
      .agent-strip {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 16px;
        border-left: 3px solid var(--st-accent);
        background: color-mix(in srgb, var(--st-accent) 10%, transparent);
        font-size: var(--st-fs-body);
      }
      .agent-strip ha-icon {
        --mdc-icon-size: 20px;
        color: var(--st-accent);
        animation: working 1.4s ease-in-out infinite;
      }
      .agent-strip .what {
        flex: 1;
        min-width: 0;
      }
      .agent-strip .note {
        color: var(--st-fg-secondary);
      }
      @keyframes working {
        50% {
          opacity: 0.3;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .agent-strip ha-icon {
          animation: none;
        }
      }
      /* What is new since you last looked: a small dot and "New", the same dot the list uses for unread. */
      .ev .new-tag {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        margin-left: 8px;
        font-size: var(--st-fs-caption);
        font-weight: 500;
        color: var(--st-accent);
      }
      .ev .new-tag::before {
        content: "";
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--st-accent);
      }
      .ev.system .new-text {
        color: var(--st-accent);
      }
      .ev.system {
        margin-bottom: 8px;
        align-items: center;
        font-size: var(--st-fs-caption);
        color: var(--st-fg-secondary);
      }
      .ev.system > ha-icon {
        --mdc-icon-size: 16px;
        justify-self: center;
      }
      .ev.system b {
        font-weight: 500;
        color: var(--st-fg);
      }
      .ev.system .line {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 0 16px;
      }
      .ev.system .stamp {
        font-variant-numeric: tabular-nums;
      }
      .ev.system s {
        margin-left: 4px;
        opacity: 0.7;
      }
      .ev .label {
        margin-left: 6px;
        padding: 0 6px;
        border-radius: 6px;
        font-size: var(--st-fs-caption);
        background: color-mix(in srgb, var(--st-warning) 30%, transparent);
        color: var(--st-fg);
      }
      .composer textarea {
        width: 100%;
      }
      .composer .bar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-end;
        gap: 8px;
        margin-top: 8px;
      }
      /* The priority pills sit after the assign chips, set off by a thin line. */
      .prio-group {
        margin-left: 6px;
        padding: 0 12px;
        border-left: 1px solid var(--st-divider);
        border-right: 1px solid var(--st-divider);
      }
      /*
       * Priority is two round badges, as tall as the assign chips: a grey circle with a coloured icon at rest, then
       * filled with their colour when you point at one, and they stay filled once clicked on.
       */
      .prio-dot {
        --c: var(--st-warning);
        --fg: #000;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: var(--st-h-bar);
        height: var(--st-h-bar);
        padding: 0;
        border: 1px solid var(--st-outline);
        border-radius: 50%;
        background: color-mix(in srgb, var(--st-fg) 12%, transparent);
        /* At rest the circle is grey and only the icon is coloured. */
        color: var(--c);
        transition:
          background-color 150ms ease-in-out,
          color 150ms ease-in-out,
          border-color 150ms ease-in-out;
      }
      .prio-dot.urgent {
        --c: var(--st-danger);
        --fg: #fff;
      }
      .prio-dot:hover,
      .prio-dot.on {
        background: var(--c);
        border-color: transparent;
        color: var(--fg);
      }
      .prio-dot ha-icon {
        --mdc-icon-size: 18px;
        /* A triangle's weight sits low in its box, so lift it a little to look centred in the circle. */
        margin-top: -1px;
      }

      .assign {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .assign-chip {
        height: 32px;
        padding: 0 12px 0 4px;
        gap: 6px;
        border: 1px solid var(--st-outline);
        border-radius: var(--st-r-pill);
        background: transparent;
        color: var(--st-fg-secondary);
        font-size: var(--st-fs-body);
        font-weight: 400;
      }
      .assign-chip ha-icon {
        --mdc-icon-size: 24px;
      }
      .assign-chip img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        object-fit: cover;
      }
      .assign-chip:hover {
        color: var(--st-fg);
        border-color: var(--st-field-outline-hover);
      }
      /* Has it now: filled quietly. Picked to take it: accent. Picked to unassign: dashed. */
      .assign-chip.current {
        color: var(--st-fg);
        background: color-mix(in srgb, var(--st-fg) 10%, transparent);
      }
      .assign-chip.picked {
        color: var(--st-accent);
        border-color: var(--st-accent);
        background: color-mix(in srgb, var(--st-accent) 14%, transparent);
      }
      .assign-chip.dropping {
        color: var(--st-fg-secondary);
        border-style: dashed;
      }
      /* Handing a ticket to the AI Agent matters, so its button also carries the agent's spark icon. */
      .composer button.primary {
        gap: 8px;
      }
      .composer button.primary ha-icon {
        --mdc-icon-size: 18px;
      }
      .composer .opts,
      .composer .acts {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
      }
      .composer .acts {
        justify-content: flex-end;
      }
      /*
       * The composer reacts to its own width, not the window's. Narrower than a desktop pane the chip loses the
       * word "Assign to" (its tooltip and label still say it) and the divider after the priority icons goes, so
       * everything stays on one line. On a phone the options sit on one line and the buttons stack full width
       * beneath, with their labels centred.
       */
      .dock {
        container-type: inline-size;
      }
      @container (max-width: 860px) {
        .composer .verb {
          display: none;
        }
        .composer .prio-group {
          border-right: 0;
          padding-right: 0;
        }
      }
      @container (max-width: 560px) {
        .composer .bar {
          flex-direction: column;
          align-items: stretch;
        }
        .composer .verb {
          display: inline;
        }
        .composer .acts button {
          flex: 1 1 100%;
          justify-content: center;
        }
      }
      .empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        gap: 8px;
        color: var(--st-fg-secondary);
      }
      .empty ha-icon {
        --mdc-icon-size: 48px;
        opacity: 0.5;
      }
    `,
  ];

  @property({ attribute: false }) ticket: Ticket | null = null;
  @property({ attribute: false }) client?: HaClient;
  /** When you last looked at this ticket, and your name: what others changed since is marked new. */
  @property() seenAt = "";
  @property() me = "";
  @property({ type: Boolean }) isAdmin = false;
  @property({ type: Boolean }) narrow = false;
  /** Where this ticket is in the list being worked through (for Previous and Next), or null when it isn't in it. */
  @property({ attribute: false }) navPos: { index: number; total: number } | null = null;
  @property() language: string | undefined = undefined;
  /** The AI agent a ticket can be assigned to. */
  @property() agentName = "claude";
  @property({ attribute: false }) labelMap: Map<string, Label> = new Map();
  @property({ attribute: false }) people: Map<string, Person> = new Map();
  @property({ attribute: false }) categoryMap: Map<string, Category> = new Map();

  @state() private _expanded = false;
  /** Status changes and other system lines are tucked away; the history button brings them back. */
  @state() private _showHistory = false;
  /** A long description collapses to one line as soon as the ticket is scrolled, and opens again at the top. */
  @state() private _descCollapsed = false;
  /** The description's natural height, measured while it is open. */
  private _descFull = 0;
  /** Collapsing moves the content and can trigger scroll events of its own; ignore them for a moment. */
  private _descSettle = 0;
  /**
   * The "Assign to AI Agent" switch in the comment box: null while untouched (so it follows the default), then
   * true or false once the admin clicks it. Nothing is sent until the main button is pressed.
   */
  @state() private _agentToggle: boolean | null = null;
  /** A priority picked in the comment box but not applied yet ("" = none picked). */
  @state() private _priorityTo = "";
  @state() private _comment = "";

  override willUpdate(changed: Map<string, unknown>) {
    if (changed.has("ticket")) {
      this.toggleAttribute("open", !!this.ticket);
      const prev = changed.get("ticket") as Ticket | null | undefined;
      const had = prev?.events.length ?? 0;
      if (prev?.id !== this.ticket?.id) {
        this._scrollTo = "top";
        this._descCollapsed = false;
        this._agentToggle = null;
        this._priorityTo = "";
        this._expanded = false;
        this._comment = "";
      } else if (this.ticket && this.ticket.events.length > had) {
        // A comment (yours, or an agent's arriving live) is on the end: bring it into view.
        this._scrollTo = "bottom";
      }
    }
  }

  /** Collapse a long description to one line on the first scroll; open it again on a return to the top. */
  private _onScroll(e: Event) {
    if (Date.now() < this._descSettle || this._descFull <= 56) return;
    const top = (e.currentTarget as HTMLElement).scrollTop;
    if (!this._descCollapsed && top > 4) this._setDescCollapsed(true);
    else if (this._descCollapsed && top <= 0) this._setDescCollapsed(false);
  }

  private _expandDescription = () => {
    if (!this._descCollapsed) return;
    this._setDescCollapsed(false);
    this.renderRoot.querySelector<HTMLElement>(".scroll")?.scrollTo({ top: 0 });
  };

  private _setDescCollapsed(on: boolean) {
    this._descCollapsed = on;
    this._descSettle = Date.now() + 400;
  }

  /** Where to scroll the ticket after the next render: a new ticket starts at the top, new comments at the end. */
  private _scrollTo: "top" | "bottom" | null = null;

  // ---- the title edits in place

  /** Make the title box exactly as tall as its text. */
  private _fitTitle(box: HTMLTextAreaElement) {
    box.style.height = "auto";
    // scrollHeight leaves out the box's own border, so add it back
    box.style.height = `${box.scrollHeight + (box.offsetHeight - box.clientHeight)}px`;
  }

  private _titleKey = (e: KeyboardEvent) => {
    const box = e.target as HTMLTextAreaElement;
    if (e.key === "Enter") {
      e.preventDefault(); // a title is one line of text; Enter saves it
      box.blur();
    } else if (e.key === "Escape") {
      box.value = this.ticket?.title ?? box.value; // give up the change
      box.blur();
    }
  };

  /** Leaving the box saves a changed, non-empty title; an empty one puts the old title back. */
  private _saveTitle(box: HTMLTextAreaElement) {
    const value = box.value.replace(/\s+/g, " ").trim();
    if (value && value !== this.ticket?.title) this._patch({ title: value });
    else box.value = this.ticket?.title ?? "";
    this._fitTitle(box);
  }

  private _resizer?: ResizeObserver;

  override connectedCallback() {
    super.connectedCallback();
    // A wider or narrower pane wraps the title differently, so the box has to be refitted.
    this._resizer = new ResizeObserver(() => {
      const box = this.renderRoot.querySelector<HTMLTextAreaElement>("textarea.title-edit");
      if (box) this._fitTitle(box);
    });
    this._resizer.observe(this);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._resizer?.disconnect();
  }

  override updated() {
    // The text can change (another ticket, an agent's edit) or wrap differently (a resize).
    const box = this.renderRoot.querySelector<HTMLTextAreaElement>("textarea.title-edit");
    if (box) this._fitTitle(box);
    if (!this._descCollapsed) {
      const card = this.renderRoot.querySelector<HTMLElement>(".desc-sticky .card");
      this._descFull = card ? card.offsetHeight : 0;
    }
    if (this._scrollTo) {
      const area = this.renderRoot.querySelector<HTMLElement>(".scroll");
      const to = this._scrollTo;
      this._scrollTo = null;
      area?.scrollTo({ top: to === "top" ? 0 : area.scrollHeight, behavior: to === "top" ? "auto" : "smooth" });
    }
  }

  private _fire(name: string, detail?: unknown) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  private _patch(patch: TicketPatch) {
    this._fire("patch-ticket", patch);
  }

  /** The small + opens the same search-and-pick popup the category uses, listing the labels not on this ticket yet. */
  private _addLabelControl(t: Ticket) {
    return html`<button class="add-label" title="Add Label" aria-label="Add Label" aria-haspopup="listbox"
      @click=${(e: Event) =>
        this.dispatchEvent(new CustomEvent("pick-label", {
          detail: { ticket: t, rect: (e.currentTarget as HTMLElement).getBoundingClientRect() },
          bubbles: true,
          composed: true,
        }))}><ha-icon icon="mdi:plus"></ha-icon></button>`;
  }

  /**
   * Priority is Normal unless it is High or Urgent, so there are just two tick pills. Ticking High sets High,
   * ticking Urgent switches it to Urgent, and ticking whichever is on puts it back to Normal. Nothing is
   * applied until the main button is pressed; the pills show what pressing it would leave.
   */
  private _shownPriority(t: Ticket): Priority {
    return (this._priorityTo || t.priority) as Priority;
  }

  private _togglePriority(t: Ticket, p: "high" | "urgent") {
    const next: Priority = this._shownPriority(t) === p ? "normal" : p;
    this._priorityTo = next === t.priority ? "" : next;
  }

  private _priorityPills(t: Ticket) {
    const shown = this._shownPriority(t);
    const icon = { high: "mdi:alert-outline", urgent: "mdi:alert" } as const;
    return html`<div class="assign prio-group" role="group" aria-label="Priority">
      ${(["high", "urgent"] as const).map((p) => {
        const on = shown === p;
        return html`<button class="prio-dot ${p} ${on ? "on" : ""}"
          aria-pressed=${on ? "true" : "false"} aria-label=${PRIORITY_LABEL[p]}
          title=${on ? `Priority is ${PRIORITY_LABEL[p]}. Click to clear.` : `Set priority to ${PRIORITY_LABEL[p]}`}
          @click=${() => this._togglePriority(t, p)}><ha-icon .icon=${icon[p]}></ha-icon></button>`;
      })}
    </div>`;
  }

  /** Is the ticket with the AI agent right now? */
  private _withAgent(t: Ticket): boolean {
    return !!t.assignee && isAgent(t.assignee);
  }

  /** After the agent has commented, the admin's reply goes back to it by default (it can be switched off). */
  private _agentDefault(t: Ticket): boolean {
    if (this._withAgent(t) || t.status === "resolved" || t.status === "closed") return false;
    const last = [...t.events].reverse().find((e) => e.kind === "comment" || e.kind === "note");
    return !!last && isAgent(last.actor);
  }

  /** Will the ticket be with the agent once the main button is pressed? */
  private _agentOn(t: Ticket): boolean {
    return this._agentToggle ?? (this._withAgent(t) || this._agentDefault(t));
  }

  /** Pressing the main button hands over (or takes back) only when asked to, or along with a comment. */
  private _agentApplies(t: Ticket): boolean {
    return this._agentOn(t) !== this._withAgent(t) && (this._agentToggle !== null || !!this._comment.trim());
  }

  private _canSubmit(t: Ticket): boolean {
    return !!this._comment.trim() || this._agentApplies(t) || !!this._priorityTo;
  }

  private _agentChip(t: Ticket) {
    const on = this._agentOn(t);
    const now = this._withAgent(t);
    const title = now
      ? on ? "With the AI Agent. Click to take it back." : "Will be taken back from the AI Agent. Click to keep it with them."
      : on ? "Will be assigned to the AI Agent. Click to switch off." : "Assign to the AI Agent";
    return html`<button class="assign-chip ${now && on ? "current" : ""} ${on && !now ? "picked" : ""} ${now && !on ? "dropping" : ""}"
      aria-pressed=${on ? "true" : "false"} aria-label="Assign to AI Agent" title=${title}
      @click=${() => (this._agentToggle = !on)}><ha-icon icon="mdi:creation"></ha-icon><span><span class="verb">Assign to </span>AI Agent</span></button>`;
  }

  /**
   * What the main button does. With a comment typed it is "Comment", plus "and Assign to AI Agent" when the
   * hand-over goes with it; a priority change shows on its own icon, so it adds no words. With nothing typed it
   * names the one thing it will do, or "Update" for both.
   */
  private _submitLabel(t: Ticket) {
    const agent = this._agentApplies(t);
    const agentWords = this._agentOn(t) ? "Assign to AI Agent" : "Unassign from AI Agent";
    if (this._comment.trim()) return agent ? `Comment and ${agentWords}` : "Comment";
    if (agent && this._priorityTo) return "Update";
    if (agent) return agentWords;
    if (this._priorityTo) return "Set Priority";
    return "Comment";
  }

  /** On a resolved or closed ticket, a comment can bring it back to In progress in the same step. */
  private _commentAndReopen() {
    const body = this._comment.trim();
    if (!body) return;
    this._fire("comment", { body, internal: false });
    this._comment = "";
    this._patch({ status: "in_progress" });
  }

  private _submitComment() {
    const t = this.ticket;
    if (!t || !this._canSubmit(t)) return;
    const body = this._comment.trim();
    if (body) this._fire("comment", { body, internal: false });
    const patch: TicketPatch = {};
    if (this._agentApplies(t)) patch.assignee = this._agentOn(t) ? this.agentName : null;
    if (this._priorityTo) patch.priority = this._priorityTo as Priority;
    if (Object.keys(patch).length) this._patch(patch);
    this._comment = "";
    this._agentToggle = null;
    this._priorityTo = "";
  }

  /**
   * Resolve does what it says. Whatever is in the comment box becomes the resolution (the cause and the fix);
   * with nothing typed the ticket is just marked resolved.
   */
  private _resolve() {
    const resolution = this._comment.trim();
    if (resolution) {
      this._fire("close-ticket", { resolution, status: "resolved" });
      this._comment = "";
    } else {
      this._patch({ status: "resolved" });
    }
  }

  private _change(e: TicketEvent): string {
    const d = (e.data ?? {}) as { field?: string; from?: unknown; to?: unknown; into?: unknown };
    const show = (v: unknown) =>
      Array.isArray(v) ? v.map((x) => (d.field === "labels" ? labelOrUnknown(this.labelMap, String(x)).name : String(x))).join(", ") || "none" : v === null || v === undefined || v === "" ? "none" : String(v);
    switch (e.kind) {
      case "created":
        return "created this ticket";
      case "status":
        return `changed status from ${STATUS_LABEL[d.from as Status] ?? show(d.from)} to ${STATUS_LABEL[d.to as Status] ?? show(d.to)}`;
      case "priority":
        return `changed priority from ${show(d.from)} to ${show(d.to)}`;
      case "assignee":
        return d.to ? `assigned this to ${show(d.to)}` : "unassigned this";
      case "link":
        return `linked ticket #${String(d.to)}`;
      case "merge":
        return d.from ? `merged ticket #${String(d.from)} into this one` : `merged this into ticket #${String(d.into)}`;
      case "attachment":
        return `added ${String(d.to)}`;
      case "field":
        return d.field === "description"
          ? "edited the description"
          : `changed ${String(d.field)}${d.field === "labels" || d.field === "entities" ? ` to ${show(d.to)}` : ""}`;
      default:
        return e.kind;
    }
  }

  /** The history view lists each change as a field and its value, e.g. "Status  New → In progress". */
  private _detail(e: TicketEvent): { field: string; from?: string; to: string; icon: string; tone: string } {
    const d = (e.data ?? {}) as { field?: string; from?: unknown; to?: unknown };
    const show = (v: unknown) =>
      Array.isArray(v)
        ? v.map((x) => (d.field === "labels" ? labelOrUnknown(this.labelMap, String(x)).name : String(x))).join(", ") || "none"
        : v === null || v === undefined || v === "" ? "none" : String(v);
    switch (e.kind) {
      case "created":
        return { field: "Ticket Opened", to: "", icon: "mdi:ticket-outline", tone: "var(--st-accent)" };
      case "status":
        return {
          field: "Status",
          from: STATUS_LABEL[d.from as Status] ?? show(d.from),
          to: STATUS_LABEL[d.to as Status] ?? show(d.to),
          icon: "mdi:progress-check",
          tone: d.to === "resolved" || d.to === "closed" ? "var(--st-success)" : "var(--st-accent)",
        };
      case "priority":
        return { field: "Priority", from: show(d.from), to: show(d.to), icon: "mdi:flag-outline", tone: "var(--st-warning)" };
      case "assignee":
        return { field: "Assignee", from: show(d.from), to: show(d.to), icon: "mdi:account-outline", tone: "var(--st-fg-secondary)" };
      case "link":
        return { field: "Linked", to: `ticket #${String(d.to)}`, icon: "mdi:link-variant", tone: "var(--st-fg-secondary)" };
      case "merge": {
        const x = (e.data ?? {}) as { from?: number; into?: number; title?: string };
        return x.from
          ? { field: "Merged", to: `ticket #${x.from} into this one`, icon: "mdi:call-merge", tone: "var(--st-fg-secondary)" }
          : { field: "Merged", to: `into ticket #${String(x.into)}`, icon: "mdi:call-merge", tone: "var(--st-fg-secondary)" };
      }
      case "attachment":
        return { field: "Added", to: String(d.to), icon: "mdi:paperclip", tone: "var(--st-fg-secondary)" };
      case "field": {
        const name = String(d.field ?? "field");
        const label = name.charAt(0).toUpperCase() + name.slice(1);
        const icon = name === "labels" ? "mdi:label-outline" : name === "category" ? "mdi:shape-outline" : "mdi:pencil-outline";
        return name === "description"
          ? { field: label, to: "edited", icon, tone: "var(--st-fg-secondary)" }
          : { field: label, from: show(d.from), to: show(d.to), icon, tone: "var(--st-fg-secondary)" };
      }
      default:
        return { field: e.kind, to: "", icon: "mdi:circle-small", tone: "var(--st-fg-secondary)" };
    }
  }

  /** A person's HA profile picture when they have one; otherwise the person icon (agents and Home Assistant have their own). */
  private _avatar(actor: string) {
    const picture = isAgent(actor) ? undefined : this.people.get(actorName(actor).toLowerCase())?.picture;
    return picture
      ? html`<div class="avatar photo"><img src=${picture} alt=${actorName(actor)} /></div>`
      : html`<div class="avatar"><ha-icon .icon=${actorIcon(actor)}></ha-icon></div>`;
  }

  @state() private _copied = false;

  /** Copy "#123" to the clipboard (with a fallback for pages served over plain http, where the clipboard API is missing). */
  private async _copyNumber(id: number) {
    const text = `#${id}`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const box = document.createElement("textarea");
      box.value = text;
      box.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(box);
      box.select();
      try {
        document.execCommand("copy");
      } finally {
        box.remove();
      }
    }
    this._copied = true;
    window.setTimeout(() => (this._copied = false), 1500);
  }

  /** A change by someone else since you last looked at this ticket. */
  private _isNew(e: TicketEvent): boolean {
    return !!this.seenAt && e.created_at > this.seenAt && e.actor !== this.me;
  }

  private _eventTemplate(e: TicketEvent) {
    const fresh = this._isNew(e);
    // With history on, every entry shows its exact date and time; otherwise comments say "25 minutes ago".
    const exact = fullTime(e.created_at, this.language);
    const when = this._showHistory
      ? html`<span title=${relativeTime(e.created_at, this.language)}>${exact}</span>`
      : html`<span title=${exact}>${relativeTime(e.created_at, this.language)}</span>`;
    if (e.kind === "comment" || e.kind === "note") {
      return html`
        <div class="ev ${fresh ? "new" : ""}">
          ${this._avatar(e.actor)}
          <div>
            <div class="who"><b>${actorLabel(e.actor)}</b> · <span class="when">${when}</span>${fresh ? html`<span class="new-tag">New</span>` : nothing}${e.kind === "note" ? html`<span class="label dense">internal note</span>` : nothing}${(e.data as { merged_from?: number } | null)?.merged_from ? html`<span class="label dense" title="Copied here when a ticket was merged">from #${(e.data as { merged_from: number }).merged_from}</span>` : nothing}</div>
            <div class="bubble md ${e.kind === "note" ? "note" : ""}">${unsafeHTML(renderMarkdown(e.body ?? ""))}</div>
          </div>
        </div>`;
    }
    const d = this._detail(e);
    return html`
      <div class="ev system ${fresh ? "new" : ""}">
        <ha-icon .icon=${d.icon}></ha-icon>
        <div class="line">
          <span><b>${d.field}</b> ${d.to}${d.from !== undefined ? html`<s>${d.from}</s>` : nothing}</span>
          <span class="stamp">${fresh ? html`<b class="new-text">New · </b>` : nothing}${actorLabel(e.actor)} · ${exact}</span>
        </div>
      </div>`;
  }

  override render() {
    const t = this.ticket;
    if (!t) {
      return html`<div class="empty"><ha-icon icon="mdi:ticket-outline"></ha-icon><span>Select a ticket</span></div>`;
    }
    const long = t.description.length > LONG_DESCRIPTION;
    const done = t.status === "resolved" || t.status === "closed";
    return html`
      <div class="top">
        <div class="head ${this.isAdmin ? "admin" : ""}">
          ${this.narrow
            ? html`<button class="icon back" title="Back" aria-label="Back" @click=${() => this._fire("back")}><ha-icon icon="mdi:arrow-left"></ha-icon></button>`
            : nothing}
          ${this.isAdmin
            ? html`<textarea class="title-edit" rows="1" aria-label="Title" spellcheck="false" .value=${t.title}
                @input=${(e: Event) => this._fitTitle(e.target as HTMLTextAreaElement)}
                @keydown=${this._titleKey}
                @blur=${(e: Event) => this._saveTitle(e.target as HTMLTextAreaElement)}></textarea>`
            : html`<h1>${t.title}</h1>`}
          ${this.isAdmin
            ? html`<button class="icon hist prev" title="Previous ticket" aria-label="Previous ticket" ?disabled=${!this.navPos || this.navPos.index <= 0}
                @click=${() => this._fire("nav-ticket", -1)}><ha-icon icon="mdi:chevron-up"></ha-icon></button>
              <button class="icon hist next" title=${this.navPos ? `Next ticket (${this.navPos.index + 1} of ${this.navPos.total})` : "Next ticket"} aria-label="Next ticket"
                ?disabled=${!this.navPos || this.navPos.index >= this.navPos.total - 1}
                @click=${() => this._fire("nav-ticket", 1)}><ha-icon icon="mdi:chevron-down"></ha-icon></button>
              <button class="icon hist merge" title="Merge into another ticket" aria-label="Merge into another ticket"
                @click=${(e: Event) => this._fire("pick-merge", { rect: (e.currentTarget as HTMLElement).getBoundingClientRect() })}>
                <ha-icon icon="mdi:call-merge"></ha-icon></button>`
            : nothing}
          <button class="icon hist" aria-pressed=${this._showHistory ? "true" : "false"}
            title=${this._showHistory ? "Hide history" : "Show history"} aria-label="Show history"
            @click=${() => (this._showHistory = !this._showHistory)}><ha-icon icon="mdi:history"></ha-icon></button>
        </div>
        <div class="sub">
          <div class="meta-line">
            <span>Opened ${relativeTime(t.created_at, this.language)} by <ha-icon icon=${metaIcon(t.requester)}></ha-icon> ${actorName(t.requester)}</span>
            ${t.updated_by ? html`<span>Updated ${relativeTime(t.updated_at, this.language)} by <ha-icon icon=${metaIcon(t.updated_by)}></ha-icon> ${actorName(t.updated_by)}</span>` : nothing}
            ${t.assignee && isAgent(t.assignee) ? html`<span><ha-icon icon=${metaIcon(t.assignee)}></ha-icon> With ${actorLabel(t.assignee)}</span>` : nothing}
            ${t.labels.includes(BLOCKED) ? html`<span class="blocked" title="Waiting on a person, a part or a fix"><ha-icon icon="mdi:timer-sand"></ha-icon> Blocked</span>` : nothing}
            ${t.comment_count ? html`<span><ha-icon icon="mdi:comment-outline"></ha-icon> ${t.comment_count}</span>` : nothing}
          </div>
          ${t.agent_state
            ? html`<div class="agent-strip" role="status">
                <ha-icon icon="mdi:star-four-points"></ha-icon>
                <span class="what"><b>${actorLabel(`ai:${t.agent_state.agent}`)}</b> working on this${t.agent_state.note ? html` <span class="note">· ${t.agent_state.note}</span>` : nothing}</span>
                ${this.isAdmin && this.client ? html`<button class="plain" @click=${() => void this.client!.stopAgent(t.id)}>Stop</button>` : nothing}
              </div>`
            : nothing}
          <!-- Second line: the category, status and priority, then the labels (which wrap on to their own line if they don't fit). -->
          <div class="tag-line">
            <button class="num ${this._copied ? "copied" : ""}" title=${this._copied ? "Copied" : "Copy the ticket number"} aria-label="Ticket ${t.id}: copy the number"
              @click=${() => void this._copyNumber(t.id)}>${this._copied ? html`<ha-icon icon="mdi:check"></ha-icon>Copied` : html`#${t.id}`}</button>
            <st-ticket-tags show="category" .ticket=${t} .categoryMap=${this.categoryMap} .labelMap=${this.labelMap} .isAdmin=${this.isAdmin}></st-ticket-tags>
            <span class="status" style="--state: ${STATE_COLOR[t.status]}"><ha-icon .icon=${STATE_ICON[t.status]}></ha-icon>${STATUS_LABEL[t.status]}</span>
            ${t.priority === "urgent" || t.priority === "high"
              ? html`<span class="prio ${t.priority}"><ha-icon .icon=${t.priority === "urgent" ? "mdi:alert" : "mdi:alert-outline"}></ha-icon>${PRIORITY_LABEL[t.priority]}</span>`
              : nothing}
            <!-- The labels are one block: when they don't fit beside the category they drop to a line of their own. -->
            <st-ticket-tags show="labels" .ticket=${t} .categoryMap=${this.categoryMap} .labelMap=${this.labelMap} .isAdmin=${this.isAdmin} .maxBadges=${12} coloured expanded>
              ${this.isAdmin ? this._addLabelControl(t) : nothing}
            </st-ticket-tags>
          </div>
        </div>
      </div>
      <div class="scroll" @scroll=${this._onScroll}>
        <div class="wrap">
        ${t.description || t.attachments?.length
          ? html`<div class="desc-sticky ${this._descCollapsed ? "one" : ""}"
              role=${this._descCollapsed ? "button" : nothing} tabindex=${this._descCollapsed ? 0 : nothing}
              aria-label=${this._descCollapsed ? "Show the full description" : nothing}
              @click=${this._expandDescription}
              @keydown=${(e: KeyboardEvent) => (e.key === "Enter" || e.key === " ") && this._descCollapsed && (e.preventDefault(), this._expandDescription())}>
              <div class="card desc">
                ${t.description ? html`<div class="md ${long && !this._expanded ? "clamp" : ""}">${unsafeHTML(renderMarkdown(t.description))}</div>` : nothing}
                ${t.attachments?.length && this.client
                  ? html`<st-ticket-attachments class="attached" .client=${this.client} .ticketId=${t.id} .items=${t.attachments}></st-ticket-attachments>`
                  : nothing}
                ${long ? html`<button class="more" @click=${() => (this._expanded = !this._expanded)}>${this._expanded ? "Show Less" : "Show All"}</button>` : nothing}
                ${t.entities.length ? html`<div class="entities">${t.entities.map((x) => html`<code>${x}</code>`)}</div>` : nothing}
              </div>
              <ha-icon class="pin-hint" icon="mdi:chevron-up"></ha-icon>
            </div>`
          : nothing}

        ${t.resolution
          ? html`<div class="card resolution"><h3>Resolution</h3><div class="md">${unsafeHTML(renderMarkdown(t.resolution))}</div></div>`
          : nothing}

        ${t.related?.length
          ? html`<div class="chips"><span class="sect">Related</span>${t.related.map((r) => html`<span class="chip link" title=${r.title} @click=${() => this._fire("open-ticket", r.id)}>#${r.id} ${r.title.length > 40 ? r.title.slice(0, 40) + "…" : r.title}</span>`)}</div>`
          : nothing}

        <div class="timeline" aria-live="polite" aria-relevant="additions">
          <h2>${this._showHistory ? "Activity" : "Comments"}</h2>
          ${t.events
            .filter((e) => this._showHistory || e.kind === "comment" || e.kind === "note")
            .map((e) => this._eventTemplate(e))}
          ${!this._showHistory && !t.events.some((e) => e.kind === "comment" || e.kind === "note")
            ? html`<div class="none">No comments yet</div>`
            : nothing}
        </div>
      </div></div>

      <div class="dock">
        <div class="card composer">
          <textarea rows="2" placeholder="Add a comment" .value=${this._comment}
            @input=${(e: Event) => (this._comment = (e.target as HTMLTextAreaElement).value)}></textarea>
          <div class="bar">
            <div class="opts">
              ${this.isAdmin
                ? html`${this._agentChip(t)}
                    ${this._priorityPills(t)}`
                : nothing}
            </div>
            <div class="acts">
            ${this.isAdmin && !done
              ? html`<button title="Mark as resolved. Anything typed above is saved as the resolution." @click=${() => this._resolve()}><ha-icon icon="mdi:check-circle-outline"></ha-icon>Resolve</button>`
              : nothing}
            ${this.isAdmin && done
              ? html`<button title="Move this ticket back to In Progress. Anything typed above is posted as a comment first." @click=${() => (this._comment.trim() ? this._commentAndReopen() : this._patch({ status: "in_progress" }))}><ha-icon icon="mdi:restore"></ha-icon>Reopen</button>`
              : nothing}
            <button class="primary" ?disabled=${!this._canSubmit(t)} @click=${this._submitComment}>${this._agentApplies(t) && this._agentOn(t) ? html`<ha-icon icon="mdi:creation"></ha-icon>` : nothing}${this._submitLabel(t)}</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "st-ticket-detail": TicketDetail;
  }
}
