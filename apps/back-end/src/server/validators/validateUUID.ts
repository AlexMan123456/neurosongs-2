// All validator functions must be arrow functions so that they can be typed as such in Express. As such, we must disable
// the func-style rule because that expects functions declared with the function keyword.
/* eslint-disable func-style */
import type { RequestParamHandler } from "express";

import { validateUUID as validateUUIDUtility } from "@alextheman/utility";

const validateUUID: RequestParamHandler = (_request, _response, next, id) => {
  try {
    validateUUIDUtility(id);
    next();
  } catch (error) {
    next(error);
  }
};

export default validateUUID;
