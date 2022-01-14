/* eslint-disable @typescript-eslint/no-unused-vars */

import { noop } from '../misc'
import { storageFactory } from './storageFactory'
import { Storage } from './types'

function getNoopStorage(): Storage {
  const getItem = (key: string) => null
  const setItem = (key: string, value: string) => noop()
  const removeItem = (key: string) => noop()
  const clear = () => noop()

  return {
    getItem,
    setItem,
    removeItem,
    clear,
  }
}

export const NoopStorage = storageFactory(getNoopStorage)
