import { defineConfig } from "@playwright/test";

const PORT = 4173;

// 정적 export 산출물(out/)을 띄워 실행한다. 먼저 `yarn build`가 필요하다.
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: { baseURL: `http://localhost:${PORT}` },
  projects: [
    { name: "desktop", use: { viewport: { width: 1280, height: 720 } } },
    { name: "mobile", use: { viewport: { width: 360, height: 640 } } },
  ],
  webServer: {
    command: `yarn serve out -l ${PORT} --no-clipboard`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
  },
});
