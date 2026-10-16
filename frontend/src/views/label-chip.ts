import { html } from "lit";
import type { Label } from "../types";
import { labelColorCss } from "../format";

/** A coloured label chip. Needs sharedStyles in the host for the `.label` rule. */
export const labelChip = (label: Label) =>
  html`<span class="label" style="--label-color: ${labelColorCss(label.color)}">${label.name}</span>`;
