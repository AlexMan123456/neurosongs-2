import type { APIErrorMap } from "src/errors/defaultAPIErrors";

import { APIError } from "@alextheman/utility";
import axios from "axios";

import defaultAPIErrors from "src/errors/defaultAPIErrors";

function formatAPIError(error: APIError, apiErrorMap?: APIErrorMap): string {
  const allErrors: APIErrorMap = !apiErrorMap ? { ...defaultAPIErrors } : {};
  if (apiErrorMap) {
    for (const key in defaultAPIErrors) {
      if (typeof apiErrorMap[key] === "string" && typeof defaultAPIErrors[key] === "string") {
        allErrors[key] = apiErrorMap[key];
      } else if (
        typeof apiErrorMap[key] === "object" &&
        typeof defaultAPIErrors[key] === "object"
      ) {
        allErrors[key] = { ...defaultAPIErrors[key], ...apiErrorMap[key] };
      } else if (
        typeof apiErrorMap[key] === "string" &&
        typeof defaultAPIErrors[key] === "object"
      ) {
        allErrors[key] = { ...defaultAPIErrors[key], default: apiErrorMap[key] };
      } else if (
        typeof apiErrorMap[key] === "object" &&
        typeof defaultAPIErrors[key] === "string"
      ) {
        if (!Object.keys(apiErrorMap[key]).includes("default")) {
          allErrors[key] = { ...apiErrorMap[key], default: defaultAPIErrors[key] };
        } else {
          allErrors[key] = { ...apiErrorMap[key] };
        }
      }
    }
  }

  if (allErrors[error.status]) {
    const statusError = allErrors[error.status];
    if (typeof statusError === "string") {
      return statusError;
    } else if (typeof statusError === "object") {
      const errorFromMessage = statusError[error.message] ?? statusError.default;
      if (typeof errorFromMessage === "function") {
        return errorFromMessage(error);
      } else if (typeof errorFromMessage === "string") {
        return errorFromMessage;
      }
    }
  }

  return "Error with API. Please try again later.";
}

function formatError(
  error: unknown,
  apiErrorMap?: APIErrorMap,
  errorFunction?: (error: unknown) => string,
): string {
  if (axios.isAxiosError(error)) {
    if (APIError.check(error.response?.data.error)) {
      return formatAPIError(error.response.data.error, apiErrorMap);
    }
    return error.message;
  }

  if (errorFunction) {
    return errorFunction(error);
  }
  return "An unknown error has occured. Please try again later.";
}

export default formatError;
