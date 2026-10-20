---
title: Connect Your Own AI Agent
---

# Connect Your Own AI Agent

If you run an AI agent (such as Claude) that's already connected to Home Assistant, it can read and work Home Desk tickets with no extra setup. Home Desk explains itself to the agent.

## How it works

Home Desk adds a set of actions to Home Assistant, all starting with `home_desk.` They list, read, create, update, comment on and close tickets. Their descriptions tell the agent what each is for.

The first thing an agent should call is **`home_desk.get_guide`**. It returns a guide to the fields, statuses, and how to review, comment on and close tickets.

::: tip Give the agent its own name
Agents should pass their own name as `actor`, so their work is labelled on the ticket's history. Otherwise it's recorded under whoever's token they use.
:::

## Option 1: through your existing Home Assistant connection

Use any Home Assistant MCP server or the REST API, and let the agent find the `home_desk.*` actions. Responses are returned as data, so call them with **response enabled** (for example `return_response: true`).

## Option 2: the Home Desk MCP server

If you don't have a general Home Assistant MCP server, there's a small one for Home Desk only. It's the file [`mcp/server.py`](https://github.com/Greminn/ha-home-desk/blob/main/mcp/server.py) in the repository.

1. Create a **long-lived access token** in your Home Assistant profile (select your name at the bottom of the sidebar, then **Security**). Keep it private.
2. Add the server to your AI tool's MCP settings, with `uv` installed:

```json
{
  "mcpServers": {
    "home-desk": {
      "command": "uv",
      "args": ["run", "--script", "/path/to/ha-home-desk/mcp/server.py"],
      "env": {
        "HA_URL": "http://homeassistant.local:8123",
        "HA_TOKEN": "<your long-lived token>",
        "HOMEDESK_ACTOR": "claude"
      }
    }
  }
}
```

::: warning Keep the token out of Git
Never put the token in a file you share or commit.
:::

For the full list of actions and fields, see the [agent guide](https://github.com/Greminn/ha-home-desk/blob/main/custom_components/home_desk/AGENT_GUIDE.md).
