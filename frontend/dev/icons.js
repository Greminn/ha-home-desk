// A stand-in for Home Assistant's <ha-icon>: draws the real Material Design Icons, so icons in the preview
// look like they do in HA. "mdi:bug-outline" -> mdiBugOutline from @mdi/js.
import * as mdi from "@mdi/js";

const pathFor = (name) => {
  const key = "mdi" + String(name).replace(/^mdi:/, "").replace(/(^|-)([a-z0-9])/g, (_, __, c) => c.toUpperCase());
  return mdi[key] ?? null;
};

class HaIconStub extends HTMLElement {
  #icon = "";
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = `
      <style>
        :host { display: inline-flex; flex: none; align-items: center; justify-content: center;
          width: var(--mdc-icon-size, 24px); height: var(--mdc-icon-size, 24px); vertical-align: middle; }
        svg { width: 100%; height: 100%; fill: currentColor; }
      </style>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d=""></path></svg>`;
  }
  set icon(v) { this.#icon = v ?? ""; this.#draw(); }
  get icon() { return this.#icon; }
  static get observedAttributes() { return ["icon"]; }
  attributeChangedCallback(_n, _o, v) { this.icon = v; }
  #draw() {
    const d = pathFor(this.#icon);
    this.shadowRoot.querySelector("path").setAttribute("d", d ?? "");
    if (!d && this.#icon) console.warn("[preview] unknown icon", this.#icon);
  }
}
if (!customElements.get("ha-icon")) customElements.define("ha-icon", HaIconStub);
