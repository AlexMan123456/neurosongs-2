import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/prisma.ts"],
    format: ["esm", "cjs"],
    dts: false,
    clean: true,
    external: ["./generated/prisma"],
    noExternal: [],
  },
  {
    entry: ["src/fabbrica.ts"],
    format: ["esm", "cjs"],
    dts: false,
    clean: true,
    external: ["./generated/fabbrica"],
    noExternal: [],
  },
  {
    entry: ["src/types.ts"],
    format: ["esm", "cjs"],
    dts: true,
    clean: true,
    external: ["./generated/types/schemas"],
    noExternal: [],
  }
]);
