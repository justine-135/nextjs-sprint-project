import { getTodos } from "@/app/lib/data";
import LinkButton from "@/app/ui/common/button/link-button";
import { TabColumns } from "@/app/ui/common/tab-columns";
import { Toaster } from "@/components/ui/toaster";

export default async function Projects({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = await getTodos(id);

  return (
    <>
      <LinkButton title="Back" href="/sprint" />

      <section className="mt-small h-full">
        <TabColumns data={data} />
        <Toaster />
      </section>
    </>
  );
}
