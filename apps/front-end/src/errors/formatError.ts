import type { HTTPErrorCode } from "@alextheman/utility";
import type { APIErrorMap, MappingWithRequiredDefault } from "src/errors/defaultAPIErrors";

import { APIError, parseIntStrict, removeDuplicates } from "@alextheman/utility";
import axios from "axios";

import defaultAPIErrorsImport from "src/errors/defaultAPIErrors";

function formatAPIError(error: APIError, apiErrorMap?: APIErrorMap): string {
  // I know for a fact that defaultAPIErrors includes a default property, so we can assign it this type.
  const defaultAPIErrors: Partial<Record<string | HTTPErrorCode, MappingWithRequiredDefault>> = {
    ...defaultAPIErrorsImport,
  };
  const allErrors: APIErrorMap = !apiErrorMap ? { ...defaultAPIErrorsImport } : {};
  if (apiErrorMap) {
    const allErrorCodes: (string | HTTPErrorCode)[] = removeDuplicates([
      ...Object.keys(defaultAPIErrors),
      ...Object.keys(apiErrorMap),
    ]);
    for (const code of allErrorCodes) {
      // Ensure the HTTP Error code is a number when stringified (this will error if not)
      parseIntStrict(code.toString());
      // If both the default message and given message both strings, the provided message takes priority.
      if (typeof apiErrorMap[code] === "string" && typeof defaultAPIErrors[code] === "string") {
        allErrors[code] = apiErrorMap[code];
      } else if (apiErrorMap[code] && !defaultAPIErrors[code]) {
        // Provide a default default if default not provided.
        if (typeof apiErrorMap[code] === "object" && !apiErrorMap[code].default) {
          allErrors[code] = {
            ...apiErrorMap[code],
            default: "An internal server error has occurred. Please try again later.",
          };
        }
        // If default provided, go with that.
        else if (typeof apiErrorMap[code] === "object" && apiErrorMap[code].default) {
          allErrors[code] = apiErrorMap[code] as MappingWithRequiredDefault;
        }
        // If it's a string, the error mapping can handle strings alone.
        else if (typeof apiErrorMap[code] === "string") {
          allErrors[code] = apiErrorMap[code];
        }
        // If they're both objects, we use a combination of both, always letting the provided ones take priority.
      } else if (
        typeof apiErrorMap[code] === "object" &&
        typeof defaultAPIErrors[code] === "object"
      ) {
        allErrors[code] = {
          ...defaultAPIErrors[code],
          ...apiErrorMap[code],
        };
      } else if (
        // If provided is string but default is object, use the rest of the default errors but make the default fallback the provided string.
        typeof apiErrorMap[code] === "string" &&
        typeof defaultAPIErrors[code] === "object"
      ) {
        allErrors[code] = {
          ...defaultAPIErrors[code],
          default: apiErrorMap[code],
        };
      } else if (
        // If provided is object but default is string, use the whole provided mapping,
        // but if a default fallback is not provided, use the default error as the fallback.
        typeof apiErrorMap[code] === "object" &&
        typeof defaultAPIErrors[code] === "string"
      ) {
        if (!Object.keys(apiErrorMap[code]).includes("default")) {
          allErrors[code] = {
            ...apiErrorMap[code],
            default: defaultAPIErrors[code],
          };
          // Just assign allErrors[code] to be the apiErrorMap[code] here, since we've already checked to see if default exists previously.
        } else {
          allErrors[code] = { ...apiErrorMap[code] } as MappingWithRequiredDefault;
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

  return "An internal server error has occurred. Please try again later.";
}

function formatError(
  error: unknown,
  apiErrorMap?: APIErrorMap,
  errorFunction?: (error: unknown) => string,
): string {
  try {
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
  } catch (error) {
    if (error instanceof TypeError && error.message === "INTEGER_PARSING_ERROR") {
      console.error("One or more keys in provided apiErrorMap is not an integer.");
    }
    return "An unknown error has occurred. Please try again later.";
  }
}

export default formatError;
