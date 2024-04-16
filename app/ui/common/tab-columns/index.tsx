"use client";

import React from "react";
import { ITabColumns, ITags, ITodos } from "@/app/lib/definitions/tab-column";
import { Badge } from "@/components/ui/badge";
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
import { CreateModal } from "@/app/ui/sprint/main/create-modal";
import Link from "next/link";
import { ROUTE_URL } from "@/app/lib/constants/routeStrings";
import { TodoTypeValue } from "@/app/lib/constants/views";
import { ETodoViewType } from "@/app/lib/enums/views";

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
        <ActionButton />
      </div>
      <div className="my-small">
        <Link
          href={`/${ROUTE_URL.SPRINT}/${taskId}?view=${
            TodoTypeValue[ETodoViewType.PANE]
          }`}
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

const TabColumn = ({ data }: { data: ITabColumns }) => {
  const { id, title, todos } = data;

  return (
    <>
      <div className="flex items-center justify-between p-small border-default border-b-0 rounded-lg rounded-bl-none rounded-br-none">
        <div className="flex items-center gap-1">
          <p className="font-semibold">{title}</p>
          <Badge>{todos?.length}</Badge>
        </div>
        <CreateModal tabId={id} />
      </div>
      <div className="w-72 border-default rounded-lg rounded-tl-none rounded-tr-none h-full">
        <Todos todos={todos} />
      </div>
    </>
  );
};

export const TabColumns = ({ data }: { data?: ITabColumns[] }) => {
  return (
    <ul className="flex gap-6 fixed h-[84%]">
      {data?.map((col) => {
        return (
          <li className="flex-shrink-0" key={col.id}>
            <TabColumn data={col} />
          </li>
        );
      })}
    </ul>
  );
};
