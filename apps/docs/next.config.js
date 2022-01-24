const currentGitBranchName = require('current-git-branch')

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  distDir: 'dist',

  env: {
    ENVIRONMENT: process.env.ENVIRONMENT,
    FLAGS: process.env.FLAGS ?? 'none',
    GIT_BRANCH: currentGitBranchName(),
  },
}
