import type { APIErrorMap } from "src/utility/defaultAPIErrors";

import Alert from "@mui/material/Alert";

import formatError from "src/utility/formatError";

export interface ErrorProps {
  error: unknown;
  apiErrorMap?: APIErrorMap;
  errorFunction?: (error: unknown) => string;
}

function ErrorMessage({ error, apiErrorMap, errorFunction }: ErrorProps) {
  return <Alert severity="error">{formatError(error, apiErrorMap, errorFunction)}</Alert>;
}

export default ErrorMessage;
