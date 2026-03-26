import type { NextConfig } from 'next';
import type { Configuration } from 'webpack';

const imageRemotePatterns: NonNullable<NextConfig['images']> extends { remotePatterns?: infer P }
  ? P
  : never = [
  {
    protocol: 'https',
    hostname: 'sprint-be-project.s3.ap-northeast-2.amazonaws.com',
    pathname: '/**',
  },
];

try {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';
  const u = new URL(apiBase);
  imageRemotePatterns.push({
    protocol: u.protocol.replace(':', '') as 'http' | 'https',
    hostname: u.hostname,
    ...(u.port ? { port: u.port } : {}),
    pathname: '/uploads/**',
  });
} catch {
  imageRemotePatterns.push({
    protocol: 'http',
    hostname: 'localhost',
    port: '3000',
    pathname: '/uploads/**',
  });
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: imageRemotePatterns,
  },
  webpack(config: Configuration) {
    config.module?.rules?.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
