import { parseEnv } from "@alextheman/utility";
import { PrismaClient } from "@neurosongs/prisma-client/prisma";
import dotenv from "dotenv";

import path from "node:path";
import { fileURLToPath } from "node:url";

const nodeEnv = parseEnv(process.env.NODE_ENV ?? "development");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../../", `.env.${nodeEnv}`), override: true });

let currentPrismaClient: PrismaClient = new PrismaClient();

export default function getPrismaClient(): PrismaClient {
  return currentPrismaClient;
}

export function setPrismaClient(client: PrismaClient) {
  currentPrismaClient = client;
}
