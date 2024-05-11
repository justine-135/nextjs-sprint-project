import React, { ReactNode } from "react";
import ActionButton from "..";
import { ArrowLeft } from "lucide-react";

interface IBackButtonProps {
  href?: string;
}

export default function BackButton({ href }: IBackButtonProps) {
  return (
    <ActionButton variant="ghost" href={href} buttonType="link">
      <ArrowLeft height={20} width={20} />
    </ActionButton>
  );
}
