
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: `${process.env.NEXT_PUBLIC_CONTEXT_ROOT}`,
  basePath: `${process.env.NEXT_PUBLIC_CONTEXT_ROOT}`,
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