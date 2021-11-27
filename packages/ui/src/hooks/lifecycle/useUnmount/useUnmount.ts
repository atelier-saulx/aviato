import { useRef } from 'react'
import { useEffectOnce } from '../../utility/useEffectOnce'

const useUnmount = (fn: () => any): void => {
  const fnRef = useRef(fn)

  fnRef.current = fn

  useEffectOnce(() => () => fnRef.current())
}

export { useUnmount }
