import type { ErrorRequestHandler } from "express";

import { APIError, newEnv } from "@alextheman/utility";
import { ZodError } from "zod";

const ENV = newEnv(process.env.NODE_ENV);

export const zodErrors: ErrorRequestHandler = (error, _request, response, next) => {
  if (error instanceof ZodError) {
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
