import { expect, test } from "@playwright/test";

// PRD-004 5.1·G2-3, 디자인 25번 2장·31번 2장: About 다시 그리기.
test("G2-3: About 안에 블로그 글(/posts/) 링크가 없다", async ({ page }) => {
  await page.goto("/about");
  await expect(page.locator('main a[href^="/posts"]')).toHaveCount(0);
});

test("첫 화면: 이름·직함·경력·email·resume.pdf가 스크롤 없이 보이고 현재 회사는 없다", async ({
  page,
}) => {
  await page.goto("/about");
  const viewport = page.viewportSize()!;
  await expect(page.getByRole("heading", { level: 1, name: /최한수/ })).toBeVisible();
  await expect(page.locator(".about-intro__role")).toContainText(/경력 \d+년\+/);
  for (const name of ["email", /resume\.pdf/, /github/, /linkedin/]) {
    const button = page.locator(".about-intro__contact").getByRole("link", { name });
    await expect(button).toBeVisible();
    const box = (await button.boundingBox())!;
    expect(box.y + box.height, String(name)).toBeLessThanOrEqual(viewport.height);
  }
  // 첫 화면(소개 위)에는 현재 회사를 두지 않는다
  await expect(page.locator(".about-intro")).not.toContainText("Olive");
  await expect(page.locator(".about-intro")).not.toContainText("CJ");
});

test("resume.pdf 버튼은 다운로드 링크다", async ({ page }) => {
  await page.goto("/about");
  const link = page.getByRole("link", { name: /resume\.pdf/ });
  await expect(link).toHaveAttribute("href", "/resume.pdf");
  await expect(link).toHaveAttribute("download", "");
});

test("회사 바로가기: 3개, 누르면 해당 회사가 헤더 아래에서 시작한다", async ({ page }) => {
  await page.goto("/about");
  const jump = page.getByRole("navigation", { name: "경력 바로가기" });
  await expect(jump.getByRole("link")).toHaveText(["CJ 올리브영", "클래스101", "오픈소스"]);
  for (const [label, id] of [
    ["CJ 올리브영", "cj-oliveyoung"],
    ["클래스101", "class101"],
    ["오픈소스", "open-source"],
  ]) {
    await jump.getByRole("link", { name: label }).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect
      .poll(async () => Math.round((await page.locator(`#${id}`).boundingBox())!.y))
      .toBeGreaterThanOrEqual(80);
    expect((await page.locator(`#${id}`).boundingBox())!.y).toBeLessThanOrEqual(100);
  }
});

test("경력은 전부 펼쳐져 있고 접기 UI가 없다", async ({ page }) => {
  await page.goto("/about");
  await expect(page.locator("main details")).toHaveCount(0);
  await expect(page.getByRole("button", { name: /expand/i })).toHaveCount(0);
  await expect(page.locator("article.proj")).toHaveCount(21);
  await expect(page.locator("article.proj").first().locator("li").first()).toBeVisible();
});

test("클래스101 직함과 skills 7그룹(observability 포함)", async ({ page }) => {
  await page.goto("/about");
  await expect(page.locator("#class101 .tl-org__role")).toHaveText("Software Engineer");
  await expect(page.locator(".skills dt")).toHaveText([
    "platform",
    "cloud · iac",
    "ci/cd · workflow",
    "data · messaging",
    "auth · security",
    "backend",
    "observability",
  ]);
  const observability = page.locator(".skills > div").filter({ hasText: "observability" });
  await expect(observability.locator(".stack-token")).toHaveText([
    "Datadog",
    "OpenTelemetry",
    "Prometheus",
  ]);
});

test("앵커 위치는 html scroll-padding-top 하나이고 항목에 scroll-margin이 없다", async ({ page }) => {
  await page.goto("/about");
  const margin = await page
    .locator(".tl-org")
    .first()
    .evaluate((el) => getComputedStyle(el).scrollMarginTop);
  expect(margin).toBe("0px");
  const padding = await page.evaluate(
    () => getComputedStyle(document.documentElement).scrollPaddingTop,
  );
  expect(padding).toBe("88px");
});

test("인쇄: 다크 테마로 열어도 라이트 배경, 헤더·버튼·바로가기·사진은 숨김", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("theme", "dark"));
  await page.goto("/about");
  await page.emulateMedia({ media: "print" });
  expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe(
    "rgb(255, 255, 255)",
  );
  for (const selector of [".site-header", ".site-footer", ".jump", ".about-intro__contact", ".about-intro__avatar"]) {
    await expect(page.locator(selector).first(), selector).toBeHidden();
  }
  await expect(page.locator(".about-intro__contacts")).toBeVisible();
});

test("상단 경로 `~ / about`이 있고 현재 위치(aria-current)이며 인쇄에서는 숨겨진다", async ({ page }) => {
  await page.goto("/about");
  const path = page.getByRole("navigation", { name: "현재 위치" });
  await expect(path).toContainText("~");
  await expect(path.locator('[aria-current="page"]')).toHaveText("about");
  await expect(path.getByRole("link", { name: "~" })).toHaveAttribute("href", "/");
  await page.emulateMedia({ media: "print" });
  await expect(path).toBeHidden();
});

test("직함 줄은 360px에서도 아바타 행 아래 전폭으로 한 줄이다(디자인 36번 3.1)", async ({ page }) => {
  await page.goto("/about");
  const role = page.locator(".about-intro__role");
  const lines = await role.evaluate(
    (el) => Math.round(el.getBoundingClientRect().height / parseFloat(getComputedStyle(el).lineHeight)),
  );
  const width = page.viewportSize()!.width;
  if (width <= 479) {
    expect(lines).toBe(1);
    // 아바타 아래에서 시작한다(전폭)
    const avatar = (await page.locator(".about-intro__avatar").boundingBox())!;
    const box = (await role.boundingBox())!;
    expect(box.y).toBeGreaterThanOrEqual(avatar.y + avatar.height - 1);
  } else {
    expect(lines).toBe(1);
  }
});
