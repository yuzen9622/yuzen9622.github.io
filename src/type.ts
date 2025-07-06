import type { JSX } from "react";

export type AboutType = {
  name: string;
  bio: Array<string | number>;
  contry: string;
  email: string;
  avatar: string;
  description: string;
  content: string;
};

export type AboutCard = {
  icon: JSX.Element;
  title: string;
  description: string;
};

export type AboutAward = { title: string; time: string; description: string };
export type SkillGroup = "framwork" | "programming" | "other";
export type AboutSkill = { title: string; process: number; group: SkillGroup };
export type SystemTheme = "dark" | "light";
export type Theme = "dark" | "light" | "system";

export type ThemeProviderState = {
  theme: Theme;
  systemTheme: SystemTheme;
  setTheme: (theme: Theme) => void;
};
