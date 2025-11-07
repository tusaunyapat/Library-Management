/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["img.freepik.com", "i.etsystatic.com"], // allow this hostname
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

module.exports = nextConfig;
