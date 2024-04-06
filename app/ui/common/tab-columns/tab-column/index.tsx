import { ITabColumns } from "@/app/lib/definitions/tab-column";
import { Todos } from "./todos";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export const TabColumn = ({ data }: { data: ITabColumns }) => {
  return (
    <div className="w-72 p-small border-default rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          <p className="font-semibold">{data?.title}</p>
          <Badge>{data?.count}</Badge>
        </div>
        <Button size={null} variant="outline">
          <PlusIcon />
        </Button>
      </div>
      <Todos todos={data?.todos} />
    </div>
  );
};
