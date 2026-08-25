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
    unoptimized: true,
  },
  experimental: {
    viewTransition: true,
    optimizePackageImports: [
      '@chakra-ui/react',
      'lucide-react',
      'framer-motion',
      'next-themes',
      'zod',
    ],
  },
};

export default bundleAnalyzer(nextConfig);
