import { createContext } from "react";

import type { ThemeProviderState } from "@/types/type";
const initialState: ThemeProviderState = {
  theme: "system",
  systemTheme: "dark",
  setTheme: () => null,
  isDark: false,
};
export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);
