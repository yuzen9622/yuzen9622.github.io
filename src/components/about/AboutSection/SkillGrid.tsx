import {
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiTailwindcss,
  SiNextdotjs,
  SiPostgresql,
  SiGit,
  SiCplusplus,
  SiMongodb,
} from "react-icons/si";
import type { Skill } from "@/types/type";
import SkillMarquee from "../ui/SkillMarquee";
// 定義每個技能的資料
const skills: Skill[] = [
  {
    name: "React",
    icon: <SiReact size={30} />,
    color: "#61DAFB",
    gridClass: "flex-2",
  },
  {
    name: "TypeScript",
    icon: <SiTypescript size={25} />,
    color: "#3178C6",
    gridClass: "flex-1",
  },
  {
    name: "MongoDB",
    icon: <SiMongodb size={30} />,
    color: "#47A230",

    gridClass: "flex-1",
  },
  {
    name: "Node.js",
    icon: <SiNodedotjs size={30} />,
    color: "#5FA04E",
    gridClass: "flex-1",
  },
  {
    name: "Git",
    icon: <SiGit size={30} />,
    color: "#F05032",
    gridClass: "flex-2",
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss size={30} />,
    color: "#06B6D4",
    gridClass: "flex-1",
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs size={30} />,
    color: "#000000",
    gridClass: "flex-1",
  },
  {
    name: "PostgreSQL",
    icon: <SiPostgresql size={30} />,
    color: "#4169E1",
    gridClass: "flex-1",
  },
  {
    name: "C++",
    icon: <SiCplusplus size={30} />,
    color: "#00599C",
    gridClass: "flex-2",
  },
];

export default function SkillGrid() {
  return (
    <div className="min-w-0 flex    gap-4 flex-col flex-1">
      <SkillMarquee skills={skills.slice(0, 3)} />
      <SkillMarquee skills={skills.slice(3, 6)} direction="left" />
      <SkillMarquee skills={skills.slice(6, 9)} />
    </div>
  );
}
