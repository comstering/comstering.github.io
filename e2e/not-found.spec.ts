import { expect, test } from "@playwright/test";

test("404: 안내와 최신 글, 홈 링크를 보여 준다", async ({ page }) => {
  await page.goto("/no-such-page");
  await expect(
    page.getByRole("heading", { level: 1, name: /페이지를 찾을 수 없어요/ }),
  ).toBeVisible();
  await expect(page.locator("a[href^='/posts/']")).toHaveCount(3);

  await page.getByRole("link", { name: "cd ~" }).click();
  await expect(page).toHaveURL("/");
});
