---
title: Install
---

# Install

You need Home Assistant 2024.10 or newer, and a way to put files in its `config` folder.

## Install with HACS

::: info Coming soon
Home Desk isn't in the HACS store yet. This section will be filled in when it is. For now, use [From GitHub](#from-github) below.
:::

1. Open **HACS** in the Home Assistant sidebar.
2. *(placeholder: search for **Home Desk** once it's listed, or add the repository as a custom repository.)*
3. Select **Download**.
4. Restart Home Assistant.
5. Carry on at [Add Home Desk to Home Assistant](#add-home-desk-to-home-assistant).

## From GitHub

You are copying one folder into Home Assistant. There is nothing to build or compile.

### 1. Get the files

Pick one:

- **Download a ZIP.** Open the [Home Desk repository on GitHub](https://github.com/Greminn/ha-home-desk), select **Code → Download ZIP**, and unzip it.
- **Clone it**, if you use Git:

  ```sh
  git clone https://github.com/Greminn/ha-home-desk.git
  ```

Inside, find the folder `custom_components/home_desk`. That folder is all Home Assistant needs.

### 2. Copy it into Home Assistant

Copy `home_desk` into the `custom_components` folder inside Home Assistant's `config` folder, so you end up with:

```
config/
└── custom_components/
    └── home_desk/
        ├── __init__.py
        ├── manifest.json
        └── ...
```

If there is no `custom_components` folder yet, create it. How you get the files there depends on your setup. Any of these will do:

- the **Samba share** add-on (the `config` share shows up as a network drive),
- the **File editor** or **Studio Code Server** add-on,
- **SSH** with the Terminal & SSH add-on, using `scp`.

### 3. Restart Home Assistant

Go to **Settings → System**, select the power icon, then **Restart Home Assistant**. A new integration is only picked up after a full restart.

## Add Home Desk to Home Assistant

1. Go to **Settings → Devices & Services**.
2. Select **Add Integration**, search for **Home Desk** and select it. It's added straight away, with nothing to fill in.

**Home Desk** now appears in the sidebar. Open it, and carry on with [Your First Ticket](/guide/first-ticket).

## Updating

- **HACS:** open HACS, find Home Desk, and select **Update**.
- **From GitHub:** download the new files and copy the `home_desk` folder over the old one.

Then restart Home Assistant. Your tickets are kept. They are stored separately from the integration's files.

## If something looks wrong

| What you see | Try this |
|---|---|
| Home Desk isn't in the **Add Integration** list | Check the folder is exactly `config/custom_components/home_desk` (not nested one level deeper), then restart Home Assistant fully. |
| No **Home Desk** in the sidebar | Hard refresh your browser (Ctrl+Shift+R, or Cmd+Shift+R on a Mac). |
| The panel looks out of date after an update | Hard refresh your browser. |

If it still doesn't work, look at **Settings → System → Logs** for lines that mention `home_desk`, and [open an issue on GitHub](https://github.com/Greminn/ha-home-desk/issues).
