const fs = require('fs')
const { join } = require('path')

const colors = fs
  .readFileSync(join(__dirname, '../src/theme/schemas/theme.light.ts'))
  .toString()
  .replace('export const theme =', '(() => { return ')

console.info(colors)

const x = () => {
  // eslint-disable-next-line
  const x = eval(colors + ' })')()

  const y = Object.keys(x.colors)
  let str = ''
  for (const color of y) {
    str += `"$${color}" ` + '|'
  }

  str = str + ' "inherit"'

  fs.writeFileSync(
    join(__dirname, '../src/theme/colorType.ts'),
    `export type Color = ${str}`
  )
}

x()
