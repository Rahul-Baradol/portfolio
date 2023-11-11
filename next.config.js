/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    EMAILDETAILS_URI: process.env.EMAILDETAILS_URI 
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://rahulbaradol.in/api/:path*',
      },
    ]
  },
}

module.exports = nextConfig