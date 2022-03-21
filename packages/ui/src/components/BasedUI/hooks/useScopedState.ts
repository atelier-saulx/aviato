import { useState, useRef, useEffect } from 'react'
import { deepEqual } from '@saulx/utils'

export default function useScopedState<TValue = string | number | undefined>(
  value: TValue,
  identifier: any,
  noExternalUpdate: boolean = false
): [TValue, (value: TValue) => void] {
  const [stateValue, setValue] = useState<TValue>(value)
  const identifierRef = useRef(identifier)
  const initialValue = useRef(value)

  useEffect(() => {
    if (
      !deepEqual(value, stateValue) &&
      !deepEqual(value, initialValue.current) &&
      !noExternalUpdate
    ) {
      initialValue.current = value
      setValue(value)
    } else if (!deepEqual(identifierRef.current, identifier)) {
      identifierRef.current = identifier
      initialValue.current = value
      setValue(value)
    } else if (!initialValue.current) {
      initialValue.current = value
      if (stateValue === undefined && value) {
        setValue(value)
      }
    }
  }, [value, identifier, noExternalUpdate])

  return [stateValue, setValue]
}
