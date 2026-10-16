// Entry point of the dev preview: the real panel code, running against the mock Home Assistant.
import "./icons.js";
import "../src/index.ts";
import { createMock } from "./mock-hass.js";

const PREFIX = "/home-desk";
const mock = createMock();
const panel = document.createElement("home-desk-panel");
panel.hass = mock.hass;
panel.narrow = window.innerWidth < 870;
// The preview reopens the ticket you were looking at (or #7 the first time), so a refresh keeps your place.
// This is a stand-in for what HA does, where the address (/home-desk/7) says which ticket is open.
// Keep the #hooks before restoring the last ticket rewrites the address (which drops the fragment).
const initialHash = location.hash;
const KEY = "preview-ticket";
const openId = () => (location.pathname.match(/\/home-desk\/(\d+)/) ?? [])[1] ?? "none";
const remember = () => { try { localStorage.setItem(KEY, openId()); } catch { /* not remembered */ } };
if (!location.pathname.startsWith(PREFIX)) {
  try {
    const id = localStorage.getItem(KEY) ?? "7";
    if (id !== "none") history.replaceState(null, "", `${PREFIX}/${id}`);
  } catch { /* start on the list */ }
}
const syncRoute = () => {
  panel.route = { prefix: PREFIX, path: location.pathname.startsWith(PREFIX) ? location.pathname.slice(PREFIX.length) : "" };
};
syncRoute();
document.body.appendChild(panel);

// HA's router tells the panel where it is; do the same here.
window.addEventListener("location-changed", () => { syncRoute(); remember(); });
window.addEventListener("popstate", () => { syncRoute(); remember(); });
window.addEventListener("resize", () => { panel.narrow = window.innerWidth < 870; });
// The panel asks HA to open its sidebar on narrow screens.
panel.addEventListener("hass-toggle-menu", () => console.info("[preview] hass-toggle-menu"));

// Commands from the control bar (index.html).
window.addEventListener("message", (e) => {
  const m = e.data ?? {};
  if (m.cmd === "theme") { document.documentElement.dataset.theme = m.value; panel.recheckTheme(); }
  if (m.cmd === "user") { mock.setUser(m.admin); panel.hass = { ...mock.hass }; mock.refresh(); }
  if (m.cmd === "agent") mock.agentUpdate(Number((location.pathname.match(/\/(\d+)$/) ?? [])[1]) || undefined);
  if (m.cmd === "reset") mock.reset();
});
window.parent?.postMessage({ cmd: "ready" }, "*");

// Optional hooks for screenshots and demos: panel.html#filters, #all, #light, #ticket=3 (combine with commas).
setTimeout(() => {
  const root = panel.shadowRoot;
  const hash = initialHash.slice(1).split(",");
  if (hash.includes("light")) { document.documentElement.dataset.theme = "light"; panel.recheckTheme(); }
  if (hash.includes("all")) [...root.querySelectorAll(".tab")].find((b) => b.title === "All")?.click();
  if (hash.includes("filters")) root.querySelector(".filter-btn")?.click();
  const t = hash.find((h) => h.startsWith("ticket="));
  if (t) root.querySelector("st-ticket-list")?.dispatchEvent(new CustomEvent("select-ticket", { detail: Number(t.slice(7)), bubbles: true, composed: true }));
}, 500);
