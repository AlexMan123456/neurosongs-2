import { randomUUID } from "crypto";

import { parsePublicSong } from "@neurosongs/types";
import request from "supertest";
import { songFactory } from "tests/test-utilities/dataFactory";
import { describe, expect, test } from "vitest";

import getPrismaClient from "src/database/client";
import app from "src/server/app";

describe("/api/songs/:songId", () => {
  describe("GET", () => {
    test("200: Responds with the given song", async () => {
      const factorySong = await songFactory.create();
      const {
        body: { song: apiSong },
      } = await request(app).get(`/api/songs/${factorySong.id}`).expect(200);

      const validatedAPISong = parsePublicSong(apiSong);
      expect(validatedAPISong).toMatchObject(factorySong);

      const database = getPrismaClient();
      const factoryUser = await database.user.findUnique({
        where: {
          id: factorySong.userId,
        },
      });

      if (!factoryUser) {
        throw new Error("NO_USER");
      }
      expect(validatedAPISong.userId).toBe(factoryUser.id);
      expect(validatedAPISong.artistName).toBe(factoryUser.artistName);
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
