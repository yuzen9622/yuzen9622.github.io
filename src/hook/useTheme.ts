import { useContext } from "react";
import { ThemeProviderContext } from "@/components/provider/ThemeContextProvider";
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
