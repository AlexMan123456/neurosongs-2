import type { PrismaClient as NeurosongsPrismaClient } from "@neurosongs/prisma-client/prisma";

export type PrismaClient =
  | NeurosongsPrismaClient
  | Omit<NeurosongsPrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$extends">;
