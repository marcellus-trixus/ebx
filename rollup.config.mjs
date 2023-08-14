import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";
import { rmSync } from "node:fs";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
const isProduction = !Boolean(process.env.ROLLUP_WATCH);
try {
  rmSync("dist", { recursive: true });
} catch (er) {}
export default defineConfig({
  input: { index: "./src/index.ts", typescript: "./src/typescript/index.ts" },
  plugins: [
    nodeResolve({ exportConditions: ["node"], preferBuiltins: true }),
    commonjs({}),
    typescript(),
    json(),
    isProduction && terser(),
  ],
  external: ["typescript", "esbuild", "ora"],
  output: {
    format: "cjs",
    chunkFileNames: "[name].js",
    dir: "dist",
  },
});
