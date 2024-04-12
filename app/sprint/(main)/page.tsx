import { getTabColumns } from "@/app/lib/data";
import { MainPage } from "@/app/ui/sprint/main/page";
import { TabColumns } from "@/app/ui/common/tab-columns";
import SprintProject from "@/app/ui/sprint/main/sprint-project";

export default async function Sprint() {
  const tabColumns = await getTabColumns();

  return (
    <>
      <section className="mt-small overflow-auto">
        <SprintProject tabs={tabColumns} />
      </section>
      <MainPage />
    </>
  );
}
