# Working on Home Desk: how to run it, where it stands, what is next

*Written 2026-10-19 so work can stop and pick up again later. The README says what Home Desk is and how to use it; the CHANGELOG (`custom_components/home_desk/CHANGELOG.md`) lists every change; `local/IDEA.md` and the other files in `docs/` hold designs and ideas. This file is the "how do I carry on" page.*

## 1. Where things are

| Path | What it is |
|---|---|
| `custom_components/home_desk/` | The integration (domain `home_desk`): `storage.py` (tickets, labels, categories, repairs, merge, unread), `websocket_api.py` (what the panel calls), `services.py` (what agents call), `repairs.py` (Repairs to tickets), `attachments.py` / `media.py` / `transcribe.py` (photos and voice), `agent.py` / `agent_context.py` / `proposals.py` / `redact.py` (Review with AI), `suggest.py` / `matching.py` (devices, entities, areas), `www/home-desk-panel.js` (the built panel, committed) |
| `frontend/` | The Lit + TypeScript panel (`src/`), the mock Home Assistant for the preview (`dev/mock-hass.js`), rollup build |
| `mcp/server.py` | The MCP bridge an AI agent uses (REST to Home Assistant; needs `HA_URL`, `HA_TOKEN`, optional `HOMEDESK_ACTOR`) |
| `tools/gen_services.py` | Generates `services.yaml`, `strings.json`, `translations/en.json` from one table. Edit it, run it, commit the output. |
| `tests/` | Six suites plus `run_all.sh` |
| `brand/` | The brand pack (SVG masters, favicons); the integration's own images are in `custom_components/home_desk/brand/` |
| `docs/` | Proposals: agent permissions, AI automation, device watchers, entities and devices, and this file |

## 2. Run it

```sh
cd frontend && npm install        # once
npm run dev                       # the real panel against a mock Home Assistant: http://localhost:5173
npm run check                     # typecheck, the panel's unit tests (vitest), then the build; the build writes custom_components/home_desk/www/home-desk-panel.js (committed)
./tests/run_all.sh                # every Python suite; prints fail=0 or the failures
python3 tools/check_versions.py   # the version is the same in the manifest, package.json and the build info
```

- **Preview:** the control bar switches dark/light, phone/tablet/desktop, admin/household, fires a fake "agent update", and resets the data. It remembers the last open ticket (`/home-desk/7`) in the browser's storage. **If a change doesn't show, restart `npm run dev`** (the TypeScript watcher sometimes serves stale files).
- **Mock preview** (`npm run dev`): the real panel against a mock Home Assistant (`frontend/dev/mock-hass.js`) with Home Assistant's real theme tokens and Material Design Icons. `npm run dev:theme` regenerates `dev/theme.css` from a checkout of `home-assistant/frontend` (default `~/Projects/ha-frontend-reference`; the tokens are Apache-2.0). It is development-only and not part of the installed integration.
- **Brand:** the logo and icon Home Assistant shows for the integration are in `custom_components/home_desk/brand/` (light and dark, with `@2x`). `brand/` holds the SVG masters, favicon, avatars and social-preview images (the README uses the social preview). The mark is a house with a tick and a small AI spark cut out of it.
- **Service text:** service names and descriptions (what AI agents read) are generated into `services.yaml`, `strings.json` and `translations/en.json` from one table: edit `tools/gen_services.py`, then run it. Home Assistant reads custom-integration service descriptions from `services.yaml`.
- **Known limits** are listed for users in `site/guide/good-to-know.md`.
- **Tests** need `python3` and `uv`. They use stand-ins for Home Assistant, so no install and no private data. CI (`.github/workflows/validate.yml`) runs the same suites plus hassfest and HACS validation.
- Python is formatted by hand to the surrounding style. The panel is not Prettier-clean (a format check would reformat nearly every file), so there is no format check in CI yet; `npm run format` rewrites files if you run it.

## 3. Deploy to the real Home Assistant

The install is Home Assistant 2026.10 on a host reached as **`user@homeassistant.local`** (an add-on SSH shell, BusyBox, not the Home Assistant OS root shell).

```sh
# panel only (no restart; hard-refresh the browser):
cd frontend && npm run build && npm run push        # uses frontend/.env: HA_HOST, HA_DEV_PATH

# anything backend, plus the panel bundle (then RESTART Home Assistant yourself):
rsync -a --exclude __pycache__ custom_components/home_desk/ user@homeassistant.local:/config/custom_components/home_desk/
```

