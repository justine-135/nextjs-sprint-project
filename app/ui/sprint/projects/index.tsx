import React from "react";
import ProjectsTable from "./table";
import { IProjects } from "@/app/lib/definitions/projects";

export default function ProjectsComponent({
  data,
}: {
  data: IProjects[] | undefined;
}) {
  return (
    <main>
      <ProjectsTable data={data || []} />
    </main>
  );
}
