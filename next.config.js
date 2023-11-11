/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    EMAILDETAILS_URI: process.env.EMAILDETAILS_URI 
  },
  async headers() {
    return [
      {
        source: '/api/:path*', // Use your API route pattern here
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // You can replace * with the specific origin you want to allow
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,POST,OPTIONS,PUT,DELETE',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Content-Type, Authorization',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig