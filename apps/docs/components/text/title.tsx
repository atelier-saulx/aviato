import { FunctionComponent } from 'react'

import {
  Title as AviatoTitle,
  TitleProps as AviatoTitleProps,
} from '@aviato/ui'

export type NextTitleProps = AviatoTitleProps & {}

export const NextTitle: FunctionComponent<NextTitleProps> = ({
  children,
  ...remainingProps
}) => {
  return (
    <AviatoTitle
      css={{
        paddingBottom: 10,
      }}
      {...remainingProps}
    >
      {children}
    </AviatoTitle>
  )
}
