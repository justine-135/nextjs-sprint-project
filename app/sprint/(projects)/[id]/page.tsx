import { GetProject } from "@/app/lib/data";
import BackButton from "@/app/ui/common/button/backButton";
import { TabColumns } from "@/app/ui/common/tab-columns";
import ProjectComponent from "@/app/ui/sprint/projects/detail";
import { Toaster } from "@/components/ui/toaster";

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const data = await GetProject(id);

  return <ProjectComponent data={data} />;
}
