import { getTodos } from "@/app/lib/data";
import ActionButton from "@/app/ui/common/button";
import { TabColumns } from "@/app/ui/common/tab-columns";
import { Toaster } from "@/components/ui/toaster";

export default async function Projects({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = await getTodos(id);

  // console.log(data?.todos);

  return (
    <>
      <ActionButton title="Back" href="/sprint" buttonType="link" />

      <section className="mt-small h-full">
        <TabColumns data={data} />
        <Toaster />
      </section>
    </>
  );
}
