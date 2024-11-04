/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "http://localhost:3000/authentication/login", // Replace with the path to your new default page
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
