import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import CircularText from "@/components/gsap/text/CircularText";
import HoverCursor from "@/components/project/ui/HoverCursor";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useProfile } from "@/hook/useProfile";

import type { Project } from "@/types/type";
export default function ProjectCard({ project }: { project: Project }) {
  const { techIcons } = useProfile();
  const divRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/projects/${project.id}`);
  };

  return (
    <div className={"  cursor-none relative w-full h-full  overflow-hidden"}>
      <Card
        onClick={handleClick}
        ref={divRef}
        className=" h-full   group backdrop-blur-xs bg-background/80 w-full"
      >
        <HoverCursor title={project.title} divRef={divRef} />
        <CardHeader className=" flex flex-col  gap-3">
          <Badge>
            {project.type.toUpperCase()}．{project.year}
          </Badge>
          <div className="  relative w-full h-full flex rounded-lg items-center justify-center overflow-hidden">
            <img
              src={`/${project.image}`}
              alt={project.title}
              className="  w-full  aspect-video object-cover   h-full  group-hover:scale-110 transition-all"
            />
            {project.previewUrl && (
              <>
                <div className="  absolute z-1 inset-0 w-full grid   place-content-center h-full ">
                  <CircularText
                    className="cursor-none"
                    text={"Get*In*Touch*"}
                  />
                </div>
                <div className="absolute inset-0 w-full h-full group-hover:bg-secondary/70 scale-50 group-hover:scale-100 group-hover:opacity-100 transition-all opacity-0 "></div>
              </>
            )}
          </div>

          <CardTitle className="flex justify-between items-center w-full">
            <h1 className="text-3xl group-hover:translate-3.5 transition-all pr-3">
              {project.title}
            </h1>
            <div className="*:data-[slot=avatar]:ring-background flex *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale  transition-all group-hover:translate-y-3.5">
              {project.tech.map((item) => (
                <Tooltip key={item}>
                  <TooltipTrigger className="duration-300 group-hover:ml-2 -ml-2">
                    <Avatar className="">
                      <AvatarImage
                        className="   p-2 bg-secondary "
                        src={`https://cdn.simpleicons.org/${item}/gray`}
                        alt={item}
                      />
                      <AvatarFallback>{item}</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{techIcons[item]}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{project.description}</CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
