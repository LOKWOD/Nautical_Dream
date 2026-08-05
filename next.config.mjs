/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.GITHUB_ACTIONS ? '/Nautical_Dream' : '',
  assetPrefix: process.env.GITHUB_ACTIONS ? '/Nautical_Dream/' : undefined,
  images: { unoptimized: true }
};

export default nextConfig;
