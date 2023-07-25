/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
      {
        source: "/app",
        destination: "/_app",
      },
    ];
  },
    images: {
      domains: ['localhost','notes-be-brown.vercel.app'],
    },
  }
