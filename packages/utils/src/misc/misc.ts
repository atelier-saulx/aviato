/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/no-unused-vars */

export const noop = (...args: any[]): any => void 0

export const isBrowser = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

export const isText = (value) => {
  return typeof value === 'string' || value instanceof String
}
