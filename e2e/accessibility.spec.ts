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

// 디자인 21번(impeccable audit, Q14)
const CODE_POST = "/posts/install-cilium-eks";

test("코드 블록 <pre>는 키보드로 닿고 이름이 있다 (WCAG 2.1.1)", async ({ page }) => {
  await page.goto(CODE_POST);
  const pres = page.locator(".code pre");
  const count = await pres.count();
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i += 1) {
    await expect(pres.nth(i)).toHaveAttribute("tabindex", "0");
    await expect(pres.nth(i)).toHaveAttribute("role", "region");
    await expect(pres.nth(i)).toHaveAttribute("aria-label", /\S+ 코드$/);
  }
  // 복사 버튼 다음 Tab이 코드 블록으로 간다
  await page.locator(".code__copy").first().focus();
  await page.keyboard.press("Tab");
  await expect(pres.first()).toBeFocused();
});

for (const route of ["/", "/about", CODE_POST]) {
  test(`글자 200%에서 가로로 넘치지 않는다: ${route}`, async ({ page }) => {
    await page.goto(route);
    await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test("히트 영역: 헤더 링크·로고·칩은 위아래로 넓혀 44px가 된다", async ({ page }) => {
  await page.goto("/");
  const targets = [
    page.getByRole("link", { name: /comstering/ }).first(),
    page.getByRole("navigation", { name: "주요 메뉴" }).getByRole("link", { name: "posts" }),
    page.getByRole("group", { name: "카테고리 필터" }).getByRole("button").first(),
  ];
  for (const target of targets) {
    const box = await target.boundingBox();
    expect(box).not.toBeNull();
    // 요소 위쪽 5px 지점을 눌러도 같은 요소가 잡힌다
    const hit = await target.evaluate((el, [x, y]) => {
      const found = document.elementFromPoint(x, y);
      return found === el || el.contains(found);
    }, [box!.x + box!.width / 2, box!.y - 5]);
    expect(hit).toBe(true);
  }
});

test("PC 목차는 aside 랜드마크가 아니다(landmark-complementary-is-top-level)", async ({ page }) => {
  await page.goto(CODE_POST);
  await expect(page.locator("aside")).toHaveCount(0);
});

test("본문 외부 링크는 noopener noreferrer를 명시한다", async ({ page }) => {
  await page.goto("/posts/bitnami-helm-chart-contribute");
  const rels = await page
    .locator(".prose a[target='_blank']")
    .evaluateAll((links) => links.map((a) => a.getAttribute("rel") ?? ""));
  expect(rels.length).toBeGreaterThan(0);
  for (const rel of rels) {
    expect(rel).toContain("noopener");
    expect(rel).toContain("noreferrer");
  }
});
