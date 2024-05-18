"use client";

import { ITodosResponse } from "@/app/lib/definitions/tab-column";
import BackButton from "@/app/ui/common/button/backButton";
import { TabColumns } from "@/app/ui/common/tab-columns";
import { Toaster } from "@/components/ui/toaster";
import { createContext } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ScrollAreaStyled } from "./styled";
// import * as ScrollArea from "@radix-ui/react-scroll-area";

interface IProjectComponentProps {
  data?: ITodosResponse;
  projectId: string;
}

export const ProjectContext = createContext<string>("");

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

export default function ProjectComponent({
  data,
  projectId,
}: IProjectComponentProps) {
  return (
    <ProjectContext.Provider value={projectId}>
      <div className="PageHeader flex items-center gap-2 pl-layout pr-layout">
        <BackButton href="/sprint" />
        <h1 className="font-semibold text-xl">{data?.project?.name}</h1>
      </div>
      <ScrollAreaStyled className="ScrollArea mt-2">
        <TabColumns data={data?.result} />
        <ScrollBar className="h-2" orientation="horizontal" />
      </ScrollAreaStyled>
      <Toaster />
    </ProjectContext.Provider>
  );
}
