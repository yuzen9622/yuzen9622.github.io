import {
  Code2,
  Ellipsis,
  GalleryVerticalEnd,
  Puzzle,
  SquareFunction,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import InMotionDiv from "../animations/InMotionDiv";
import RotatingText from "../gsap/text/RotatingText";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import SkillGrid from "./ui/SkillGrid";

import type { SkillGroup } from "@/types/type";

export default function AboutSkill() {
  const { t } = useTranslation("about");
  const mySkill = t("mySkill", { returnObjects: true });
  const [group, setGroup] = useState<SkillGroup>("all");
  const groupSkill = useMemo(() => {
    return mySkill.filter(
      (skill) => skill.group === t(`skillGroup.${group}`) || group === "all"
    );
  }, [group, mySkill, t]);

  return (
    <InMotionDiv className="">
      <Card className="  mx-auto bg-background/80 backdrop-blur-xs border-0 p-5  shadow-lg w-11/12 ">
        <CardHeader>
          <CardTitle className="flex items-center gap-3   ">
            <Card className=" text-primary  p-2 rounded-md ">
              <SquareFunction className="w-5 h-5" />
            </Card>
            <RotatingText
              texts={t("title.skill", { returnObjects: true })}
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
            key={group}
            defaultValue={group}
            value={group}
            onValueChange={(val) => setGroup(val as SkillGroup)}
            className="w-full"
          >
            <TabsList className="w-full  ">
              <TabsTrigger className="  outline-none border-none" value={"all"}>
                <GalleryVerticalEnd />
                <p className="sm:block hidden">{t("skillGroup.all")}</p>
              </TabsTrigger>
              <TabsTrigger value={"pr"}>
                <Code2 />
                <p className="sm:block hidden">{t("skillGroup.pr")}</p>
              </TabsTrigger>
              <TabsTrigger value={"fw"}>
                <Puzzle />
                <p className="sm:block hidden">{t("skillGroup.fw")}</p>
              </TabsTrigger>
              <TabsTrigger value={"other"}>
                <Ellipsis />
                <p className="sm:block hidden"> {t("skillGroup.other")} </p>
              </TabsTrigger>
            </TabsList>
            <TabsContent value={group}>
              <SkillGrid groupSkill={groupSkill} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </InMotionDiv>
  );
}
