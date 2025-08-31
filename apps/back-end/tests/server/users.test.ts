import type { APIUser, PublicUser, UserToPut } from "@neurosongs/types";
import type { ZodError } from "zod";

import { randomUUID } from "crypto";

import { fillArrayAsync } from "@alextheman/utility";
import { parseAPIUser, parseUser } from "@neurosongs/types";
import request from "supertest";
import { userFactory } from "tests/test-utilities/dataFactory";
import { describe, expect, test } from "vitest";

import getPrismaClient from "src/database/client";
import app from "src/server/app";

describe("/api/users", () => {
  describe("GET", () => {
    test("200: Responds with an array of all users sorted by most recent", async () => {
      const factoryUsers = await fillArrayAsync(async () => {
        return await userFactory.create();
      }, 10);

      factoryUsers.sort((first, second) => {
        return first.serial - second.serial;
      });

      const {
        body: { users: apiUsers },
      }: { body: { users: (Omit<APIUser, "memberSince"> & { memberSince: string })[] } } =
        await request(app).get(`/api/users`).expect(200);

      expect(apiUsers.length).toBe(10);
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
    test("200: Gets the first 50 if there are more than 50 users", async () => {
      const factoryUsers = await fillArrayAsync(async () => {
        return await userFactory.create();
      }, 70);

      factoryUsers.sort((first, second) => {
        return first.serial - second.serial;
      });

      const {
        body: { users: apiUsers, totalUsers, limit, pageNumber, totalPages },
      } = await request(app).get(`/api/users`).expect(200);

      expect(totalUsers).toBe(70);
      expect(limit).toBe(50);
      expect(pageNumber).toBe(1);
      expect(totalPages).toBe(2);

      expect(apiUsers.length).toBe(50);
      expect(factoryUsers.slice(0, 50)).toMatchObject(
        apiUsers.map((apiUser: APIUser) => {
          return parseAPIUser(apiUser);
        }),
      );

      apiUsers.forEach((apiUser: APIUser) => {
        const validatedAPIUser = parseAPIUser(apiUser);

        expect(validatedAPIUser).not.toHaveProperty("serial");
        expect(validatedAPIUser).not.toHaveProperty("email");
        expect(validatedAPIUser).not.toHaveProperty("dateOfBirth");
      });
    });
    test("200: Gets the specified amount of users if limit query provided", async () => {
      const factoryUsers = await fillArrayAsync(async () => {
        return await userFactory.create();
      }, 50);

      factoryUsers.sort((first, second) => {
        return first.serial - second.serial;
      });

      const {
        body: { users: apiUsers, totalUsers, limit, pageNumber, totalPages },
      } = await request(app).get(`/api/users`).query({ limit: 25 }).expect(200);

      expect(totalUsers).toBe(50);
      expect(limit).toBe(25);
      expect(pageNumber).toBe(1);
      expect(totalPages).toBe(2);

      expect(apiUsers.length).toBe(25);
      expect(factoryUsers.slice(0, 25)).toMatchObject(
        apiUsers.map((apiUser: APIUser) => {
          return parseAPIUser(apiUser);
        }),
      );

      apiUsers.forEach((apiUser: APIUser) => {
        const validatedAPIUser = parseAPIUser(apiUser);

        expect(validatedAPIUser).not.toHaveProperty("serial");
        expect(validatedAPIUser).not.toHaveProperty("email");
        expect(validatedAPIUser).not.toHaveProperty("dateOfBirth");
      });
    });
    test("200: Gets 50 users starting at the given page if page query provided", async () => {
      const factoryUsers = await fillArrayAsync(async () => {
        return await userFactory.create();
      }, 150);

      factoryUsers.sort((first, second) => {
        return first.serial - second.serial;
      });

      const {
        body: { users: apiUsers, totalUsers, limit, pageNumber, totalPages },
      } = await request(app).get(`/api/users`).query({ page: 2 }).expect(200);

      expect(totalUsers).toBe(150);
      expect(limit).toBe(50);
      expect(pageNumber).toBe(2);
      expect(totalPages).toBe(3);

      expect(apiUsers.length).toBe(50);
      expect(factoryUsers.slice(50, 100)).toMatchObject(
        apiUsers.map((apiUser: APIUser) => {
          return parseAPIUser(apiUser);
        }),
      );

      apiUsers.forEach((apiUser: APIUser) => {
        const validatedAPIUser = parseAPIUser(apiUser);

        expect(validatedAPIUser).not.toHaveProperty("serial");
        expect(validatedAPIUser).not.toHaveProperty("email");
        expect(validatedAPIUser).not.toHaveProperty("dateOfBirth");
      });
    });
    test("200: Gets the specified amount of users if limit query provided", async () => {
      const factoryUsers = await fillArrayAsync(async () => {
        return await userFactory.create();
      }, 50);

      factoryUsers.sort((first, second) => {
        return first.serial - second.serial;
      });

      const {
        body: { users: apiUsers, totalUsers, limit, pageNumber, totalPages },
      } = await request(app).get(`/api/users`).query({ limit: 25 }).expect(200);

      expect(totalUsers).toBe(50);
      expect(limit).toBe(25);
      expect(pageNumber).toBe(1);
      expect(totalPages).toBe(2);

      expect(apiUsers.length).toBe(25);
      expect(factoryUsers.slice(0, 25)).toMatchObject(
        apiUsers.map((apiUser: APIUser) => {
          return parseAPIUser(apiUser);
        }),
      );

      apiUsers.forEach((apiUser: APIUser) => {
        const validatedAPIUser = parseAPIUser(apiUser);

        expect(validatedAPIUser).not.toHaveProperty("serial");
        expect(validatedAPIUser).not.toHaveProperty("email");
        expect(validatedAPIUser).not.toHaveProperty("dateOfBirth");
      });
    });
    test("400: Gives an error if limit is invalid", async () => {
      const {
        body: { error },
      } = await request(app).get(`/api/users`).query({ limit: "Invalid" }).expect(400);
      expect(error.message).toBe("INVALID_LIMIT");
    });
    test("400: Gives an error if page is invalid", async () => {
      const {
        body: { error },
      } = await request(app).get(`/api/users`).query({ page: "Invalid" }).expect(400);
      expect(error.message).toBe("INVALID_PAGE_NUMBER");
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
  describe("PUT", () => {
    test("204: Edits the user with the new given data", async () => {
      const factoryUser = await userFactory.create();
      const changedProperties: UserToPut = {
        username: "alextheman",
        artistName: "Alex The Man",
        description: "I am a Neurosongs artist",
        profilePicture: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      };

      // PUT returns nothing - the general pattern in practice would be to make the request then query GET again.
      await request(app).put(`/api/users/${factoryUser.id}`).send(changedProperties).expect(204);

      const database = getPrismaClient();
      const changedUser = await database.user.findUnique({ where: { id: factoryUser.id } });
      if (!changedUser) {
        throw new Error("USER_NOT_FOUND");
      }

      expect(changedUser).toMatchObject(changedProperties);

      // Check other properties are unaffected
      const filteredChangedUser: Partial<PublicUser> = { ...changedUser };
      delete filteredChangedUser.username;
      delete filteredChangedUser.artistName;
      delete filteredChangedUser.description;
      delete filteredChangedUser.profilePicture;

      expect(factoryUser).toMatchObject(filteredChangedUser);
    });
    test("204: Allow any property to be left out", async () => {
      const factoryUser = await userFactory.create();
      const changedProperties: UserToPut = {
        username: "alextheman",
        artistName: "Alex The Man",
        description: "I am a Neurosongs artist",
      };

      await request(app).put(`/api/users/${factoryUser.id}`).send(changedProperties).expect(204);

      const database = getPrismaClient();
      const changedUser = await database.user.findUnique({ where: { id: factoryUser.id } });
      if (!changedUser) {
        throw new Error("USER_NOT_FOUND");
      }

      expect(changedUser).toMatchObject(changedProperties);

      // Check other properties are unaffected
      const filteredChangedUser: Partial<PublicUser> = { ...changedUser };
      delete filteredChangedUser.username;
      delete filteredChangedUser.artistName;
      delete filteredChangedUser.description;

      expect(factoryUser).toMatchObject(filteredChangedUser);
    });
    test("400: Gives an error if userId is not UUID", async () => {
      const changedProperties: UserToPut = {
        username: "alextheman",
        artistName: "Alex The Man",
        description: "I am a Neurosongs artist",
        profilePicture: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      };
      const {
        body: { error },
      } = await request(app).put(`/api/users/1`).send(changedProperties).expect(400);
      expect(error.message).toBe("INVALID_UUID");
    });
    test("404: Gives an error if user not in database", async () => {
      const missingId = randomUUID();
      const changedProperties: UserToPut = {
        username: "alextheman",
        artistName: "Alex The Man",
        description: "I am a Neurosongs artist",
        profilePicture: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      };

      const {
        body: { error },
      } = await request(app).put(`/api/users/${missingId}`).send(changedProperties).expect(404);
      expect(error.message).toBe("USER_NOT_FOUND");
    });
  });
});
