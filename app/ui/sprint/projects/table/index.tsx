"use client";

import { IProjects } from "@/app/lib/definitions/projects";
import { DataTable } from "@/app/ui/common/table";
import React from "react";
import { columns } from "./columns";
import DialogCustom from "@/app/ui/common/dialog";
import CreateProjectForm from "../form/create-project";

interface IProjectsTableProps {
  data: IProjects[];
}

export default function ProjectsTable({ data }: IProjectsTableProps) {
  const { onOpen, onClose, DialogComponent } = DialogCustom();

  return (
    <>
      <DataTable
        columns={columns}
        data={data || []}
        buttonOptions={{
          primaryAction: { name: "Create project", action: onOpen },
        }}
      />
      <DialogComponent
        dialogHeader={{
          title: "Create a project",
          description: `Create a project. Click create when you're done.`,
        }}
        content={<CreateProjectForm />}
        contextClassName="w-[1000px] max-w-none"
      />
    </>
  );
}
