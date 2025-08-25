import express from "express";

import { customErrors } from "src/server/routers/errors";
import usersRouter from "src/server/routers/users";
const app = express();

// Routes
app.use("/api/users", usersRouter);

// Error handling
app.use(customErrors);

export default app;
