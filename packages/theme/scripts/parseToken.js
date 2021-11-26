/* eslint-disable no-console */
import ora from 'ora'
import chalk from 'chalk'

const spinner = ora('Loading unicorns').start()

const green = chalk.bold.green
const log = (message) => console.log(green(message))

log('Parsing')

// https://github.com/rihardsgravis/figma-parser

log('Done parsing')

setTimeout(() => {
  spinner.stop()
}, 500)
