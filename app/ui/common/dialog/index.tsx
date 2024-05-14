import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";

interface IDialogHeader {
  title?: string;
  description?: string;
}

export interface IDialogProps {
  dialogHeader?: IDialogHeader;
  content?: ReactNode;
  context?: ReactNode; // For ContextMenu and DropdownMenu
  contextClassName?: string;
}

export default function DialogCustom() {
  const [visible, setVisible] = useState(false);

  const onOpen = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const DialogComponent = ({
    dialogHeader,
    content,
    context,
    contextClassName = "",
  }: IDialogProps) => (
    <Dialog open={visible} onOpenChange={setVisible}>
      {context}
      <DialogContent className={contextClassName}>
        <DialogHeader>
          <DialogTitle>{dialogHeader?.title}</DialogTitle>
          <DialogDescription>{dialogHeader?.description}</DialogDescription>
        </DialogHeader>
        <div>{content}</div>
      </DialogContent>
    </Dialog>
  );

  return { onOpen, onClose, DialogComponent };
}
