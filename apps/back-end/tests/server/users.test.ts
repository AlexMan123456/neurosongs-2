import type { APIUser, PublicUser, User } from "@neurosongs/prisma-client/types";

import { randomUUID } from "crypto";

import { isSameDate } from "@alextheman/utility";
import { parseAPIUser, parsePublicUser } from "@neurosongs/prisma-client/types";
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
      }: { body: { users: (Omit<APIUser, "memberSince"> & { memberSince: string })[] } } =
        await request(app).get(`/api/users`).expect(200);

      const validatedFactoryUsers = factoryUsers.map((user) => {
        const newUser: Partial<User> = { ...user };
        delete newUser.serial;
        delete newUser.dateOfBirth;
        delete newUser.email;

        return parsePublicUser(newUser);
      });

      const validatedAPIUsers = apiUsers.map((user) => {
        return parseAPIUser(user);
      });

      expect(
        validatedFactoryUsers.map((user) => {
          const newUser: Partial<PublicUser> = { ...user };
          delete newUser.memberSince;
          return newUser;
        }),
      ).toEqual(
        validatedAPIUsers.map((user) => {
          const newUser: Partial<APIUser> = { ...user };
          delete newUser.memberSince;
          return newUser;
        }),
      );

      validatedAPIUsers.forEach((apiUser, index) => {
        const factoryUser = validatedFactoryUsers[index];
        expect(isSameDate(new Date(apiUser.memberSince), factoryUser.memberSince)).toBe(true);
      });
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

      const validatedAPIUser = parseAPIUser(apiUser);

      const filteredFactoryUser: Partial<User> = { ...factoryUser };
      delete filteredFactoryUser.serial;
      delete filteredFactoryUser.email;
      delete filteredFactoryUser.dateOfBirth;

      const validatedPublicFactoryUser = parsePublicUser(filteredFactoryUser);

      const filteredPublicFactoryUser = { ...filteredFactoryUser };
      delete filteredPublicFactoryUser.memberSince;

      const filteredAPIUser: Partial<APIUser> = { ...validatedAPIUser };
      delete filteredAPIUser.memberSince;

      expect(filteredAPIUser).toEqual(filteredPublicFactoryUser);
      expect(
        isSameDate(new Date(validatedAPIUser.memberSince), validatedPublicFactoryUser.memberSince),
      ).toBe(true);
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
