import "./index.css";
import "@/i18n";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import { ProfileProvider } from "./shared/provider/ProfileProvider.tsx";
import { ThemeProvider } from "./shared/provider/ThemeProvider.tsx";
import { BlogProvider } from "./features/blog/provider/BlogProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <ProfileProvider>
        <BlogProvider>
          <BrowserRouter>
            <HelmetProvider>
              <App />
            </HelmetProvider>
          </BrowserRouter>
        </BlogProvider>
      </ProfileProvider>
    </ThemeProvider>
  </StrictMode>
);
