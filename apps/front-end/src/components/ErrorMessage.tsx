import Alert from "@mui/material/Alert";

import formatError from "src/utility/formatError";

export interface ErrorProps {
  error: unknown;
}

function ErrorMessage({ error }: ErrorProps) {
  return <Alert severity="error">{formatError(error)}</Alert>;
}

export default ErrorMessage;
