import { ITabColumns } from "@/app/lib/definitions/tab-column";
import { Todos } from "./todos";
import { AddTodoBtn } from "@/app/ui/sprint/main/add-btn";
import { CountBadge } from "./count-badge";

export const TabColumn = ({ data }: { data: ITabColumns }) => {
  return (
    <div className="w-72 p-small  border-default rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          <p className="font-semibold">{data?.title}</p>
          <CountBadge tabId={data?.id} />
        </div>
        <AddTodoBtn tabId={data?.id} />
      </div>
      <Todos tabId={data?.id} />
    </div>
  );
};
