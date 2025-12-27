import type { PublicSong } from "@neurosongs/types";

import { fillArray, omitProperties } from "@alextheman/utility";
import { parsePublicSong } from "@neurosongs/types";
import request from "supertest";
import { describe, expect, test } from "vitest";

import { randomUUID } from "node:crypto";

import { albumFactory, songFactory, userFactory } from "tests/test-utilities/dataFactory";

import app from "src/server/app";

describe("/api/songs/:songId", () => {
  describe("GET", () => {
    test("200: Responds with the given song", async () => {
      const factoryUser = await userFactory.create();
      const factoryAlbum = await albumFactory.create({
        artist: { connect: { id: factoryUser.id } },
      });
      const factorySong = await songFactory.create({
        artist: { connect: { id: factoryUser.id } },
        album: { connect: { id: factoryAlbum.id } },
      });
      const {
        body: { song: apiSong },
      } = await request(app).get(`/api/songs/${factorySong.id}`).expect(200);

      const validatedAPISong = parsePublicSong(apiSong);

      expect(factorySong).toMatchObject(
        omitProperties(validatedAPISong, ["artistName", "artistUsername", "albumName"]),
      );
      expect(validatedAPISong.userId).toBe(factoryUser.id);
      expect(validatedAPISong.artistName).toBe(factoryUser.artistName);
      expect(validatedAPISong.artistUsername).toBe(factoryUser.username);
      expect(validatedAPISong.albumName).toBe(factoryAlbum.name);
    });
    test("400: Gives an error if songId is not a UUID", async () => {
      const {
        body: { error },
      } = await request(app).get("/api/songs/hello").expect(400);
      expect(error.message).toBe("INVALID_UUID");
    });
    test("404: Gives an error if song not in database", async () => {
      const missingId = randomUUID();

      const {
        body: { error },
      } = await request(app).get(`/api/songs/${missingId}`).expect(404);
      expect(error.message).toBe("SONG_NOT_FOUND");
    });
  });
});

describe("/api/songs", () => {
  describe("GET", () => {
    test("200: Responds with an array of all songs sorted by most recent", async () => {
      const factoryUser = await userFactory.create();
      const factoryAlbum = await albumFactory.create({
        artist: { connect: { id: factoryUser.id } },
      });
      const factorySongs = await fillArray(async () => {
        return await songFactory.create({
          artist: { connect: { id: factoryUser.id } },
          album: { connect: { id: factoryAlbum.id } },
        });
      }, 10);

      factorySongs.sort((first, second) => {
        return first.serial - second.serial;
      });

      const {
        body: { songs: apiSongs },
      }: { body: { songs: PublicSong[] } } = await request(app).get("/api/songs").expect(200);

      expect(apiSongs.length).toBe(10);
      expect(factorySongs).toMatchObject(
        apiSongs.map((apiSong) => {
          const validatedAPISong = parsePublicSong(apiSong);
          expect(validatedAPISong.artistName).toBe(factoryUser.artistName);
          expect(validatedAPISong.artistUsername).toBe(factoryUser.username);
          expect(validatedAPISong.albumName).toBe(factoryAlbum.name);
          expect(validatedAPISong.userId).toBe(factoryUser.id);
          return omitProperties(parsePublicSong(apiSong), [
            "artistName",
            "artistUsername",
            "albumName",
          ]);
        }),
      );
    });
    test("200: Gets the first 50 if there are more than 50 users", async () => {
      const factoryUser = await userFactory.create();
      const factoryAlbum = await albumFactory.create({
        artist: { connect: { id: factoryUser.id } },
      });
      const factorySongs = await fillArray(async () => {
        return await songFactory.create({ artist: { connect: { id: factoryUser.id } } });
      }, 70);

      factorySongs.sort((first, second) => {
        return first.serial - second.serial;
      });

      const {
        body: { songs: apiSongs, totalSongs, limit, pageNumber, totalPages },
      } = await request(app).get(`/api/songs`).expect(200);

      expect(totalSongs).toBe(70);
      expect(limit).toBe(50);
      expect(pageNumber).toBe(1);
      expect(totalPages).toBe(2);

      expect(apiSongs.length).toBe(50);
      expect(factorySongs.slice(0, 50)).toMatchObject(
        apiSongs.map((apiSong: PublicSong) => {
          const validatedAPISong = parsePublicSong(apiSong);
          expect(validatedAPISong.artistName).toBe(factoryUser.artistName);
          expect(validatedAPISong.artistUsername).toBe(factoryUser.username);
          expect(validatedAPISong.albumName).toBe(factoryAlbum.name);
          expect(validatedAPISong.userId).toBe(factoryUser.id);
          return omitProperties(parsePublicSong(apiSong), [
            "artistName",
            "artistUsername",
            "albumName",
          ]);
        }),
      );
    });
  });
});
