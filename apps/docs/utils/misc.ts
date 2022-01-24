import { log } from '@aviato/utils'
import { featureFlags } from '../feature-flags'
import { setupApplicationLogging } from './log'

let inDevEnvironment = false

if (process && process.env.NODE_ENV === 'development') {
  inDevEnvironment = true
}

const initialiseApplication = () => {
  setupApplicationLogging()
  featureFlags.initialise()

  log.debug('Application has been started.')

  const environment = {
    ENVIRONMENT: process.env.ENVIRONMENT,
    NODE_ENV: process.env.NODE_ENV,
  }

  log.global.debug('Environment: ', environment)
}

export { initialiseApplication, inDevEnvironment }
