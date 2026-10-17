import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { safeCustomElement } from "../define";
import "./picker-popup";
import { sharedStyles } from "../styles";
import type { HomeAssistant, Suggestion } from "../types";
import type { HaClient } from "../ha-client";
import type { PickerItem } from "./picker-popup";

type Kind = "entity" | "device" | "area";
interface Things {
  entities: string[];
  devices: string[];
  areas: string[];
}
interface Registries {
  areas?: Record<string, { area_id: string; name: string; icon?: string | null }>;
  devices?: Record<string, { id: string; name?: string | null; name_by_user?: string | null; area_id?: string | null }>;
}

/** What a ticket is about: devices, entities and areas as chips. Each opens Home Assistant (the entity's dialog, the device or area page). */
const DOMAIN_ICON: Record<string, string> = {
  light: "mdi:lightbulb", switch: "mdi:toggle-switch", sensor: "mdi:eye", binary_sensor: "mdi:radiobox-marked", climate: "mdi:thermostat",
  lock: "mdi:lock", cover: "mdi:window-shutter", camera: "mdi:video", media_player: "mdi:play-circle", automation: "mdi:robot",
  script: "mdi:script-text", person: "mdi:account", fan: "mdi:fan", vacuum: "mdi:robot-vacuum", device_tracker: "mdi:account",
  alarm_control_panel: "mdi:shield-home", update: "mdi:package-up", input_boolean: "mdi:toggle-switch", scene: "mdi:palette",
};

