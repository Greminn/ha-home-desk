---
title: AI Access
---

# AI Access

The app explains itself to AI agents, so nothing needs adding to a project's own instructions. Any agent connected to your HA (through an HA MCP server, or the REST API) can find the `home_desk.*` services, whose descriptions say what they are for. **`home_desk.get_guide`** returns the full guide ([AGENT_GUIDE.md](https://github.com/Greminn/ha-home-desk/blob/main/custom_components/home_desk/AGENT_GUIDE.md)): fields and statuses, how to review, comment on, update and close tickets, and conventions such as passing `actor` with the agent's own name so its work is attributed to it on the timeline.

Services: `get_guide`, `get_changelog`, `list_tickets`, `get_ticket`, `create_ticket`, `update_ticket`, `add_comment`, `close_ticket`, `link_tickets`, `list_labels`, `create_label`, `update_label`, `delete_label`, `list_categories`, `create_category`, `update_category`, `delete_category`, `get_stats` (and the admin-only `import_file`). Labels and categories can be passed by name or id; a category must exist before a ticket uses it. Agents can create, change and delete unused labels like categories (a label in use is only deleted by a person, in the panel). They return data, so call them with response enabled (for example `ha_call_service` with `return_response: true` in ha-mcp, or `action:` with `response_variable` in an automation). They work from automations too.

**Optional dedicated MCP server** (`mcp/server.py`): typed tools wrapping the same services, for setups without a general HA MCP server. Add to `.mcp.json` (keep the token out of git):

```json
{
  "mcpServers": {
    "home-desk": {
      "command": "uv",
      "args": ["run", "--script", "/path/to/ha-home-desk/mcp/server.py"],
      "env": { "HA_URL": "http://homeassistant.local:8123", "HA_TOKEN": "<long-lived token>", "HOMEDESK_ACTOR": "claude" }
    }
  }
}
```
