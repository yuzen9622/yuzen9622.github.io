import { useProfile } from "@/shared/hook/useProfile";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import ProjectCard from "./ui/ProjectCard";
import type { Project } from "@/shared/types";

export default function Project() {
  const { projects } = useProfile();
  const projectScrollRef = useRef<HTMLElement>(null);
  const titleScrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: titleScrollYProgress } = useScroll({
    target: titleScrollRef,
    offset: ["start end", "end start"],
  });

  const smoothTitleScrollYProgress = useSpring(titleScrollYProgress, {
    stiffness: 90,
    damping: 10,
    mass: 0.25,
  });
  const opacity = useTransform(
    smoothTitleScrollYProgress,
    [0, 0.3, 0.6, 0.7],
    [0, 1, 1, 0]
  );
  const translateY = useTransform(
    smoothTitleScrollYProgress,
    [0, 0.5, 0.7],
    [1000, -100, -200]
  );
  const sectionVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { when: "beforeChildren" },
    },
  } as const;

  const headerVariants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 140, damping: 18 },
    },
  } as const;

  const listVariants = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut", delay: 0.05 },
    },
  } as const;

  return (
    <motion.section
      ref={projectScrollRef}
      id="project"
      className="relative  min-h-dvh inter pb-10"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <motion.div
        style={{ opacity, translateY }}
        className="fixed -z-10 top-0 inset-0  gap-6 w-dvw h-dvh flex items-center flex-col justify-center "
        variants={headerVariants}
      >
        <h1 className=" md:text-8xl text-6xl">Projects</h1>
        <motion.p>A cool thing I build</motion.p>
      </motion.div>
      <div
        ref={titleScrollRef}
        aria-hidden="true"
        className=" relative w-dvw h-dvh"
      ></div>
      <motion.div
        className="flex flex-col items-center  py-4"
        variants={listVariants}
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </motion.div>
    </motion.section>
  );
}
