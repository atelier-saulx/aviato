import { log } from '@aviato/utils'
import { featureFlags } from '../feature-flags'
import { setupApplicationLogging } from './log'

let isProduction = false

if (process && process.env.NODE_ENV === 'production') {
  isProduction = true
}

const initialiseApplication = () => {
  setupApplicationLogging()
  featureFlags.initialise()

  log.debug('Application has been started.')

  const environment = {
    ENV: process.env.ENV,
    NODE_ENV: process.env.NODE_ENV,
  }

  log.global.debug('Environment: ', environment)
}

export { initialiseApplication, isProduction }
