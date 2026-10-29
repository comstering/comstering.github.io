import { expect, test } from "@playwright/test";

// 디자인 20번 Q10: 목록 링크 이름은 제목만, 클릭 영역은 행 전체, 섹션 제목 라벨은 굵게.

test("홈 목록: 링크 이름은 제목뿐이고 행 어디를 눌러도 글로 간다", async ({
  page,
}) => {
  await page.goto("/");
  const rows = page.locator("article");
  const count = await rows.count();
  expect(count).toBeGreaterThan(5);
  for (let i = 0; i < count; i += 1) {
    const row = rows.nth(i);
    const link = row.locator("h3 a");
    await expect(link, `행 ${i} 링크`).toHaveCount(1);
    const title = (await row.locator("h3").textContent())?.trim();
    expect((await link.textContent())?.trim()).toBe(title);
    // 행 안에 다른 링크는 없다(태그·설명은 링크가 아니다)
    await expect(row.locator("a")).toHaveCount(1);
  }

  // 설명 글자를 눌러도 이동한다(::before가 행 전체를 덮는다)
  const first = rows.first();
  const href = await first.locator("h3 a").getAttribute("href");
  // 설명 <p>는 링크의 ::before에 덮여 있어 click()은 "다른 요소가 가로챈다"며 기다린다. 좌표로 누른다.
  const box = await first.locator("p").last().boundingBox();
  await page.mouse.click(box!.x + 5, box!.y + 5);
  await expect(page).toHaveURL(new RegExp(`${href}$`));
});

test("목록 링크에 키보드로 포커스하면 행에 포커스 링이 보인다", async ({ page }) => {
  await page.goto("/");
  const row = page.locator("article").first();
  await row.locator("h3 a").focus();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Shift+Tab");
  const outline = await row.evaluate((el) => {
    const s = getComputedStyle(el);
    return `${s.outlineStyle} ${s.outlineWidth}`;
  });
  expect(outline).toMatch(/solid 2px/);
});

test("관련 글 목록도 링크 이름이 제목뿐이다", async ({ page }) => {
  await page.goto("/posts/karpenter");
  const rows = page.locator("section[aria-labelledby='related-title'] article");
  await expect(rows).toHaveCount(3);
  for (let i = 0; i < 3; i += 1) {
    const title = (await rows.nth(i).locator("h3").textContent())?.trim();
    await expect(rows.nth(i).locator("a")).toHaveText(title!);
  }
});

test("섹션 제목 라벨(// related)은 굵기 700이다", async ({ page }) => {
  await page.goto("/posts/karpenter");
  const weight = await page
    .locator("#related-title")
    .evaluate((el) => getComputedStyle(el).fontWeight);
  expect(weight).toBe("700");
});
