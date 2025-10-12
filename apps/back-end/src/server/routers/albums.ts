import express from "express";

import getPrismaClient from "src/database/client";
import { postAlbum, selectAlbumById } from "src/server/models/albums";
import { selectUserById } from "src/server/models/users";

const albumsRouter = express.Router();

albumsRouter.route("/").post(async (request, response, next) => {
  const database = getPrismaClient();
  try {
    await database.$transaction(async (transaction) => {
      await selectUserById(transaction, request.body.userId);
      const albumId = await postAlbum(transaction, request.body);
      response.status(201).send({ albumId });
    });
  } catch (error) {
    next(error);
  }
});

albumsRouter.route("/:albumId").get<{ albumId: string }>(async (request, response, next) => {
  const database = getPrismaClient();
  try {
    const album = await selectAlbumById(database, request.params.albumId);
    response.status(200).send({ album });
  } catch (error) {
    next(error);
  }
});

export default albumsRouter;
