import { log } from '~/logging'
import { storageFactory } from './storageFactory'
import { Storage } from './types'

function getLocalStorage(): Storage {
  if (!window.localStorage || global.localStorage) {
    log.global.error('Could not create localStorage adapter.')
  }

  return window.localStorage || global.localStorage
}

export const LocalStorage = storageFactory(getLocalStorage)
