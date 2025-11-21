import { useContext } from "react";

import { ThemeProviderContext } from "@/shared/provider/ThemeContextProvider";

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
