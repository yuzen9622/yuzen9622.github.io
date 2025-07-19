import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Project } from "@/types/type";
import SplitText from "@/components/gsap/text/SplitText";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import CircularText from "@/components/gsap/text/CircularText";
import { NavLink } from "react-router-dom";
import { Github, SquareArrowOutUpRight } from "lucide-react";
import { useProfile } from "@/hook/useProfile";

import { useRef } from "react";
import HoverCursor from "./HoverCursor";

export default function ProjectCard({ project }: { project: Project }) {
  const { techIcons } = useProfile();
  const divRef = useRef<HTMLDivElement>(null);

  const handleCardClick = () => {
    if (project.previewUrl) {
      window.open(project.previewUrl, "_blank");
    } else {
      window.open(project.sourceUrl, "_blank");
    }
  };

  return (
    <div
      className={" relative w-full h-full cursor-pointer overflow-hidden"}
      onClick={handleCardClick}
      ref={divRef}
    >
      <Card className=" h-full   group backdrop-blur-xs bg-background/80 w-full">
        <HoverCursor title={project.title} divRef={divRef} />
        <CardHeader className=" flex flex-col  gap-3">
          <Badge>
            {project.type.toUpperCase()}．{project.year}
          </Badge>
          <div className="  relative w-full flex rounded-lg items-center justify-center overflow-hidden">
            <img
              src={`/${project.image}`}
              alt={project.title}
              className="  w-full aspect-video   group-hover:scale-110 transition-all"
            />
            {project.previewUrl && (
              <div className=" absolute inset-0 w-full grid   place-content-center h-full group-hover:bg-secondary/70 group-hover:opacity-100 transition-opacity opacity-0 ">
                <CircularText text={"Get*In*Touch*"} />
              </div>
            )}
          </div>

          <CardTitle className="flex justify-between items-center w-full">
            <SplitText
              text={project.title}
              className="text-3xl group-hover:translate-3.5 transition-all pr-3"
            />
            <div className="*:data-[slot=avatar]:ring-background flex *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale  transition-all group-hover:translate-y-3.5">
              {project.tech.map((item) => (
                <Tooltip>
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
        <CardFooter className=" flex gap-2">
          {project.previewUrl && (
            <button
              className={
                " flex cursor-pointer text-xs bg-secondary p-2 rounded-3xl items-center gap-2 "
              }
              type="button"
            >
              Visit <SquareArrowOutUpRight size={16} />
            </button>
          )}
          <NavLink
            className={
              " flex text-xs bg-secondary p-2 z-10 rounded-3xl items-center gap-2  "
            }
            onClick={(e) => e.stopPropagation()}
            to={project.sourceUrl}
          >
            Source Code <Github size={16} />
          </NavLink>
        </CardFooter>
      </Card>
    </div>
  );
}
