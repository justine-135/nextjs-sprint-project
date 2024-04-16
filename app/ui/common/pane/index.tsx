import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";

interface IPaneProps {
  title?: string;
  children: ReactNode;
}

export const Pane = ({ title = "Pane title", children }: IPaneProps) => {
  return (
    <div>
      <div className="fixed inset-0 bg-slate-950 bg-opacity-50" />
      <div className="fixed top-0 right-0 w-[860px] h-full bg-white overflow-auto">
        <div className="modal_header flex items-center justify-between p-2">
          <p className="font-semibold">{title}</p>
          <Link href={`/sprint`}>
            <X size={16} />
          </Link>
        </div>
        <hr />
        {children}
      </div>
    </div>
  );
};
