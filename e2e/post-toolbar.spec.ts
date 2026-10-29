import fs from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";
import { hasToc } from "../src/lib/toc";

const HEADER = 64;
const SERIES_POST = "/posts/karpenter"; // eks-from-scratch 2/5
const SHORT_POST = "/posts/install-cilium-eks"; // 본문 h2가 2개라 목차 없음, 시리즈 2/3
const PLAIN_POST = "/posts/bitnami-helm-chart-contribute"; // 시리즈 아님

const slugs = fs
  .readdirSync(path.resolve("out/posts"))
  .filter((name) => name.endsWith(".html"))
  .map((name) => name.replace(/\.html$/, ""));

const isMobile = (width?: number) => (width ?? 1280) < 640;

// G1-4 (2026-10-29 기획 Q6): 모든 글의 첫 본문 블록(첫 문단 또는 첫 h2)이 360×640 첫 화면 안에서 시작한다.
// 첫 h2 앞에 서문이 있는 글은 서문이 곧 본문이므로 서문의 시작을 잰다.
test("G1-4: 360×640에서 모든 글의 첫 본문 블록이 첫 화면(640px) 안에서 시작한다", async ({
  page,
}) => {
  test.skip(!isMobile(page.viewportSize()?.width), "모바일 뷰포트에서만 측정");
  for (const slug of slugs) {
    await page.goto(`/posts/${slug}`);
    const box = await page.locator(".prose > *").first().boundingBox();
    expect(box, slug).not.toBeNull();
    expect(box!.y, `${slug} 첫 본문 블록 위치`).toBeLessThanOrEqual(640);
  }
});

test("모바일: 도구 줄(목차·시리즈)은 모든 글에서 첫 화면 안에서 끝난다", async ({
  page,
}) => {
  test.skip(!isMobile(page.viewportSize()?.width), "모바일 뷰포트에서만 측정");
  for (const slug of slugs) {
    await page.goto(`/posts/${slug}`);
    const box = await page.locator(".post-tools").boundingBox();
    expect(box, slug).not.toBeNull();
    expect(box!.y + box!.height, `${slug} 도구 줄 아래`).toBeLessThanOrEqual(640);
  }
});

test("목차: 항목을 누르면 URL 해시가 바뀌고 제목이 헤더에 가려지지 않는다", async ({
  page,
}) => {
  await page.goto(SERIES_POST);
  const mobile = isMobile(page.viewportSize()?.width);
  if (mobile) {
    await page.locator(".toc-inline > summary").click();
    await expect(page.locator(".toc-inline")).toHaveAttribute("open", "");
  }
  const nav = mobile
    ? page.locator(".toc-inline nav")
    : page.locator("aside nav[aria-label='목차']");
  const link = nav.locator("a").nth(2);
  const href = await link.getAttribute("href");
  await link.click();
  await expect(page).toHaveURL(new RegExp(`${href}$`));

  const id = href!.slice(1);
  await expect
    .poll(async () => (await page.locator(`#${id}`).boundingBox())?.y ?? -1)
    .toBeGreaterThanOrEqual(HEADER + 24 - 1);
  await expect
    .poll(async () => (await page.locator(`#${id}`).boundingBox())?.y ?? -1)
    .toBeLessThan(200);
});

test("1280 이상: 오른쪽 sticky 목차만, 현재 항목은 굵게", async ({ page }) => {
  test.skip(isMobile(page.viewportSize()?.width), "데스크톱에서만");
  await page.goto(SERIES_POST);
  await expect(page.locator(".toc-inline")).toBeHidden();
  const nav = page.locator("aside nav[aria-label='목차']");
  await expect(nav).toBeVisible();
  await nav.locator("a").nth(2).click();
  const current = nav.locator("a[aria-current='true']");
  await expect(current).toHaveCount(1);
  await expect
    .poll(() => current.evaluate((el) => getComputedStyle(el).fontWeight))
    .toBe("600");
});

test("시리즈 박스: 한 줄로 접혀 있고 누르면 전체 목록이 펼쳐진다", async ({
  page,
}) => {
  await page.goto(SERIES_POST);
  const toggle = page.locator(".series__toggle");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator(".series__list")).toBeHidden();
  await expect(toggle).toContainText("2/5");

  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  const items = page.locator(".series__list li");
  await expect(items).toHaveCount(5);
  await expect(items.nth(1).locator("[aria-current='page']")).toBeVisible();
  await expect(items.nth(2).locator("a")).toHaveAttribute(
    "href",
    "/posts/install-karpenter",
  );
});

test("h2가 3개 미만인 글: 목차는 없고 시리즈 박스가 한 줄 전체를 쓴다", async ({
  page,
}) => {
  await page.goto(SHORT_POST);
  await expect(page.locator(".toc-inline")).toHaveCount(0);
  await expect(page.locator("aside nav[aria-label='목차']")).toHaveCount(0);
  await expect(page.locator(".post-tools > *")).toHaveCount(1);
  await expect(page.locator(".series__toggle")).toContainText("2/3");
});

test("시리즈가 아닌 글: 시리즈 박스가 없다", async ({ page }) => {
  await page.goto(PLAIN_POST);
  await expect(page.locator(".series")).toHaveCount(0);
  await expect(page.locator(".toc-inline, aside nav").first()).toBeAttached();
});

test("홈 목록 메타에 시리즈 위치가 나온다", async ({ page }) => {
  await page.goto("/");
  const item = page.locator("article", {
    hasText: "Custom network Kapenter ENI troubleshooting", // 글 제목 그대로(오타 포함)
  });
  await expect(item).toContainText("series eks 5/5");
});

test("hasToc: h2가 3개 이상일 때만 목차를 만든다", () => {
  const h = (depth: 2 | 3, n: number) => ({ id: `h${n}`, text: `h${n}`, depth });
  expect(hasToc([h(2, 1), h(2, 2)])).toBe(false);
  expect(hasToc([h(2, 1), h(3, 2), h(3, 3), h(2, 4)])).toBe(false);
  expect(hasToc([h(2, 1), h(2, 2), h(2, 3)])).toBe(true);
});
