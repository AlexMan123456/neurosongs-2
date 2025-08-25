import type { PublicUser } from "@neurosongs/prisma-client/types";

import { randomUUID } from "crypto";

import { isSameDate } from "@alextheman/utility";
import request from "supertest";
import { userFactory } from "tests/test-utilities/dataFactory";
import { describe, expect, test } from "vitest";

import app from "src/server/app";

describe("/api/users", () => {
  describe("GET", () => {
    test("200: Responds with an array of all users sorted by most recent", async () => {
      const factoryUsers = await Promise.all(
        new Array(5).fill(null).map(async () => {
          return await userFactory.create();
        }),
      );

      factoryUsers.sort((first, second) => {
        return first.serial - second.serial;
      });

      const {
        body: { users: apiUsers },
      }: { body: { users: PublicUser[] } } = await request(app).get(`/api/users`).expect(200);

      expect(
        apiUsers.map((user) => {
          return user.id;
        }),
      ).toEqual(
        factoryUsers.map((user) => {
          return user.id;
        }),
      );
    });
  });
});

describe("/api/users/:userId", () => {
  describe("GET", () => {
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
      expect(error.message).toBe("USER_NOT_FOUND");
    });
    test("400: Gives an error if userId is not a UUID", async () => {
      const {
        body: { error },
      } = await request(app).get(`/api/users/hello`).expect(400);
      expect(error.message).toBe("INVALID_UUID");
    });
  });
});
