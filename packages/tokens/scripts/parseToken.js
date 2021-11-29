/* eslint-disable no-console */
import ora from 'ora'
import chalk from 'chalk'
import _ from 'lodash'

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
  await sleep(5000)

  spinner.stop()

  logSuccess('\nDone parsing.')

  process.exit()
}

function parseTokens() {
  // logProgress('\n\nExecuting Token parsing code... \n')
  // Code goes here...
}

/***
 * Execute script.
 **/
;(async () => {
  start()
})()
