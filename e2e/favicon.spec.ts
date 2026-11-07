import { expect, test } from "@playwright/test";

// 파비콘 C `c_`(디자인 35번 4장, 34번 "파비콘 교체"): 파일 규약(icon.svg · favicon.ico · apple-icon.png)이 모든 페이지에 링크로 나온다.
for (const route of ["/", "/about", "/posts/karpenter"]) {
  test(`파비콘 링크 3종과 파일: ${route}`, async ({ page, request }) => {
    await page.goto(route);
    const links = await page
      .locator('head link[rel~="icon"], head link[rel="apple-touch-icon"]')
      .evaluateAll((els) =>
        els.map((el) => ({
          rel: el.getAttribute("rel"),
          href: el.getAttribute("href")!,
          type: el.getAttribute("type"),
        })),
      );
    const types = links.map((link) => link.type);
    expect(types).toEqual(expect.arrayContaining(["image/svg+xml", "image/x-icon", "image/png"]));
    expect(links.some((link) => link.rel === "apple-touch-icon")).toBe(true);
    for (const link of links) {
      const response = await request.get(link.href);
      expect(response.status(), link.href).toBe(200);
      expect(response.headers()["content-type"], link.href).toContain(link.type!.replace("x-icon", "x-icon"));
    }
  });
}

test("icon.svg는 `c_`(둥근 C + accent 커서)이고 favicon.ico는 16·32px 이미지를 담는다", async ({ request }) => {
  const svg = await (await request.get("/icon.svg")).text();
  expect(svg).toContain("<path");
  expect(svg).toContain("<rect");
  const ico = await (await request.get("/favicon.ico")).body();
  // ICONDIR: reserved 0, type 1(icon), 이미지 수
  expect(ico.readUInt16LE(0)).toBe(0);
  expect(ico.readUInt16LE(2)).toBe(1);
  expect(ico.readUInt16LE(4)).toBeGreaterThanOrEqual(2);
});
