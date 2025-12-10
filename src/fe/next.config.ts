
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: "/domain-builder",
  basePath: "/domain-builder",
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