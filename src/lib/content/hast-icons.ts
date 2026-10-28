import type { Element } from "hast";

// 시안(cowork/design/site/post.html)의 24x24 stroke 아이콘을 hast로 만든다.
const svg = (paths: Array<[string, Record<string, string>]>): Element => ({
  type: "element",
  tagName: "svg",
  properties: {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ariaHidden: "true",
  },
  children: paths.map(([tagName, properties]) => ({
    type: "element",
    tagName,
    properties,
    children: [],
  })),
});

export const copyIcon = () =>
  svg([
    ["rect", { x: "9", y: "9", width: "13", height: "13", rx: "2" }],
    ["path", { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" }],
  ]);

export const infoIcon = () =>
  svg([
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "M12 16v-4M12 8h.01" }],
  ]);

export const warnIcon = () =>
  svg([
    ["path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" }],
    ["path", { d: "M12 9v4M12 17h.01" }],
  ]);
