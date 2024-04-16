import { getTodo, getTodos } from "@/app/lib/data";
import { TabColumns } from "@/app/ui/common/tab-columns";
import { EditForm } from "@/app/ui/sprint/main/form/edit";

export default async function Sprint({ params }: { params: { id: string } }) {
  const todosData = await getTodos();
  const { id } = params;
  const todoData = await getTodo(Number(id) as number);

  return (
    <section className="mt-small overflow-auto">
      <TabColumns data={todosData} />
      <EditForm data={todoData} />
    </section>
  );
}
