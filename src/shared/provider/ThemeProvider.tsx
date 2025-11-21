import { useEffect, useState } from "react";

import { ThemeProviderContext } from "./ThemeContextProvider";

import type { Theme, SystemTheme } from "@/shared/types/type";
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
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");
    setIsDark(theme === "dark");
    if (theme === "system") {
      const systemTheme: SystemTheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches
        ? "dark"
        : "light";
      setIsDark(systemTheme === "dark");
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
      setIsDark(
        (theme === "system" && systemTheme === "dark") || theme === "dark"
      );
      setTheme(theme);
    },
    isDark,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
