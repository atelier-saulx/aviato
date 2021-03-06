import { logInfo, logError } from './utils'
import { exec } from 'promisify-child-process'
import fs from 'fs-extra'
import path from 'path'

function checkForSVGs() {
  const inputDir = path.join('./dependencies', 'icons', 'svg')

  const vectorFilesInDir = fs
    .readdirSync(inputDir)
    .filter((fileName) => path.extname(fileName) === '.svg')

  if (vectorFilesInDir.length === 0) {
    throw new Error('Vector files missing')
  }
}

async function formatIcons() {
  try {
    checkForSVGs()
  } catch (error) {
    return logInfo('Note: SVG folder is empty.')
  }

  const parseCommand = [
    'svgo',
    '--config ./scripts/svgoConfig.js',
    '--output ./dependencies/icons/parsed/svg',
    '-f',
    './dependencies/icons/svg',
  ]

  const formatIconsCommand = parseCommand.join(' ')

  try {
    await exec(formatIconsCommand)
  } catch (error) {
    const message = (error && error.message) || ''
    const noSVGMessage = 'No SVG files have been found'

    const hasEmptyVectorFolder = message.includes(noSVGMessage)
    if (hasEmptyVectorFolder) {
      logInfo('Note: SVG folder is empty.')
    } else {
      logError('formatIcons error: ', error)
    }
  }

  logInfo('Done formatting SVGs.')
}

export async function startIconFormatting() {
  try {
    await formatIcons()
  } catch (error) {
    throw new Error(error)
  }
}

/*

Usage: svgo [options] [INPUT...]

Nodejs-based tool for optimizing SVG vector graphics files

Arguments:
  INPUT                      Alias to --input

Options:
  -v, --version              output the version number
  -i, --input <INPUT...>     Input files, "-" for STDIN
  -s, --string <STRING>      Input SVG data string
  -f, --folder <FOLDER>      Input folder, optimize and rewrite all *.svg files
  -o, --output <OUTPUT...>   Output file or folder (by default the same as the input), "-" for STDOUT
  -p, --precision <INTEGER>  Set number of digits in the fractional part, overrides plugins params
  --config <CONFIG>          Custom config file, only .js is supported
  --datauri <FORMAT>         Output as Data URI string (base64), URI encoded (enc) or unencoded (unenc)
  --multipass                Pass over SVGs multiple times to ensure all optimizations are applied
  --pretty                   Make SVG pretty printed
  --indent <INTEGER>         Indent number when pretty printing SVGs
  --eol <EOL>                Line break to use when outputting SVG: lf, crlf. If unspecified, uses platform default.
  --final-newline            Ensure SVG ends with a line break
  -r, --recursive            Use with '--folder'. Optimizes *.svg files in folders recursively.
  --exclude <PATTERN...>     Use with '--folder'. Exclude files matching regular expression pattern.
  -q, --quiet                Only output error messages, not regular status messages
  --show-plugins             Show available plugins and exit
  --no-color                 Output plain text without color
  -h, --help                 display help for command

*/
