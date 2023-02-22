/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["raw.githubusercontent.com", "githubusercontent.com", "upload.wikimedia.org"]
  },
  reactStrictMode: true,
}

module.exports = nextConfig
