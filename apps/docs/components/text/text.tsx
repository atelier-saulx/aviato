import { FunctionComponent } from 'react'

import { Text as AviatoText, TextProps as AviatoTextProps } from '@aviato/ui'

export type NextTextProps = AviatoTextProps & {}

export const NextText: FunctionComponent<NextTextProps> = ({
  children,
  ...remainingProps
}) => {
  return (
    <AviatoText
      css={{
        paddingBottom: 10,
      }}
      {...remainingProps}
    >
      {children}
    </AviatoText>
  )
}
