import { APIError } from "@alextheman/utility";
import axios from "axios";

function formatAPIError(error: APIError): string {
  if (error.status === 404) {
    return (
      {
        USER_NOT_FOUND: "Could not find user.",
        SONG_NOT_FOUND: "Could not find song.",
        ALBUM_NOT_FOUND: "Could not find album.",
      }[error.message] ?? "The thing you are trying to look for does not exist."
    );
  }
  if (error.status === 401 || error.status === 403) {
    return "You do not have permission to do this.";
  }
  return "Error with API connection. Please try again later.";
}

function formatError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (APIError.check(error.response?.data.error)) {
      return formatAPIError(error.response.data.error);
    }
    return error.message;
  }
  return "An unknown error has occured. Please try again later.";
}

export default formatError;
