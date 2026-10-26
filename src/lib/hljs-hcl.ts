import type { LanguageFn } from "highlight.js";

// highlight.js에는 HCL(Terraform) 문법이 없어 최소한의 문법을 직접 정의한다.
export const hcl: LanguageFn = (hljs) => {
  const INTERPOLATION = {
    className: "subst",
    begin: /\$\{/,
    end: /\}/,
    keywords: "true false null",
  };

  return {
    name: "HCL",
    aliases: ["terraform", "tf", "tfvars"],
    keywords: {
      keyword:
        "resource data variable output locals module provider terraform moved import check for_each count depends_on lifecycle dynamic content for in if",
      literal: "true false null",
    },
    contains: [
      hljs.HASH_COMMENT_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: "string",
        begin: /"/,
        end: /"/,
        contains: [hljs.BACKSLASH_ESCAPE, INTERPOLATION],
      },
      hljs.C_NUMBER_MODE,
      {
        className: "attr",
        begin: /^\s*[A-Za-z_][\w-]*(?=\s*=[^=])/m,
      },
    ],
  };
};
