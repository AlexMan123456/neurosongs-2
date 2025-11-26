import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/server/index.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  fixedExtension: false,
});
