const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  
  images: {
    remotePatterns: [{ protocol: 'http', hostname: 'localhost' }],
    formats: ['image/avif', 'image/webp'],
  },
  
  assetPrefix: '',
  
  turbopack: {},
  
  typescript: {
    ignoreBuildErrors: true,
  },

  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      'recharts',
      'date-fns',
    ],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  output: 'standalone',
};

export default nextConfig;
