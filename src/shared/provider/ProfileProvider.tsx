import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

import { ProfileProviderContext } from "./ProfileContextProvider";

import type { ReactNode } from "react";
import type { ProfileProviderState } from "@/shared/types";
import { useTranslation } from "react-i18next";

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const initialState: ProfileProviderState = {
    navigation: [
      { title: "Yuzen", route: "" },
      { title: "Project", route: "projects" },
      { title: "Blog", route: "blog" },
      { title: "Contact", route: "contact" },
    ],
    profile: {
      name: "Yuzen",
      nickName: "Small Z",
      email: "oscar48079@gmail.com",
      avatar: "/avatar.webp",
      phone: "+886965303635",
      roles: t("profile.roles", { returnObjects: true }),
      country: t("profile.country"),
      headline: t("profile.headline"),
      tagline: t("profile.tagline"),
      shortDesc: t("profile.short_description"),
      desc: t("profile.description"),
    },
    projects: [],
    socialLink: [
      {
        title: "Instagram",
        link: "https://www.instagram.com/zn._622/",
        icon: <FaInstagram size={25} />,
        desc: t("social.instagram"),
      },
      {
        title: "GitHub",
        link: "https://github.com/yuzen9622/",
        desc: t("social.github"),
        icon: <FaGithub size={25} />,
      },
      {
        title: "LinkedIn",
        link: "https://www.linkedin.com/in/yu-zen-tsao-52824233b/",
        icon: <FaLinkedin size={25} />,
        desc: t("social.linkedin"),
      },
    ],
    awards: [
      {
        id: "lung-hwa",
        title: t("award:awards.lung-hwa.title"),
        description: t("award:awards.lung-hwa.description"),
        time: "2025-06-09",
      },
      {
        id: "tqc-python",
        title: t("award:awards.tqc-python.title"),
        description: t("award:awards.tqc-python.description"),
        time: "2025-06-13",
      },
      {
        id: "apcs",
        title: t("award:awards.apcs.title"),
        description: t("award:awards.apcs.description"),
        time: "2025-06-14",
      },
      {
        id: "ytp",
        title: t("award:awards.ytp.title"),
        description: t("award:awards.ytp.description"),
        time: "2025-08-23",
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
  return (
    <ProfileProviderContext.Provider value={initialState}>
      {children}
    </ProfileProviderContext.Provider>
  );
}
