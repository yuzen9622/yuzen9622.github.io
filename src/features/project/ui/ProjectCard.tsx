import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useProfile } from "@/shared/hook/useProfile";
import { cn } from "@/shared/lib/utils";
import type { Project } from "@/shared/types";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowUpRightFromCircleIcon } from "lucide-react";
import { useRef } from "react";

type Props = {
  index: number;
  project: Project;
};

export default function ProjectCard({ index, project }: Props) {
  const { techIcons } = useProfile();

  const cardRef = useRef<HTMLDivElement>(null);
  const titleScrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: titleScrollRef,
    offset: ["start end", "end start"],
  });
  const isCentered = useInView(titleScrollRef, {
    margin: "-45% 0px -50% 0px",
    amount: 0,
  });

  const translateY = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [500, 50, 0, -500]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7],
    [0, 1, 1, 0]
  );
  return (
    <>
      <div
        ref={titleScrollRef}
        aria-hidden="true"
        className=" relative w-dvw min-h-[150dvh]"
      ></div>
      <motion.div
        ref={cardRef}
        style={{ opacity, translateY }}
        className={cn(
          "fixed  top-20 min-h-dvh w-11/12 flex gap-4 justify-between flex-col mb-4  ",
          index % 2 === 0 ? "lg:flex-row " : "lg:flex-row-reverse "
        )}
      >
        <div
          className={cn(
            "  pointer-events-none absolute w-50 right-0  h-50 rounded-full blur-3xl opacity-100 dark:opacity-30 bg-[radial-gradient(circle,var(--primary)_0%,transparent_100%)] ",
            index % 2 === 0
              ? "lg:right-10 bottom-30 translate-y-1/2"
              : "lg:left-20 bottom-30 translate-y-1/2"
          )}
        />
        <motion.div
          // initial={{ opacity: 0, x: 20 }}
          // whileInView={isCentered ? { opacity: 1, x: 0 } : undefined}
          // viewport={{ once: true }}
          // transition={{
          //   type: "spring",
          //   stiffness: 100,
          //   damping: 20,
          //   delay: index * 0.1,
          // }}
          className="h-fit md:flex-1 "
        >
          <img
            className="object-cover w-full aspect-video rounded-3xl h-full"
            src={`/${project.image}`}
            alt={project.title}
          />
        </motion.div>
        <motion.div
          // initial={{ opacity: 0, x: -20 }}
          // whileInView={{ opacity: 1, x: 0 }}
          // viewport={{ once: true }}
          // transition={{
          //   type: "spring",
          //   stiffness: 100,
          //   damping: 20,
          //   delay: index * 0.1,
          // }}
          className={cn(
            "flex-1 flex flex-col md:justify-center lg:px-6 gap-4 ",
            index % 2 === 0 ? "lg:text-left" : "lg:text-right"
          )}
        >
          <h2 className="text-5xl font-bold">{project.title}</h2>
          <p className="mt-2 text-sm text-muted-foreground border  w-fit bg-background/50  rounded-md px-3 py-2 ">
            {project.description}
          </p>
          <div>
            {project.tech.map((item) => (
              <Tooltip key={item}>
                <TooltipTrigger
                  className={cn(
                    "transition-all duration-300",
                    isCentered ? "ml-2" : "-ml-2"
                  )}
                >
                  <Avatar className="">
                    <AvatarImage
                      className="p-2 bg-secondary "
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
          <span className="space-x-4">
            {project.sourceUrl && (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className=" rounded-3xl px-3 py-2 hover:bg-primary hover:text-accent transition-colors"
              >
                Github
              </a>
            )}
            {project.previewUrl && (
              <a
                href={project.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className=" relative rounded-3xl px-3 group  py-2 bg-background/50 backdrop-blur-md border transition-colors"
              >
                <p className="  translate-x-2.5 inline-block  group-hover:translate-0 transition-all">
                  Visit
                </p>

                <ArrowUpRightFromCircleIcon className="   transition-all opacity-0 translate-x-1 group-hover:translate-x-0 group-hover:opacity-100 inline-block ml-1 mb-0.5 w-4 h-4" />
              </a>
            )}
          </span>
        </motion.div>
      </motion.div>
    </>
  );
}
