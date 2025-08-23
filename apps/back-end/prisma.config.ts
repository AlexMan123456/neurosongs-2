import { defineConfig } from "@prisma/config";
import path from "path";

import { newEnv } from "@alextheman/utility";
import dotenv from "dotenv";

const nodeEnv = newEnv(process.env.NODE_ENV);

dotenv.config({ path: path.join(__dirname, "./", `.env.${nodeEnv}`) });

export default defineConfig({
  schema: "../../packages/prisma-client/src/schema.prisma",
});
