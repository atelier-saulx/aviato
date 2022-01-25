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

/**
 * Preload image
 *
 * @param src - image source
 * @returns promise
 */
export function preloadImage(src: string) {
  return new Promise((resolve, reject) => {
    const img = new Image()

    img.onload = function () {
      resolve(img)
    }

    img.onerror = img.onabort = function () {
      reject(src)
    }

    img.src = src
  })
}
