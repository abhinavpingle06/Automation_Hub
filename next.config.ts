import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol:"https" ,
        hostname: "ceblog.s3.amazonaws.com"
      },
      {
        protocol:"https",
        hostname:"wujexhgtyamblhjxkdgt.supabase.co"
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", 
      }
    ],
  },
};

export default nextConfig;
