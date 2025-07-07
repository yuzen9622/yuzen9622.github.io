import { Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import RotatingText from "../gsap/text/RotatingText";
import AnimatedContent from "../gsap/animation/AnimatedContent";

import { Badge } from "../ui/badge";
import { useProfile } from "@/hook/useProfile";

export default function AboutAward() {
  const { myAward } = useProfile();
  return (
    <AnimatedContent
      className=" w-full flex  justify-center "
      initialOpacity={1}
    >
      <Card className="bg-white/80 backdrop-blur-xs border-0 p-5  shadow-lg w-11/12 dark:bg-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-3   ">
            <Card className=" text-slate-700   dark:text-slate-200  p-2 rounded-md ">
              <Award className="w-5 h-5" />
            </Card>

            <RotatingText
              texts={["Achievements ", " Certifications"]}
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
          <div className="grid gap-4">
            {myAward.map((achievement, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 hover:translate-x-1 transition-transform  dark:bg-none rounded-xl border border-yellow-200/50"
              >
                <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-600 dark:bg-white/10 rounded-full text-white">
                  <Award className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900  dark:text-white text-lg flex items-center gap-2">
                    {achievement.title}
                    <Badge variant={"outline"}>{achievement.time}</Badge>
                  </h3>
                  <p className="font-bold">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AnimatedContent>
  );
}
