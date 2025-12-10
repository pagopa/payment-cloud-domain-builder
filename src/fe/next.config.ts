
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: process.env.CONTEXT_ROOT,
  basePath: process.env.CONTEXT_ROOT,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;