import { ITodos } from "@/app/lib/definitions/tab-column";
import { Badge } from "@/components/ui/badge";
import { OptionsBtn } from "@/app/ui/common/options-btn";
import {
  CircleDotDashedIcon,
  Edit2Icon,
  EllipsisVerticalIcon,
  LucideTrash,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import clsx from "clsx";
import { getTags, getTodoTags } from "@/app/lib/data";

const actions = [
  { name: "Edit", icon: <Edit2Icon size={13} /> },
  { name: "Delete", icon: <LucideTrash size={13} stroke="red" /> },
];

const ActionButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVerticalIcon size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {actions?.map((action) => {
          return (
            <DropdownMenuItem
              key={action.name}
              className="hover:bg-slate-100 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                {action?.icon}
                <span
                  className={clsx(
                    "",
                    action?.name === "Delete" && "text-[red]"
                  )}
                >
                  {action?.name}
                </span>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const TagComponent = async ({ id }: { id: number }) => {
  const tagData = await getTags(id);

  return <Badge>{tagData?.text}</Badge>;
};

export const Todo = async ({ todo }: { todo: ITodos }) => {
  const todoData = await getTodoTags(todo.id);

  return (
    <div className="p-small border-default rounded-md">
      <div className="flex items-center justify-between">
        {/* ID, and Option button part */}
        <div className="flex items-center gap-1">
          <CircleDotDashedIcon size={16} />
          <span className="text-xs text-slate-500">#{todo?.id}</span>
        </div>
        <ActionButton />
      </div>
      <p className="my-small">{todo?.title}</p>
      <ul className="flex gap-1">
        {todoData?.map((tag) => {
          return (
            <li key={tag?.id}>
              <TagComponent id={tag?.id} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
