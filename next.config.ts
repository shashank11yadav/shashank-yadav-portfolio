import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true' || process.env.DEPLOY_TARGET === 'github-pages';
const basePath = (isProd && isGitHubPages) ? '/shashank-yadav-portfolio' : '';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: basePath,
  assetPrefix: basePath,
  env: {
    CUSTOM_BASE_PATH: basePath,
  },
};

export default nextConfig;
