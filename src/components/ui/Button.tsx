import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";

// 링크(<a>, <Link>)에도 같은 모양을 쓸 수 있도록 클래스 문자열을 따로 내보낸다.
export const buttonClass = (
  variant: ButtonVariant = "primary",
  className?: string,
): string =>
  cn(
    "inline-flex h-(--tap) items-center justify-center gap-2 whitespace-nowrap rounded-md border px-4 font-mono text-meta font-medium transition-colors active:translate-y-px",
    variant === "primary" &&
      "border-transparent bg-accent text-accent-on hover:bg-accent/90",
    variant === "secondary" &&
      "border-line-strong text-fg hover:border-accent hover:text-accent",
    variant === "ghost" && "border-transparent text-fg hover:text-accent",
    className,
  );

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
};

export const Button = ({
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonProps) => (
  <button type={type} className={buttonClass(variant, className)} {...props} />
);
