/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND: process.env.BACKEND,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
};

export default nextConfig;
