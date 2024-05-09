import React, { ReactNode } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ButtonVariants } from "@/app/lib/definitions/buttons";

interface ILinkButtonProps {
  href: string;
  title: ReactNode;
  variant?: ButtonVariants;
}

export default function LinkButton({
  href,
  title,
  variant = "default",
}: ILinkButtonProps) {
  return (
    <Link className={buttonVariants({ variant })} href={href}>
      {title}
    </Link>
  );
}
