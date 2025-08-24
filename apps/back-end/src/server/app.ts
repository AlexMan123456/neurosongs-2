import express from "express";

import usersRouter from "src/server/routers/users";
const app = express();

app.use("/api/users", usersRouter);

export default app;
