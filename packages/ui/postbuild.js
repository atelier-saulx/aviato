/* eslint-disable no-console */
const fs = require('fs')

try {
  fs.rmdirSync('./temp', { recursive: true })
} catch (error) {
  console.error('failed removing temp files.')
}

console.log('Build succeeded!')
