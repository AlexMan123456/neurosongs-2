import type { APIErrorMap } from "src/errors/defaultAPIErrors";

import { APIError, removeDuplicates } from "@alextheman/utility";
import axios from "axios";

import defaultAPIErrors from "src/errors/defaultAPIErrors";

function formatAPIError(error: APIError, apiErrorMap?: APIErrorMap): string {
  const allErrors: APIErrorMap = !apiErrorMap ? { ...defaultAPIErrors } : {};
  if (apiErrorMap) {
    const allErrorCodes = removeDuplicates([
      ...Object.keys(defaultAPIErrors),
      ...Object.keys(apiErrorMap),
    ]);
    for (const code of allErrorCodes) {
      if (
        // If both the default message and given message both strings, the provided message takes priority.
        (typeof apiErrorMap[code] === "string" && typeof defaultAPIErrors[code] === "string") ||
        // Or if the given message exists but the default doesn't, we also use the given message.
        (apiErrorMap[code] && !defaultAPIErrors[code])
      ) {
        allErrors[code] = apiErrorMap[code];
      } else if (
        // If they're both objects, we use a combination of both, always letting the provided ones take priority.
        typeof apiErrorMap[code] === "object" &&
        typeof defaultAPIErrors[code] === "object"
      ) {
        allErrors[code] = { ...defaultAPIErrors[code], ...apiErrorMap[code] };
      } else if (
        // If provided is string but default is object, use the rest of the default errors but make the default fallback the provided string.
        typeof apiErrorMap[code] === "string" &&
        typeof defaultAPIErrors[code] === "object"
      ) {
        allErrors[code] = { ...defaultAPIErrors[code], default: apiErrorMap[code] };
      } else if (
        // If provided is object but default is string, use the whole provided mapping,
        // but if a default fallback is not provided, use the default error as the fallback.
        typeof apiErrorMap[code] === "object" &&
        typeof defaultAPIErrors[code] === "string"
      ) {
        if (!Object.keys(apiErrorMap[code]).includes("default")) {
          allErrors[code] = { ...apiErrorMap[code], default: defaultAPIErrors[code] };
        } else {
          allErrors[code] = { ...apiErrorMap[code] };
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

  return "An internal server error has occured. Please try again later.";
}

function formatError(
  error: unknown,
  apiErrorMap?: APIErrorMap,
  errorFunction?: (error: unknown) => string,
): string {
  if (axios.isAxiosError(error)) {
    if (error.code === "ERR_NETWORK") {
      return "This request has been blocked by CORS policy.";
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
  return "An unknown error has occured. Please try again later.";
}

export default formatError;
