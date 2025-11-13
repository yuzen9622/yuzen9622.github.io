import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

import i18n from "@/i18n";

import { ProfileProviderContext } from "./ProfileContextProvider";

import type { ReactNode } from "react";
import type { ProfileProviderState } from "@/types/type";
const initialState: ProfileProviderState = {
  navigation: [
    { title: i18n.t("mySelf.name"), route: "/" },
    { title: "Project", route: "/projects" },
    { title: "Contact", route: "/contact" },
  ],
  mySelf: {
    name: i18n.t("mySelf.name"),
    nickName: i18n.t("mySelf.nickName"),
    bio: [i18n.t("mySelf.bio.0"), 1000, i18n.t("mySelf.bio.1"), 1000],
    country: i18n.t("mySelf.country"),
    email: "oscar48079@gmail.com",
    avatar: "/avatar.webp",
    description: i18n.t("mySelf.description"),
    phone: i18n.t("mySelf.phone"),
    content: i18n.t("mySelf.content"),
  },
  myAward: [
    {
      title: i18n.t("myAward.0.title"),
      time: i18n.t("myAward.0.time"),
      description: i18n.t("myAward.0.description"),
    },
    {
      title: i18n.t("myAward.1.title"),
      time: i18n.t("myAward.1.time"),
      description: i18n.t("myAward.1.description"),
    },
    {
      title: i18n.t("myAward.2.title"),
      time: i18n.t("myAward.2.time"),
      description: i18n.t("myAward.2.description"),
    },
  ],
  myCard: [
    {
      title: i18n.t("myCard.0.title"),
      description: i18n.t("myCard.0.description"),
    },
    {
      title: i18n.t("myCard.1.title"),
      description: i18n.t("myCard.1.description"),
    },
    {
      title: i18n.t("myCard.2.title"),
      description: i18n.t("myCard.2.description"),
    },
  ],

  projects: [],
  socialLink: [
    {
      title: "Instagram",
      link: "https://www.instagram.com/zn._622/",
      desc: "My live!",
      icon: <FaInstagram size={25} />,
    },
    {
      title: "GitHub",
      link: "https://github.com/yuzen9622/",
      desc: "Let's dev some cool thing.",
      icon: <FaGithub size={25} />,
    },
    {
      title: "LinkedIn",
      link: "https://www.linkedin.com/in/yu-zen-tsao-52824233b/",
      icon: <FaLinkedin size={25} />,
      desc: "Need Full Stack Developer ?",
    },
  ],
  techIcons: {
    react: "React.js",
    typescript: "TypeScript",
    javascript: "JavaScript",
    php: "PHP",
    mysql: "MySQL",
    mongodb: "MongoDB",
    nodedotjs: "Node.js",
    nextdotjs: "Next.js",
    supabase: "Supabase",
    html5: "HTML5",
    css: "CSS3",
    django: "Django",
    python: "Python",
    tailwindcss: "Tailwind CSS",
  },
};
export function ProfileProvider({ children }: { children: ReactNode }) {
  return (
    <ProfileProviderContext.Provider value={initialState}>
      {children}
    </ProfileProviderContext.Provider>
  );
}
