import { z } from "zod";

// PRD-004 4.2~4.5. fs를 쓰지 않는 순수 규칙이라 E2E에서 브라우저 없이 검사한다.

const month = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'YYYY-MM 형식의 문자열이어야 합니다 (예: "2026-03")');

const range = z.strictObject({ start: month, end: month.optional() });
const period = z.union([range, z.array(range).min(1)]);

const url = z.url();
const text = z.string().min(1);

export const siteSchema = z.strictObject({
  title: text,
  command: text,
  tagline: text,
});
export type SiteConfig = z.infer<typeof siteSchema>;

const activity = z.strictObject({
  id: text,
  title: text,
  period: period.optional(),
  description: text,
  tags: z.array(text).default([]),
  url: url.optional(),
});

export const profileSchema = z.strictObject({
  name: text,
  nameEn: text,
  handle: text,
  role: text,
  careerStart: month,
  contacts: z.strictObject({ email: z.email(), github: url, linkedin: url }),
  headline: text,
  intro: z.array(text).min(1),
  skills: z
    .array(z.strictObject({ group: text, items: z.array(text).min(1) }))
    .min(1),
  education: z.array(
    z.strictObject({
      school: text,
      major: text,
      degree: text,
      period: range,
      coursework: z.array(text).default([]),
    }),
  ),
  certifications: z.array(
    z.strictObject({
      name: text,
      issuer: text,
      date: month,
      verifyUrl: url.optional(),
    }),
  ),
  experiences: z.array(activity),
});
export type Profile = z.infer<typeof profileSchema>;

export const experienceSchema = z.strictObject({
  companies: z
    .array(
      z.strictObject({
        id: text,
        name: text,
        role: text,
        period: range,
        projects: z.array(
          z.strictObject({
            id: text,
            title: text,
            period: period.optional(),
            description: text,
            points: z.array(text).default([]),
          }),
        ),
      }),
    )
    .min(1),
  openSource: z.array(activity.extend({ status: z.literal("merged") })),
  sideProjects: z.array(activity),
});
export type ExperienceData = z.infer<typeof experienceSchema>;
export type Period = z.infer<typeof period>;

// 4.3에서 없앤 필드. 스키마가 strict라 거부되지만 이유를 알려 준다.
const REMOVED_FIELDS: Record<string, string> = {
  featured: "대표 프로젝트는 만들지 않습니다",
  metric: "합산 수치는 두지 않습니다",
  stack: "기술 태그는 경력에 두지 않습니다",
  relatedPosts: "About과 글은 서로 링크하지 않습니다",
  relatedPost: "About과 글은 서로 링크하지 않습니다",
  relatedProject: "About과 글은 서로 링크하지 않습니다",
  capabilities: "what i do는 없습니다",
  resume: "resume.pdf는 About 전체에서 생성합니다",
};

export const formatIssues = (file: string, error: z.ZodError): string[] =>
  error.issues.map((issue) => {
    const field = issue.path.length ? `${issue.path.join(".")}: ` : "";
    let hint = "";
    if (issue.code === "unrecognized_keys") {
      const reasons = issue.keys
        .filter((key) => REMOVED_FIELDS[key])
        .map((key) => `${key}(${REMOVED_FIELDS[key]})`);
      if (reasons.length) hint = ` — 없앤 필드: ${reasons.join(", ")}`;
    }
    return `${file}: ${field}${issue.message}${hint}`;
  });

const toIndex = (value: string) => {
  const [y, m] = value.split("-").map(Number);
  return y * 12 + m;
};
const ranges = (p: Period | undefined) =>
  p === undefined ? [] : Array.isArray(p) ? p : [p];

// 스키마를 통과한 데이터의 교차 규칙: id 중복, 기간 순서, 회사 기간 밖 프로젝트.
export const checkExperience = (data: ExperienceData): string[] => {
  const issues: string[] = [];
  const file = "content/experience.yaml";

  const seen = new Map<string, string>();
  const claim = (id: string, where: string) => {
    const prev = seen.get(id);
    if (prev) issues.push(`${file}: id "${id}"가 중복되었습니다 (${prev}, ${where})`);
    else seen.set(id, where);
  };

  const checkRange = (p: Period | undefined, where: string) => {
    for (const r of ranges(p)) {
      if (r.end && toIndex(r.end) < toIndex(r.start)) {
        issues.push(`${file}: ${where}: end(${r.end})가 start(${r.start})보다 빠릅니다`);
      }
    }
  };

  for (const company of data.companies) {
    claim(company.id, `companies.${company.id}`);
    checkRange(company.period, `companies.${company.id}.period`);
    for (const project of company.projects) {
      const where = `${company.id}/${project.id}`;
      claim(project.id, where);
      checkRange(project.period, `${where}.period`);
      for (const r of ranges(project.period)) {
        const outside =
          toIndex(r.start) < toIndex(company.period.start) ||
          (company.period.end !== undefined &&
            toIndex(r.end ?? r.start) > toIndex(company.period.end));
        if (outside) {
          issues.push(`${file}: ${where}.period가 회사 기간 밖입니다 (${r.start}~${r.end ?? r.start})`);
        }
      }
    }
  }
  for (const item of [...data.openSource, ...data.sideProjects]) {
    claim(item.id, item.id);
    checkRange(item.period, `${item.id}.period`);
  }
  return issues;
};

// PR-18은 화면 그대로: 기존 표기("2026.03 ~ 2026.03", Present). 같은 달 한 번·now 표기는 PR-19에서 바꾼다.
const dot = (value: string) => value.replace("-", ".");
export const formatPeriod = (p: Period | undefined): string =>
  ranges(p)
    .map((r) => {
      if (!r.end) return `${dot(r.start)} ~ Present`;
      return `${dot(r.start)} ~ ${dot(r.end)}`;
    })
    .join(", ");

// 경력 N년+ (내림). now는 테스트용.
export const careerYears = (start: string, now = new Date()): number =>
  Math.max(
    0,
    Math.floor((now.getFullYear() * 12 + now.getMonth() + 1 - toIndex(start)) / 12),
  );
