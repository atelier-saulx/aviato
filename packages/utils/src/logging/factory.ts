import { noop } from '../misc'
import { createConsoleAdapter } from './adapters'
import { Log, LogAdapter, Logger, LogLevel, LogOperation } from './types'

type LoggerFactory = {
  createLogger: (namespace: string) => Logger
  attachAdapter(adapter: LogAdapter): void
  setLevel(level: LogLevel): void
}

function createLoggerFactory(): LoggerFactory {
  const adapters: Set<LogAdapter> = new Set()

  let minimumLogLevel: LogLevel = LogLevel.DEBUG

  const createLogger = (namespace: string): Logger => {
    const log = (level: LogLevel): Log => {
      const entryLevels: {
        [log in LogLevel]: keyof LogAdapter
      } = {
        [LogLevel.DEBUG]: 'debug',
        [LogLevel.INFO]: 'info',
        [LogLevel.WARN]: 'warn',
        [LogLevel.ERROR]: 'error',
      }

      return (message: string, ...data: unknown[]) => {
        if (level < minimumLogLevel) {
          return
        }

        adapters.forEach((adapter) => {
          const logOperation: LogOperation = adapter[
            entryLevels[level]
          ] as LogOperation

          if (namespace) {
            logOperation(`[${namespace}]`, message, ...data)
          } else {
            logOperation(message, ...data)
          }
        })
      }
    }

    return {
      debug: log(LogLevel.DEBUG) as Log,
      info: log(LogLevel.INFO) as Log,
      warn: log(LogLevel.WARN) as Log,
      error: log(LogLevel.ERROR) as Log,
    }
  }

  const attachAdapter = (adapter: LogAdapter): void => {
    adapters.add(adapter)
  }

  const setLevel = (level: LogLevel): void => {
    minimumLogLevel = level
  }

  return {
    createLogger,
    attachAdapter,
    setLevel,
  }
}

const loggerFactory: LoggerFactory = createLoggerFactory()

let log = {
  debug: noop,
  info: noop,
  warn: noop,
  error: noop,
}

const setupLogging = (logLevel: LogLevel) => {
  loggerFactory.setLevel(logLevel)
  loggerFactory.attachAdapter(createConsoleAdapter())

  log = loggerFactory.createLogger('app')
}

export { setupLogging, log, loggerFactory }
