/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  distDir: 'dist',

  env: {
    ENV: process.env.ENV ?? 'development',
    FLAGS: process.env.FLAGS ?? 'none',
  },
}
