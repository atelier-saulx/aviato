const isProduction: boolean = process.env.NODE_ENV === 'production'
const prefix: string = 'Invariant failed'

/**
 * Credit: https://github.com/alexreardon/tiny-invariant/blob/master/src/tiny-invariant.ts
 */
export function invariant(
  condition: any,
  message?: string | (() => string)
): asserts condition {
  if (condition) {
    return
  }

  if (isProduction) {
    throw new Error(prefix)
  }

  const provided: string | undefined =
    typeof message === 'function' ? message() : message

  // Options:
  // 1. message provided: `${prefix}: ${provided}`
  // 2. message not provided: prefix
  const value: string = provided ? `${prefix}: ${provided}` : prefix

  throw new Error(value)
}
