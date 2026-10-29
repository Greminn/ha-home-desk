# The Home Desk AI Dispatcher

Works the tickets a person asked the AI Agent to run (**Run** in the AI Action control), using the Claude CLI on an always-on
machine (your "Network" LXC), as its own limited user. Design and reasons: [`docs/agent-runs.md`](../docs/agent-runs.md).

## Read this first

This is optional, and I built it for myself. What it is, who it is for and the safeguards around it are in the [main README](../README.md#ai-dispatcher-optional). This page is the setup. Read the warning under **Presets** below before you allow the agent to change anything, and expect to adjust things for your own network.

## What it does

Every minute a timer starts `home_desk_dispatcher.py`. It asks Home Assistant, as the agent's own **non-administrator** user, whether
any ticket has a run that is `requested` (a person pressed **Run**) or `approved` (a person pressed **Proceed**). If none, it exits:
**no AI call, no cost**. If there is one it takes it (only one AI Dispatcher can), runs `claude -p`, and posts the answer on the ticket:

1. **Review** (requested): read-only tools only. It posts what it found and what it would change, and waits for **Proceed**.
2. **Change** (approved): told exactly what was approved, with the change tools. It posts what it did and checked.

## Limits that live here, not in Home Assistant

A ticket is text written by other people, and a hacked Home Assistant could forge a request or an approval. So what the agent can
do is fixed in `config.json` on this machine:

- the tools it may use (`READ_TOOLS` and `CHANGE_TOOLS` in the script, plus `extra_tools_review` / `extra_tools_change` you add);
- `allowed_requesters`: only runs asked for or approved by these Home Assistant users are worked (an empty list means any);
- `max_runs_per_day` and `max_runs_per_ticket_per_day`, counted in `state/state.json`;
- `--permission-mode dontAsk` with an exact `--allowedTools` list, `--strict-mcp-config`, `--max-turns` and a time limit. No shell.

Keep the agent's own Home Assistant token, and nothing else, on this machine.

## Set up

1. **A Home Assistant user for the agent**: Settings, People, Users: add "Claude Agent", **not** an administrator. Create a long-lived access
   token for it (its profile page) and save it as `secrets/ha-token` (mode 600).
2. **In Home Desk Settings**, under **AI Dispatcher**: choose that user as the agent's user. (Leave "Offer Run AI Agent Now" off until the
   AI Dispatcher works.)
