"use client";

import {
  ITabLabelsResponse,
  ITodosResponse,
} from "@/app/lib/definitions/tab-column";
import BackButton from "@/app/ui/common/button/backButton";
import { TabColumns } from "@/app/ui/common/tab-columns";
import { Toaster } from "@/components/ui/toaster";
import { createContext } from "react";
import { ScrollBar } from "@/components/ui/scroll-area";
import { ScrollAreaStyled } from "./styled";

interface IProjectComponentProps {
  data?: ITodosResponse;
  tabLabelsData?: ITabLabelsResponse;
  projectId: string;
}

interface IProjectContext {
  projectId: string;
  tabLabelsData: ITabLabelsResponse | undefined;
}

export const ProjectContext = createContext<IProjectContext | null>(null);

export default function ProjectComponent({
  data,
  tabLabelsData,
  projectId,
}: IProjectComponentProps) {
  console.log(tabLabelsData);

  return (
    <ProjectContext.Provider value={{ projectId, tabLabelsData }}>
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
