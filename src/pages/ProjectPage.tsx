import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";

import ProjectHeader from "@/components/project/ProjectHeader";
import ProjectWrapper from "@/components/project/ProjectWrapper";

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
