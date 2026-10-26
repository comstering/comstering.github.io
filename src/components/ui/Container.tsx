import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export const Container = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) => (
  <div
    className={cn("mx-auto w-full max-w-[1120px] px-5 sm:px-6", className)}
    {...props}
  />
);
