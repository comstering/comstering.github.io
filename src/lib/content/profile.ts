import fs from "fs";
import path from "path";
import { parse } from "yaml";
import type { z } from "zod";
import {
  checkExperience,
  experienceSchema,
  formatIssues,
  profileSchema,
  siteSchema,
  type ExperienceData,
  type Profile,
  type SiteConfig,
} from "./profile-schema";

const contentDirectory = path.join(process.cwd(), "content");

const fail = (issues: string[]): never => {
  throw new Error(
    `콘텐츠 검증에 실패했습니다 (${issues.length}건):\n${issues.map((issue) => `  - ${issue}`).join("\n")}`,
  );
};

const load = <T extends z.ZodType>(fileName: string, schema: T): z.infer<T> => {
  const raw = parse(
    fs.readFileSync(path.join(contentDirectory, fileName), "utf8"),
  );
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return fail(formatIssues(`content/${fileName}`, parsed.error));
  }
  return parsed.data;
};

export const loadSite = (): SiteConfig => load("site.yaml", siteSchema);

export const loadProfile = (): Profile => load("profile.yaml", profileSchema);

export const loadExperience = (): ExperienceData => {
  const data = load("experience.yaml", experienceSchema);
  const issues = checkExperience(data);
  if (issues.length > 0) fail(issues);
  return data;
};
