import type { Element, ElementContent, Root } from "hast";
import { visit } from "unist-util-visit";
import { infoIcon, warnIcon } from "./hast-icons";

const CALLOUTS = {
  NOTE: { variant: "note", label: "note", icon: infoIcon },
  WARNING: { variant: "warn", label: "warning", icon: warnIcon },
} as const;

const MARKER = /^\s*\[!(NOTE|WARNING)\][ \t]*\n?/;

const el = (
  tagName: string,
  properties: Element["properties"],
  children: ElementContent[] = [],
): Element => ({ type: "element", tagName, properties, children });

// GitHub 문법 콜아웃(> [!NOTE], > [!WARNING])과 표 스크롤 래퍼를 만든다.
export const rehypeArticleBlocks = () => (tree: Root) => {
  visit(tree, "element", (node, index, parent) => {
    if (!parent || index === undefined) return;

    if (node.tagName === "table") {
      parent.children[index] = el("div", { className: ["table-scroll"] }, [node]);
      return "skip";
    }

    if (node.tagName !== "blockquote") return;
    const paragraph = node.children.find(
      (child): child is Element =>
        child.type === "element" && child.tagName === "p",
    );
    const first = paragraph?.children[0];
    if (!paragraph || first?.type !== "text") return;
    const match = first.value.match(MARKER);
    if (!match) return;

    const { variant, label, icon } = CALLOUTS[match[1] as keyof typeof CALLOUTS];
    first.value = first.value.replace(MARKER, "");
    // 마커 뒤에 본문이 비었으면 빈 첫 줄을 버린다.
    if (!first.value && paragraph.children.length === 1) {
      node.children = node.children.filter((child) => child !== paragraph);
    }

    const className =
      variant === "warn" ? ["callout", "callout--warn"] : ["callout"];
    parent.children[index] = el("div", { className, role: "note" }, [
      el("div", { className: ["callout__label"] }, [
        icon(),
        { type: "text", value: label },
      ]),
      ...node.children.filter(
        (child) => !(child.type === "text" && !child.value.trim()),
      ),
    ]);
    return "skip";
  });
};
