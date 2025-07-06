import CountUp from "@/components/gsap/text/CountText";
import { Progress } from "@/components/ui/progress";
import type { AboutSkill } from "@/type";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

export default function AnimationProgress({
  skill,
  delay = 0,
}: {
  skill: AboutSkill;
  delay?: number;
}) {
  const [animaProcess, setAnimaProcess] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setAnimaProcess(skill.process);
    }, delay);
  }, [skill, delay]);

  return (
    <div className="flex flex-col gap-3">
      <span className=" flex justify-between">
        <span className="flex gap-2">
          <p className=" font-bold">{skill.title}</p>
          <Badge variant={"outline"}>
            <p>{skill.group}</p>
          </Badge>
        </span>
        <p>
          <CountUp from={0} to={skill.process} />%
        </p>
      </span>
      <Progress value={animaProcess} className="w-full" />
    </div>
  );
}
