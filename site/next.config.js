/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  distDir: '../public',
  env: {
    name: 'Alove 4 Tech',
    description: 'Kasm workspace registry provided by Alove4Tech.',
    icon: '/img/logo.svg',
    listUrl: 'https://alove4tech.github.io/kasm-registry/',
    contactUrl: 'https://alove4tech.github.com/alove4tech/kasm-registry/issues',
  },
  reactStrictMode: true,
  basePath: '/kasm-registry/1.0',
  trailingSlash: true,
  images: {
    unoptimized: true,
  }
}

module.exports = nextConfig
