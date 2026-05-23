const { createMDX } = require('fumadocs-mdx/next');

const withMDX = createMDX();

const isGithubPages = process.env.GITHUB_PAGES === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(isGithubPages && {
    output: 'export',
    basePath: '/docs',
    trailingSlash: true,
  }),
  experimental: {
    optimizePackageImports: ['lucide-react', 'geist'],
  },
  images: {
    unoptimized: isGithubPages,
    remotePatterns: [
      { protocol: 'https', hostname: 'github.com' },
      { protocol: 'https', hostname: 'discord.com' },
      { protocol: 'https', hostname: 'user-images.githubusercontent.com' },
      { protocol: 'https', hostname: 'discordapp.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'go.dev' },
    ],
  },
};

module.exports = withMDX(nextConfig);
