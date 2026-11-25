import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every route is static; no server runtime features are used.
  poweredByHeader: false,
  // Pin the project root (avoids picking up a lockfile from a parent folder).
  turbopack: { root: path.resolve(".") },
};

export default nextConfig;
