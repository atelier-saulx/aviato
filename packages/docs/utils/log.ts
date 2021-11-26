import { inDevEnvironment } from './misc'
import {
  LogLevel,
  setupLogging as setupApplicationLogging,
  log,
} from '@aviato/utils'

const setupLogging = () => {
  const logLevel = inDevEnvironment ? LogLevel.DEBUG : LogLevel.ERROR
  setupApplicationLogging(logLevel)

  log.debug('Application has been started.')
}

export { setupLogging }
