import { Storage } from './types'

export function storageFactory(storage: () => Storage): Storage {
  function getItem(key: string): string | null {
    try {
      return storage().getItem(key)
    } catch {
      return null
    }
  }

  function setItem(key: string, value: string): void {
    try {
      return storage().setItem(key, value)
    } catch {
      return null
    }
  }

  function removeItem(key: string): void {
    try {
      return storage().removeItem(key)
    } catch {}
  }

  function clear(): void {
    try {
      return storage().clear()
    } catch {}
  }

  return {
    getItem,
    setItem,
    removeItem,
    clear,
  }
}
