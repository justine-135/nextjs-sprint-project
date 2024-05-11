"use client";

import { ITabColumns, ITags, ITodos } from "@/app/lib/definitions/tab-column";
import { Badge } from "@/components/ui/badge";
import {
  CircleDotDashedIcon,
  Edit2Icon,
  EllipsisVerticalIcon,
  LucideTrash,
  PlusIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ROUTE_URL } from "@/app/lib/constants/routeStrings";
import { useToast } from "@/components/ui/use-toast";
import useLoading from "@/app/lib/hooks/useLoading";
import { LoaderIcon } from "lucide-react";
import { CreateForm } from "@/app/ui/sprint/projects/form/create-task";
import DialogCustom, { IDialogProps } from "../dialog";
import ActionButton from "../button";
import DeleteTask from "@/app/ui/sprint/projects/form/delete-task";
import { DialogTrigger } from "@/components/ui/dialog";

interface IDropdownButton {
  id: number;
}

const DropdownButton = ({ id }: IDropdownButton) => {
  const { toast } = useToast();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { DialogComponent, onOpen, onClose } = DialogCustom();

  const actions = [
    { key: 1, name: "Edit", className: "", icon: <Edit2Icon size={13} /> },
    {
      key: 2,
      name: "Delete",
      className: "text-[red]",
      icon: <LucideTrash size={13} stroke="red" />,
    },
  ];

  return (
    <DialogComponent
      dialogHeader={{
        title: "Delete task",
        description: `If you want to delete this task number "${id}", click the Delete button.`,
      }}
      content={
        <div>
          <DeleteTask id={id} onClose={onClose} />
        </div>
      }
      context={
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            {isLoading ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              <EllipsisVerticalIcon size={16} />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {actions?.map((action) => {
              return (
                <DialogTrigger key={action?.key} asChild>
                  <DropdownMenuItem
                    key={action.name}
                    className="hover:bg-slate-100 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      {action?.icon}
                      <span className={action.className}>{action?.name}</span>
                    </div>
                  </DropdownMenuItem>
                </DialogTrigger>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      }
    />
  );
};

const TagComponent = ({ tags }: { tags?: ITags[] }) => {
  if (!tags) return null;
  return (
    <ul className="flex gap-1 flex-wrap">
      {tags?.map(({ id, text }: ITags) => {
        if (!id || !text) return null;
        return (
          <li key={id}>
            <Badge>{text}</Badge>
          </li>
        );
      })}
    </ul>
  );
};

const Todo = ({ todo }: { todo: ITodos }) => {
  const { id: taskId, title, tags } = todo;

  if (!taskId) return null;

  return (
    <div className="p-small border-default rounded-md ">
      <div className="flex items-center justify-between">
        {/* ID, and Option button part */}
        <div className="flex items-center gap-1">
          <CircleDotDashedIcon size={16} />
          <span className="text-xs text-slate-500">#{taskId}</span>
        </div>
        <DropdownButton id={taskId} />
      </div>
      <div className="my-small">
        <Link
          href={`/${ROUTE_URL.SPRINT}/pane/${taskId}`}
          className="hover:text-blue-600 hover:underline"
        >
          {title}
        </Link>
      </div>
      <TagComponent tags={tags} />
    </div>
  );
};

const Todos = ({ todos }: { todos?: ITodos[] }) => {
  if (!todos) return null;
  return (
    <ul className="flex flex-col gap-2 p-small overflow-auto h-full ">
      {todos?.map((todo) => {
        return (
          <li key={todo?.id}>
            <Todo todo={todo} />
          </li>
        );
      })}
    </ul>
  );
};

interface ITabColumnProps {
  data: ITabColumns;
}

const TabColumn = ({ data }: ITabColumnProps) => {
  const { id, title, todos } = data;
  const { DialogComponent, onOpen, onClose } = DialogCustom();

  return (
    <>
      <div className="flex items-center justify-between p-small border-default border-b-0 rounded-lg rounded-bl-none rounded-br-none">
        <div className="flex items-center gap-1">
          <p className="font-semibold">{title}</p>
          <Badge>{todos?.length}</Badge>
        </div>
        <ActionButton size={null} variant="outline" onClick={onOpen}>
          <PlusIcon />
        </ActionButton>
        <DialogComponent
          dialogHeader={{
            title: "Create task",
            description: `Create a '${title}' task here. Click create when you're done.`,
          }}
          content={<CreateForm tabId={id} handleCloseDialog={onClose} />}
        />
      </div>
      <div className="w-72 border-default rounded-lg rounded-tl-none rounded-tr-none h-full">
        <Todos todos={todos} />
      </div>
    </>
  );
};

export const TabColumns = ({ data }: { data?: ITabColumns[] }) => {
  return (
    <>
      <ul className="flex gap-6 fixed h-[84%]">
        {data?.map((col) => {
          return (
            <li className="flex-shrink-0" key={col.id}>
              <TabColumn data={col} />
            </li>
          );
        })}
      </ul>
    </>
  );
};
