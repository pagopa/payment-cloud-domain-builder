
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: "/root",
  basePath: "/root",
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