"use client";

import { ITodosResponse } from "@/app/lib/definitions/tab-column";
import BackButton from "@/app/ui/common/button/backButton";
import { TabColumns } from "@/app/ui/common/tab-columns";
import { Toaster } from "@/components/ui/toaster";
import { createContext } from "react";

interface IProjectComponentProps {
  data?: ITodosResponse;
  projectId: string;
}

export const ProjectContext = createContext<string>("");

export default function ProjectComponent({
  data,
  projectId,
}: IProjectComponentProps) {
  return (
    <ProjectContext.Provider value={projectId}>
      <div className="flex items-center gap-2">
        <BackButton href="/sprint" />
        <h1 className="font-semibold text-xl">{data?.project?.name}</h1>
      </div>
      <section className="mt-small overflow-x-auto overflow-y-hidden">
        <TabColumns data={data?.result} />
      </section>
      <Toaster />
    </ProjectContext.Provider>
  );
}
