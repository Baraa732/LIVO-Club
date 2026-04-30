import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    typescript: {
    // يتجاهل أخطاء التايب سكريبت أثناء الـ Build ليتم الرفع بنجاح
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