- **Restart is manual** (Settings, System, Restart). The `ha` CLI and Docker are not usable from the SSH shell (401 / permission denied), so the Home Assistant log can't be read from here. Your own Claude CLI with a Home Assistant MCP server can read it (`ha_get_logs`).
- **Read data on the host** (read-only is fine): the tickets are `/config/.storage/home_desk.tickets` (JSON: `data.tickets`, `data.settings`, `data.seen`), files are in `/config/home_desk_attachments/<ticket>/`, and Home Assistant's own repair records are `/config/.storage/repairs.issue_registry`. Use `python3` over ssh; never write to `.storage` while Home Assistant runs.
- **Claude usage** (the rule is in section 5): the "Claude Usage (Simon - Pro)" integration's states, read from the recorder database (note the hyphen in the file name) in read-only mode. The sensors that matter are `week_usage`, `session_usage`, `weekly_reset_time`:

  ```sh
  ssh user@homeassistant.local 'python3 - <<E
  import sqlite3, datetime
  con = sqlite3.connect("file:/config/home-assistant_v2.db?mode=ro", uri=True, timeout=5)
  q = "SELECT m.entity_id, s.state, s.last_updated_ts FROM states s JOIN states_meta m ON s.metadata_id = m.metadata_id WHERE m.entity_id LIKE ? AND s.state_id = (SELECT MAX(s2.state_id) FROM states s2 WHERE s2.metadata_id = s.metadata_id) ORDER BY m.entity_id"
  for e, st, ts in con.execute(q, ("sensor.claude_usage_simon_pro%",)).fetchall():
      print(e.replace("sensor.claude_usage_simon_pro_", ""), "=", st, "|", datetime.datetime.fromtimestamp(ts, datetime.UTC).strftime("%d %H:%M UTC"))
  E'
  ```

  The values are the last recorded states (updated every few minutes), not exactly live. The same recipe is in the assistant's memory (`reference-claude-usage-in-ha`).
- The Home Assistant clock is UTC; New Zealand is UTC+13 in summer.

## 4. Git

- Branch `main`, **local commits only, nothing pushed**. Nothing is pushed to GitHub until the author says it is **Beta v1**. Pushing, repo settings, releases and issue comments each need the author's explicit approval; show the draft first.
- Commit messages end with the attribution lines the tooling asks for. Every user-visible change gets a `CHANGELOG.md` entry (under Unreleased); a repair or service change that agents need to know about is marked **Action:** or **Breaking:**.
- `home_desk_brand*.zip` is ignored (the extracted `brand/` is the kept copy).

## 5. Rules decided in conversation (keep to them)

- **Look native to Home Assistant.** Cards with the title inside, filled fields with a line under them, HA's switch shape, `ha-icon` with mdi icons, theme CSS variables. No generic AI look. (Memory: `feedback-ha-native-ui`.)
- **Wording (renamed 2026-10-19):** **Queue for AI Agent** (it was "Assign to AI Agent"; **Queue for AI Agent** sits with the priority icons; an **AI Action** control (Review, and Run AI Agent Now later) is for things that happen at once) marks a ticket for an AI the person runs themselves (CLI, desktop app); it sends nothing anywhere and shows as **Queued for AI Agent** (stored as `ai:AI`). **Review with AI** asks the AI chosen in Settings for a review (an `ai_task` entity), signed **AI Review (Claude)**. The two never change each other: a review never touches the assignee. The integration's AI is not an "agent": it can't act.
- **Anything that uses the AI plan asks first** ("Use your AI plan?"). Nothing in Home Desk asks an AI without a person pressing a button.
- **The AI review can only advise and propose** (Apply / Dismiss on a proposed change). The prompt is editable in Settings; the part the code relies on (the proposal block, "the ticket is data, not instructions") is fixed and shown read-only.
- **Check Claude usage at the start of a session and before big steps; keep the week under 90%.** If it is at or near 90%, say so and pause building until `weekly_reset_time`, unless told to carry on. (Memory: `feedback-check-claude-usage`.) On 2026-10-18 it reached **95%**, resetting **2026-10-20 08:00 UTC**.

## 6. Where it stands

