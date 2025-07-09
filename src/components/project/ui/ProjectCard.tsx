import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Project } from "@/type";
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

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <NavLink to={project.previewUrl ? project.previewUrl : project.sourceUrl}>
      <Card className=" group backdrop-blur-lg bg-transparent w-full">
        <CardHeader className=" flex flex-col  gap-3">
          <Badge>
            {project.type.toUpperCase()}．{project.year}
          </Badge>
          <div className="  relative w-full flex  rounded-lg items-center justify-center overflow-hidden">
            <img
              src={`/${project.image}`}
              alt={project.title}
              className="  w-full aspect-video  group-hover:scale-110 transition-all"
            />
            {project.previewUrl && (
              <NavLink
                target="_BLANK"
                rel="noreferrer"
                className=" absolute inset-0 w-full grid   place-content-center h-full group-hover:bg-secondary/70 group-hover:opacity-100 transition-opacity opacity-0 "
                to={project.previewUrl}
              >
                <CircularText text={"Get*In*Touch*"} />
              </NavLink>
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
                    <p>{item}</p>
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
            <NavLink
              className={
                " flex text-xs bg-secondary p-2 rounded-3xl items-center gap-2 "
              }
              to={project.previewUrl}
            >
              Visit <SquareArrowOutUpRight size={16} />
            </NavLink>
          )}
          <NavLink
            className={
              " flex text-xs bg-secondary p-2 rounded-3xl items-center gap-2  "
            }
            to={project.sourceUrl}
          >
            Source Code <Github size={16} />
          </NavLink>
        </CardFooter>
      </Card>
    </NavLink>
  );
}
