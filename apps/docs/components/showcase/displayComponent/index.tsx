import React, { FunctionComponent } from 'react'

import { Prism, styled, Conditional, CodeBlock } from '@aviato/ui'

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
      small: {
        '@breakpoint1': {
          margin: '10px 0px',
        },
      },

      regular: {
        '@breakpoint1': {
          margin: '50px 0px',
        },
      },

      large: {
        '@breakpoint1': {
          margin: '60px 0px',
        },
      },
    },
  },
})

export type DisplayComponentProps = {
  background?: 'filled' | 'transparent'
  padding?: 'small' | 'regular' | 'large'
  codeBlock?: CodeBlock
}

export const DisplayComponent: FunctionComponent<DisplayComponentProps> = ({
  background = 'filled',
  padding = 'regular',
  codeBlock,
  children,
}) => {
  const { language, code } = codeBlock

  return (
    <WrapperDiv>
      <ComponentWrapperDiv background={background}>
        <InnerDiv padding={padding}>{children}</InnerDiv>
      </ComponentWrapperDiv>

      <Conditional test={codeBlock}>
        <Prism language={language}>{code}</Prism>
      </Conditional>
    </WrapperDiv>
  )
}
