import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import type { CSSProperties } from "react";

// OG 이미지(1200×630, 항상 다크). 시안: cowork/design/site/og.html (PRD-003 PR-15)
//   - 색은 globals.css의 `.dark` 토큰을 빌드 때 읽어 쓴다(hex를 코드에 두지 않는다)
//   - satori는 woff2를 못 읽으므로 Pretendard 700(otf)·JetBrains Mono 400(woff)를 넣는다

export const OG_SIZE = { width: 1200, height: 630 } as const;

const readDarkTokens = (): Record<string, string> => {
  const css = fs.readFileSync(path.join(process.cwd(), "src/app/globals.css"), "utf8");
  const block = css.match(/^\.dark\s*\{([^}]*)\}/m)?.[1] ?? "";
  return Object.fromEntries(
    [...block.matchAll(/--([\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]),
  );
};

type Fonts = NonNullable<ConstructorParameters<typeof ImageResponse>[1]>["fonts"];

let cached: { tokens: Record<string, string>; fonts: Fonts } | undefined;
const load = () => {
  if (cached) return cached;
  const read = (p: string) => fs.readFileSync(path.join(process.cwd(), p));
  cached = {
    tokens: readDarkTokens(),
    fonts: [
      {
        name: "Pretendard",
        data: read("node_modules/pretendard/dist/public/static/Pretendard-Bold.otf"),
        weight: 700,
        style: "normal",
      },
      {
        name: "JetBrains Mono",
        data: read(
          "node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff",
        ),
        weight: 400,
        style: "normal",
      },
    ],
  };
  return cached;
};

export interface OgContent {
  title: string;
  /** 우상단 텍스트 (예: comstering.github.io, about) */
  site: string;
  /** 하단 줄. 첫 항목은 accent 색 */
  meta: string[];
}

export const renderOg = ({ title, site, meta }: OgContent): ImageResponse => {
  const { tokens, fonts } = load();
  const { canvas, fg, mute, accent } = tokens;
  const mono: CSSProperties = { fontFamily: "JetBrains Mono", fontSize: 26, color: mute };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: canvas,
          color: fg,
          fontFamily: "Pretendard",
        }}
      >
        <div style={{ ...mono, display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            <span style={{ color: fg }}>~/</span>
            <span>comstering</span>
            <span style={{ color: accent }}>_</span>
          </div>
          <span>{site}</span>
        </div>
        <div
          style={{
            display: "-webkit-box",
            maxWidth: 960,
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.25,
            letterSpacing: -2.24,
            lineClamp: 3,
            wordBreak: "keep-all",
          }}
        >
          {title}
        </div>
        <div style={{ ...mono, display: "flex", gap: 24 }}>
          {meta.map((item, index) => (
            <span key={item} style={index === 0 ? { color: accent } : undefined}>
              {item}
            </span>
          ))}
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
};
