---
title: Install
---

# Install

Home Desk is a custom integration. Install it with HACS or copy it in from GitHub. It needs Home Assistant 2024.10 or newer.

## HACS

Home Desk is a beta and is not in the HACS default list yet, so you add it as a custom repository.

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=Greminn&repository=ha-home-desk&category=integration)

1. Select the button above, or in **HACS** open **⋮ → Custom repositories**, paste `https://github.com/Greminn/ha-home-desk` and set **Type** to **Integration**.
2. Install **Home Desk**. Turn on **Show beta versions** if you do not see it.
3. Restart Home Assistant, then continue at [Add the integration](#add-the-integration).

## GitHub

The panel is already built and committed, so there is nothing to compile.

1. Get the files from the [repository](https://github.com/Greminn/ha-home-desk): **Code → Download ZIP**, or clone it.

   ```sh
   git clone https://github.com/Greminn/ha-home-desk.git
   ```

2. Copy `custom_components/home_desk` into `/config/custom_components/`.

   ```
   config/
   └── custom_components/
       └── home_desk/
           ├── __init__.py
           ├── manifest.json
           └── ...
   ```

3. Restart Home Assistant. A full restart is required. Reloading is not enough.

## Add the Integration

1. Go to **Settings → Devices & Services → Add Integration**.
2. Select **Home Desk**. It is added with nothing to fill in.

**Home Desk** appears in the sidebar. Only one instance can be added.

## Update

Replace `custom_components/home_desk` with the new files (or update through HACS) and restart Home Assistant. Tickets are stored in `.storage/home_desk.tickets`, separate from the integration, so they are kept. Before a new version first runs, Home Desk also copies that file to `.storage/home_desk.tickets.backup-<version>`, and keeps the newest three copies. If the file was written by a newer Home Desk than the one installed, Home Desk refuses to read it and leaves it untouched; update Home Desk instead.

A change to the panel only needs a browser hard refresh. A change to the integration's Python needs a restart.

## Troubleshooting

| Symptom | Fix |
|---|---|
| Home Desk is not in the **Add Integration** list | Check the path is `config/custom_components/home_desk/manifest.json`, not one folder deeper. Restart Home Assistant. |
| No sidebar item | Hard refresh the browser. |
| Panel is out of date after an update | Hard refresh the browser. |

Check **Settings → System → Logs** for `home_desk` entries.

::: tip Need help?
[Open an issue on GitHub](https://github.com/Greminn/ha-home-desk/issues).
:::
