import { initialize } from "@neurosongs/prisma-client/fabbrica";
import { execa } from "execa";
import { afterEach, beforeAll } from "vitest";

import database from "src/database/connection";

beforeAll(() => {
  initialize({ prisma: database });
});

afterEach(async () => {
  await execa("npm", ["run", "reset-database"], { env: { NODE_ENV: "test" } });
});