@safeCustomElement("st-ticket-things")
export class TicketThings extends LitElement {
  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
      }
      .row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
      }
      .sect {
        font-size: var(--st-fs-caption);
        font-weight: 500;
        color: var(--st-fg-secondary);
        margin-right: 2px;
      }
      /* A chip, like the category pill: outlined, with the icon, name and (for an entity) its state. */
      .chip {
        display: inline-flex;
        align-items: center;
        max-width: 100%;
        height: 28px;
        border: 1px solid var(--st-outline);
        border-radius: var(--st-r-pill);
        color: var(--st-fg);
        font-size: var(--st-fs-caption);
        font-weight: 500;
        overflow: hidden;
      }
      .chip .open {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        min-width: 0;
        height: 100%;
        padding: 0 10px 0 8px;
        border-radius: 0;
        background: transparent;
        color: inherit;
        font: inherit;
      }
      .chip .open:hover,
      .chip .open:focus-visible {
        background: var(--st-hover);
      }
      .chip .open ha-icon,
      .chip .open ha-state-icon {
        --mdc-icon-size: 16px;
        flex: none;
        color: var(--st-fg-secondary);
      }
      .chip .name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .chip .detail {
        flex: none;
        font-weight: 400;
        color: var(--st-fg-secondary);
      }
      .chip .detail.bad {
        color: var(--st-warning);
        font-weight: 500;
      }
      .chip.gone .name {
        text-decoration: line-through;
        color: var(--st-fg-secondary);
      }
      .chip .rm {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 100%;
        padding: 0;
        border-radius: 0;
        background: transparent;
        color: var(--st-fg-secondary);
      }
      .chip .rm:hover {
        color: var(--st-fg);
        background: var(--st-hover);
      }
      .chip .rm ha-icon {
        --mdc-icon-size: 14px;
      }
      /* A guess: dashed, and a + to accept it. */
      .chip.guess {
        border-style: dashed;
      }
      .chip.guess .open {
        padding-right: 10px;
      }
      .chip.guess .plus {
        color: var(--st-accent);
      }
      .add {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 28px;
        height: 28px;
        border-radius: 14px;
        border: 1px dashed var(--st-outline);
        color: var(--st-fg-secondary);
        cursor: pointer;
      }
      .add.wide {
        width: auto;
        gap: 4px;
        padding: 0 12px 0 8px;
        font-size: var(--st-fs-caption);
      }
      .add:hover,
      .add:focus-visible {
        color: var(--st-fg);
        border-color: var(--st-field-outline-hover);
      }
      .add ha-icon {
        --mdc-icon-size: 16px;
      }
      .askai {
        height: 28px;
        padding: 0 10px;
        border-radius: var(--st-r-pill);
        background: transparent;
        color: var(--st-accent);
        font-size: var(--st-fs-caption);
        font-weight: 500;
      }
      .askai ha-icon {
        --mdc-icon-size: 16px;
      }
      .err {
        font-size: var(--st-fs-caption);
        color: var(--st-danger);
      }
    `,
  ];

  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) entities: string[] = [];
  @property({ attribute: false }) devices: string[] = [];
  @property({ attribute: false }) areas: string[] = [];
  @property({ type: Boolean }) editable = false;
  /** When set (with `client`), a ticket with nothing named gets guesses to accept, and the AI can be asked. */
  @property({ type: Number }) ticketId: number | null = null;
  @property({ attribute: false }) client?: HaClient;
  /** The AI agent can be asked to choose (it costs, so the panel confirms first). */
  @property({ type: Boolean }) canAsk = false;
  @property() askName = "AI Agent";
  /** Label for the add button when nothing is named yet. */
  @property() addLabel = "Add device, entity or area";

  @state() private _rect: DOMRect | null = null;
  @state() private _guesses: Suggestion[] = [];
  @state() private _error = "";
  @state() private _asking = false;
  private _guessedFor = "";

  private get _reg(): Registries {
    return this.hass as unknown as Registries;
  }

  private get _empty(): boolean {
    return !this.entities.length && !this.devices.length && !this.areas.length;
  }

  override willUpdate(changed: Map<string, unknown>) {
    const key = `${this.ticketId}|${this.entities.length}|${this.devices.length}|${this.areas.length}`;
    if ((changed.has("ticketId") || changed.has("entities") || changed.has("devices") || changed.has("areas")) && key !== this._guessedFor) {
      this._guessedFor = key;
      this._guesses = [];
      this._error = "";
      if (this.ticketId !== null && this.client && this.editable && this._empty) void this._loadGuesses(this.ticketId);
    }
  }

  private async _loadGuesses(id: number) {
    try {
      const found = await this.client!.suggest(id);
      if (id === this.ticketId && this._empty) this._guesses = found;
    } catch {
      // No guesses is fine: the ticket just shows its add button.
    }
  }

  // ---- what each thing is called, and what it looks like

  private _areaName(id: string | null | undefined): string {
    return (id && this._reg.areas?.[id]?.name) || "";
  }

  private _describe(kind: Kind, id: string): { name: string; icon: string; detail: string; bad: boolean; gone: boolean; area: string } {
    if (kind === "area") {
      const a = this._reg.areas?.[id];
      return { name: a?.name ?? id, icon: a?.icon || "mdi:texture-box", detail: "", bad: false, gone: !!this._reg.areas && !a, area: "" };
    }
    if (kind === "device") {
      const d = this._reg.devices?.[id];
      return { name: d?.name_by_user || d?.name || id, icon: "mdi:devices", detail: this._areaName(d?.area_id), bad: false, gone: !!this._reg.devices && !d, area: this._areaName(d?.area_id) };
    }
    const st = this.hass?.states?.[id];
    const name = String(st?.attributes["friendly_name"] ?? id);
    const unit = st?.attributes["unit_of_measurement"];
    const text = st ? `${st.state}${unit ? ` ${String(unit)}` : ""}` : "";
    const icon = String(st?.attributes["icon"] ?? DOMAIN_ICON[id.split(".")[0] ?? ""] ?? "mdi:shape-outline");
    return { name, icon, detail: text, bad: st?.state === "unavailable" || st?.state === "unknown", gone: !st, area: "" };
  }

  private _icon(kind: Kind, id: string, icon: string) {
    if (kind === "entity" && this.hass?.states?.[id] && customElements.get("ha-state-icon")) {
      return html`<ha-state-icon .hass=${this.hass} .stateObj=${this.hass.states[id]}></ha-state-icon>`;
    }
    return html`<ha-icon .icon=${icon}></ha-icon>`;
  }

  // ---- opening things in Home Assistant

  private _open(kind: Kind, id: string) {
    if (kind === "entity") {
      this.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId: id }, bubbles: true, composed: true }));
      return;
    }
    const path = kind === "device" ? `/config/devices/device/${id}` : `/config/areas/area/${id}`;
    try {
      history.pushState(null, "", path);
      window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } }));
    } catch {
      // No router (a preview): nothing to open.
    }
  }

  // ---- changing what is named

  private _current(): Things {
    return { entities: [...this.entities], devices: [...this.devices], areas: [...this.areas] };
  }

  private _changed(next: Things) {
    this.dispatchEvent(new CustomEvent("change", { detail: next, bubbles: true, composed: true }));
  }

  private _add(kind: Kind, id: string) {
    const t = this._current();
    const list = kind === "entity" ? t.entities : kind === "device" ? t.devices : t.areas;
    if (!list.includes(id)) list.push(id);
    this._guesses = this._guesses.filter((g) => !(g.kind === kind && g.id === id));
    this._changed(t);
  }

  private _remove(kind: Kind, id: string) {
    const t = this._current();
    const key = kind === "entity" ? "entities" : kind === "device" ? "devices" : "areas";
    t[key] = t[key].filter((x) => x !== id);
    this._changed(t);
  }

  private get _items(): PickerItem[] {
    const taken = new Set([...this.entities.map((e) => `entity:${e}`), ...this.devices.map((d) => `device:${d}`), ...this.areas.map((a) => `area:${a}`)]);
    const out: PickerItem[] = [];
    for (const a of Object.values(this._reg.areas ?? {})) {
      if (!taken.has(`area:${a.area_id}`)) out.push({ id: `area:${a.area_id}`, primary: a.name, secondary: "Area", icon: a.icon || "mdi:texture-box" });
    }
    for (const d of Object.values(this._reg.devices ?? {})) {
      const name = d.name_by_user || d.name;
      if (name && !taken.has(`device:${d.id}`)) {
        const area = this._areaName(d.area_id);
        out.push({ id: `device:${d.id}`, primary: name, secondary: area ? `Device · ${area}` : "Device", icon: "mdi:devices" });
      }
    }
    for (const [id, st] of Object.entries(this.hass?.states ?? {})) {
      if (taken.has(`entity:${id}`)) continue;
      out.push({ id: `entity:${id}`, primary: String(st.attributes["friendly_name"] ?? id), secondary: id, icon: DOMAIN_ICON[id.split(".")[0] ?? ""] ?? "mdi:shape-outline" });
    }
    return out;
  }

  private _picked(value: string) {
    this._rect = null;
    const [kind, ...rest] = value.split(":");
    this._add(kind as Kind, rest.join(":"));
  }

  private _askAi() {
    if (this.ticketId === null || !this.client) return;
    const id = this.ticketId;
    const name = this.askName;
    this.dispatchEvent(
      new CustomEvent("confirm-cost", {
        bubbles: true,
        composed: true,
        detail: {
          text: `Ask ${name} which devices, entities and areas ticket #${id} is about? The ticket, and the names (not the states) of the things in your home, are sent to ${name} through Home Assistant, which uses your AI plan and may cost money.`,
          run: async () => {
            this._asking = true;
            this._error = "";
            try {
              const found = await this.client!.suggest(id, true);
              if (id === this.ticketId) {
                this._guesses = found;
                if (!found.length) this._error = `${name} didn't find anything that fits.`;
              }
            } catch (err) {
              this._error = err && typeof err === "object" && "message" in err ? String((err as { message: unknown }).message) : String(err);
            } finally {
              this._asking = false;
            }
          },
        },
      }),
    );
  }

  // ---- drawing

  private _chip(kind: Kind, id: string) {
    const d = this._describe(kind, id);
    return html`<span class="chip ${d.gone ? "gone" : ""}">
      <button class="open" title=${kind === "entity" ? `${id}: open in Home Assistant` : `Open this ${kind} in Home Assistant`} @click=${() => this._open(kind, id)}>
        ${this._icon(kind, id, d.icon)}<span class="name">${d.name}</span>
        ${d.gone ? html`<span class="detail">not found</span>` : d.detail ? html`<span class="detail ${d.bad ? "bad" : ""}">${kind === "device" ? d.detail : `· ${d.detail}`}</span>` : nothing}
      </button>
      ${this.editable ? html`<button class="rm" title="Remove" aria-label="Remove ${d.name}" @click=${() => this._remove(kind, id)}><ha-icon icon="mdi:close"></ha-icon></button>` : nothing}
    </span>`;
  }

  private _guess(g: Suggestion) {
    const d = this._describe(g.kind, g.id);
    return html`<span class="chip guess">
      <button class="open" title="Add this to the ticket" @click=${() => this._add(g.kind, g.id)}>
        ${this._icon(g.kind, g.id, d.icon)}<span class="name">${g.name}</span>
        ${g.area && g.kind !== "area" ? html`<span class="detail">${g.area}</span>` : nothing}
        <ha-icon class="plus" icon="mdi:plus"></ha-icon>
      </button>
    </span>`;
  }

  override render() {
    const any = !this._empty;
    if (!any && !this.editable) return nothing;
    return html`<div class="row">
      ${any ? html`<span class="sect">About</span>` : nothing}
      ${this.devices.map((id) => this._chip("device", id))}
      ${this.entities.map((id) => this._chip("entity", id))}
      ${this.areas.map((id) => this._chip("area", id))}
      ${this.editable
        ? html`<button class="add ${any ? "" : "wide"}" title=${this.addLabel} aria-label=${this.addLabel}
            @click=${(e: Event) => (this._rect = (e.currentTarget as HTMLElement).getBoundingClientRect())}>
            <ha-icon icon="mdi:plus"></ha-icon>${any ? nothing : this.addLabel}</button>`
        : nothing}
    </div>
    ${this.editable && this._empty && (this._guesses.length || (this.canAsk && this.ticketId !== null))
      ? html`<div class="row" style="margin-top: 8px">
          ${this._guesses.length ? html`<span class="sect">${this._guesses.some((g) => g.ai) ? `${this.askName} suggests` : "Related?"}</span>` : nothing}
          ${this._guesses.map((g) => this._guess(g))}
          ${this.canAsk && this.ticketId !== null
            ? html`<button class="askai" ?disabled=${this._asking} @click=${this._askAi}><ha-icon icon="mdi:star-four-points"></ha-icon>${this._asking ? "Asking…" : `Ask ${this.askName}`}</button>`
            : nothing}
        </div>`
      : nothing}
    ${this._error ? html`<div class="err">${this._error}</div>` : nothing}
    ${this._rect
      ? html`<st-picker-popup .rect=${this._rect} .items=${this._items} emptyLabel="Nothing matches" .limit=${100}
          @close=${() => (this._rect = null)} @pick=${(e: CustomEvent<{ id: string }>) => this._picked(e.detail.id)}></st-picker-popup>`
      : nothing}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "st-ticket-things": TicketThings;
  }
}
