import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { safeCustomElement } from "../define";
import "./dropdown";
import "./ticket-tags";
import "./ticket-attachments";
import "./ticket-things";
import type { HaClient } from "../ha-client";
import { sharedStyles } from "../styles";
import { BLOCKED, PRIORITIES } from "../types";
import type { Category, HomeAssistant, Priority, ProposedAction, Status, Label, Ticket, TicketEvent, TicketPatch } from "../types";
import {
  PRIORITY_LABEL,
  STATE_COLOR,
  STATE_ICON,
  STATUS_LABEL,
  actorIcon,
  actorLabel,
  isAgent,
  actorName,
  assigneeName,
  reviewLabel,
  runLabel,
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
/** The height of the pinned description once it is folded to one line. */
const DESC_ONE_LINE = 56;
/** The room kept between the squeezed description and the Comments heading below it. */
const DESC_GAP = 16;

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
      /*
       * The comment box is a slim strip until it is wanted: pointing at it, clicking into it, or the R key opens it,
       * and it stays open while it holds a draft. It opens upward over the thread (the dock keeps the strip's height), so
       * the conversation doesn't jump about. Escape (or R, with the cursor outside the box) closes it again.
       */
      .dock {
        position: relative;
        z-index: 5;
        flex: none;
        height: 76px;
      }
      .dock .dock-in {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        box-sizing: border-box;
        padding: 12px 18px 16px;
        border-top: 1px solid var(--st-divider);
        background: var(--st-selected, var(--st-surface));
      }
      .dock .card.composer {
        margin: 0;
        padding: 0;
      }
      /* A closed strip is as tall as an input (48px, box-sizing border-box), so its one line of text sits in the middle. */
      .dock .composer textarea {
        box-sizing: border-box;
        height: 48px;
        min-height: 0;
        padding: 13px 16px 12px;
        resize: none;
        transition: height 180ms ease;
      }
      /* The buttons slide open under the text: the row grows from nothing (and is out of the tab order while it is shut). */
      .dock .bar-wrap {
        display: grid;
        grid-template-rows: 0fr;
        visibility: hidden;
        transition:
          grid-template-rows 180ms ease,
          visibility 0s linear 180ms;
      }
      .dock .bar-clip {
        min-height: 0;
        overflow: hidden;
      }
      .dock .dock-in {
        transition: box-shadow 180ms ease;
      }
      .dock:is(.keep, :not(.shut):hover, :not(.shut):focus-within) .dock-in {
        box-shadow: 0 -6px 16px -6px rgba(0, 0, 0, 0.4);
      }
      .dock:is(.keep, :not(.shut):hover, :not(.shut):focus-within) .composer textarea {
        height: 72px;
        resize: vertical;
      }
      .dock:is(.keep, :not(.shut):hover, :not(.shut):focus-within) .bar-wrap {
        grid-template-rows: 1fr;
        visibility: visible;
        transition-delay: 0s;
      }
      @media (prefers-reduced-motion: reduce) {
        .dock .composer textarea,
        .dock .bar-wrap,
        .dock .dock-in {
          transition: none;
        }
      }
      /* An open ticket sits on the same colour as its row in the list, so the two read as one thing. */
      :host([open]) {
        background: var(--st-selected, var(--st-hover));
      }
      /* The ticket uses the whole pane and is laid out flat: sections divided by lines, not boxed in cards. */
      .wrap {
        --wrap-top: 16px;
        min-width: 0;
        padding: var(--wrap-top) 18px 28px; /* room under the last comment, above the comment box */
      }
      /*
       * A description of more than a couple of lines is pinned at the top as you scroll, and shrinks at the same rate as you
       * scroll until it is one line ending in an ellipsis (the panel sets its height from the scroll position).
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
      /* While it is being squeezed, its bottom edge fades out instead of cutting a line of text in half. */
      .desc-sticky.shrunk {
        -webkit-mask-image: linear-gradient(to bottom, #000 calc(100% - 28px), transparent);
        mask-image: linear-gradient(to bottom, #000 calc(100% - 28px), transparent);
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
      .desc-sticky.one .about,
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
      /* With the full width button at the far right, the others each move over one place. */
      .head.has-wide {
        padding-right: 88px;
      }
      .head.admin.has-wide {
        padding-right: 220px;
      }
      .head.has-wide .hist {
        right: 44px;
      }
      .head.has-wide .hist.merge {
        right: 88px;
      }
      .head.has-wide .hist.next {
        right: 132px;
      }
      .head.has-wide .hist.prev {
        right: 176px;
      }
      .head.has-wide .hist.wide-toggle {
        right: 0;
      }
      .hist[disabled] {
        opacity: 0.35;
        cursor: default;
      }
      /*
       * The full width view: the header runs across the top, the details and description sit in a panel on the left (it
       * scrolls on its own), and the right is only the comments, with the comment box docked under them.
       */
      :host([wide]) .wide-body {
        flex: 1;
        min-height: 0;
        display: grid;
        grid-template-columns: clamp(340px, 36%, 560px) minmax(0, 1fr);
      }
      .side {
        min-width: 0;
        min-height: 0;
        overflow-y: auto;
        padding: 16px 18px 28px;
        border-right: 1px solid var(--st-divider);
        background: var(--st-selected-soft, var(--st-surface));
      }
      .side .sub {
        margin-top: 0;
      }
      .side-wrap {
        margin-top: 16px;
      }
      /* In the side panel the description just sits there, whole: it isn't pinned or squeezed. */
      .desc-sticky.plain {
        position: static;
        margin-top: 0;
        padding-top: 0;
        overflow: visible;
        z-index: auto;
      }
      .main {
        min-width: 0;
        min-height: 0;
        display: flex;
        flex-direction: column;
      }
      .main .scroll {
        flex: 1;
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
      .about {
        margin-top: 12px;
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
      /* The AI Agent is working: a comment in the thread with what it is doing, and a Stop button. */
      .ev.working .bubble {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .ev.working .bubble > ha-icon {
        --mdc-icon-size: 18px;
        flex: none;
        color: var(--st-accent);
        animation: working 1.4s ease-in-out infinite;
      }
      .ev.working .what {
        flex: 1;
        min-width: 0;
      }
      .ev.working .what .note {
        color: var(--st-fg-secondary);
      }
      @keyframes working {
        50% {
          opacity: 0.3;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .ev.working .bubble > ha-icon {
          animation: none;
        }
      }
      /* Changes the AI Agent proposes: a flat box under its comment with what it would do, and Apply and Dismiss. */
      .proposal {
        margin-top: 8px;
        padding: 12px 16px;
        border: 1px solid var(--st-outline);
        border-radius: var(--ha-border-radius-lg, 12px);
        font-size: var(--st-fs-body);
      }
      .proposal .p-head {
        display: flex;
        align-items: center;
        gap: 6px;
        font-weight: 500;
        color: var(--st-accent);
      }
      .proposal .p-head ha-icon,
      .proposal .p-state ha-icon {
        --mdc-icon-size: 18px;
      }
      .proposal ul {
        margin: 6px 0 0;
        padding-left: 22px;
      }
      .proposal li + li {
        margin-top: 6px;
      }
      .proposal .p-sub {
        color: var(--st-fg-secondary);
      }
      .proposal .p-note {
        margin-top: 6px;
        color: var(--st-fg-secondary);
      }
      .proposal .p-acts {
        display: flex;
        gap: 8px;
        margin-top: 12px;
      }
      .proposal .p-state {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-top: 8px;
        color: var(--st-fg-secondary);
      }
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
      /* Queue and the priority pills sit together, set off from Resolve and Comment by a thin line. */
      .prio-group {
        padding: 0 12px 0 0;
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
      /* AI Action: one pill, a label and a segment for each thing it can do, the same height as the priority pills beside it. */
      .ai-action {
        margin-right: auto; /* pushes everything else to the right: AI Action sits at the left edge of the bar */
        display: inline-flex;
        align-items: stretch;
        height: 32px;
        border: 1px solid var(--st-outline);
        border-radius: var(--st-r-pill);
        overflow: hidden;
        color: var(--st-fg-secondary);
        font-size: var(--st-fs-body);
      }
      .ai-action .lead {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 0 10px 0 6px;
        white-space: nowrap;
      }
      .ai-action .lead ha-icon {
        --mdc-icon-size: 20px;
      }
      .ai-action button {
        height: auto;
        padding: 0 12px;
        gap: 4px;
        border-radius: 0;
        border-left: 1px solid var(--st-outline);
        color: var(--st-fg);
        font-weight: 400;
      }
      .ai-action button:hover {
        background: var(--st-hover);
      }
      .ai-action button ha-icon {
        --mdc-icon-size: 16px;
      }
      .prio-dots {
        display: inline-flex;
        gap: 6px;
      }
      /* Queue for AI Agent, beside the priority icons: highlighted while it is queued or picked to be; it reads "Queued" only once the ticket really is (not while picked, before the main button is pressed); dashed while it is picked to be taken off. */
      .queue-chip {
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
      .queue-chip ha-icon {
        --mdc-icon-size: 24px;
      }
      .queue-chip:hover {
        color: var(--st-fg);
        border-color: var(--st-field-outline-hover);
      }
      .queue-chip.on {
        color: var(--st-accent);
        border-color: var(--st-accent);
        background: color-mix(in srgb, var(--st-accent) 14%, transparent);
      }
      .queue-chip.dropping {
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
       * The composer reacts to its own width, not the window's. Narrower than a desktop pane, the divider after the priority icons goes, so
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
  /** The built-in AI agent can be asked to work on a ticket now (an AI Task agent is chosen in Settings), and its name. */
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ type: Boolean }) canAsk = false;
  /** The full width view: the ticket fills the page, details and description on the left and the comments on the right. */
  @property({ type: Boolean, reflect: true }) wide = false;
  /** Run AI Agent Now is set up, so the AI Action control offers Run. */
  @property({ type: Boolean }) canRun = false;
  @property({ attribute: false }) labelMap: Map<string, Label> = new Map();
  @property({ attribute: false }) people: Map<string, Person> = new Map();
  @property({ attribute: false }) categoryMap: Map<string, Category> = new Map();

  @state() private _expanded = false;
  /** Status changes and other system lines are tucked away; the history button brings them back. */
  @state() private _showHistory = false;
  /** A long description collapses to one line as soon as the ticket is scrolled, and opens again at the top. */
  @state() private _descCollapsed = false;
  /** The description's natural height, measured while it is not folded to one line. */
  private _descFull = 0;
  /**
   * The "Queue for AI Agent" choice beside the priority icons: null while untouched (so it follows the ticket), then true or
   * false once the admin clicks it. Like a priority, nothing is sent until the main button is pressed.
   */
  @state() private _agentToggle: boolean | null = null;
  /**
   * How the comment box is shown: "auto" (a strip, opening on hover or focus and staying open with a draft), "open" (the R key
   * pinned it open) or "closed" (Escape or R shut it, even over a draft, until the pointer comes onto it again (or leaves it, if it was already on it) or it is clicked into).
   */
  @state() private _composerMode: "auto" | "open" | "closed" = "auto";
  /** A priority picked in the comment box but not applied yet ("" = none picked). */
  @state() private _priorityTo = "";
  @state() private _comment = "";

  override willUpdate(changed: Map<string, unknown>) {
    if (changed.has("wide")) this._descCollapsed = false; // the side panel shows the description whole
    if (changed.has("ticket")) {
      this.toggleAttribute("open", !!this.ticket);
      const prev = changed.get("ticket") as Ticket | null | undefined;
      const had = prev?.events.length ?? 0;
      if (this.ticket && (this.ticket.status === "resolved" || this.ticket.status === "closed")) {
        this._priorityTo = ""; // no priority to set, and nothing to queue, on a finished ticket
        this._agentToggle = null;
      }
      if (prev?.id !== this.ticket?.id) {
        this._scrollTo = "top";
        this._descCollapsed = false;
        this._priorityTo = "";
        this._agentToggle = null;
        this._composerMode = "auto";
        this._expanded = false;
        this._comment = "";
      } else if (this.ticket?.agent_state && !prev?.agent_state) {
        this._scrollTo = "bottom"; // the AI Agent has started: show its comment
      } else if (this.ticket && this.ticket.events.length > had) {
        // A comment (yours, or an agent's arriving live) is on the end: bring it into view.
        this._scrollTo = "bottom";
      }
    }
  }

  /**
   * The pinned description shrinks at the same rate as the thread scrolls, until it is one line ending in an ellipsis, and
   * opens out again as you scroll back up. Its height follows the scroll position, and the space it gives up is added
   * back below it, so the page keeps its length and the comments move at the speed of the scroll, right under its bottom edge.
   */
  private _onScroll(e: Event) {
    if (this.wide) return;
    this._shrinkDescription((e.currentTarget as HTMLElement).scrollTop);
  }

  private _shrinkDescription(scrollTop: number) {
    const block = this.renderRoot.querySelector<HTMLElement>(".desc-sticky");
    if (!block) return;
    const full = this._descFull;
    if (full <= DESC_ONE_LINE || scrollTop <= 0) {
      block.style.height = "";
      block.style.marginBottom = "";
      block.classList.remove("shrunk");
      if (this._descCollapsed) this._descCollapsed = false;
      return;
    }
    const height = Math.max(DESC_ONE_LINE, full - scrollTop);
    block.style.height = `${height}px`;
    // A little extra room (eased in over the first few pixels, so nothing jumps) keeps the cropped edge off the Comments heading.
    block.style.marginBottom = `${full - height + Math.min(DESC_GAP, scrollTop)}px`;
    const one = height <= DESC_ONE_LINE;
    block.classList.toggle("shrunk", !one);
    if (one !== this._descCollapsed) this._descCollapsed = one;
  }

  private _expandDescription = () => {
    if (!this._descCollapsed) return;
    this.renderRoot.querySelector<HTMLElement>(".scroll")?.scrollTo({ top: 0 });
  };

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
    window.addEventListener("keydown", this._hotkey, true); // capture: nothing else on the page can swallow it first
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("keydown", this._hotkey, true);
    this._resizer?.disconnect();
  }

  override updated() {
    // The text can change (another ticket, an agent's edit) or wrap differently (a resize).
    const box = this.renderRoot.querySelector<HTMLTextAreaElement>("textarea.title-edit");
    if (box) this._fitTitle(box);
    if (!this._descCollapsed) {
      // The block's natural height, whatever height the scroll has squeezed it to (scrollHeight is the whole content).
      const block = this.renderRoot.querySelector<HTMLElement>(".desc-sticky");
      this._descFull = block ? block.scrollHeight : 0;
    }
    if (this._scrollTo) {
      const area = this.renderRoot.querySelector<HTMLElement>(".scroll");
      const to = this._scrollTo;
      this._scrollTo = null;
      area?.scrollTo({ top: to === "top" ? 0 : area.scrollHeight, behavior: to === "top" ? "auto" : "smooth" });
    }
    // The description or the pane may have changed size under a half-shrunk block (Show All, a resize): fit it again.
    const scroller = this.renderRoot.querySelector<HTMLElement>(".scroll");
    if (scroller) this._shrinkDescription(scroller.scrollTop);
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
    return html`<span class="prio-dots" role="group" aria-label="Priority">
      ${(["high", "urgent"] as const).map((p) => {
        const on = shown === p;
        return html`<button class="prio-dot ${p} ${on ? "on" : ""}"
          aria-pressed=${on ? "true" : "false"} aria-label=${PRIORITY_LABEL[p]}
          title=${on ? `Priority is ${PRIORITY_LABEL[p]}. Click to clear.` : `Set priority to ${PRIORITY_LABEL[p]}`}
          @click=${() => this._togglePriority(t, p)}><ha-icon .icon=${icon[p]}></ha-icon></button>`;
      })}
    </span>`;
  }

  /** Is the ticket with the AI agent right now? */
  private _withAgent(t: Ticket): boolean {
    return !!t.assignee && isAgent(t.assignee);
  }

  /** Will the ticket be with the agent once the main button is pressed? */
  private _agentOn(t: Ticket): boolean {
    return this._agentToggle ?? this._withAgent(t);
  }

  /** Pressing the main button queues (or takes off the queue) only if that was picked. */
  private _agentApplies(t: Ticket): boolean {
    return this._agentOn(t) !== this._withAgent(t);
  }

  /** Open whatever the pointer is doing: pinned by the R key, or holding something not sent yet. */
  private get _composerKeep(): boolean {
    const draft = !!this._comment.trim() || !!this._priorityTo || this._agentToggle !== null;
    return this._composerMode === "open" || (this._composerMode === "auto" && draft);
  }

  private _closeComposer() {
    this._composerMode = "closed";
    ((this.renderRoot as ShadowRoot).activeElement as HTMLElement | null)?.blur();
  }

  /**
   * The R key (for reply; Home Assistant uses C, E, D, M and A itself) opens the comment box and puts the cursor in it, or closes
   * it if it is open and the cursor is not in it. With the cursor in the box an R is just a letter, so Escape closes it from there.
   */
  private _toggleComposer() {
    const dock = this.renderRoot.querySelector<HTMLElement>(".dock");
    if (!dock) return;
    const shut = dock.classList.contains("shut");
    const open = dock.classList.contains("keep") || (!shut && (dock.matches(":hover") || dock.matches(":focus-within")));
    if (open) {
      this._closeComposer();
      return;
    }
    this._composerMode = "open";
    void this.updateComplete.then(() => this.renderRoot.querySelector<HTMLTextAreaElement>(".composer textarea")?.focus());
  }

  private _hotkey = (e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    const reply = key === "r" || e.code === "KeyR";
    const full = key === "f" || e.code === "KeyF";
    if ((!reply && !full) || e.ctrlKey || e.metaKey || e.altKey || e.repeat || e.isComposing || !this.ticket) return;
    const from = e.composedPath()[0] as HTMLElement | undefined;
    if (from && (from.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(from.tagName))) return; // typing somewhere
    if (full) {
      if (this.narrow) return; // a phone already shows the ticket full screen
      e.preventDefault();
      this._fire("toggle-wide");
      return;
    }
    e.preventDefault();
    this._toggleComposer();
  };

  private _canSubmit(t: Ticket): boolean {
    return !!this._comment.trim() || this._agentApplies(t) || !!this._priorityTo;
  }

  /** "Queue for AI Agent" sits with the priority icons: a choice that is applied with the main button. Free; nothing is sent anywhere. */
  private _queueChip(t: Ticket) {
    const on = this._agentOn(t);
    const now = this._withAgent(t);
    const title = now
      ? on ? "Queued for an AI agent you run yourself. Click to take it off the queue." : "It will be taken off the AI agent queue. Click to keep it."
      : on ? "Will be queued for an AI agent. Click to switch off."
        : "Queue this ticket for an AI agent you run yourself (your Claude CLI, Gemini Antigravity or anything else). Nothing is sent anywhere.";
    return html`<button class="queue-chip ${on ? "on" : ""} ${now && !on ? "dropping" : ""}"
      aria-pressed=${on ? "true" : "false"} aria-label=${now ? "Queued for AI Agent" : "Queue for AI Agent"} title=${title}
      @click=${() => (this._agentToggle = !on)}><ha-icon icon="mdi:creation"></ha-icon><span>${now ? "Queued" : "Queue"}<span class="verb"> for AI Agent</span></span></button>`;
  }

  /**
   * "AI Action" is for doing something now, one click each, with whatever is in the comment box posted first as the
   * instruction: Run (starts the agent on the Network LXC, once it is set up) and Review (asks the AI chosen in Settings;
   * the panel confirms, because it uses your AI plan).
   */
  private _aiAction(t: Ticket) {
    // A resolved or closed ticket isn't open for work: Run waits for Reopen. Review can still ask what happened.
    const worked = t.status !== "resolved" && t.status !== "closed";
    const run = worked && this.canRun && !t.agent_state;
    const review = this.canAsk && !t.agent_state;
    if (!run && !review) return nothing;
    const done = () => { this._comment = ""; };
    return html`<div class="ai-action" role="group" aria-label="AI Action">
      <span class="lead"><ha-icon icon="mdi:creation"></ha-icon>AI Action</span>
      ${run
        ? html`<button title="Start the AI agent on the Network LXC on this ticket now. It reads it and says what it found and what it would change; nothing changes until you press Proceed. It uses your AI plan."
            @click=${() => this._fire("run-agent", { body: this._comment.trim(), done })}>Run</button>`
        : nothing}
      ${review
        ? html`<button title="Have the AI chosen in Settings review this ticket: what it thinks is going on and what to try. It can't change anything and it uses your AI plan."
            @click=${() => this._fire("ask-ai", { body: this._comment.trim(), done })}>Review</button>`
        : nothing}
    </div>`;
  }

  /**
   * What the main button does. With a comment typed it is "Comment", plus "and Queue for AI Agent" when that was picked;
   * a priority change shows on its own icon, so it adds no words. With nothing typed it names the one thing it will do,
   * or "Update" for both.
   */
  private _submitLabel(t: Ticket) {
    const agent = this._agentApplies(t);
    const agentWords = this._agentOn(t) ? "Queue for AI Agent" : "Remove from AI Agent Queue";
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
    if (this._composerMode === "open") this._composerMode = "auto";
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
        return d.to ? `${isAgent(String(d.to)) ? "queued this for an AI Agent" : `assigned this to ${assigneeName(String(d.to))}`}` : "took this off the AI Agent queue";
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

  /** While the AI Agent works, a comment from it says so and what it is doing; its reply takes its place. */
  private _workingComment(t: Ticket) {
    const state = t.agent_state!;
    const who = `ai:${state.agent}`;
    return html`<div class="ev working" role="status">
      ${this._avatar(who)}
      <div>
        <div class="who"><b>${state.kind === "run" ? runLabel(who) : reviewLabel(who)}</b> · <span class="when">now</span></div>
        <div class="bubble">
          <ha-icon icon="mdi:star-four-points"></ha-icon>
          <span class="what">working on this${state.note ? html` <span class="note">· ${state.note}</span>` : nothing}</span>
          ${this.isAdmin && this.client ? html`<button class="plain" @click=${() => void this.client!.stopAgent(t.id)}>Stop</button>` : nothing}
        </div>
      </div>
    </div>`;
  }

  /** One proposed change in words: what it does, and for a resolution the words it will be recorded with. */
  private _actionWords(a: ProposedAction) {
    switch (a.action) {
      case "close":
        return html`<b>${a.status === "closed" ? "Close" : "Resolve"} this ticket</b><div class="p-sub">Resolution: “${a.resolution}”</div>`;
      case "set_priority":
        return html`Set the priority to <b>${PRIORITY_LABEL[a.priority] ?? a.priority}</b>`;
      case "add_label":
        return html`Add the label <b>${a.label}</b>`;
      case "remove_label":
        return html`Remove the label <b>${a.label}</b>`;
      case "set_category":
        return html`Move it to the category <b>${a.category}</b>`;
    }
  }

  /** Changes the AI Agent proposed in a comment: what they are, and Apply and Dismiss while it is the newest and waiting. */
  private _proposal(e: TicketEvent) {
    const p = e.data?.proposal;
    if (!p || !this.ticket) return nothing;
    const newest = [...this.ticket.events].reverse().find((x) => x.data?.proposal)?.id === e.id;
    const open = p.state === "pending" && newest && this.isAdmin;
    const fire = (action: "apply" | "dismiss") => this._fire("proposal", { eventId: e.id, action });
    return html`<div class="proposal">
      <div class="p-head"><ha-icon icon="mdi:star-four-points"></ha-icon>Proposed change${p.actions.length > 1 ? "s" : ""}</div>
      <ul>${p.actions.map((a) => html`<li>${this._actionWords(a)}</li>`)}</ul>
      ${open
        ? html`<div class="p-acts"><button class="primary" @click=${() => fire("apply")}>Apply</button><button @click=${() => fire("dismiss")}>Dismiss</button></div>`
        : html`<div class="p-state"><ha-icon .icon=${p.state === "applied" ? "mdi:check" : "mdi:close"}></ha-icon>${
            p.state === "applied" ? `Applied by ${actorName(p.by ?? "")}` : p.state === "dismissed" ? `Dismissed by ${actorName(p.by ?? "")}` : "Replaced by a newer reply"
          }</div>`}
    </div>`;
  }

  /** The go-ahead on an AI Agent's Run reply: nothing is changed until Proceed is pressed, by a person in the panel. */
  private _proceed(e: TicketEvent) {
    const p = e.data?.proceed;
    if (!p || !this.ticket) return nothing;
    const newest = [...this.ticket.events].reverse().find((x) => x.data?.proceed)?.id === e.id;
    const open = p.state === "pending" && newest && this.isAdmin;
    const fire = (action: "approve" | "dismiss") => this._fire("proceed", { eventId: e.id, action });
    return html`<div class="proposal">
      <div class="p-head"><ha-icon icon="mdi:star-four-points"></ha-icon>Waiting for your go-ahead</div>
      ${open
        ? html`<div class="p-note">Nothing has been changed. Proceed lets the AI Agent do what it describes above, and only that.</div>
            <div class="p-acts"><button class="primary" @click=${() => fire("approve")}>Proceed</button><button @click=${() => fire("dismiss")}>Dismiss</button></div>`
        : html`<div class="p-state"><ha-icon .icon=${p.state === "approved" ? "mdi:check" : "mdi:close"}></ha-icon>${
            p.state === "approved" ? `Approved by ${actorName(p.by ?? "")}` : p.state === "dismissed" ? `Dismissed by ${actorName(p.by ?? "")}` : "Replaced by a newer reply"
          }</div>`}
    </div>`;
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
            <div class="who"><b title=${e.data?.review || e.data?.hints ? "A review by the AI chosen in Settings, based only on what Home Desk sent it. It has not checked your home." : ""}>${e.data?.review || e.data?.hints ? reviewLabel(e.actor) : e.data?.run ? runLabel(e.actor) : actorLabel(e.actor)}</b> · <span class="when">${when}</span>${fresh ? html`<span class="new-tag">New</span>` : nothing}${e.kind === "note" ? html`<span class="label dense">internal note</span>` : nothing}${(e.data as { merged_from?: number } | null)?.merged_from ? html`<span class="label dense" title="Copied here when a ticket was merged">from #${(e.data as { merged_from: number }).merged_from}</span>` : nothing}</div>
            <div class="bubble md ${e.kind === "note" ? "note" : ""}">${unsafeHTML(renderMarkdown(e.body ?? ""))}</div>
            ${this._proposal(e)}${this._proceed(e)}
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
    // The full width view (not offered on a phone, where the ticket already has the whole screen).
    const canWide = !this.narrow;
    const headRow = html`
<div class="head ${this.isAdmin ? "admin" : ""} ${canWide ? "has-wide" : ""}">
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
        @click=${() => this._fire("nav-ticket", -1)}><ha-icon icon="mdi:chevron-left"></ha-icon></button>
      <button class="icon hist next" title=${this.navPos ? `Next ticket (${this.navPos.index + 1} of ${this.navPos.total})` : "Next ticket"} aria-label="Next ticket"
        ?disabled=${!this.navPos || this.navPos.index >= this.navPos.total - 1}
        @click=${() => this._fire("nav-ticket", 1)}><ha-icon icon="mdi:chevron-right"></ha-icon></button>
      <button class="icon hist merge" title="Merge into another ticket" aria-label="Merge into another ticket"
        @click=${(e: Event) => this._fire("pick-merge", { rect: (e.currentTarget as HTMLElement).getBoundingClientRect() })}>
        <ha-icon icon="mdi:call-merge"></ha-icon></button>`
    : nothing}
  <button class="icon hist" aria-pressed=${this._showHistory ? "true" : "false"}
    title=${this._showHistory ? "Hide history" : "Show history"} aria-label="Show history"
    @click=${() => (this._showHistory = !this._showHistory)}><ha-icon icon="mdi:history"></ha-icon></button>
${canWide
  ? html`<button class="icon hist wide-toggle" title=${this.wide ? "Exit full width view" : "Full width view"} aria-label=${this.wide ? "Exit full width view" : "Full width view"}
      @click=${() => this._fire("toggle-wide")}><ha-icon icon=${this.wide ? "mdi:arrow-collapse-horizontal" : "mdi:arrow-expand-horizontal"}></ha-icon></button>`
  : nothing}
</div>`;
    const subBlock = html`
<div class="sub">
  <div class="meta-line">
    <span>Opened ${relativeTime(t.created_at, this.language)} by <ha-icon icon=${metaIcon(t.requester)}></ha-icon> ${actorName(t.requester)}</span>
    ${t.updated_by ? html`<span>Updated ${relativeTime(t.updated_at, this.language)} by <ha-icon icon=${metaIcon(t.updated_by)}></ha-icon> ${actorName(t.updated_by)}</span>` : nothing}
    ${t.assignee && isAgent(t.assignee) ? html`<span title="Assigned to an AI agent you run yourself (your own CLI or desktop app)"><ha-icon icon=${metaIcon(t.assignee)}></ha-icon> Queued for AI Agent</span>` : nothing}
    ${t.labels.includes(BLOCKED) ? html`<span class="blocked" title="Waiting on a person, a part or a fix"><ha-icon icon="mdi:timer-sand"></ha-icon> Blocked</span>` : nothing}
    ${t.comment_count ? html`<span><ha-icon icon="mdi:comment-outline"></ha-icon> ${t.comment_count}</span>` : nothing}
  </div>
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
</div>`;
    const descBlock = html`
${t.description || t.attachments?.length
  ? html`<div class="desc-sticky ${this.wide ? "plain" : this._descCollapsed ? "one" : ""}"
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
        <st-ticket-things class="about" .hass=${this.hass} .client=${this.client} .ticketId=${t.id} .editable=${this.isAdmin}
          .entities=${t.entities} .devices=${t.devices ?? []} .areas=${t.areas ?? []} 
          @change=${(e: CustomEvent<{ entities: string[]; devices: string[]; areas: string[] }>) => this._patch(e.detail)}></st-ticket-things>
      </div>
      <ha-icon class="pin-hint" icon="mdi:chevron-up"></ha-icon>
    </div>`
  : nothing}`;
    const resolutionBlock = html`
${t.resolution
  ? html`<div class="card resolution"><h3>Resolution</h3><div class="md">${unsafeHTML(renderMarkdown(t.resolution))}</div></div>`
  : nothing}`;
    const relatedBlock = html`
${t.related?.length
  ? html`<div class="chips"><span class="sect">Related</span>${t.related.map((r) => html`<span class="chip link" title=${r.title} @click=${() => this._fire("open-ticket", r.id)}>#${r.id} ${r.title.length > 40 ? r.title.slice(0, 40) + "…" : r.title}</span>`)}</div>`
  : nothing}`;
    const timelineBlock = html`
<div class="timeline" aria-live="polite" aria-relevant="additions">
  <h2>${this._showHistory ? "Activity" : "Comments"}</h2>
  ${t.events
    .filter((e) => this._showHistory || e.kind === "comment" || e.kind === "note")
    .map((e) => this._eventTemplate(e))}
  ${t.agent_state ? this._workingComment(t) : nothing}
  ${!this._showHistory && !t.agent_state && !t.events.some((e) => e.kind === "comment" || e.kind === "note")
    ? html`<div class="none">No comments yet</div>`
    : nothing}
</div>`;
    const dock = html`
<div class="dock ${this._composerKeep ? "keep" : ""} ${this._composerMode === "closed" ? "shut" : ""}"
  @mouseenter=${() => this._composerMode === "closed" && (this._composerMode = "auto")}
  @mouseleave=${() => this._composerMode === "closed" && (this._composerMode = "auto")}
  @focusin=${() => this._composerMode === "closed" && (this._composerMode = "auto")}
  @keydown=${(e: KeyboardEvent) => e.key === "Escape" && this._closeComposer()}>
  <div class="dock-in"><div class="card composer">
    <textarea rows="2" placeholder="Add a comment" .value=${this._comment}
      @input=${(e: Event) => (this._comment = (e.target as HTMLTextAreaElement).value)}></textarea>
    <div class="bar-wrap"><div class="bar-clip"><div class="bar">
      ${this.isAdmin ? this._aiAction(t) : nothing}
      <div class="opts">
        ${this.isAdmin
          ? html`${done ? nothing : html`<div class="assign prio-group" role="group" aria-label="Queue and priority">${this._queueChip(t)}${this._priorityPills(t)}</div>`}`
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
    </div></div></div>
  </div></div>
</div>`;
    if (this.wide && canWide) {
      // The header across the top; the details and description on the left; only the comments (and the comment box) on the right.
      return html`
        <div class="top">${headRow}</div>
        <div class="wide-body">
          <aside class="side">${subBlock}<div class="side-wrap">${descBlock}${resolutionBlock}${relatedBlock}</div></aside>
          <section class="main">
            <div class="scroll"><div class="wrap">${timelineBlock}</div></div>
            ${dock}
          </section>
        </div>
      `;
    }
    return html`
      <div class="top">${headRow}${subBlock}</div>
      <div class="scroll" @scroll=${this._onScroll}>
        <div class="wrap">${descBlock}${resolutionBlock}${relatedBlock}${timelineBlock}</div>
      </div>
      ${dock}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "st-ticket-detail": TicketDetail;
  }
}
