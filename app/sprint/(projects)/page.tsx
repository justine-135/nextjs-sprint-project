import { GetProjects } from "@/app/lib/data";
import { columns } from "./table/columns";
import { DataTable } from "@/app/ui/common/table";
import { redirect } from "next/navigation";

export default async function Projects() {
  const data = await GetProjects();

  return (
    <main className="">
      <DataTable columns={columns} data={data || []} />
    </main>
  );
}
