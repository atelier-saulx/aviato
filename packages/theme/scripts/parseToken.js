/* eslint-disable no-console */
import ora from 'ora'
import chalk from 'chalk'
import { readFile } from 'fs/promises'

import StyleDictionary from 'style-dictionary'
const baseConfig = JSON.parse(
  await readFile(new URL('./config.json', import.meta.url))
)

const spinner = ora('Parsing Theme').start()

const green = chalk.bold.green
const log = (message) => console.log(green(message))

StyleDictionary.registerTransform({
  name: 'size/px',
  type: 'value',
  matcher: (token) => {
    return token.unit === 'pixel' && token.value !== 0
  },
  transformer: (token) => {
    return `${token.value}px`
  },
})

StyleDictionary.registerTransform({
  name: 'size/percent',
  type: 'value',
  matcher: (token) => {
    return token.unit === 'percent' && token.value !== 0
  },
  transformer: (token) => {
    return `${token.value}%`
  },
})

const StyleDictionaryExtended = StyleDictionary.extend(baseConfig)

StyleDictionaryExtended.buildAllPlatforms()

spinner.stop()

log('Done parsing')

process.exit()
