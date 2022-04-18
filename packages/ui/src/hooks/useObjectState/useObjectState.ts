import { useReducer } from 'react'
import { deepMerge } from '@saulx/utils'
import { hash } from '@saulx/hash'

type GenericObject = { [key: string]: any }

const updateReducer = (
  state: { state: GenericObject; id?: number } = { state: {} },
  action: GenericObject | null | undefined
): GenericObject => {
  if (!action) {
    return { state: {} }
  } else {
    const n = deepMerge(state.state, action)
    const nId = hash(n)
    if (nId !== state.id) {
      state.id = nId
      return { ...state }
    }
  }
  return state
}

export function useObjectState<T = GenericObject>(
  initialState?: T
): [T, (val: T | null | undefined) => void] {
  const [s, update] = useReducer(updateReducer, { state: initialState || {} })
  return [s.state, update]
}
