"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import React from "react";
import Modal from "@/app/ui/common/modal";
import { CreateForm } from "./form/create";

export const AddTodoBtn = ({ tabId }: { tabId: number }) => {
  const { onOpen, ModalComponent } = Modal();

  return (
    <>
      <ModalComponent title="Add todo">
        <CreateForm tabId={tabId} />
      </ModalComponent>
      <Button size={null} variant="outline" onClick={onOpen}>
        <PlusIcon />
      </Button>
    </>
  );
};
