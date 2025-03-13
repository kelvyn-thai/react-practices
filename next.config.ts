import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
    deviceSizes: [320, 414, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  eslint: {
    dirs: ["src"],
  },
};

export default nextConfig;
