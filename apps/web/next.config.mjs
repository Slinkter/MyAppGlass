import withBundleAnalyzer from '@next/bundle-analyzer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Outputs a Single-Page Application (SPA).
  images: {
    loader: 'custom',
    loaderFile: './src/shared/utils/imageLoader.ts',
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [480, 960, 1600],
    imageSizes: [48, 96, 260, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/v0/b/gya-app-4c8a9.firebasestorage.app/o/**',
      },
    ],
  },
  transpilePackages: ['@gya/shared'],
  experimental: {
    optimizePackageImports: [
      '@chakra-ui/react',
      'lucide-react',
      'next-themes',
      'zod',
    ],
  },
};

export default bundleAnalyzer(nextConfig);
