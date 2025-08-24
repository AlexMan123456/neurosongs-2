import { initialize } from "@neurosongs/prisma-client/fabbrica";
import { execa } from "execa";
import { beforeAll, beforeEach } from "vitest";

import database from "src/database/connection";

beforeAll(() => {
  initialize({ prisma: database });
});

beforeEach(async () => {
  await execa("npm", ["run", "reset-database"]);
});
