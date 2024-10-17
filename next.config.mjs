/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { protocol: "https", port: "", hostname: "ipfs.io" },
      { protocol: "https", port: "", hostname: "giveth.mypinata.cloud" },
      {
        protocol: "https",
        hostname: "gateway.pinata.cloud",
        pathname: '/ipfs/**',
      },
    ],
  },
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

export default nextConfig;
