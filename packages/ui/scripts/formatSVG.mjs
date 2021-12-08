import { logInfo, logError } from './utils.mjs'
import { exec } from 'promisify-child-process'

async function formatIcons() {
  const parseCommand = [
    'svgo',
    '-f',
    '--config ./scripts/svgoConfig.js',
    './src/icons/svg',
  ]

  const formatIconsCommand = parseCommand.join(' ')

  try {
    await exec(formatIconsCommand)
  } catch (error) {
    const message = (error && error.message) || ''
    const noSVGMessage = 'No SVG files have been found'

    const hasEmptyVectorFolder = message.includes(noSVGMessage)
    if (hasEmptyVectorFolder) {
      logInfo('Note: SVG folder is empty.')
    } else {
      logError('formatIcons error: ', error)
    }
  }
}

async function start() {
  try {
    await formatIcons()
  } catch (error) {
    throw new Error(error)
  }
}

/***
 * Execute script.
 **/
;(async () => {
  start()
})()
