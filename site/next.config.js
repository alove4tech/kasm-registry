/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  distDir: '../public',
  env: {
    name: 'Aaron\'s Kasm Registry',
    description: 'Custom ARM-first Kasm workspace registry for Oracle Ampere and other ARM64 Kasm deployments.',
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
