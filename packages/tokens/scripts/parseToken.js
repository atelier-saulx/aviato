/* eslint-disable no-console */
import ora from 'ora'
import chalk from 'chalk'
import _ from 'lodash'
import fs from 'fs-extra'
import rimraf from 'rimraf'
import path from 'path'

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const green = chalk.bold.green
const yellow = chalk.bold.yellow

const logSuccess = (message) => console.log(green(message))
const logProgress = (message) => console.log(yellow(message))

/***
 * Setup spinner
 **/
const spinner = ora('Parsing Theme').start()

async function start() {
  parseTokens()

  // Simulate progress
  await sleep(250)

  spinner.stop()

  logSuccess('\nDone parsing.')

  process.exit()
}

function parseTokens() {
  const jsonsInDir = fs
    .readdirSync('./tokens')
    .filter((fileName) => path.extname(fileName) === '.json')

  const mappedJsons = jsonsInDir.map((fileName) => {
    const fileData = fs.readFileSync(path.join('./tokens', fileName))
    const json = JSON.parse(fileData.toString())
    const parsedObject = formatJSON(json)
    return [fileName, parsedObject]
  })

  mappedJsons.forEach((jsonTuple) => {
    return writeTypescriptFiles(jsonTuple)
  })
}

function formatJSON(input) {
  return {
    colors: {
      $primary: 'rgb(0,0,0)',
    },
  }
}

function writeTypescriptFiles(jsonTuple) {
  const targetDir = path.join('./test', 'typescript')

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true })
  }

  fs.emptyDirSync(targetDir)

  const [fileName, parsedObject] = jsonTuple
  const trimmedFileName = fileName.replace('.json', '')
  const outputJSON = JSON.stringify(parsedObject, null, 2)

  const typescriptTemplate = `export const theme = ${outputJSON}`.trim()

  const outputContent = typescriptTemplate
  const outputFilename = path.join(targetDir, `${trimmedFileName}.ts`)

  fs.writeFileSync(outputFilename, outputContent)
}

/***
 * Execute script.
 **/
;(async () => {
  start()
})()
