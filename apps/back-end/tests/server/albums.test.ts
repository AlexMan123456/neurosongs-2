import type { AlbumToPost } from "@neurosongs/types";
import type { ZodError } from "zod";

import { fillArray, omitProperties } from "@alextheman/utility";
import { parseAlbum, parsePublicAlbum, parsePublicAlbums } from "@neurosongs/types";
import request from "supertest";
import { describe, expect, test } from "vitest";

import { randomUUID } from "node:crypto";

import { albumFactory, userFactory } from "tests/test-utilities/dataFactory";

import getPrismaClient from "src/database/client";
import app from "src/server/app";

describe("/api/albums", () => {
  describe("GET", () => {
    test("200: Responds with an array of albums", async () => {
      const database = getPrismaClient();
      const factoryAlbums = await fillArray(async () => {
        return await albumFactory.create();
      }, 10);

      const {
        body: { albums: apiAlbums },
      } = await request(app).get("/api/albums").expect(200);

      const validatedAPIAlbums = parsePublicAlbums(apiAlbums);

      expect(apiAlbums.length).toBe(10);
      expect(factoryAlbums).toMatchObject(
        validatedAPIAlbums.map((album) => {
          return omitProperties(album, ["artistName", "artistUsername"]);
        }),
      );

      for (const album of validatedAPIAlbums) {
        const artist = await database.user.findUniqueOrThrow({ where: { id: album.userId } });
        expect(album.artistName).toBe(artist.artistName);
        expect(album.artistUsername).toBe(artist.username);
      }
    });
  });
});

describe("/api/albums/:albumId", () => {
  describe("GET", () => {
    test("200: Responds with the given album", async () => {
      const factoryUser = await userFactory.create();
      const factoryAlbum = await albumFactory.create({
        artist: { connect: { id: factoryUser.id } },
      });

      const {
        body: { album: apiAlbum },
      } = await request(app).get(`/api/albums/${factoryAlbum.id}`).expect(200);

      const validatedAPIAlbum = parsePublicAlbum(apiAlbum);

      expect(factoryAlbum).toMatchObject(
        omitProperties(validatedAPIAlbum, ["artistName", "artistUsername"]),
      );
      expect(validatedAPIAlbum.artistName).toBe(factoryUser.artistName);
      expect(validatedAPIAlbum.artistUsername).toBe(factoryUser.username);
    });
    test("400: Gives an error if albumId is not a UUID", async () => {
      const {
        body: { error },
      } = await request(app).get("/api/albums/hello").expect(400);
      expect(error.message).toBe("INVALID_UUID");
    });
    test("404: Gives an error if album not found in database", async () => {
      const missingId = randomUUID();
      const {
        body: { error },
      } = await request(app).get(`/api/albums/${missingId}`).expect(404);
      expect(error.message).toBe("ALBUM_NOT_FOUND");
    });
  });
  describe("POST", () => {
    test("201: Posts an album to the database and responds with the ID", async () => {
      const factoryUser = await userFactory.create();
      const album: AlbumToPost = {
        userId: factoryUser.id,
        name: "Neural Anthems",
        description: "My very awesome album",
        frontCover: "path/to/front-cover.png",
        backCover: "path/to/back-cover.png",
      };

      const {
        body: { albumId },
      } = await request(app).post(`/api/albums`).send(album).expect(201);

      const database = getPrismaClient();
      const postedAlbum = parseAlbum(await database.album.findUnique({ where: { id: albumId } }));
      expect(postedAlbum).toMatchObject(album);
    });
    test("201: Allow optional properties to be left out", async () => {
      const factoryUser = await userFactory.create();
      const album: AlbumToPost = {
        userId: factoryUser.id,
        name: "Neural Anthems",
      };

      const {
        body: { albumId },
      } = await request(app).post(`/api/albums`).send(album).expect(201);

      const database = getPrismaClient();
      const postedAlbum = parseAlbum(await database.album.findUnique({ where: { id: albumId } }));
      expect(postedAlbum).toMatchObject(album);
    });
    test("400: Error on extra properties", async () => {
      const factoryUser = await userFactory.create();
      const album = {
        userId: factoryUser.id,
        name: "Neural Anthems",
        extraKey: "Extra property",
      };

      const {
        body: { error },
      } = await request(app).post(`/api/albums`).send(album).expect(400);
      error.forEach((errorItem: ZodError["issues"][number]) => {
        expect(errorItem.code).toBe("unrecognized_keys");
        expect(errorItem.message).toBe('Unrecognized key: "extraKey"');
      });
    });
    test("400: Do not allow name to be left out", async () => {
      const factoryUser = await userFactory.create();
      const album = {
        userId: factoryUser.id,
      };

      const {
        body: { error },
      } = await request(app).post(`/api/albums`).send(album).expect(400);
      error.forEach((errorItem: ZodError["issues"][number]) => {
        expect(errorItem.code).toBe("invalid_type");
        expect(errorItem.message).toContain("received undefined");
      });
    });
    test("404: Gives an error if user not in database", async () => {
      const missingId = randomUUID();
      const album: AlbumToPost = {
        userId: missingId,
        name: "Neural Anthems",
      };

      const {
        body: { error },
      } = await request(app).post(`/api/albums`).send(album).expect(404);
      expect(error.message).toBe("USER_NOT_FOUND");
    });
  });
});
