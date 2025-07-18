import { Card, CardContent, CardDescription } from "@/components/ui/card";

import { useTranslation } from "react-i18next";
import { Calendar, Code, Github } from "lucide-react";
import InMotionDiv from "../animations/InMotionDiv";

export default function AboutCard() {
  const { t } = useTranslation("about");
  const myCard = t("myCard", { returnObjects: true });
  const iconMap = {
    calendar: <Calendar size={30} />,
    github: <Github size={30} />,
    code: <Code size={30} />,
  };

  return (
    <section className=" flex   relative  bg-transparent w-11/12 lg:flex-row flex-col gap-3">
      {myCard.map((item, index) => (
        <InMotionDiv key={index}>
          <Card className="flex-1 flex flex-col items-center justify-center gap-2  hover:-translate-y-1  hover:shadow-md transition-transform ">
            <Card className="  bg-secondary rounded-full text-primary p-2">
              {iconMap[item.icon]}
            </Card>
            <CardContent className="text-2xl text-primary font-extrabold">
              {item.title}
            </CardContent>
            <CardDescription className="font-bold">
              {item.description}
            </CardDescription>
          </Card>
        </InMotionDiv>
      ))}
    </section>
  );
}
