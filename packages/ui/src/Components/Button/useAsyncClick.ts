import { AsyncEvent } from '../../types'
import {
  useState,
  useCallback,
  EventHandler,
  SyntheticEvent,
  useEffect,
  useRef,
} from 'react'

type GenericEventHandler = EventHandler<SyntheticEvent>

export default (
  onClick: GenericEventHandler | AsyncEvent
): [boolean, GenericEventHandler, Error] => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error>()

  const reference = useRef<boolean>(false)

  useEffect(() => {
    return () => {
      reference.current = true
    }
  }, [])

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null)
      }, 1000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [error])

  const handler = useCallback(
    (event) => {
      event.stopPropagation()

      if (!reference.current) {
        setLoading(true)
      }

      const response = onClick(event)
      if (response instanceof Promise) {
        response
          .then((value) => {
            if (!reference.current) {
              setLoading(false)
            }
          })
          .catch((errorResponse) => {
            if (!reference.current) {
              setError(errorResponse)
              console.error(errorResponse)
              setLoading(false)
            }
          })
      } else {
        if (!reference.current) {
          setLoading(false)
        }
      }
    },
    [onClick]
  )
  return [loading, handler, error]
}
