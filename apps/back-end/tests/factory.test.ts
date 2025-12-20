import { describe, expect, test } from "vitest";

import { songFactory, userFactory } from "tests/test-utilities/dataFactory";

describe("Trivial data factory test", () => {
  test("Inserts a user into the database", async () => {
    const user = await userFactory.create();
    expect(typeof user.id).toBe("string");
  });
  test("Inserts a song into the database", async () => {
    const song = await songFactory.create();
    expect(typeof song.id).toBe("string");
  });
});
