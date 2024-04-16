import { getTodos } from "@/app/lib/data";
import { TabColumns } from "@/app/ui/common/tab-columns";
import { EditForm } from "@/app/ui/sprint/main/form/edit";

export default async function Sprint({ params }: { params: { id: string } }) {
  const data = await getTodos();
  const { id } = params;

  return (
    <section className="mt-small overflow-auto">
      <TabColumns data={data} />
      <EditForm id={id} />
    </section>
  );
}
