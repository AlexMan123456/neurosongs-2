import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/prisma.ts"],
    format: ["esm", "cjs"],
    dts: false,
    clean: true,
    external: ["@prisma/client", "./generated/prisma"],
    noExternal: [],
  },
  {
    entry: ["src/fabbrica.ts"],
    format: ["esm", "cjs"],
    dts: false,
    clean: true,
    external: ["@prisma/client", "./generated/fabbrica"],
    noExternal: [],
  },
]);