3. **On the LXC**, as the `claude-agent` user (no sudo, home mode 700), with Claude Code installed and signed in:
   - copy this folder to `~/home-desk-dispatcher/` and `mcp/server.py` from the repository to `~/home-desk-dispatcher/mcp/server.py` (the path `mcp.json` points to);
   - `cp config.example.json config.json` and `cp mcp.example.json mcp.json`, then edit both (the Home Assistant address, who may ask). The token goes only in `secrets/ha-token`: both the AI Dispatcher and the bridge (`HA_TOKEN_FILE`) read it from there, so no secret sits in a config file. Install `uv` for the agent user (`curl -LsSf https://astral.sh/uv/install.sh | sh`) if it is missing: the bridge starts with `uv run --script`;
   - make `project/` an empty folder (the agent's working directory) and copy `dispatcher/project/CLAUDE.md` into it (what the agent is for, its scope, and how it works). It is trusted text that lives on the LXC, not in a ticket; it guides the agent but does not limit it (the tool lists above do).
4. **Check it can run headless**, using as little of your plan as possible:
   `claude -p "Reply with the single word: ok" --model claude-haiku-5-5`
   then a read-only look: `claude -p "List my open Home Desk tickets" --mcp-config mcp.json --strict-mcp-config --allowedTools mcp__home-desk__list_tickets --permission-mode dontAsk`.
5. **Take a Proxmox snapshot** of the LXC, then run one pass by hand with a test ticket: in Home Desk press **Run** on a ticket you raised yourself
   (switch "Offer Run AI Agent Now" on first), then `python3 home_desk_dispatcher.py --config config.json`. Read `state/dispatcher.log`.
6. Install the timer (every 30 seconds; a pass with nothing to do makes no AI call): copy `home-desk-dispatcher.service` and `.timer` to `/etc/systemd/system/` (adjust the paths and user), then
   `systemctl daemon-reload && systemctl enable --now home-desk-dispatcher.timer`. `journalctl -u home-desk-dispatcher.service` shows each pass.

## Letting the agent look at your home (Home Assistant's MCP Server)

A review that only reads ticket text can't check anything. To let it look at your home, add Home Assistant's own **Model Context Protocol Server** integration (Settings, Devices & services, Add integration). It serves the **Assist** API at `/api/mcp/assist`. What that gives, and the limits:

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

## Using the `ha-mcp` add-on instead

If you already run the community `ha-mcp` add-on (Home Assistant MCP Server), the agent can use it. It reaches more than the built-in server (logs, history, traces, configuration) **and has write tools**, behind an administrator-level connection. Its address contains a private path, so keep it out of every config file. It can also serve a read-only version of itself: add `/readonly` to the end of the address and the write tools are not offered there. Give the review that address and only the change step (after Proceed) the normal one:

1. As the agent user, save each address in its own file: `umask 077; cat > ~/home-desk-dispatcher/secrets/ha-mcp-url-readonly` (the address ending in `/readonly`), then the same for `ha-mcp-url`.
2. In `config.json`: `"env_files_review": { "HA_MCP_URL": "secrets/ha-mcp-url-readonly" }, "env_files_change": { "HA_MCP_URL": "secrets/ha-mcp-url" }` (`env_files` is for what both steps need; a step's file wins).
3. In `mcp.json` add `"home-assistant": { "type": "http", "url": "${HA_MCP_URL}" }`.
4. List the read-only tools by name in `extra_tools_review`, taken from `tools/list` at the `/readonly` address. `extra_tools_change` stays empty until you decide a specific change tool is allowed.

Do **not** allow `ha_get_app` in the review: it returns the add-on's options, including the secret path of the normal address. Leave out `ha_eval_template` and the mixed `ha_manage_*` tools too. See the docs page "Looking at Your Home" for the reasons.

## Presets: choosing what the agent may change

> **Warning.** A preset decides what an AI may do to your Home Assistant after you press Proceed. Anything beyond **Advise Only** lets software act
> on your home without you doing the edit yourself. An AI can misread a ticket, and ticket text can be written by anyone who can reach your
> household's Home Assistant, including a guest or a hacked device. Start with Advise Only. Only widen it when you can undo the result (take
> a backup or snapshot first), and never give the agent a tool you would not give to a stranger who can talk you into things.

A preset is a name for two lists: the extra tools the agent may use while **reviewing**, and the extra tools it may use **after Proceed**.
Review is always read-only, so choose review lists that contain only read-only tools. Presets and the choice between them live in
`config.json` on the AI Dispatcher machine, never in Home Assistant, because a hacked Home Assistant could otherwise choose its own preset and approve
its own request. Home Assistant does not know which preset is in use and cannot change it.

```json
"presets": {
  "advise-only": {
    "review": ["mcp__home-assistant__ha_get_state"],
    "change": []
  },
  "fix-config": {
    "review": ["mcp__home-assistant__ha_get_state"],
    "change": ["mcp__home-assistant__ha_config_set_automation"]
  }
},
"preset": "advise-only"
```

- **Advise Only** (use this first): the agent diagnoses and tells you what to change. It can comment on and close the ticket. You make the edit.
- **Fix Config**: also lets it save automation, script or scene configuration. The change is visible in Home Assistant and you can undo it.
- Anything that calls services, reloads integrations or restarts add-ons acts on the live house and is harder to undo. Leave it until you trust the lower steps.

To switch, edit `"preset"` and save. The next pass (within 30 seconds) uses it, and no restart is needed. A name that is not in `"presets"` stops the
AI Dispatcher before anything runs, so a typo can never widen the agent. Every run is recorded in `state/dispatcher.log` with the preset it used. If you set
`"preset"`, it replaces `extra_tools_review` and `extra_tools_change`.

The tool names come from the MCP server itself (its own `tools/list`). Take them from there, not from this page, and read each one before you allow
it. Tools that edit things need a connection that can write. The read-only address from the `ha-mcp` add-on will not offer them, so also check
that a write-capable address is something you want to keep on this machine (in `secrets/`, like the read-only one).

## Watching it live

- `tail -f ~/home-desk-dispatcher/state/live.log` shows what the agent is doing as it happens, in words: what it says, each tool it uses and what came back, and when a run starts and finishes.
- `state/runs/` keeps the whole stream of every run (`<time>-ticket<N>-<mode>.jsonl`) to read afterwards.
- `state/dispatcher.log` has one JSON line per event (below).

## Your own certificate authority

If Home Assistant's https address uses a certificate from your own authority, copy that authority's certificate to `secrets/internal-ca.pem` and set `ca_file` in `config.json` and `HA_CA_FILE` in `mcp.json`. Both the AI Dispatcher and the bridge then trust it (and only it) when they talk to Home Assistant. Check its fingerprint against your own copy before trusting it.

## Checking on it

`state/dispatcher.log` has one JSON line per event (`ran`, `refused`, `claim_failed`, `finish_failed`, `error`), with how long each run took and,
if you set `usage_sensor`, the plan usage before and after, so you learn what a run costs. **Stop** on the ticket stops a run: the AI Dispatcher
finds out when it tries to finish, and the ticket is left as you stopped it.

Tests: `python3 tests/test_dispatcher.py` (a fake Home Assistant and a fake `claude`; no AI).
