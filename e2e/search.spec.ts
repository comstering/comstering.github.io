import { expect, test, type Page } from "@playwright/test";
import {
  searchEntries,
  recentEntries,
  splitMatch,
  type SearchEntry,
} from "../src/lib/search";

// PRD-004 5.7·G2-8, 디자인 25번 4장·31번 5장(O-8): 헤더 검색 팔레트.
const entry = (over: Partial<SearchEntry>): SearchEntry => ({
  t: "제목",
  desc: "설명",
  d: "2026-01-01",
  c: ["infra"],
  tags: [],
  h: [],
  u: "/posts/x",
  ...over,
});

test.describe("검색 규칙", () => {
  const index = [
    entry({ t: "소제목만", d: "2026-03-01", u: "/a", h: ["ENI 설정"] }),
    entry({ t: "ENI 제목", d: "2026-01-01", u: "/b" }),
    entry({ t: "설명", desc: "eni를 다룬다", d: "2026-02-01", u: "/c" }),
    entry({ t: "다른 글", d: "2026-04-01", u: "/d" }),
  ];

  test("제목 일치 → 설명·태그·카테고리 → 소제목 순, 대소문자 무시", () => {
    const hits = searchEntries(index, "eni");
    expect(hits.map((hit) => hit.entry.u)).toEqual(["/b", "/c", "/a"]);
    expect(hits[2].heading).toBe("ENI 설정");
    expect(hits[0].heading).toBeNull();
  });

  test("같은 가중이면 최신 글 먼저", () => {
    const same = [
      entry({ t: "a", d: "2026-01-01", tags: ["k8s"], u: "/old" }),
      entry({ t: "b", d: "2026-05-01", tags: ["k8s"], u: "/new" }),
    ];
    expect(searchEntries(same, "k8s").map((hit) => hit.entry.u)).toEqual(["/new", "/old"]);
  });

  test("빈 입력은 최근 글 5편", () => {
    const many = Array.from({ length: 8 }, (_, i) =>
      entry({ d: `2026-01-0${i + 1}`, u: `/p${i}` }),
    );
    const hits = searchEntries(many, "  ");
    expect(hits).toHaveLength(5);
    expect(hits[0].entry.u).toBe("/p7");
    expect(recentEntries(many)).toEqual(hits);
  });

  test("맞는 글이 없으면 빈 목록, 맞은 글자는 나눠서 돌려준다", () => {
    expect(searchEntries(index, "zzzz")).toEqual([]);
    expect(splitMatch("Karpenter 설정", "PENT")).toEqual(["Kar", "pent", "er 설정"]);
    expect(splitMatch("Karpenter 설정", "zz")).toEqual(["Karpenter 설정", "", ""]);
  });
});

const palette = (page: Page) => page.getByRole("dialog", { name: "사이트 검색" });
// 하이드레이션 전에 누른 단축키는 무시되므로, 열릴 때까지 1초 간격으로 다시 누른다
const open = async (page: Page) => {
  await page.waitForLoadState("networkidle");
  await expect(async () => {
    if (!(await palette(page).isVisible())) await page.keyboard.press("ControlOrMeta+k");
    await expect(palette(page)).toBeVisible({ timeout: 1000 });
  }).toPass({ timeout: 10000 });
};

for (const route of ["/", "/about", "/posts/karpenter"]) {
  test(`G2-8 ${route}: ⌘K → 검색어 → ↓ → Enter로 글에 도달한다(마우스 없이)`, async ({ page }) => {
    await page.goto(route);
    await open(page);
    await expect(page.getByRole("combobox")).toBeFocused();
    await page.keyboard.type("terraform");
    await expect(page.getByRole("option").first()).toBeVisible();
    await page.keyboard.press("ArrowDown");
    const target = page.getByRole("option", { selected: true });
    const href = await target.getAttribute("href");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(new RegExp(`${href}/?$`));
    await expect(palette(page)).toBeHidden();
  });
}

test("헤더 버튼: 이름 `검색 (search)`, aria-keyshortcuts, 클릭으로 열린다", async ({ page }) => {
  await page.goto("/");
  const button = page.getByRole("button", { name: "검색 (search)" });
  await expect(button).toHaveAttribute("aria-keyshortcuts", "Meta+K Control+K");
  await page.waitForLoadState("networkidle");
  await expect(async () => {
    if (!(await palette(page).isVisible())) await button.click();
    await expect(palette(page)).toBeVisible({ timeout: 1000 });
  }).toPass({ timeout: 10000 });
});

test("`/`는 입력란 밖에서 열고, 입력 중에는 열지 않는다", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await expect(async () => {
    if (!(await palette(page).isVisible())) await page.keyboard.press("/");
    await expect(palette(page)).toBeVisible({ timeout: 1000 });
  }).toPass({ timeout: 10000 });
  await page.keyboard.type("a/b");
  await expect(page.getByRole("combobox")).toHaveValue("a/b");
});

