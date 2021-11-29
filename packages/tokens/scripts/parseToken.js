/* eslint-disable no-console */
import ora from 'ora'
import chalk from 'chalk'
import _ from 'lodash'
import fs from 'fs-extra'
import path from 'path'

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const green = chalk.green
const blue = chalk.blue
const yellow = chalk.yellow
const white = chalk.white
const red = chalk.red

const logInfo = (message) => console.log(white(message))
const logSuccess = (message) => console.log(green(message))
const logProgress = (message) => console.log(blue(message))
const logWarning = (message) => console.log(yellow(message))
const logError = (message) => console.log(red(message))

/***
 * Setup spinner
 **/
const spinner = ora('Parsing Theme').start()

async function start() {
  try {
    await parseTokens()
  } catch (error) {
    return logError(`Error parsing tokens. ${error}`)
  }

  spinner.stop()

  logInfo('\n Done parsing \n')

  process.exit()
}

async function parseTokens() {
  const inputDir = path.join('./json')

  if (!fs.existsSync(inputDir)) {
    fs.mkdirSync(inputDir, { recursive: true })
  }

  const jsonsInDir = fs
    .readdirSync(inputDir)
    .filter((fileName) => path.extname(fileName) === '.json')

  const mappedJsons = jsonsInDir.map((fileName) => {
    const fileData = fs.readFileSync(path.join(inputDir, fileName))
    const json = JSON.parse(fileData.toString())
    const parsedObject = formatJSON(json)

    return [fileName, parsedObject]
  })

  if (mappedJsons.length === 0) {
    return logWarning('\n\n Warning: No JSON to read.')
  }

  const outputDir = path.join('./src', 'theme')

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  console.log('')

  const promises = []

  mappedJsons.forEach((jsonTuple) => {
    promises.push(writeTypescriptFiles({ outputDir, jsonTuple }))
  })

  await Promise.all(promises)
}

function recursiveFind(input, output) {
  return output
}

function formatJSON(input) {
  const parseColors = recursiveFind(input, {})

  return {
    colors: parseColors,
  }
}

async function writeTypescriptFiles({ outputDir, jsonTuple }) {
  fs.emptyDirSync(outputDir)

  const [fileName, parsedObject] = jsonTuple
  const trimmedFileName = fileName.replace('.json', '')
  const outputJSON = JSON.stringify(parsedObject, null, 2)

  logProgress('\n Parsing: ' + fileName)

  const typescriptTemplate = `export const theme = ${outputJSON}`.trim()

  const outputContent = typescriptTemplate
  const outputFilename = path.join(outputDir, `${trimmedFileName}.ts`)

  return fs.writeFile(outputFilename, outputContent)
}

/***
 * Execute script.
 **/
;(async () => {
  start()
})()
