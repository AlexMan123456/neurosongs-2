import { APIError } from "@alextheman/utility";

function parseQueryParameter(parameter: unknown, errorMessage?: string): number | undefined {
  if (parameter === undefined) {
    return undefined;
  }
  const parsedResult = parseInt(parameter as string);
  if (isNaN(parsedResult) && parameter !== undefined) {
    throw new APIError(400, errorMessage);
  }
  return parsedResult;
}

export default parseQueryParameter;
