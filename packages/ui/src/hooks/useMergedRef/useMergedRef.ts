import { ForwardedRef, useCallback, Dispatch, SetStateAction } from 'react'

function assignRef<T = any>(ref: ForwardedRef<T>, value: T | null) {
  if (typeof ref === 'function') {
    ref(value)
  } else if (typeof ref === 'object' && ref !== null && 'current' in ref) {
    ref.current = value
  }
}

type Ref<T> = Dispatch<SetStateAction<T>> | ForwardedRef<T>

export function useMergedRef<T = any>(...refs: Ref<T>[]) {
  return useCallback((node: T | null) => {
    refs.forEach((ref) => assignRef(ref, node))
  }, refs)
}

export function mergeRefs<T = any>(...refs: Ref<T>[]) {
  return (node: T | null) => {
    refs.forEach((ref) => assignRef(ref, node))
  }
}
