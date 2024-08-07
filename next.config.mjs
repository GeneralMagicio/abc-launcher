/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", port: "", hostname: "ipfs.io" },
      { protocol: "https", port: "", hostname: "giveth.mypinata.cloud" },
      {
        protocol: "https",
        hostname: "giveth.mypinata.cloud",
      },
    ],
  },
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

export default nextConfig;
