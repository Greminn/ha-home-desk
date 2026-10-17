import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { safeCustomElement } from "../define";
import "./dropdown";
import { sharedStyles } from "../styles";
import type { HomeAssistant, HomeDeskSettings } from "../types";
import type { HaClient } from "../ha-client";

/** How long a resolved ticket waits before it closes by itself. */
const AUTO_CLOSE = [
  { id: "immediately", label: "Straight away" },
  { id: "1h", label: "After 1 hour" },
  { id: "6h", label: "After 6 hours" },
  { id: "1d", label: "After 1 day" },
  { id: "3d", label: "After 3 days" },
  { id: "7d", label: "After 7 days" },
  { id: "14d", label: "After 14 days" },
  { id: "30d", label: "After 30 days" },
  { id: "never", label: "Never" },
];

/**
 * Home Desk's options, laid out like a Home Assistant settings page: a card per topic, each row a name and a
 * line of help on the left and its control on the right. Changes are saved as soon as they are made.
 * Notifications are each manager's own; everything else is shared.
 */
@safeCustomElement("st-settings")
export class SettingsPage extends LitElement {
  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        background: var(--st-bg);
      }
      .page {
        max-width: 720px;
        margin: 0 auto;
        padding: 24px 16px 48px;
      }
      h2 {
        margin: 24px 0 8px;
        font-size: var(--st-fs-title);
        font-weight: 500;
      }
      h2:first-child {
        margin-top: 0;
      }
      .help {
        margin: 0 0 12px;
        font-size: var(--st-fs-body);
        color: var(--st-fg-secondary);
      }
      .card {
        border: 1px solid var(--st-outline);
        border-radius: var(--ha-border-radius-xl, 12px);
        /* Home Assistant's settings boxes are lighter than the page behind them. */
        background: var(--ha-card-background, var(--st-surface));
        overflow: hidden;
      }
      .srow {
        display: flex;
        align-items: center;
        gap: 16px;
        min-height: 64px;
        padding: 12px 16px;
        border-bottom: 1px solid var(--st-divider);
      }
      .srow:last-child {
        border-bottom: 0;
      }
      .srow .text {
        flex: 1;
        min-width: 0;
      }
      .srow .name {
        font-size: var(--st-fs-body);
      }
      .srow .desc {
        margin-top: 2px;
        font-size: var(--st-fs-small);
        color: var(--st-fg-secondary);
      }
      .srow st-dropdown {
        width: 220px;
        flex: none;
      }
      /* HA's switch: a 36x14 track with a 20px thumb. */
      .switch {
        position: relative;
        flex: none;
        width: 36px;
        height: 14px;
        padding: 0;
        border-radius: 7px;
        background: color-mix(in srgb, var(--st-fg) 38%, transparent);
        transition: background-color 150ms ease-in-out;
      }
      .switch::after {
        content: "";
        position: absolute;
        top: -3px;
        left: -2px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        /* Off: a light grey thumb, as in Home Assistant, so it shows against the track and the box. */
        background: var(--switch-unchecked-button-color, color-mix(in srgb, var(--st-fg) 70%, var(--st-surface)));
        box-shadow: var(--st-shadow-m);
        transition: transform 150ms ease-in-out, background-color 150ms ease-in-out;
      }
      .switch[aria-checked="true"] {
        background: color-mix(in srgb, var(--st-accent) 54%, transparent);
      }
      .switch[aria-checked="true"]::after {
        background: var(--st-accent);
        transform: translateX(22px);
      }
      .check {
        flex: none;
        width: 24px;
        height: 24px;
        accent-color: var(--st-accent);
      }
      .srow.pick {
        cursor: pointer;
      }
      .note {
        padding: 12px 16px;
        font-size: var(--st-fs-small);
        color: var(--st-fg-secondary);
      }
      .test-out {
        padding: 0 16px 12px;
        font-size: var(--st-fs-small);
        color: var(--st-fg-secondary);
        white-space: pre-wrap;
      }
      .test-out.bad {
        color: var(--st-danger);
      }
      .error {
        margin-bottom: 12px;
        padding: 12px 16px;
        border-left: 4px solid var(--st-danger);
        font-size: var(--st-fs-body);
        background: color-mix(in srgb, var(--st-danger) 12%, var(--st-surface));
      }
    `,
  ];

  @property({ attribute: false }) client!: HaClient;
  @property({ attribute: false }) hass!: HomeAssistant;

  @state() private _s: HomeDeskSettings | null = null;
  @state() private _error = "";
  @state() private _test: { busy: boolean; reply?: string; error?: string } | null = null;

  private async _runTest() {
    this._test = { busy: true };
    try {
      this._test = { busy: false, reply: (await this.client.testAgent()).reply };
    } catch (err) {
      const message = err && typeof err === "object" && "message" in err ? String((err as { message: unknown }).message) : String(err);
      this._test = { busy: false, error: message };
    }
  }

  override async connectedCallback() {
    super.connectedCallback();
    this._s = await this.client.settings();
  }

  /** Save a change straight away (and show it straight away). */
  private async _save(patch: Parameters<HaClient["saveSettings"]>[0]) {
    const s = this._s;
    if (!s) return;
    this._s = { ...s, ...patch, notify: { ...s.notify, ...patch.notify } };
    try {
      this._s = await this.client.saveSettings(patch);
      this._error = "";
      this.dispatchEvent(new CustomEvent("settings-changed", { detail: this._s, bubbles: true, composed: true }));
    } catch {
      this._error = "Couldn't save that. These options need the newer Home Desk integration.";
      this._s = s;
    }
  }

  /** "mobile_app_simons_iphone" -> "Simons Iphone (mobile app)". */
  private _targetName(key: string): string {
    if (key === "persistent_notification") return "Home Assistant notifications (the bell)";
    const phone = key.startsWith("mobile_app_");
    const words = key.replace(/^mobile_app_/, "").replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return phone ? `${words} (mobile app)` : words;
  }

  private get _targets(): string[] {
    const keys = Object.keys(this.hass.services?.["notify"] ?? {});
    const mine = this._s?.notify.targets ?? [];
    return [...new Set([...keys, ...mine])].filter((k) => k !== "notify").sort();
  }

  /** The AI agents Home Assistant has: AI Task and conversation entities. */
  private get _agents(): { id: string; label: string }[] {
    return Object.entries(this.hass.states ?? {})
      .filter(([id]) => id.startsWith("ai_task.") || id.startsWith("conversation."))
      .map(([id, st]) => ({ id, label: String(st.attributes["friendly_name"] ?? id) }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }

  /** Speech-to-text engines Home Assistant has (stt entities). */
  private get _engines(): { id: string; label: string }[] {
    return Object.entries(this.hass.states ?? {})
      .filter(([id]) => id.startsWith("stt."))
      .map(([id, st]) => ({ id, label: String(st.attributes["friendly_name"] ?? id) }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }

  private _switch(on: boolean, label: string, onChange: (v: boolean) => void) {
    return html`<button class="switch" role="switch" aria-checked=${on ? "true" : "false"} aria-label=${label}
      @click=${() => onChange(!on)}></button>`;
  }

  private _toggleTarget(key: string) {
    const s = this._s;
    if (!s) return;
    const has = s.notify.targets.includes(key);
    void this._save({ notify: { targets: has ? s.notify.targets.filter((t) => t !== key) : [...s.notify.targets, key] } });
  }

  override render() {
    const s = this._s;
    if (!s) return html`<div class="page"><p class="help">Loading…</p></div>`;
    const agents = [{ id: "", label: "None" }, ...this._agents];
    return html`<div class="page">
      ${this._error ? html`<div class="error">${this._error}</div>` : nothing}

      <h2>Tickets</h2>
      <div class="card">
        <div class="srow">
          <div class="text">
            <div class="name">Close resolved tickets</div>
            <div class="desc">A resolved ticket closes by itself after this long. A new comment on it can reopen it first.</div>
          </div>
          <st-dropdown plain label="Close resolved tickets" .value=${s.auto_close} .options=${AUTO_CLOSE}
            @change=${(e: CustomEvent<string>) => void this._save({ auto_close: e.detail })}></st-dropdown>
        </div>
        <div class="srow">
          <div class="text">
            <div class="name">Tickets from Repairs</div>
            <div class="desc">Raise a ticket for each Home Assistant repair, and resolve it when the repair clears.</div>
          </div>
          ${this._switch(s.repairs, "Tickets from Repairs", (v) => void this._save({ repairs: v }))}
        </div>
      </div>

      <h2>Voice messages</h2>
      <div class="card">
        <div class="srow">
          <div class="text">
            <div class="name">Write out voice messages</div>
            <div class="desc">A voice message sent with a report is turned into text on the ticket, using Home Assistant's speech-to-text. The recording is kept either way.</div>
          </div>
          ${this._switch(s.transcribe, "Write out voice messages", (v) => void this._save({ transcribe: v }))}
        </div>
        <div class="srow">
          <div class="text">
            <div class="name">Speech-to-text</div>
            <div class="desc">Which engine listens. The default is the one your Assist setup uses.</div>
          </div>
          <st-dropdown plain label="Speech-to-text" .value=${s.stt} .options=${[{ id: "", label: "Assist default" }, ...this._engines]}
            @change=${(e: CustomEvent<string>) => void this._save({ stt: e.detail })}></st-dropdown>
        </div>
      </div>

      <h2>AI Agent</h2>
      <div class="card">
        <div class="srow">
          <div class="text">
            <div class="name">AI Agent</div>
            <div class="desc">The agent a ticket is assigned to. Pick one of the AI agents set up in Home Assistant.</div>
          </div>
          <st-dropdown plain label="AI Agent" .value=${s.agent} .options=${agents}
            @change=${(e: CustomEvent<string>) => void this._save({ agent: e.detail })}></st-dropdown>
        </div>
        ${s.agent && !s.agent.startsWith("ai_task.")
          ? html`<div class="note">Home Desk can only hand tickets to an <b>AI Task</b> agent to work on them. A conversation agent can still be named as the assignee.</div>`
          : nothing}
        <div class="srow">
          <div class="text">
            <div class="name">Start work when assigned</div>
            <div class="desc">Assigning a ticket to the AI Agent makes it read the ticket and reply, straight away. It can only read and reply: it never changes anything in your home. Turn this off if you work tickets with an agent outside Home Assistant.</div>
          </div>
          ${this._switch(s.agent_auto, "Start work when assigned", (v) => void this._save({ agent_auto: v }))}
        </div>
        <div class="srow">
          <div class="text">
            <div class="name">Daily limit</div>
            <div class="desc">The most turns it takes in a day. Past that, tickets come straight back to you.</div>
          </div>
          <st-dropdown plain label="Daily limit" .value=${String(s.agent_daily_cap)}
            .options=${[...new Set([10, 30, 100, 300, s.agent_daily_cap])].sort((a, b) => a - b).map((n) => ({ id: String(n), label: `${n} a day` }))}
            @change=${(e: CustomEvent<string>) => void this._save({ agent_daily_cap: Number(e.detail) })}></st-dropdown>
        </div>
        <div class="srow">
          <div class="text">
            <div class="name">Test the agent</div>
            <div class="desc">Sends a harmless question, with nothing from your home, to check it answers.</div>
          </div>
          <button ?disabled=${!s.agent || this._test?.busy} @click=${() => void this._runTest()}>${this._test?.busy ? "Asking…" : "Test"}</button>
        </div>
        ${this._test?.reply ? html`<div class="test-out">${this._test.reply}</div>` : nothing}
        ${this._test?.error ? html`<div class="test-out bad">${this._test.error}</div>` : nothing}
      </div>

      <h2>What the AI Agent is sent</h2>
      <p class="help">The ticket and its comments are always sent. Everything sent goes to your AI provider, with passwords, keys, coordinates and email addresses taken out first.</p>
      <div class="card">
        <div class="srow">
          <div class="text"><div class="name">Entity states</div><div class="desc">The state, attributes and last day of changes of the entities a ticket names.</div></div>
          ${this._switch(s.agent_states, "Entity states", (v) => void this._save({ agent_states: v }))}
        </div>
        <div class="srow">
          <div class="text"><div class="name">Automation and script configuration</div><div class="desc">The configuration of any automation or script a ticket names.</div></div>
          ${this._switch(s.agent_config, "Automation and script configuration", (v) => void this._save({ agent_config: v }))}
        </div>
        <div class="srow">
          <div class="text"><div class="name">Related tickets</div><div class="desc">Linked tickets and ones about the same entities, with how they were resolved.</div></div>
          ${this._switch(s.agent_related, "Related tickets", (v) => void this._save({ agent_related: v }))}
        </div>
      </div>

      <h2>Notifications</h2>
      <p class="help">These are your own settings. Each manager chooses where their notifications go and what they hear about.</p>
      <div class="card">
        <div class="srow">
          <div class="text"><div class="name">Notify me when</div></div>
        </div>
        <div class="srow">
          <div class="text"><div class="name">A new ticket is raised</div><div class="desc">From a household member, an AI agent or a repair.</div></div>
          ${this._switch(s.notify.new_ticket, "New ticket raised", (v) => void this._save({ notify: { new_ticket: v } }))}
        </div>
        <div class="srow">
          <div class="text"><div class="name">Someone else comments</div><div class="desc">Including the AI Agent replying to a ticket.</div></div>
          ${this._switch(s.notify.comment, "Someone else comments", (v) => void this._save({ notify: { comment: v } }))}
        </div>
        <div class="srow">
          <div class="text"><div class="name">A ticket is resolved</div></div>
          ${this._switch(s.notify.resolved, "A ticket is resolved", (v) => void this._save({ notify: { resolved: v } }))}
        </div>
      </div>
      <h2>Send notifications to</h2>
      <div class="card">
        ${this._targets.length
          ? this._targets.map(
              (k) => html`<label class="srow pick">
                <input class="check" type="checkbox" .checked=${s.notify.targets.includes(k)} @change=${() => this._toggleTarget(k)} />
                <div class="text"><div class="name">${this._targetName(k)}</div></div>
              </label>`,
            )
          : html`<div class="note">Home Assistant has no notify services yet. Install the Companion app on a phone to get one.</div>`}
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "st-settings": SettingsPage;
  }
}
