import path from "path";
import { fileURLToPath } from "url";

import { newEnv } from "@alextheman/utility";
import { PrismaClient } from "@neurosongs/prisma-client/prisma";
import dotenv from "dotenv";

const nodeEnv = newEnv(process.env.NODE_ENV);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../../", `.env.${nodeEnv}`) });

let currentPrismaClient: PrismaClient = new PrismaClient();

export default function getPrismaClient(): PrismaClient {
  return currentPrismaClient;
}

export function setPrismaClient(client: PrismaClient) {
  currentPrismaClient = client;
}
