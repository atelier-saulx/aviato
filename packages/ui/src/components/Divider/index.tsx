import React, { FunctionComponent } from 'react'
import { CSSParameters, styled } from '~/theme'

const DividerDiv = styled('div', {
  variants: {
    type: {
      horizontal: {},
      vertical: {},
    },
  },
})

type DividerType = 'horizontal' | 'vertical'

export type DividerProps = {
  type?: DividerType
  css?: CSSParameters
}

export const Divider: FunctionComponent<DividerProps> = ({
  type = 'horizontal',
  css = {},
}) => {
  return (
    <DividerDiv
      type={type}
      css={{
        ...css,
      }}
    />
  )
}
