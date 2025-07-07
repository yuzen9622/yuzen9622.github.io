import { Card, CardContent, CardDescription } from "@/components/ui/card";

import AnimatedContent from "../gsap/animation/AnimatedContent";

import { useProfile } from "@/hook/useProfile";

export default function AboutCard() {
  const { myCard } = useProfile();
  return (
    <section className=" flex    bg-transparent w-11/12 lg:flex-row flex-col gap-3">
      {myCard.map((item, index) => (
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
