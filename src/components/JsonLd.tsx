interface JsonLdProps {
  data: Record<string, unknown>;
}

// 서버에서 렌더링하는 JSON-LD. `<`를 이스케이프해 </script> 주입을 막는다.
export const JsonLd = ({ data }: JsonLdProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(data).replace(/</g, "\\u003c"),
    }}
  />
);
