import fs from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";
import { selectRelated } from "../src/lib/related";

const post = (
  id: string,
  tags: string[],
  date: string,
  extra: { series?: string; draft?: boolean } = {},
) => ({ id, tags, date, draft: false, ...extra });

test.describe("selectRelated", () => {
  const current = post("cur", ["a", "b", "c"], "2026-01-01", { series: "s1" });

  test("태그 교집합 수가 많은 순, 같으면 최신순", () => {
    const result = selectRelated(current, [
      post("one-old", ["a"], "2025-01-01"),
      post("two", ["a", "b"], "2025-06-01"),
      post("one-new", ["c"], "2025-12-01"),
    ]);
    expect(result.map((p) => p.id)).toEqual(["two", "one-new", "one-old"]);
  });

  test("점수 0인 글로는 채우지 않는다", () => {
    expect(
      selectRelated(current, [post("x", ["z"], "2025-01-01")]),
    ).toEqual([]);
  });

  test("현재 글·같은 시리즈·이전/다음 글·draft는 제외한다", () => {
    const result = selectRelated(
      current,
      [
        current,
        post("same-series", ["a", "b"], "2025-01-01", { series: "s1" }),
        post("adjacent", ["a", "b"], "2025-01-01"),
        post("draft", ["a", "b"], "2025-01-01", { draft: true }),
        post("ok", ["a"], "2025-01-01", { series: "s2" }),
      ],
      ["adjacent"],
    );
    expect(result.map((p) => p.id)).toEqual(["ok"]);
  });

  test("최대 3편", () => {
    const many = Array.from({ length: 6 }, (_, i) =>
      post(`p${i}`, ["a"], `2025-0${i + 1}-01`),
    );
    expect(selectRelated(current, many)).toHaveLength(3);
  });
});

// 빌드 산출물에서: 같은 글이 시리즈 박스·이전/다음·관련 글에 겹치지 않는다.
test("글마다 관련 글은 시리즈 글·이전/다음 글·자기 자신과 겹치지 않는다", () => {
  const dir = path.resolve("out/posts");
  const hrefs = (html: string) =>
    [...html.matchAll(/href="\/posts\/([^"#?]+)"/g)].map((match) => match[1]);

  for (const file of fs.readdirSync(dir).filter((n) => n.endsWith(".html"))) {
    const slug = file.replace(/\.html$/, "");
    const html = fs.readFileSync(path.join(dir, file), "utf8");
    const section = (from: string, to: string) => {
      const start = html.indexOf(from);
      const end = html.indexOf(to, start + 1);
      return start === -1 ? "" : html.slice(start, end === -1 ? undefined : end);
    };
    const related = hrefs(section('aria-labelledby="related-title"', 'aria-labelledby="comments-title"'));
    const pager = hrefs(section('aria-label="이전/다음 글"', 'aria-labelledby="related-title"'));
    const series = hrefs(section('class="series', "</section>"));

    expect(related.length, `${slug} 관련 글 수`).toBeLessThanOrEqual(3);
    expect(new Set(related).size, `${slug} 관련 글 중복`).toBe(related.length);
    for (const id of related) {
      expect(id, `${slug}: 자기 자신`).not.toBe(slug);
      expect(pager, `${slug}: 이전/다음과 겹침 ${id}`).not.toContain(id);
      expect(series, `${slug}: 시리즈와 겹침 ${id}`).not.toContain(id);
    }
  }
});

test("관련 글 섹션: 이전/다음 아래·댓글 위에 있고 0편이면 없다", async ({
  page,
}) => {
  await page.goto("/posts/karpenter");
  const section = page.locator("section[aria-labelledby='related-title']");
  await expect(section.locator("article")).toHaveCount(3);
  const pager = await page.locator("nav[aria-label='이전/다음 글']").boundingBox();
  const related = await section.boundingBox();
  const comments = await page.locator("#comments-title").boundingBox();
  expect(related!.y).toBeGreaterThan(pager!.y);
  expect(related!.y).toBeLessThan(comments!.y);

  await page.goto("/posts/implement-my-site"); // 태그가 겹치는 글이 없다
  await expect(page.locator("#related-title")).toHaveCount(0);
});
