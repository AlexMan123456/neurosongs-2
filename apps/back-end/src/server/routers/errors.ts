// All error-handling functions must be arrow functions so that they can be typed as such in Express. As such, we must disable
// the func-style rule because that expects functions declared with the function keyword.
/* eslint-disable func-style */
import type { ErrorRequestHandler } from "express";

import { APIError } from "@alextheman/utility";

export const customErrors: ErrorRequestHandler = (error, _request, response, next) => {
  if (error instanceof APIError) {
    response.status(error.status).send({ error });
  }
  next(error);
};
