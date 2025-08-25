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
