/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  distDir: 'dist',

  env: {
    ENVIRONMENT: process.env.ENVIRONMENT,
    FLAGS: process.env.FLAGS ?? 'none',
  },
}
