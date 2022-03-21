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

export function useObjectState(
  initialState?: GenericObject
): [GenericObject, (val: GenericObject | null | undefined) => void] {
  return useReducer(updateReducer, initialState)
}
