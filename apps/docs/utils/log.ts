import { inDevEnvironment } from './misc'
import {
  LogLevel,
  setupLogging,
  log,
  createConsoleAdapter,
} from '@aviato/utils'

const setupApplicationLogging = () => {
  const logLevel = inDevEnvironment ? LogLevel.DEBUG : LogLevel.ERROR
  const adapters = [createConsoleAdapter()]

  setupLogging({
    logLevel,
    adapters,
  })
}

export { setupApplicationLogging }
