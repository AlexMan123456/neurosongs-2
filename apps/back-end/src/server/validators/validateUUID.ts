import type { RequestParamHandler } from "express";

import { parseUUID } from "@alextheman/utility";

const validateUUID: RequestParamHandler = (_request, _response, next, id) => {
  try {
    parseUUID(id);
    next();
  } catch (error) {
    next(error);
  }
};

export default validateUUID;
