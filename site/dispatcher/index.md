---
title: The AI Dispatcher
---

# The AI Dispatcher

I built this for myself. I run a small always-on machine at home, I already use the Claude CLI, and I wanted to raise a ticket in Home Assistant, ask an AI to look into it, read what it found, and only then let it act. It works for me and it is in daily use on one install.

It connects to my Home Assistant instance through the community [**ha-mcp**](https://github.com/homeassistant-ai/ha-mcp) add-on, and during the review it is given only ha-mcp's read-only address. It is **not** a feature everyone needs: Home Desk is fully useful without it, and nothing runs unless you set it up and switch on "Offer Run AI Agent Now" in Settings.

If you want to go the same way, [the setup page](/dispatcher/setup) has the full steps, and the choices are yours. It assumes you are comfortable with a Linux shell, with creating Home Assistant users and tokens, and with the idea that an AI agent connected to your home can be wrong. Expect to adjust things for your own network. Your setup will not match mine, and that is fine.

::: warning An AI Can Misread a Ticket
Ticket text can be written by anyone who can reach your Home Assistant. Start with the **Advise Only** preset.
:::

- [How it is built, and the safeguards](/dispatcher/overview)
- [Setup](/dispatcher/setup)
- [Letting it look at your home](/dispatcher/mcp)
- [Presets](/dispatcher/presets)
- [Watching and troubleshooting](/dispatcher/running)
