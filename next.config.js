/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    EMAILDETAILS_URI: process.env.EMAILDETAILS_URI 
  }
}

module.exports = nextConfig
