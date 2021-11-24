const { readdir, copyFile } = require('fs').promises
const { join, dirname } = require('path')
const cwd = process.cwd()
const { ensureDir, copy } = require('fs-extra')
// fs-extra

const copyCssToDist = async (
  srcPath = join(cwd, 'src'),
  destPath = join(cwd, 'dist')
) => {
  const files = await readdir(srcPath)
  // make dir
  return Promise.all(
    files.map((file) => {
      if (!/\./.test(file)) {
        return copyCssToDist(join(srcPath, file), join(destPath, file))
      }
      if (/\.css$/.test(file) || /\.woff2?$/.test(file)) {
        ensureDir(dirname(join(destPath, file))).then((v) => {
          return copyFile(join(srcPath, file), join(destPath, file))
        })
      }
      return null
    })
  )
}

copyCssToDist().then(() => {
  // copy(join(__dirname, '/dist/icons'), join(__dirname, '/icons'))
})
