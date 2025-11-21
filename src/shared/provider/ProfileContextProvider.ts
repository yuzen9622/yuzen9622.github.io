import { createContext } from "react";
import type { ProfileProviderState } from "@/shared/types/type";
const initialState: ProfileProviderState = {
  navigation: [],
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
