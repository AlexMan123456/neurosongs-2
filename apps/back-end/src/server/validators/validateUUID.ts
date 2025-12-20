import type { RequestParamHandler } from "express";

import z from "zod";

const validateUUID: RequestParamHandler = (_request, _response, next, id) => {
  try {
    z.uuid().parse(id);
    next();
  } catch (error) {
    next(error);
  }
};

export default validateUUID;
