import { TypeAnimation } from "react-type-animation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AtSign, MapPin } from "lucide-react";
import SplitText from "../gsap/text/SplitText";
import CircularText from "../gsap/text/CircularText";

import { useTranslation } from "react-i18next";
import InMotionDiv from "../animations/InMotionDiv";
import MaskText from "./ui/MaskText";

export default function AboutHeader() {
  const { t, i18n } = useTranslation("about");

  return (
    <>
      <InMotionDiv delay={0.2}>
        <Card className=" w-11/12 min-h-1/3  flex lg:flex-row items-center dark:bg-none backdrop-blur-xs bg-background/80  flex-col   ">
          <CardContent className="h-full w-fit ">
            <Avatar className="  relative w-3xs   h-full aspect-square">
              <AvatarImage
                className=" rounded-full"
                alt={t("mySelf.name")}
                width={48}
                height={48}
                src={t("mySelf.avatar")}
              />
              <AvatarFallback>{t("mySelf.name")}</AvatarFallback>
              <div className=" absolute flex items-center justify-center w-full h-full">
                <CircularText
                  text={t("mySelf.circularText")}
                  onHover="pause"
                  spinDuration={20}
                  className=" w-full h-full   text-white"
                />
              </div>
            </Avatar>
          </CardContent>
          <CardContent className="h-full flex justify-center  w-full lg:items-start items-center flex-col gap-5 ">
            <h1 className="lg:text-5xl text-4xl font-extrabold text-primary">
              {t("mySelf.name")}
            </h1>

            <TypeAnimation
              key={i18n.language}
              sequence={t("mySelf.bio", { returnObjects: true })}
              speed={30}
              className=" lg:text-2xl text-lg text-white   font-bold bg-blue-600 w-fit rounded-md p-2"
              repeat={Infinity}
            />
            <div className=" flex gap-3 lg:justify-start justify-center max-sm:flex-col items-center">
              <Badge asChild variant={"outline"}>
                <a
                  target="_BLANK"
                  href="https://www.google.com/maps/place/%E6%96%B0%E7%AB%B9%E7%B8%A3"
                >
                  <MapPin absoluteStrokeWidth size={20} />
                  <p className=" font-bold text-[16px]">
                    {t("mySelf.country")}
                  </p>
                </a>
              </Badge>
              <Badge variant={"outline"} asChild>
                <a href={`mailto:${t("mySelf.email")}`}>
                  <AtSign absoluteStrokeWidth size={20} />
                  <p className=" font-bold text-[16px]"> {t("mySelf.email")}</p>
                </a>
              </Badge>
            </div>
          </CardContent>
          <CardContent className="h-full flex justify-center  w-full lg:text-start text-center flex-col gap-5 ">
            <SplitText
              text={t("mySelf.call")}
              className="text-3xl font-semibold text-center"
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />
            <SplitText
              text="Small Z"
              className="text-5xl font-semibold text-center"
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />{" "}
          </CardContent>
        </Card>{" "}
      </InMotionDiv>
      <InMotionDiv delay={0.4}>
        <MaskText />
      </InMotionDiv>
    </>
  );
}
