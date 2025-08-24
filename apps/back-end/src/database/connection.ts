import path from "path";
import { fileURLToPath } from "url";

import { newEnv } from "@alextheman/utility";
import { PrismaClient } from "@neurosongs/prisma-client/prisma";
import dotenv from "dotenv";

const nodeEnv = newEnv(process.env.NODE_ENV);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../../", `.env.${nodeEnv}`) });

const database: PrismaClient = new PrismaClient();

export default database;
