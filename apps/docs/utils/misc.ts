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
}

const capitalize = (input: string) => {
  return input.charAt(0).toUpperCase() + input.slice(1)
}

export { initialiseApplication, inDevEnvironment, capitalize }
