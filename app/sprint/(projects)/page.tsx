import { GetProjects } from "@/app/lib/data";
import ProjectsComponent from "@/app/ui/sprint/projects";
import ProjectsTable from "@/app/ui/sprint/projects/table";

export default async function ProjectsPage() {
  const data = await GetProjects();

  return <ProjectsComponent data={data} />;
}
