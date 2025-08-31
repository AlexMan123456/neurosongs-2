import { defineConfig } from "@prisma/config";
import path from "path";

import { parseEnv } from "@alextheman/utility";
import dotenv from "dotenv";

const nodeEnv = parseEnv(process.env.NODE_ENV);

dotenv.config({ path: path.join(__dirname, "./", `.env.${nodeEnv}`) });

export default defineConfig({
  schema: "../../packages/prisma-client/src/schema.prisma",
});
