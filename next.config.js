/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    ignoreDuringBuilds: true
  },
  env: {
    SITE_NAME: process.env.SITE_NAME
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000', // Puerto de Bagisto
        pathname: '/**' // Permite todas las rutas
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1', // También permitir si usas localhost
        port: '8000',
        pathname: '/**'
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/password',
        destination: '/',
        permanent: true
      }
    ];
  }
};
