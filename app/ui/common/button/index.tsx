import { Button, ButtonProps } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import React from "react";

interface ILoaderButton extends ButtonProps {
  title: string;
  loading: boolean;
}

export default function LoaderButton({
  title,
  loading,
  ...props
}: ILoaderButton) {
  return (
    <Button {...props} disabled={loading}>
      {loading && <LoaderIcon className="animate-spin mr-2" />} {title}
    </Button>
  );
}
