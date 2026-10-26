import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export const Input = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"input">) => (
  <input
    className={cn(
      "block w-full rounded-md border border-line bg-surface px-4 py-3 text-base text-fg placeholder:text-mute transition-colors focus:border-accent focus:outline-none focus-visible:outline-none",
      className,
    )}
    {...props}
  />
);
