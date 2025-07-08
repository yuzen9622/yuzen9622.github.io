import type { JSX } from "react";
export type SystemTheme = "dark" | "light";
export type Theme = "dark" | "light" | "system";
export type SkillGroup = "framework" | "programming" | "other";
export type ProjectType = "web" | "android";
export type TechType =
  | "react"
  | "typescript"
  | "javascript"
  | "php"
  | "mysql"
  | "mongodb"
  | "nodedotjs"
  | "nextdotjs"
  | "supabase"
  | "html5"
  | "css"
  | "django"
  | "python"
  | "tailwindcss";

export type Navigation = { route: string; title: string };

export type User = {
  name: string;
  bio: Array<string | number>;
  country: string;
  email: string;
  avatar: string;
  description: string;
  content: string;
  phone: string;
};

export type Card = {
  icon: JSX.Element;
  title: string;
  description: string;
};

export type Award = { title: string; time: string; description: string };

export type Skill = { title: string; process: number; group: SkillGroup };

export type Project = {
  title: string;
  image: string;
  tech: TechType[];
  sourceUrl: string;
  previewUrl?: string;
  year: string;
  type: ProjectType;
  description: string;
};

export type SocialLink = {
  title: string;
  icon: JSX.Element;
  link: string;
  desc?: string;
};

/*provider type*/
export type ThemeProviderState = {
  theme: Theme;
  systemTheme: SystemTheme;
  setTheme: (theme: Theme) => void;
};

export type ProfileProviderState = {
  navigation: Navigation[];
  mySelf: User;
  mySkill: Skill[];
  myAward: Award[];
  myCard: Card[];
  projects: Project[];
  socialLink: SocialLink[];
};
