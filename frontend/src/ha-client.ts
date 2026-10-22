import type {
  Suggestion,
  HomeAssistant,
  Category,
  HomeDeskSettings,
  Label,
  LabelColor,
  Ticket,
  TicketPatch,
  TicketSummary,
  Priority,
} from "./types";

export interface NewTicket {
  title: string;
  description: string;
  /** Label ids; a household user may only pick Bug, Enhancement or Question. */
  labels: string[];
  priority: Priority;
  /** A category id (admins only; household users' tickets start uncategorised). */
  category?: string;
  /** What it is about (admins): entity ids, device ids and area ids. */
  entities?: string[];
  devices?: string[];
  areas?: string[];
}

/** Thin wrapper over the home_desk/* WebSocket commands. */
export class HaClient {
  constructor(private hass: HomeAssistant) {}

  private send<T>(type: string, extra: Record<string, unknown> = {}) {
    return this.hass.connection.sendMessagePromise<T>({
      type: `home_desk/${type}`,
      ...extra,
    });
  }

  async list(q?: string): Promise<TicketSummary[]> {
    const res = await this.send<{ tickets: TicketSummary[] }>("list", {
      status: "all",
      ...(q ? { q } : {}),
    });
    return res.tickets;
  }

  /** Categories, or none if the backend predates them (so an older install still loads). */
  async categories(): Promise<Category[]> {
    try {
      return (await this.send<{ categories: Category[] }>("categories")).categories;
    } catch {
      return [];
    }
  }

  createCategory(fields: { name: string; icon?: string }): Promise<Category> {
    return this.send("category_create", fields);
  }

  updateCategory(categoryId: string, patch: { name?: string; icon?: string }): Promise<Category> {
    return this.send("category_update", { category_id: categoryId, ...patch });
  }

  deleteCategory(categoryId: string): Promise<{ removed_from: number }> {
    return this.send("category_delete", { category_id: categoryId });
  }

  /** Home Desk's options, or the defaults if the backend predates them. */
  async settings(): Promise<HomeDeskSettings> {
    try {
      return await this.send<HomeDeskSettings>("settings");
    } catch {
      return {
        auto_close: "7d",
        agent: "",
        repairs: true,
        stt: "",
        transcribe: true,
        agent_states: true,
        agent_config: true,
        agent_related: true,
        agent_daily_cap: 30,
        agent_runner: false,
        agent_user: "",
        agent_prompt: "",
        agent_prompt_default: "",
        agent_prompt_fixed: "",
        notify: { targets: [], new_ticket: true, comment: true, resolved: false },
      };
    }
  }

  saveSettings(patch: Partial<Omit<HomeDeskSettings, "notify">> & { notify?: Partial<HomeDeskSettings["notify"]> }): Promise<HomeDeskSettings> {
    return this.send("settings_save", patch);
  }

  /** The Home Assistant users that can be the AI Agent's own user (not administrators). */
  async users(): Promise<{ id: string; name: string }[]> {
    try {
      return (await this.send<{ users: { id: string; name: string; is_admin: boolean }[] }>("users")).users.filter((u) => !u.is_admin);
    } catch {
      return [];
    }
  }

  async labels(): Promise<Label[]> {
    return (await this.send<{ labels: Label[] }>("labels")).labels;
  }

  createLabel(fields: { name: string; color?: LabelColor; icon?: string; description?: string }): Promise<Label> {
    return this.send("label_create", fields);
  }

  updateLabel(
    labelId: string,
    patch: { name?: string; color?: LabelColor; icon?: string; description?: string },
  ): Promise<Label> {
    return this.send("label_update", { label_id: labelId, ...patch });
  }

  deleteLabel(labelId: string): Promise<{ removed_from: number }> {
    return this.send("label_delete", { label_id: labelId });
  }

  get(ticketId: number): Promise<Ticket> {
    return this.send("get", { ticket_id: ticketId });
  }

  create(ticket: NewTicket): Promise<Ticket> {
    return this.send("create", { ...ticket });
  }

  update(ticketId: number, patch: TicketPatch): Promise<Ticket> {
    return this.send("update", { ticket_id: ticketId, ...patch });
  }

