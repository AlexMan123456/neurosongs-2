import { createPrismaClient } from "@neurosongs/prisma-client";

const database = createPrismaClient();

export default database;
