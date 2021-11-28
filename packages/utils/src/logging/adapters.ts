/* eslint-disable no-console */
import { LogAdapter } from './types'

export function createConsoleAdapter(): LogAdapter {
  return {
    debug: (...data) => console.debug(...data),
    info: (...data) => console.info(...data),
    warn: (...data) => console.warn(...data),
    error: (...data) => console.error(...data),
  }
}
