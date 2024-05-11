"use client";
import useLoading from "@/app/lib/hooks/useLoading";
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";

type ButtonType = "default" | "link";

export type LinkVariants =
  | "default"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

interface IActionButton extends ButtonProps {
  children: ReactNode;
  loading?: boolean;
  buttonType?: ButtonType;
  href?: string;
  linkVariant?: LinkVariants;
}

export default function ActionButton({
  children,
  loading,
  buttonType = "default",
  href,
  linkVariant = "default",
  ...props
}: IActionButton) {
  const { isLoading: isLoadingRedirect, startLoading: startLoadingRedirect } =
    useLoading();

  const router = useRouter();

  const onRedirect = () => {
    startLoadingRedirect();
    router.push(href || "");
  };

  if (buttonType === "link")
    return (
      <Button {...props} disabled={isLoadingRedirect} onClick={onRedirect}>
        {isLoadingRedirect && <LoaderIcon className="animate-spin mr-2" />}{" "}
        {children}
      </Button>
    );

  return (
    <Button {...props} disabled={loading}>
      {loading && <LoaderIcon className="animate-spin mr-2" />} {children}
    </Button>
  );
}
