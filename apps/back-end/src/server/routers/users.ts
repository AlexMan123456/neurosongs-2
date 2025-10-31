import express from "express";

import getPrismaClient from "src/database/client";
import { selectAlbums } from "src/server/models/albums";
import { selectSongs } from "src/server/models/songs";
import { insertUser, selectUserById, selectUsers, updateUser } from "src/server/models/users";
import parseQueryParameter from "src/utility/parseQueryParameter";

const usersRouter = express.Router();

usersRouter
  .route("/")
  .get(async (request, response, next) => {
    const database = getPrismaClient();
    try {
      const limit = parseQueryParameter(request.query.limit, "INVALID_LIMIT");
      const pageNumber = parseQueryParameter(request.query.page, "INVALID_PAGE_NUMBER");
      const usersResponse = await selectUsers(database, limit, pageNumber);
      response.status(200).send(usersResponse);
    } catch (error) {
      next(error);
    }
  })
  .post(async (request, response, next) => {
    const database = getPrismaClient();
    try {
      const userId = await insertUser(database, request.body);
      response.status(201).send({ userId });
    } catch (error) {
      next(error);
    }
  });

usersRouter
  .route("/:userId")
  .get<{ userId: string }>(async (request, response, next) => {
    const database = getPrismaClient();
    try {
      const user = await selectUserById(database, request.params.userId);
      response.status(200).send({ user });
    } catch (error) {
      next(error);
    }
  })
  .put<{ userId: string }>(async (request, response, next) => {
    const database = getPrismaClient();
    try {
      await database.$transaction(async (transaction) => {
        await selectUserById(transaction, request.params.userId);
        await updateUser(transaction, request.params.userId, request.body);
        response.status(204).send({});
      });
    } catch (error) {
      next(error);
    }
  });

usersRouter.route("/:userId/albums").get<{ userId: string }>(async (request, response, next) => {
  const database = getPrismaClient();
  try {
    await database.$transaction(async (transaction) => {
      await selectUserById(transaction, request.params.userId);
      const limit = parseQueryParameter(request.query.limit, "INVALID_LIMIT");
      const pageNumber = parseQueryParameter(request.query.page, "INVALID_PAGE_NUMBER");
      const albumsResponse = await selectAlbums(transaction, limit, pageNumber, {
        userId: request.params.userId,
      });
      response.status(200).send(albumsResponse);
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.route("/:userId/songs").get<{ userId: string }>(async (request, response, next) => {
  const database = getPrismaClient();
  try {
    await database.$transaction(async (transaction) => {
      await selectUserById(transaction, request.params.userId);
      const limit = parseQueryParameter(request.query.limit, "INVALID_LIMIT");
      const pageNumber = parseQueryParameter(request.query.page, "INVALID_PAGE_NUMBER");
      const songsResponse = await selectSongs(transaction, limit, pageNumber);
      response.status(200).send(songsResponse);
    });
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
