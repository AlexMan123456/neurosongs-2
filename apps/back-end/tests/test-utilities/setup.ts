import type { PrismaClient } from "@neurosongs/prisma-client/prisma";

import { PrismaTestingHelper } from "@chax-at/transactional-prisma-testing";
import { initialize } from "@neurosongs/prisma-client/fabbrica";
import { afterEach, beforeAll, beforeEach } from "vitest";

import { getPrismaClient, setPrismaClient } from "src/database/client";

let prismaTestingHelper: PrismaTestingHelper<PrismaClient> | undefined;
let testPrismaClient: PrismaClient;

beforeAll(() => {
  initialize({ prisma: getPrismaClient() });
});

beforeEach(async () => {
  if (!prismaTestingHelper) {
    prismaTestingHelper = new PrismaTestingHelper(getPrismaClient());
    testPrismaClient = prismaTestingHelper.getProxyClient();
    setPrismaClient(testPrismaClient);
    initialize({ prisma: getPrismaClient() });
  }
  await prismaTestingHelper.startNewTransaction();
});

afterEach(async () => {
  prismaTestingHelper?.rollbackCurrentTransaction();
});
