import { ModeProvider, ScreenSizeProvider, SnackbarProvider } from "@alextheman/components";

import "src/index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "src/App";

createRoot(document.getElementById("root")!).render(
  <SnackbarProvider>
    <BrowserRouter>
      <ScreenSizeProvider>
        <ModeProvider>
          <App />
        </ModeProvider>
      </ScreenSizeProvider>
    </BrowserRouter>
  </SnackbarProvider>,
);
