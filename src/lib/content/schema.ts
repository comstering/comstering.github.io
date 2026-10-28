import { z } from "zod";

export const CATEGORIES = ["infra", "backend", "frontend", "oss", "note"] as const;
export type Category = (typeof CATEGORIES)[number];

const dateString = z
  .string()
  .regex(
    /^\d{4}-\d{2}-\d{2}$/,
    'YYYY-MM-DD 형식의 따옴표 문자열이어야 합니다 (예: "2026-01-06")',
  )
  .refine((value) => !Number.isNaN(Date.parse(value)), "존재하지 않는 날짜입니다");

// 글 안에서는 항상 CATEGORIES의 고정 순서로 둔다(작성 순서는 의미 없음, PRD-003 4장 B안).
const categoriesField = z
  .array(z.enum(CATEGORIES))
  .min(1, "카테고리를 1개 이상 지정해야 합니다")
  .max(2, "카테고리는 최대 2개입니다")
  .refine((values) => new Set(values).size === values.length, "카테고리가 중복되었습니다")
  .transform((values) =>
    [...values].sort((a, b) => CATEGORIES.indexOf(a) - CATEGORIES.indexOf(b)),
  );

export const frontmatterSchema = z
  .strictObject({
    title: z.string().min(1),
    description: z.string().min(1),
    date: dateString,
    categories: categoriesField,
    tags: z.array(z.string().min(1)).min(1, "태그를 1개 이상 지정해야 합니다"),
    series: z.string().min(1).optional(),
    seriesOrder: z.number().int().positive().optional(),
    thumbnail: z.string().min(1).optional(),
    draft: z.boolean().default(false),
    relatedProject: z.string().min(1).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.series && data.seriesOrder === undefined) {
      ctx.addIssue({
        code: "custom",
        path: ["seriesOrder"],
        message: "series를 지정하면 seriesOrder도 필요합니다",
      });
    }
    if (!data.series && data.seriesOrder !== undefined) {
      ctx.addIssue({
        code: "custom",
        path: ["series"],
        message: "seriesOrder를 지정하면 series도 필요합니다",
      });
    }
  });

export type Frontmatter = z.infer<typeof frontmatterSchema>;

export const seriesRegistrySchema = z.record(
  z.string(),
  z.strictObject({
    // 360px 글 목록 메타 줄에 들어가도록 8자 이하 (디자인 12번 E8)
    label: z.string().min(1).max(8, "label은 8자 이하여야 합니다"),
    title: z.string().min(1),
  }),
);
export type SeriesRegistry = z.infer<typeof seriesRegistrySchema>;
