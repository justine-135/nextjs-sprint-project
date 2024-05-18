import { GetProject, GetTabLabels } from "@/app/lib/data";
import ProjectComponent from "@/app/ui/sprint/projects/detail";

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const data = await GetProject(id);
  const tabLabelsData = await GetTabLabels(id);

  return (
    <ProjectComponent
      data={data}
      projectId={id}
      tabLabelsData={tabLabelsData}
    />
  );
}