  /** Hand a ticket to the built-in AI agent and have it work on it now. This uses the AI plan. */
  runAgent(ticketId: number): Promise<Ticket> {
    return this.send("agent_run", { ticket_id: ticketId });
  }

  /** Run AI Agent Now: the runner works the ticket read-only, then says what it would change and waits for Proceed. */
  runAgentNow(ticketId: number): Promise<Ticket> {
    return this.send("agent_run_now", { ticket_id: ticketId });
  }

  /** Approve (Proceed) or dismiss what the AI Agent said it would do. Only an administrator's press counts. */
  proceed(ticketId: number, eventId: number, action: "approve" | "dismiss"): Promise<Ticket> {
    return this.send("proceed", { ticket_id: ticketId, event_id: eventId, do: action });
  }

  /** Devices, entities and areas a ticket is probably about, guessed from the words in it. */
  async suggest(ticketId: number): Promise<Suggestion[]> {
    return (await this.send<{ suggestions: Suggestion[] }>("suggest", { ticket_id: ticketId })).suggestions;
  }

  /** Apply or dismiss the changes the AI agent proposed in a comment. */
  proposal(ticketId: number, eventId: number, action: "apply" | "dismiss"): Promise<Ticket> {
    return this.send("proposal", { ticket_id: ticketId, event_id: eventId, do: action });
  }

  /** Stop the AI agent working on a ticket; the ticket comes back to you. */
  stopAgent(ticketId: number): Promise<{ stopped: number }> {
    return this.send("agent_stop", { ticket_id: ticketId });
  }

  /** Ask the chosen AI agent a harmless question, to show it answers. */
  testAgent(): Promise<{ reply: string }> {
    return this.send("agent_test");
  }

  /** Mark tickets as read for you; with no ids, mark everything. */
  markRead(ticketIds?: number[]): Promise<{ marked: number }> {
    return this.send("mark_read", ticketIds ? { ticket_ids: ticketIds } : {});
  }

  /** Fold other tickets into `ticketId`: their conversation moves over and they are closed as merged. */
  merge(ticketId: number, mergeIds: number[]): Promise<Ticket> {
    return this.send("merge", { ticket_id: ticketId, merge_ids: mergeIds });
  }

  /** Remove a ticket and its attachments for good (not resolved: it leaves the history). Administrators only; there is no service for it. */
  deleteTicket(ticketId: number): Promise<{ deleted: number }> {
    return this.send("delete", { ticket_id: ticketId });
  }

  comment(ticketId: number, body: string, internal: boolean): Promise<Ticket> {
    return this.send("comment", { ticket_id: ticketId, body, internal });
  }

  close(
    ticketId: number,
    resolution: string,
    status: "resolved" | "closed",
  ): Promise<Ticket> {
    return this.send("close", { ticket_id: ticketId, resolution, status });
  }

  /** Sends a household report (message, photos, a voice message) as one upload. Returns what the thank-you needs. */
  async report(form: FormData): Promise<{ id: number; photos: number; voice: boolean }> {
    if (!this.hass.fetchWithAuth) throw new Error("This page can't send files");
    const res = await this.hass.fetchWithAuth("/api/home_desk/report", { method: "POST", body: form });
    const body = (await res.json().catch(() => ({}))) as { message?: string };
    if (!res.ok) throw new Error(body.message || `The report couldn't be sent (${res.status})`);
    return body as { id: number; photos: number; voice: boolean };
  }

  /** A link to an attachment the browser can load directly (images, audio), good for a while. */
  async attachmentUrl(ticketId: number, attachmentId: string): Promise<string> {
    const path = `/api/home_desk/attachment/${ticketId}/${attachmentId}`;
    if (!this.hass.callWS) return path;
    const { path: signed } = await this.hass.callWS<{ path: string }>({ type: "auth/sign_path", path, expires: 3600 });
    return signed;
  }

  /** Fires whenever any ticket changes (panel, AI agent, automation). */
  subscribe(cb: () => void): Promise<() => void> {
    return this.hass.connection.subscribeEvents(cb, "home_desk_event");
  }
}
