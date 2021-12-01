import { FunctionComponent } from 'react'
import { DisplayComponent } from './displayComponent'
import { NextTitle, NextParagraph } from '../text'

import { styled, Conditional } from '@aviato/ui'

const ComponentWrapperDiv = styled('div', {
  display: 'flex',
  flexFlow: 'column nowrap',
  padding: '20px',
  width: '100%',
  maxWidth: '860px',
  margin: '0 auto',
})

const PaddingTop = styled('div', {
  paddingTop: '20px',
})

export type DisplayComponentProps = {
  title?: string
  description?: string
}

export const ShowcaseComponent: FunctionComponent<DisplayComponentProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <ComponentWrapperDiv>
      <Conditional test={Boolean(title)}>
        <NextTitle weight="Bold" size="ExtraLarge" paddingLeft={20}>
          {title}
        </NextTitle>
      </Conditional>

      <Conditional test={Boolean(description)}>
        <NextParagraph paddingLeft={20} color="Secondary">
          {description}
        </NextParagraph>
      </Conditional>

      <PaddingTop>
        <DisplayComponent>{children}</DisplayComponent>
      </PaddingTop>
    </ComponentWrapperDiv>
  )
}
