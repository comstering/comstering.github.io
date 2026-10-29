import fs from "node:fs";
import path from "node:path";
import type { Element, ElementContent, Root } from "hast";
import type { VFile } from "vfile";
import { visit } from "unist-util-visit";

// scripts/optimize-images.mjs 가 만든 변환 결과 (원본 경로 → WebP 경로·크기)
interface ImageEntry {
  src: string;
  width: number;
  height: number;
}

const MANIFEST = path.join(process.cwd(), "public", "_img", "manifest.json");

// 본문 가로폭(px). 변환본이 이보다 넓으면 화면에서 줄어들어 보이므로 확대가 의미 있다 (디자인 12번 E3)
export const CONTENT_WIDTH = 720;

let manifest: Record<string, ImageEntry> | null = null;
const loadManifest = (): Record<string, ImageEntry> => {
  if (manifest) return manifest;
  manifest = fs.existsSync(MANIFEST)
    ? (JSON.parse(fs.readFileSync(MANIFEST, "utf8")) as Record<string, ImageEntry>)
    : {};
  return manifest;
};

const isElement = (node: ElementContent): node is Element =>
  node.type === "element";

const isBlank = (node: ElementContent) =>
  node.type === "text" && node.value.trim() === "";

// 본문 <img>를 다듬는다.
//  1) src를 WebP 변환본으로, width·height를 실제 크기로 (CLS 방지)
//  2) 첫 이미지는 바로 불러오고(LCP) 나머지는 lazy
//  3) 변환본이 본문 폭보다 넓으면 확대 가능(role=button)으로 표시 — 아니면 아무 표시도 하지 않는다
//  4) 글 안에 이미지만 있는 문단은 <figure>로, 마크다운 title은 <figcaption>으로
//  5) alt가 비어 있으면 빌드 경고
export const rehypeImages = () => (tree: Root, file: VFile) => {
  const images = loadManifest();
  const label = file.path ?? "글";
  let first = true;
  const missingAlt: string[] = [];

  visit(tree, "element", (node) => {
    if (node.tagName !== "img") return;
    const props = node.properties ?? {};
    const original = String(props.src ?? "");
    const alt = String(props.alt ?? "").trim();
    if (!alt) missingAlt.push(original);

    const entry = images[original];
    if (entry) {
      props.src = entry.src;
      props.width = entry.width;
      props.height = entry.height;
      if (entry.width > CONTENT_WIDTH) {
        props.className = ["zoomable"];
        props.role = "button";
        props.tabIndex = 0;
        props.ariaLabel = `${alt || "이미지"} 확대`;
      }
    } else if (original.startsWith("/images/")) {
      console.warn(`${label}: 변환본이 없어 원본을 씁니다 (${original})`);
    }

    props.decoding = "async";
    if (first) {
      props.fetchPriority = "high";
    } else {
      props.loading = "lazy";
    }
    first = false;
    node.properties = props;
  });

  // 이미지 하나만 든 문단 → figure (+ title이 있으면 figcaption)
  visit(tree, "element", (node, index, parent) => {
    if (node.tagName !== "p" || !parent || index === undefined) return;
    const content = node.children.filter((child) => !isBlank(child));
    const only = content.length === 1 ? content[0] : null;
    if (!only || !isElement(only) || only.tagName !== "img") return;

    const title = only.properties?.title;
    const children: ElementContent[] = [only];
    if (typeof title === "string" && title) {
      delete only.properties.title;
      children.push({
        type: "element",
        tagName: "figcaption",
        properties: {},
        children: [{ type: "text", value: title }],
      });
    }
    parent.children[index] = {
      type: "element",
      tagName: "figure",
      properties: {},
      children,
    };
  });

  if (missingAlt.length > 0) {
    console.warn(
      `${label}: 이미지 alt가 비어 있습니다 (${missingAlt.join(", ")})`,
    );
  }
};
