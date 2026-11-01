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
      "relative min-h-8 cursor-pointer whitespace-nowrap rounded-md border px-3 py-1.5 font-mono text-xs transition-colors after:absolute after:inset-x-0 after:-inset-y-1.5 after:content-['']",
      selected
        ? "border-fg bg-fg text-canvas"
        : "border-line text-mute hover:border-accent hover:text-fg",
      className,
    )}
    {...props}
  />
);
