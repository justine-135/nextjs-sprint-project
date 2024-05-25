"use client";

import DialogCustom, { IDialogHeader } from "../dialog";
import { EActionDropdown } from "@/app/enums/todo";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandSeparator,
  CommandItem,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import DeleteTask from "@/app/ui/sprint/projects/form/delete-task";
import { ProjectContext } from "@/app/ui/sprint/projects/detail";
import {
  Edit2Icon,
  Edit3Icon,
  EllipsisVerticalIcon,
  LucideEdit,
  LucideTrash,
} from "lucide-react";
import EditTask from "@/app/ui/sprint/projects/form/edit-task";

export interface IStatusDataState {
  id?: number;
  title?: string;
}
interface IDropdownButton {
  id: number;
}

interface IStatusLabelData {
  title?: string;
  id?: number;
}

interface IDialogData {
  header: IDialogHeader;
  statusLabelData?: IStatusLabelData;
  content?: JSX.Element;
}

export default function ActionDropdown({ id }: IDropdownButton) {
  const todoId = id;

  const { DialogComponent, onOpen, onClose } = DialogCustom();

  const [dialogData, setDialogData] = useState<IDialogData>();

  const contextData = useContext(ProjectContext);

  const statusLabels = contextData?.tabLabelsData?.result?.map((data) => {
    return {
      id: data?.id,
      title: data?.title,
    };
  });

  const actions = [
    {
      key: 1,
      type: EActionDropdown.SUB_MENU_ITEM,
      name: "Set status",
      className: "SetStatusItem",
      icon: <LucideEdit size={13} />,
      action: ({ id, title }: IStatusLabelData = {}) => {
        onOpen();
        setDialogData({
          header: {
            title: "Set label",
            description: (
              <span>
                If you want to set this task number {id} to{" "}
                <span className="font-bold">{title}</span>, click the Set
                button.
              </span>
            ),
          },
          statusLabelData: {
            id,
            title,
          },
          content: (
            <EditTask
              todoId={todoId}
              statusId={id}
              title={title}
              onClose={onClose}
            />
          ),
        });
      },
    },
    {
      key: 2,
      type: EActionDropdown.MENU_ITEM,
      name: "Delete",
      className: "DeleteItem text-[red]",
      icon: <LucideTrash size={13} stroke="red" />,
      action: () => {
        onOpen();
        setDialogData({
          header: {
            title: "Delete task",
            description: `If you want to delete this task number "${todoId}", click the Delete button.`,
          },
          content: <DeleteTask id={todoId} onClose={onClose} />,
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
              if (action?.type === EActionDropdown.SUB_MENU_ITEM)
                return (
                  <DropdownMenuSub key={action?.key}>
                    <DropdownMenuSubTrigger>
                      <div className="flex items-center gap-2">
                        {action?.icon}
                        <span className={action?.className}>
                          {action?.name}
                        </span>
                      </div>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="p-0">
                      <Command>
                        <CommandInput
                          placeholder="Filter status ..."
                          autoFocus={true}
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No label found.</CommandEmpty>
                          <CommandGroup>
                            {statusLabels?.map((label) => (
                              <CommandItem
                                key={label?.id}
                                value={String(label?.id)}
                                onSelect={(value) => {
                                  action?.action({
                                    id: label.id,
                                    title: label.title,
                                  });
                                }}
                              >
                                {label?.title}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                );

              if (action?.type === EActionDropdown.MENU_ITEM)
                return (
                  <DropdownMenuItem
                    key={action?.key}
                    className="hover:bg-slate-100 cursor-pointer"
                    onClick={() => action?.action()}
                  >
                    <div className="flex items-center gap-2">
                      {action?.icon}
                      <span className={action?.className}>{action?.name}</span>
                    </div>
                  </DropdownMenuItem>
                );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      }
    />
  );
}
