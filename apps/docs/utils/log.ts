import { LogLevel, setupLogging, createConsoleAdapter } from '@aviato/utils'

const setupApplicationLogging = () => {
  const isProduction: boolean = process.env.NODE_ENV === 'production'
  const logLevel = isProduction ? LogLevel.ERROR : LogLevel.DEBUG
  const adapters = [createConsoleAdapter()]

  setupLogging({
    logLevel,
    adapters,
  })
}

export { setupApplicationLogging }
