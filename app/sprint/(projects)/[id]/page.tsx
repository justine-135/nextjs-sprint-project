import { getTodos } from "@/app/lib/data";
import BackButton from "@/app/ui/common/button/backButton";
import { TabColumns } from "@/app/ui/common/tab-columns";
import { Toaster } from "@/components/ui/toaster";

export default async function Projects({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = await getTodos(id);

  return (
    <>
      <div className="flex items-center gap-2">
        <BackButton href="/sprint" />
        <h1 className="font-semibold text-xl">{data?.project?.name}</h1>
      </div>
      <section className="mt-small overflow-x-auto overflow-y-hidden">
        <TabColumns data={data?.result} projectId={data?.project?.id} />
      </section>
      <Toaster />
    </>
  );
}
