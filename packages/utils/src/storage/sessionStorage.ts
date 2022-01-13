import { log } from '~/logging'
import { storageFactory } from './storageFactory'
import { Storage } from './types'

function getSessionStorage(): Storage {
  if (!window.sessionStorage || global.sessionStorage) {
    log.global.error('Could not create sessionStorage adapter.')
  }

  return window.sessionStorage || global.sessionStorage
}

export const SessionStorage = storageFactory(getSessionStorage)
