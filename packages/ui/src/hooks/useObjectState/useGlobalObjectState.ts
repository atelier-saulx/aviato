import { useRef } from 'react'
import { deepMerge } from '@saulx/utils'
import { hash } from '@saulx/hash'
import useGlobalState from '@based/use-global-state'

type GenericObject = { [key: string]: any }

export function useGlobalObjectState<T = GenericObject>(
  key: string,
  initialState?: T
): [T, (val: T | null | undefined) => void] {
  const [globalState, setGlobalState] = useGlobalState(key, initialState)
  const idRef = useRef<any>()

  return [
    globalState,
    (val) => {
      if (val) {
        const merged = deepMerge(globalState, val)
        const nId = hash(merged)
        if (idRef.current !== nId) {
          idRef.current = nId
          return setGlobalState(key, { ...merged })
        }
      } else {
        idRef.current = null
        return setGlobalState(key, {})
      }
    },
  ]
}
