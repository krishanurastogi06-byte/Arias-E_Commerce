/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: 'images.unsplash.com',
      // },
      // {
      //   protocol: "https",
      //   hostname: "plus.unsplash.com"
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'upload.wikimedia.org',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'img.freepik.com',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'assets2.andaazfashion.com',
      // },
      {
        protocol: 'https',
        hostname: '**', // This allows all HTTPS websites
      },
    ],
  },
  allowedDevOrigins: ['192.168.1.32'],
};

export default nextConfig;
