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
    <header className="site-header sticky top-0 z-40 border-b border-line bg-canvas/90 backdrop-blur">
      <Container className="flex min-h-16 flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2 font-mono text-sm">
        <Link
          href="/"
          className="relative font-bold tracking-tight text-fg after:absolute after:-inset-x-2 after:-inset-y-3 after:content-['']"
        >
          ~/comstering<span className="text-accent">_</span>
        </Link>
        <nav aria-label="주요 메뉴" className="flex flex-wrap items-center gap-x-5 gap-y-1">
          {NAV_ITEMS.map(({ href, label, match }) => {
            const active = match(pathname);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative transition-colors after:absolute after:-inset-x-2 after:-inset-y-3 after:content-[''] hover:text-fg",
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
