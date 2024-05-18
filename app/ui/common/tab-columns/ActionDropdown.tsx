"use client";

import DialogCustom from "../dialog";
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
import { useContext, useState } from "react";
import DeleteTask from "@/app/ui/sprint/projects/form/delete-task";
import { ProjectContext } from "@/app/ui/sprint/projects/detail";
import {
  Edit2Icon,
  Edit3Icon,
  EllipsisVerticalIcon,
  LucideEdit,
  LucideTrash,
} from "lucide-react";

interface IDropdownButton {
  id: number;
}

export default function ActionDropdown({ id }: IDropdownButton) {
  const { DialogComponent, onOpen, onClose } = DialogCustom();

  const [dialogData, setDialogData] = useState({
    header: {
      title: "Delete task",
      description: `If you want to delete this task number "${id}", click the Delete button.`,
    },
    content: <DeleteTask id={id} onClose={onClose} />,
  });

  const contextData = useContext(ProjectContext);

  const statusLabels = contextData?.tabLabelsData?.result?.map((data) => {
    return {
      id: data?.id,
      title: data?.title,
    };
  });

  console.log(statusLabels);
  const actions = [
    {
      key: 1,
      type: EActionDropdown.SUB_MENU_ITEM,
      name: "Set status",
      className: "SetStatusItem",
      icon: <LucideEdit size={13} />,
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

                    {/* <DropdownMenuPortal> */}
                    <DropdownMenuSubContent className="p-0">
                      <Command>
                        <CommandInput
                          placeholder="Filter label..."
                          autoFocus={true}
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No label found.</CommandEmpty>
                          <CommandGroup>
                            {statusLabels?.map((label) => (
                              <CommandItem
                                key={label?.id}
                                value={label?.title}
                                // onSelect={(value) => {
                                //   setLabel(value);
                                //   setOpen(false);
                                // }}
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
                    onClick={action?.action}
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
