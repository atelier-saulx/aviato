import { logWarning } from './utils.mjs'

import { exec } from 'promisify-child-process'

async function formatIcons() {
  const parseCommand = [
    'svgo --config ./scripts/svgoConfig.js -f ./src/icons/svg',
  ]

  await exec(parseCommand.join(' ')).catch((error) => {
    logWarning('formatIcons error: ', error)
  })
}

async function start() {
  try {
    await formatIcons()
  } catch (error) {
    // throw new Error(error)
  }
}

/***
 * Execute script.
 **/
;(async () => {
  start()
})()
