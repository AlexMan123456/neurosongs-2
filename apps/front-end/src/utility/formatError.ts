import type { APIErrorMap } from "src/utility/defaultAPIErrors";

import { APIError } from "@alextheman/utility";
import axios from "axios";

import formatAPIError from "src/utility/formatAPIError";

function formatError(
  error: unknown,
  apiErrorMap?: APIErrorMap,
  errorFunction?: (error: unknown) => string,
): string {
  try {
    if (axios.isAxiosError(error)) {
      if (error.code === "ERR_NETWORK") {
        return "An error with the network has occurred. Please check your internet connection or try again later.";
      }
      if (error.code === "ECONNABORTED") {
        return "The request to the server timed out. Please try again later.";
      }
      if (APIError.check(error.response?.data.error)) {
        return formatAPIError(error.response.data.error, apiErrorMap);
      }
      return error.message;
    }

    if (errorFunction) {
      return errorFunction(error);
    }
    return "An unknown error has occurred. Please try again later.";
  } catch (error) {
    if (error instanceof TypeError && error.message === "INTEGER_PARSING_ERROR") {
      console.error("One or more keys in provided apiErrorMap is not an integer.");
    }
    return "An unknown error has occurred. Please try again later.";
  }
}

export default formatError;
