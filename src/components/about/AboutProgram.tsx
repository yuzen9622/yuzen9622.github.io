import { ChevronRight, Code } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import InMotionDiv from "../animations/InMotionDiv";
import TrueFocus from "@/components/gsap/text/TrueFocusText";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function AboutProgram() {
  const { t } = useTranslation("about");
  return (
    <InMotionDiv>
      <Card className="bg-background/80 backdrop-blur-xs border-0 p-5  shadow-lg w-11/12 ">
        <CardHeader>
          <CardTitle className="flex items-center gap-3   ">
            <Card className="text-primary p-2 rounded-md ">
              <Code className="w-5 h-5" />
            </Card>
            <p className="text-primary font-bold text-2xl ">
              {t("title.mostLang")}
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent className="">
          <TrueFocus
            sentence="TypeScript JavaScript C++"
            manualMode={true}
            blurAmount={5}
            borderColor="#A390EE"
            animationDuration={1}
            pauseBetweenAnimations={1}
          />
          <CardDescription className=" flex items-center justify-end text-lg">
            <NavLink
              to={"/projects"}
              className={
                "group w-fit flex font-bold items-center  hover:translate-x-1  transition-transform"
              }
            >
              See My Projects
              <ChevronRight className=" -translate-x-4 opacity-0 transition-all  group-hover:translate-0 group-hover:opacity-100" />
            </NavLink>
          </CardDescription>
        </CardContent>
      </Card>
    </InMotionDiv>
  );
}
