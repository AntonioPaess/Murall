import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'images.pexels.com',
      'images.unsplash.com',
      'ihlvptswdvtodpvbtfgg.supabase.co'
    ],
  },
  eslint: {
  ignoreDuringBuilds: true,
},
};

export default nextConfig;
