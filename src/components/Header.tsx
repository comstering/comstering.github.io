"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { href: "/", label: "posts", match: (path: string) => path === "/" || path.startsWith("/posts") },
  { href: "/about", label: "about", match: (path: string) => path.startsWith("/about") },
];

export const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between font-mono text-sm">
        <Link href="/" className="font-bold tracking-tight text-fg">
          ~/comstering<span className="text-accent">_</span>
        </Link>
        <nav aria-label="주요 메뉴" className="flex items-center gap-5">
          {NAV_ITEMS.map(({ href, label, match }) => {
            const active = match(pathname);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "transition-colors hover:text-fg",
                  active ? "text-fg" : "text-mute",
                )}
              >
                {label}
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  );
};
