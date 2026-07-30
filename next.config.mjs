import withBundleAnalyzer from '@next/bundle-analyzer';

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
};

export default bundleAnalyzer(nextConfig);
