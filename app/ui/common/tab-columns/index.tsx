"use client";

import React, { useState } from "react";
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
import clsx from "clsx";
import Link from "next/link";
import { ROUTE_URL } from "@/app/lib/constants/routeStrings";
import { DeleteTodo } from "@/app/lib/actions/queries";
import { useToast } from "@/components/ui/use-toast";
import useLoading from "@/app/lib/hooks/useLoading";
import { LoaderIcon } from "lucide-react";
import Modal from "../modal";
import { CreateForm } from "../../sprint/main/form/create";
import { Button } from "@/components/ui/button";

interface IActionButton {
  id: number;
}

const ActionButton = ({ id }: IActionButton) => {
  const { toast } = useToast();
  const { isLoading, startLoading, stopLoading } = useLoading();

  const actions = [
    { name: "Edit", icon: <Edit2Icon size={13} /> },
    {
      name: "Delete",
      icon: <LucideTrash size={13} stroke="red" />,
    },
  ];

  const onDelete = async () => {
    if (id) {
      startLoading();
      try {
        const res = await DeleteTodo(id);
        if (res.success)
          toast({
            title: "Task has been deleted",
          });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Something went wrong!",
          description: error as React.ReactNode,
        });
      } finally {
        stopLoading();
      }
    }
  };

  return (
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
          const onAction = () => {
            if (action.name === "Delete") onDelete();
          };

          return (
            <DropdownMenuItem
              key={action.name}
              className="hover:bg-slate-100 cursor-pointer"
            >
              <div className="flex items-center gap-2" onClick={onAction}>
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

  return (
    <div className="p-small border-default rounded-md ">
      <div className="flex items-center justify-between">
        {/* ID, and Option button part */}
        <div className="flex items-center gap-1">
          <CircleDotDashedIcon size={16} />
          <span className="text-xs text-slate-500">#{taskId}</span>
        </div>
        <ActionButton id={taskId} />
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
  onOpenModal: () => void;
  setTabId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const TabColumn = ({ data, onOpenModal, setTabId }: ITabColumnProps) => {
  const { id, title, todos } = data;

  const handleOpenModal = () => {
    onOpenModal();
    setTabId(id);
  };

  return (
    <>
      <div className="flex items-center justify-between p-small border-default border-b-0 rounded-lg rounded-bl-none rounded-br-none">
        <div className="flex items-center gap-1">
          <p className="font-semibold">{title}</p>
          <Badge>{todos?.length}</Badge>
        </div>
        <Button size={null} variant="outline" onClick={handleOpenModal}>
          <PlusIcon />
        </Button>
      </div>
      <div className="w-72 border-default rounded-lg rounded-tl-none rounded-tr-none h-full">
        <Todos todos={todos} />
      </div>
    </>
  );
};

export const TabColumns = ({ data }: { data?: ITabColumns[] }) => {
  const [tabId, setTabId] = useState<number>();
  const { onOpen, ModalComponent, onClose } = Modal();

  return (
    <>
      <ul className="flex gap-6 fixed h-[84%]">
        {data?.map((col) => {
          return (
            <li className="flex-shrink-0" key={col.id}>
              <TabColumn data={col} onOpenModal={onOpen} setTabId={setTabId} />
            </li>
          );
        })}
      </ul>
      <ModalComponent title="Add todo">
        <CreateForm tabId={tabId} afterClose={onClose} />
      </ModalComponent>
    </>
  );
};
