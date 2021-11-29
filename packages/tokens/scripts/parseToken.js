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

  logInfo('\n Done parsing')

  logSuccess('\n Success! \n')

  process.exit()
}

function IsJsonString(string) {
  try {
    JSON.parse(string)
  } catch (error) {
    return false
  }

  return true
}

async function parseTokens() {
  const inputDir = path.join('./src', 'json')

  if (!fs.existsSync(inputDir)) {
    await fs.mkdir(inputDir, { recursive: true })
  }

  const jsonsInDir = fs
    .readdirSync(inputDir)
    .filter((fileName) => path.extname(fileName) === '.json')

  const mappedJsons = jsonsInDir
    .map((fileName) => {
      const fileData = fs.readFileSync(path.join(inputDir, fileName))
      const stringData = fileData.toString()

      const isValidJSON = IsJsonString(stringData)
      if (!isValidJSON) {
        logWarning('Malformed data')
        return [fileName, undefined]
      }

      const parsedJSON = JSON.parse(stringData)
      const parsedObject = formatJSON(parsedJSON)
      return [fileName, parsedObject]
    })
    .filter(([, data]) => data !== undefined)
    .filter(([fileName]) => {
      return true
      return fileName.includes('dark')
    })

  if (mappedJsons.length === 0) {
    return logWarning('\n\n Warning: No JSON to read.')
  }

  const outputDir = path.join('./src', 'theme')

  if (!fs.existsSync(outputDir)) {
    await fs.mkdir(outputDir, { recursive: true })
  }

  console.log('')

  const writeFilesPromises = []

  mappedJsons.forEach((jsonTuple) => {
    writeFilesPromises.push(writeTypescriptFiles({ outputDir, jsonTuple }))
  })

  await Promise.all(writeFilesPromises)
}

function getPropertyRecursive({ object, property, parent = {} }) {
  var values = {}

  _.each(object, (value, key) => {
    if (_.isObject(value)) {
      values[key] = getPropertyRecursive({
        object: value,
        property,
        parent: value,
      })
    } else if (key === 'type') {
    }

    if (value === 'color') {
      values = parent.value
    }
  })

  return values
}

function flattenObject(object) {
  var toReturn = {}

  for (var index in object) {
    if (!object.hasOwnProperty(index)) continue

    if (typeof object[index] == 'object' && object[index] !== null) {
      var flatObject = flattenObject(object[index])
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue

        toReturn[index + '.' + x] = flatObject[x]
      }
    } else {
      toReturn[index] = object[index]
    }
  }

  return toReturn
}

function lookupVariablesAndReplace(object) {
  return object
}

function formatJSON(object) {
  const getColors = getPropertyRecursive({
    object,
    type: 'color',
  })

  const flatColors = flattenObject(getColors)
  const parsedColors = lookupVariablesAndReplace(flatColors)

  return {
    colors: parsedColors,
  }
}

async function writeTypescriptFiles({ outputDir, jsonTuple }) {
  const [fileName, parsedObject] = jsonTuple

  const trimmedFileName = fileName.replace('.json', '')
  const outputJSON = JSON.stringify(parsedObject, null, 2)
  const outputFilename = `${trimmedFileName}.ts`
  const outputFullPath = path.join(outputDir, outputFilename)

  logProgress('\n Parsing: ' + fileName)

  const typescriptTemplate = `export const theme = ${outputJSON}`.trim()

  const outputContent = typescriptTemplate

  return fs.writeFile(outputFullPath, outputContent)
}

/***
 * Execute script.
 **/
;(async () => {
  start()
})()
