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
  distDir: './dist', // Changes the build output directory to `./dist/`.
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: [
      '@chakra-ui/react',
      'lucide-react',
      'framer-motion',
      'next-themes',
      'zod',
    ],
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default bundleAnalyzer(nextConfig);
