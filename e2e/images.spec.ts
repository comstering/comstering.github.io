import { expect, test } from "@playwright/test";

const BIG = "/posts/custom-networking-karpenter-eni-troubleshooting"; // 확대 가능한 이미지가 많은 글
const SMALL = "/posts/introduce-cilium-cni"; // 본문 폭(720px) 이하 이미지 1개(compare-latency-service)

test("본문 이미지는 변환본이고 크기 속성이 있으며 첫 이미지만 바로 불러온다", async ({
  page,
}) => {
  await page.goto(BIG);
  const images = page.locator(".prose img");
  const count = await images.count();
  expect(count).toBeGreaterThan(2);
  for (let i = 0; i < count; i += 1) {
    const img = images.nth(i);
    await expect(img).toHaveAttribute("src", /^\/_img\/.+\.webp$/);
    await expect(img).toHaveAttribute("width", /^\d+$/);
    await expect(img).toHaveAttribute("height", /^\d+$/);
    await expect(img).toHaveAttribute("decoding", "async");
    if (i === 0) {
      await expect(img).not.toHaveAttribute("loading", "lazy");
    } else {
      await expect(img).toHaveAttribute("loading", "lazy");
    }
  }
});

test("확대: 클릭하면 열리고 Esc로 닫히며 포커스가 이미지로 돌아온다", async ({
  page,
}) => {
  await page.goto(BIG);
  const img = page.locator(".prose img.zoomable").first();
  await img.scrollIntoViewIfNeeded();
  await img.click();
  const dialog = page.locator("dialog.lightbox");
  await expect(dialog).toBeVisible();
  await expect(dialog.locator("img")).toHaveAttribute("src", /\/_img\//);

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(img).toBeFocused();
});

test("확대: 닫기 버튼은 44px 이상이고 배경 클릭으로도 닫힌다", async ({
  page,
}) => {
  await page.goto(BIG);
  const img = page.locator(".prose img.zoomable").first();
  await img.scrollIntoViewIfNeeded();
  await img.click();
  const dialog = page.locator("dialog.lightbox");
  const close = dialog.getByRole("button", { name: "닫기" });
  const box = await close.boundingBox();
  expect(box!.width).toBeGreaterThanOrEqual(44);
  expect(box!.height).toBeGreaterThanOrEqual(44);
  await close.click();
  await expect(dialog).toBeHidden();

  await img.click();
  await expect(dialog).toBeVisible();
  await page.mouse.click(5, 300); // 이미지 바깥(배경)
  await expect(dialog).toBeHidden();
});

test("확대: 키보드(Enter)로 열 수 있다", async ({ page }) => {
  await page.goto(BIG);
  const img = page.locator(".prose img.zoomable").first();
  await img.scrollIntoViewIfNeeded();
  await img.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("dialog.lightbox")).toBeVisible();
});

test("본문 폭 이하 이미지는 확대 표시가 없다", async ({ page }) => {
  await page.goto(SMALL);
  const small = page.locator(".prose img", {
    has: page.locator("xpath=self::*[@width<=720]"),
  });
  await expect(small).toHaveCount(1);
  await expect(small).not.toHaveAttribute("role", "button");
  await expect(small).not.toHaveClass(/zoomable/);
});
