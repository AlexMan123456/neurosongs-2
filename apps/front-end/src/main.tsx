import { ModeProvider, ScreenSizeProvider } from "@alextheman/components";

import "src/index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "src/App.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ScreenSizeProvider>
      <ModeProvider>
        <App />
      </ModeProvider>
    </ScreenSizeProvider>
  </BrowserRouter>,
);
