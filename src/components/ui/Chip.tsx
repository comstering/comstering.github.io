import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type ChipProps = ComponentPropsWithoutRef<"button"> & {
  selected?: boolean;
};

export const Chip = ({
  selected = false,
  className,
  type = "button",
  ...props
}: ChipProps) => (
  <button
    type={type}
    aria-pressed={selected}
    className={cn(
      "cursor-pointer whitespace-nowrap rounded-md border px-3 py-1.5 font-mono text-xs transition-colors",
      selected
        ? "border-fg bg-fg text-canvas"
        : "border-line text-mute hover:border-accent hover:text-fg",
      className,
    )}
    {...props}
  />
);
