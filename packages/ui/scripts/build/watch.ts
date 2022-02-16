/* eslint-disable no-console */

import path from 'path'
import { execa } from 'execa'
import chalk from 'chalk'
import fs from 'fs-extra'
const chokidar = require('chokidar')

const packagePath = path.join(__dirname, '../../')
const packageJsonPath = path.join(packagePath, '/package.json')

const packageJson = fs.readJSONSync(packageJsonPath)
const packageName = packageJson.name

const logInfo = console.log.bind(console)
const logError = console.error.bind(console)

const triggerBuild = () => {
  execa('yarn', ['build', '--is-watching'], { stdio: 'inherit' }).catch(
    (error) => {
      logError('Something went wrong: ', error)
    }
  )
}

logInfo(`Started up watcher in ${chalk.green(packageName)}`)

triggerBuild()

let lastBuildTime = new Date().getTime() / 1000

const rebuild = () => {
  const buildTime = new Date().getTime() / 1000

  const deltaBetweenBuilds = buildTime - lastBuildTime

  const hasPassedDelta = deltaBetweenBuilds > 5
  if (hasPassedDelta) {
    lastBuildTime = buildTime

    logInfo('Files have changed, rebuilding...')
    triggerBuild()
  }
}

const sourcePath = path.join(packagePath, 'src')

const watcher = chokidar.watch(sourcePath, {
  ignored: /(^|[/\\])\../,
  persistent: true,
})

watcher.on('change', rebuild)
watcher.on('unlink', rebuild)
