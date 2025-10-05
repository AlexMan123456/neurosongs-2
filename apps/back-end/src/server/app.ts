import express from "express";

import { customErrors, internalServerError, zodErrors } from "src/server/routers/errors";
import songsRouter from "src/server/routers/songs";
import usersRouter from "src/server/routers/users";
import validateUUID from "src/server/validators/validateUUID";
const app = express();

// Parse request body
app.use(express.json());

// Parameter validators
usersRouter.param("userId", validateUUID);

// Routes
app.use("/api/users", usersRouter);
app.use("/api/songs", songsRouter);

// Error handling
app.use(zodErrors);
app.use(customErrors);
app.use(internalServerError);

export default app;
