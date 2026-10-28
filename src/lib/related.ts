// 관련 글 선정 (F-PO-06). 서버·빌드 타임에만 쓰이는 순수 함수라 따로 테스트한다.
interface RelatedCandidate {
  id: string;
  tags: string[];
  date: string;
  series?: string;
  draft: boolean;
}

export const MAX_RELATED = 3;

/**
 * 태그 교집합 수가 점수. 같은 점수면 최신순.
 * 현재 글, 같은 시리즈 글, `excludeIds`(이전/다음 글), draft는 제외하고
 * 점수 0인 글로는 채우지 않는다(0~3편).
 */
export const selectRelated = <T extends RelatedCandidate>(
  current: RelatedCandidate,
  posts: T[],
  excludeIds: string[] = [],
): T[] => {
  const tags = new Set(current.tags);
  return posts
    .filter(
      (post) =>
        post.id !== current.id &&
        !post.draft &&
        !excludeIds.includes(post.id) &&
        !(current.series && post.series === current.series),
    )
    .map((post) => ({
      post,
      score: post.tags.filter((tag) => tags.has(tag)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        (a.post.date === b.post.date ? 0 : a.post.date < b.post.date ? 1 : -1) ||
        (a.post.id < b.post.id ? -1 : 1),
    )
    .slice(0, MAX_RELATED)
    .map(({ post }) => post);
};
