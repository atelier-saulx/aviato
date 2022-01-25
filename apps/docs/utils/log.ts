import { isProduction } from './misc'
import { LogLevel, setupLogging, createConsoleAdapter } from '@aviato/utils'

const setupApplicationLogging = () => {
  const logLevel = isProduction ? LogLevel.ERROR : LogLevel.DEBUG
  const adapters = [createConsoleAdapter()]

  setupLogging({
    logLevel,
    adapters,
  })
}

export { setupApplicationLogging }
