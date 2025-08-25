import type { PrismaClient } from "@neurosongs/prisma-client/prisma";

import { PrismaTestingHelper } from "@chax-at/transactional-prisma-testing";
import { initialize } from "@neurosongs/prisma-client/fabbrica";
import { afterEach, beforeAll, beforeEach } from "vitest";

import { getPrismaClient, setPrismaClient } from "src/database/client";
import database from "src/database/connection";

let prismaTestingHelper: PrismaTestingHelper<PrismaClient> | undefined;
let testPrismaClient: PrismaClient;

beforeAll(() => {
  initialize({ prisma: getPrismaClient() });
});

beforeEach(async () => {
  if (!prismaTestingHelper) {
    prismaTestingHelper = new PrismaTestingHelper(database);
  }
  testPrismaClient = prismaTestingHelper.getProxyClient();
  initialize({ prisma: testPrismaClient });
  setPrismaClient(testPrismaClient);
  await prismaTestingHelper.startNewTransaction();
});

afterEach(async () => {
  prismaTestingHelper?.rollbackCurrentTransaction();
});
