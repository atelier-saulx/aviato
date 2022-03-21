import { useReducer } from 'react'
import { deepEqual, deepMerge } from '@saulx/utils'

type GenericObject = { [key: string]: any }

const updateReducer = (
  state: GenericObject = {},
  action: GenericObject | null | undefined
): GenericObject => {
  if (!action) {
    return {}
  } else {
    const n = deepMerge(state, action)
    if (!deepEqual(n, action)) {
      return n
    }
  }
  return state
}

export function useObjectState<T = GenericObject>(
  initialState?: T
): [T, (val: T | null | undefined) => void] {
  // @ts-ignore
  return useReducer(updateReducer, initialState || {})
}
