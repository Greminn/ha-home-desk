import { html, nothing } from "lit";
import type { Label } from "../types";
import { labelColorCss, labelTextColor } from "../format";

/** A coloured label chip. Needs sharedStyles in the host for the `.label` rule. */
export const labelChip = (label: Label) =>
  html`<span class="label dense" title=${label.description} style="--label-color: ${labelColorCss(label.color)}; --label-fg: ${labelTextColor(label.color)}">${label.icon ? html`<ha-icon .icon=${label.icon}></ha-icon>` : nothing}${label.name}</span>`;
