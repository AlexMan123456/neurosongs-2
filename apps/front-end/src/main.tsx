import { ModeProvider, ScreenSizeProvider, SnackbarProvider } from "@alextheman/components";

import "src/index.css";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";

import App from "src/App";
import ErrorPage from "src/pages/ErrorPage";

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary FallbackComponent={ErrorPage}>
    <SnackbarProvider>
      <BrowserRouter>
        <ScreenSizeProvider>
          <ModeProvider>
            <App />
          </ModeProvider>
        </ScreenSizeProvider>
      </BrowserRouter>
    </SnackbarProvider>
  </ErrorBoundary>,
);
