import { type ReactNode } from "react";
import { ProfileProviderContext } from "./ProfileContextProvider";
import { Calendar, Code, Github } from "lucide-react";
import type { ProfileProviderState } from "@/types/type";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import i18n from "@/i18n";
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
      icon: <Calendar size={30} />,
      title: i18n.t("myCard.0.title"),
      description: i18n.t("myCard.0.description"),
    },
    {
      icon: <Github size={30} />,
      title: i18n.t("myCard.1.title"),
      description: i18n.t("myCard.1.description"),
    },
    {
      icon: <Code size={30} />,
      title: i18n.t("myCard.2.title"),
      description: i18n.t("myCard.2.description"),
    },
  ],
  mySkill: [
    {
      title: i18n.t("mySkill.0.title"),
      process: Number(i18n.t("mySkill.0.process")),
      group: i18n.t("mySkill.0.group"),
    },
    { title: "TypeScript", process: 90, group: "programming" },
    { title: "C++", process: 70, group: "programming" },
    { title: "C", process: 60, group: "programming" },
    { title: "Python", process: 50, group: "programming" },
    { title: "Java", process: 40, group: "programming" },
    { title: "React.js", process: 80, group: "framework" },
    { title: "Next.js", process: 70, group: "framework" },
    { title: "Express.js", process: 60, group: "framework" },
    { title: "Git", process: 65, group: "other" },
    { title: "MySQL", process: 50, group: "other" },
    { title: "MongoDB", process: 55, group: "other" },
  ],
  projects: [
    {
      title: "chat.to",
      tech: ["typescript", "nextdotjs", "supabase", "tailwindcss"],
      image: "project/chatto.png",
      year: "2025",
      sourceUrl: "https://github.com/yuzen9622/chat.to",
      previewUrl: "https://chat-to-sage.vercel.app/introduce",
      type: "web",
      description:
        "Chat.to is a sleek, real-time chat application that lets you connect with friends and groups effortlessly. Powered by Ably, Next.js, Supabase, and NextAuth, it delivers a seamless, secure, and engaging messaging experience.",
    },
    {
      title: "Dcard Clone",
      tech: ["python", "django", "html5", "css"],
      image: "project/dcard.png",
      year: "2025",
      sourceUrl: "https://github.com/yuzen9622/Dcard",
      previewUrl: "https://dcard-rosy.vercel.app/category/",
      type: "web",
      description:
        "A personal blog demo built with Django, featuring user authentication, article creation and management, commenting, categorization, and pagination. Utilizes Django’s built-in admin for easy content management and Bootstrap for responsive design.",
    },
    {
      title: "微財",
      tech: ["react", "javascript", "mongodb", "nodedotjs", "css"],
      image: "project/微財.png",
      sourceUrl: "https://github.com/yuzen9622/Account-App",
      previewUrl: "https://account-app-phi.vercel.app/",
      type: "web",
      year: "2024",
      description:
        "A simple and intuitive budgeting app that helps you easily manage your income and expenses, giving you control over your finances.",
    },
    {
      title: "Introduction to Web Technology",
      tech: ["html5", "css", "javascript"],
      image: "project/web3.png",
      year: "2023",
      sourceUrl: "https://github.com/yuzen9622/web3",
      previewUrl: "https://web3-six-omega.vercel.app/",
      type: "web",
      description:
        "This website serves as an educational platform introducing modern web technologies, covering both frontend and backend development, as well as CI/CD practices. It provides an overview of essential tools and frameworks used in the creation and deployment of modern websites and web applications.",
    },
    {
      title: "Weather App",
      tech: ["react", "javascript", "css"],
      image: "project/weatherapp.png",
      year: "2023",
      sourceUrl: "https://github.com/yuzen9622/weather-app",
      previewUrl: "https://yuzen9622.github.io/weather-app/",
      type: "web",
      description:
        "A React-based weather app that fetches real-time and 3-hour interval forecasts from Taiwan's Central Weather Bureau API. It features location selection across Taiwan, responsive design for mobile devices, and dynamic display of temperature, humidity, wind speed, and weather conditions.",
    },
  ],
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
