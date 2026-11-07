import { expect, test } from "@playwright/test";

// PRD-004 G2-6·5.3: out/resume.pdf는 `yarn build:resume`(scripts/build-resume-pdf.mjs)가 만든다.
// 로컬에서는 `yarn build && yarn build:resume` 뒤에 실행한다(CI는 E2E 전에 만든다).
test("resume.pdf: 200, application/pdf, PDF 파일이고 1MB 이하", async ({ request }) => {
  const response = await request.get("/resume.pdf");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/pdf");
  const body = await response.body();
  expect(body.subarray(0, 5).toString()).toBe("%PDF-");
  expect(body.length).toBeGreaterThan(50 * 1024);
  expect(body.length).toBeLessThanOrEqual(1024 * 1024);
});

test("About의 resume.pdf 버튼이 이 파일을 내려받는다", async ({ page }) => {
  await page.goto("/about");
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("link", { name: /resume\.pdf/ }).click(),
  ]);
  expect(download.suggestedFilename()).toBe("resume.pdf");
});

test("인쇄: 외부 링크 뒤에 URL이 글자로 붙는다(화살표 아이콘은 사라짐)", async ({ page }) => {
  await page.goto("/about");
  await page.emulateMedia({ media: "print" });
  const link = page.locator('.about a[href^="https://github.com/bitnami"]').first();
  const after = await link.evaluate((el) => {
    const style = getComputedStyle(el, "::after");
    return { content: style.content, mask: style.webkitMaskImage || style.maskImage };
  });
  expect(after.content).toContain("https://github.com/bitnami");
  expect(after.mask).toBe("none");
});

test("인쇄: 프로젝트와 오픈소스·자격증 행은 쪽 경계에서 갈라지지 않는다", async ({ page }) => {
  await page.goto("/about");
  await page.emulateMedia({ media: "print" });
  for (const selector of [".proj", ".oss-row", ".def-list > li"]) {
    const values = await page
      .locator(selector)
      .evaluateAll((els) => els.map((el) => getComputedStyle(el).breakInside));
    expect(values.length, selector).toBeGreaterThan(0);
    expect(new Set(values), selector).toEqual(new Set(["avoid"]));
  }
  expect(
    await page.locator(".about-section h2").first().evaluate((el) => getComputedStyle(el).breakAfter),
  ).toBe("avoid");
});

test("인쇄: 인쇄 규칙이 화면 규칙에 덮이지 않는다(프로젝트 글자 9pt)", async ({ page }) => {
  await page.goto("/about");
  await page.emulateMedia({ media: "print" });
  const size = await page.locator(".proj__title").first().evaluate((el) => getComputedStyle(el).fontSize);
  expect(size).toBe("12px"); // 9pt
});

test("인쇄: 시안의 인쇄 값이 화면 규칙에 덮이지 않고 계산된다(디자인 36번 3.2)", async ({ page }) => {
  await page.goto("/about");
  await page.emulateMedia({ media: "print" });
  const computed = await page.evaluate(() => {
    const px = (selector: string, property: string) =>
      getComputedStyle(document.querySelector(selector)!).getPropertyValue(property);
    return {
      introDisplay: px(".about-intro", "display"),
      sectionMargin: px(".about-section", "margin-top"),
      headline: px(".about-intro__headline", "font-size"),
      stackToken: px(".stack-token", "display"),
      skillColumns: px(".skills > div", "grid-template-columns"),
    };
  });
  expect(computed.introDisplay).toBe("block");
  expect(computed.sectionMargin).toBe("16px"); // 12pt
  expect(computed.headline).toBe("16px"); // 12pt
  expect(computed.stackToken).toBe("inline"); // 칩 테두리 대신 쉼표 글자
  expect(computed.skillColumns).not.toContain("160px");
});
