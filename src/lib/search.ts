// 헤더 검색 팔레트의 인덱스 모양과 검색 규칙(PRD-004 5.7, 디자인 25번 4장). 서버·클라이언트가 같이 쓰는 순수 모듈이다.

/** /search-index.json의 한 항목. 글(draft 제외)만 들어간다. */
export interface SearchEntry {
  /** 제목 */
  t: string;
  /** 설명 */
  desc: string;
  /** 날짜 YYYY-MM-DD */
  d: string;
  /** 카테고리 */
  c: string[];
  tags: string[];
  /** 소제목(h2·h3) */
  h: string[];
  /** 글 주소 */
  u: string;
}

export interface SearchHit {
  entry: SearchEntry;
  /** 소제목에서만 맞았을 때 그 소제목 */
  heading: string | null;
}

const newestFirst = (a: SearchEntry, b: SearchEntry) =>
  a.d < b.d ? 1 : a.d > b.d ? -1 : 0;

/** 빈 입력: 최근 글 5편 */
export const recentEntries = (index: SearchEntry[], limit = 5): SearchHit[] =>
  [...index]
    .sort(newestFirst)
    .slice(0, limit)
    .map((entry) => ({ entry, heading: null }));

// 가중: 제목 일치 > 설명·태그·카테고리 > 소제목. 같으면 최신 글 먼저. 대소문자 무시, 부분 일치.
export const searchEntries = (
  index: SearchEntry[],
  query: string,
): SearchHit[] => {
  const q = query.trim().toLowerCase();
  if (!q) return recentEntries(index);

  const scored: (SearchHit & { score: number })[] = [];
  for (const entry of index) {
    const titleAt = entry.t.toLowerCase().indexOf(q);
    if (titleAt > -1) {
      scored.push({ entry, heading: null, score: 300 - Math.min(titleAt, 99) });
      continue;
    }
    const rest = `${entry.desc} ${entry.tags.join(" ")} ${entry.c.join(" ")}`;
    if (rest.toLowerCase().includes(q)) {
      scored.push({ entry, heading: null, score: 200 });
      continue;
    }
    const heading = entry.h.find((text) => text.toLowerCase().includes(q));
    if (heading) scored.push({ entry, heading, score: 100 });
  }
  return scored
    .sort((a, b) => b.score - a.score || newestFirst(a.entry, b.entry))
    .map(({ entry, heading }) => ({ entry, heading }));
};

/** 맞은 글자를 앞·맞은 부분·뒤로 나눈다(<mark>에 쓴다). */
export const splitMatch = (
  text: string,
  query: string,
): [string, string, string] => {
  const q = query.trim().toLowerCase();
  const at = q ? text.toLowerCase().indexOf(q) : -1;
  return at < 0
    ? [text, "", ""]
    : [
        text.slice(0, at),
        text.slice(at, at + q.length),
        text.slice(at + q.length),
      ];
};
