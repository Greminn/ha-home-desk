---
title: Connect Your AI Agent
---

# Connect Your AI Agent

An agent already connected to Home Assistant can work tickets with no further setup. Home Desk registers `home_desk.*` actions that list, read, create, update, comment on, link and close tickets, and manage labels and categories. Their descriptions say what each is for.

An agent should call **`home_desk.get_guide`** first. It returns the fields, the statuses and how to review, comment on and close a ticket.

Agents should pass their own name as `actor`, so their work is labelled in the ticket's history.

Responses are data. Call the actions with response enabled (`return_response: true`).

## Through an Existing Connection

Use any Home Assistant MCP server or the REST API. The `home_desk.*` actions are listed with the rest.

## Home Desk MCP Server

[`mcp/server.py`](https://github.com/Greminn/ha-home-desk/blob/main/mcp/server.py) is an optional MCP server for Home Desk only. It needs `uv` and a long-lived access token (profile → **Security**).

```json
{
  "mcpServers": {
    "home-desk": {
      "command": "uv",
      "args": ["run", "--script", "/path/to/ha-home-desk/mcp/server.py"],
      "env": {
        "HA_URL": "http://homeassistant.local:8123",
        "HA_TOKEN": "<long-lived token>",
        "HOMEDESK_ACTOR": "claude"
      }
    }
  }
}
```

::: warning
Keep the token out of version control.
:::

The full action list is in the [agent guide](https://github.com/Greminn/ha-home-desk/blob/main/custom_components/home_desk/AGENT_GUIDE.md).
