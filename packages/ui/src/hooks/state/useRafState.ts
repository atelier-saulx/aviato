import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react'

import { useUnmount } from '../lifecycle/useUnmount'

function useRafState<State>(
  initialState: State | (() => State)
): [State, Dispatch<SetStateAction<State>>] {
  const frame = useRef(0)
  const [state, setState] = useState(initialState)

  const setRafState = useCallback(
    (value: State | ((prevState: State) => State)) => {
      cancelAnimationFrame(frame.current)

      frame.current = requestAnimationFrame(() => {
        setState(value)
      })
    },
    []
  )

  useUnmount(() => {
    cancelAnimationFrame(frame.current)
  })

  return [state, setRafState]
}

export { useRafState }
