/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  distDir: '../public',
  env: {
    name: 'Alove4Tech\'s Kasm',
    description: 'ARM-first Kasm workspace registry from Alove4Tech for Oracle Ampere and other ARM64 deployments.',
    icon: 'https://alove4tech.github.io/kasm-registry/1.1/favicon.ico',
    listUrl: 'https://alove4tech.github.io/kasm-registry/',
    contactUrl: 'https://github.com/alove4tech/kasm-registry/issues',
  },
  reactStrictMode: true,
  basePath: '/kasm-registry/1.1',
  trailingSlash: true,
  images: {
    unoptimized: true,
  }
}

module.exports = nextConfig
