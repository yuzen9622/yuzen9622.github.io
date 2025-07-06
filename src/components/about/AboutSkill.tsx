import {
  Code2,
  Ellipsis,
  GalleryVerticalEnd,
  Puzzle,
  SquareFunction,
} from "lucide-react";
import AnimatedContent from "../gsap/aniamtion/AnimatedContent";
import RotatingText from "../gsap/text/RotatingText";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { AboutSkill } from "@/type";
import AnimationProgress from "./ui/AnimationProgress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const skills: AboutSkill[] = [
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
];

export default function AboutSkill() {
  return (
    <AnimatedContent
      className=" w-full flex  justify-center"
      initialOpacity={1}
    >
      <Card className="bg-white/80 backdrop-blur-xs border-0 p-5  shadow-lg w-11/12 dark:bg-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-3   ">
            <Card className=" text-slate-700   dark:text-slate-200  p-2 rounded-md ">
              <SquareFunction className="w-5 h-5" />
            </Card>

            <RotatingText
              texts={["Programming", "Framwork", "SQL", "CICD"]}
              mainClassName="text-slate-700 font-bold text-2xl dark:text-slate-200"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={3000}
            />
            <p className=""></p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full  ">
              <TabsTrigger className="  outline-none border-none" value="all">
                <GalleryVerticalEnd />
                <p className="sm:block hidden"> All</p>
              </TabsTrigger>
              <TabsTrigger value="programming">
                <Code2 />
                <p className="sm:block hidden">Programming</p>
              </TabsTrigger>
              <TabsTrigger value="framwork">
                <Puzzle />
                <p className="sm:block hidden">Framwork</p>
              </TabsTrigger>
              <TabsTrigger value="other">
                <Ellipsis />
                <p className="sm:block hidden"> Other</p>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="grid gap-8 lg:grid-cols-2  ">
                {skills.map((skill, index) => (
                  <AnimatedContent
                    key={index}
                    delay={index / 2 / 10}
                    distance={50}
                    threshold={0}
                  >
                    <AnimationProgress skill={skill} delay={index * 100} />
                  </AnimatedContent>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="programming">
              <div className="grid  lg:grid-cols-2 gap-8">
                {skills.map((skill, index) => {
                  if (skill.group === "programming")
                    return (
                      <AnimatedContent
                        key={index}
                        delay={index / 2 / 10}
                        distance={50}
                        threshold={0.1}
                      >
                        <AnimationProgress skill={skill} delay={index * 100} />
                      </AnimatedContent>
                    );
                })}
              </div>
            </TabsContent>
            <TabsContent value="framwork">
              <div className="grid  lg:grid-cols-2 gap-8">
                {skills.map((skill, index) => {
                  if (skill.group === "framwork")
                    return (
                      <AnimatedContent
                        key={index}
                        delay={index / 2 / 10}
                        distance={50}
                        threshold={0.1}
                      >
                        <AnimationProgress skill={skill} delay={index * 100} />
                      </AnimatedContent>
                    );
                })}
              </div>
            </TabsContent>
            <TabsContent value="other">
              <div className="grid  lg:grid-cols-2 gap-8">
                {skills.map((skill, index) => {
                  if (skill.group === "other")
                    return (
                      <AnimatedContent
                        key={index}
                        delay={index / 2 / 10}
                        distance={50}
                        threshold={0.1}
                      >
                        <AnimationProgress skill={skill} delay={index * 100} />
                      </AnimatedContent>
                    );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </AnimatedContent>
  );
}
