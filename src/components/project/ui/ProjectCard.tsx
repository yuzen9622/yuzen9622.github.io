import {
  Card,
  CardContent,
  CardDescription,
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
export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className=" group backdrop-blur-lg bg-transparent w-full">
      <CardHeader className=" flex flex-col  gap-3">
        <Badge>
          {project.type.toUpperCase()}．{project.year}
        </Badge>
        <div className=" w-full flex  rounded-lg items-center justify-center overflow-hidden">
          <img
            src={`/${project.image}`}
            alt={project.title}
            className=" w-full aspect-video  group-hover:scale-110 transition-all"
          />
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
    </Card>
  );
}
