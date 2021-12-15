import { inDevEnvironment } from './misc'
import { LogLevel, setupLogging, createConsoleAdapter } from '@aviato/utils'

const setupApplicationLogging = () => {
  const logLevel = inDevEnvironment ? LogLevel.DEBUG : LogLevel.ERROR
  const adapters = [createConsoleAdapter()]

  setupLogging({
    logLevel,
    adapters,
  })
}

export { setupApplicationLogging }
