import type { ErrorRequestHandler } from "express";

import { APIError } from "@alextheman/utility";

export const customErrors: ErrorRequestHandler = (error, _request, response, next) => {
  if (error instanceof APIError) {
    response.status(error.status).send({ error });
  }
  next(error);
};

export const internalServerError: ErrorRequestHandler = (_error, _request, response, _next) => {
  response.status(500).send({ error: new APIError(500) });
};
