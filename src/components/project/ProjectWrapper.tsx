import { useProfile } from "@/hook/useProfile";
import ProjectCard from "./ui/ProjectCard";

export default function ProjectWrapper() {
  const { projects } = useProfile();
  return (
    <div className=" w-full">
      <section className="grid  gap-5  lg:grid-cols-2 justify-items-center w-full p-5   ">
        {projects.map((project) => (
          <ProjectCard project={project} />
        ))}
      </section>
    </div>
  );
}
