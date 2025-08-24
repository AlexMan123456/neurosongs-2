import { userFactory } from "tests/test-utilities/dataFactory";
import { describe, expect, test } from "vitest";

describe("Trivial data factory test", () => {
  test("Insert a user into the database", async () => {
    const user = await userFactory.create();
    expect(typeof user.id).toBe("string");
  });
});
