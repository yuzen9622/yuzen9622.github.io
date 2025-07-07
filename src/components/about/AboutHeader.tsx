import { TypeAnimation } from "react-type-animation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AtSign, BookUser, MapPin } from "lucide-react";
import SplitText from "../gsap/text/SplitText";
import CircularText from "../gsap/text/CircularText";
import AnimatedContent from "../gsap/aniamtion/AnimatedContent";
import { useProfile } from "@/hook/useProfile";

export default function AboutHeader() {
  const { mySelf } = useProfile();
  return (
    <>
      <AnimatedContent
        className=" w-full flex  justify-center"
        initialOpacity={1}
      >
        <Card className=" w-11/12 min-h-1/3  flex lg:flex-row items-center dark:bg-none backdrop-blur-xs  flex-col bg-gradient-to-r from-slate-50  to-slate-100  ">
          <CardContent className="h-full w-fit ">
            <Avatar className="  relative w-3xs   h-full aspect-square">
              <AvatarImage
                className=" rounded-full"
                alt={mySelf.name}
                width={48}
                height={48}
                src={mySelf.avatar}
              />
              <AvatarFallback>Small Z</AvatarFallback>
              <div className=" absolute flex items-center justify-center w-full h-full">
                <CircularText
                  text="Creative*Coder*Dream*Builder*"
                  onHover="pause"
                  spinDuration={20}
                  className=" w-full h-full  "
                />
              </div>
            </Avatar>
          </CardContent>
          <CardContent className="h-full flex justify-center  w-full lg:text-start text-center flex-col gap-5 ">
            <h1 className="lg:text-5xl text-4xl font-extrabold text-slate-700 dark:text-slate-200">
              {mySelf.name}
            </h1>

            <TypeAnimation
              sequence={mySelf.bio}
              speed={30}
              className=" lg:text-2xl text-lg   font-bold text-slate-600 dark:text-slate-400"
              repeat={Infinity}
            />
            <div className=" flex gap-3 lg:justify-start justify-center max-sm:flex-col items-center">
              <Badge variant={"outline"}>
                <MapPin absoluteStrokeWidth size={20} />
                <p className=" font-bold text-[16px]"> {mySelf.contry}</p>
              </Badge>
              <Badge variant={"outline"} asChild>
                <a href={`mailto:${mySelf.email}`}>
                  <AtSign absoluteStrokeWidth size={20} />
                  <p className=" font-bold text-[16px]"> {mySelf.email}</p>
                </a>
              </Badge>
            </div>
          </CardContent>
          <CardContent className="h-full flex justify-center  w-full lg:text-start text-center flex-col gap-5 ">
            <SplitText
              text="Hello,I'm"
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
            />
          </CardContent>
        </Card>
      </AnimatedContent>
      <AnimatedContent
        className=" w-full flex  justify-center"
        initialOpacity={1}
      >
        <Card className="flex w-11/12 p-5 bg-gradient-to-r backdrop-blur-xs  from-slate-50  to-slate-100 dark:bg-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-3   ">
              <Card className=" text-slate-700   dark:text-slate-200  p-2 rounded-md ">
                <BookUser className="w-5 h-5" />
              </Card>

              <p className="text-slate-700 font-bold text-2xl dark:text-slate-200">
                About
              </p>
            </CardTitle>
          </CardHeader>

          <CardContent className=" font-bold  ">
            <p className="max-sm:text-center">{mySelf.content}</p>
          </CardContent>
        </Card>
      </AnimatedContent>
    </>
  );
}
