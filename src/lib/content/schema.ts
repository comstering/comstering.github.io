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

export const frontmatterSchema = z
  .strictObject({
    title: z.string().min(1),
    description: z.string().min(1),
    date: dateString,
    updated: dateString.optional(),
    category: z.enum(CATEGORIES),
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
    label: z.string().min(1),
    title: z.string().min(1),
  }),
);
export type SeriesRegistry = z.infer<typeof seriesRegistrySchema>;
