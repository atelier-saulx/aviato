import React, { FunctionComponent } from 'react'

type ConditionalProps = {
  test: boolean
}

/**
 * Render children conditionally, if test returns true.
 */
export const Conditional: FunctionComponent<ConditionalProps> = ({
  test,
  children,
}) => {
  if (test) {
    return <>{children}</>
  }

  return null
}
