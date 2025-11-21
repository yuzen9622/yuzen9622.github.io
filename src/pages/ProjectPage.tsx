import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";

import ProjectHeader from "@/features/project/ProjectHeader";
import ProjectWrapper from "@/features/project/ProjectWrapper";

export default function ProjectPage() {
  return (
    <>
      <Helmet>
        <title>Yuzen - Project</title>
      </Helmet>
      <ProjectHeader />
      <ProjectWrapper />
      <Outlet />
    </>
  );
}
