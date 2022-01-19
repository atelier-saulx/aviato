import { FunctionComponent } from 'react'
import { DisplayComponent } from './displayComponent'
import { NextTitle, NextText } from '../text'

import { styled, Conditional, CodeLanguage } from '@aviato/ui'

const Container = styled('div', {
  display: 'flex',
  flexFlow: 'column nowrap',
  width: '100%',
  margin: '0 auto',
})

const PaddingTop = styled('div', {
  paddingTop: '20px',
})

export interface CodeBlock {
  code: string
  language: CodeLanguage
}

export type DisplayComponentProps = {
  title?: string
  description?: string
  background?: 'filled' | 'transparent'
  padding?: 'small' | 'regular' | 'large'
  codeBlock?: string | CodeBlock
}

export const ShowcaseComponent: FunctionComponent<DisplayComponentProps> = ({
  title,
  description,
  background = 'filled',
  padding = 'regular',
  codeBlock,
  children,
}) => {
  return (
    <Container>
      <Conditional test={title}>
        <NextTitle>{title}</NextTitle>
      </Conditional>

      <Conditional test={description}>
        <NextText color="Secondary">{description}</NextText>
      </Conditional>

      <PaddingTop>
        <DisplayComponent
          background={background}
          padding={padding}
          codeBlock={codeBlock}
        >
          {children}
        </DisplayComponent>
      </PaddingTop>
    </Container>
  )
}
