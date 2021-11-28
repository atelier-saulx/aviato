let inDevEnvironment = false

if (process && process.env.NODE_ENV === 'development') {
  inDevEnvironment = true
}

import {
  LogLevel,
  setupLogging as setupApplicationLogging,
  log,
  createConsoleAdapter,
} from '@aviato/utils'

const initialiseApplication = () => {
  const logLevel = inDevEnvironment ? LogLevel.DEBUG : LogLevel.ERROR
  const adapters = [createConsoleAdapter()]

  setupApplicationLogging({
    logLevel,
    adapters,
  })

  log.debug('Application has been started.')
}

export { initialiseApplication, inDevEnvironment }
