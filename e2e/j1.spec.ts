import { expect, test } from "@playwright/test";

// PRD-004 G2-4: J1(채용 담당자) 시나리오. 홈 → 상단바 `about` → 회사 바로가기 → resume.pdf 다운로드.
// resume.pdf는 `yarn build:resume`가 만든다(CI는 E2E 전에 실행).
test("G2-4 J1: 홈 → 상단바 about → 회사 바로가기 → resume.pdf 다운로드(200, application/pdf)", async ({
  page,
}) => {
  // 1) 홈에서 시작해 상단바 about으로 간다 (마우스·키보드 모두 같은 링크)
  await page.goto("/");
  await page.getByRole("banner").getByRole("link", { name: "about", exact: true }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole("heading", { level: 1, name: /최한수/ })).toBeVisible();

  // 2) 회사 바로가기로 경력에 도달한다
  const jump = page.getByRole("navigation", { name: "경력 바로가기" });
  await jump.getByRole("link", { name: "CJ 올리브영" }).click();
  await expect(page).toHaveURL(/#cj-oliveyoung$/);
  await expect(page.locator("#cj-oliveyoung")).toBeInViewport();

  // 3) resume.pdf를 내려받고, 같은 주소가 PDF로 응답한다
  const link = page.getByRole("link", { name: /resume\.pdf/ });
  const [download] = await Promise.all([page.waitForEvent("download"), link.click()]);
  expect(download.suggestedFilename()).toBe("resume.pdf");

  const response = await page.request.get("/resume.pdf");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/pdf");
});
