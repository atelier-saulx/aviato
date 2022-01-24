/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * A "no-operation" function, which does nothing.
 *
 * Explanation: https://www.noop.com.au/noop-meaning/
 *
 * @param args - any arguments passed to the function
 * @returns void (nothing)
 */
export const noop = (...args: any[]): any => void 0

/**
 * Are we dealing with SSR or CSR (normal browser)?
 * Is used to check when implementing isomorphic (aka universal) logic
 *
 * @returns boolean
 */
export const isBrowser = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

/**
 * Is target value a string?
 *
 * @param value - input
 * @returns boolean
 */
export const isText = (value) => {
  return typeof value === 'string' || value instanceof String
}

/**
 * Generate a random identifier string.
 *
 * @param prefix - Optional prefix
 * @returns string
 */
export function getRandomId(prefix?: string) {
  if (prefix) {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
  }

  return `${Math.random().toString(36).substr(2, 9)}`
}
