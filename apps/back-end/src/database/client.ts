import type { PrismaClient } from "@neurosongs/prisma-client/prisma";

import database from "src/database/connection";

let currentPrismaClient = database;

export function getPrismaClient(): PrismaClient {
  return currentPrismaClient;
}

export function setPrismaClient(client: PrismaClient) {
  currentPrismaClient = client;
}
