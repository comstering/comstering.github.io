import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // App Router 프로젝트를 정적 export 모드로 전환
  output: "export",
  // 동적 라우트도 슬래시 붙여 정적파일로 생성
  trailingSlash: false,
  images: {
    unoptimized: true, // ⚠️ 정적 내보내기 모드에서 이미지 최적화 비활성화
  },
};

export default nextConfig;
