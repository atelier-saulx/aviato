/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  distDir: 'dist',

  env: {
    PASSWORD_PROTECT: process.env.ENVIRONMENT !== 'development',
    FLAGS: process.env.FLAGS ?? 'none',
  },
}
