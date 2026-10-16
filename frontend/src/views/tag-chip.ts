import { html } from "lit";
import type { Tag } from "../types";
import { tagColorCss } from "../format";

/** A coloured tag chip. Needs sharedStyles in the host for the `.tag` rule. */
export const tagChip = (tag: Tag) =>
  html`<span class="tag" style="--tag-color: ${tagColorCss(tag.color)}">${tag.name}</span>`;
