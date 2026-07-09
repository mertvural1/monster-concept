import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.monsternotebook.com.tr",
      },
    ],
  },
};

export default nextConfig;
