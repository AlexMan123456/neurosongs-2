import express from "express";

import { selectUserById, selectUsers } from "src/server/models/users";

const usersRouter = express.Router();

usersRouter.route("/").get(async (_request, response, next) => {
  try {
    const users = await selectUsers();
    response.status(200).send({ users });
  } catch (error) {
    next(error);
  }
});

usersRouter.route("/:userId").get<{ userId: string }>(async (request, response, next) => {
  try {
    const user = await selectUserById(request.params.userId);
    response.status(200).send({ user });
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
