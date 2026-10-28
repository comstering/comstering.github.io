import { expect, test } from "@playwright/test";

const BITNAMI = "/posts/bitnami-helm-chart-contribute";

test("?category=infra로 직접 들어가면 infra 칩이 선택되고 Bitnami 글이 포함된다", async ({
  page,
}) => {
  await page.goto("/?category=infra");
  await expect(page.getByRole("button", { name: /^infra/ })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(page.locator(`a[href="${BITNAMI}"]`)).toBeVisible();
});

test("칩을 누르면 URL이 바뀌고 뒤로가기로 이전 필터가 복원된다", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: /^oss/ }).click();
  await expect(page).toHaveURL(/\?category=oss$/);
  await expect(page.getByRole("button", { name: /^oss/ })).toHaveAttribute(
    "aria-pressed",
    "true",
  );

  await page.getByRole("button", { name: /^all/ }).click();
  await expect(page).toHaveURL(/\/$/);

  await page.goBack();
  await expect(page).toHaveURL(/\?category=oss$/);
  await expect(page.getByRole("button", { name: /^oss/ })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});

test("잘못된 category 값은 all로 본다", async ({ page }) => {
  await page.goto("/?category=xyz");
  await expect(page.getByRole("button", { name: /^all/ })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});

test("칩 숫자는 누르면 나오는 글 수와 같다", async ({ page }) => {
  await page.goto("/");
  const chips = page.getByRole("group", { name: "카테고리 필터" }).locator("button");
  const total = await chips.count();
  expect(total).toBeGreaterThan(1);

  for (let i = 0; i < total; i += 1) {
    const chip = chips.nth(i);
    const count = Number((await chip.textContent())?.match(/(\d+)\s*$/)?.[1]);
    await chip.click();
    await expect(chip).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("article")).toHaveCount(count);
  }
});

test("홈 목록에는 이미지가 없다", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("article").first()).toBeVisible();
  await expect(page.locator("main img")).toHaveCount(0);
});

test("글 상세 헤더의 카테고리는 필터 링크다", async ({ page }) => {
  await page.goto(BITNAMI);
  const links = page.locator("header a[href^='/?category=']");
  await expect(links).toHaveText(["infra", "oss"]);
  await links.nth(1).click();
  await expect(page).toHaveURL(/\?category=oss$/);
});
