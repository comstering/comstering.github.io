// 읽기 진행률(F-PO-10): 헤더 아래 2px accent 바. CSS scroll-driven animation만 쓴다(scroll 리스너 없음).
// 지원하지 않는 브라우저와 prefers-reduced-motion에서는 CSS가 숨긴다(globals.css `.reading-progress`).
export const PostProgress: React.FC = () => (
  <div className="reading-progress" aria-hidden="true">
    <div className="reading-progress__bar" />
  </div>
);
