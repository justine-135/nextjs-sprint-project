import React from "react";
import { TabColumn } from "./tab-column";
import { ITabColumns } from "@/app/lib/definitions/tab-column";

export const TabColumns = ({ data }: { data: ITabColumns[] }) => {
  return (
    <ul className="flex gap-6">
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
