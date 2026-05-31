import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ["mdx", "ts", "tsx"],
  experimental: {
    mdxRs: true,
  },
};

export default nextConfig;
