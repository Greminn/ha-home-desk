---
title: Presets
---

# Presets

::: warning A Preset Decides What an AI May Do
A preset decides what an AI may do to your Home Assistant after you press Proceed. Anything beyond **Advise Only** lets software act on your home without you doing the edit yourself. An AI can misread a ticket, and ticket text can be written by anyone who can reach your household's Home Assistant, including a guest or a hacked device. Start with Advise Only. Only widen it when you can undo the result (take a backup or snapshot first), and never give the agent a tool you would not give to a stranger who can talk you into things.
:::

## What the Agent Always Has

Every run starts with Home Desk's own tools, whatever preset is chosen:

- **While reviewing** (read-only): `get_guide`, `get_ticket`, `list_tickets`, `get_stats`, `list_labels`, `list_categories` and `get_attachment` (to look at a photo).
- **After Proceed**: all of those, plus `add_comment`, `update_ticket` and `close_ticket`.

## What a Preset Is

A preset is a name for two lists of extra tools, taken from other MCP servers such as `ha-mcp`: the tools the agent may use while **reviewing**, and the tools it may use **after Proceed**.
Review is always read-only, so the review list may contain only read-only tools. Presets and the choice between them live in
`config.json` on the AI Dispatcher machine, never in Home Assistant, because a hacked Home Assistant could otherwise choose its own preset and approve
its own request. Home Assistant does not know which preset is in use and cannot change it.

## The Presets

The AI Dispatcher ships with one preset, **Advise Only** (`advise-only`), and both of its lists are empty. With it the agent can use only the Home Desk tools above: it reads the ticket, comments, and can close the ticket. You make any change to Home Assistant yourself. Start here.

```json
"presets": {
  "advise-only": { "review": [], "change": [] }
},
"preset": "advise-only"
```

Every other preset is one you write. For example, a **Fix Config** preset that lets the agent read a state while reviewing and save an automation after you press Proceed:

```json
"presets": {
  "advise-only": { "review": [], "change": [] },
  "fix-config": {
    "review": ["mcp__home-assistant__ha_get_state"],
    "change": ["mcp__home-assistant__ha_config_set_automation"]
  }
},
"preset": "fix-config"
```

The change is visible in Home Assistant and you can undo it. Be slower to allow anything that calls services, reloads integrations or restarts add-ons: it acts on the live house and is harder to undo. Don't write a preset for it until you trust the lower ones.

To switch, edit `"preset"` and save. The next pass (within 30 seconds) uses it, and no restart is needed. A name that is not in `"presets"` stops the
AI Dispatcher before anything runs, so a typo can never widen the agent. Every run is recorded in `state/dispatcher.log` with the preset it used. If you set
`"preset"`, it replaces `extra_tools_review` and `extra_tools_change`.

The tool names come from the MCP server itself (its own `tools/list`). Take them from there, not from this page, and read each one before you allow
it. Tools that edit things need a connection that can write. The read-only address from the `ha-mcp` add-on will not offer them, so also check
that a write-capable address is something you want to keep on this machine (in `secrets/`, like the read-only one).
