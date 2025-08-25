import { randomUUID } from "crypto";

import { isSameDate } from "@alextheman/utility";
import request from "supertest";
import { userFactory } from "tests/test-utilities/dataFactory";
import { describe, expect, test } from "vitest";

import app from "src/server/app";

describe("/api/users/:userId", () => {
  test("200: Responds with the given user", async () => {
    const factoryUser = await userFactory.create();
    const {
      body: { user: apiUser },
    } = await request(app).get(`/api/users/${factoryUser.id}`).expect(200);
    expect(factoryUser.id).toBe(apiUser.id);
    expect(factoryUser.username).toBe(apiUser.username);
    expect(factoryUser.artistName).toBe(apiUser.artistName);
    expect(factoryUser.description).toBe(apiUser.description);
    expect(isSameDate(factoryUser.memberSince, new Date(apiUser.memberSince))).toBe(true);
  });
  test("404: Gives an error if user not in database", async () => {
    const missingId = randomUUID();
    const {
      body: { error },
    } = await request(app).get(`/api/users/${missingId}`).expect(404);
    expect(error.status).toBe(404);
    expect(error.message).toBe("USER_NOT_FOUND");
  });
});
