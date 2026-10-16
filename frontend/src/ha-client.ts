import type {
  HomeAssistant,
  Tag,
  TagColor,
  Ticket,
  TicketPatch,
  TicketSummary,
  TicketType,
  Priority,
} from "./types";

export interface NewTicket {
  title: string;
  description: string;
  ticket_type: TicketType;
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

  async tags(): Promise<Tag[]> {
    return (await this.send<{ tags: Tag[] }>("tags")).tags;
  }

  createTag(name: string, color?: TagColor): Promise<Tag> {
    return this.send("tag_create", { name, ...(color ? { color } : {}) });
  }

  updateTag(
    tagId: string,
    patch: { name?: string; color?: TagColor },
  ): Promise<Tag> {
    return this.send("tag_update", { tag_id: tagId, ...patch });
  }

  deleteTag(tagId: string): Promise<{ removed_from: number }> {
    return this.send("tag_delete", { tag_id: tagId });
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
