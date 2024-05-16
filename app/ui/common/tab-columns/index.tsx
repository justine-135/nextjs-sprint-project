"use client";

import { ITabData, ITags, ITodos } from "@/app/lib/definitions/tab-column";
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
import { CreateTaskForm } from "@/app/ui/sprint/projects/form/create-task";
import DialogCustom, { IDialogProps } from "../dialog";
import ActionButton from "../button";
import DeleteTask from "@/app/ui/sprint/projects/form/delete-task";
import { DialogTrigger } from "@/components/ui/dialog";
import CreateTab from "@/app/ui/sprint/projects/form/create-tab";
import { useContext, useMemo, useState } from "react";
import EditTask from "@/app/ui/sprint/projects/form/edit-task";
import { ProjectContext } from "@/app/ui/sprint/projects/detail";

interface IDropdownButton {
  id: number;
}

const DropdownButton = ({ id }: IDropdownButton) => {
  const { DialogComponent, onClose } = DialogCustom();

  const projectId = useContext(ProjectContext);

  const [dialogData, setDialogData] = useState({
    header: {
      title: "Delete task",
      description: `If you want to delete this task number "${id}", click the Delete button.`,
    },
    content: <DeleteTask id={id} onClose={onClose} />,
  });

  const actions = [
    {
      key: 1,
      name: "Edit",
      className: "",
      icon: <Edit2Icon size={13} />,
      action: () => {
        setDialogData({
          header: {
            title: "Edit task",
            description: `If you want to edit this task number "${id}", click the Edit button.`,
          },
          content: <EditTask id={id} projectId={projectId} onClose={onClose} />,
        });
      },
    },
    {
      key: 2,
      name: "Delete",
      className: "text-[red]",
      icon: <LucideTrash size={13} stroke="red" />,
      action: () => {
        setDialogData({
          header: {
            title: "Delete task",
            description: `If you want to delete this task number "${id}", click the Delete button.`,
          },
          content: <DeleteTask id={id} onClose={onClose} />,
        });
      },
    },
  ];

  return (
    <DialogComponent
      dialogHeader={dialogData?.header}
      content={<div>{dialogData?.content}</div>}
      context={
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <EllipsisVerticalIcon size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {actions?.map((action) => {
              return (
                <DialogTrigger key={action?.key} asChild>
                  <DropdownMenuItem
                    key={action?.name}
                    className="hover:bg-slate-100 cursor-pointer"
                    onClick={action?.action}
                  >
                    <div className="flex items-center gap-2">
                      {action?.icon}
                      <span className={action?.className}>{action?.name}</span>
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

interface ITodoProps {
  todo: ITodos;
}

const Todo = ({ todo }: ITodoProps) => {
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
        <DropdownButton key={taskId} id={taskId} />
      </div>
      <div className="my-small">
        <p className="break-all hover:text-blue-600 hover:underline">{title}</p>
      </div>
      <TagComponent tags={tags} />
    </div>
  );
};

interface ITodosProps {
  todos?: ITodos[];
}

const Todos = ({ todos }: ITodosProps) => {
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
  data: ITabData;
}

const TabColumn = ({ data }: ITabColumnProps) => {
  const { id, title, todos } = data;
  const { DialogComponent, onOpen, onClose } = DialogCustom();

  const todosCount = useMemo(() => {
    if (todos?.[0]?.id === null) return 0;
    return todos?.length;
  }, [todos]);

  return (
    <>
      <div className="flex items-center justify-between p-small border-default border-b-0 rounded-lg rounded-bl-none rounded-br-none">
        <div className="flex items-center gap-1">
          <p className="font-semibold">{title}</p>
          <Badge>{todosCount}</Badge>
        </div>
        <ActionButton size={null} variant="outline" onClick={onOpen}>
          <PlusIcon />
        </ActionButton>
        <DialogComponent
          dialogHeader={{
            title: "Create task",
            description: `Create a '${title}' task here. Click create when you're done.`,
          }}
          content={<CreateTaskForm tabId={id} handleCloseDialog={onClose} />}
        />
      </div>
      <div className="h-[700px] w-64 border-default rounded-lg rounded-tl-none rounded-tr-none overflow-auto">
        <Todos todos={todos} />
      </div>
    </>
  );
};

interface ITabColumnsProps {
  data?: ITabData[];
}

export const TabColumns = ({ data }: ITabColumnsProps) => {
  const { onOpen, onClose, DialogComponent } = DialogCustom();
  const projectId = useContext(ProjectContext);

  return (
    <div className="flex items-start gap-6 h-[90%]">
      <ul className="flex gap-6 h-full overflow-x">
        {data?.map((col) => {
          return (
            <li className="flex-shrink-0 h-full" key={col.id}>
              <TabColumn data={col} />
            </li>
          );
        })}
      </ul>
      <ActionButton variant="outline" onClick={onOpen}>
        Add tab
        <PlusIcon />
      </ActionButton>
      <DialogComponent
        dialogHeader={{
          title: "Create task",
          description: `Create a task here. Click create when you're done.`,
        }}
        content={<CreateTab id={projectId} onClose={onClose} />}
      />
    </div>
  );
};
