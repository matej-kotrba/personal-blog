/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.graphassets.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
