---
title: Looking at Your Home
---

# Looking at Your Home

A review that only reads ticket text cannot check anything. To let it look at your home, add Home Assistant's own **Model Context Protocol Server** integration (Settings, Devices & services, Add integration). It serves the **Assist** API at `/api/mcp/assist`. What that gives, and the limits:

- The agent can only see and control entities you have **exposed to Assist** (Settings, Voice assistants, Expose). Review that list first: it is exactly what the agent can reach.
- The Assist endpoint works with the agent's **non-administrator** token. Administrator-only APIs are not reachable with it.
- It can **control** exposed entities (turn on and off, set values), not only read them. So the AI Dispatcher decides by tool name: a review may only use the read tool (`GetLiveContext`); control tools go in `extra_tools_change` only, and only after you press Proceed.
- It has no history, logs, traces or configuration, so a review sees current states only.

Add it to `mcp.json` (the token comes from the AI Dispatcher's environment, so nothing secret is in the file) and list the tools:

```json
"home-assistant": {
  "type": "http",
  "url": "https://homeassistant.example/api/mcp/assist",
  "headers": { "Authorization": "Bearer ${HA_TOKEN}" }
}
```

then in `config.json`: `"extra_tools_review": ["mcp__home-assistant__GetLiveContext"]`. Check the real tool names with a `tools/list` call first. The AI Dispatcher gives the agent's process `HA_TOKEN` and, with `ca_file` set, `NODE_EXTRA_CA_CERTS` so it trusts your own certificate authority.

## Using the `ha-mcp` Add-On Instead

If you already run the community [`ha-mcp`](https://github.com/homeassistant-ai/ha-mcp) add-on (Home Assistant MCP Server), the agent can use it. It reaches more than the built-in server (logs, history, traces, configuration) **and has write tools**, behind an administrator-level connection. Its address contains a private path, so keep it out of every config file.

### Read-Only During the Review

`ha-mcp` can serve a read-only version of itself: add `/readonly` to the end of the address. At that address the write tools are not offered, and a write call is refused by the server. The two steps then use different addresses:

- **The review** is given only the `.../readonly` address, so no write tool exists for it.
- **The change**, which starts only after a person presses **Proceed**, is given the normal address, and only the tools you allow for changes.

The `/readonly` address is a setting on the connection, not a separate password: the same server also answers at the normal address. The review never learns that address, because the AI Dispatcher hands each step only its own file.

1. On the AI Dispatcher machine, as the agent user, save both addresses, each in its own file: `umask 077; cat > ~/home-desk-dispatcher/secrets/ha-mcp-url-readonly` (the address ending in `/readonly`), then the same for `ha-mcp-url` (the normal address). Enter the address, press Enter, then Ctrl+D.
2. In `config.json`:
   ```json
   "env_files_review": { "HA_MCP_URL": "secrets/ha-mcp-url-readonly" },
   "env_files_change": { "HA_MCP_URL": "secrets/ha-mcp-url" }
   ```
   Leave `env_files` for anything both steps need. A step's file wins over `env_files`. Leave out `env_files_change` if you do not want the change step to reach the add-on at all.
3. In `mcp.json` add `"home-assistant": { "type": "http", "url": "${HA_MCP_URL}" }`.
4. List the read-only tools by name in `extra_tools_review`, taken from the server's own `tools/list` at the `/readonly` address. `extra_tools_change` stays empty until you decide a specific change tool is allowed.

### Things to Watch

- **Do not allow `ha_get_app` in the review.** It returns the add-on's options, which include the secret path of the normal (writing) address. An agent that reads it can put it in a comment.
- **Be careful with `ha_eval_template`** (it runs any template against live state) and with the mixed tools (`ha_manage_backup`, `ha_manage_updates` and similar), which are only read-safe for some arguments. Leave them out of the review list.
- **Treat the normal address like an administrator password.** The add-on runs with a broad Home Assistant token, so the writing address can change almost anything. It is also plain HTTP with the secret in the path, so keep it on your own network.
- **Check the tool list yourself.** Names and behaviour change between `ha-mcp` versions, so read `tools/list` at the `/readonly` address before you trust a list, and again after an update.
