import Alert from "@mui/material/Alert";

export interface ErrorProps {
  error: unknown;
}

function ErrorMessage({ error }: ErrorProps) {
  return (
    <Alert severity="error">
      {error instanceof Error ? error.message : "An error has occured"}
    </Alert>
  );
}

export default ErrorMessage;
