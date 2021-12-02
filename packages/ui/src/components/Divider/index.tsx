import React, { FunctionComponent } from 'react'
import { styled } from '~/theme'

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
}

export const Divider: FunctionComponent<DividerProps> = ({
  type = 'horizontal',
}) => {
  return <DividerDiv type={type} />
}