test("Esc로 닫으면 열기 전 자리로 포커스가 돌아온다", async ({ page }) => {
  await page.goto("/");
  const button = page.getByRole("button", { name: "검색 (search)" });
  await page.waitForLoadState("networkidle");
  await button.focus();
  await expect(async () => {
    if (!(await palette(page).isVisible())) await page.keyboard.press("Enter");
    await expect(palette(page)).toBeVisible({ timeout: 1000 });
  }).toPass({ timeout: 10000 });
  await page.keyboard.press("Escape");
  await expect(palette(page)).toBeHidden();
  await expect(button).toBeFocused();
});

test("터치용 닫기 버튼(esc)으로 닫을 수 있다", async ({ page }) => {
  await page.goto("/");
  await open(page);
  await palette(page).getByRole("button", { name: "esc 닫기" }).click();
  await expect(palette(page)).toBeHidden();
});

test("Tab은 팔레트 안에 머문다(포커스 트랩)", async ({ page }) => {
  await page.goto("/");
  await open(page);
  for (let i = 0; i < 4; i += 1) await page.keyboard.press("Tab");
  await expect(page.getByRole("combobox")).toBeFocused();
});

test("빈 입력은 최근 글 5편, 결과 수를 role=status로 알린다", async ({ page }) => {
  await page.goto("/");
  await open(page);
  await expect(page.getByRole("option")).toHaveCount(5);
  await expect(palette(page).getByRole("status")).toHaveText("최근 글 5편");
  await page.keyboard.type("karpenter");
  const count = await page.getByRole("option").count();
  await expect(palette(page).getByRole("status")).toHaveText(`글 ${count}개`);
  await page.keyboard.type("zzzz");
  await expect(palette(page).getByRole("status")).toHaveText("검색 결과 없음");
  await expect(page.getByRole("combobox")).toHaveAttribute("aria-expanded", "false");
});

test("시안 예시: karpenter → 3편, ENI → 3편(소제목 일치 줄 포함)", async ({ page }) => {
  await page.goto("/");
  await open(page);
  await page.keyboard.type("karpenter");
  await expect(page.getByRole("option")).toHaveCount(3);
  await page.getByRole("combobox").fill("ENI");
  await expect(page.getByRole("option")).toHaveCount(3);
});

test("소제목에서만 맞은 글은 `# 소제목` 줄이 보인다", async ({ page }) => {
  await page.goto("/");
  await open(page);
  await page.keyboard.type("시험 난이도");
  const row = page.getByRole("option").first();
  await expect(row.locator(".palette__item-sub")).toContainText("# 시험 난이도");
});

test("처음 열기 전에는 팔레트 코드·인덱스를 내려받지 않는다", async ({ page }) => {
  const requests: string[] = [];
  page.on("request", (request) => requests.push(request.url()));
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  expect(requests.some((url) => url.includes("search-index.json"))).toBe(false);
  await open(page);
  await expect.poll(() => requests.some((url) => url.includes("search-index.json"))).toBe(true);
});

test("/search-index.json: 글 목록과 같은 수, draft 없음, 소제목 포함", async ({ request }) => {
  const response = await request.get("/search-index.json");
  expect(response.ok()).toBe(true);
  const index = (await response.json()) as SearchEntry[];
  expect(index.length).toBeGreaterThan(0);
  expect(index.every((item) => item.u.startsWith("/posts/"))).toBe(true);
  expect(index.some((item) => item.h.length > 0)).toBe(true);
  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const item of index) expect(sitemap).toContain(item.u);
});

test("O-8: 팔레트가 열린 동안 배경 스크롤이 잠기고 닫으면 위치가 그대로다", async ({ page }) => {
  await page.goto("/posts/karpenter");
  await page.evaluate(() => window.scrollTo(0, 600));
  const before = await page.evaluate(() => window.scrollY);
  await open(page);
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).toBe("hidden");
  await page.mouse.move(5, 5);
  await page.mouse.wheel(0, 800);
  await page.keyboard.press("PageDown");
  expect(await page.evaluate(() => window.scrollY)).toBe(before);
  await page.keyboard.press("Escape");
  await expect(palette(page)).toBeHidden();
  await expect
    .poll(() => page.evaluate(() => getComputedStyle(document.documentElement).overflow))
    .not.toBe("hidden");
  expect(await page.evaluate(() => window.scrollY)).toBe(before);
});

test("홈에는 글 검색창이 없다(검색은 헤더 팔레트 하나)", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("searchbox")).toHaveCount(0);
  await expect(page.locator('main input[type="search"]')).toHaveCount(0);
});
