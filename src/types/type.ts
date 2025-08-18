import type { JSX } from "react";
export type SystemTheme = "dark" | "light";
export type Theme = "dark" | "light" | "system";
export type SkillGroup = "all" | "fw" | "pr" | "other";
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

export type TechIcon = Record<TechType, string>;

export type Navigation = { route: string; title: string };

export type User = {
  name: string;
  nickName: string;
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

export type Skill = { title: string; process: number; group: string };
export type ProjectContent = { overview: string; feature: string };
export type Project = {
  id: number;
  title: string;
  image: string;
  tech: TechType[];
  sourceUrl: string;
  previewUrl?: string;
  year: string;
  content: ProjectContent;
  type: ProjectType;
  description: string;
};

export type SocialLink = {
  title: string;
  icon: JSX.Element;
  link: string;
  desc?: string;
};

export type Contact = {
  name: string;
  email: string;
  message: string;
  time: string;
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
  techIcons: TechIcon;
};
