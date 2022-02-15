/* eslint-disable no-console */
import path from 'path'
import { execa } from 'execa'
const chokidar = require('chokidar')

const logInfo = console.log.bind(console)
const logError = console.error.bind(console)

const triggerBuild = () => {
  execa('yarn', ['build'], { stdio: 'inherit' }).catch((error) => {
    logError('Something went wrong: ', error)
  })
}

logInfo('Started up watcher in @avito/ui...')

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

const packagePath = path.join(__dirname, '../src')

const watcher = chokidar.watch(packagePath, {
  ignored: /(^|[/\\])\../,
  persistent: true,
})

watcher.on('change', rebuild)
watcher.on('unlink', rebuild)
