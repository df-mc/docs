const { createMDX } = require('fumadocs-mdx/next');

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['lucide-react', 'geist'],
  },
  images: {
    domains: ['github.com', 'discord.com', 'user-images.githubusercontent.com', 'discordapp.com', 'avatars.githubusercontent.com', 'go.dev'],
  },
};

module.exports = withMDX(nextConfig);