/** @type {import('next').NextConfig} */

module.exports = {
  eslint: {
    // Disabling on production builds because we're running checks on PRs via GitHub Actions.
    ignoreDuringBuilds: true
  },
  env: {
    SITE_NAME: process.env.SITE_NAME
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'http', // Cambié https por http
        hostname: '127.0.0.1',
        pathname: '/s/files/**'
      },
      {
        protocol: 'http', // Cambié https por http
        hostname: '127.0.0.1',
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
