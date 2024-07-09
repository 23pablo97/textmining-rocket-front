/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/users/images/**',
      },
      {
        protocol: 'http',
        hostname: 'rocket-api',
        port: '8000',
        pathname: '/users/images/**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_URL_API: process.env.NEXT_PUBLIC_URL_API || 'http://localhost:8000',
  },
};

export default nextConfig;
