import { initialize } from "@neurosongs/prisma-client/fabbrica";
import { beforeAll } from "vitest";

import database from "src/database/connection";

beforeAll(() => {
  initialize({ prisma: database });
});
