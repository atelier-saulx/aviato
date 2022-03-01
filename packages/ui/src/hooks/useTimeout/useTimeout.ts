import { useTimeoutFn } from './timeout'
import { useUpdate } from '../useUpdate'

export type UseTimeoutReturn = [() => boolean | null, () => void, () => void]

export function useTimeout(milliseconds: number = 0): UseTimeoutReturn {
  const update = useUpdate()

  return useTimeoutFn(update, milliseconds)
}
