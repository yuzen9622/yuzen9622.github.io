import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Calendar, Code, Github } from "lucide-react";
import AnimatedContent from "../gsap/aniamtion/AnimatedContent";
import type { AboutCard } from "@/type";

const aboutCard: AboutCard[] = [
  {
    icon: <Calendar size={30} />,
    title: "2+",
    description: "Years experience",
  },
  { icon: <Github size={30} />, title: "10+", description: "Projects" },
  { icon: <Code size={30} />, title: "3+", description: "Programming languge" },
];

export default function AboutCard() {
  return (
    <section className=" flex    bg-transparent w-11/12 lg:flex-row flex-col gap-3">
      {aboutCard.map((item, index) => (
        <AnimatedContent
          key={index}
          className=" w-full flex  justify-center"
          initialOpacity={1}
        >
          <Card className="flex-1 flex flex-col items-center justify-center gap-2  hover:-translate-y-1  hover:shadow-md transition-transform ">
            <Card className=" bg-gradient-to-r from-slate-100  to-slate-300  rounded-full text-slate-600 p-2">
              {item.icon}
            </Card>
            <CardContent className="text-2xl text-slate-600 dark:text-slate-200 font-extrabold">
              {item.title}
            </CardContent>
            <CardDescription className="font-bold">
              {item.description}
            </CardDescription>
          </Card>
        </AnimatedContent>
      ))}
    </section>
  );
}
