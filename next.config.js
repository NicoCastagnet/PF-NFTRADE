/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'loremflickr.com',
      'tdhdjernzsaepxgzandc.supabase.co',
      'media.licdn.com',
    ],
  },
}

module.exports = nextConfig
