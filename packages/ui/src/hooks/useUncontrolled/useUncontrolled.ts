import { useEffect, useRef, useState } from 'react'
import { noop } from '@aviato/utils'

export type UncontrolledMode = 'initial' | 'controlled' | 'uncontrolled'

export interface UncontrolledOptions<T> {
  value: T | null | undefined
  defaultValue: T | null | undefined
  finalValue: T | null
  onChange?(value: T | null): void
  onValueUpdate?(value: T | null): void
  rule: (value: T | null | undefined) => boolean
}

export function useUncontrolled<T>({
  value,
  defaultValue,
  finalValue,
  rule,
  onChange = noop,
  onValueUpdate,
}: UncontrolledOptions<T>): readonly [
  T | null,
  (nextValue: T | null) => void,
  UncontrolledMode
] {
  // Determine whether new props indicate controlled state
  const shouldBeControlled = rule(value)

  // Initialize state
  const modeRef = useRef<UncontrolledMode>('initial')
  const initialValue = rule(defaultValue) ? defaultValue : finalValue
  const [uncontrolledValue, setUncontrolledValue] = useState(initialValue)

  // Compute effective value
  let effectiveValue = shouldBeControlled ? value : uncontrolledValue

  /**
   * We are transitioning from controlled to uncontrolled
   * this transition is special as it happens when clearing out
   * the input using "invalid" value (typically null or undefined).
   *
   * Since the value is invalid, doing nothing would mean just
   * transitioning to uncontrolled state and using whatever value
   * it currently holds which is likely not the behavior
   * user expects, so lets change the state to finalValue.
   *
   * The value will be propagated to internal state by useEffect below.
   */
  if (!shouldBeControlled && modeRef.current === 'controlled') {
    effectiveValue = finalValue
  }

  modeRef.current = shouldBeControlled ? 'controlled' : 'uncontrolled'
  const mode = modeRef.current

  const handleChange = (nextValue: T | null) => {
    typeof onChange === 'function' && onChange(nextValue)

    /**
     * Controlled input only triggers onChange event and expects
     * the controller to propagate new value back.
     */
    if (mode === 'uncontrolled') {
      setUncontrolledValue(nextValue)
    }
  }

  useEffect(() => {
    if (mode === 'uncontrolled') {
      setUncontrolledValue(effectiveValue)
    }

    if (typeof onValueUpdate === 'function') {
      onValueUpdate(effectiveValue as T | null)
    }
  }, [mode, effectiveValue])

  return [effectiveValue as T | null, handleChange, modeRef.current] as const
}
