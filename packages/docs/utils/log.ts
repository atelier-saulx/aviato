import { inDevEnvironment } from './misc'
import {
  LogLevel,
  setupLogging as setupApplicationLogging,
  log,
} from '@aviato/ui'

const setupLogging = () => {
  setupApplicationLogging(inDevEnvironment ? LogLevel.DEBUG : LogLevel.ERROR)
  log.debug('Application has been started.')
}

export { setupLogging }
