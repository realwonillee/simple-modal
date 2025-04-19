/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // SWC 컴파일러를 Babel 설정이 있어도 강제로 활성화
  swcMinify: true,
  experimental: {
    forceSwcTransforms: true,
  },
};

export default nextConfig;
