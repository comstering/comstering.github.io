import { expect, test, type Page } from "@playwright/test";

// PR-24(PRD-004 5.6): 홈 WebSite·About Person JSON-LD, 홈 description.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Json = Record<string, any>;
const jsonLd = async (page: Page) =>
  (
    await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((els) => els.map((el) => el.textContent ?? ""))
  ).map((raw) => JSON.parse(raw) as Json);

test("홈: WebSite JSON-LD와 description(80~160자)", async ({ page }) => {
  await page.goto("/");
  const webSite = (await jsonLd(page)).find((d) => d["@type"] === "WebSite");
  expect(webSite).toMatchObject({
    "@context": "https://schema.org",
    name: "Comstering's Dev Notes",
  });
  expect(webSite!.url).toMatch(/^https:\/\/comstering\.github\.io/);

  const description = await page
    .locator('head meta[name="description"]')
    .getAttribute("content");
  expect(description).toContain("실행해 본 것만 기록합니다.");
  const length = [...description!].length;
  expect(length).toBeGreaterThanOrEqual(80);
  expect(length).toBeLessThanOrEqual(160);
});

test("About: ProfilePage > Person(alumniOf·hasCredential, worksFor 없음)", async ({ page }) => {
  await page.goto("/about");
  const profilePage = (await jsonLd(page)).find((d) => d["@type"] === "ProfilePage");
  const person = profilePage!.mainEntity;
  expect(person["@type"]).toBe("Person");
  expect(person.name).toBe("최한수");
  expect(person.alternateName).toBe("comstering");
  expect(person.jobTitle).toBeTruthy();
  expect(person.sameAs.length).toBeGreaterThanOrEqual(2);
  expect(person.alumniOf[0]).toMatchObject({ "@type": "CollegeOrUniversity" });
  expect(person.hasCredential.length).toBeGreaterThanOrEqual(1);
  expect(person.hasCredential[0]).toMatchObject({
    "@type": "EducationalOccupationalCredential",
    recognizedBy: { "@type": "Organization", name: "HashiCorp" },
  });
  expect(person).not.toHaveProperty("worksFor");
});

test("글 상세: 기존 BlogPosting JSON-LD 유지", async ({ page }) => {
  await page.goto("/posts/karpenter");
  const types = (await jsonLd(page)).map((d) => d["@type"]);
  expect(types).toContain("BlogPosting");
});
