import type { Element, ElementContent, Root } from "hast";
import { visit } from "unist-util-visit";

// 코드 펜스 meta: ```yaml title="values.yaml" {3,5-6}
interface CodeMeta {
  title?: string;
  highlight: Set<number>;
}

const parseMeta = (meta: string): CodeMeta => {
  const title = meta.match(/title=(?:"([^"]*)"|'([^']*)')/);
  const highlight = new Set<number>();
  const ranges = meta.match(/\{([\d,\s-]+)\}/);
  ranges?.[1].split(",").forEach((part) => {
    const [start, end = start] = part.trim().split("-").map(Number);
    if (!Number.isInteger(start) || !Number.isInteger(end)) return;
    for (let line = start; line <= end; line += 1) highlight.add(line);
  });
  return { title: title?.[1] ?? title?.[2], highlight };
};

const isElement = (node: ElementContent): node is Element =>
  node.type === "element";

// 여러 줄에 걸친 노드(예: 블록 주석 span)를 줄 단위로 쪼갠다.
const splitLines = (nodes: ElementContent[]): ElementContent[][] => {
  const lines: ElementContent[][] = [[]];
  const walk = (node: ElementContent): ElementContent[][] => {
    if (node.type === "text") {
      return node.value
        .split("\n")
        .map((value) => (value ? [{ type: "text" as const, value }] : []));
    }
    if (!isElement(node)) return [[node]];
    const parts: ElementContent[][] = [[]];
    node.children.forEach((child) => {
      const [first, ...rest] = walk(child);
      parts[parts.length - 1].push(...first);
      rest.forEach((part) => parts.push(part));
    });
    return parts.map((children) =>
      children.length ? [{ ...node, children }] : [],
    );
  };
  nodes.forEach((node) => {
    const [first, ...rest] = walk(node);
    lines[lines.length - 1].push(...first);
    rest.forEach((part) => lines.push(part));
  });
  // 코드 끝의 개행이 만든 빈 줄은 버린다.
  if (lines.length > 1 && lines[lines.length - 1].length === 0) lines.pop();
  return lines;
};

const el = (
  tagName: string,
  properties: Element["properties"],
  children: ElementContent[] = [],
): Element => ({ type: "element", tagName, properties, children });

const languageOf = (code: Element): string => {
  const classes = (code.properties?.className as string[] | undefined) ?? [];
  const found = classes.find((name) => name.startsWith("language-"));
  return found ? found.slice("language-".length) : "text";
};

// rehype-highlight 뒤에 둔다. <pre><code>를 상단 바가 있는 .code 블록으로 감싸고,
// 하이라이트 줄이 있으면 줄 단위 <span class="ln">으로 쪼갠다.
export const rehypeCodeMeta = () => (tree: Root) => {
  visit(tree, "element", (node, index, parent) => {
    if (node.tagName !== "pre" || !parent || index === undefined) return;
    const code = node.children.find(
      (child): child is Element => isElement(child) && child.tagName === "code",
    );
    if (!code) return;

    const meta = parseMeta(
      (code.data as { meta?: string } | undefined)?.meta ?? "",
    );
    const lang = languageOf(code);

    // 줄 래퍼(.ln)는 항상 쓴다. 복사 시 줄 단위로 합쳐 원문을 복원한다.
    const lines = splitLines(code.children);
    code.children = lines.map((children, i) =>
      el(
        "span",
        {
          className: meta.highlight.has(i + 1) ? ["ln", "ln--hl"] : ["ln"],
        },
        children.length ? children : [{ type: "text", value: " " }],
      ),
    );

    const bar = el("div", { className: ["code__bar"] }, [
      el("span", { className: ["code__file"] }, [
        { type: "text", value: meta.title ?? "" },
      ]),
      el("div", { className: ["code__tools"] }, [
        el("span", { className: ["code__lang"] }, [
          { type: "text", value: lang },
        ]),
        el(
          "button",
          {
            type: "button",
            className: ["code__copy"],
            ariaLabel: "코드 복사",
          },
          [{ type: "text", value: "copy" }],
        ),
      ]),
    ]);

    parent.children[index] = el("div", { className: ["code"], dataLang: lang }, [
      bar,
      node,
    ]);
    return "skip";
  });
};
