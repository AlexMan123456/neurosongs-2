import express from "express";

import getPrismaClient from "src/database/client";
import { selectSongById, selectSongs } from "src/server/models/songs";

const songsRouter = express.Router();

songsRouter.route("/:songId").get<{ songId: string }>(async (request, response, next) => {
  const database = getPrismaClient();
  try {
    const song = await selectSongById(database, request.params.songId);
    response.status(200).send({ song });
  } catch (error) {
    next(error);
  }
});

songsRouter.route("/").get(async (_request, response, next) => {
  const database = getPrismaClient();
  try {
    const songsResponse = await selectSongs(database);
    response.status(200).send(songsResponse);
  } catch (error) {
    next(error);
  }
});

export default songsRouter;
