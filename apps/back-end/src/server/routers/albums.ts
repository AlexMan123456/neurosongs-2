import express from "express";

import getPrismaClient from "src/database/client";
import { postAlbum, selectAlbumById, selectAlbums } from "src/server/models/albums";
import { selectUserById } from "src/server/models/users";
import parseQueryParameter from "src/utility/parseQueryParameter";

const albumsRouter = express.Router();

albumsRouter
  .route("/")
  .get(async (request, response, next) => {
    const database = getPrismaClient();
    try {
      const limit = parseQueryParameter(request.query.limit, "INVALID_LIMIT");
      const pageNumber = parseQueryParameter(request.query.page, "INVALID_PAGE_NUMBER");
      const albumsResponse = await selectAlbums(database, limit, pageNumber);
      response.status(200).send(albumsResponse);
    } catch (error) {
      next(error);
    }
  })
  .post(async (request, response, next) => {
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
