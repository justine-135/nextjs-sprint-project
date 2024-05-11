import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";

interface IDialogHeader {
  title?: string;
  description?: string;
}

export interface IDialogProps {
  dialogTrigger?: ReactNode;
  dialogHeader?: IDialogHeader;
  children?: ReactNode;
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
    dialogTrigger,
    dialogHeader,
    children,
  }: IDialogProps) => (
    <Dialog open={visible} onOpenChange={setVisible}>
      <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{dialogHeader?.title}</DialogTitle>
          <DialogDescription>{dialogHeader?.description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );

  return { onOpen, onClose, DialogComponent };
}
