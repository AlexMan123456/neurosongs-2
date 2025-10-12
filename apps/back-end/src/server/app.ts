import { APIError } from "@alextheman/utility";
import cors from "cors";
import express from "express";

import albumsRouter from "src/server/routers/albums";
import { customErrors, internalServerError, zodErrors } from "src/server/routers/errors";
import songsRouter from "src/server/routers/songs";
import usersRouter from "src/server/routers/users";
import validateUUID from "src/server/validators/validateUUID";

const app = express();

// Allow Cross Origin Resource Sharing
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }
      if (
        [
          "http://localhost:5173",
          "https://neurosongs.netlify.app",
          "https://neurosongs.net",
        ].includes(origin)
      ) {
        return callback(null, true);
      }
      return callback(new APIError(403, "CORS_ERROR"), false);
    },
    credentials: true,
  }),
);

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
