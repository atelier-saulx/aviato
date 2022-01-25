/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  distDir: 'dist',

  env: {
    ENV: process.env.ENVIRONMENT ?? 'development',
    FLAGS: process.env.FLAGS ?? 'none',
  },
}
