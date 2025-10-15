import type { APIError, HTTPErrorCodes } from "@alextheman/utility";

export type MessageMap = Record<string, string | ((error: APIError) => string)> & {
  default: string | ((error: APIError) => string);
};

export type APIErrorMap = Partial<Record<string | HTTPErrorCodes, string | MessageMap>>;

const defaultAPIErrors: APIErrorMap = {
  400: {
    INVALID_UUID: "The ID type you are trying to send is invalid. Please try again.",
    default: "Error in data being sent. Please try again.",
  },
  401: "You do not have permission to do this.",
  403: "You do not have permission to do this.",
  404: {
    USER_NOT_FOUND: "Could not find user.",
    SONG_NOT_FOUND: "Could not find song.",
    ALBUM_NOT_FOUND: "Could not find album.",
    default: "The thing you are trying to look for does not exist.",
  },
  418: "Enjoy your tea!",
  500: "An unknown error has occurred. Please try again later.",
};

export default defaultAPIErrors;
