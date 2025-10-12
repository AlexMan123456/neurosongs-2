import type { PrismaClient as NeurosongsPrismaClient } from "@neurosongs/prisma-client/prisma";

export type TransactionClient = Omit<
  NeurosongsPrismaClient,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$extends"
>;
export type PrismaClient = NeurosongsPrismaClient | TransactionClient;
