import {
  Code2,
  Ellipsis,
  GalleryVerticalEnd,
  Puzzle,
  SquareFunction,
} from "lucide-react";
import AnimatedContent from "../gsap/animation/AnimatedContent";
import RotatingText from "../gsap/text/RotatingText";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useProfile } from "@/hook/useProfile";
import { useMemo, useState } from "react";
import SkillGrid from "./ui/SkillGrid";

export default function AboutSkill() {
  const { mySkill } = useProfile();
  const [group, setGroup] = useState("all");
  const groupSkill = useMemo(() => {
    return mySkill.filter((skill) => skill.group === group || group === "all");
  }, [group, mySkill]);

  return (
    <AnimatedContent
      className=" w-full flex  justify-center"
      initialOpacity={1}
    >
      <Card className="bg-background/80 backdrop-blur-xs border-0 p-5  shadow-lg w-11/12 ">
        <CardHeader>
          <CardTitle className="flex items-center gap-3   ">
            <Card className=" text-primary  p-2 rounded-md ">
              <SquareFunction className="w-5 h-5" />
            </Card>
            <RotatingText
              texts={["Programming", "framework", "SQL", "CICD"]}
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
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="all"
            onValueChange={(val) => setGroup(val)}
            className="w-full"
          >
            <TabsList className="w-full  ">
              <TabsTrigger className="  outline-none border-none" value="all">
                <GalleryVerticalEnd />
                <p className="sm:block hidden"> All</p>
              </TabsTrigger>
              <TabsTrigger value="programming">
                <Code2 />
                <p className="sm:block hidden">Programming</p>
              </TabsTrigger>
              <TabsTrigger value="framework">
                <Puzzle />
                <p className="sm:block hidden">framework</p>
              </TabsTrigger>
              <TabsTrigger value="other">
                <Ellipsis />
                <p className="sm:block hidden"> Other</p>
              </TabsTrigger>
            </TabsList>
            <TabsContent value={group}>
              <SkillGrid groupSkill={groupSkill} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </AnimatedContent>
  );
}
