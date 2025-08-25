import type { PrismaClient } from "@neurosongs/prisma-client/prisma";

import { PrismaTestingHelper } from "@chax-at/transactional-prisma-testing";
import { initialize } from "@neurosongs/prisma-client/fabbrica";
import { afterEach, beforeEach } from "vitest";

import { getPrismaClient, setPrismaClient } from "src/database/client";

let prismaTestingHelper: PrismaTestingHelper<PrismaClient> | undefined;
let testPrismaClient: PrismaClient;

beforeEach(async () => {
  if (!prismaTestingHelper) {
    prismaTestingHelper = new PrismaTestingHelper(getPrismaClient());
    testPrismaClient = prismaTestingHelper.getProxyClient();
    setPrismaClient(testPrismaClient);
    initialize({ prisma: testPrismaClient });
  }
  await prismaTestingHelper.startNewTransaction();
});

afterEach(() => {
  prismaTestingHelper?.rollbackCurrentTransaction();
});
