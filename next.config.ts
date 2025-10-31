import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://d2azcwy0ak76i3.cloudfront.net/**')],
  },
};

export default nextConfig;
