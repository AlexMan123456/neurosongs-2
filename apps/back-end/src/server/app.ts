import { stringListToArray } from "@alextheman/utility";
import express from "express";

import albumsRouter from "src/server/routers/albums";
import { customErrors, internalServerError, zodErrors } from "src/server/routers/errors";
import songsRouter from "src/server/routers/songs";
import usersRouter from "src/server/routers/users";
import validateUUID from "src/server/validators/validateUUID";
import setupCors from "src/utility/setupCors";

const app = express();

// Allow Cross Origin Resource Sharing
app.use(setupCors(stringListToArray(process.env.ALLOWED_ORIGINS ?? "")));

// Parse request body
app.use(express.json());

// Parameter validators
albumsRouter.param("albumId", validateUUID);
songsRouter.param("songId", validateUUID);
usersRouter.param("userId", validateUUID);

// Routes
app.use("/api/albums", albumsRouter);
app.use("/api/songs", songsRouter);
app.use("/api/users", usersRouter);

// Error handling
app.use(zodErrors);
app.use(customErrors);
app.use(internalServerError);

export default app;
