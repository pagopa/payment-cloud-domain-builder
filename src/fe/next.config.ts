
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: `/domain-builder`, //`${process.env.CONTEXT_ROOT}`,
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