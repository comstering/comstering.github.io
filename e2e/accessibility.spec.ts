import { expect, test } from "@playwright/test";

// 디자인 19번 Q9 새 규칙: 제목 단계를 건너뛰지 않고, 버튼 이름은 보이는 글자를 포함하며,
// 글자색을 opacity로 낮추지 않는다(대비 4.5:1은 토큰으로).
const PAGES = ["/", "/about", "/posts/karpenter", "/posts/custom-networking-karpenter-eni-troubleshooting"];

for (const route of PAGES) {
  test(`제목 단계를 건너뛰지 않는다: ${route}`, async ({ page }) => {
    await page.goto(route);
    const levels = await page
      .locator("h1, h2, h3, h4, h5, h6")
      .evaluateAll((els) => els.map((el) => Number(el.tagName[1])));
    expect(levels[0]).toBe(1);
    for (let i = 1; i < levels.length; i += 1) {
      expect(levels[i], `${route} 제목 순서 ${levels.join("")}`).toBeLessThanOrEqual(
        levels[i - 1] + 1,
      );
    }
  });
}

test("코드 복사 버튼의 접근 가능한 이름은 보이는 글자(copy)다", async ({ page }) => {
  await page.goto("/posts/custom-networking-karpenter-eni-troubleshooting");
  const buttons = page.locator(".code__copy");
  const count = await buttons.count();
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i += 1) {
    await expect(buttons.nth(i)).not.toHaveAttribute("aria-label", /.+/);
    await expect(buttons.nth(i)).toHaveText("copy");
  }
});

test("칩 숫자는 opacity로 흐리게 하지 않는다", async ({ page }) => {
  await page.goto("/");
  const counts = page.getByRole("group", { name: "카테고리 필터" }).locator("button > span");
  const total = await counts.count();
  expect(total).toBeGreaterThan(0);
  for (let i = 0; i < total; i += 1) {
    expect(await counts.nth(i).evaluate((el) => getComputedStyle(el).opacity)).toBe("1");
  }
});
