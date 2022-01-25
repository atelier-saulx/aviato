/* eslint-disable no-console */
import chalk from 'chalk'

const green = chalk.green
const blue = chalk.blue
const yellow = chalk.yellow
const white = chalk.white
const red = chalk.red

export const logInfo = (...data) => console.log(white(...data))
export const logSuccess = (...data) => console.log(green(...data))
export const logProgress = (...data) => console.log(blue(...data))
export const logWarning = (...data) => console.log(yellow(...data))
export const logError = (...data) => console.log(red(...data))
