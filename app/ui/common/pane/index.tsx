import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";

interface IPaneProps {
  title?: string;
  id?: number;
  children: ReactNode;
}

export const Pane = ({ title = "Pane title", id, children }: IPaneProps) => {
  return (
    <>
      <div className="fixed inset-0 bg-slate-950 bg-opacity-50" />
      <div className="fixed top-0 right-0 w-[1060px] h-full bg-white overflow-auto rounded-tl-xl rounded-bl-xl">
        <div className="modal_header flex items-center justify-between p-md">
          <div className="flex">
            <p className="font-medium text-3xl w-3/4">
              {title} <span className="text-slate-500">[{id}]</span>
            </p>
          </div>

          <Link href={`/sprint`}>
            <X size={16} />
          </Link>
        </div>
        <hr />
        <div className="p-md"> {children}</div>
      </div>
    </>
  );
};
