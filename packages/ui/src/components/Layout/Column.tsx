import React, { FunctionComponent } from 'react'
import { styled, StitchedCSS } from '~/theme'

const ColumnDiv = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

export type ColumnProps = {
  css?: StitchedCSS
}

export const Column: FunctionComponent<ColumnProps> = ({
  children,
  css = {},
}) => {
  return (
    <ColumnDiv
      css={{
        ...css,
      }}
    >
      {children}
    </ColumnDiv>
  )
}
