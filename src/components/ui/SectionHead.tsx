import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionHeadProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

// 시그니처 3번: `// label ────` 형식의 섹션 제목
export const SectionHead = ({ id, children, className }: SectionHeadProps) => (
  <h2
    id={id}
    className={cn(
      "flex items-center gap-3 font-mono text-meta font-normal text-mute after:h-px after:flex-1 after:bg-line",
      className,
    )}
  >
    <span className="text-fg">
      <span aria-hidden className="text-mute">
        {"// "}
      </span>
      {children}
    </span>
  </h2>
);
