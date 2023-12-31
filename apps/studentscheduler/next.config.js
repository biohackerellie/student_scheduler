/** @type {import('next').NextConfig} */

const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  experimental: {
    optimizePackageImports: ['@nextui-org'],
  },

  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

module.exports = nextConfig;
