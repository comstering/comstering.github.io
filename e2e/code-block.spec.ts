import { expect, test } from "@playwright/test";

const POST = "/posts/custom-networking-karpenter-eni-troubleshooting";

test.use({ permissions: ["clipboard-read", "clipboard-write"] });

test("코드 블록: 파일명·줄 하이라이트를 보여 주고 복사본은 원문과 같다", async ({
  page,
}) => {
  await page.goto(POST);
  const block = page.locator(".code", { hasText: "reservedENIs" });
  await expect(block.locator(".code__file")).toHaveText("values.yaml");
  await expect(block.locator(".ln--hl")).toHaveCount(1);
  await expect(block.locator(".ln--hl")).toContainText("reservedENIs");

  const expected = (await block.locator(".ln").allTextContents()).join("\n");
  await block.getByRole("button", { name: /^copy/ }).click();
  await expect(block.locator(".code__copy")).toHaveText("copied");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    expected,
  );
});

test("코드 복사 버튼은 키보드로 누를 수 있다", async ({ page }) => {
  await page.goto(POST);
  // 이름이 보이는 글자(copy → copied)를 따라 바뀌므로 클래스로 잡는다
  const button = page
    .locator(".code", { hasText: "reservedENIs" })
    .locator(".code__copy");
  await expect(button).toHaveAccessibleName("copy");
  await button.focus();
  await page.keyboard.press("Enter");
  await expect(button).toHaveText("copied");
});

test("셸 블록은 복사할 때 줄 맨 앞 '$ '를 뺀다", async ({ page }) => {
  await page.goto(POST);
  // 화면에는 프롬프트를 남기고 복사본에서만 뺀다. 기존 글에 프롬프트 블록이 없어 DOM으로 만든다.
  await page.evaluate(() => {
    const block = Array.from(document.querySelectorAll<HTMLElement>(".code")).find(
      (el) => el.querySelectorAll(".ln").length >= 2,
    );
    if (!block) throw new Error("코드 블록이 없다");
    block.dataset.lang = "bash";
    const lines = block.querySelectorAll(".ln");
    lines[0].textContent = "$ kubectl get nodes";
    lines[1].textContent = "NAME   STATUS";
  });
  await page
    .locator('.code[data-lang="bash"]')
    .getByRole("button", { name: /^copy/ })
    .click();
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied.split("\n").slice(0, 2)).toEqual([
    "kubectl get nodes",
    "NAME   STATUS",
  ]);
});
