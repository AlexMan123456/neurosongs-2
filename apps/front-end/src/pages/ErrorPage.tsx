import type { FallbackProps } from "react-error-boundary";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import formatError from "src/errors/formatError";

function ErrorPage({ error, resetErrorBoundary }: FallbackProps) {
  const message = formatError(error, undefined, (error) => {
    if (error instanceof Error) {
      if (import.meta.env.DEV) {
        return error.stack ?? error.message;
      }
      return error.message;
    }
    return "An unknown error has occurred. Please try again later.";
  });
  return (
    <Box sx={{ paddingX: 50, paddingTop: 10 }}>
      <Alert severity="error">
        <Typography variant="h6" sx={{ paddingLeft: 2, paddingBottom: 2 }}>
          Failed to load page:
        </Typography>
        {import.meta.env.DEV && (error as Error).stack ? (
          message.split("\n").map((line, index) => {
            return <Typography key={index}>{line}</Typography>;
          })
        ) : (
          <Typography>{message}</Typography>
        )}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={resetErrorBoundary}>Return to homepage</Button>
        </Box>
      </Alert>
    </Box>
  );
}

export default ErrorPage;
