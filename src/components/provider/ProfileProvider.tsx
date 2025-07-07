import type { ReactNode } from "react";
import { ProfileProviderContext } from "./ProfileContextProvider";
import { Calendar, Code, Github } from "lucide-react";
import type { PorfileProviderState } from "@/type";

export function ProfileProvider({ children }: { children: ReactNode }) {
  const initialState: PorfileProviderState = {
    navigation: [
      { title: "Small Z", route: "/" },
      { title: "Project", route: "/projects" },
      { title: "Experience", route: "/experience" },
      { title: "Contact", route: "/contact" },
    ],
    mySelf: {
      name: "Small Z",
      bio: ["Full Stack Debugger", 1000, "Full Stack Developer", 1000],
      contry: "Hsichu, TW",
      email: "oscar48079@gmail.com",
      avatar: "/avatar.webp",
      description:
        "Hi,I'm Small Z(17y)!Now is a five-year program at National Taichung University of Science and Technology(NUTC) Student.",
      content:
        "A third-year student in the five-year program at National Taichung University of Science and Technology, majoring in Information Management.I'm passionate about web development and enjoy building applications that solve real-world problems. My current focus is on full-stack development, and I'm actively learning and working with technologies like JavaScript, React, Next.js, Node.js, Express, and MongoDB. I have experience using Socket.io for real-time communication, along with RESTful API development for client-server interaction.",
    },
    myAward: [
      {
        title: "APCS",
        time: "2025-06-14",
        description: "實作三級分 觀念四級分",
      },
      { title: "龍華程式競賽", time: "2025-06-09", description: "特優" },
      { title: "TQC Pyhton", time: "2025-06-13", description: "" },
    ],
    myCard: [
      {
        icon: <Calendar size={30} />,
        title: "2+",
        description: "Years experience",
      },
      { icon: <Github size={30} />, title: "10+", description: "Projects" },
      {
        icon: <Code size={30} />,
        title: "3+",
        description: "Programming languge",
      },
    ],
    mySkill: [
      { title: "JavaScript", process: 95, group: "programming" },
      { title: "TypeScript", process: 90, group: "programming" },
      { title: "C++", process: 70, group: "programming" },
      { title: "C", process: 60, group: "programming" },
      { title: "Python", process: 50, group: "programming" },
      { title: "Java", process: 40, group: "programming" },
      { title: "React.js", process: 80, group: "framwork" },
      { title: "Next.js", process: 70, group: "framwork" },
      { title: "Express.js", process: 60, group: "framwork" },
      { title: "Git", process: 65, group: "other" },
      { title: "MySQL", process: 50, group: "other" },
      { title: "MongoDB", process: 55, group: "other" },
    ],
    projects: [
      {
        title: "chat.to",
        tech: ["typescript", "nextdotjs", "supabase"],
        image: "project/chatto.png",
        year: "2025",
        sourceUrl: "https://github.com/yuzen9622/chat.to",
        previewUrl: "https://chat-to-sage.vercel.app/introduce",
        type: "web",
        description:
          "Chat.to is a sleek, real-time chat application that lets you connect with friends and groups effortlessly. Powered by Ably, Next.js, Supabase, and NextAuth, it delivers a seamless, secure, and engaging messaging experience.",
      },
      {
        title: "微財",
        tech: ["react", "javascript", "mongodb", "nodedotjs"],
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
    ],
  };

  return (
    <ProfileProviderContext.Provider value={initialState}>
      {children}
    </ProfileProviderContext.Provider>
  );
}
