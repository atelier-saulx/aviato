import { exec } from 'promisify-child-process'
import { logInfo, logError } from './utils.mjs'
import { startIconFormatting } from './formatSVG.mjs'
import fs from 'fs-extra'
import path from 'path'

function checkForSVGs() {
  const inputDir = path.join('./src', 'icons', 'svg')

  const vectorFilesInDir = fs
    .readdirSync(inputDir)
    .filter((fileName) => path.extname(fileName) === '.svg')

  if (vectorFilesInDir.length === 0) {
    throw new Error('Vector files missing')
  }
}

async function generateReactFromSVG() {
  try {
    checkForSVGs()
  } catch (error) {
    return logInfo('Note: SVG folder is empty.')
  }

  const outputDir = path.join('./src', 'icons', 'parsed')

  await fs.emptyDir(outputDir)
  await fs.writeFile(path.join(outputDir, '.gitkeep'), '')

  await startIconFormatting()

  const parseCommand = [
    'svgr',
    '--typescript',
    '--no-svgo',
    // `--replace-attr-values '#0F1013={props.fill}'`,
    '--template ./scripts/svgrTemplate.js',
    '--out-dir ./src/icons/parsed',
    './src/icons/parsed/svg',
  ]

  const parseIconsCommand = parseCommand.join(' ')

  await exec(parseIconsCommand)

  const deleteVectorFolder = true
  if (deleteVectorFolder) {
    const vectorDir = path.join(outputDir, 'svg')

    await fs.emptyDir(vectorDir)
    await fs.rmdir(vectorDir)
  }

  const overrideComponents = true
  if (overrideComponents) {
    const reactDir = path.join('./src', 'icons', 'parsed')
    const componentDir = path.join('./src', 'icons', 'components')

    await fs.emptyDir(componentDir)
    await fs.copy(reactDir, componentDir)
    await fs.rm(path.join(componentDir, '.gitkeep'))
  }

  logInfo('Done converting SVGs to React Components.')
}

async function start() {
  try {
    await generateReactFromSVG()
  } catch (error) {
    logError('parseIcons error: ', error)
    throw new Error(error)
  }
}

/***
 * Execute script.
 **/
;(async () => {
  start()
})()

/*

Usage: svgr [options] <file|directory>

Options:
  -V, --version                    output the version number
  --config-file <file>             specify the path of the svgr config
  --no-runtime-config              disable runtime config (".svgrrc", ".svgo.yml", ".prettierrc")
  -d, --out-dir <dirname>          output files into a directory
  --ignore-existing                ignore existing files when used with --out-dir
  --ext <ext>                      specify a custom file extension (default: "js")
  --filename-case <case>           specify filename case ("pascal", "kebab", "camel") (default: "pascal")
  --icon [size]                    specify width and height (default to "1em" or 24dp (native))
  --jsx-runtime <runtime>          specify JSX runtime ("automatic", "classic", "classic-preact") (default: "classic")
  --typescript                     transform svg into typescript
  --native                         add react-native support with react-native-svg
  --memo                           add React.memo into the result component
  --ref                            forward ref to SVG root element
  --no-dimensions                  remove width and height from root SVG tag
  --expand-props [position]        disable props expanding ("start", "end", "none") (default: "end")
  --svg-props <property=value>     add props to the svg element
  --replace-attr-values <old=new>  replace an attribute value
  --template <file>                specify a custom template to use
  --index-template <file>          specify a custom index.js template to use
  --no-index                       disable index file generation
  --title-prop                     create a title element linked with props
  --prettier-config <fileOrJson>   Prettier config
  --no-prettier                    disable Prettier
  --svgo-config <fileOrJson>       SVGO config
  --no-svgo                        disable SVGO
  --silent                         suppress output
  --stdin                          force reading input from stdin
  --stdin-filepath                 path to the file to pretend that stdin comes from
  -h, --help                       display help for command

 */
