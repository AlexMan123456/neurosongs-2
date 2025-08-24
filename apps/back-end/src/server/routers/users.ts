import express from "express";

import { selectUserById } from "src/server/models/users";
const usersRouter = express.Router();

usersRouter.route("/:userId").get(async (request, response, next) => {
  try {
    const user = await selectUserById(request.params.userId);
    response.status(200).send({ user });
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
