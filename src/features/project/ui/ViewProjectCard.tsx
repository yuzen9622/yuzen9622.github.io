import { AnimatePresence, motion } from "framer-motion";
import { Github, Share2, SquareArrowOutUpRight } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import SplitText from "@/components/gsap/text/SplitText";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useProfile } from "@/shared/hook/useProfile";

import type { Project } from "@/shared/types";
export default function ViewProjectCard() {
  const { techIcons } = useProfile();
  const [isClosing, setIsClosing] = useState(false);
  const { t } = useTranslation("project");
  const projects = t("projects", { returnObjects: true }) as Project[];

  const { title, lng } = useParams<{ title: string; lng: string }>();

  const navigate = useNavigate();
  const project = projects.find((pro) => `${pro.id}` === title);
  const MotionCard = motion.create(Card);
  const handleClose = () => {
    if (document.startViewTransition) {
      // 使用 ViewTransition API
      document.startViewTransition(() => {
        setIsClosing(true); // 觸發 Framer Motion exit 動畫
      });
    } else {
      setIsClosing(true); // fallback
    }
  };

  if (!project) {
    navigate("/projects");
    return;
  }
  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 bg-black/70  flex items-center justify-center z-50"
    >
      <AnimatePresence
        onExitComplete={() => {
          if (isClosing) {
            navigate(`/${lng}/projects`, { viewTransition: true });
          }
        }}
      >
        {!isClosing && (
          <MotionCard
            layout
            style={{ viewTransitionName: "view-project" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative w-4xl max-w-11/12 max-h-11/12 overflow-auto    hide-scrollbar  z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader className=" flex flex-col  gap-3">
              <Badge>
                {project?.type.toUpperCase()}．{project?.year}
              </Badge>
              <div className="  relative w-full h-full flex rounded-lg items-center justify-center overflow-hidden">
                <img
                  src={`/${project.image}`}
                  alt={project.title}
                  className="  w-full  aspect-video object-cover  h-full   transition-all"
                />
              </div>

              <CardTitle className="flex justify-between items-center max-sm:flex-col w-full">
                <SplitText text={project.title} className="text-3xl  " />
                <div className="*:data-[slot=avatar]:ring-background flex *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale  transition-all ">
                  {project?.tech.map((item) => (
                    <Tooltip key={item}>
                      <TooltipTrigger className="p-1">
                        <Avatar>
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
              <CardAction className=" flex gap-2 max-sm:justify-between w-full">
                {project.previewUrl && (
                  <NavLink
                    target="_BLANK"
                    to={project?.previewUrl}
                    rel="noreferrer"
                    className={
                      " flex cursor-pointer  relative transition-all hover:text-background  group text-xs bg-secondary  rounded-3xl items-center gap-2  "
                    }
                  >
                    <div className=" absolute transition-all inset-0 w-full h-full rounded-3xl bg-primary scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100"></div>
                    <span className="flex gap-2 p-2">
                      <p className="translate-x-3  group-hover:translate-0 transition-all">
                        Visit
                      </p>

                      <SquareArrowOutUpRight
                        className="-translate-x-4 opacity-0 group-hover:opacity-100  transition-all group-hover:translate-0"
                        size={16}
                      />
                    </span>
                  </NavLink>
                )}
                <NavLink
                  className={
                    " relative hover:text-background flex text-xs bg-secondary group z-10 rounded-3xl items-center  "
                  }
                  rel="noreferrer"
                  target="_BLANK"
                  onClick={(e) => e.stopPropagation()}
                  to={project?.sourceUrl}
                >
                  <div className=" absolute transition-all inset-0 w-full h-full rounded-3xl bg-primary scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100"></div>
                  <span className="flex gap-2 p-2">
                    <p className="translate-x-3  group-hover:translate-0 transition-all">
                      Source Code
                    </p>
                    <Github
                      className="-translate-x-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-0"
                      size={16}
                    />
                  </span>
                </NavLink>
                <button
                  className={
                    " relative hover:text-background  cursor-pointer flex text-xs bg-secondary group z-10 rounded-3xl items-center  "
                  }
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.share({
                      title: `Project - ${project.title}`,
                      text: project.description,
                      url: `${project.previewUrl}`,
                    });
                  }}
                >
                  <div className=" absolute transition-all inset-0 w-full h-full rounded-3xl bg-primary scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100"></div>
                  <span className="flex gap-2 p-2">
                    <p className="translate-x-3  group-hover:translate-0 transition-all">
                      Share
                    </p>
                    <Share2
                      className="-translate-x-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-0"
                      size={16}
                    />
                  </span>
                </button>
              </CardAction>
            </CardHeader>
            <CardContent className="space-y-1">
              <h1 className="text-2xl">Overview</h1>
              <p>{project.content.overview}</p>
            </CardContent>
            <CardContent className="space-y-2 space-x-2">
              <h1 className="text-2xl">Tech Stack</h1>
              {project.tech.map((item) => (
                <Badge className="text-center" key={item} variant={"secondary"}>
                  <Avatar>
                    <AvatarImage
                      className="   p-2  "
                      src={`https://cdn.simpleicons.org/${item}/gray`}
                      alt={item}
                    />
                    <AvatarFallback>{item}</AvatarFallback>
                  </Avatar>
                  <p className="font-bold">{techIcons[item]}</p>
                </Badge>
              ))}
            </CardContent>
            <CardContent className="space-y-1">
              <h1 className="text-2xl">Feature</h1>
              <ul className="list-disc pl-5 space-y-1">
                {project.content.feature.split("\n").map((line, i) => (
                  <li key={i}>{line.replace("• ", "")}</li>
                ))}
              </ul>
            </CardContent>
          </MotionCard>
        )}
      </AnimatePresence>
    </div>
  );
}
