import "./index.css";
import "@/i18n";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { ProfileProvider } from "./shared/provider/ProfileProvider.tsx";
import { ThemeProvider } from "./shared/provider/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <ProfileProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProfileProvider>
    </ThemeProvider>
  </StrictMode>
);
