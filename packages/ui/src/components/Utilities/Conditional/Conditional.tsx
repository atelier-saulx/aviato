import React, { ReactNode, FunctionComponent } from 'react'
import { Icon } from '~/components/Icons/collection'

type TruthyOrFalsy = ReactNode | Icon | boolean | string | null | undefined

type ConditionalProps = {
  test: TruthyOrFalsy
}

/**
 * Render children conditionally if test returns true.
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

Conditional.displayName = 'Conditional'
