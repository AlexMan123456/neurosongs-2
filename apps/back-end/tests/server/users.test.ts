import type { APIUser, PublicUser, User } from "@neurosongs/prisma-client/types";

import { randomUUID } from "crypto";

import { isSameDate } from "@alextheman/utility";
import { newAPIUser, newPublicUser } from "@neurosongs/prisma-client/types";
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
      }: { body: { users: (Omit<PublicUser, "memberSince"> & { memberSince: string })[] } } =
        await request(app).get(`/api/users`).expect(200);

      const filteredFactoryUsers = factoryUsers.map((user) => {
        const newUser: Partial<User> = { ...user };
        delete newUser.serial;
        delete newUser.dateOfBirth;
        delete newUser.email;
        delete newUser.memberSince;
        return newUser as Omit<PublicUser, "memberSince">;
      });

      expect(filteredFactoryUsers).toEqual(
        apiUsers.map((user) => {
          const newUser: Omit<Partial<User>, "memberSince"> & { memberSince?: string } = {
            ...user,
          };
          delete newUser.memberSince;
          return newUser;
        }),
      );

      apiUsers.forEach((apiUser, index) => {
        const factoryUser = factoryUsers[index];
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

      const { data: validatedAPIUser, success: isValidAPIUser } = newAPIUser(apiUser);
      if (!isValidAPIUser) {
        // We need to do this over an expect(validatedAPIUser).not.toBe(undefined) because otherwise TypeScript still
        // gives an error when we try an invoke isSameDate with it, since it doesn't know that expect stops execution on failure,
        throw new Error("INVALID_API_USER");
      }

      const filteredFactoryUser: Partial<User> = { ...factoryUser };
      delete filteredFactoryUser.serial;
      delete filteredFactoryUser.email;
      delete filteredFactoryUser.dateOfBirth;

      const { data: validatedPublicFactoryUser, success: isValidPublicFactoryUser } =
        newPublicUser(filteredFactoryUser);
      if (!isValidPublicFactoryUser) {
        throw new Error("INVALID_FACTORY_USER");
      }

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
