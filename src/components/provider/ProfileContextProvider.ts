import { createContext } from "react";
import type { ProfileProviderState } from "@/type";

const initialState: ProfileProviderState = {
  navigation: [],
  mySelf: {
    name: "Small Z",
    bio: ["Full Stack Debugger", 1000, "Full Stack Developer", 1000],
    country: "Hsichu, TW",
    email: "oscar48079@gmail.com",
    avatar: "/avatar.webp",
    description:
      "Hi,I'm Small Z(17y)!Now is a five-year program at National Taichung University of Science and Technology(NUTC) Student.",
    content:
      "A third-year student in the five-year program at National Taichung University of Science and Technology, majoring in Information Management.I'm passionate about web development and enjoy building applications that solve real-world problems. My current focus is on full-stack development, and I'm actively learning and working with technologies like JavaScript, React, Next.js, Node.js, Express, and MongoDB. I have experience using Socket.io for real-time communication, along with RESTful API development for client-server interaction.",
  },
  myAward: [],
  myCard: [],
  mySkill: [],
  projects: [],
};

export const ProfileProviderContext = createContext(initialState);
