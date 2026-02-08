import React, { useMemo } from "react";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const renderedContent = useMemo(() => {
    const blocks = content.split(/(\`\`\`[\s\S]*?\`\`\`)/g);

    return blocks.map((block, index) => {
      if (block.startsWith("```")) {
        const lines = block.split("\n");
        const lang = lines[0].replace("```", "").trim() || "code";
        const code = lines.slice(1, -1).join("\n").trim();

        return (
          <div key={index} className="relative group my-8">
            <div className="absolute -top-3 left-4 px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs font-mono text-gray-600 dark:text-gray-400 uppercase tracking-wider z-10">
              {lang}
            </div>
            <pre className="bg-gray-900 dark:bg-black p-6 rounded-xl overflow-x-auto border border-gray-200 dark:border-gray-800 shadow-lg">
              <code className="text-sm font-mono text-gray-300 dark:text-gray-300 block leading-relaxed">
                {code}
              </code>
            </pre>
          </div>
        );
      }

      return block
        .split("\n")
        .map((line, lineIndex) => {
          if (line.trim() === "") return null;

          if (line.startsWith("# ")) {
            return (
              <h1
                key={`${index}-${lineIndex}`}
                className="text-3xl sm:text-4xl font-extrabold mt-10 mb-6 text-gray-900 dark:text-white border-b-2 border-sky-500/20 pb-4"
              >
                {line.substring(2)}
              </h1>
            );
          }
          if (line.startsWith("## ")) {
            return (
              <h2
                key={`${index}-${lineIndex}`}
                className="text-2xl sm:text-3xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-100"
              >
                {line.substring(3)}
              </h2>
            );
          }
          if (line.startsWith("### ")) {
            return (
              <h3
                key={`${index}-${lineIndex}`}
                className="text-xl sm:text-2xl font-bold mt-6 mb-3 text-gray-800 dark:text-gray-200"
              >
                {line.substring(4)}
              </h3>
            );
          }
          if (line.startsWith("* ") || line.startsWith("- ")) {
            return (
              <li
                key={`${index}-${lineIndex}`}
                className="ml-6 mb-2 list-disc text-gray-700 dark:text-gray-300"
              >
                {line.substring(2)}
              </li>
            );
          }

          const formatText = (text: string) => {
            return text
              .replace(
                /\*\*(.*?)\*\*/g,
                '<strong class="font-bold text-gray-900 dark:text-white">$1</strong>',
              )
              .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
              .replace(
                /`(.*?)`/g,
                '<code class="bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 rounded px-1.5 py-0.5 font-mono text-sm">$1</code>',
              );
          };

          return (
            <p
              key={`${index}-${lineIndex}`}
              className="my-5 leading-relaxed text-gray-700 dark:text-gray-300 text-lg"
              dangerouslySetInnerHTML={{ __html: formatText(line) }}
            />
          );
        })
        .filter(Boolean);
    });
  }, [content]);

  return (
    <div className="prose dark:prose-invert max-w-none">{renderedContent}</div>
  );
};

export default MarkdownRenderer;
