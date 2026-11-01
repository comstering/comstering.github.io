import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type IconButtonProps = ComponentPropsWithoutRef<"button"> & {
  "aria-label": string;
};

export const IconButton = ({
  className,
  type = "button",
  ...props
}: IconButtonProps) => (
  <button
    type={type}
    className={cn(
      "inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-md border border-line text-fg transition-colors hover:border-accent hover:text-accent",
      className,
    )}
    {...props}
  />
);
