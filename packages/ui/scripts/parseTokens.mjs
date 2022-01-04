/* eslint-disable no-prototype-builtins */

import {
  logInfo,
  logSuccess,
  logProgress,
  logWarning as utilsLogWarning,
  logError,
} from './utils.mjs'

import ora from 'ora'
import _ from 'lodash'
import fs from 'fs-extra'
import path from 'path'
import { exec } from 'promisify-child-process'

let warningCount = 0

const logWarning = (message) => {
  warningCount++
  utilsLogWarning(message)
}

/***
 * Setup spinner
 **/
const spinner = ora('📡 Parsing Theme').start()

logInfo('')

async function start() {
  try {
    await parseTokens()
    await exec('yarn lint')
  } catch (error) {
    logError(`\nError parsing tokens. ${error}\n`)
    throw new Error(error)
  } finally {
    spinner.stop()
    logInfo('\n Done parsing Figma tokens.')

    if (warningCount === 0) {
      logSuccess('\n ⚡️ Parsing finished without warnings. ⚡️')
    } else {
      logWarning(`\n 🚨 Parsing ended with ${warningCount} warnings! 🚨`)
    }
  }

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
  const inputDir = path.join('./json', 'tokens')

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

      logProgress('\n Parsing: ' + fileName)

      const isValidJSON = IsJsonString(stringData)
      if (!isValidJSON) {
        logWarning('\n Malformed data')
        return [fileName, undefined]
      }

      const parsedJSON = JSON.parse(stringData)
      const parsedObject = formatJSON(parsedJSON)

      const validThemeNames = ['light', 'dark']

      const themeName = validThemeNames
        .map((themeName) => {
          if (fileName.toLowerCase().includes(themeName)) {
            return `theme.${themeName}`
          } else {
            return undefined
          }
        })
        .filter((themeName) => themeName !== undefined)[0]

      if (!themeName) {
        logWarning('\n Malformed theme name')
        return [fileName, undefined]
      }

      return [themeName, parsedObject]
    })
    .filter(([, data]) => data !== undefined)

  if (mappedJsons.length === 0) {
    return logWarning('\n\n Warning: No JSON to read.')
  }

  const outputDir = path.join('./src', 'theme')

  if (!fs.existsSync(outputDir)) {
    await fs.mkdir(outputDir, { recursive: true })
  }

  const writeFilesPromises = []

  mappedJsons.forEach((jsonOutput) => {
    writeFilesPromises.push(writeTypescriptFiles({ outputDir, jsonOutput }))
  })

  await Promise.all(writeFilesPromises)
}

function getPropertyRecursive({ object, property, parent = {} }) {
  let values = {}

  _.each(object, (value, key) => {
    if (_.isObject(value)) {
      values[key] = getPropertyRecursive({
        object: value,
        property,
        parent: value,
      })
    } else if (value === 'color') {
      values = parent.value
    }
  })

  return values
}

function flattenObject(object) {
  const toReturn = {}

  for (const index in object) {
    if (!object.hasOwnProperty(index)) continue

    if (typeof object[index] === 'object' && object[index] !== null) {
      const flatObject = flattenObject(object[index])
      for (const x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue

        toReturn[index + '.' + x] = flatObject[x]
      }
    } else {
      toReturn[index] = object[index]
    }
  }

  return toReturn
}

function convertHexToRGBA(input) {
  const colorHex = input.replace('#', '')

  const r = parseInt(colorHex.slice(0, 2), 16)
  const g = parseInt(colorHex.slice(2, 4), 16)
  const b = parseInt(colorHex.slice(4, 6), 16)

  return `rgb(${r},${g},${b})`
}

function stripRGB(input) {
  return input.replace('rgb(', '').replace(')', '')
}

