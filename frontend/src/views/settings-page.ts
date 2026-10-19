import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { safeCustomElement } from "../define";
import "./dropdown";
import "./confirm-dialog";
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
/** The keyboard shortcuts: the keys, what they do, and a line of detail. Keep in step with the key handlers in ticket-detail.ts and top-bar.ts. */
const SHORTCUTS: [string[], string, string][] = [
  [["R"], "Reply", "Opens the comment box and puts the cursor in it. With the cursor outside the box it closes it again."],
  [["Esc"], "Close the box or the search", "In the comment box it closes it and keeps what you typed. In the search box it clears the search."],
  [["F"], "Full width view", "Gives the open ticket the whole page, with the details and history on the left and the comments on the right. Press it again to leave."],
  [["X"], "Close the ticket", "Closes the open ticket and its chip in the top bar, and shows the next open ticket, or the list."],
  [["↑", "↓"], "Choose a search result", "In the search box, moves through the matching tickets."],
  [["Enter"], "Open the search result", "In the search box, opens the highlighted ticket."],
  [["Middle click"], "Close a ticket chip", "On any chip in the top bar."],
];

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
      /* Home Assistant's settings cards: the title is inside the card, rows have no dividers, and the box is lighter than the page. */
      .card {
        margin-bottom: 24px;
        padding: 8px 0;
        border: 1px solid var(--ha-card-border-color, var(--st-outline));
        border-radius: var(--ha-card-border-radius, var(--ha-border-radius-xl, 12px));
        background: var(--ha-card-background, var(--card-background-color, var(--st-surface)));
        overflow: hidden;
      }
      .card h2 {
        margin: 0;
        padding: 16px 16px 8px;
        font-size: var(--ha-font-size-2xl, 24px);
        font-weight: 400;
        line-height: 1.3;
      }
      .card .help {
        margin: 0;
        padding: 0 16px 8px;
        font-size: var(--st-fs-body);
        color: var(--st-fg);
      }
      .card .sub {
        padding: 16px 16px 4px;
        font-size: var(--st-fs-body);
        font-weight: 600;
      }
      .srow {
        display: flex;
        align-items: center;
        gap: 16px;
        min-height: 56px;
        padding: 8px 16px;
      }
      .srow .text {
        flex: 1;
        min-width: 0;
      }
      .srow .name {
        font-size: var(--st-fs-body);
      }
      /* The keyboard shortcuts: each key as a small outlined cap, with what it does beside it. */
      .keys .keycol {
        flex: none;
        display: flex;
        gap: 6px;
        width: 120px;
      }
      kbd {
        min-width: 22px;
        padding: 2px 8px;
        border: 1px solid var(--st-outline);
        border-bottom-width: 2px;
        border-radius: 6px;
        background: color-mix(in srgb, var(--st-fg) 6%, transparent);
        font-family: inherit;
        font-size: var(--st-fs-small);
        text-align: center;
      }
      .srow .desc {
        margin-top: 2px;
        font-size: var(--st-fs-small);
        color: var(--st-fg-secondary);
      }
      .srow st-dropdown {
        width: 240px;
        flex: none;
      }
      /* A text button, as in Home Assistant: accent-coloured words, no box. */
      .srow button.tbtn {
        height: 40px;
        padding: 0 16px;
        border-radius: var(--st-r-pill);
        background: transparent;
        color: var(--st-accent);
        font-weight: 500;
        font-size: var(--st-fs-body);
      }
      /* HA's switch: a 52x32 pill with an outline. Off, a small grey thumb; on, a large accent-coloured thumb on a tinted track. */
      .switch {
        position: relative;
        flex: none;
        box-sizing: border-box;
        width: 52px;
        height: 32px;
        padding: 0;
        border: 2px solid color-mix(in srgb, var(--st-fg) 55%, transparent);
        border-radius: 16px;
        background: color-mix(in srgb, var(--st-fg) 8%, var(--st-surface));
        transition: background-color 150ms ease-in-out, border-color 150ms ease-in-out;
      }
      .switch::after {
        content: "";
        position: absolute;
        top: 6px;
        left: 6px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: var(--switch-unchecked-button-color, color-mix(in srgb, var(--st-fg) 55%, var(--st-surface)));
        transition: all 150ms ease-in-out;
      }
      .switch[aria-checked="true"] {
        border-color: var(--st-accent);
        background: color-mix(in srgb, var(--st-accent) 24%, var(--st-surface));
      }
      .switch[aria-checked="true"]::after {
        top: 2px;
        left: 20px;
        width: 24px;
        height: 24px;
        background: var(--switch-checked-button-color, var(--st-accent));
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
      .prompt-edit {
        padding: 0 16px;
      }
      .prompt-edit textarea {
        width: 100%;
        box-sizing: border-box;
        font-family: var(--ha-font-family-code, ui-monospace, SFMono-Regular, Menlo, monospace);
        font-size: var(--st-fs-small);
        line-height: 1.5;
      }
      .prompt-acts {
        display: flex;
        justify-content: flex-end;
        margin-top: 4px;
      }
      .fixed {
        margin: 8px 16px 8px;
        font-size: var(--st-fs-small);
        color: var(--st-fg-secondary);
      }
      .fixed summary {
        cursor: pointer;
        padding: 6px 0;
      }
      .fixed pre {
        margin: 4px 0 8px;
        white-space: pre-wrap;
        font-family: var(--ha-font-family-code, ui-monospace, SFMono-Regular, Menlo, monospace);
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
  /** The Test button sends a (tiny) request to the AI provider, so it asks first. */
  @state() private _confirmTest = false;
  /** The Home Assistant users the runner could sign in as. */
  @state() private _users: { id: string; name: string }[] = [];

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
    this._users = await this.client.users();
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

      <div class="card">
        <h2>Tickets</h2>
        <div class="srow">
          <div class="text">
            <div class="name">Close resolved tickets</div>
            <div class="desc">A resolved ticket closes by itself after this long. A new comment on it can reopen it first.</div>
          </div>
          <st-dropdown plain field label="Close resolved tickets" .value=${s.auto_close} .options=${AUTO_CLOSE}
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

      <div class="card">
        <h2>Voice messages</h2>
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
          <st-dropdown plain field label="Speech-to-text" .value=${s.stt} .options=${[{ id: "", label: "Assist default" }, ...this._engines]}
            @change=${(e: CustomEvent<string>) => void this._save({ stt: e.detail })}></st-dropdown>
        </div>
      </div>

      <div class="card">
        <h2>AI review</h2>
        <div class="srow">
          <div class="text">
            <div class="name">AI for review</div>
            <div class="desc">Which AI set up in Home Assistant answers <b>Review with AI</b> on a ticket: what it thinks is going on and what to try. It can't change anything. <b>Queue for AI Agent</b> is separate: that only marks the ticket for an AI agent you run yourself (such as your Claude CLI or Gemini Antigravity) and sends nothing anywhere.</div>
          </div>
          <st-dropdown plain field label="AI for review" .value=${s.agent} .options=${agents}
            @change=${(e: CustomEvent<string>) => void this._save({ agent: e.detail })}></st-dropdown>
        </div>
        ${s.agent && !s.agent.startsWith("ai_task.")
          ? html`<div class="note">Review with AI needs an <b>AI Task</b>. A conversation agent can't be used for it.</div>`
          : nothing}
        <div class="srow">
          <div class="text">
            <div class="name">Daily limit</div>
            <div class="desc">The most reviews in a day, so a busy day can't run up your AI plan.</div>
          </div>
          <st-dropdown plain field label="Daily limit" .value=${String(s.agent_daily_cap)}
            .options=${[...new Set([10, 30, 100, 300, s.agent_daily_cap])].sort((a, b) => a - b).map((n) => ({ id: String(n), label: `${n} requests a day` }))}
            @change=${(e: CustomEvent<string>) => void this._save({ agent_daily_cap: Number(e.detail) })}></st-dropdown>
        </div>
        <div class="srow">
          <div class="text">
            <div class="name">Test the AI</div>
            <div class="desc">Sends a harmless question, with nothing from your home, to check it answers.</div>
          </div>
          <button class="tbtn" ?disabled=${!s.agent || this._test?.busy} @click=${() => (this._confirmTest = true)}>${this._test?.busy ? "Asking…" : "Test"}</button>
        </div>
        ${this._test?.reply ? html`<div class="test-out">${this._test.reply}</div>` : nothing}
        ${this._test?.error ? html`<div class="test-out bad">${this._test.error}</div>` : nothing}
      </div>

      <div class="card">
        <h2>What the AI is sent for a review</h2>
        <p class="help">The ticket and its comments are always sent. Everything sent goes to your AI provider, with passwords, keys, coordinates and email addresses taken out first.</p>
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

      <div class="card">
        <h2>Review instructions</h2>
        <p class="help">What Review with AI tells the AI about its job and how to write. ${s.agent_prompt ? "You have changed it from the default." : "This is the default."} Home Desk adds the ticket, its comments and what you allowed above after your text, along with the part shown below, which it needs to read proposed changes and can't be edited.</p>
        <div class="prompt-edit">
          <textarea rows="18" aria-label="Review instructions" spellcheck="false" maxlength="6000"
            .value=${s.agent_prompt || s.agent_prompt_default}
            @change=${(e: Event) => void this._save({ agent_prompt: (e.target as HTMLTextAreaElement).value })}></textarea>
          <div class="prompt-acts">
            <button class="tbtn" ?disabled=${!s.agent_prompt} @click=${() => void this._save({ agent_prompt: "" })}>Reset to default</button>
          </div>
        </div>
        <details class="fixed">
          <summary>Always added after your text</summary>
          <pre>${s.agent_prompt_fixed}</pre>
        </details>
      </div>

      <div class="card">
        <h2>AI Agent runner</h2>
        <p class="help">The AI Agent on your Network LXC works a ticket when you press <b>Run</b>: it reads it first and says what it found and what it would change, and only changes anything after you press <b>Proceed</b>. See <code>docs/agent-runs.md</code> for setting up the runner.</p>
        <div class="srow">
          <div class="text">
            <div class="name">Offer Run AI Agent Now</div>
            <div class="desc">Shows <b>Run</b> in the AI Action control on a ticket. Switch it on once the runner is set up.</div>
          </div>
          ${this._switch(s.agent_runner, "Offer Run AI Agent Now", (v) => void this._save({ agent_runner: v }))}
        </div>
        <div class="srow">
          <div class="text">
            <div class="name">The agent's Home Assistant user</div>
            <div class="desc">The runner signs in as this user. It must not be an administrator: it can read and comment on tickets, create and update them, and claim and finish its runs, and nothing else (no merging, labels, categories or import).</div>
          </div>
          <st-dropdown plain field label="The agent's Home Assistant user" .value=${s.agent_user} .options=${[{ id: "", label: "None" }, ...this._users.map((u) => ({ id: u.id, label: u.name }))]}
            @change=${(e: CustomEvent<string>) => void this._save({ agent_user: e.detail })}></st-dropdown>
        </div>
        ${s.agent_runner && !s.agent_user ? html`<div class="note">Choose the agent's user, or the runner can't sign in with limited rights.</div>` : nothing}
      </div>

      <div class="card">
        <h2>Notifications</h2>
        <p class="help">These are your own settings. Each manager chooses where their notifications go and what they hear about.</p>
        <div class="sub">Notify me when</div>
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
        <div class="sub">Send notifications to</div>
        ${this._targets.length
          ? this._targets.map(
              (k) => html`<label class="srow pick">
                <input class="check" type="checkbox" .checked=${s.notify.targets.includes(k)} @change=${() => this._toggleTarget(k)} />
                <div class="text"><div class="name">${this._targetName(k)}</div></div>
              </label>`,
            )
          : html`<div class="note">Home Assistant has no notify services yet. Install the Companion app on a phone to get one.</div>`}
      </div>
      <div class="card keys">
        <h2>Keyboard Shortcuts</h2>
        <p class="help">They work anywhere in Home Desk except while you are typing in a box.</p>
        ${SHORTCUTS.map(
          ([keys, name, desc]) => html`<div class="srow">
            <div class="keycol">${keys.map((k) => html`<kbd>${k}</kbd>`)}</div>
            <div class="text"><div class="name">${name}</div>${desc ? html`<div class="desc">${desc}</div>` : nothing}</div>
          </div>`,
        )}
      </div>
      ${this._confirmTest
        ? html`<st-confirm-dialog heading="Use your AI plan?" confirmLabel="Yes, test it"
            body="This sends one short question, with nothing from your home, to the AI Agent. It uses a very small amount of your AI plan."
            @cancel=${() => (this._confirmTest = false)}
            @confirm=${() => {
              this._confirmTest = false;
              void this._runTest();
            }}></st-confirm-dialog>`
        : nothing}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "st-settings": SettingsPage;
  }
}
