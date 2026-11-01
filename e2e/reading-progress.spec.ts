import { expect, test } from "@playwright/test";

// PRD-003 PR-16 / F-PO-10: 읽기 진행률은 CSS scroll-driven animation으로만 동작한다(scroll 리스너 없음)
const POST = "/posts/install-cilium-eks";

const barScale = (page: import("@playwright/test").Page) =>
  page.locator(".reading-progress__bar").evaluate((el) => {
    const m = new DOMMatrix(getComputedStyle(el).transform);
    return m.a;
  });

test("진행률 바: 글 상세에만 있고 스크롤에 따라 차오른다", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".reading-progress")).toHaveCount(0);

  await page.goto(POST);
  const bar = page.locator(".reading-progress");
  await expect(bar).toBeVisible();
  expect(await barScale(page)).toBeLessThan(0.05);

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight / 2));
  await expect.poll(() => barScale(page)).toBeGreaterThan(0.3);
  const half = await barScale(page);
  expect(half).toBeLessThan(0.7);

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect.poll(() => barScale(page)).toBeGreaterThan(0.95);
});

test("진행률 바: 헤더 바로 아래 2px, 접근성 트리에서 숨김", async ({ page }) => {
  await page.goto(POST);
  const bar = page.locator(".reading-progress");
  await expect(bar).toHaveAttribute("aria-hidden", "true");
  const box = await bar.boundingBox();
  expect(box?.height).toBe(2);
  expect(box?.y).toBe(64);
});

test("진행률 바: prefers-reduced-motion이면 숨긴다", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(POST);
  await expect(page.locator(".reading-progress")).toBeHidden();
});
