/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  webpack: (config) => {
    // ignore formidable warnings
    config.ignoreWarnings = [
      { module: /node_modules\/formidable\/src\/Formidable\.js/ },
      { file: /node_modules\/formidable\/src\/index\.js/ },
    ];

    return config;
  },
  async redirects() {
    return [
      // {
      //   source: '/about-us',
      //   destination: 'https://support.aethenos.com/about-us/',
      //   permanent: true,
      // },
      // {
      //   source: '/contact-us',
      //   destination: 'https://support.aethenos.com/contact_us/',
      //   permanent: true,
      // },
      // {
      //   source: '/support',
      //   destination: 'https://support.aethenos.com/',
      //   permanent: true,
      // },
    ];
  },
}

module.exports = nextConfig
