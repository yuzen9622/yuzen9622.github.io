import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useProfile } from "@/shared/hook/useProfile";
import { cn } from "@/shared/lib/utils";
import type { Project } from "@/shared/types";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowUpRightFromCircleIcon } from "lucide-react";
import { useRef } from "react";

type Props = {
  index: number;
  project: Project;
};

const viewportSettings = { once: true, amount: 0.45 };

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

const contentItemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 280, damping: 24 },
  },
};

const textContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.025 },
  },
};

const letterVariants: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 420, damping: 32 },
  },
};

const techContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

const techItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
};

const actionContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const actionVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 24 },
  },
};

type AnimatedTextProps = {
  text?: string;
  className?: string;
};

const AnimatedText = ({ text, className }: AnimatedTextProps) => {
  if (!text) return null;

  return (
    <motion.span
      className={cn("inline-flex flex-wrap", className)}
      variants={textContainerVariants}
    >
      {Array.from(text).map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className="inline-block"
          variants={letterVariants}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

function GeometricOverlay({ index }: { index: number }) {
  const isEven = index % 2 === 0;

  const circleGroup = isEven
    ? {
        large: { cx: 920, cy: 320, r: 220, dash: "320 780", opacity: 0.18 },
        medium: { cx: 980, cy: 620, r: 160, dash: "200 520", opacity: 0.24 },
        small: { cx: 980, cy: 620, r: 90, dash: "80 220", opacity: 0.3 },
        guide: {
          horiz: { x1: 640, y1: 560, x2: 1120, y2: 560, opacity: 0.25 },
          vert: { x1: 880, y1: 800, x2: 880, y2: 320, opacity: 0.18 },
        },
      }
    : {
        large: { cx: 260, cy: 360, r: 240, dash: "360 840", opacity: 0.18 },
        medium: { cx: 220, cy: 160, r: 150, dash: "180 560", opacity: 0.24 },
        small: { cx: 220, cy: 160, r: 90, dash: "80 220", opacity: 0.32 },
        guide: {
          horiz: { x1: -20, y1: 500, x2: 420, y2: 500, opacity: 0.25 },
          vert: { x1: 200, y1: 800, x2: 200, y2: 260, opacity: 0.25 },
        },
      };

  return (
    <div className="pointer-events-none absolute inset-0 z-0 text-foreground/40 dark:text-foreground/25">
      <svg
        className="h-full w-full flex items-center"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1">
          <line
            x1={circleGroup.guide.horiz.x1}
            y1={circleGroup.guide.horiz.y1}
            x2={circleGroup.guide.horiz.x2}
            y2={circleGroup.guide.horiz.y2}
            opacity={circleGroup.guide.horiz.opacity}
          />
          <line
            x1={circleGroup.guide.vert.x1}
            y1={circleGroup.guide.vert.y1}
            x2={circleGroup.guide.vert.x2}
            y2={circleGroup.guide.vert.y2}
            opacity={circleGroup.guide.vert.opacity}
          />
        </g>
      </svg>
    </div>
  );
}

export default function ProjectCard({ index, project }: Props) {
  const { techIcons } = useProfile();

  const cardRef = useRef<HTMLDivElement>(null);
  const titleScrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: titleScrollRef,
    offset: ["start end", "end start"],
  });
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 10,
    mass: 0.25,
  });
  const isCentered = useInView(cardRef, {
    margin: "-45% 0px -50% 0px",
    amount: 0,
  });

  const translateY = useTransform(
    smoothScrollYProgress,
    [0, 0.3, 0.7, 1],
    [700, 150, 0, -300]
  );
  const opacity = useTransform(
    smoothScrollYProgress,
    [0, 0.3, 0.5, 0.7],
    [0, 1, 1, 0]
  );

  const watermarkNumber = String(index + 1).padStart(2, "0");
  const watermarkPosition =
    index % 2 === 0 ? "right-4 md:right-6" : "left-4 md:left-6";

  return (
    <>
      <div
        ref={titleScrollRef}
        aria-hidden="true"
        className=" relative hidden md:block w-dvw min-h-[150dvh]"
      ></div>
      <motion.div
        ref={cardRef}
        style={{ opacity, translateY }}
        className={cn(
          "md:fixed hidden md:block   top-20 mb-4  min-h-dvh w-11/12"
        )}
      >
        <div className="relative overflow-hidden rounded-3xl border bg-background/40 backdrop-blur-md p-6">
          <GeometricOverlay index={index} />

          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute bottom-3 z-0 select-none",
              watermarkPosition,
              "text-foreground/10 dark:text-foreground/5",
              "text-7xl font-black tracking-tight"
            )}
          >
            {watermarkNumber}
          </div>

          <div
            className={cn(
              "pointer-events-none absolute z-0 w-50 right-0 h-50 rounded-full blur-3xl opacity-100 dark:opacity-30 bg-[radial-gradient(circle,var(--primary)_0%,transparent_100%)] ",
              index % 2 === 0
                ? "lg:right-10 bottom-30 translate-y-1/2"
                : "lg:left-20 bottom-30 translate-y-1/2"
            )}
          />

          <div
            className={cn(
              "relative z-10 flex gap-4 justify-between flex-col",
              index % 2 === 0 ? "lg:flex-row " : "lg:flex-row-reverse "
            )}
          >
            <motion.div className="h-fit md:flex-1 ">
              <div className="relative overflow-hidden rounded-3xl">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(135deg,transparent_0%,hsl(var(--border))_35%,transparent_70%)] opacity-[0.06]"
                />
                <img
                  className="object-cover w-full aspect-video rounded-3xl h-full"
                  src={`/${project.image}`}
                  alt={project.title}
                />
              </div>
            </motion.div>
            <motion.div
              className={cn(
                "flex-1 flex flex-col md:justify-center lg:px-6 gap-4 ",
                index % 2 === 0 ? "lg:text-left" : "lg:text-right"
              )}
              variants={contentVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
            >
              <motion.h2
                className="text-5xl font-bold"
                variants={contentItemVariants}
              >
                <AnimatedText text={project.title} />
              </motion.h2>
              <motion.p
                className="mt-2 text-sm font-extralight  line-clamp-3 text-muted-foreground    "
                variants={contentItemVariants}
              >
                {project.content.overview}
              </motion.p>
              <motion.div
                variants={techContainerVariants}
                className="flex flex-wrap gap-2"
              >
                {project.tech.map((item) => (
                  <motion.div key={item} variants={techItemVariants}>
                    <Tooltip>
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
                  </motion.div>
                ))}
              </motion.div>
              <motion.span
                className="space-x-4"
                variants={actionContainerVariants}
              >
                {project.sourceUrl && (
                  <motion.a
                    variants={actionVariants}
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" rounded-3xl px-3 py-2 hover:bg-primary hover:text-accent transition-colors"
                  >
                    Github
                  </motion.a>
                )}
                {project.previewUrl && (
                  <motion.a
                    variants={actionVariants}
                    href={project.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" relative rounded-3xl px-3 group  py-2 bg-background/50 backdrop-blur-md border transition-colors"
                  >
                    <p className="  translate-x-2.5 inline-block  group-hover:translate-0 transition-all">
                      Visit
                    </p>

                    <ArrowUpRightFromCircleIcon className="   transition-all opacity-0 translate-x-1 group-hover:translate-x-0 group-hover:opacity-100 inline-block ml-1 mb-0.5 w-4 h-4" />
                  </motion.a>
                )}
              </motion.span>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <motion.div
        className={cn(
          "md:hidden relative mb-4 min-h-fit p-4 rounded-md border w-11/12 bg-background overflow-hidden"
        )}
      >
        <GeometricOverlay index={index} />

        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute bottom-2 z-0 select-none",
            watermarkPosition,
            "text-foreground/10 dark:text-foreground/6",
            "text-6xl font-black tracking-tight"
          )}
        >
          {watermarkNumber}
        </div>

        <div
          className={cn(
            "relative z-10 flex gap-4 justify-between flex-col",
            index % 2 === 0 ? "lg:flex-row " : "lg:flex-row-reverse "
          )}
        >
          <div
            className={cn(
              "pointer-events-none absolute z-0 w-50 right-0 h-50 rounded-full blur-3xl opacity-100 dark:opacity-30 bg-[radial-gradient(circle,var(--primary)_0%,transparent_100%)] ",
              index % 2 === 0
                ? "lg:right-10 bottom-30 translate-y-1/2"
                : "lg:left-20 bottom-30 translate-y-1/2"
            )}
          />
          <motion.div className="h-fit md:flex-1 ">
            <div className="relative overflow-hidden rounded-3xl">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(135deg,transparent_0%,hsl(var(--border))_35%,transparent_70%)] opacity-[0.06]"
              />
              <img
                className="object-cover w-full aspect-video rounded-3xl h-full"
                src={`/${project.image}`}
                alt={project.title}
              />
            </div>
          </motion.div>
          <motion.div
            className={cn(
              "flex-1 flex flex-col md:justify-center lg:px-6 gap-4 ",
              index % 2 === 0 ? "lg:text-left" : "lg:text-right"
            )}
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
          >
            <motion.h2
              className="text-5xl font-bold"
              variants={contentItemVariants}
            >
              <AnimatedText text={project.title} />
            </motion.h2>
            <motion.p
              className="mt-2 text-sm  line-clamp-3 font-extralight overflow-hidden text-muted-foreground   w-fit  "
              variants={contentItemVariants}
            >
              {project.content.overview}
            </motion.p>
            <motion.div
              variants={techContainerVariants}
              className="flex flex-wrap gap-2"
            >
              {project.tech.map((item) => (
                <motion.div key={item} variants={techItemVariants}>
                  <Tooltip>
                    <TooltipTrigger
                      className={cn("transition-all duration-300", "ml-2")}
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
                </motion.div>
              ))}
            </motion.div>
            <motion.span
              className="space-x-4"
              variants={actionContainerVariants}
            >
              {project.sourceUrl && (
                <motion.a
                  variants={actionVariants}
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" rounded-3xl px-3 py-2 hover:bg-primary hover:text-accent transition-colors"
                >
                  Github
                </motion.a>
              )}
              {project.previewUrl && (
                <motion.a
                  variants={actionVariants}
                  href={project.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" relative rounded-3xl px-3 group  py-2 bg-background/50 backdrop-blur-md border transition-colors"
                >
                  <p className="  translate-x-2.5 inline-block  group-hover:translate-0 transition-all">
                    Visit
                  </p>

                  <ArrowUpRightFromCircleIcon className="   transition-all opacity-0 translate-x-1 group-hover:translate-x-0 group-hover:opacity-100 inline-block ml-1 mb-0.5 w-4 h-4" />
                </motion.a>
              )}
            </motion.span>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
