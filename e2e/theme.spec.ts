import { expect, test } from "@playwright/test";

test("테마 토글: 전환하고 새로고침 후에도 유지한다", async ({ page }) => {
  await page.goto("/");
  const html = page.locator("html");
  await expect(html).toHaveClass(/dark/);

  await page.getByRole("button", { name: "라이트 모드로 전환" }).click();
  await expect(html).toHaveClass(/light/);

  await page.reload();
  await expect(html).toHaveClass(/light/);
  await expect(
    page.getByRole("button", { name: "다크 모드로 전환" }),
  ).toBeVisible();
});
