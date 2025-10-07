import express from "express";

import { selectSongById, selectSongs } from "src/server/models/songs";

const songsRouter = express.Router();

songsRouter.route("/:songId").get<{ songId: string }>(async (request, response, next) => {
  try {
    const song = await selectSongById(request.params.songId);
    response.status(200).send({ song });
  } catch (error) {
    next(error);
  }
});

songsRouter.route("/").get(async (_request, response, next) => {
  try {
    const songsResponse = await selectSongs();
    response.status(200).send(songsResponse);
  } catch (error) {
    next(error);
  }
});

export default songsRouter;
