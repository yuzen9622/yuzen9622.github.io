import { useEffect, useState } from "react";
import type { Theme, SystemTheme } from "@/type";
import { ThemeProviderContext } from "./ContextProvider";
type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );
  const [systemTheme, setSystemTheme] = useState<SystemTheme>("dark");

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme: SystemTheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      setSystemTheme(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    systemTheme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);

      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
