import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  devIndicators: false,
  ...(process.env.BUILD_STANDALONE === "true" && { output: "standalone" }),
};

export default nextConfig;
