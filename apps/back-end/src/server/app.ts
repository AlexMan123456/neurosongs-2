import { validateUUID } from "@alextheman/utility";
import express from "express";

import { customErrors, internalServerError } from "src/server/routers/errors";
import usersRouter from "src/server/routers/users";
const app = express();

// Parameter validators
usersRouter.param("userId", (_request, _response, next, userId) => {
  try {
    validateUUID(userId);
    next();
  } catch (error) {
    next(error);
  }
});

// Routes
app.use("/api/users", usersRouter);

// Error handling
app.use(customErrors);
app.use(internalServerError);

export default app;
