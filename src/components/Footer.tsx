import { Container } from "@/components/ui/Container";

export const Footer: React.FC = () => (
  <footer className="mt-24 border-t border-line">
    <Container className="flex flex-wrap items-center justify-between gap-3 py-8 font-mono text-xs text-mute">
      <p>&copy; {new Date().getFullYear()} comstering</p>
      <a
        href="https://github.com/comstering"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors hover:text-accent"
      >
        github
      </a>
    </Container>
  </footer>
);
