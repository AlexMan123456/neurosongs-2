import { PrismaClient } from "generated/prisma";

function createPrismaClient() {
  return new PrismaClient();
}

export default createPrismaClient;
