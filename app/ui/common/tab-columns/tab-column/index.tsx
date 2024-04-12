import { ITabColumns } from "@/app/lib/definitions/tab-column";
import { Todos } from "./todos";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { getTodos } from "@/app/lib/data";
import { Modal } from "../../modal";

export const TabColumn = async ({ data }: { data: ITabColumns }) => {
  // const { setForm } = useModal();

  const todoData = await getTodos(data.id);

  const { onOpen } = Modal();

  return (
    <div className="w-72 p-small  border-default rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          <p className="font-semibold">{data?.title}</p>
          <Badge>{todoData?.length}</Badge>
        </div>
        {/* <Button size={null} variant="outline" onClick={() => setForm(data?.id)}> */}
        <Button size={null} variant="outline" onClick={onOpen}>
          <PlusIcon />
        </Button>
      </div>
      <Todos todos={todoData} />
    </div>
  );
};
