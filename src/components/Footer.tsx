import { Container } from "@/components/ui/Container";
import { AUTHOR, RSS_PATH } from "@/lib/site";

const linkClass =
  "inline-flex min-h-(--tap) items-center px-2 transition-colors first:pl-0 hover:text-accent";

export const Footer: React.FC = () => (
  <footer className="mt-24 border-t border-line">
    <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-6 font-mono text-xs text-mute">
      <p>&copy; {new Date().getFullYear()} comstering</p>
      <nav aria-label="외부 링크" className="flex flex-wrap">
        <a
          href={AUTHOR.github}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          github<span className="sr-only"> (새 창에서 열림)</span>
        </a>
        <a
          href={AUTHOR.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          linkedin<span className="sr-only"> (새 창에서 열림)</span>
        </a>
        <a href={`mailto:${AUTHOR.email}`} className={linkClass}>
          email
        </a>
        <a href={RSS_PATH} className={linkClass}>
          rss
        </a>
      </nav>
    </Container>
  </footer>
);
