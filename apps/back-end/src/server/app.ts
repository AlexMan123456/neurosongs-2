import { APIError } from "@alextheman/utility";
import cors from "cors";
import express from "express";

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
usersRouter.param("userId", validateUUID);
songsRouter.param("songId", validateUUID);

// Routes
app.use("/api/users", usersRouter);
app.use("/api/songs", songsRouter);

// Error handling
app.use(zodErrors);
app.use(customErrors);
app.use(internalServerError);

export default app;
