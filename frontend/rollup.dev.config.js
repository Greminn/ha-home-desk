// Bundles the dev preview (dev/main.js: the real panel plus a mock Home Assistant) into dev/dist/dev.js.
// Used by `npm run dev`; the production bundle is built by rollup.config.js.
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "dev/main.js",
  output: { file: "dev/dist/dev.js", format: "iife", sourcemap: true },
  plugins: [
    replace({ preventAssignment: true, values: { __VERSION__: JSON.stringify("dev"), __BUILD_ID__: JSON.stringify("dev") } }),
    nodeResolve({ browser: true, extensions: [".js", ".ts", ".mjs"] }),
    commonjs(),
    json(),
    typescript({
      tsconfig: "./tsconfig.json",
      noEmitOnError: false,
      compilerOptions: { noEmit: false, declaration: false, sourceMap: true, outDir: "dev/dist" },
      outputToFilesystem: false,
    }),
  ],
};
