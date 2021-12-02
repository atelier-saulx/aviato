import React, { FunctionComponent } from 'react'
import { styled, CSSParameters } from '~/theme'

const ColumnDiv = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

export type ColumnProps = {
  css?: CSSParameters
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
