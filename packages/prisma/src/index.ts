import { PrismaClient } from "generated/prisma";

export const database = new PrismaClient();
export type { User } from "generated/prisma";
