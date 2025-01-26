/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true, // Ignores ESLint errors during production builds
  },
};

module.exports = nextConfig;
