import { storageFactory } from './storageFactory'
import { Storage } from './types'

function getMemoryStorage(): Storage {
  const storage: Record<string, string> = {}

  function getItem(key: string): string | null {
    return storage[key] ?? null
  }

  function setItem(key: string, value: string): void {
    storage[key] = value
  }

  function removeItem(key: string): void {
    delete this._storage[key]
  }

  function clear(): void {
    this._storage = {}
  }

  return {
    getItem,
    setItem,
    removeItem,
    clear,
  }
}

export const MemoryStorage = storageFactory(getMemoryStorage)
