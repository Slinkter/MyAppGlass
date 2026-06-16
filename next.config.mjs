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
      'react-icons'
    ],
  },
}

export default nextConfig
