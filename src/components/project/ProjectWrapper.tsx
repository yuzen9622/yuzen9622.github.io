import ProjectCard from "./ui/ProjectCard";
import { useTranslation } from "react-i18next";
import type { Project } from "@/types/type";

export default function ProjectWrapper() {
  // { projects } = useProfile();
  const { t } = useTranslation("project");
  const projects = t("projects", { returnObjects: true }) as Project[];
  return (
    <div className=" w-full">
      <section className="grid  gap-5  lg:grid-cols-2 justify-items-center w-full p-5   ">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </section>
    </div>
  );
}
