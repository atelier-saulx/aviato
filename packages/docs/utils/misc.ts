import { log } from '@aviato/utils'
import { setupApplicationLogging } from './log'

let inDevEnvironment = false

if (process && process.env.NODE_ENV === 'development') {
  inDevEnvironment = true
}

const initialiseApplication = () => {
  setupApplicationLogging()

  log.debug('Application has been started.')
}

export { initialiseApplication, inDevEnvironment }
