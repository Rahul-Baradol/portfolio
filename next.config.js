/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    EMAILDETAILS_URI: process.env.EMAILDETAILS_URI 
  },
  headers: [
    { key: "Access-Control-Allow-Origin", value: "*" }, 
    { key: "Access-Control-Allow-Methods", value: "GET,POST" },
    { key: "Access-Control-Allow-Headers", value: "Content-Type" },
  ]
}

module.exports = nextConfig