import React, { FunctionComponent } from 'react'
import { styled, StitchedCSS } from '~/theme'

const RowDiv = styled('div', {
  display: 'flex',
  flexDirection: 'row',
})

export type RowProps = {
  css?: StitchedCSS
}

export const Row: FunctionComponent<RowProps> = ({ children, css = {} }) => {
  return (
    <RowDiv
      css={{
        ...css,
      }}
    >
      {children}
    </RowDiv>
  )
}
