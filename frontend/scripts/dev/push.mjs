#!/usr/bin/env node
// rsync (over SSH) the built panel bundle to the configured HA host, into the
// integration's already-deployed www/ directory. A hard browser refresh then
// picks it up with no HA restart. Needs HA_HOST and HA_DEV_PATH (see .env.example).
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const www = resolve(root, "..", "custom_components/home_desk/www");
const { HA_HOST, HA_DEV_PATH } = process.env;
if (!HA_HOST || !HA_DEV_PATH || !HA_DEV_PATH.endsWith("/")) {
  console.error("[push] set HA_HOST and HA_DEV_PATH (ending in /) in frontend/.env");
  process.exit(1);
}
const files = ["home-desk-panel.js", "home-desk-panel.build.json"].map((f) => resolve(www, f));
const r = spawnSync("rsync", ["-av", ...files, `${HA_HOST}:${HA_DEV_PATH}`], { stdio: "inherit" });
process.exit(r.status ?? 1);
