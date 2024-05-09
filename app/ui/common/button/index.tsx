"use client";
import useLoading from "@/app/lib/hooks/useLoading";
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type ButtonType = "default" | "link";

export type LinkVariants =
  | "default"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

interface ILoaderButton extends ButtonProps {
  title: string;
  loading?: boolean;
  buttonType?: ButtonType;
  href?: string;
  linkVariant?: LinkVariants;
}

export default function ActionButton({
  title,
  loading,
  buttonType = "default",
  href,
  linkVariant = "default",
  ...props
}: ILoaderButton) {
  const { isLoading: isLoadingRedirect, startLoading: startLoadingRedirect } =
    useLoading();

  if (buttonType === "link")
    return (
      <Link
        className={buttonVariants({ variant: linkVariant })}
        href={href || ""}
        onClick={startLoadingRedirect}
      >
        {isLoadingRedirect && <LoaderIcon className="animate-spin mr-2" />}{" "}
        {title}
      </Link>
    );

  return (
    <Button {...props} disabled={loading}>
      {loading && <LoaderIcon className="animate-spin mr-2" />} {title}
    </Button>
  );
}
