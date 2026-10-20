---
title: What Is Home Desk?
---

# What Is Home Desk?

A helpdesk for the home, living inside Home Assistant. You, your household, AI agents and Home Assistant itself raise tickets; you and your AI agents work them through to resolution, with the full history kept. Home Assistant is the heart of a smart home, so it's where tickets live, but they can be about anything around it too (the network, the servers, the media box). Categories keep those apart.

**Status:** v0.1 plus the [unreleased changes](https://github.com/Greminn/ha-home-desk/blob/main/custom_components/home_desk/CHANGELOG.md), in daily use on one install. Expect rough edges.

## What's in it

| Part | Where | What it does |
|---|---|---|
| Integration | `custom_components/home_desk/` | Stores tickets, labels, categories and settings in `.storage/home_desk.tickets`, WebSocket API for the panel, `home_desk.*` services, a `home_desk_event` on the event bus for every change, and an hourly job that closes resolved tickets |
| Panel | `frontend/` → `www/home-desk-panel.js` | Sidebar app (Lit, HA theme variables): ticket list and ticket side by side, with comments, resolve/reopen, coloured labels, categories, a Settings page and the label and category managers |
| Brand | `custom_components/home_desk/brand/`, `home_desk_brand/` | The logo and icon (light and dark) Home Assistant shows for the integration; the SVG masters and extras |
| AI bridge | `mcp/server.py` | Optional MCP server: list, get, create, update, comment, close, link, labels, categories, stats |
| Importer | `tools/export_operations.py` | Turns the author's own markdown tracker (`OPERATIONS.md`) into an import file; only useful if you keep one in the same format |