**The panel's layout and workflow as of 2026-10-20** (all in the CHANGELOG under Unreleased; the preview, `npm run dev`, shows all of it, but only what is listed under "On the real install" below has been deployed):
- **Names:** the *app header* (logo and tabs), the *top bar* (New Ticket, open-ticket chips, search), the *list bar* (Select Tickets and the filters), the *ticket header*, the *comment box* (a strip that opens on hover, focus or **R**).
- **Tabs are exclusive buckets, first match wins:** Completed, Queued for AI, Ideas (Enhancement tickets not started), Inbox (New, including tickets reopened by Home Assistant or an AI agent, which go back to New), Working. The Completed tab's Show filter reaches Open, History and Everything.
- **Ideas** (Enhancement tickets) collect notes and stay New (backend `_progress` skips them); **Start Working** moves one to In Progress, so it shows under Working.
- **Open tickets are chips** in the top bar (up to 8, remembered per browser, each remembering normal or full width view). New Ticket then Search squeeze to a plus and a magnifier as chips need room, and open out on hover. The **live search drop down** searches every tab (a bare number finds exactly that ticket).
- **Full width view** (icon beside History, or **F**): header across the top, details, description and history on the left (as wide as the list), comments on the right. **X** closes the open ticket's chip.
- **Hotkeys** (ignored while typing): R reply box, F full width, X close the ticket. HA's own C, E, D, M and A are left alone. They are not documented in the panel yet.
- **Queued for AI** tickets show a spark as their status icon (list, chips, search results).
- A new brand pack (home_desk_brand3) is applied.

**Built, tested here and deployed to the real install** (details in the README and CHANGELOG): the ticket list and detail views, statuses, categories, labels, search and filters, merge (single and from the list), unread marks and "Updated by", previous/next, a Home page (Inbox beside an overview), Settings in Home Assistant's card style, the household report form with photos and voice (speech-to-text works on the real install), devices/entities/areas on tickets with clickable chips and "Related?" guesses, Repairs to tickets (grouped; waits 15 minutes before counting a missing repair as cleared), Review with AI (editable prompt, proposed changes, working indicator, Stop), the MCP bridge and agent guide, a new logo.

