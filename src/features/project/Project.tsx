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
    [0, 0.3, 0.6, 0.8],
    [0, 1, 1, 0]
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
    <>
      <motion.div
        style={{ opacity }}
        id="project"
        className="sticky top-20 z-10 inter opacity-0 gap-6 w-dvw h-dvh flex items-center flex-col justify-center"
        variants={headerVariants}
        ref={titleScrollRef}
      >
        <h1 className=" md:text-8xl text-6xl">Projects</h1>
        <motion.p>A cool thing I build</motion.p>
      </motion.div>
      <motion.section
        ref={projectScrollRef}
        className="relative  min-h-dvh inter pb-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.div
          className="flex flex-col items-center  py-4"
          variants={listVariants}
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </motion.section>
    </>
  );
}
