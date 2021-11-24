import { RefObject, useEffect } from 'react'

const keyMap = {
  Enter: 13,
  Esc: 27,
  ArrowUp: 38,
  ArrowDown: 40,
  ArrowLeft: 37,
  ArrowRight: 39,
  Tab: 61,
}

export type Key =
  | 'Enter'
  | 'Esc'
  | 'ArrowUp'
  | 'ArrowDown'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'Tab'

class TempEvent {
  constructor(target: EventTarget | Element) {
    this.current = target
    this.currentTarget = target
  }

  public pageX: number

  public pageY: number

  public which: string

  public current: EventTarget | Element

  public currentTarget: EventTarget | Element

  preventDefault() {}

  stopPropagation() {}
}

export const matchKeyCode = (k: Key | Number, e: KeyboardEvent) => {
  const code = e.code || e.key
  const numberCode = e.keyCode || e.which
  return (
    code === k ||
    k === numberCode ||
    (typeof k === 'string' && keyMap[k] === numberCode)
  )
}

export const useKeyUp = (
  handler: (event: TempEvent) => void,
  ref: RefObject<Element>,
  keycodes: (Key | number)[]
) => {
  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (!keycodes || keycodes.find((k) => matchKeyCode(k, e))) {
        e.preventDefault()
        e.stopPropagation()
        const event = new TempEvent(ref ? ref.current : e.target)
        handler(event)
      }
    }
    document.addEventListener('keyup', keyHandler)
    return () => {
      document.removeEventListener('keyup', keyHandler)
    }
  }, [handler, ref])
}

export const useKeyDown = (
  handler: (event: TempEvent) => void,
  ref: RefObject<Element>,
  keycodes: (Key | number)[]
) => {
  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (!keycodes || keycodes.find((k) => matchKeyCode(k, e))) {
        e.preventDefault()
        e.stopPropagation()
        const event = new TempEvent(ref ? ref.current : e.target)
        handler(event)
      }
    }
    document.addEventListener('keydown', keyHandler)
    return () => {
      document.removeEventListener('keydown', keyHandler)
    }
  }, [handler])
}
