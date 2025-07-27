import { useTranslation } from "react-i18next";

import ProjectCard from "@/components/project/ui/ProjectCard";

import type { Project } from "@/types/type";

export default function ProjectWrapper() {
  // { projects } = useProfile();
  const { t } = useTranslation("project");
  const projects = t("projects", { returnObjects: true }) as Project[];
  return (
    <div className=" w-full">
      <section className="grid  gap-5  lg:grid-cols-2 justify-items-center w-full p-5   ">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </section>
    </div>
  );
}
