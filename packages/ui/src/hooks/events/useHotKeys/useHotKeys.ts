import { useEffect } from 'react'
import { getHotkeyMatcher, getHotkeyHandler } from './parseHotKey'

export { getHotkeyHandler }

export type HotkeyItem = [string, (event: KeyboardEvent) => void]

export function useHotkeys(hotkeys: HotkeyItem[]) {
  useEffect(() => {
    const keydownListener = (event: KeyboardEvent) => {
      hotkeys.forEach(([hotkey, handler]) => {
        if (getHotkeyMatcher(hotkey)(event)) {
          event.preventDefault()
          handler(event)
        }
      })
    }

    document.documentElement.addEventListener('keydown', keydownListener)

    return () => {
      document.documentElement.removeEventListener('keydown', keydownListener)
    }
  }, [hotkeys])
}
