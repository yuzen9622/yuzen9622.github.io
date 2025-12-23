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
import RotatingText from "@/components/gsap/text/RotatingText";

export default function Project() {
  const { projects } = useProfile();
  const projectScrollRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: projectScrollRef,
    offset: ["start 30%", "start 0%"],
  });

  const blurPx = useTransform(scrollYProgress, [0.7, 2], [0, 40]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;

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
      className="relative w-11/12 min-h-dvh pt-96 inter"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <motion.div
        style={{ filter }}
        className="fixed -z-10 top-0 inset-0 gap-6 w-dvw h-dvh flex items-center flex-col justify-center "
        variants={headerVariants}
      >
        <RotatingText
          texts={["Projects", "Showcase"]}
          splitBy="characters"
          staggerFrom={"last"}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={3000}
          mainClassName="text-6xl md:text-8xl  p-2 rounded-md   font-extrabold "
        />
        <motion.p>A cool thing I build</motion.p>
      </motion.div>
      <motion.div className="flex flex-col  py-4" variants={listVariants}>
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </motion.div>
    </motion.section>
  );
}
