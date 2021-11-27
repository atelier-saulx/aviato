/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/no-unused-vars */

const noop = (...args: any[]): any => void 0

function clamp(value: number, [min, max]: [number, number]): number {
  return Math.min(max, Math.max(min, value))
}

export { noop, clamp }
