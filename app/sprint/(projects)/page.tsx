import { GetProjects } from "@/app/lib/data";
import ProjectsTable from "@/app/ui/sprint/projects/table";

export default async function Projects() {
  const data = await GetProjects();

  return (
    <main>
      <ProjectsTable data={data || []} />
    </main>
  );
}
