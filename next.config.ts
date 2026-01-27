// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // images: {
  //   domains: ["images.unsplash.com", "i.pravatar.cc"],
  //   remotePatterns: [
  //     new URL(
  //       "https://asset.cloudinary.com/dtxai4k4r/ad400dc74803bc978ac2dda2ffc7a8b9/**",
  //     ),
  //   ],
  // },

  images: {
    domains: ["images.unsplash.com", "i.pravatar.cc", "asset.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "asset.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
