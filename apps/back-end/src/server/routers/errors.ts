import type { ErrorRequestHandler } from "express";

import { APIError, parseEnv } from "@alextheman/utility";
import z, { ZodError } from "zod";

const ENV = parseEnv(process.env.NODE_ENV);

export const zodErrors: ErrorRequestHandler = (error, _request, response, next) => {
  if (error instanceof ZodError) {
    if (z.treeifyError(error).errors.includes("Invalid UUID")) {
      response.status(400).send({ error: { message: "INVALID_UUID" } });
      return;
    }
    response.status(400).send({ error: JSON.parse(error.message) });

    return;
  }
  next(error);
};

export const customErrors: ErrorRequestHandler = (error, _request, response, next) => {
  if (error instanceof APIError) {
    if (ENV !== "test") {
      console.error(error);
    }
    response.status(error.status).send({ error });
    return;
  }
  next(error);
};

export const internalServerError: ErrorRequestHandler = (error, _request, response, _next) => {
  if (ENV !== "test") {
    console.error(error);
  }
  response.status(500).send({ error });
};
