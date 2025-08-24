import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: '/shashank-yadav-portfolio',
  assetPrefix: '/shashank-yadav-portfolio/',
};

export default nextConfig;
