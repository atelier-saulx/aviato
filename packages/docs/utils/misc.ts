import { log } from '@aviato/utils'
import { setupLogging } from './log'

let inDevEnvironment = false

if (process && process.env.NODE_ENV === 'development') {
  inDevEnvironment = true
}

const initialiseApplication = () => {
  setupLogging()

  log.debug('Application has been started.')
}

export { initialiseApplication, inDevEnvironment }
