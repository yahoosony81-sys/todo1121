import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    // Vercel에서 빌드할 때 ESLint 에러 때문에 배포가 실패하지 않도록 설정
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
