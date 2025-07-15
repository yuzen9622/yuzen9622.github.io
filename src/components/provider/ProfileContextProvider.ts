import { createContext } from "react";
import type { ProfileProviderState } from "@/type";
const initialState: ProfileProviderState = {
  navigation: [
    { title: "Small Z", route: "/" },
    { title: "Project", route: "/projects" },
    { title: "Contact", route: "/contact" },
  ],
  mySelf: {
    name: "",
    nickName: "",
    bio: [],
    country: "",
    email: "",
    avatar: "",
    description: "",
    phone: "",
    content: "",
  },
  myAward: [],
  myCard: [],
  mySkill: [],
  projects: [],
  socialLink: [],
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

export const ProfileProviderContext = createContext(initialState);
