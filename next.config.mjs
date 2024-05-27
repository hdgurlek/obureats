/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tb-static.uber.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
