---
title: Setup
---

# Setup

Every minute a timer starts `home_desk_dispatcher.py`. It asks Home Assistant, as the agent's own **non-administrator** user, whether
any ticket has a run that is `requested` (a person pressed **Run**) or `approved` (a person pressed **Proceed**). If none, it exits:
**no AI call, no cost**. If there is one it takes it (only one AI Dispatcher can), runs `claude -p`, and posts the answer on the ticket:

1. **Review** (requested): read-only tools only. It posts what it found and what it would change, and waits for **Proceed**.
2. **Change** (approved): told exactly what was approved, with the change tools. It posts what it did and checked.

## Limits That Live on the AI Dispatcher Machine

A ticket is text written by other people, and a hacked Home Assistant could forge a request or an approval. So what the agent can
do is fixed in `config.json` on this machine:

- the tools it may use (`READ_TOOLS` and `CHANGE_TOOLS` in the script, plus `extra_tools_review` / `extra_tools_change` you add);
- `allowed_requesters`: only runs asked for or approved by these Home Assistant users are worked (an empty list means any);
- `max_runs_per_day` and `max_runs_per_ticket_per_day`, counted in `state/state.json`;
- `--permission-mode dontAsk` with an exact `--allowedTools` list, `--strict-mcp-config`, `--max-turns` and a time limit. No shell.

Keep the agent's own Home Assistant token, and nothing else, on this machine.

## Steps

1. **A Home Assistant user for the agent**: Settings, People, Users: add "Claude Agent", **not** an administrator. Create a long-lived access
   token for it (its profile page) and save it as `secrets/ha-token` (mode 600).

2. **In Home Desk Settings**, under **AI Dispatcher**: choose that user as the agent's user. (Leave "Offer Run AI Agent Now" off until the
   AI Dispatcher works.)

3. **Get the files onto the machine.** As the `claude-agent` user (no sudo, home mode 700), with `git` and Claude Code installed and Claude Code signed in:

   ```
   git clone --depth 1 https://github.com/Greminn/ha-home-desk.git ~/ha-home-desk-src
   mkdir -p ~/home-desk-dispatcher/mcp
   cp -r ~/ha-home-desk-src/dispatcher/. ~/home-desk-dispatcher/
   cp ~/ha-home-desk-src/mcp/server.py ~/home-desk-dispatcher/mcp/server.py
   ```

   To update later, run `git pull` in `~/ha-home-desk-src` and copy again. Your `config.json`, `mcp.json`, `secrets/` and `state/` are not in the repository, so copying never overwrites them.

4. **Set it up**, in `~/home-desk-dispatcher/`:

   ```
   cp config.example.json config.json
   cp mcp.example.json mcp.json
   ```

   Edit both (the Home Assistant address, who may ask). The token goes only in `secrets/ha-token`: both the AI Dispatcher and the bridge (`HA_TOKEN_FILE`) read it from there, so no secret sits in a config file. The bridge starts with `uv run --script`, so install `uv` for the agent user if it is missing:

   ```
   curl -LsSf https://astral.sh/uv/install.sh | sh
   ```

   `project/` is the agent's working directory. Keep only `CLAUDE.md` in it (what the agent is for, its scope, and how it works). It is trusted text that lives on the LXC, not in a ticket; it guides the agent but does not limit it (the tool lists above do).

5. **Check it can run headless**, using as little of your plan as possible:

   ```
   claude -p "Reply with the single word: ok" --model claude-haiku-5-5
   ```

   Then a read-only look:

   ```
   claude -p "List my open Home Desk tickets" --mcp-config mcp.json --strict-mcp-config --allowedTools mcp__home-desk__list_tickets --permission-mode dontAsk
   ```

6. **Take a Proxmox snapshot** of the LXC, then run one pass by hand with a test ticket. In Home Desk press **Run** on a ticket you raised yourself (switch "Offer Run AI Agent Now" on first), then:

   ```
   python3 home_desk_dispatcher.py --config config.json
   ```

   Read `state/dispatcher.log`.

7. **Install the timer.** It runs every 30 seconds, and a pass with nothing to do makes no AI call. Copy `home-desk-dispatcher.service` and `home-desk-dispatcher.timer` to `/etc/systemd/system/` (adjust the paths and user), then:

   ```
   systemctl daemon-reload && systemctl enable --now home-desk-dispatcher.timer
   ```

   To see each pass:

   ```
   journalctl -u home-desk-dispatcher.service
   ```
