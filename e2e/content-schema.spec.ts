import { expect, test } from "@playwright/test";
import {
  frontmatterSchema,
  seriesRegistrySchema,
} from "../src/lib/content/schema";

// 브라우저 없이 frontmatter 규칙만 검사한다(PRD-003 PR-9 수용 기준 3).
const valid = {
  title: "t",
  description: "d",
  date: "2026-10-28",
  categories: ["oss", "infra"],
  tags: ["aws"],
};

const messages = (data: unknown) => {
  const result = frontmatterSchema.safeParse(data);
  return result.success
    ? []
    : result.error.issues.map((issue) => issue.message);
};

test("categories는 고정 순서로 정렬된다", () => {
  const result = frontmatterSchema.parse(valid);
  expect(result.categories).toEqual(["infra", "oss"]);
});

test("단수 category 필드는 빌드 실패", () => {
  const { categories, ...rest } = valid;
  void categories;
  expect(messages({ ...rest, category: "infra" }).length).toBeGreaterThan(0);
});

test("updated 필드는 빌드 실패", () => {
  expect(messages({ ...valid, updated: "2026-10-29" }).join()).toMatch(
    /unrecognized|Unrecognized/i,
  );
});

test("categories는 1~2개, 중복 금지", () => {
  expect(messages({ ...valid, categories: [] }).join()).toContain("1개 이상");
  expect(
    messages({ ...valid, categories: ["infra", "oss", "note"] }).join(),
  ).toContain("최대 2개");
  expect(messages({ ...valid, categories: ["infra", "infra"] }).join()).toContain(
    "중복",
  );
  expect(messages({ ...valid, categories: ["devops"] }).length).toBeGreaterThan(0);
});

test("series label은 8자 이하", () => {
  const ok = seriesRegistrySchema.safeParse({ s: { label: "12345678", title: "t" } });
  const long = seriesRegistrySchema.safeParse({ s: { label: "123456789", title: "t" } });
  expect(ok.success).toBe(true);
  expect(long.success).toBe(false);
});
