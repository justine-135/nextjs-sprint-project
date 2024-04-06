import { TabColumnsData } from "@/app/lib/data";
import { TabColumns } from "../../common/tab-columns";

export const TabColumnData = () => {
  return (
    <section className="mt-small overflow-auto">
      <TabColumns data={TabColumnsData} />
    </section>
  );
};
