/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/authentication/login", 
        destination: "/authentication/login", // Replace with the path to your new default page
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
