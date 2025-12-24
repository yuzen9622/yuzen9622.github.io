import { useProfile } from "@/shared/hook/useProfile";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ProjectCard from "./ui/ProjectCard";
import type { Project } from "@/shared/types";

export default function Project() {
  const { projects } = useProfile();
  const projectScrollRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: projectScrollRef,
    // 讓進出視窗都有足夠的進度範圍，方便做淡入淡出
    offset: ["start end", "end start"],
  });

  // 0~0.2 淡入，0.2~0.8 保持，0.8~1 淡出
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.2, 0.3],
    [0, 1, 1, 0]
  );
  //const filter = useMotionTemplate`blur(${blurPx}px)`;

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
      className="relative  opacity-0 min-h-dvh pt-[100dvh] inter pb-10"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <motion.div
        style={{ opacity }}
        className="fixed -z-10 top-0 inset-0 gap-6 w-dvw h-dvh flex items-center flex-col justify-center "
        variants={headerVariants}
      >
        <h1 className=" md:text-8xl text-6xl">Projects</h1>
        <motion.p>A cool thing I build</motion.p>
      </motion.div>
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
