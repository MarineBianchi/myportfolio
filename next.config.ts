import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hostinger's shared hosting only serves static files (no Node.js
  // process) - this makes `next build` emit a plain `out/` directory of
  // HTML/CSS/JS instead of requiring a running Next.js server.
  output: "export",
  // Without this, a route like /projets/domoun exports as domoun.html,
  // which a plain Apache/LiteSpeed static host won't serve for a request
  // to /projets/domoun (no extension) without extra server config. With
  // it, it exports as projets/domoun/index.html instead - any static host
  // serves that for the extension-less URL with zero configuration.
  trailingSlash: true,
  images: {
    // The built-in Image Optimization API needs a server to resize images
    // on request, which a static export doesn't have.
    unoptimized: true,
    domains: [],
  },
};

export default nextConfig;
