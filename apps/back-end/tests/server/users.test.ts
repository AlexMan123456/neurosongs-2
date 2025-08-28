import type { APIUser } from "@neurosongs/prisma-client/types";
import type { ZodError } from "zod";

import { randomUUID } from "crypto";

import { parseAPIUser, parseUser } from "@neurosongs/prisma-client/types";
import request from "supertest";
import { userFactory } from "tests/test-utilities/dataFactory";
import { describe, expect, test } from "vitest";

import { getPrismaClient } from "src/database/client";
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

      expect(factoryUsers).toMatchObject(
        apiUsers.map((apiUser) => {
          return parseAPIUser(apiUser);
        }),
      );

      apiUsers.forEach((apiUser) => {
        const validatedAPIUser = parseAPIUser(apiUser);

        expect(validatedAPIUser).not.toHaveProperty("serial");
        expect(validatedAPIUser).not.toHaveProperty("email");
        expect(validatedAPIUser).not.toHaveProperty("dateOfBirth");
      });
    });
  });
  describe("POST", () => {
    test("201: Posts a user to the database and responds with the ID", async () => {
      const user = {
        username: "alextheman",
        artistName: "Alex The Man",
        description: "I am an artist on Neurosongs",
        profilePicture: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        dateOfBirth: new Date("2003-07-16T00:00:00.000"),
        email: "alex@neurosongs.com",
      };

      const {
        body: { userId },
      } = await request(app).post("/api/users").send(user).expect(201);

      const database = getPrismaClient();
      const postedUser = parseUser(await database.user.findUnique({ where: { id: userId } }));
      expect(postedUser).toMatchObject(user);
    });
    test("201: Allow optional properties to be left out", async () => {
      const user = {
        username: "alextheman",
        artistName: "Alex The Man",
        profilePicture: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        dateOfBirth: new Date("2003-07-16T00:00:00.000"),
        email: "alex@neurosongs.com",
      };

      const {
        body: { userId },
      } = await request(app).post("/api/users").send(user).expect(201);

      const database = getPrismaClient();
      const postedUser = parseUser(await database.user.findUnique({ where: { id: userId } }));
      expect(postedUser).toMatchObject(user);
    });
    test("400: Do not allow memberSince on request body", async () => {
      const user = {
        username: "alextheman",
        artistName: "Alex The Man",
        description: "I am an artist on Neurosongs",
        profilePicture: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        dateOfBirth: new Date("2003-07-16T00:00:00.000"),
        email: "alex@neurosongs.com",
        memberSince: new Date(),
      };

      const {
        body: { error },
      } = await request(app).post("/api/users").send(user).expect(400);
      error.forEach((errorItem: ZodError["issues"][number]) => {
        expect(errorItem.code).toBe("unrecognized_keys");
        expect(errorItem.message).toBe('Unrecognized key: "memberSince"');
      });
    });
    test("400: Error on extra properties", async () => {
      const user = {
        username: "alextheman",
        artistName: "Alex The Man",
        description: "I am an artist on Neurosongs",
        profilePicture: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        dateOfBirth: new Date("2003-07-16T00:00:00.000"),
        email: "alex@neurosongs.com",
        extraKey: "Extra property",
      };

      const {
        body: { error },
      } = await request(app).post("/api/users").send(user).expect(400);
      error.forEach((errorItem: ZodError["issues"][number]) => {
        expect(errorItem.code).toBe("unrecognized_keys");
        expect(errorItem.message).toBe('Unrecognized key: "extraKey"');
      });
    });
    test("400: Do not allow mandatory properties to be left out", async () => {
      const user = {
        artistName: "Alex The Man",
        description: "I am an artist on Neurosongs",
        profilePicture: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        dateOfBirth: new Date("2003-07-16T00:00:00.000"),
      };

      const {
        body: { error },
      } = await request(app).post("/api/users").send(user).expect(400);

      error.forEach((errorItem: ZodError["issues"][number]) => {
        expect(errorItem.code).toBe("invalid_type");
        expect(errorItem.message).toContain("received undefined");
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
      expect(factoryUser).toMatchObject(validatedAPIUser);

      expect(validatedAPIUser).not.toHaveProperty("serial");
      expect(validatedAPIUser).not.toHaveProperty("email");
      expect(validatedAPIUser).not.toHaveProperty("dateOfBirth");
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
