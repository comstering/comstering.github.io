import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { expect, test } from "@playwright/test";
import { loadPopular } from "../src/lib/popular";

// PRD-004 5.2·28번 8장·32번 "홈": 히어로(`$ history`), 사이드바(popular·series·tags), 첫 화면.
test("히어로: h1 하나(sr-only 사이트 이름), 명령 줄은 aria-hidden, 문구는 한 줄", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1, name: "Comstering's Dev Notes" })).toBeVisible();
  await expect(page.locator("h1 > span[aria-hidden='true']")).toHaveText("$ history");
  const sub = page.locator(".hero__sub");
  await expect(sub).toHaveText("실행해 본 것만 기록합니다");
  const lines = await sub.evaluate(
    (el) => Math.round(el.getBoundingClientRect().height / parseFloat(getComputedStyle(el).lineHeight)),
  );
  expect(lines).toBe(1);
  // 지난 히어로 요소는 없다
  await expect(page.locator("main")).not.toContainText("최한수");
  await expect(page.getByRole("link", { name: /resume|about me/i })).toHaveCount(0);
});

test("첫 화면: 첫 글 제목이 스크롤 없이 보이고 가로로 넘치지 않는다", async ({ page }) => {
  await page.goto("/");
  const viewport = page.viewportSize()!;
  const title = page.locator(".post-link, article h3").first();
  const box = (await title.boundingBox())!;
  expect(box.y + box.height).toBeLessThanOrEqual(viewport.height);
  // 디자인 측정값(1280×720 458px, 360×640 437px)에 실제 레이아웃의 main 위쪽 여백 48px을 더한 값 안
  expect(box.y + box.height).toBeLessThanOrEqual(viewport.width >= 1024 ? 520 : 500);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth),
  ).toBeLessThanOrEqual(0);
});

test("커서 깜빡임: 히어로 한 곳뿐이고 prefers-reduced-motion이면 정지", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".cursor-blink")).toHaveCount(1);
  expect(
    await page.locator(".cursor-blink").evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("cursor-blink");
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    await page.locator(".cursor-blink").evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  // 로고 커서는 정지(애니메이션 없음)
  expect(
    await page.locator(".site-header a").first().evaluate((el) => getComputedStyle(el.querySelector("span")!).animationName),
  ).toBe("none");
});

test("사이드바: 인기글 데이터가 없으면 popular를 숨기고 series·tags를 보인다", async ({ page }) => {
  await page.goto("/");
  const aside = page.getByRole("complementary", { name: "사이드바" });
  await expect(aside.getByRole("heading", { level: 2 })).toHaveText(["// series", "// tags"]);
  await expect(aside.locator("ul.feat-list > li")).toHaveCount(2);
  await expect(aside.locator(".feat-row").first()).toContainText("편");
  // 카테고리·최근글·About 링크는 없다
  await expect(aside.getByRole("link", { name: /about/i })).toHaveCount(0);
});

test("태그: 글 수 상위 10개, 눌러서 팔레트를 그 태그로 연다", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  const tags = page.locator(".side-tags button");
  await expect(tags).toHaveCount(10);
  const counts = await tags.locator("small").allTextContents();
  const numbers = counts.map(Number);
  expect(numbers).toEqual([...numbers].sort((a, b) => b - a));
  const name = ((await tags.first().textContent()) ?? "").replace(/#|\d+$/g, "");
  await expect(async () => {
    await tags.first().click();
    await expect(page.getByRole("dialog", { name: "사이트 검색" })).toBeVisible({ timeout: 1000 });
  }).toPass({ timeout: 10000 });
  await expect(page.getByRole("combobox")).toHaveValue(name);
  await expect(page.getByRole("option").first()).toBeVisible();
});

test("배치: 1024px 이상은 오른쪽 열, 미만은 글 목록 아래", async ({ page }) => {
  await page.goto("/");
  const list = (await page.locator(".home__list").boundingBox())!;
  const aside = (await page.locator(".home__aside").boundingBox())!;
  if ((page.viewportSize()?.width ?? 0) >= 1024) {
    expect(aside.x).toBeGreaterThan(list.x + list.width - 1);
  } else {
    expect(aside.y).toBeGreaterThanOrEqual(list.y + list.height - 1);
  }
});

test("글 목록: 연도별 세로 리스트와 카테고리 칩은 그대로, 검색창은 없다", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("group", { name: "카테고리 필터" })).toBeVisible();
  await expect(page.locator("main input")).toHaveCount(0);
  expect(await page.locator("article").count()).toBeGreaterThan(5);
});

test.describe("인기글 데이터(.cache/popular.json)", () => {
  const withFile = (content: string | null, fn: () => void) => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "popular-"));
    const previous = process.cwd();
    try {
      if (content !== null) {
        fs.mkdirSync(path.join(dir, ".cache"));
        fs.writeFileSync(path.join(dir, ".cache", "popular.json"), content);
      }
      process.chdir(dir);
      fn();
    } finally {
      process.chdir(previous);
      fs.rmSync(dir, { recursive: true });
    }
  };
  const ids = new Set(["a", "b", "c", "d", "e", "f"]);

  test("파일이 없거나 깨졌거나 모양이 다르면 빈 목록(빌드는 실패하지 않는다)", () => {
    withFile(null, () => expect(loadPopular(ids)).toEqual([]));
    withFile("{not json", () => expect(loadPopular(ids)).toEqual([]));
    withFile('{"items":"x"}', () => expect(loadPopular(ids)).toEqual([]));
    withFile('{"items":[{"id":1}]}', () => expect(loadPopular(ids)).toEqual([]));
  });

  test("없는 글·draft는 빼고 최대 5편", () => {
    const items = ["a", "zzz", "b", "c", "d", "e", "f"].map((id, i) => ({ id, views: 100 - i }));
    withFile(JSON.stringify({ items }), () =>
      expect(loadPopular(ids).map((item) => item.id)).toEqual(["a", "b", "c", "d", "e"]),
    );
  });
});
