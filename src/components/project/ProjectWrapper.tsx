import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import ProjectCard from "./ui/ProjectCard";

import type { Project } from "@/types/type";
export default function ProjectWrapper() {
  // { projects } = useProfile();
  const { t } = useTranslation("project");
  const projects = t("projects", { returnObjects: true }) as Project[];
  return (
    <div className=" w-full">
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="grid  gap-5  lg:grid-cols-2 justify-items-center w-full p-5   "
      >
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </motion.section>
    </div>
  );
}
