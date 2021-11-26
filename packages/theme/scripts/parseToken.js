/* eslint-disable no-console */
import ora from 'ora'
import chalk from 'chalk'

const spinner = ora('Parsing Theme').start()

const green = chalk.bold.green
const log = (message) => console.log(green(message))

// Ask Maarten:
// Why not this?
// https://www.figma.com/community/plugin/888356646278934516/Design-Tokens
// https://github.com/lukasoppermann/design-token-transformer

// For now...
// https://www.npmjs.com/package/token-transformer

setTimeout(() => {
  spinner.stop()

  log('Done parsing')

  process.exit()
}, 1500)
