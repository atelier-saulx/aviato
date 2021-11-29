import { inDevEnvironment } from './misc'
import {
  LogLevel,
  setupLogging as setupApplicationLogging,
  log,
  createConsoleAdapter,
} from '@aviato/utils'

const setupLogging = () => {
  const logLevel = inDevEnvironment ? LogLevel.DEBUG : LogLevel.ERROR
  const adapters = [createConsoleAdapter()]

  setupApplicationLogging({
    logLevel,
    adapters,
  })
  log.debug('Application has been started.')
}

export { setupLogging }
