import React, { FunctionComponent } from 'react'
import { Icon } from '~/icons/collection'

type TruthyOrFalsy = Icon | boolean | string | null | undefined

type ConditionalProps = {
  test: TruthyOrFalsy
}

/**
 * Render children conditionally, if test returns true.
 */
export const Conditional: FunctionComponent<ConditionalProps> = ({
  test: isTruthy,
  children,
}) => {
  if (isTruthy) {
    return <>{children}</>
  }

  return null
}
