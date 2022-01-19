import React, { FunctionComponent } from 'react'

import { Prism, styled, Conditional, CodeLanguage } from '@aviato/ui'
import { CodeBlock } from '..'

const BaseContainer = styled('div', {
  marginLeft: '0px',
  marginBottom: '20px',
})

const Container = styled('div', {
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
  codeBlock?: string | CodeBlock
}

export const DisplayComponent: FunctionComponent<DisplayComponentProps> = ({
  background = 'filled',
  padding = 'regular',
  codeBlock,
  children,
}) => {
  let code: string
  let language: CodeLanguage = 'tsx'

  if (codeBlock) {
    if (typeof codeBlock === 'string') {
      code = codeBlock
    } else {
      code = codeBlock.code
      language = codeBlock.language
    }
  }

  return (
    <BaseContainer>
      <Container background={background}>
        <InnerDiv padding={padding}>{children}</InnerDiv>
      </Container>

      <Conditional test={code}>
        <Prism language={language}>{code}</Prism>
      </Conditional>
    </BaseContainer>
  )
}
