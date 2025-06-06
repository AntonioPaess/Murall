/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.pexels.com",
      "images.unsplash.com",
      "ihlvptswdvtodpvbtfgg.supabase.co",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig