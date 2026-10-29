---
title: Troubleshooting
---

# Troubleshooting

- `tail -f ~/home-desk-dispatcher/state/live.log` shows what the agent is doing as it happens, in words: what it says, each tool it uses and what came back, and when a run starts and finishes.
- `state/runs/` keeps the whole stream of every run (`<time>-ticket<N>-<mode>.jsonl`) to read afterwards.
- `state/dispatcher.log` has one JSON line per event (below).

## Your Own Certificate Authority

If Home Assistant's https address uses a certificate from your own authority, copy that authority's certificate to `secrets/internal-ca.pem` and set `ca_file` in `config.json` and `HA_CA_FILE` in `mcp.json`. Both the AI Dispatcher and the bridge then trust it (and only it) when they talk to Home Assistant. Check its fingerprint against your own copy before trusting it.

## Checking on It

`state/dispatcher.log` has one JSON line per event (`ran`, `refused`, `claim_failed`, `finish_failed`, `error`), with how long each run took and,
if you set `usage_sensor`, the plan usage before and after, so you learn what a run costs. **Stop** on the ticket stops a run: the AI Dispatcher
finds out when it tries to finish, and the ticket is left as you stopped it.

Tests: `python3 tests/test_dispatcher.py` (a fake Home Assistant and a fake `claude`; no AI).
