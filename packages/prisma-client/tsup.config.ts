import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  external: ["@prisma/client", "generated/prisma", "generated/fabbrica"],
  noExternal: []
});
