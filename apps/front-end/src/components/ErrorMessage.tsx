import Alert from "@mui/material/Alert";

export interface ErrorProps {
  error: unknown;
}

function ErrorMessage({ error }: ErrorProps) {
  return (
    <Alert severity="error">
      {error instanceof Error
        ? `Error ${error.message} occurred`
        : "An unknown error has occured. Please try again later."}
    </Alert>
  );
}

export default ErrorMessage;
