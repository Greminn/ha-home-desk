# Proposal: tickets that point at devices and entities

*2026-10-17. Decided: devices, entities and areas; suggest rather than attach; AI choosing on request, after a confirmation. Built (steps 1 to 3): the tags and chips, the guesses and the agent context. Not built: Home Assistant's own target picker (a picker styled like it is used, since that one can't be loaded reliably from a panel), following entity renames, and "Show tickets about this". It comes from ticket #234 ("The front deck lights didn't turn on"): the built-in AI agent answered with generic questions because the ticket named nothing in the home, so it had no states, history or automations to look at.*

## The problem

A ticket should say **what it is about**. Today a ticket has an `entities` list (entity ids). It can only be filled in by a service call or an AI agent, it is shown as plain text, nothing can be clicked, and there is no way to name a **device**. Tickets from the report form never have any, because a household member doesn't know what a "light.front_deck" is, and shouldn't have to.

Two jobs follow:

1. **Let a person or an automation say what a ticket is about**, and make each one a link into Home Assistant.
2. **Work out what an unlabelled ticket is probably about**, so the AI agent (and the admin) still have something to go on.

## 1. Tagging devices and entities

### What can be tagged

| Thing | Stored as | Why |
|---|---|---|
| Entity | entity id (exists today) | The thing that has a state, history and automations |
| Device | device id (new `devices` list) | "The Zigbee hallway sensor": all of its entities at once, plus its make, model and area |
| Area (later, maybe) | area id | "Something in the kitchen" |

A device on a ticket stands for all of its entities when the AI agent is given context.

### Where you can add them

- **New Ticket dialog** (manual): a "Devices and entities" field with a search picker. Type "deck" and see matches by name, entity id, device, area or voice-assistant alias, each with its icon and current state. Pick several.
- **On the ticket:** the chips row gains a **+** (admins) and each chip a remove button, like labels.
- **From Home Assistant:** Repairs tickets attach the entity or device when the issue names one; the device-watcher proposal (offline devices, low batteries) attaches the device by design; a `report_issue` service takes `entities` and `devices`.
- **AI agents:** `create_ticket` and `update_ticket` accept `entities` and `devices` (a service and MCP change), and the guide tells agents to attach what they investigate.

Reuse Home Assistant's own target picker if it can be loaded from a panel (it would look exactly native); otherwise the picker popup that already does categories, fed from the entity, device and area registries the panel already receives.

### What a chip shows, and what clicking does

- **Entity chip:** its icon (from its state, so a light shows as lit or not), its friendly name, and its **live state** ("on", "21 °C", "unavailable" in the warning colour). Clicking opens Home Assistant's **more-info dialog** for it: history graph, controls, settings. That dialog is Home Assistant's, so the panel just asks for it with the standard `hass-more-info` event.
- **Device chip:** a device icon, the device name, and its area underneath. Clicking goes to the device's page in Settings (`/config/devices/device/<id>`).
- A small menu on each chip (or a long press): **Open entity**, **Open device** (an entity's device), **Show tickets about this** (filters the list), **Remove**.
- A missing entity (renamed or deleted) shows struck through as "not found" instead of vanishing.
- Hover or focus on a chip shows the entity id.

### Staying correct

- **Renames:** when an entity is renamed in Home Assistant, Home Desk listens for the registry update and rewrites the tickets that name it, so links don't rot.
- **Merging** tickets already combines their entities; devices combine the same way.
- **Search** covers names as well as ids; the ticket list can filter to a device or entity.
- **Household users** don't see any of this: their tickets show the report and its photos only.

## 2. Guessing what an unlabelled ticket is about

For tickets that arrive without any (report form, imports), Home Desk **suggests** entities and devices instead of attaching them silently:

1. **Index** the home's names: entity friendly names, device names, areas, and voice-assistant aliases. Entities **exposed to Assist** are the best starting set, because someone already chose them as the meaningful ones.
2. **Score** each against the ticket's title and description (and a voice message's transcript): shared words, the area ("deck"), synonyms for common cases ("lights" matches `light.*`, "door" matches door sensors and locks).
3. **Show the best few** on the ticket as dashed "Related?" chips with a one-click **+**. The admin accepts or ignores them.
4. **Use them for the AI agent**, marked "possible, not confirmed", so its reply to a ticket like #234 can look at the deck lights, the door sensor and the automations that connect them.
5. **Optionally ask the AI to choose.** Give the model the top 30 or so scored candidates (names only) and ask which are relevant, so a title that uses different words from the entity names ("the porch" for `light.front_deck`) still works. This goes to the AI provider, so it follows the "entity states" setting.

A photo could help too (a picture of the deck at night), by sending it to the model with the ticket. That is a separate step.

## Decisions to make

1. **Devices as well as entities, and areas later?** I recommend devices and entities now.
2. **Suggest or attach?** I recommend suggest for the admin, and use unconfirmed guesses in the agent's context, clearly marked.
3. **Use Home Assistant's own target picker if it works from a panel,** else the picker popup. I'd try the HA one first.
4. **AI-assisted picking (step 5):** worth the extra call, or keep it to scoring?

## Build order

| Step | What | Effort |
|---|---|---|
| 1 | A `devices` list on tickets (storage, services, MCP, websocket); chips with icon, name and live state; click to open more-info or the device page; add and remove on the ticket and in the New Ticket dialog | Medium |
| 2 | The AI agent's context expands devices into their entities; the agent guide and service descriptions updated | Small |
| 3 | The name index and scoring; "Related?" suggestions on the ticket; unconfirmed guesses in the agent's context | Medium |
| 4 | Follow entity renames; "Show tickets about this"; Repairs and `report_issue` attach entities and devices | Small to medium |
| 5 | AI-assisted choosing, and sending the photo | Medium |

Steps 1 to 3 would have made the answer on #234 specific.
