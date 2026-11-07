import { expect, test } from "@playwright/test";
import {
  careerYears,
  checkExperience,
  experienceSchema,
  formatIssues,
  formatPeriod,
  profileSchema,
  siteSchema,
} from "../src/lib/content/profile-schema";
import { frontmatterSchema } from "../src/lib/content/schema";

// 브라우저 없이 PRD-004 4.5 규칙을 검사한다(PR-18 수용 기준: 규칙별 깨진 fixture는 빌드 실패).
const project = (over: Record<string, unknown> = {}) => ({
  id: "p1",
  title: "프로젝트",
  period: { start: "2025-03", end: "2025-04" },
  description: "설명",
  points: ["성과"],
  ...over,
});
const company = (over: Record<string, unknown> = {}) => ({
  id: "c1",
  name: "회사",
  role: "Engineer",
  period: { start: "2025-01", end: "2025-12" },
  projects: [project()],
  ...over,
});
const experience = (over: Record<string, unknown> = {}) => ({
  companies: [company()],
  openSource: [],
  sideProjects: [],
  ...over,
});

const problems = (data: unknown): string[] => {
  const parsed = experienceSchema.safeParse(data);
  return parsed.success
    ? checkExperience(parsed.data)
    : formatIssues("content/experience.yaml", parsed.error);
};

test("올바른 데이터는 통과", () => {
  expect(problems(experience())).toEqual([]);
});

test("필수 필드 누락: 회사 id·name·role·period, 프로젝트 id·title·description", () => {
  for (const key of ["id", "name", "role", "period"]) {
    const broken = company();
    delete (broken as Record<string, unknown>)[key];
    expect(problems(experience({ companies: [broken] })).length, key).toBeGreaterThan(0);
  }
  for (const key of ["id", "title", "description"]) {
    const broken = project();
    delete (broken as Record<string, unknown>)[key];
    expect(
      problems(experience({ companies: [company({ projects: [broken] })] })).length,
      key,
    ).toBeGreaterThan(0);
  }
});

test("회사·프로젝트 id 중복", () => {
  expect(
    problems(experience({ companies: [company(), company({ projects: [] })] })).join(),
  ).toContain("중복");
  expect(
    problems(
      experience({ companies: [company({ projects: [project(), project()] })] }),
    ).join(),
  ).toContain("중복");
  // 회사 id와 프로젝트 id도 같은 앵커 공간이라 겹치면 안 된다
  expect(
    problems(experience({ companies: [company({ projects: [project({ id: "c1" })] })] })).join(),
  ).toContain("중복");
});

test("end가 start보다 빠르면 실패", () => {
  const bad = project({ period: { start: "2025-05", end: "2025-04" } });
  expect(
    problems(experience({ companies: [company({ projects: [bad] })] })).join(),
  ).toContain("보다 빠릅니다");
});

test("회사 기간 밖의 프로젝트 기간", () => {
  const early = project({ period: { start: "2024-12", end: "2025-02" } });
  const late = project({ period: { start: "2025-11", end: "2026-01" } });
  for (const bad of [early, late]) {
    expect(
      problems(experience({ companies: [company({ projects: [bad] })] })).join(),
    ).toContain("회사 기간 밖");
  }
  // 재직 중(end 없음)인 회사는 끝이 열려 있다
  const open = company({ period: { start: "2025-01" }, projects: [late] });
  expect(problems(experience({ companies: [open] }))).toEqual([]);
});

test("기간이 여러 개인 프로젝트는 각각 검사", () => {
  const multi = project({
    period: [
      { start: "2025-03", end: "2025-06" },
      { start: "2025-08", end: "2026-02" },
    ],
  });
  expect(
    problems(experience({ companies: [company({ projects: [multi] })] })).join(),
  ).toContain("회사 기간 밖");
});

test("4.3에서 없앤 필드는 실패하고 이유를 알려 준다", () => {
  for (const key of ["featured", "metric", "stack", "relatedPosts", "capabilities"]) {
    const broken = problems(
      experience({ companies: [company({ projects: [project({ [key]: "x" })] })] }),
    ).join();
    expect(broken, key).toContain(key);
    expect(broken, key).toContain("없앤 필드");
  }
  const cert = profileSchema.safeParse({ certifications: [{ relatedPost: "x" }] });
  expect(cert.success).toBe(false);
});

test("글 frontmatter의 relatedProject는 실패", () => {
  const result = frontmatterSchema.safeParse({
    title: "t",
    description: "d",
    date: "2026-10-28",
    categories: ["infra"],
    tags: ["aws"],
    relatedProject: "eks-networking",
  });
  expect(result.success).toBe(false);
});

test("기간 형식은 YYYY-MM", () => {
  const bad = project({ period: { start: "2025.03" } });
  expect(problems(experience({ companies: [company({ projects: [bad] })] })).length).toBeGreaterThan(0);
});

test("site.yaml은 title·command·tagline 필수", () => {
  expect(siteSchema.safeParse({ title: "a", command: "b", tagline: "c" }).success).toBe(true);
  expect(siteSchema.safeParse({ title: "a", command: "b" }).success).toBe(false);
});

test("기간 표시와 경력 연차", () => {
  expect(formatPeriod({ start: "2024-06" })).toBe("2024.06 ~ Present");
  expect(formatPeriod([{ start: "2025-05", end: "2026-03" }, { start: "2026-01", end: "2026-02" }])).toBe(
    "2025.05 ~ 2026.03, 2026.01 ~ 2026.02",
  );
  expect(formatPeriod(undefined)).toBe("");
  expect(careerYears("2022-05", new Date(2026, 3, 30))).toBe(3); // 2026-04: 3년 11개월 → 3
  expect(careerYears("2022-05", new Date(2026, 4, 1))).toBe(4); // 2026-05: 4년 0개월 → 4
});
