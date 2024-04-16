"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React, { ReactNode } from "react";
import { useToggle } from "react-use";

interface ModalProps {
  children: ReactNode;
  title: string;
}

export default function Modal() {
  const [visible, setVisible] = useToggle(false);
  const onClose = () => setVisible(false);
  const onOpen = () => setVisible(true);

  const ModalComponent = ({ children, title = "Modal" }: ModalProps) => {
    if (!visible) return null;

    return (
      <>
        <div className="fixed inset-0 bg-slate-950 bg-opacity-50" />
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[560px] bg-white rounded-lg">
          <div className="modal_header flex items-center justify-between p-2">
            <p className="font-semibold">{title}</p>
            <Button className="p-0 h-4" variant={null} onClick={onClose}>
              <X size={16} />
            </Button>
          </div>
          <hr />
          <div className="modal_body">{children}</div>
        </div>
      </>
    );
  };

  return { ModalComponent, onClose, onOpen };
}
