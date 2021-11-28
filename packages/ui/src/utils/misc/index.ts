/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/no-unused-vars */

const noop = (...args: any[]): any => void 0

function clamp(value: number, [min, max]: [number, number]): number {
  return Math.min(max, Math.max(min, value))
}

function on<T extends Window | Document | HTMLElement | EventTarget>(
  object: T | null,
  ...args: Parameters<T['addEventListener']> | [string, Function | null, ...any]
): void {
  if (object && object.addEventListener) {
    object.addEventListener(
      ...(args as Parameters<HTMLElement['addEventListener']>)
    )
  }
}

function off<T extends Window | Document | HTMLElement | EventTarget>(
  object: T | null,
  ...args:
    | Parameters<T['removeEventListener']>
    | [string, Function | null, ...any]
): void {
  if (object && object.removeEventListener) {
    object.removeEventListener(
      ...(args as Parameters<HTMLElement['removeEventListener']>)
    )
  }
}

function isTouchEvent(event: Event): event is TouchEvent {
  return 'touches' in event
}

const isBrowser = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

export { on, off, isTouchEvent, isBrowser, noop, clamp }