function lookupVariablesAndReplace(object) {
  const braceRegex = /\[[^\]]+\]|\{[^}]+\}|<[^>]+>/

  const isDollarToken = (input) => input.includes('$')
  const isTemplateToken = (input) => braceRegex.test(input)

  const findToken = (token, object) => {
    try {
      const tokenTuple = Object.entries(object).filter(([item]) => {
        return item === token
      })[0]

      return tokenTuple[1]
    } catch (error) {
      logWarning(`\n\nError: Could not find token: ${token}`)

      throw new Error(error)
    }
  }

  _.each(object, (value, key) => {
    if (isTemplateToken(value)) {
      let outputValue = ''

      const sanitisedToken = braceRegex
        .exec(value)[0]
        .replace('{', '')
        .replace('}', '')

      if (value.startsWith('rgba')) {
        const tokenPartial = braceRegex.exec(value)[0]
        const converted = findToken(sanitisedToken, object)
        const toRgba = convertHexToRGBA(converted)
        const strippedColor = stripRGB(toRgba)

        outputValue = value.replace(tokenPartial, strippedColor)
      } else {
        const matchingToken = findToken(sanitisedToken, object)

        outputValue = value.replace(braceRegex, matchingToken)
      }

      object[key] = outputValue
    } else if (isDollarToken(value)) {
      let mappedOutput = []

      const splitString = value.split('$')

      if (value.includes(',')) {
        mappedOutput = splitString.map((partial) => {
          if (partial.includes(',')) {
            const splitPartial = partial.split(',')
            const token = splitPartial[0]
            let matchingToken = findToken(token, object)
            if (matchingToken) {
              if (matchingToken.includes('#')) {
                matchingToken = convertHexToRGBA(matchingToken)
                matchingToken = stripRGB(matchingToken)
              }

              return [matchingToken, splitPartial[1]].join(',')
            }
          }

          return partial
        })
      } else {
        const matchingToken = findToken(splitString[1], object)
        if (matchingToken) {
          mappedOutput.push(matchingToken)
        }
      }

      if (mappedOutput.length > 0) {
        object[key] = mappedOutput.join('')
      }
    }
  })

  return object
}

const restrictedList = ['colors_']

// https://stitches.dev/docs/tokens#naming-convention
function sanitiseObject(object) {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => {
      let cleanedKey = key.toLowerCase().replace(/\./g, '_').replace(/-/g, '_')

      restrictedList.forEach((item) => {
        cleanedKey = cleanedKey.replace(item, '')
      })

      const uppercaseKeyEntries = cleanedKey
        .split('_')
        .map((partial) => {
          return partial[0].toUpperCase() + partial.slice(1)
        })
        .join('')

      return [uppercaseKeyEntries, value]
    })
  )
}

function parseObject({ object, type }) {
  const getProperties = getPropertyRecursive({ object, type })
  const flattenProperties = flattenObject(getProperties)
  const withoutVariables = lookupVariablesAndReplace(flattenProperties)
  const sanitiseProperties = sanitiseObject(withoutVariables)

  return sanitiseProperties
}

/**
 * Possible theming groups:
 * - colors: {},
 * - space: {},
 * - fontSizes: {},
 * - fonts: {},
 * - fontWeights: {},
 * - lineHeights: {},
 * - letterSpacings: {},
 * - sizes: {},
 * - borderWidths: {},
 * - borderStyles: {},
 * - radii: {},
 * - shadows: {},
 * - zIndices: {},
 * - transitions: {},
 */

function formatJSON(object) {
  const parsedColors = parseObject({
    object,
    type: 'color',
  })

  const parsedFontSizes = {
    xxxs: '11px',
    xxs: '11px',
    xs: '12px',
    sm: '13px',
    md: '14px',
    lg: '15px',
    xl: '18px',
    xxl: '24px',
    xxxl: '32px',
  }

  const parsedLineHeights = {
    xxxs: '16px',
    xxs: '16px',
    xs: '16px',
    sm: '16px',
    md: '16px',
    lg: '16px',
    xl: '16px',
    xxl: '24px',
    xxxl: '32px',
  }

  const parsedSpacings = {
    xxxs: '4px',
    xxs: '8px',
    xs: '12px',
    sm: '16px',
    md: '20px',
    lg: '24px',
    xl: '28px',
    xxl: '32px',
    xxxl: '36px',
  }

  return {
    colors: parsedColors,
    fontSizes: parsedFontSizes,
    lineHeights: parsedLineHeights,
    space: parsedSpacings,
  }
}

async function writeTypescriptFiles({ outputDir, jsonOutput }) {
  const [fileName, parsedObject] = jsonOutput

  const trimmedFileName = fileName.replace('.json', '')
  const outputJSON = JSON.stringify(parsedObject, null, 2)
  const outputFilename = `${trimmedFileName}.ts`
  const outputFullPath = path.join(outputDir, outputFilename)

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
