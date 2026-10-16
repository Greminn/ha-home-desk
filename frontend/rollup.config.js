import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { readFileSync, writeFileSync } from "node:fs";

const pkg = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url)),
);
const isDev = process.env.ROLLUP_WATCH === "true";
const buildId = `${pkg.version}+${Date.now().toString(36)}`;
const outDir = "../custom_components/home_desk/www";
const outFile = `${outDir}/home-desk-panel.js`;

/** Writes home-desk-panel.build.json next to the bundle. */
const writeBuildInfo = () => ({
  name: "write-build-info",
  writeBundle() {
    writeFileSync(
      outFile.replace(/\.js$/, ".build.json"),
      JSON.stringify({ version: pkg.version, build_id: buildId }) + "\n",
    );
  },
});

export default {
  input: "src/index.ts",
  output: {
    file: outFile,
    format: "iife",
    name: "HomeDeskPanelBundle",
    sourcemap: isDev,
    banner: `/*! home-desk-panel v${pkg.version} | ${pkg.license} */`,
  },
  plugins: [
    replace({
      preventAssignment: true,
      values: {
        __VERSION__: JSON.stringify(pkg.version),
        __BUILD_ID__: JSON.stringify(buildId),
      },
    }),
    nodeResolve({ browser: true, extensions: [".js", ".ts", ".mjs"] }),
    commonjs(),
    json(),
    typescript({
      tsconfig: "./tsconfig.json",
      noEmitOnError: !isDev,
      compilerOptions: {
        noEmit: false,
        declaration: false,
        sourceMap: isDev,
        outDir,
      },
      outputToFilesystem: false,
    }),
    writeBuildInfo(),
    !isDev && terser({ format: { comments: /^!/ } }),
  ].filter(Boolean),
};
