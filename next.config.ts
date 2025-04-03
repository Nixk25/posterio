import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "94mbh9ctcd.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
