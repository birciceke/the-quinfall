import type { NextConfig } from "next";

const BACKEND_URL = process.env.BACKEND_URL || "https://the-quinfall-server.onrender.com";

const nextConfig: NextConfig = {
  devIndicators: false,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${BACKEND_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
