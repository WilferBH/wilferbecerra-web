import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exportación estática: Cloudflare Pages sirve los archivos de `out/`.
  output: "export",
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
