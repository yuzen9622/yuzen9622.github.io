import { useProfile } from "@/shared/hook/useProfile";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import ProjectCard from "./ui/ProjectCard";
import type { Project } from "@/shared/types";

export default function Project() {
  const { projects } = useProfile();
  const projectScrollRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: projectScrollRef,
    offset: ["start 30%", "start 0%"],
  });

  const blurPx = useTransform(scrollYProgress, [0.7, 2], [0, 40]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;
  const clip = useTransform(
    scrollYProgress,
    [-1.2, 1],
    ["inset(0% 150% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );
  return (
    <section
      ref={projectScrollRef}
      id="project"
      className="relative w-11/12 min-h-dvh pt-96 inter"
    >
      <motion.div
        style={{ filter, clipPath: clip }}
        className="fixed -z-10 top-0 inset-0 gap-6 w-dvw h-dvh flex items-center flex-col justify-center "
      >
        <motion.h1 className="md:text-8xl text-6xl ">Projects</motion.h1>
        <motion.p>A cool thing I build</motion.p>
      </motion.div>
      <div className="flex flex-col  py-4">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
