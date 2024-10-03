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
      {
        source: '/terms',
        destination: 'https://terms.aethenos.com/terms/',
        permanent: true,
      },
      {
        source: '/privacy-policy',
        destination: 'https://terms.aethenos.com/privacy-policy/',
        permanent: true,
      },
      {
        source: '/support',
        destination: 'https://support.aethenos.com/',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