**Confirmed on the real install:** voice and photo report (#234), speech-to-text, Review with AI replies, the repairs fix across several restarts (#230 to #232), the #241 deprecation fix (needs a restart to show in the log).

**On the real install (deployed 2026-10-19):** Queue for AI Agent beside the priority icons, the AI Action control with Review, the repair fixes (ignored in HA resolves, restart-required skipped), the new tabs and reopen-to-New, the agent guide changes. **Not yet deployed:** everything in the list above from the top bar onwards, the Enhancement workflow, the search by number backend change and the brand pack. Deploying needs a Home Assistant restart (backend) and a browser hard refresh.

**Not built:** push notifications (settings stored, nothing sent), "Your requests" for household users, an Assist voice sentence, device watchers (offline devices, batteries), agent permissions, auto-starting an AI agent, reporting.

## 7. Next steps, in order

*`local/` holds private working notes (design ideas and decisions in progress). It is git-ignored and exists only on the author's machine, so references to `local/...` below are not in the repository.*

*Saved 2026-10-20; state of play updated 2026-10-21 (end of session). Everything below is built, tested and committed locally.*

**State of play**
- **Deployed to the real install** (2026-10-21, after a Home Assistant restart): all of the panel and backend work, including the staged AI Action bar, the Home page, the list sort, search and filters, Ideas, preview chips, and the Settings notice for an edited Review prompt (`agent_prompt_outdated`). The restart log showed no Home Desk errors.
- 9 Python suites pass (`./tests/run_all.sh`, now including `test_backup.py` and the static `test_security.py`), plus `npm test` (vitest, 12 tests), pyflakes and `tools/check_versions.py`. CI is `.github/workflows/validate.yml`.
- **Deployed (2026-10-22, after a restart):** `1.0.0-beta.1` and everything since: the phone layout (header order, comment box pinned to the screen bottom and following the keyboard, tab drop-down shows its list, search button), "nothing to change" findings with no Proceed, Delete Ticket (trash icon, admin and panel only, no service), solid Start Working, outlined Resolve. The first `1.0.0-beta.1` backup of the tickets was made. Walked through as a test list with the author (Home, list, chips, Ideas, ticket view, AI Action, Settings, phone, repairs): all passed.

**Where we stopped (end of the session of 2026-10-22), in order**
1. **The author reviews the docs site** (preview: `cd site && npx vitepress dev --port 5174 --host 127.0.0.1`, then http://127.0.0.1:5174/ha-home-desk/). The **home page is signed off except the hero image**. The other pages are not yet reviewed by the author. While reviewing, also fix the wording that overclaims control: `site/ai/using-ai.md` ("Neither lets an AI change Home Assistant on its own" is true of Review only, not of an external agent the person runs) and the same kind of line in `README.md`.
2. **Hero image** (to be built with the author): a Spatial Context style composite, a transparent PNG in light and dark, of the real panel with floating cards (for example a repair that became a ticket, an AI Review reply with Proceed, a household report with a photo). Build it from the preview's clean mode (below).
4. **Recheck the whole app on the live install** as one list (Home page, tabs and list, chips, ticket view with delete, AI Action, Settings, report form, repairs, phone, a second phone size), the author approving each.
5. **Then, each with the author's approval:** the pre-push sweep again, push, CI, repo settings, release `1.0.0-beta.1`.

**Also pending or only local**
- **Restart Home Assistant** once to drop the removed `import_file` service (the files are deployed; the service lingers until a restart). Everything else is live.
- The docs, the demo (mock) changes and the issue templates under `.github/ISSUE_TEMPLATE/` are committed locally only.
- **Only on the author's Mac, not in git:** `local/` (private design notes, the docs style spec `docs-style-from-spatial-context.md`, the old import data), `frontend/dev/local/` (a personal photo, no longer used by the mock), `frontend/.env` (the real host). Back them up if they matter.
- When the repository goes public, the Spatial Context site's "Also from me" card for Home Desk should lose its "Coming soon" badge.
- Parked ideas are listed under "Ideas parked" below (an outside AI's reply bringing up a ticket as a chip; `@` completion of entities in comments).
- Handy commands: the app preview `cd frontend && npm run dev` (http://localhost:5173, clean screenshot mode `/?clean&theme=light&width=390`); `npm run check` in `frontend/`; `./tests/run_all.sh`; deploy with `rsync` as in section 3; `/save-state` (the author's command) saves a handoff like this one.

**Release readiness (session of 2026-10-21, checklist taken from the Spatial Design project's briefing; that project is read-only for us)**
- Done: security hardening (bounded websocket schemas, admin-only commands except four, fixed client error messages), data safety (once-per-version backup, refusal of a newer storage format), CI, README restructured to match Spatial Design's, MIT `LICENSE`, Buy Me a Coffee in the README and Settings → About, tagline "A smart home ticket system for Home Assistant, with AI to help.", new social-preview images, version `1.0.0-beta.1` (manifest, `package.json`, build info agree; the changelog sorts a beta below its final), docs site brought up to date with the panel (builds clean) and install via a HACS custom repository.
- **History clean-up: done (2026-10-22).** Commit `05efe16` had put the private Home Assistant SSH address into `docs/development.md`; the history was rewritten (same final tree, 172 commits, authors and dates kept) and no object in the repository contains the address any more. Nothing had been pushed. If it is ever needed again: rewrite in a scratch clone with `git filter-branch --tree-filter`, check with `git log --all -G'<address>'` and by scanning every object, then `git fetch <clone> main && git reset --hard FETCH_HEAD`, delete `.git/ORIG_HEAD` (it keeps the old history alive), `git reflog expire --expire=now --all && git gc --prune=now`.
- **Screenshots from the mock (2026-10-22):** the preview has a clean mode for taking pictures: `http://localhost:5173/?clean` shows only the panel filling the window (no control bar or border), with optional `&theme=dark|light`, `&width=390|768|1280` and `&user=admin|household`. The mock data is made up and generic (people Sam and Alex, no real device or tracker names): keep it that way, since pictures from it go in the public docs. Retaken pictures get a new `-vN` suffix, because GitHub caches images by file name.
- **Docs site style (2026-10-22):** the site follows the Spatial Context site's look and writing style (notes in `local/docs-style-from-spatial-context.md`): its theme, sidebar icons, Support group, footer, "Also from me" card, Title Case headings, "Select" not "Click", no contractions, UK spelling. The home page picture is a placeholder screenshot until a hero image in the Spatial Context style is built (floating cards over the panel, light and dark, transparent background).
- **Before the push (agreed 2026-10-22):** see "Where we stopped" above. The pre-push sweep was done once on 2026-10-22 (no tokens, addresses or personal paths); the family name in the mock was replaced, the OPERATIONS.md importer and the `import_file` service were removed, and the private design notes moved to the git-ignored `local/` folder.
- **Then, each with the author's approval:** push `main`; read the CI results (hassfest, HACS) and fix; set the repo description and topics, upload the social preview, enable GitHub Pages, branch protection; point the manifest `documentation` URL at the docs site once Pages is live; tag and release `1.0.0-beta.1` with drafted notes.

**Next, in order**
2. **Decide the MCP servers** (parked 2026-10-20). Leaning: the **Home Desk bridge** (`mcp/server.py`) plus **Home Assistant's built-in MCP Server (Assist API)**. The Assist endpoint works with a non-admin token, only reaches entities exposed to Assist, and can **control** them (not read-only), so the review allow-list is just `GetLiveContext` and the change allow-list adds only the specific control tools you accept. It gives no history, logs, traces or config, so reviews may be shallow; add the community `ha-mcp` with a read-only allow-list later if so. Never put the `ha-mcp` URL or a token in the repository. Next action: draft `mcp.json` and the `extra_tools_review` and `extra_tools_change` lists, if not already done on the LXC.

**Ideas parked**
- Tab chips (previous/next swapping in place) is built as **preview chips** (2026-10-21). Still parked: a "titles only on hover" mode with more than five chips, and a setting for the limit of eight.
- A hotkey to jump between open chips (and one for the search box).
- **`@` in the comment box completes entities, devices and areas** (2026-10-22): reuse the existing picker; insert the friendly name as plain text and attach the entity to the ticket's related chips (so the AI Review gets its state). Open questions: `@` for entities only or people too (`#` is already ticket numbers), and attach automatically or offer it. How: watch for `@` in the textarea, open our own `st-picker-popup` under the cursor and insert the pick as text. HA's pickers (`ha-entity-picker`, `ha-target-picker`) aren't a stable API for custom panels and HA has no `@` completion for plain text (`ha-code-editor` completes entity IDs, but it is a code editor), so the popup is reused.
- **Bring up a ticket when an outside AI answers it** (2026-10-22): when an AI agent working from outside Home Desk (the Claude CLI on the Mac, say) comments on a ticket while the panel is open, open that ticket as a chip. Likely a preview chip, so it doesn't pile up, with the existing changed dot; the panel already gets live updates, so the work is deciding which events open a chip (only the agent's reply? only tickets you queued?) and not stealing focus from the ticket you're on. Open question: a quiet chip only, or also a toast.
- Home page (built 2026-10-21): row 1 is four tiles (Inbox and Working with Urgent and High counts that open the tab with the Priority filter, Queued for AI, Completed in the last 7 days), then a 7-day Ticket Activity graph; "Good Morning" in Title Case. No All tab.
- Ideas tab (renamed from Enhancements, 2026-10-21): the tab itself is the "not now" place, so no parked state is needed.
- The Review prompt: an edited prompt used to keep old wording silently. Settings now shows a notice with Keep Mine and Reset to Default (built 2026-10-21).
- **Phone notifications** (future work, 2026-10-21; found while testing, not a fault): the per-manager notification options in Settings are saved but nothing reads them, so nothing is sent. The `home_desk_event` bus event already fires for new tickets, comments and resolved tickets, so an automation can notify a phone in the meantime. To build: send from the integration using each manager's saved choices; never notify someone about their own action; fold a burst (several repairs) into one summary; give each ticket's notices a tag so they replace each other; open `/home-desk/<id>` on tap. Open question: managers only, or the requester too (a household member told their ticket was resolved). The Notifications card in Settings is hidden until then (`NOTIFICATIONS_SEND` in `settings-page.ts`).
- Document the hotkeys and the new top bar in the README (the Settings card has the keys).

## 8. Gotchas

- **zsh doesn't split a variable into words** (`for t in "a b"; do $t` fails); use a small script or an array. `tests/run_all.sh` exists for this reason.
- **A shell `cp` may be aliased to ask first** and silently not overwrite; use `/bin/cp -f`.
- **Never `cmd | tail` inside an `&&` chain to check a test:** the pipe hides a failing exit code. Use `tests/run_all.sh`.
- **The host is BusyBox:** `ls --time-style` and other GNU-only flags don't exist (`ls -l --full-time` does); use python for anything fiddly.
- Sub-agents and large web fetches use a lot of the weekly allowance; prefer small, targeted reads.
- The settings schema in `websocket_api.py` must list every setting the panel saves (the speech-to-text settings were once refused for this); `tests/test_api.py` checks it.
- Home Assistant restores **persistent** repairs as active at every start, and **non-persistent** ones as inactive stubs; both matter to the Repairs sync.

## 9. Open questions

- Use a small local model (Ollama) for Review with AI to cut cost and keep tickets in the house?
- Agent permissions: the agent as its own Home Assistant user, and a mode on the MCP bridge first?
- When is Beta v1 (the point at which the repository is pushed)?
