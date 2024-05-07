import { getTodos } from "@/app/lib/data";
import { TabColumns } from "@/app/ui/common/tab-columns";
import { Toaster } from "@/components/ui/toaster";

export default async function Sprint() {
  const data = await getTodos();

  return (
    <section className="mt-small h-full">
      <TabColumns data={data} />
      <Toaster />
    </section>
  );
}
