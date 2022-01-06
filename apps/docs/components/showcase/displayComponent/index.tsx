import React, { FunctionComponent } from 'react'

import { styled } from '@aviato/ui'

const WrapperDiv = styled('div', {
  marginLeft: '0px',
  marginBottom: '20px',
})

const ComponentWrapperDiv = styled('div', {
  display: 'flex',
  flexFlow: 'column nowrap',
  padding: '20px',
  borderRadius: '4px',

  variants: {
    background: {
      filled: {
        background: '$PrimaryLight',
        border: '1px solid $PrimaryLight',
      },

      transparent: {
        background: 'none',
        border: '1px solid $OtherInputBorderDefault',
      },
    },
  },
})

const InnerDiv = styled('div', {
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '60px 0px',

  variants: {
    padding: {
      regular: {
        margin: '50px 0px',
      },

      large: {
        margin: '60px 0px',
      },
    },
  },
})

export type DisplayComponentProps = {
  background?: 'filled' | 'transparent'
  padding?: 'regular' | 'large'
}

export const DisplayComponent: FunctionComponent<DisplayComponentProps> = ({
  children,
  background = 'filled',
  padding = 'regular',
}) => {
  return (
    <WrapperDiv>
      <ComponentWrapperDiv background={background}>
        <InnerDiv padding={padding}>{children}</InnerDiv>
      </ComponentWrapperDiv>
    </WrapperDiv>
  )
}
