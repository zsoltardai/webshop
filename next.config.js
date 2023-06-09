/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {domains: ['localhost', 'images.unsplash.com']},
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=30000, must-revalidate',
          }
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/login',
        destination: '/products',
        permanent: false,
        has: [
          {
            type: 'cookie',
            key: 'auth-token',
          },
        ],
      },
      {
        source: '/register',
        destination: '/products',
        permanent: false,
        has: [
          {
            type: 'cookie',
            key: 'auth-token',
          },
        ],
      },
      {
        source: '/profile',
        destination: '/products',
        permanent: false,
        missing: [
          {
            type: 'cookie',
            key: 'auth-token',
          },
        ],
      },
      {
        source: '/profile/edit',
        destination: '/products',
        permanent: false,
        missing: [
          {
            type: 'cookie',
            key: 'auth-token',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig
