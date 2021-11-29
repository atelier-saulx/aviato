/* eslint-disable no-console */
import ora from 'ora'
import chalk from 'chalk'
import _ from 'lodash'
import fs from 'fs'
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
    .filter((file) => path.extname(file) === '.json')

  jsonsInDir.map((file) => {
    const fileData = fs.readFileSync(path.join('./tokens', file))
    const json = JSON.parse(fileData.toString())
    const parsedJson = formatJSON(json)
    return parsedJson
  })

  return writeTypescriptFile({})
}

function formatJSON(input) {
  return {}
}

function writeTypescriptFile(input) {
  const targetDir = path.join('./test', 'typescript')

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true })
  }

  const typescriptTemplate = `
export const theme = {
  colors: {
    primary: 'rgb(98, 0, 238)',
    secondary: 'rgb(217, 19, 174)',
    background: 'rgb(247, 247, 248)',
    hover: 'rgb(56,76,213)',
    hoverAlt: 'rgba(61, 83, 231, 0.12)',
    active: 'rgba(98, 0, 238, 0.8)',
  },
}
  `.trim()

  const outputContent = typescriptTemplate
  const filePath = path.join(targetDir, 'theme.ts')

  fs.writeFileSync(filePath, outputContent)
}

/***
 * Execute script.
 **/
;(async () => {
  start()
})()
