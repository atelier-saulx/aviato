export enum LogLevel {
  DEBUG,
  INFO,
  WARN,
  ERROR,
}

export type LogOperation = (...data: unknown[]) => void

export type LogAdapter = {
  debug: LogOperation
  info: LogOperation
  warn: LogOperation
  error: LogOperation
}

export type Log = {
  (message: string, ...data: unknown[]): void
}

export type Logger = {
  debug: Log
  info: Log
  warn: Log
  error: Log
}
