import type {
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
        notify: { targets: [], new_ticket: true, comment: true, resolved: false },
      };
    }
  }

  saveSettings(patch: Partial<Omit<HomeDeskSettings, "notify">> & { notify?: Partial<HomeDeskSettings["notify"]> }): Promise<HomeDeskSettings> {
    return this.send("settings_save", patch);
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

  /** Fires whenever any ticket changes (panel, AI agent, automation). */
  subscribe(cb: () => void): Promise<() => void> {
    return this.hass.connection.subscribeEvents(cb, "home_desk_event");
  }
}
