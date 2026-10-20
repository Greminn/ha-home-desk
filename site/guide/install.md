---
title: Install
---

# Install

Home Desk is a custom integration. Install it with HACS or copy it in from GitHub. It needs Home Assistant 2024.10 or newer.

## HACS

::: info Coming soon
Home Desk is not in HACS yet. This section will be completed when it is. Use [GitHub](#github) until then.
:::

1. Open **HACS**.
2. *(Placeholder: search for **Home Desk**, or add the repository as a custom repository.)*
3. Select **Download**, then restart Home Assistant.
4. Continue at [Add the integration](#add-the-integration).

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

## Add the integration

1. Go to **Settings → Devices & Services → Add Integration**.
2. Select **Home Desk**. It is added with nothing to fill in.

**Home Desk** appears in the sidebar. Only one instance can be added.

## Update

Replace `custom_components/home_desk` with the new files (or update through HACS) and restart Home Assistant. Tickets are stored in `.storage/home_desk.tickets`, separate from the integration, so they are kept.

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
