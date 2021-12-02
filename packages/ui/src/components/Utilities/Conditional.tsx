import React, { FunctionComponent } from 'react'

type TruthyOrFalsy = boolean | string | null | undefined

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
