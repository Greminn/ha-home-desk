#!/usr/bin/env node
// `npm run dev`: rebuilds the preview whenever src/ or dev/ changes, and serves it at http://localhost:5173.
// The preview runs the real panel against a mock Home Assistant (dev/mock-hass.js); see dev/index.html.
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, extname, join, normalize } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const devDir = join(root, "dev");
const port = Number(process.env.PORT ?? 5173);
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".map": "application/json", ".svg": "image/svg+xml" };

const rollupBin = join(root, "node_modules", "rollup", "dist", "bin", "rollup");
const build = spawn(process.execPath, [rollupBin, "-c", "rollup.dev.config.js", "-w", "--no-watch.clearScreen"], { cwd: root, stdio: "inherit" });
const stop = () => { build.kill(); process.exit(0); };
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
build.on("exit", (code) => { if (code) { console.error(`rollup exited with ${code}`); process.exit(code); } });

createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost");
  if (url.pathname === "/__v") {
    // A version that changes when the bundle is rebuilt, so open pages know to reload.
    const s = await stat(join(devDir, "dist", "dev.js")).catch(() => null);
    res.writeHead(200, { "content-type": "text/plain", "cache-control": "no-store" }).end(String(s?.mtimeMs ?? 0));
    return;
  }
  // The panel changes the address to /home-desk/<id>; serve the panel page for those, as HA would.
  let path = url.pathname === "/" ? "/index.html" : url.pathname.startsWith("/home-desk") ? "/panel.html" : url.pathname;
  const file = normalize(join(devDir, path));
  if (!file.startsWith(devDir)) { res.writeHead(403).end(); return; }
  try {
    const body = await readFile(file); // read first, so a missing file can still answer 404
    res.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream", "cache-control": "no-store" }).end(body);
  } catch {
    res.writeHead(404, { "content-type": "text/plain" }).end(`Not found: ${path}`);
  }
}).listen(port, "127.0.0.1", () => console.log(`\nHome Desk preview: http://localhost:${port}\n`));
