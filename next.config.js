/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['images.unsplash.com', 'storage.googleapis.com'],
  },
}

module.exports = nextConfig