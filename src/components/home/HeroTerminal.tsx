import type { SiteConfig } from "@/lib/content/profile-schema";

// 홈 히어로(PRD-004 5.2): 터미널 명령 줄 + 문구 한 줄. 값은 content/site.yaml.
// h1은 사이트 이름을 sr-only로 읽히고, 보이는 명령 줄은 aria-hidden. 커서 깜빡임은 사이트에서 여기 한 곳뿐이다.
export const HeroTerminal = ({ site }: { site: SiteConfig }) => (
  <>
    <h1 className="hero__title" id="hero-title">
      <span className="sr-only">{site.title}</span>
      <span aria-hidden="true">
        <span className="term__prompt">$</span> {site.command}
        <span className="cursor-blink" />
      </span>
    </h1>
    <p className="hero__sub">{site.tagline}</p>
  </>
);
