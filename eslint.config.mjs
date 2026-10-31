import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  { ignores: ["out/**", ".next/**", "public/_img/**", "playwright-report/**", "test-results/**", "cowork/**", "next-env.d.ts"] },
];

export default eslintConfig;
