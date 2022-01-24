import { NoopStorage } from './noopStorage'
import { storageFactory } from './storageFactory'
import { Storage } from './types'

const errorMessage =
  '[WARNING]: Local-storage is not available. Nothing is stored.'

function getLocalStorage(): Storage {
  const storage = window?.localStorage || global?.localStorage
  if (!storage) {
    console.warn(errorMessage)

    return NoopStorage
  }

  return storage
}

export const LocalStorage = storageFactory(getLocalStorage)
